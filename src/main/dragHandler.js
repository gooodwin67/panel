import * as THREE from "three";

export class PanelDragHandler {
  // ---- Готовит перенос панелей ----
  constructor(gameContext, walls, sceneConfig) {
    this.gameContext = gameContext;
    this.walls = walls;

    this.worldScale = sceneConfig.worldScale || 1;
    this.cellSize = sceneConfig.cellSize || 0.5;
    this.panelDepth = sceneConfig.panelDepth || 0.05;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.mouseDownPointer = new THREE.Vector2();

    this.isDragging = false;
    this.ghostMesh = null;
    this.draggedPanelIndex = null;
    this.currentWall = null;
    this.canPlace = false;
    this.pendingPanel = null;
    this.savedColor = null;
  }

  // ---- Ловит нажатие по панели ----
  handlePointerDown(event) {
    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(this.walls, true);

    if (intersects.length > 0) {
      for (const hit of intersects) {
        let parentWall = hit.object;
        while (parentWall.parent && !this.walls.includes(parentWall)) {
          parentWall = parentWall.parent;
        }

        if (
          this.walls.includes(parentWall) &&
          !this.isWallFacingCamera(parentWall)
        ) {
          continue;
        }

        let targetObj = hit.object;
        while (
          targetObj.parent &&
          !targetObj.userData.isPanel &&
          targetObj !== this.gameContext.scene
        ) {
          targetObj = targetObj.parent;
        }

        if (targetObj.userData.isPanel) {
          this.pendingPanel = targetObj;
          this.mouseDownPointer.set(event.clientX, event.clientY);

          if (this.gameContext.controls) {
            this.gameContext.controls.enabled = false;
          }

          return true;
        }
      }
    }

    return false;
  }

  // ---- Проверяет сторону стены ----
  isWallFacingCamera(wall) {
    const camera = this.gameContext.camera;
    const wallPosition = new THREE.Vector3();
    wall.getWorldPosition(wallPosition);

    const toCamera = new THREE.Vector3().subVectors(
      camera.position,
      wallPosition
    );

    const wallNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
      wall.quaternion
    );

