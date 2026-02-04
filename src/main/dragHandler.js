import * as THREE from 'three';

export class PanelDragHandler {
  constructor(gameContext, walls, sceneConfig) {
    this.gameContext = gameContext;
    this.walls = walls; 
    
    // Настройки
    this.cellSize = sceneConfig.cellSize || 0.5;
    this.panelDepth = sceneConfig.panelDepth || 0.05;

    // Инструменты
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Состояние
    this.isDragging = false;
    this.ghostMesh = null;
    this.draggedPanelIndex = null; // Храним индекс модели (0, 1, 2, 3...)
    this.currentWall = null;
    this.canPlace = false;
  }

  // --- 1. Попытка схватить существующую панель ---
  tryPickupPanel(event) {
    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    // Ищем пересечения рекурсивно, так как панель может состоять из нескольких мешей
    const intersects = this.raycaster.intersectObjects(this.walls, true);

    if (intersects.length > 0) {
      // Находим корневой объект панели (поднимаемся вверх по иерархии)
      let targetObj = intersects[0].object;
      
      // Ищем родителя с флагом isPanel, пока не дойдем до сцены
      while(targetObj.parent && !targetObj.userData.isPanel && targetObj !== this.gameContext.scene) {
          targetObj = targetObj.parent;
      }

      if (targetObj.userData.isPanel) {
        // Получаем индекс модели, который мы сохранили при размещении
        const index = targetObj.userData.panelIndex;

        // Удаляем панель со стены
        targetObj.parent.remove(targetObj);
        
        // Освобождаем память
        this.disposeModel(targetObj);

        // Начинаем перетаскивание этой же модели
        this.startDrag(index);
        
        // Сразу обновляем позицию, чтобы "призрак" прыгнул под курсор
        this.onPointerMove(event);
        return true;
      }
    }
    return false;
  }

  // --- 2. Старт перетаскивания ---
  startDrag(panelIndex) {
    // Отключаем управление камерой
    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    this.isDragging = true;
    this.draggedPanelIndex = panelIndex;

    // ВАЖНО: Берем массив моделей здесь, когда они уже точно загружены
    const templates = this.gameContext.assetManager.panels;
    const template = templates[panelIndex];

    if (!template) {
        console.error("Panel model not found or not loaded yet for index:", panelIndex);
        this.isDragging = false;
        return;
    }

    // Создаем призрака (клонируем шаблон)
    this.ghostMesh = template.clone();
    
    // Настраиваем призрака: полупрозрачный, без clipping planes (пока в воздухе)
    this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: [] 
    });

    // Отключаем рейкастинг для самого призрака, чтобы он не мешал лучу
    this.ghostMesh.traverse((child) => {
        child.raycast = () => {}; 
    });
    
    this.gameContext.scene.add(this.ghostMesh);
    this.ghostMesh.visible = true; 
  }

  // --- 3. Движение ---
  onPointerMove(event) {
    if (!this.isDragging || !this.ghostMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    // Ищем стены (без рекурсии, чтобы игнорировать другие панели на стенах)
    const intersects = this.raycaster.intersectObjects(this.walls, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const wall = hit.object;

      // Если перешли на другую стену
      if (this.currentWall !== wall) {
        this.currentWall = wall;
        const planes = this.getWallClippingPlanes(wall);
        
        // Применяем плоскости отсечения к призраку
        this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: planes
        });
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

      const texture = wall.material.map;
      const u = (localPoint.x / width) + 0.5;
      const v = (localPoint.y / height) + 0.5;
      
      // Расчет координат сетки
      let rawGridU = u * texture.repeat.x + texture.offset.x;
      let rawGridV = v * texture.repeat.y + texture.offset.y;

      const cellX = Math.floor(rawGridU);
      const cellY = Math.floor(rawGridV);

      // Проверка: занята ли клетка другой панелью?
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
        
        // Запоминаем координаты клетки в userData призрака
        this.ghostMesh.userData.gridX = cellX;
        this.ghostMesh.userData.gridY = cellY;

        // Центрируем в клетке
        const centerGridU = cellX + 0.5;
        const centerGridV = cellY + 0.5;
        const newU = (centerGridU - texture.offset.x) / texture.repeat.x;
        const newV = (centerGridV - texture.offset.y) / texture.repeat.y;

        localPoint.x = (newU - 0.5) * width;
        localPoint.y = (newV - 0.5) * height;
        localPoint.z = 0; // Позиция Z = 0, так как модель лежит на стене

        const worldPoint = wall.localToWorld(localPoint);
        this.ghostMesh.position.copy(worldPoint);
        
        // Призрак должен повторять поворот стены
        this.ghostMesh.quaternion.copy(wall.quaternion);

        this.ghostMesh.rotateX(Math.PI / 2); 
      }
  }

  moveInAir() {
    this.currentWall = null;
    this.canPlace = true; 
    this.ghostMesh.visible = true;
    
    // В воздухе убираем обрезку
    this.applyMaterialProperties(this.ghostMesh, { clippingPlanes: [] });
    
    // Держим панель перед камерой
    this.raycaster.ray.at(10, this.ghostMesh.position);
    this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
  }

  // --- 4. Завершение (Drop) ---
  onPointerUp(event) {
    // Включаем обратно управление камерой
    if (this.gameContext.controls) this.gameContext.controls.enabled = true;
    
    if (!this.isDragging) return;

    // Если место валидное — ставим панель
    if (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace) {
      this.placePanel();
    }

    this.cleanupGhost();
  }

  placePanel() {
    // Берем шаблон по индексу
    const templates = this.gameContext.assetManager.panels;
    const template = templates[this.draggedPanelIndex];
    
    if (!template) return;

    const newPanel = template.clone();

    // 1. Сохраняем данные (важно для последующего перетаскивания)
    newPanel.userData.isPanel = true;
    newPanel.userData.panelIndex = this.draggedPanelIndex;
    newPanel.userData.gridX = this.ghostMesh.userData.gridX;
    newPanel.userData.gridY = this.ghostMesh.userData.gridY;

    // 2. Настраиваем материалы для финальной панели
    const clippingPlanes = this.getWallClippingPlanes(this.currentWall);
    this.applyMaterialProperties(newPanel, {
        transparent: false,
        opacity: 1,
        clippingPlanes: clippingPlanes,
        cloneMaterial: true // Клонируем материал, чтобы настройки clippingPlanes были уникальны для этой стены
    });

    // 3. Позиционирование
    // Призрак в мировых координатах -> переводим в локальные координаты стены
    const worldPosition = this.ghostMesh.position.clone();
    
    this.currentWall.add(newPanel);
    this.currentWall.worldToLocal(worldPosition);
    
    newPanel.position.copy(worldPosition);
    newPanel.rotation.set(0, 0, 0); // Сбрасываем поворот, так как теперь он наследуется от стены

    newPanel.rotateX(Math.PI / 2); 
  }

  // --- Хелперы ---

  // Рекурсивно применяет свойства материала ко всем мешам в модели
  applyMaterialProperties(object, { transparent, opacity, clippingPlanes, cloneMaterial }) {
    object.traverse((child) => {
        if (child.isMesh) {
            if (cloneMaterial) {
                // Если материал массив (multi-material), клонируем каждый
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(m => m.clone());
                } else {
                    child.material = child.material.clone();
                }
            }
            
            // Применяем свойства (обработка массива или одиночного материала)
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
    
    if (this.ghostMesh) {
      this.gameContext.scene.remove(this.ghostMesh);
      this.disposeModel(this.ghostMesh);
      this.ghostMesh = null;
    }
  }

  // Полная очистка ресурсов модели
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