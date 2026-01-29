import * as THREE from 'three';

// Вспомогательные векторы для математики
const _tempVec = new THREE.Vector3();
const _tempNormal = new THREE.Vector3();

export class SceneClass {
  constructor(gameContext) {
    this.gameContext = gameContext;

    

    // --- Событие: внешний код может подписаться на это ---
    this.onWallChanged = null; 

    // Свет
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 5, 5);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.cellSize = 0.5;
    this.widthWallFront = 5;
    this.heightWall = 2.7;
    this.widthWallSide = 4;

    this.panelDepth = 0.05;

    this.baseGridTexture = this.createGridTexture();

    // Создание стен
    this.wall = this.createWallPlane(this.widthWallFront, this.heightWall);
    this.wall.position.z = -this.widthWallSide/2;
    
    this.wall2 = this.createWallPlane(this.widthWallFront, this.heightWall);
    this.wall2.position.z = this.widthWallSide/2;
    this.wall2.rotation.y = Math.PI;
    
    this.wall3 = this.createWallPlane(this.widthWallSide, this.heightWall);
    this.wall3.rotation.y = -Math.PI/2;
    this.wall3.position.x = this.widthWallFront/2;
    
    this.wall4 = this.createWallPlane(this.widthWallSide, this.heightWall);
    this.wall4.rotation.y = Math.PI/2;
    this.wall4.position.x = -this.widthWallFront/2;

    this.walls = [this.wall, this.wall2, this.wall3, this.wall4];
    this.activeWallIndex = 0;


