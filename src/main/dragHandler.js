import * as THREE from 'three';

export class PanelDragHandler {
  constructor(gameContext, walls, sceneConfig) {
    this.gameContext = gameContext;
    this.walls = walls; // Ссылка на массив стен из SceneClass
    
    // Конфигурация размеров (чтобы не хардкодить)
    this.cellSize = sceneConfig.cellSize || 0.5;
    this.panelDepth = sceneConfig.panelDepth || 0.05;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Состояние
    this.isDragging = false;
    this.ghostMesh = null;
    this.draggedPanelType = null;
    this.currentWall = null;
    this.canPlace = false;
  }

  // --- 1. Попытка схватить существующую панель ---
  // Возвращает true, если мы схватили панель (чтобы SceneClass знал, что клик обработан)
  tryPickupPanel(event) {
    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    // Ищем панели (recursive = true)
    const intersects = this.raycaster.intersectObjects(this.walls, true);

    if (intersects.length > 0) {
      const hitObject = intersects[0].object;

      if (hitObject.userData.isPanel) {
        // Определяем тип
        const hexColor = hitObject.material.color.getHex();
        const type = (hexColor === 0xff4444) ? 'red' : 'green';

        // Удаляем старую
        hitObject.parent.remove(hitObject);
        if(hitObject.geometry) hitObject.geometry.dispose();
        if(hitObject.material) hitObject.material.dispose();

        // Начинаем тащить
        this.startDrag(type);
        this.onPointerMove(event);
        return true;
      }
    }
    return false;
  }

  // --- 2. Старт перетаскивания (из HTML или со стены) ---
  startDrag(panelType) {
    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    this.isDragging = true;
    this.draggedPanelType = panelType;

    const geometry = new THREE.BoxGeometry(this.cellSize, this.cellSize, this.panelDepth);
    const color = panelType === 'red' ? 0xff0000 : 0x00ff00;
    
    const material = new THREE.MeshBasicMaterial({ 
      color: color, 
      opacity: 0.5, 
      transparent: true 
    });

    this.ghostMesh = new THREE.Mesh(geometry, material);
    this.ghostMesh.visible = true; 
    this.ghostMesh.raycast = () => {}; 
    
    this.gameContext.scene.add(this.ghostMesh);
  }

  // --- 3. Движение ---
  onPointerMove(event) {
    if (!this.isDragging || !this.ghostMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    // Игнорируем панели (recursive = false)
    const intersects = this.raycaster.intersectObjects(this.walls, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const wall = hit.object;

      if (this.currentWall !== wall) {
        this.currentWall = wall;
        const planes = this.getWallClippingPlanes(wall);
        this.ghostMesh.material.clippingPlanes = planes;
      }

      this.snapToGrid(hit, wall);
      
    } else {
      this.moveInAir();
    }
  }

  snapToGrid(hit, wall) {
      const width = wall.geometry.parameters.width;
      const height = wall.geometry.parameters.height;
      const localPoint = wall.worldToLocal(hit.point.clone());

      const u = (localPoint.x / width) + 0.5;
      const v = (localPoint.y / height) + 0.5;
      const texture = wall.material.map;
      
      let rawGridU = u * texture.repeat.x + texture.offset.x;
      let rawGridV = v * texture.repeat.y + texture.offset.y;

      const cellX = Math.floor(rawGridU);
      const cellY = Math.floor(rawGridV);

      // Проверка занятости
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
        localPoint.z = this.panelDepth / 2;

        const worldPoint = wall.localToWorld(localPoint);
        this.ghostMesh.position.copy(worldPoint);
        this.ghostMesh.quaternion.copy(wall.quaternion);
      }
  }

  moveInAir() {
    this.currentWall = null;
    this.canPlace = true; 
    this.ghostMesh.visible = true;
    this.ghostMesh.material.clippingPlanes = []; 
    this.raycaster.ray.at(30, this.ghostMesh.position);
    this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
  }

  // --- 4. Завершение ---
  onPointerUp(event) {
    if (this.gameContext.controls) this.gameContext.controls.enabled = true;
    if (!this.isDragging) return;

    if (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace) {
      this.placePanel();
    }

    this.cleanupGhost();
  }

  placePanel() {
    const geometry = new THREE.BoxGeometry(this.cellSize, this.cellSize, this.panelDepth);
    const color = this.draggedPanelType === 'red' ? 0xff4444 : 0x44ff44;
    const clippingPlanes = this.getWallClippingPlanes(this.currentWall);
    
    const material = new THREE.MeshStandardMaterial({ 
        color: color, roughness: 0.5, metalness: 0.1, clippingPlanes: clippingPlanes
    });
    
    const newPanel = new THREE.Mesh(geometry, material);
    newPanel.userData.isPanel = true;
    newPanel.userData.gridX = this.ghostMesh.userData.gridX;
    newPanel.userData.gridY = this.ghostMesh.userData.gridY;

    const worldPosition = this.ghostMesh.position.clone();
    this.currentWall.add(newPanel);
    this.currentWall.worldToLocal(worldPosition);
    newPanel.position.copy(worldPosition);
    newPanel.rotation.set(0, 0, 0);
  }

  cleanupGhost() {
    this.isDragging = false;
    this.currentWall = null;
    this.canPlace = false;
    if (this.ghostMesh) {
      this.gameContext.scene.remove(this.ghostMesh);
      this.ghostMesh.geometry.dispose(); 
      this.ghostMesh.material.dispose();
      this.ghostMesh = null;
    }
  }

  updatePointer(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
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