    return toCamera.dot(wallNormal) > 0;
  }

  // ---- Запускает перенос панели ----
  startDrag(panelIndex, event) {
    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    this.isDragging = true;
    this.draggedPanelIndex = panelIndex;

    const templates = this.gameContext.assetManager.panels;
    const template = templates[panelIndex];
    if (!template) return;

    this.ghostMesh = template.clone();
    this.applyMaterialProperties(this.ghostMesh, {
      transparent: true,
      opacity: 0.5,
      clippingPlanes: [],
    });

    if (this.savedColor !== null) {
      this.applyColor(this.ghostMesh, this.savedColor);
    } else if (this.gameContext.sceneClass.globalPanelColor !== null) {
      this.applyColor(
        this.ghostMesh,
        this.gameContext.sceneClass.globalPanelColor
      );
    }

    this.ghostMesh.traverse((child) => {
      child.raycast = () => {};
    });

    this.gameContext.scene.add(this.ghostMesh);
    this.ghostMesh.visible = true;

    if (event) {
      this.updatePointer(event);
      this.onPointerMove(event);
    }
  }

  // ---- Обновляет перенос панели ----
  onPointerMove(event) {
    if (this.pendingPanel && !this.isDragging) {
      const dist = Math.sqrt(
        Math.pow(event.clientX - this.mouseDownPointer.x, 2) +
          Math.pow(event.clientY - this.mouseDownPointer.y, 2)
      );

      if (dist > 15) {
        this.pickupPendingPanel(event);
      }
    }

    if (!this.isDragging || !this.ghostMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(this.walls, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const wall = hit.object;

      if (this.currentWall !== wall) {
        this.currentWall = wall;
        const planes = this.getWallClippingPlanes(wall);
        this.applyMaterialProperties(this.ghostMesh, {
          clippingPlanes: planes,
        });
      }

      this.snapToGrid(hit, wall);
      return;
    }

    this.moveInAir();
  }

  // ---- Подхватывает старую панель ----
  pickupPendingPanel(event) {
    const targetObj = this.pendingPanel;
    const index = targetObj.userData.panelIndex;

    this.savedColor = null;
    targetObj.traverse((child) => {
      if (this.savedColor === null && child.isMesh && child.material) {
        const material = Array.isArray(child.material)
          ? child.material[0]
          : child.material;
        this.savedColor = material.color.getHex();
      }
    });

    this.gameContext.sceneClass.deselectPanel();
    targetObj.parent.remove(targetObj);
    this.disposeModel(targetObj);

    this.startDrag(index, event);
    this.pendingPanel = null;
  }

  // ---- Привязывает к сетке ----
  snapToGrid(hit, wall) {
    const width = wall.geometry.parameters.width;
    const height = wall.geometry.parameters.height;
    const gridTexture = wall.userData.gridTexture;
    const localPoint = wall.worldToLocal(hit.point.clone());

    let u = localPoint.x / width + 0.5;
    let v = localPoint.y / height + 0.5;

    u = u * gridTexture.repeat.x + gridTexture.offset.x;
    v = v * gridTexture.repeat.y + gridTexture.offset.y;

    const gridX = Math.floor(u);
    const gridY = Math.floor(v);

    const isOccupied = wall.children.some(
      (child) =>
        child.userData.isPanel &&
        child.userData.gridX === gridX &&
        child.userData.gridY === gridY
    );

    if (isOccupied) {
      this.ghostMesh.visible = false;
      this.canPlace = false;
      return;
    }

    this.ghostMesh.visible = true;
    this.canPlace = true;
    this.ghostMesh.userData.gridX = gridX;
    this.ghostMesh.userData.gridY = gridY;

    const centerU = (gridX + 0.5 - gridTexture.offset.x) / gridTexture.repeat.x;
    const centerV = (gridY + 0.5 - gridTexture.offset.y) / gridTexture.repeat.y;
    const centerX = (centerU - 0.5) * width;
    const centerY = (centerV - 0.5) * height;

    localPoint.x = centerX;
    localPoint.y = centerY;
    localPoint.z = 0;

    const worldPoint = wall.localToWorld(localPoint);
    this.ghostMesh.position.copy(worldPoint);
    this.ghostMesh.quaternion.copy(wall.quaternion);
    this.ghostMesh.rotateX(Math.PI / 2);
  }

  // ---- Двигает панель в воздухе ----
  moveInAir() {
    this.currentWall = null;
    this.canPlace = true;
    this.ghostMesh.visible = true;
    this.applyMaterialProperties(this.ghostMesh, { clippingPlanes: [] });
    this.raycaster.ray.at(10 * this.worldScale, this.ghostMesh.position);
    this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
  }

  // ---- Завершает перенос панели ----
  onPointerUp() {
    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }

    if (this.pendingPanel) {
      this.gameContext.sceneClass.onPanelSelected(this.pendingPanel);
      this.pendingPanel = null;
      this.savedColor = null;
      return;
    }

    if (!this.isDragging) return;

    if (
      this.ghostMesh &&
      this.ghostMesh.visible &&
      this.currentWall &&
      this.canPlace
    ) {
      this.placePanel();
    }

    this.cleanupGhost();
  }

  // ---- Отменяет перенос панели ----
  cancelDrag() {
    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }

    this.cleanupGhost();
  }

  // ---- Ставит панель на стену ----
  placePanel() {
    const templates = this.gameContext.assetManager.panels;
    const template = templates[this.draggedPanelIndex];
    if (!template) return;

    const newPanel = template.clone();
    newPanel.userData.isPanel = true;
    newPanel.userData.panelIndex = this.draggedPanelIndex;
    newPanel.userData.gridX = this.ghostMesh.userData.gridX;
    newPanel.userData.gridY = this.ghostMesh.userData.gridY;

    const clippingPlanes = this.getWallClippingPlanes(this.currentWall);
    this.applyMaterialProperties(newPanel, {
      transparent: false,
      opacity: 1,
      clippingPlanes,
      cloneMaterial: true,
    });

    if (this.savedColor !== null) {
      this.applyColor(newPanel, this.savedColor);
    } else if (this.gameContext.sceneClass.globalPanelColor !== null) {
      this.applyColor(newPanel, this.gameContext.sceneClass.globalPanelColor);
    }

    const worldPosition = this.ghostMesh.position.clone();
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(
      this.currentWall.quaternion
    );
    worldPosition.add(normal.multiplyScalar(this.panelDepth * 0.25));

    this.currentWall.add(newPanel);
    this.currentWall.worldToLocal(worldPosition);

    newPanel.position.copy(worldPosition);
    newPanel.rotation.set(0, 0, 0);
    newPanel.rotateX(Math.PI / 2);

    this.gameContext.sceneClass.onPanelSelected(newPanel);
  }

  // ---- Красит материалы панели ----
  applyColor(object, colorValue) {
    object.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (!material.color) return;

        if (typeof colorValue === "string") {
          material.color.set(colorValue);
        } else {
          material.color.setHex(colorValue);
        }

        material.needsUpdate = true;
      });
    });
  }

  // ---- Обновляет свойства материалов ----
  applyMaterialProperties(
    object,
    { transparent, opacity, clippingPlanes, cloneMaterial }
  ) {
    object.traverse((child) => {
      if (!child.isMesh) return;

      if (cloneMaterial) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((material) => material.clone());
        } else {
          child.material = child.material.clone();
        }
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (transparent !== undefined) material.transparent = transparent;
        if (opacity !== undefined) material.opacity = opacity;
        if (clippingPlanes !== undefined) {
          material.clippingPlanes = clippingPlanes;
        }
        material.needsUpdate = true;
      });
    });
  }

  // ---- Убирает временную панель ----
  cleanupGhost() {
    this.isDragging = false;
    this.currentWall = null;
    this.canPlace = false;
    this.pendingPanel = null;
    this.savedColor = null;

    if (this.ghostMesh) {
      this.gameContext.scene.remove(this.ghostMesh);
      this.disposeModel(this.ghostMesh);
      this.ghostMesh = null;
    }
  }

  // ---- Освобождает ресурсы модели ----
  disposeModel(model) {
    model.traverse((child) => {
      if (!child.isMesh) return;

      if (child.geometry) child.geometry.dispose();

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  // ---- Пересчитывает указатель ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  // ---- Строит клиппинг стены ----
  getWallClippingPlanes(wall) {
    const width = wall.geometry.parameters.width;
    const height = wall.geometry.parameters.height;
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(wall.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(wall.quaternion);
    const pos = wall.position;

    return [
      new THREE.Plane().setFromNormalAndCoplanarPoint(
        right.clone().negate(),
        pos.clone().add(right.clone().multiplyScalar(width / 2))
      ),
      new THREE.Plane().setFromNormalAndCoplanarPoint(
        right.clone(),
        pos.clone().add(right.clone().multiplyScalar(-width / 2))
      ),
      new THREE.Plane().setFromNormalAndCoplanarPoint(
        up.clone().negate(),
        pos.clone().add(up.clone().multiplyScalar(height / 2))
      ),
      new THREE.Plane().setFromNormalAndCoplanarPoint(
        up.clone(),
        pos.clone().add(up.clone().multiplyScalar(-height / 2))
      ),
    ];
  }
}
