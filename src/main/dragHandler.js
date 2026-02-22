import * as THREE from 'three';

export class PanelDragHandler {
  constructor(gameContext, walls, sceneConfig) {
    this.gameContext = gameContext;
    this.walls = walls; 
    
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

    // --- НОВОЕ: Хранение цвета при переносе ---
    this.savedColor = null; 
  }

  // --- 1. Обработка нажатия ---
  handlePointerDown(event) {
    this.updatePointer(event)
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    const intersects = this.raycaster.intersectObjects(this.walls, true);

    if (intersects.length > 0) {
      for (const hit of intersects) {
          // Поднимаемся до стены
    let parentWall = hit.object;
    while (parentWall.parent && !this.walls.includes(parentWall)) {
        parentWall = parentWall.parent;
    }

    // Если это стена и она не смотрит на камеру — пропускаем
    if (this.walls.includes(parentWall) && !this.isWallFacingCamera(parentWall)) {
        continue;
    }

    let targetObj = hit.object;

    while(targetObj.parent && !targetObj.userData.isPanel && targetObj !== this.gameContext.scene) {
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

  isWallFacingCamera(wall) {
    const camera = this.gameContext.camera;
  
    const wallPosition = new THREE.Vector3();
    wall.getWorldPosition(wallPosition);
  
    const toCamera = new THREE.Vector3().subVectors(camera.position, wallPosition);
  
    const wallNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(wall.quaternion);
  
    return toCamera.dot(wallNormal) > 0;
  }

  // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Принимаем event ---
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
        clippingPlanes: [] 
    });

    if (this.savedColor !== null) {
        this.applyColor(this.ghostMesh, this.savedColor);
    }
    else if (this.gameContext.sceneClass.globalPanelColor !== null) {
      this.applyColor(this.ghostMesh, this.gameContext.sceneClass.globalPanelColor);
    }

    this.ghostMesh.traverse((child) => { child.raycast = () => {}; });
    
    this.gameContext.scene.add(this.ghostMesh);
    this.ghostMesh.visible = true; 

    // --- ВАЖНО: Принудительное обновление позиции при старте ---
    if (event) {
        this.updatePointer(event); // Обновляем координаты вектора
        this.onPointerMove(event); // Запускаем логику позиционирования
    }
  }

  onPointerMove(event) {
    // А) Логика "отложенного" драга (если кликнули на существующую панель)
    if (this.pendingPanel && !this.isDragging) {
        const dist = Math.sqrt(
            Math.pow(event.clientX - this.mouseDownPointer.x, 2) + 
            Math.pow(event.clientY - this.mouseDownPointer.y, 2)
        );

        if (dist > 15) {
            this.pickupPendingPanel(event);
        }
    }

    // Б) Логика движения призрака
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
        this.applyMaterialProperties(this.ghostMesh, { clippingPlanes: planes });
      }

      this.snapToGrid(hit, wall);
    } else {
      this.moveInAir();
    }
  }

  pickupPendingPanel(event) {
    const targetObj = this.pendingPanel;
    const index = targetObj.userData.panelIndex;

    this.savedColor = null; 
    targetObj.traverse((child) => {
        if (this.savedColor === null && child.isMesh && child.material) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            this.savedColor = mat.color.getHex();
        }
    });

    this.gameContext.sceneClass.deselectPanel();

    targetObj.parent.remove(targetObj);
    this.disposeModel(targetObj);

    this.startDrag(index, event); // Передаем event и сюда, чтобы сразу подхватилось
    this.pendingPanel = null;
    
    // onPointerMove уже вызовется внутри startDrag, но можно оставить и так
  }

  snapToGrid(hit, wall) {
      const width = wall.geometry.parameters.width;
      const height = wall.geometry.parameters.height;
      
      const localPoint = wall.worldToLocal(hit.point.clone());
      const texture = wall.material.map;
      
      const u = (localPoint.x / width) + 0.5;
      const v = (localPoint.y / height) + 0.5;
      
      let rawGridU = u * texture.repeat.x + texture.offset.x;
      let rawGridV = v * texture.repeat.y + texture.offset.y;

      const cellX = Math.floor(rawGridU);
      const cellY = Math.floor(rawGridV);

      const isOccupied = wall.children.some(child => 
        child.userData.isPanel && 
        child.userData.gridX === cellX && 
        child.userData.gridY === cellY
      );

      if (isOccupied) {
        this.ghostMesh.visible = false;
        this.canPlace = false;
      } else {
        this.ghostMesh.visible = true;
        this.canPlace = true;
        
        this.ghostMesh.userData.gridX = cellX;
        this.ghostMesh.userData.gridY = cellY;

        const centerGridU = cellX + 0.5;
        const centerGridV = cellY + 0.5;
        const newU = (centerGridU - texture.offset.x) / texture.repeat.x;
        const newV = (centerGridV - texture.offset.y) / texture.repeat.y;

        localPoint.x = (newU - 0.5) * width;
        localPoint.y = (newV - 0.5) * height;
        localPoint.z = 0; 

        const worldPoint = wall.localToWorld(localPoint);
        this.ghostMesh.position.copy(worldPoint);
        this.ghostMesh.quaternion.copy(wall.quaternion);
        this.ghostMesh.rotateX(Math.PI / 2); 
      }
  }

  moveInAir() {
    this.currentWall = null;
    this.canPlace = true; 
    this.ghostMesh.visible = true;
    this.applyMaterialProperties(this.ghostMesh, { clippingPlanes: [] });
    this.raycaster.ray.at(10, this.ghostMesh.position);
    this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
  }

  onPointerUp(event) {
    if (this.gameContext.controls) this.gameContext.controls.enabled = true;
    
    if (this.pendingPanel) {
        this.gameContext.sceneClass.onPanelSelected(this.pendingPanel);
        this.pendingPanel = null;
        this.savedColor = null; 
        return;
    }

    if (!this.isDragging) return;

    if (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace) {
      this.placePanel();
    }

    this.cleanupGhost();
  }

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
        clippingPlanes: clippingPlanes,
        cloneMaterial: true 
    });

    if (this.savedColor !== null) {
        this.applyColor(newPanel, this.savedColor);
    } else if (this.gameContext.sceneClass.globalPanelColor !== null) {
        this.applyColor(newPanel, this.gameContext.sceneClass.globalPanelColor);
    }

    const worldPosition = this.ghostMesh.position.clone();

    // Добавляем микро-смещение по нормали от стены для предотвращения Z-fighting
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
    worldPosition.add(normal.multiplyScalar(0.005));
    
    this.currentWall.add(newPanel);
    this.currentWall.worldToLocal(worldPosition);
    
    newPanel.position.copy(worldPosition);
    newPanel.rotation.set(0, 0, 0); 
    newPanel.rotateX(Math.PI / 2); 

    this.gameContext.sceneClass.onPanelSelected(newPanel);
  }

  applyColor(object, colorValue) {
    object.traverse((child) => {
        if (child.isMesh && child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];

            materials.forEach((material) => {
                if (!material.color) return;

                // colorValue может быть "#rrggbb" (string) или 0xff00ff (number)
                if (typeof colorValue === 'string') {
                    material.color.set(colorValue);
                } else {
                    material.color.setHex(colorValue);
                }

                material.needsUpdate = true;
            });
        }
    });
  }

  applyMaterialProperties(object, { transparent, opacity, clippingPlanes, cloneMaterial }) {
    object.traverse((child) => {
        if (child.isMesh) {
            if (cloneMaterial) {
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(m => m.clone());
                } else {
                    child.material = child.material.clone();
                }
            }
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(mat => {
                if (transparent !== undefined) mat.transparent = transparent;
                if (opacity !== undefined) mat.opacity = opacity;
                if (clippingPlanes !== undefined) mat.clippingPlanes = clippingPlanes;
                mat.needsUpdate = true;
            });
        }
    });
  }

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

  disposeModel(model) {
      model.traverse(child => {
          if (child.isMesh) {
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                  if (Array.isArray(child.material)) {
                      child.material.forEach(m => m.dispose());
                  } else {
                      child.material.dispose();
                  }
              }
          }
      });
  }

  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  getWallClippingPlanes(wall) {
    const width = wall.geometry.parameters.width;
    const height = wall.geometry.parameters.height;
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(wall.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(wall.quaternion);
    const pos = wall.position;

    return [
      new THREE.Plane().setFromNormalAndCoplanarPoint(right.clone().negate(), pos.clone().add(right.clone().multiplyScalar(width / 2))),
      new THREE.Plane().setFromNormalAndCoplanarPoint(right.clone(), pos.clone().add(right.clone().multiplyScalar(-width / 2))),
      new THREE.Plane().setFromNormalAndCoplanarPoint(up.clone().negate(), pos.clone().add(up.clone().multiplyScalar(height / 2))),
      new THREE.Plane().setFromNormalAndCoplanarPoint(up.clone(), pos.clone().add(up.clone().multiplyScalar(-height / 2)))
    ];
  }
}