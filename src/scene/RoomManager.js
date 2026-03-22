import * as THREE from "three";

const _tempVec = new THREE.Vector3();
const _tempNormal = new THREE.Vector3();

export class RoomManager {
  // ---- Готовит ресурсы комнаты ----
  constructor(gameContext, config, onWallChanged) {
    this.gameContext = gameContext;
    this.config = config;
    this.onWallChanged = onWallChanged;

    this.floor = null;
    this.ceiling = null;
    this.isNetVisible = true;
    this.activeWallIndex = 0;

    this.textureLoader = new THREE.TextureLoader();
    this.baseGridTexture = this.createGridTexture();
    this.baseBlankTexture = this.createBlankTexture();

    this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg");
    this.wallTexture.wrapS = THREE.RepeatWrapping;
    this.wallTexture.wrapT = THREE.RepeatWrapping;
    this.wallTexture.colorSpace = THREE.SRGBColorSpace;
    this.wallTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    this.wallRoughness = this.textureLoader.load(
      "textures/1/wall-roughness.jpg"
    );
    this.wallRoughness.wrapS = THREE.RepeatWrapping;
    this.wallRoughness.wrapT = THREE.RepeatWrapping;

    this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg");
    this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg");
    this.floorRoughness = this.textureLoader.load(
      "textures/1/floor-roughness.jpg"
    );
    [this.floorTexture, this.floorNormal, this.floorRoughness].forEach(
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
      }
    );
    this.floorTexture.colorSpace = THREE.SRGBColorSpace;
    this.floorTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    this.ceilingTexture = this.textureLoader.load(
      "textures/1/ceiling-color.jpg"
    );
    this.ceilingTexture.wrapS = THREE.RepeatWrapping;
    this.ceilingTexture.wrapT = THREE.RepeatWrapping;
    this.ceilingTexture.colorSpace = THREE.SRGBColorSpace;
    this.ceilingTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    this.createWalls();
  }
  // ---- Создает комнату ----
  createScene() {
    this.loadWalls();
    this.createFloorAndCeiling();
  }
  // ---- Создает стены ----
  createWalls() {
    const { widthWallFront, heightWall, widthWallSide } = this.config;

    this.wall = this.createWallPlane(widthWallFront, heightWall);
    this.wall.position.z = -widthWallSide / 2;

    this.wall2 = this.createWallPlane(widthWallFront, heightWall);
    this.wall2.position.z = widthWallSide / 2;
    this.wall2.rotation.y = Math.PI;

    this.wall3 = this.createWallPlane(widthWallSide, heightWall);
    this.wall3.rotation.y = -Math.PI / 2;
    this.wall3.position.x = widthWallFront / 2;

    this.wall4 = this.createWallPlane(widthWallSide, heightWall);
    this.wall4.rotation.y = Math.PI / 2;
    this.wall4.position.x = -widthWallFront / 2;

    this.walls = [this.wall, this.wall2, this.wall3, this.wall4];
  }
  // ---- Строит одну стену ----
  createWallPlane(width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const repeatX = width / this.config.cellSize;
    const repeatY = height / this.config.cellSize;

    const wallTexture = this.wallTexture.clone();
    wallTexture.repeat.set(width / 2, height / 2);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.needsUpdate = true;

    const roughTexture = this.wallRoughness.clone();
    roughTexture.repeat.set(repeatX, repeatY);

    const gridTexture = this.baseGridTexture.clone();
    gridTexture.repeat.set(repeatX, repeatY);
    gridTexture.wrapS = THREE.RepeatWrapping;
    gridTexture.wrapT = THREE.RepeatWrapping;
    gridTexture.needsUpdate = true;

    const blankTexture = this.baseBlankTexture.clone();
    blankTexture.repeat.set(repeatX, repeatY);
    blankTexture.wrapS = THREE.RepeatWrapping;
    blankTexture.wrapT = THREE.RepeatWrapping;
    blankTexture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
      map: wallTexture,
      roughnessMap: roughTexture,
      alphaMap: gridTexture,
      transparent: true,
      color: 0xffffff,
      roughness: 1.0,
      metalness: 0.0,
      side: THREE.FrontSide,
    });

    material.envMapIntensity = 0.8;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.gridTexture = gridTexture;
    mesh.userData.blankTexture = blankTexture;
    mesh.receiveShadow = true;

    mesh.onBeforeRender = (renderer, scene, camera) => {
      mesh.getWorldPosition(_tempVec);
      _tempVec.subVectors(camera.position, _tempVec);
      _tempNormal.set(0, 0, 1).transformDirection(mesh.matrixWorld);
      const isLookingAtFront = _tempVec.dot(_tempNormal) > 0;
      mesh.children.forEach((child) => {
        child.visible = isLookingAtFront;
      });
    };

    return mesh;
  }
  // ---- Добавляет стены в сцену ----
  loadWalls() {
    this.walls.forEach((wall) => this.gameContext.scene.add(wall));
  }
  // ---- Создает пол и потолок ----
  createFloorAndCeiling() {
    const { widthWallFront, widthWallSide, heightWall } = this.config;
    const geometry = new THREE.PlaneGeometry(widthWallFront, widthWallSide);
    const repeatX = widthWallFront / 2;
    const repeatY = widthWallSide / 2;

    const floorMap = this.floorTexture.clone();
    const floorNorm = this.floorNormal.clone();
    const floorRough = this.floorRoughness.clone();

    [floorMap, floorNorm, floorRough].forEach((tex) => {
      tex.repeat.set(repeatX, repeatY);
      tex.needsUpdate = true;
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: floorMap,
      normalMap: floorNorm,
      roughnessMap: floorRough,
      roughness: 1.0,
      metalness: 0.1,
      side: THREE.FrontSide,
    });

    this.floor = new THREE.Mesh(geometry, floorMaterial);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -heightWall / 2;
    this.floor.receiveShadow = true;
    this.gameContext.scene.add(this.floor);

    const ceilingMap = this.ceilingTexture.clone();
    ceilingMap.repeat.set(repeatX, repeatY);
    ceilingMap.needsUpdate = true;

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: ceilingMap,
      roughness: 0.9,
      side: THREE.FrontSide,
    });

    this.ceiling = new THREE.Mesh(geometry, ceilingMaterial);
    this.ceiling.rotation.x = Math.PI / 2;
    this.ceiling.position.y = heightWall / 2;
    this.ceiling.receiveShadow = true;
    this.gameContext.scene.add(this.ceiling);
  }
  // ---- Меняет цвет комнаты ----
  setRoomColor(target, hexColor) {
    if (target === "floor" && this.floor) {
      this.floor.material.color.setHex(hexColor);
    } else if (target === "ceiling" && this.ceiling) {
      this.ceiling.material.color.setHex(hexColor);
    }
  }
  // ---- Ловит выбор стены ----
  handleWallSelection(event) {
    const pointer = this.getPointer(event);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.gameContext.camera);

    const intersects = raycaster.intersectObjects(this.walls, false);
    if (intersects.length > 0) {
      this.setActiveWall(intersects[0].object);
    }
  }
  // ---- Сохраняет активную стену ----
  setActiveWall(wallMesh) {
    const nextIndex = this.walls.indexOf(wallMesh);
    if (nextIndex === -1) return;

    this.activeWallIndex = nextIndex;
    if (this.onWallChanged) {
      this.onWallChanged();
    }
  }
  // ---- Подсвечивает стену ----
  highlightActiveWall() {
    this.walls.forEach((wall, index) => {
      const isActive = index === this.activeWallIndex;
      wall.material.color.setHex(!isActive ? 0xffffff : 0x888888);
      wall.material.opacity = !isActive ? 0.8 : 0.4;
    });
  }
  // ---- Показывает сетку стены ----
  toggleNet() {
    this.isNetVisible = !this.isNetVisible;

    this.walls.forEach((wall) => {
      if (!wall.material) return;

      wall.material.alphaMap = this.isNetVisible
        ? wall.userData.gridTexture
        : null;
      wall.material.needsUpdate = true;
    });
  }
  // ---- Красит все стены ----
  setAllWallsColor(colorValue) {
    this.walls.forEach((wall) => {
      if (wall.material?.color) {
        wall.material.color.set(colorValue);
      }
    });
  }
  // ---- Создает текстуру сетки ----
  createGridTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    return texture;
  }
  // ---- Создает пустую текстуру ----
  createBlankTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    return texture;
  }
  // ---- Считает координаты указателя ----
  getPointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    return new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    );
  }
}
