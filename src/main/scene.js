import * as THREE from 'three';
import { PanelDragHandler } from './dragHandler'; // Импорт нового класса

const _tempVec = new THREE.Vector3();
const _tempNormal = new THREE.Vector3();

export class SceneClass {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.onWallChanged = null; 

    // Настройки
    this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
    };

    // Свет
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 5, 5);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.baseGridTexture = this.createGridTexture();

    // Создание стен
    this.createWalls();

    // Инициализация DragHandler
    // Передаем массив стен, чтобы хендлер знал с чем работать
    this.dragHandler = new PanelDragHandler(gameContext, this.walls, this.config);
  }

  createScene() {
    this.loadWall();
    this.addLight();
    this.initEvents();
  }

  // --- Методы создания стен ---
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

    // Логика видимости
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
    this.highlightActiveWall();
  }

  addLight() {
    this.gameContext.scene.add(this.directionalLight);
    this.gameContext.scene.add(this.ambientLight);
  }

  // --- Проксирование событий ---
  initEvents() {
    window.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.dragHandler.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.dragHandler.onPointerUp(e));
  }

  // startDrag теперь просто вызывает метод хендлера
  startDrag(type) {
    this.dragHandler.startDrag(type);
  }

  onPointerDown(event) {
    // 1. Сначала даем шанс хендлеру схватить панель
    const isPanelPicked = this.dragHandler.tryPickupPanel(event);
    if (isPanelPicked) return; 

    // 2. Если панель не схвачена, обрабатываем выбор стены
    this.handleWallSelection(event);
  }

  handleWallSelection(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
    
    // Ищем только стены (false - без детей)
    const intersects = this.raycaster.intersectObjects(this.walls, false);

    if (intersects.length > 0) {
      const selectedWall = intersects[0].object;
      this.setActiveWall(selectedWall);
    }
  }

  setActiveWall(wallMesh) {
    const newIndex = this.walls.indexOf(wallMesh);
    this.activeWallIndex = newIndex;
    this.highlightActiveWall();
    if (this.onWallChanged) this.onWallChanged(this.walls[this.activeWallIndex]);
  }

  highlightActiveWall() {
    this.walls.forEach((wall, index) => {
      const isActive = (index === this.activeWallIndex);
      wall.material.color.setHex(isActive ? 0xffffff : 0x888888);
      wall.material.opacity = isActive ? 0.8 : 0.4;
      wall.material.emissive.setHex(isActive ? 0x222222 : 0x000000);
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