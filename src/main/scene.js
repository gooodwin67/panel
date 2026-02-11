import * as THREE from 'three';
import { PanelDragHandler } from './dragHandler';

const _tempVec = new THREE.Vector3();
const _tempNormal = new THREE.Vector3();

export class SceneClass {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.onWallChanged = null; 
    
    this.selectedPanel = null;
    this.originalEmissives = new Map();

    // Ссылки на объекты комнаты
    this.floor = null;
    this.ceiling = null;
    
    // Ссылки на свет
    this.centerLight = null;
    this.lightBulbMesh = null;

    this.animatingPanels = [];

    this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
    };

    // Направленный свет оставляем как дополнительный (солнце из окна), 
    // но уменьшим его интенсивность, чтобы центральная лампа была главной.
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
    this.directionalLight.position.set(5, 5, 5);
    
    // Ambient свет делаем слабым, чтобы тени были глубокими
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.0);
    

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.baseGridTexture = this.createGridTexture();

    this.createWalls();
    this.dragHandler = new PanelDragHandler(gameContext, this.walls, this.config);
  }

  createScene() {
    this.loadWall();
    this.createFloorAndCeiling();
    this.createCenterLight(); // <--- Создаем центральную лампу
    // this.addLight();
    this.initEvents();
  }

  toggleLight() {
    if (!this.centerLight) return false;
    
    const isOn = this.centerLight.visible;
    this.centerLight.visible = !isOn;
    
    if (this.lightBulbMesh) {
      this.lightBulbMesh.material.color.setHex(isOn ? 0x333333 : 0xffffee);
    }
    
    // Также влияем на AmbientLight если он есть
    if (this.ambientLight) {
        this.ambientLight.intensity = isOn ? 0.0 : 0.1;
    }

    return !isOn; // Возвращаем новый статус
  }

  // --- НОВЫЙ МЕТОД: Центральная лампа ---
  createCenterLight() {
      const { heightWall } = this.config;

      // 1. Визуальный шар (сама лампочка)
      const bulbGeometry = new THREE.BoxGeometry(0.3,0.05,0.3);
      const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffee }); // Светло-желтый, самосветящийся
      this.lightBulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
      
      // Вешаем под потолок (высота потолка / 2 минус радиус шара)
      const lightY = (heightWall / 2) - 0.05; 
      this.lightBulbMesh.position.set(0, lightY, 0);
      
      this.gameContext.scene.add(this.lightBulbMesh);

      // 2. Источник света (PointLight)
      // Цвет, Интенсивность (в новых версиях Three.js это может быть канделы, ставим побольше), Дистанция, Затухание
      this.centerLight = new THREE.PointLight(0xffffee, 15, 10, 2); 
      this.centerLight.position.set(0, lightY, 0);
      
      // Включаем тени
      this.centerLight.castShadow = true;
      
      // Настройки качества теней
      this.centerLight.shadow.mapSize.width = 1024; // 2048 для лучшего качества
      this.centerLight.shadow.mapSize.height = 1024;
      this.centerLight.shadow.bias = -0.001; // Убирает артефакты (полосы) на стенах

      this.gameContext.scene.add(this.centerLight);
  }

  createFloorAndCeiling() {
    const { widthWallFront, widthWallSide, heightWall } = this.config;

    const geometry = new THREE.PlaneGeometry(widthWallFront, widthWallSide);

    // --- 1. ПОЛ ---
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x555555, 
        roughness: 0.8,
        metalness: 0.1,
        side: THREE.FrontSide
    });
    this.floor = new THREE.Mesh(geometry, floorMaterial);
    
    this.floor.rotation.x = -Math.PI / 2; 
    this.floor.position.y = -heightWall / 2;
    
    // ВАЖНО: Пол должен принимать тени
    this.floor.receiveShadow = true; 

    this.gameContext.scene.add(this.floor);

    // --- 2. ПОТОЛОК ---
    const ceilingMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xeeeeee, 
        roughness: 0.9,
        side: THREE.FrontSide
    });
    this.ceiling = new THREE.Mesh(geometry, ceilingMaterial);
    
    this.ceiling.rotation.x = Math.PI / 2; 
    this.ceiling.position.y = heightWall / 2;
    // Потолок тоже может принимать тень (от лампы вверх), но обычно это не нужно для PointLight в той же точке
    this.ceiling.receiveShadow = true;

    this.gameContext.scene.add(this.ceiling);
  }
  
  setRoomColor(target, hexColor) {
      if (target === 'floor' && this.floor) {
          this.floor.material.color.setHex(hexColor);
      } else if (target === 'ceiling' && this.ceiling) {
          this.ceiling.material.color.setHex(hexColor);
      }
  }

  updateAnimations(delta) {
    // ... (без изменений)
  }

  // --- УДАЛЕНО: Мы не рендерим превью в цикле ---
  // if (gameContext.previewClass) {
  //   gameContext.previewClass.animate(delta);
  // }


  createWalls() {
    const { widthWallFront, heightWall, widthWallSide } = this.config;
    this.wall = this.createWallPlane(widthWallFront, heightWall);
    this.wall.position.z = -widthWallSide/2;
    this.wall2 = this.createWallPlane(widthWallFront, heightWall);
    this.wall2.position.z = widthWallSide/2;
    this.wall2.rotation.y = Math.PI;
    this.wall3 = this.createWallPlane(widthWallSide, heightWall);
    this.wall3.rotation.y = -Math.PI/2;
    this.wall3.position.x = widthWallFront/2;
    this.wall4 = this.createWallPlane(widthWallSide, heightWall);
    this.wall4.rotation.y = Math.PI/2;
    this.wall4.position.x = -widthWallFront/2;
    this.walls = [this.wall, this.wall2, this.wall3, this.wall4];
    this.activeWallIndex = 0;
  }

  createWallPlane(width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const texture = this.baseGridTexture.clone();
    const repeatX = width / this.config.cellSize;
    const repeatY = height / this.config.cellSize;
    texture.repeat.set(repeatX, repeatY);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    const material = new THREE.MeshStandardMaterial({
      color: 0xcccccc, map: texture, opacity: 0.6, transparent: true, side: THREE.FrontSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // ВАЖНО: Стены должны принимать тени
    mesh.receiveShadow = true;

    mesh.onBeforeRender = function(renderer, scene, camera) {
      mesh.getWorldPosition(_tempVec);
      _tempVec.subVectors(camera.position, _tempVec);
      _tempNormal.set(0, 0, 1).transformDirection(mesh.matrixWorld);
      const isLookingAtFront = _tempVec.dot(_tempNormal) > 0;
      mesh.children.forEach(child => child.visible = isLookingAtFront);
    };
    return mesh;
  }

  loadWall() {
    this.walls.forEach(wall => this.gameContext.scene.add(wall));
    //this.highlightActiveWall();
  }

  addLight() {
    this.gameContext.scene.add(this.directionalLight);
    this.gameContext.scene.add(this.ambientLight);
  }

  initEvents() {
    const onDown = (e) => this.onPointerDown(e);
    const onMove = (e) => this.dragHandler.onPointerMove(e);
    const onUp = (e) => this.dragHandler.onPointerUp(e);

    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    window.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp, { passive: false });
  }

  startDrag(type) {
    this.deselectPanel();
    this.dragHandler.startDrag(type);
  }

  onPointerDown(event) {
    if (event.target.closest('.selection-ui') || event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT') {
        return; 
    }
    const isPanelTouch = this.dragHandler.handlePointerDown(event);
    if (!isPanelTouch) {
        this.handleWallSelection(event);
        this.deselectPanel();
    }
  }

  onPanelSelected(panelMesh) {
    if (this.selectedPanel === panelMesh) return;
    this.deselectPanel();
    this.selectedPanel = panelMesh;
    
    // 1. Получаем текущий цвет панели (берем у первого ребенка-меша)
    let currentColor = '#ffffff';
    panelMesh.traverse((child) => {
        if (child.isMesh && child.material) {
            // Сохраняем оригинальный emissive (подсветку выделения)
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            this.originalEmissives.set(child.uuid, mat.emissive.getHex());
            
            // Включаем подсветку выделения
            //mat.emissive.setHex(0x555544);
            
            // Запоминаем цвет для UI
            currentColor = '#' + mat.color.getHexString();
        }
    });

    

    // 2. Показываем UI и обновляем Color Picker
    const ui = document.querySelector('.selection-ui');
    if (ui) {
        ui.style.display = 'flex';
        // Находим инпут цвета и ставим значение
        const colorInput = document.getElementById('panel-color-picker');
        if (colorInput) colorInput.value = currentColor;
    }
  }

  changeSelectedPanelColor(colorValue) {
    if (!this.selectedPanel) return;

    this.selectedPanel.traverse((child) => {
        if (child.isMesh && child.material) {
            // Если материалов массив (редко для GLTF, но бывает)
            if (Array.isArray(child.material)) {
                child.material.forEach(m => m.color.set(colorValue));
            } else {
                child.material.color.set(colorValue);
            }
        }
    });
}

  deselectPanel() {
    if (!this.selectedPanel) return;
    this.selectedPanel.traverse((child) => {
        if (child.isMesh && child.material) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            const originalHex = this.originalEmissives.get(child.uuid) || 0x000000;
            mat.emissive.setHex(originalHex);
        }
    });
    this.selectedPanel = null;
    this.originalEmissives.clear();
    const ui = document.querySelector('.selection-ui');
    if (ui) ui.style.display = 'none';
  }

  rotateSelectedPanel(angle) {
    if (!this.selectedPanel) return;
    const panel = this.selectedPanel;

    if (!panel.userData.targetQuaternion) {
        panel.userData.targetQuaternion = panel.quaternion.clone();
    }

    const deltaRotation = new THREE.Quaternion();
    deltaRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

    panel.userData.targetQuaternion.multiply(deltaRotation);

    if (!this.animatingPanels.includes(panel)) {
        this.animatingPanels.push(panel);
    }
  }

  handleWallSelection(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    // Ищем пересечения только со стенами, игнорируя пол и потолок
    const intersects = this.raycaster.intersectObjects(this.walls, false);
    if (intersects.length > 0) {
      const selectedWall = intersects[0].object;
      //this.setActiveWall(selectedWall);
    }
  }

  setActiveWall(wallMesh) {
    const newIndex = this.walls.indexOf(wallMesh);
    this.activeWallIndex = newIndex;
    // this.highlightActiveWall();
    if (this.onWallChanged) this.onWallChanged(this.walls[this.activeWallIndex]);
  }

  highlightActiveWall() {
    this.walls.forEach((wall, index) => {
      const isActive = (index === this.activeWallIndex);
      wall.material.color.setHex(!isActive ? 0xffffff : 0x888888);
      wall.material.opacity = !isActive ? 0.8 : 0.4;
      wall.material.emissive.setHex(!isActive ? 0x222222 : 0x000000);
    });
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
}