    // Переменные для драг-н-дропа
    this.isDragging = false;
    this.ghostMesh = null; // Призрак
    this.draggedPanelType = null; // Тип панели (красная/зеленая)
  }

  createScene() {
    this.loadWall();
    this.addLight();
    this.initEvents();
  }

  loadWall() {
    this.walls.forEach(wall => this.gameContext.scene.add(wall));
    // Подсвечиваем стартовую стену
    this.highlightActiveWall();
  }

  addLight() {
    this.gameContext.scene.add(this.directionalLight);
    this.gameContext.scene.add(this.ambientLight);
  }

  // --- Логика событий ---
  initEvents() {
    window.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
  }

  onPointerDown(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    const intersects = this.raycaster.intersectObjects(this.walls);

    if (intersects.length > 0) {
      const selectedWall = intersects[0].object;
      this.setActiveWall(selectedWall);
    }
  }

  setActiveWall(wallMesh) {
    // Меняем индекс
    const newIndex = this.walls.indexOf(wallMesh);
    
    // Если кликнули на ту же стену, можно не обновлять (опционально)
    // if (this.activeWallIndex === newIndex) return;

    this.activeWallIndex = newIndex;
    this.highlightActiveWall();

    // !!! УВЕДОМЛЕНИЕ !!!
    // Если кто-то (GUI) подписался на изменение, вызываем функцию
    if (this.onWallChanged) {
      this.onWallChanged(this.walls[this.activeWallIndex]);
    }
  }

  highlightActiveWall() {
    const colorActive = 0xffffff; 
    const colorInactive = 0x888888; 
    
    this.walls.forEach((wall, index) => {
      if (index === this.activeWallIndex) {
        wall.material.color.setHex(colorActive);
        wall.material.opacity = 0.8;
        wall.material.emissive.setHex(0x222222);
      } else {
        wall.material.color.setHex(colorInactive);
        wall.material.opacity = 0.4;
        wall.material.emissive.setHex(0x000000);
      }
    });
  }

  
  createWallPlane(width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const texture = this.baseGridTexture.clone();
    
    const repeatX = width / this.cellSize;
    const repeatY = height / this.cellSize;

    texture.repeat.set(repeatX, repeatY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      map: texture,
      opacity: 0.6,
      transparent: true,
      side: THREE.FrontSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    // --- НОВАЯ ЛОГИКА СКРЫТИЯ ПАНЕЛЕЙ ---
    mesh.onBeforeRender = function(renderer, scene, camera) {
      // 1. Получаем вектор "от Стены к Камере"
      mesh.getWorldPosition(_tempVec);
      _tempVec.subVectors(camera.position, _tempVec);

      // 2. Получаем направление, куда смотрит стена (ее нормаль)
      _tempNormal.set(0, 0, 1).transformDirection(mesh.matrixWorld);

      // 3. Скалярное произведение: если > 0, значит смотрим спереди
      const isLookingAtFront = _tempVec.dot(_tempNormal) > 0;

      // 4. Скрываем/показываем ВСЕ панели на этой стене
      mesh.children.forEach(child => {
        child.visible = isLookingAtFront;
      });
    };
    // -------------------------------------

    return mesh;
  }

  createGridTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#cccccc'; 
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter; 
    texture.minFilter = THREE.NearestFilter;
    return texture;
  }








  // --- 1. НАЧАЛО ПЕРЕТАСКИВАНИЯ (вызывается из HTML) ---
  startDrag(panelType) {
    this.isDragging = true;
    this.draggedPanelType = panelType;

    // Создаем "Призрака"
    // Пока сделаем простой бокс, позже замените на реальную модель панели
    const geometry = new THREE.BoxGeometry(this.cellSize, this.cellSize, this.panelDepth);
    
    // Цвет зависит от типа
    const color = panelType === 'red' ? 0xff0000 : 0x00ff00;
    
    const material = new THREE.MeshBasicMaterial({ 
      color: color, 
      opacity: 0.5, // Полупрозрачный
      transparent: true 
    });

    this.ghostMesh = new THREE.Mesh(geometry, material);
    
    // Пока прячем его, пока мышка не окажется над стеной
    this.ghostMesh.visible = false; 
    
    // Важно: игнорируем призрака в Raycaster, иначе луч упрется в него же
    this.ghostMesh.raycast = () => {}; 
    
    this.gameContext.scene.add(this.ghostMesh);
  }

  
  // --- 2. ДВИЖЕНИЕ МЫШИ (Универсальное прилипание к текстуре) ---
  onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (!this.isDragging || !this.ghostMesh) return;

    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    const intersects = this.raycaster.intersectObjects(this.walls);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const wall = hit.object;

      // Если мы перешли на новую стену, обновляем плоскости отсечения у призрака
      if (this.currentWall !== wall) {
        this.currentWall = wall;
        // Получаем границы новой стены
        const planes = this.getWallClippingPlanes(wall);
        // Применяем к материалу призрака
        this.ghostMesh.material.clippingPlanes = planes;
      }

      
      
      this.ghostMesh.visible = true;

      // Получаем размеры стены
      const width = wall.geometry.parameters.width;
      const height = wall.geometry.parameters.height;

      // 1. Получаем локальную точку (0,0 - центр стены)
      const localPoint = wall.worldToLocal(hit.point.clone());

      // 2. Переводим в UV-координаты (от 0 до 1)
      // В Three.js UV (0,0) - это левый нижний угол, (1,1) - правый верхний
      let u = (localPoint.x / width) + 0.5;
      let v = (localPoint.y / height) + 0.5;

      // 3. Переводим в "Координаты Сетки" (Texture Space)
      // Точно так же, как это делает шейдер для отрисовки линий
      const texture = wall.material.map;
      
      // Учитываем настройки повторения и сдвига текстуры
      // gridU - это координата в "количестве клеток" (например, 5.4 клетка)
      let gridU = u * texture.repeat.x + texture.offset.x;
      let gridV = v * texture.repeat.y + texture.offset.y;

      // 4. Округляем до центра ближайшей клетки
      // Math.floor(5.4) = 5.   5 + 0.5 = 5.5 (центр)
      gridU = Math.floor(gridU) + 0.5;
      gridV = Math.floor(gridV) + 0.5;

      // 5. Конвертируем обратно: из Сетки -> в UV -> в Локальные XY
      
      // Обратная формула шага 3
      const newU = (gridU - texture.offset.x) / texture.repeat.x;
      const newV = (gridV - texture.offset.y) / texture.repeat.y;

      // Обратная формула шага 2
      localPoint.x = (newU - 0.5) * width;
      localPoint.y = (newV - 0.5) * height;

      // Задаем глубину (чтобы панель была НА стене)
      localPoint.z = this.panelDepth / 2;

      // 6. Переводим в глобальные координаты
      const worldPoint = wall.localToWorld(localPoint);

      this.ghostMesh.position.copy(worldPoint);
      this.ghostMesh.quaternion.copy(wall.quaternion);
      
    } else {
      this.ghostMesh.visible = false;
      this.currentWall = null; // <--- Сбрасываем, если ушли со стены
    }
  }

  // --- 3. КОНЕЦ ПЕРЕТАСКИВАНИЯ ---
  onPointerUp(event) {
    if (!this.isDragging) return;

    // Если призрак виден, значит место валидное — ставим панель
    if (this.ghostMesh && this.ghostMesh.visible) {
      this.placePanel();
    }

    // Удаляем призрака и очищаем состояние
    this.isDragging = false;
    if (this.ghostMesh) {
      this.gameContext.scene.remove(this.ghostMesh);
      // Освобождаем память (важно!)
      this.ghostMesh.geometry.dispose(); 
      this.ghostMesh.material.dispose();
      this.ghostMesh = null;
    }
  }

  placePanel() {
    // Геометрия реальной панели
    const geometry = new THREE.BoxGeometry(this.cellSize, this.cellSize, this.panelDepth);
    
    // Тут можно добавить текстуру панели вместо цвета
    const color = this.draggedPanelType === 'red' ? 0xff4444 : 0x44ff44;

    // Получаем плоскости для текущей стены
    const clippingPlanes = this.getWallClippingPlanes(this.currentWall);

    
    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: 0.5,
        metalness: 0.1,
        clippingPlanes: clippingPlanes
    });
    
    const newPanel = new THREE.Mesh(geometry, material);

    // 1. Берем позицию призрака (Мировые координаты)
    const worldPosition = this.ghostMesh.position.clone();

    // 2. Добавляем панель ВНУТРЬ стены
    this.currentWall.add(newPanel);

    // 3. Конвертируем Мировые координаты в Локальные (относительно стены)
    this.currentWall.worldToLocal(worldPosition);
    newPanel.position.copy(worldPosition);

    // 4. Сбрасываем поворот! 
    // Так как панель теперь внутри стены, она наследует поворот стены.
    // Нам не нужно копировать ghostMesh.quaternion, иначе панель повернется дважды.
    newPanel.rotation.set(0, 0, 0);

    // Копируем позицию и поворот у призрака (он уже стоит ровно по сетке)
    // newPanel.position.copy(this.ghostMesh.position);
    // newPanel.quaternion.copy(this.ghostMesh.quaternion);

    // Добавляем в сцену
    // this.gameContext.scene.add(newPanel);
    
    // Опционально: можно добавлять панель как дочерний элемент стены:
    // wall.add(newPanel); 
    // Но тогда нужно пересчитывать координаты обратно в local.
    // Пока оставим в scene для простоты.
  }



  // --- НОВЫЙ МЕТОД: Создание плоскостей отсечения для стены ---
  getWallClippingPlanes(wall) {
    const width = wall.geometry.parameters.width;
    const height = wall.geometry.parameters.height;

    // 1. Получаем локальные векторы направлений стены, переведенные в мировой поворот
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(wall.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(wall.quaternion);
    
    // Позиция стены
    const pos = wall.position;

    // 2. Создаем 4 плоскости. 
    // Логика: Plane(Normal, Point). Нормаль должна смотреть ВНУТРЬ стены.
    // Все, что "сзади" нормали — обрезается.

    // Правая граница (Нормаль смотрит ВЛЕВО)
    const rightPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      right.clone().negate(), // Нормаль влево
      pos.clone().add(right.clone().multiplyScalar(width / 2)) // Точка на правом краю
    );

    // Левая граница (Нормаль смотрит ВПРАВО)
    const leftPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      right.clone(), 
      pos.clone().add(right.clone().multiplyScalar(-width / 2))
    );

    // Верхняя граница (Нормаль смотрит ВНИЗ)
    const topPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      up.clone().negate(), 
      pos.clone().add(up.clone().multiplyScalar(height / 2))
    );

    // Нижняя граница (Нормаль смотрит ВВЕРХ)
    const bottomPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      up.clone(), 
      pos.clone().add(up.clone().multiplyScalar(-height / 2))
    );

    return [rightPlane, leftPlane, topPlane, bottomPlane];
  }
}