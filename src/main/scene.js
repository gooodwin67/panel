import * as THREE from 'three';
import { PanelDragHandler } from './dragHandler';

const _tempVec = new THREE.Vector3();
const _tempNormal = new THREE.Vector3();

export class SceneClass {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.onWallChanged = null; 
    
    this.selectedPanel = null;
    
    // Ссылки на объекты комнаты
    this.floor = null;
    this.ceiling = null;
    
    // Ссылки на свет
    this.centerLight = null;
    this.lightBulbMesh = null;

    this.animatingPanels = [];

    this.globalPanelColor = null;

    this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
    };

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
    this.directionalLight.position.set(5, 5, 5);
    
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
    this.createCenterLight(); 
    // this.addLight();
    this.initEvents();
  }

  createCenterLight() {
      const { heightWall } = this.config;

      const bulbGeometry = new THREE.BoxGeometry(0.3,0.05,0.3);
      const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffee }); 
      this.lightBulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
      
      const lightY = (heightWall / 2) - 0.05; 
      this.lightBulbMesh.position.set(0, lightY, 0);
      
      this.gameContext.scene.add(this.lightBulbMesh);

      this.centerLight = new THREE.PointLight(0xffffee, 15, 10, 2); 
      this.centerLight.position.set(0, lightY, 0);
      
      this.centerLight.castShadow = true;
      this.centerLight.shadow.mapSize.width = 1024;
      this.centerLight.shadow.mapSize.height = 1024;
      this.centerLight.shadow.bias = -0.001; 

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
    const speed = 10; 

    for (let i = this.animatingPanels.length - 1; i >= 0; i--) {
        const panel = this.animatingPanels[i];
        
        if (!panel.userData.targetQuaternion) {
            this.animatingPanels.splice(i, 1);
            continue;
        }

        panel.quaternion.slerp(panel.userData.targetQuaternion, delta * speed);

        if (panel.quaternion.angleTo(panel.userData.targetQuaternion) < 0.01) {
            panel.quaternion.copy(panel.userData.targetQuaternion);
            this.animatingPanels.splice(i, 1);
        }
    }
  }

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
  }

  addLight() {
    this.gameContext.scene.add(this.directionalLight);
    this.gameContext.scene.add(this.ambientLight);
  }

  initEvents() {
    window.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.dragHandler.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.dragHandler.onPointerUp(e));
  }

  startDrag(type, event) {
    this.deselectPanel();
    this.dragHandler.startDrag(type, event);
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
    
    // Сначала снимаем выделение с предыдущей
    this.deselectPanel();
    
    this.selectedPanel = panelMesh;
    
    // 1. Добавляем визуальную обводку (ободок)
    this.addSelectionOutline(panelMesh);
    
    // 2. Получаем текущий цвет для UI
    let currentColor = '#ffffff';
    panelMesh.traverse((child) => {
        if (child.isMesh && child.material) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            // Просто считываем цвет, не меняя emissive
            currentColor = '#' + mat.color.getHexString();
        }
    });

    // 3. Показываем UI
    const ui = document.querySelector('.selection-ui');
    if (ui) {
        ui.style.display = 'flex';
        const colorInput = document.getElementById('panel-color-picker');
        if (colorInput) colorInput.value = currentColor;
    }
  }

  // --- ИСПРАВЛЕННАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ОБВОДКИ ---
  addSelectionOutline(panel) {
    const localBox = new THREE.Box3();
    const v = new THREE.Vector3();

    // 1. Принудительно обновляем мировые матрицы всей иерархии панели
    // Это важно, чтобы matrixWorld были актуальны
    panel.updateMatrixWorld(true);

    // 2. Вычисляем обратную матрицу Панели.
    // Это позволит нам "вычесть" положение и поворот панели (и стены) из координат вершин.
    // Мы переводим вершины из Мира в Локальную систему координат Панели.
    const inversePanelMatrix = panel.matrixWorld.clone().invert();

    let hasMesh = false;

    // 3. Проходимся по всем мешам
    panel.traverse((child) => {
        if (child.isMesh && child.geometry) {
            const posAttribute = child.geometry.attributes.position;
            if (posAttribute) {
                for (let i = 0; i < posAttribute.count; i++) {
                    // Берем вершину (в координатах меша)
                    v.fromBufferAttribute(posAttribute, i);
                    
                    // Переводим в Мировые координаты
                    v.applyMatrix4(child.matrixWorld);
                    
                    // Переводим в Локальные координаты Панели (умножаем на обратную матрицу панели)
                    v.applyMatrix4(inversePanelMatrix);
                    
                    // Расширяем бокс
                    localBox.expandByPoint(v);
                }
                hasMesh = true;
            }
        }
    });

    if (!hasMesh) {
        localBox.set(new THREE.Vector3(-0.25, -0.25, 0), new THREE.Vector3(0.25, 0.25, 0.05));
    }

    // 4. Создаем геометрию на основе "чистого" локального бокса
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    localBox.getSize(size);
    localBox.getCenter(center);

    size.multiplyScalar(1.02); // Небольшой отступ

    const outlineGeom = new THREE.BoxGeometry(size.x, size.y, size.z);
    const edges = new THREE.EdgesGeometry(outlineGeom);
    
    const lineMat = new THREE.LineBasicMaterial({ 
        color: 0x00FFFF, 
        depthTest: false,
        depthWrite: false
    });

    const outlineMesh = new THREE.LineSegments(edges, lineMat);
    
    // Позиция outlineMesh относительно Panel будет равна вычисленному центру localBox
    outlineMesh.position.copy(center);
    
    outlineMesh.name = 'selection_outline';
    outlineMesh.raycast = () => {};

    // Добавляем как дочерний элемент. Так как координаты вычислены относительно Panel,
    // рамка встанет идеально, и будет вращаться вместе с панелью.
    panel.add(outlineMesh);
}

  removeSelectionOutline() {
      if (!this.selectedPanel) return;

      const outline = this.selectedPanel.getObjectByName('selection_outline');
      if (outline) {
          this.selectedPanel.remove(outline);
          if (outline.geometry) outline.geometry.dispose();
          if (outline.material) outline.material.dispose();
      }
  }

  deselectPanel() {
    if (!this.selectedPanel) return;
    
    // Удаляем обводку
    this.removeSelectionOutline();

    this.selectedPanel = null;
    
    // Скрываем UI
    const ui = document.querySelector('.selection-ui');
    if (ui) ui.style.display = 'none';
  }

  changeSelectedPanelColor(colorValue) {
    if (!this.selectedPanel) return;

    this.selectedPanel.traverse((child) => {
        if (child.isMesh && child.material && child.name !== 'selection_outline') {
            if (Array.isArray(child.material)) {
                child.material.forEach(m => m.color.set(colorValue));
            } else {
                child.material.color.set(colorValue);
            }
        }
    });
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
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    const intersects = this.raycaster.intersectObjects(this.walls, false);
    if (intersects.length > 0) {
      const selectedWall = intersects[0].object;
    }
  }

  setActiveWall(wallMesh) {
    const newIndex = this.walls.indexOf(wallMesh);
    this.activeWallIndex = newIndex;
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

  setAllPanelsColor(colorValue) {
      this.globalPanelColor = colorValue;

      this.walls.forEach((wall) => {
          wall.traverse((child) => {
              if (child.userData && child.userData.isPanel) {
                  child.traverse((meshChild) => {
                      if (meshChild.isMesh && meshChild.material) {
                          if (Array.isArray(meshChild.material)) {
                              meshChild.material.forEach(m => m.color.set(colorValue));
                          } else {
                              meshChild.material.color.set(colorValue);
                          }
                      }
                  });
              }
          });
      });
  }
}