import * as THREE from "three";
import { PanelDragHandler } from "./dragHandler";

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

    this.sideLight = null;
    this.sideBulbMesh = null;

    this.animatingPanels = [];

    this.globalPanelColor = null;

    this.config = {
      cellSize: 0.5,
      panelDepth: 0.05,
      widthWallFront: 5,
      heightWall: 2.7,
      widthWallSide: 4,
    };

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

    this.lightBulbs = [];
    this.selectedLightBulb = null;
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;
    this.lightDragPlane = new THREE.Plane();
    this.lightDragIntersectionPoint = new THREE.Vector3();
    this.lightDragOffset = new THREE.Vector3();

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.baseGridTexture = this.createGridTexture();
    this.baseBlankTexture = this.createBlankTexture();
    this.isNetVisible = true;

    this.textureLoader = new THREE.TextureLoader();
    this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg");

    this.wallTexture.wrapS = THREE.RepeatWrapping;
    this.wallTexture.wrapT = THREE.RepeatWrapping;
    this.wallTexture.colorSpace = THREE.SRGBColorSpace;
    this.wallTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();

    this.wallNormal = this.textureLoader.load("textures/1/wall-normal.jpg");
    this.wallRoughness = this.textureLoader.load(
      "textures/1/wall-roughness.jpg"
    );

    this.wallNormal.wrapS = THREE.RepeatWrapping;
    this.wallNormal.wrapT = THREE.RepeatWrapping;

    this.wallRoughness.wrapS = THREE.RepeatWrapping;
    this.wallRoughness.wrapT = THREE.RepeatWrapping;

    // Текстуры пола (цвет, нормали, шероховатость)
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

    // Текстура потолка (обычно хватает только цвета)
    this.ceilingTexture = this.textureLoader.load(
      "textures/1/ceiling-color.jpg"
    );
    this.ceilingTexture.wrapS = THREE.RepeatWrapping;
    this.ceilingTexture.wrapT = THREE.RepeatWrapping;
    this.ceilingTexture.colorSpace = THREE.SRGBColorSpace;
    this.ceilingTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();
    // -----------------------

    this.createWalls();
    this.dragHandler = new PanelDragHandler(
      gameContext,
      this.walls,
      this.config
    );
  }

  createScene() {
    this.loadWall();
    this.createFloorAndCeiling();
    this.createRug();
    this.createCenterLight();
    this.addLight();
    this.initEvents();
  }

  createCenterLight() {
    const { heightWall } = this.config;

    const bulbGeometry = new THREE.BoxGeometry(1, 0.05, 1);
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0xffffee,
      emissiveIntensity: 2.0,
      roughness: 0.7,
    });
    this.lightBulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);

    const lightY = heightWall / 2 - 0.03;
    this.lightBulbMesh.position.set(0, lightY, 0);

    this.gameContext.scene.add(this.lightBulbMesh);

    this.centerLight = new THREE.PointLight(0xffe6c2, 60, 0, 2);
    this.centerLight.position.set(0, lightY, 1);

    this.centerLight.castShadow = true;
    this.centerLight.shadow.mapSize.width = 1024;
    this.centerLight.shadow.mapSize.height = 1024;
    this.centerLight.shadow.bias = -0.0001;

    this.gameContext.scene.add(this.centerLight);

    ///////////////////////////////////////////////////

    const sideBulbGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const sideBulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffaa77,
      emissiveIntensity: 2.0,
      roughness: 0.8,
      metalness: 0.8,
    });
    this.sideBulbMesh = new THREE.Mesh(sideBulbGeometry, sideBulbMaterial);
    this.sideBulbMesh.position.set(1.5, 0.5, -1);

    // this.gameContext.scene.add(this.sideBulbMesh);

    this.sideLight = new THREE.PointLight(0xffaa66, 20, 0, 2);
    this.sideLight.position.set(1.5, 0.5, -1);
    this.sideLight.castShadow = true;
    this.sideLight.shadow.mapSize.width = 1024;
    this.sideLight.shadow.mapSize.height = 1024;
    this.sideLight.shadow.bias = -0.0001;
    // this.gameContext.scene.add(this.sideLight);
  }

  createFloorAndCeiling() {
    const { widthWallFront, widthWallSide, heightWall } = this.config;
    const geometry = new THREE.PlaneGeometry(widthWallFront, widthWallSide);

    // Рассчитываем повторение текстуры. Делитель подбирай на глаз (сейчас стоит 2),
    // чтобы плитка/паркет были нужного размера.
    const repeatX = widthWallFront / 2;
    const repeatY = widthWallSide / 2;

    // --- 1. ПОЛ ---
    const floorMap = this.floorTexture.clone();
    const floorNorm = this.floorNormal.clone();
    const floorRough = this.floorRoughness.clone();

    [floorMap, floorNorm, floorRough].forEach((tex) => {
      tex.repeat.set(repeatX, repeatY);
      tex.needsUpdate = true;
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Ставим белый, чтобы текстура не красилась
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

    // --- 2. ПОТОЛОК ---
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

  setRoomColor(target, hexColor) {
    if (target === "floor" && this.floor) {
      this.floor.material.color.setHex(hexColor);
    } else if (target === "ceiling" && this.ceiling) {
      this.ceiling.material.color.setHex(hexColor);
    }
  }

  updateAnimations(delta) {
    const rotationSpeed = 10;
    const moveSpeed = 10;

    for (
      let panelIndex = this.animatingPanels.length - 1;
      panelIndex >= 0;
      panelIndex--
    ) {
      const panel = this.animatingPanels[panelIndex];

      const hasTargetQuaternion = !!panel.userData.targetQuaternion;
      const hasTargetPosition = !!panel.userData.targetPosition;

      if (hasTargetQuaternion) {
        panel.quaternion.slerp(
          panel.userData.targetQuaternion,
          delta * rotationSpeed
        );

        if (panel.quaternion.angleTo(panel.userData.targetQuaternion) < 0.01) {
          panel.quaternion.copy(panel.userData.targetQuaternion);
          delete panel.userData.targetQuaternion;
        }
      }

      if (hasTargetPosition) {
        panel.position.lerp(panel.userData.targetPosition, delta * moveSpeed);

        if (panel.position.distanceTo(panel.userData.targetPosition) < 0.001) {
          panel.position.copy(panel.userData.targetPosition);
          delete panel.userData.targetPosition;
        }
      }

      // Если больше нечего анимировать — убираем из списка
      if (!panel.userData.targetQuaternion && !panel.userData.targetPosition) {
        this.animatingPanels.splice(panelIndex, 1);
      }
    }
  }

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
    this.activeWallIndex = 0;
  }

  createWallPlane(width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);

    const repeatX = width / this.config.cellSize;
    const repeatY = height / this.config.cellSize;

    const wallTexture = this.wallTexture.clone();
    // wallTexture.repeat.set(repeatX, repeatY);
    wallTexture.repeat.set(width / 2, height / 2);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.needsUpdate = true;

    const normalTexture = this.wallNormal.clone();
    const roughTexture = this.wallRoughness.clone();

    normalTexture.repeat.set(repeatX, repeatY);
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

    // const material = new THREE.MeshStandardMaterial({
    //     color: 0xcccccc,
    //     map: gridTexture,
    //     opacity: 0.6,
    //     transparent: true,
    //     side: THREE.FrontSide
    // });

    const material = new THREE.MeshStandardMaterial({
      map: wallTexture,
      normalMap: normalTexture,
      roughnessMap: roughTexture,
      normalScale: new THREE.Vector2(0.3, 0.3),

      alphaMap: gridTexture,
      transparent: true,

      color: 0xffffff,
      roughness: 1.0,
      metalness: 0.0,
      side: THREE.FrontSide,
    });

    material.envMapIntensity = 0.8;

    const mesh = new THREE.Mesh(geometry, material);

    // сохраняем обе текстуры на стене
    mesh.userData.gridTexture = gridTexture;
    mesh.userData.blankTexture = blankTexture;

    mesh.receiveShadow = true;

    mesh.onBeforeRender = function (renderer, scene, camera) {
      mesh.getWorldPosition(_tempVec);
      _tempVec.subVectors(camera.position, _tempVec);
      _tempNormal.set(0, 0, 1).transformDirection(mesh.matrixWorld);
      const isLookingAtFront = _tempVec.dot(_tempNormal) > 0;
      mesh.children.forEach((child) => (child.visible = isLookingAtFront));
    };

    return mesh;
  }

  loadWall() {
    this.walls.forEach((wall) => this.gameContext.scene.add(wall));
  }

  addLight() {
    this.gameContext.scene.add(this.ambientLight);
  }

  initEvents() {
    window.addEventListener("pointerdown", (e) => this.onPointerDown(e));

    window.addEventListener("pointermove", (e) => {
      // если тащим лампочку — обрабатываем тут
      if (this.isDraggingLightBulb) {
        this.onPointerMoveLightBulb(e);
        return;
      }
      this.dragHandler.onPointerMove(e);
    });

    window.addEventListener("pointerup", (e) => {
      if (this.isDraggingLightBulb) {
        this.stopDragLightBulb();
        return;
      }
      this.dragHandler.onPointerUp(e);
    });
  }

  startDrag(type, event) {
    this.deselectPanel();
    this.dragHandler.startDrag(type, event);
  }

  onPointerDown(event) {
    if (
      event.target.closest(".floating-ui") || // Теперь исключает клики по всем нашим плавающим окнам
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "INPUT"
    ) {
      return;
    }

    // Проверка лампочек
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const bulbMeshes = this.lightBulbs.map((obj) => obj.mesh);
    const intersects = this.raycaster.intersectObjects(bulbMeshes, false);

    if (intersects.length > 0) {
      const bulbMesh = intersects[0].object;

      // показываем UI лампы (если у тебя уже есть selectLightBulb)
      this.selectLightBulb(bulbMesh);

      // старт перетаскивания
      this.startDragLightBulb(bulbMesh, event);

      return;
    }

    // Проверка клика по ковру
    if (this.rug) {
      const intersectsRug = this.raycaster.intersectObject(this.rug, false);
      if (intersectsRug.length > 0) {
        this.selectRug();
        return;
      }
    }

    const isPanelTouch = this.dragHandler.handlePointerDown(event);
    if (!isPanelTouch) {
      this.handleWallSelection(event);
      this.deselectPanel();
      this.deselectLightBulb();
      this.deselectRug();
    }
  }

  randomRotate() {
    const panels = [];

    this.walls.forEach((wall) => {
      wall.children.forEach((child) => {
        if (child.userData && child.userData.isPanel) {
          panels.push(child);
        }
      });
    });

    if (panels.length === 0) return;

    // Перемешиваем
    for (let i = panels.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = panels[i];
      panels[i] = panels[randomIndex];
      panels[randomIndex] = temp;
    }

    panels.forEach((panel) => {
      const randomSteps = Math.ceil(Math.random() * 3);
      const randomAngle = randomSteps * (Math.PI / 2);

      const deltaQuaternion = new THREE.Quaternion();
      deltaQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), randomAngle);

      // 🔥 КЛЮЧЕВОЙ МОМЕНТ
      const baseQuaternion = panel.userData.targetQuaternion
        ? panel.userData.targetQuaternion.clone()
        : panel.quaternion.clone();

      panel.userData.targetQuaternion =
        baseQuaternion.multiply(deltaQuaternion);

      if (!this.animatingPanels.includes(panel)) {
        this.animatingPanels.push(panel);
      }
    });
  }

  shufflePanelsOnWalls() {
    // Чтобы обводка/выделение не "съехали" во время перестановки
    this.deselectPanel();

    this.walls.forEach((wall) => {
      // 1) Собираем панели на этой стене
      const panelsOnWall = wall.children.filter(
        (child) => child.userData && child.userData.isPanel
      );
      if (panelsOnWall.length < 2) return;

      // 2) Собираем их занятые клетки
      const occupiedCells = panelsOnWall.map((panel) => ({
        gridX: panel.userData.gridX,
        gridY: panel.userData.gridY,
      }));

      // 3) Перемешиваем клетки (Fisher–Yates)
      for (let i = occupiedCells.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = occupiedCells[i];
        occupiedCells[i] = occupiedCells[randomIndex];
        occupiedCells[randomIndex] = temp;
      }

      // 4) Функция: клетка -> локальная позиция на стене (как в snapToGrid)
      const width = wall.geometry.parameters.width;
      const height = wall.geometry.parameters.height;
      const texture = wall.userData.gridTexture;

      function cellToLocalPosition(gridX, gridY) {
        const centerGridU = gridX + 0.5;
        const centerGridV = gridY + 0.5;

        const newU = (centerGridU - texture.offset.x) / texture.repeat.x;
        const newV = (centerGridV - texture.offset.y) / texture.repeat.y;

        return new THREE.Vector3(
          (newU - 0.5) * width,
          (newV - 0.5) * height,
          0.005
        );
      }

      // 5) Назначаем каждой панели новую клетку и позицию
      panelsOnWall.forEach((panel, index) => {
        const cell = occupiedCells[index];

        panel.userData.gridX = cell.gridX;
        panel.userData.gridY = cell.gridY;

        const targetLocalPosition = cellToLocalPosition(cell.gridX, cell.gridY);

        panel.userData.targetPosition = targetLocalPosition;

        if (!this.animatingPanels.includes(panel)) {
          this.animatingPanels.push(panel);
        }
      });
    });
  }

  onPanelSelected(panelMesh) {
    if (this.selectedPanel === panelMesh) return;

    // Сначала снимаем выделение с предыдущей
    this.deselectPanel();

    this.selectedPanel = panelMesh;

    // 1. Добавляем визуальную обводку (ободок)
    this.addSelectionOutline(panelMesh);

    // 2. Получаем текущий цвет для UI
    let currentColor = "#ffffff";
    panelMesh.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = Array.isArray(child.material)
          ? child.material[0]
          : child.material;
        // Просто считываем цвет, не меняя emissive
        currentColor = "#" + mat.color.getHexString();
      }
    });

    // 3. Показываем UI
    const ui = document.querySelector(".selection-ui");
    if (ui) {
      ui.style.display = "flex";
      const colorInput = document.getElementById("panel-color-picker");
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
      localBox.set(
        new THREE.Vector3(-0.25, -0.25, 0),
        new THREE.Vector3(0.25, 0.25, 0.05)
      );
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
      color: 0x00ffff,
      depthTest: false,
      depthWrite: false,
    });

    const outlineMesh = new THREE.LineSegments(edges, lineMat);

    // Позиция outlineMesh относительно Panel будет равна вычисленному центру localBox
    outlineMesh.position.copy(center);

    outlineMesh.name = "selection_outline";
    outlineMesh.raycast = () => {};

    // Добавляем как дочерний элемент. Так как координаты вычислены относительно Panel,
    // рамка встанет идеально, и будет вращаться вместе с панелью.
    panel.add(outlineMesh);
  }

  removeSelectionOutline() {
    if (!this.selectedPanel) return;

    const outline = this.selectedPanel.getObjectByName("selection_outline");
    if (outline) {
      this.selectedPanel.remove(outline);
      if (outline.geometry) outline.geometry.dispose();
      if (outline.material) outline.material.dispose();
    }
  }

  deselectPanel() {
    this.deselectLightBulb();
    this.deselectRug();
    if (!this.selectedPanel) return;

    // Удаляем обводку
    this.removeSelectionOutline();

    this.selectedPanel = null;

    // Скрываем UI
    const ui = document.querySelector(".selection-ui");
    if (ui) ui.style.display = "none";
  }

  changeSelectedPanelColor(colorValue) {
    if (!this.selectedPanel) return;

    this.selectedPanel.traverse((child) => {
      if (
        child.isMesh &&
        child.material &&
        child.name !== "selection_outline"
      ) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.color.set(colorValue));
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
      this.setActiveWall(intersects[0].object);
    }
  }

  setActiveWall(wallMesh) {
    const newIndex = this.walls.indexOf(wallMesh);
    this.activeWallIndex = newIndex;

    if (this.onWallChanged) {
      this.onWallChanged();
    }
  }

  highlightActiveWall() {
    this.walls.forEach((wall, index) => {
      const isActive = index === this.activeWallIndex;
      wall.material.color.setHex(!isActive ? 0xffffff : 0x888888);
      wall.material.opacity = !isActive ? 0.8 : 0.4;
      //   wall.material.emissive.setHex(!isActive ? 0x222222 : 0x000000);
    });
  }

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
    //   texture.magFilter = THREE.NearestFilter;
    //   texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

  createBlankTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    // texture.magFilter = THREE.NearestFilter;
    // texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

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

  setAllWallsColor(colorValue) {
    this.walls.forEach((wall) => {
      if (wall.material && wall.material.color) {
        wall.material.color.set(colorValue);
      }
    });
  }

  setAllPanelsColor(colorValue) {
    this.globalPanelColor = colorValue;

    this.walls.forEach((wall) => {
      wall.traverse((child) => {
        if (child.userData && child.userData.isPanel) {
          child.traverse((meshChild) => {
            if (meshChild.isMesh && meshChild.material) {
              if (Array.isArray(meshChild.material)) {
                meshChild.material.forEach((m) => m.color.set(colorValue));
              } else {
                meshChild.material.color.set(colorValue);
              }
            }
          });
        }
      });
    });
  }

  addSideLightBulb() {
    const bulbGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffaa77,
      emissiveIntensity: 2.0,
      roughness: 0.8,
      metalness: 0.8,
    });

    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);

    // Случайная позиция внутри комнаты
    const x = (Math.random() - 0.5) * this.config.widthWallFront;
    const y = (Math.random() - 0.5) * this.config.heightWall;
    const z = (Math.random() - 0.5) * this.config.widthWallSide;

    bulbMesh.position.set(x, y, z);

    const pointLight = new THREE.PointLight(0xffaa66, 20, 0, 2);
    pointLight.position.copy(bulbMesh.position);

    pointLight.castShadow = false;

    // ВАЖНО
    bulbMesh.userData.isLightBulb = true;
    bulbMesh.userData.light = pointLight;

    this.gameContext.scene.add(bulbMesh);
    this.gameContext.scene.add(pointLight);

    this.lightBulbs.push({
      mesh: bulbMesh,
      light: pointLight,
    });
  }
  selectLightBulb(bulbMesh) {
    this.deselectPanel(); // чтобы не конфликтовали UI
    this.deselectRug();

    this.selectedLightBulb = bulbMesh;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "flex";

    this.refreshLightBulbUI();
  }

  deselectLightBulb() {
    this.selectedLightBulb = null;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "none";
  }

  refreshLightBulbUI() {
    const bulbMesh = this.selectedLightBulb;
    if (!bulbMesh) return;

    const pointLight = bulbMesh.userData.light;
    if (!pointLight) return;

    const colorInput = document.getElementById("light-color-picker");
    if (colorInput) colorInput.value = "#" + pointLight.color.getHexString();

    const intensityInput = document.getElementById("light-intensity");
    if (intensityInput) intensityInput.value = String(pointLight.intensity);

    const distanceInput = document.getElementById("light-distance");
    if (distanceInput) distanceInput.value = String(pointLight.distance);

    const decayInput = document.getElementById("light-decay");
    if (decayInput) decayInput.value = String(pointLight.decay);

    const bulbVisibleInput = document.getElementById("bulb-visible");
    if (bulbVisibleInput) bulbVisibleInput.checked = bulbMesh.visible;

    const emissiveInput = document.getElementById("bulb-emissive");
    if (
      emissiveInput &&
      bulbMesh.material &&
      bulbMesh.material.emissiveIntensity !== undefined
    ) {
      emissiveInput.value = String(bulbMesh.material.emissiveIntensity);
    }
  }

  startDragLightBulb(bulbMesh, event) {
    this.isDraggingLightBulb = true;
    this.draggedLightBulbMesh = bulbMesh;

    // выключаем OrbitControls, чтобы камера не крутилась
    if (this.gameContext.controls) this.gameContext.controls.enabled = false;

    // плоскость: нормаль = направление камеры, точка = позиция лампы
    const cameraDirection = new THREE.Vector3();
    this.gameContext.camera.getWorldDirection(cameraDirection);

    this.lightDragPlane.setFromNormalAndCoplanarPoint(
      cameraDirection,
      bulbMesh.position
    );

    // оффсет, чтобы лампа не "прыгала" в центр луча
    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    ) {
      this.lightDragOffset
        .copy(this.lightDragIntersectionPoint)
        .sub(bulbMesh.position);
    } else {
      this.lightDragOffset.set(0, 0, 0);
    }
  }

  onPointerMoveLightBulb(event) {
    if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      !this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    )
      return;

    const newPosition = this.lightDragIntersectionPoint
      .clone()
      .sub(this.lightDragOffset);

    this.draggedLightBulbMesh.position.copy(newPosition);

    const pointLight = this.draggedLightBulbMesh.userData.light;
    if (pointLight) pointLight.position.copy(newPosition);
  }

  stopDragLightBulb() {
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;

    if (this.gameContext.controls) this.gameContext.controls.enabled = true;
  }
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  createRug() {
    const { heightWall } = this.config;
    const rugWidth = 4;
    const rugDepth = 3;

    // Вернул BoxGeometry
    const rugGeometry = new THREE.BoxGeometry(rugWidth, 0.005, rugDepth);

    const textureLoader = new THREE.TextureLoader();
    const rugTexture = textureLoader.load("textures/1/carpet-color.jpg");
    const rugBump = textureLoader.load("textures/1/carpet-normal.jpg");

    const repeatX = rugWidth;
    const repeatY = rugDepth;

    rugTexture.wrapS = THREE.RepeatWrapping;
    rugTexture.wrapT = THREE.RepeatWrapping;
    rugTexture.repeat.set(repeatX, repeatY);

    rugBump.wrapS = THREE.RepeatWrapping;
    rugBump.wrapT = THREE.RepeatWrapping;
    rugBump.repeat.set(repeatX, repeatY);

    rugTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();
    rugTexture.colorSpace = THREE.SRGBColorSpace;
    rugTexture.generateMipmaps = true;
    rugTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const rugMaterial = new THREE.MeshStandardMaterial({
      map: rugTexture,
      bumpMap: rugBump,
      bumpScale: 0.08, // Выкрутили посильнее для теста (было 0.02)
      color: 0xffffff,
      roughness: 0.98, // Снизили шероховатость, чтобы появились микроблики на ворсе
      metalness: 0.0,
    });

    this.rug = new THREE.Mesh(rugGeometry, rugMaterial);

    this.rug.position.y = -heightWall / 2 + 0.005;

    this.rug.receiveShadow = true;
    this.rug.castShadow = false;

    this.rug.userData.isRug = true;
    this.rug.userData.baseWidth = rugWidth;
    this.rug.userData.baseDepth = rugDepth;

    this.gameContext.scene.add(this.rug);
  }

  selectRug() {
    this.deselectPanel();
    this.deselectLightBulb();
    this.selectedRug = this.rug;

    const rugUI = document.querySelector(".rug-selection-ui");
    if (rugUI) rugUI.style.display = "flex";
  }

  deselectRug() {
    this.selectedRug = null;
    const rugUI = document.querySelector(".rug-selection-ui");
    if (rugUI) rugUI.style.display = "none";
    if (this.rug) {
      const colorInput = document.getElementById("rug-color-picker");
      if (colorInput)
        colorInput.value = "#" + this.rug.material.color.getHexString();
    }
  }

  updateRugTransform(width, depth, posX, posZ) {
    if (!this.rug) return;

    const baseW = this.rug.userData.baseWidth;
    const baseD = this.rug.userData.baseDepth;

    // Меняем масштаб по осям X и Z (Y оставляем 1, чтобы толщина не менялась)
    this.rug.scale.set(width / baseW, 1, depth / baseD);
    this.rug.position.x = posX;
    this.rug.position.z = posZ;

    // Подгоняем текстуру, чтобы не искажалась
    if (this.rug.material.map) this.rug.material.map.repeat.set(width, depth);
    if (this.rug.material.bumpMap)
      this.rug.material.bumpMap.repeat.set(width, depth);
  }
  changeRugColor(hexColor) {
    if (this.rug && this.rug.material) {
      this.rug.material.color.set(hexColor);
    }
  }
}
