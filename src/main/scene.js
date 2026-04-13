import { PanelDragHandler } from "./dragHandler.js";
import { LightManager } from "../scene/LightManager.js";
import { PanelManager } from "../scene/PanelManager.js";
import { RoomManager } from "../scene/RoomManager.js";
import { RugManager } from "../scene/RugManager.js";
import { FurnitureManager } from "../scene/FurnitureManager.js";
import { SceneInteractionController } from "../scene/SceneInteractionController.js";

export class SceneClass {
  // ---- Собирает модули сцены ----
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.onWallChanged = null;
    this.isSceneLocked = false;
    const worldScale = gameContext.sceneConfig?.worldScale || 1;

    this.config = {
      worldScale,
      cellSize: 0.5 * worldScale,
      panelDepth: 0.05 * worldScale,
      widthWallFront: 5 * worldScale,
      heightWall: 2.7 * worldScale,
      widthWallSide: 4 * worldScale,
    };

    this.roomManager = new RoomManager(gameContext, this.config, () => {
      if (this.onWallChanged) {
        this.onWallChanged();
      }
    });
    this.panelManager = new PanelManager(this.roomManager);
    this.lightManager = new LightManager(gameContext, this.config);
    this.rugManager = new RugManager(gameContext, this.config);
    this.furnitureManager = new FurnitureManager(gameContext, this.config);

    this.dragHandler = new PanelDragHandler(
      gameContext,
      this.roomManager.walls,
      this.config
    );
    this.interactionController = new SceneInteractionController(
      this,
      this.dragHandler
    );
  }

  // ---- Создает содержимое сцены ----
  createScene() {
    this.roomManager.createScene();
    this.rugManager.createScene();
    this.lightManager.createScene();
    this.interactionController.bindEvents();
  }

  // ---- Возвращает сериализуемое состояние сцены ----
  getSceneState() {
    const panels = this.panelManager.getAllPanels().map((panel) => {
      let color = "#ffffff";
      panel.traverse((child) => {
        if (child.isMesh && child.material && color === "#ffffff") {
          const material = Array.isArray(child.material)
            ? child.material[0]
            : child.material;
          color = "#" + material.color.getHexString();
        }
      });

      return {
        wallIndex: this.roomManager.walls.indexOf(panel.parent),
        panelIndex: panel.userData.panelIndex,
        gridX: panel.userData.gridX,
        gridY: panel.userData.gridY,
        position: panel.position.toArray(),
        quaternion: panel.quaternion.toArray(),
        color,
      };
    });

    const wallStates = this.roomManager.walls.map((wall) => ({
      color: wall.material?.color ? "#" + wall.material.color.getHexString() : "#ffffff",
      offsetX: wall.userData.gridTexture?.offset.x || 0,
      offsetY: wall.userData.gridTexture?.offset.y || 0,
    }));

    const sideLights = this.lightManager.lightBulbs.map(({ mesh, light }) => ({
      position: mesh.position.toArray(),
      color: "#" + light.color.getHexString(),
      intensity: light.intensity,
      distance: light.distance,
      decay: light.decay,
      visible: mesh.visible,
      isRoomLight: !!mesh.userData.isRoomLight,
      emissiveIntensity: this.lightManager.getLightBulbEmissiveIntensity(mesh),
    }));

    const rug = this.rugManager.rug
      ? {
          width: this.rugManager.rug.userData.baseWidth * this.rugManager.rug.scale.x,
          depth: this.rugManager.rug.userData.baseDepth * this.rugManager.rug.scale.z,
          posX: this.rugManager.rug.position.x,
          posZ: this.rugManager.rug.position.z,
          color: "#" + this.rugManager.rug.material.color.getHexString(),
        }
      : null;

    const table = this.furnitureManager.furnitureItems[0]
      ? {
          width:
            this.furnitureManager.furnitureItems[0].userData.baseWidth *
            this.furnitureManager.furnitureItems[0].scale.x,
          depth:
            this.furnitureManager.furnitureItems[0].userData.baseDepth *
            this.furnitureManager.furnitureItems[0].scale.z,
          posX: this.furnitureManager.furnitureItems[0].position.x,
          posZ: this.furnitureManager.furnitureItems[0].position.z,
          rotationStep: this.furnitureManager.furnitureItems[0].userData.rotationStep || 0,
        }
      : null;

    const lamp = this.furnitureManager.tableLamps[0]
      ? {
          width:
            this.furnitureManager.tableLamps[0].userData.baseWidth *
            this.furnitureManager.tableLamps[0].scale.x,
          height:
            this.furnitureManager.tableLamps[0].userData.baseHeight *
            this.furnitureManager.tableLamps[0].scale.y,
          posX: this.furnitureManager.tableLamps[0].position.x,
          posY: this.furnitureManager.tableLamps[0].position.y,
          posZ: this.furnitureManager.tableLamps[0].position.z,
        }
      : null;

    const wallTv = this.furnitureManager.wallTvs[0]
      ? {
          width:
            this.furnitureManager.wallTvs[0].userData.baseWidth *
            this.furnitureManager.wallTvs[0].scale.x,
          height:
            this.furnitureManager.wallTvs[0].userData.baseHeight *
            this.furnitureManager.wallTvs[0].scale.y,
          posX: this.furnitureManager.wallTvs[0].position.x,
          posY: this.furnitureManager.wallTvs[0].position.y,
          wallIndex: this.furnitureManager.wallTvs[0].userData.wallIndex || 0,
        }
      : null;

    return {
      version: 1,
      worldScale: this.config.worldScale,
      activeWallIndex: this.roomManager.activeWallIndex,
      isNetVisible: this.roomManager.isNetVisible,
      globalPanelColor: this.panelManager.globalPanelColor,
      walls: wallStates,
      panels,
      sideLights,
      ambientLight: {
        intensity: this.lightManager.ambientLight.intensity,
        color: "#" + this.lightManager.ambientLight.color.getHexString(),
      },
      rug,
      table,
      lamp,
      wallTv,
    };
  }

  // ---- Применяет сохраненное состояние сцены ----
  applySceneState(state) {
    if (!state || typeof state !== "object") {
      throw new Error("Некорректное состояние сцены");
    }

    this.clearSelections();

    this.roomManager.walls.forEach((wall) => {
      wall.children
        .filter((child) => child.userData?.isPanel)
        .forEach((panel) => {
          wall.remove(panel);
          this.dragHandler.disposeModel(panel);
        });
    });

    this.lightManager.lightBulbs.forEach(({ mesh, light }) => {
      this.gameContext.scene.remove(mesh);
      this.gameContext.scene.remove(light);
      this.lightManager.disposeLightBulbMesh(mesh);
    });
    this.lightManager.lightBulbs = [];
    this.lightManager.fillLights = [];
    this.lightManager.deselectLightBulb();

    this.furnitureManager.deleteTableLamp();
    this.furnitureManager.deleteWallTv();
    this.furnitureManager.deleteTable();

    if (Array.isArray(state.walls)) {
      state.walls.forEach((wallState, index) => {
        const wall = this.roomManager.walls[index];
        if (!wall) return;

        if (wallState.color && wall.material?.color) {
          wall.material.color.set(wallState.color);
        }

        if (wall.userData.gridTexture) {
          wall.userData.gridTexture.offset.x = Number(wallState.offsetX || 0);
          wall.userData.gridTexture.offset.y = Number(wallState.offsetY || 0);
          wall.userData.gridTexture.needsUpdate = true;
        }
      });
    }

    if (typeof state.activeWallIndex === "number") {
      this.roomManager.activeWallIndex = state.activeWallIndex;
      this.roomManager.highlightActiveWall();
      if (this.onWallChanged) {
        this.onWallChanged();
      }
    }

    if (typeof state.isNetVisible === "boolean" && state.isNetVisible !== this.roomManager.isNetVisible) {
      this.roomManager.toggleNet();
    }

    this.panelManager.globalPanelColor = state.globalPanelColor || null;

    (state.panels || []).forEach((panelState) => {
      const wall = this.roomManager.walls[panelState.wallIndex];
      const template = this.gameContext.assetManager.panels[panelState.panelIndex];
      if (!wall || !template) return;

      const panel = template.clone();
      panel.userData.isPanel = true;
      panel.userData.panelIndex = panelState.panelIndex;
      panel.userData.gridX = panelState.gridX;
      panel.userData.gridY = panelState.gridY;

      const clippingPlanes = this.dragHandler.getWallClippingPlanes(wall);
      this.dragHandler.applyMaterialProperties(panel, {
        transparent: false,
        opacity: 1,
        clippingPlanes,
        cloneMaterial: true,
      });

      if (panelState.color) {
        this.dragHandler.applyColor(panel, panelState.color);
      } else if (this.panelManager.globalPanelColor) {
        this.dragHandler.applyColor(panel, this.panelManager.globalPanelColor);
      }

      wall.add(panel);
      if (Array.isArray(panelState.position)) {
        panel.position.fromArray(panelState.position);
      }
      if (Array.isArray(panelState.quaternion)) {
        panel.quaternion.fromArray(panelState.quaternion);
      } else {
        panel.rotation.set(0, 0, 0);
        panel.rotateX(Math.PI / 2);
      }
    });

    if (state.ambientLight) {
      this.lightManager.ambientLight.intensity = Number(state.ambientLight.intensity ?? this.lightManager.ambientLight.intensity);
      if (state.ambientLight.color) {
        this.lightManager.ambientLight.color.set(state.ambientLight.color);
      }
    }

    (state.sideLights || []).forEach((lightState) => {
      const latest = this.lightManager.addLightBulb({
        color: lightState.color || 0xffaa66,
        intensity: Number(lightState.intensity ?? this.lightManager.defaultSideLightIntensity),
        distance: Number(lightState.distance ?? this.lightManager.defaultSideLightDistance),
        decay: Number(lightState.decay ?? 1.7),
        isRoomLight: !!lightState.isRoomLight,
      });
      if (!latest) return;

      latest.mesh.position.fromArray(lightState.position || latest.mesh.position.toArray());
      latest.light.position.copy(latest.mesh.position);
      latest.light.color.set(lightState.color || "#ffaa66");
      latest.light.intensity = Number(lightState.intensity ?? latest.light.intensity);
      latest.light.distance = Number(lightState.distance ?? latest.light.distance);
      latest.light.decay = Number(lightState.decay ?? latest.light.decay);
      latest.mesh.visible = lightState.visible !== false;
      this.lightManager.setLightBulbEmissiveIntensity(
        latest.mesh,
        Number(
          lightState.emissiveIntensity ??
          this.lightManager.getLightBulbEmissiveIntensity(latest.mesh)
        )
      );
      this.lightManager.syncLightFixture(latest.light);
    });

    if (state.rug && this.rugManager.rug) {
      this.rugManager.updateRugTransform(
        Number(state.rug.width),
        Number(state.rug.depth),
        Number(state.rug.posX),
        Number(state.rug.posZ)
      );
      if (state.rug.color) {
        this.rugManager.changeRugColor(state.rug.color);
      }
    }

    if (state.table) {
      const table = this.addTable();
      if (table) {
        this.furnitureManager.selectFurniture(table);
        this.updateFurnitureTransform(
          Number(state.table.width),
          Number(state.table.depth),
          Number(state.table.posX),
          Number(state.table.posZ)
        );
        this.updateFurnitureRotation(Number(state.table.rotationStep || 0));
      }
    }

    if (state.lamp) {
      const lamp = this.addTableLamp();
      if (lamp) {
        this.selectTableLamp(lamp);
        this.updateTableLampTransform(
          Number(state.lamp.width),
          Number(state.lamp.height),
          Number(state.lamp.posX),
          Number(state.lamp.posY),
          Number(state.lamp.posZ)
        );
      }
    }

    if (state.wallTv) {
      const wallTv = this.addWallTv();
      if (wallTv) {
        this.selectWallTv(wallTv);
        this.updateWallTvTransform(
          Number(state.wallTv.width),
          Number(state.wallTv.height),
          Number(state.wallTv.posX),
          Number(state.wallTv.posY),
          Number(state.wallTv.wallIndex || 0) + 1
        );
      }
    }
  }

  // ---- Меняет цвет комнаты ----
  setRoomColor(target, hexColor) {
    this.roomManager.setRoomColor(target, hexColor);
  }

  // ---- Обновляет анимации панелей ----
  updateAnimations(delta) {
    this.panelManager.updateAnimations(delta);
  }

  // ---- Стартует перенос панели ----
  startDrag(type, event) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.dragHandler.startDrag(type, event);
  }

  // ---- Случайно вращает панели ----
  randomRotate() {
    if (this.isSceneLocked) return;

    this.panelManager.randomRotate();
  }

  // ---- Перемешивает панели по стенам ----
  shufflePanelsOnWalls() {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.panelManager.shufflePanelsOnWalls();
  }

  // ---- Добавляет стол в комнату ----
  addTable() {
    if (this.isSceneLocked) return null;

    this.clearSelections();
    return this.furnitureManager.addTable();
  }

  // ---- Удаляет стол из комнаты ----
  deleteTable() {
    this.furnitureManager.deleteTable();
  }

  // ---- Добавляет лампу на стол ----
  addTableLamp() {
    if (this.isSceneLocked) return null;

    this.clearSelections();
    return this.furnitureManager.addTableLamp();
  }

  // ---- Удаляет лампу со стола ----
  deleteTableLamp() {
    this.furnitureManager.deleteTableLamp();
  }

  // ---- Добавляет телевизор на стену ----
  addWallTv() {
    if (this.isSceneLocked) return null;

    this.clearSelections();
    return this.furnitureManager.addWallTv();
  }

  // ---- Удаляет телевизор со стены ----
  deleteWallTv() {
    this.furnitureManager.deleteWallTv();
  }

  // ---- Выбирает телевизор ----
  selectWallTv(tv) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.furnitureManager.selectWallTv(tv);
  }

  // ---- Снимает выбор телевизора ----
  deselectWallTv() {
    this.furnitureManager.deselectWallTv();
  }

  // ---- Обновляет трансформацию телевизора ----
  updateWallTvTransform(width, height, posX, posY, wallNumber) {
    this.furnitureManager.updateWallTvTransform(
      width,
      height,
      posX,
      posY,
      wallNumber
    );
  }

  // ---- Выбирает настольную лампу ----
  selectTableLamp(lamp) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.furnitureManager.selectLamp(lamp);
  }

  // ---- Снимает выбор настольной лампы ----
  deselectTableLamp() {
    this.furnitureManager.deselectLamp();
  }

  // ---- Обновляет трансформацию настольной лампы ----
  updateTableLampTransform(width, height, posX, posY, posZ) {
    this.furnitureManager.updateLampTransform(width, height, posX, posY, posZ);
  }

  // ---- Выбирает мебель ----
  selectFurniture(furniture) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.furnitureManager.selectFurniture(furniture);
  }

  // ---- Снимает выбор мебели ----
  deselectFurniture() {
    this.furnitureManager.deselectFurniture();
  }

  // ---- Обновляет трансформацию мебели ----
  updateFurnitureTransform(width, depth, posX, posZ) {
    this.furnitureManager.updateFurnitureTransform(width, depth, posX, posZ);
  }

  // ---- Поворачивает мебель ----
  updateFurnitureRotation(step) {
    this.furnitureManager.updateFurnitureRotation(step);
  }

  // ---- Обрабатывает выбор панели ----
  onPanelSelected(panelMesh) {
    this.selectPanel(panelMesh);
  }

  // ---- Выбирает панель ----
  selectPanel(panelMesh) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.panelManager.onPanelSelected(panelMesh);
  }

  // ---- Выбирает лампочку ----
  selectLightBulb(bulbMesh) {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.lightManager.selectLightBulb(bulbMesh);
  }

  // ---- Выбирает ковёр ----
  selectRug() {
    if (this.isSceneLocked) return;

    this.clearSelections();
    this.rugManager.selectRug();
  }

  // ---- Сбрасывает все выделения ----
  clearSelections() {
    this.panelManager.deselectPanel();
    this.lightManager.deselectLightBulb();
    this.rugManager.deselectRug();
    this.furnitureManager.deselectFurniture();
    this.furnitureManager.deselectLamp();
    this.furnitureManager.deselectWallTv();
  }

  // ---- Блокирует или разблокирует редактирование сцены ----
  setSceneLocked(isLocked) {
    this.isSceneLocked = Boolean(isLocked);

    if (!this.isSceneLocked) return;

    this.clearSelections();
    this.dragHandler.cancelDrag();
    this.lightManager.stopDragLightBulb();

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }
  }

  // ---- Переключает блокировку редактирования сцены ----
  toggleSceneLock() {
    this.setSceneLocked(!this.isSceneLocked);
    return this.isSceneLocked;
  }

  // ---- Снимает выбор панели ----
  deselectPanel() {
    this.clearSelections();
  }

  // ---- Снимает выбор лампочки ----
  deselectLightBulb() {
    this.lightManager.deselectLightBulb();
  }

  // ---- Снимает выбор ковра ----
  deselectRug() {
    this.rugManager.deselectRug();
  }

  // ---- Меняет цвет выбранной панели ----
  changeSelectedPanelColor(colorValue) {
    this.panelManager.changeSelectedPanelColor(colorValue);
  }

  // ---- Поворачивает выбранную панель ----
  rotateSelectedPanel(angle) {
    this.panelManager.rotateSelectedPanel(angle);
  }

  // ---- Обрабатывает выбор стены ----
  handleWallSelection(event) {
    this.roomManager.handleWallSelection(event);
  }

  // ---- Назначает активную стену ----
  setActiveWall(wallMesh) {
    this.roomManager.setActiveWall(wallMesh);
  }

  // ---- Подсвечивает активную стену ----
  highlightActiveWall() {
    this.roomManager.highlightActiveWall();
  }

  // ---- Переключает сетку стены ----
  toggleNet() {
    if (this.isSceneLocked) return;

    this.roomManager.toggleNet();
  }

  // ---- Красит все стены ----
  setAllWallsColor(colorValue) {
    if (this.isSceneLocked) return;

    this.roomManager.setAllWallsColor(colorValue);
  }

  // ---- Красит все панели ----
  setAllPanelsColor(colorValue) {
    if (this.isSceneLocked) return;

    this.panelManager.setAllPanelsColor(colorValue);
  }

  // ---- Добавляет боковую лампочку ----
  addSideLightBulb() {
    if (this.isSceneLocked) return;

    this.lightManager.addSideLightBulb();
  }

  // ---- Обновляет UI лампочки ----
  refreshLightBulbUI() {
    this.lightManager.refreshLightBulbUI();
  }

  // ---- Стартует перенос лампочки ----
  startDragLightBulb(bulbMesh, event) {
    this.lightManager.startDragLightBulb(bulbMesh, event);
  }

  // ---- Двигает лампочку при переносе ----
  onPointerMoveLightBulb(event) {
    this.lightManager.onPointerMoveLightBulb(event);
  }

  // ---- Завершает перенос лампочки ----
  stopDragLightBulb() {
    this.lightManager.stopDragLightBulb();
  }

  // ---- Обновляет трансформацию ковра ----
  updateRugTransform(width, depth, posX, posZ) {
    this.rugManager.updateRugTransform(width, depth, posX, posZ);
  }

  // ---- Меняет цвет ковра ----
  changeRugColor(hexColor) {
    this.rugManager.changeRugColor(hexColor);
  }

  // ---- Возвращает стены ----
  get walls() {
    return this.roomManager.walls;
  }

  // ---- Возвращает индекс активной стены ----
  get activeWallIndex() {
    return this.roomManager.activeWallIndex;
  }

  // ---- Возвращает пол ----
  get floor() {
    return this.roomManager.floor;
  }

  // ---- Возвращает потолок ----
  get ceiling() {
    return this.roomManager.ceiling;
  }

  // ---- Возвращает атмосферный свет ----
  get ambientLight() {
    return this.lightManager.ambientLight;
  }

  // ---- Возвращает лампочки ----
  get lightBulbs() {
    return this.lightManager.lightBulbs;
  }

  // ---- Возвращает выбранную лампочку ----
  get selectedLightBulb() {
    return this.lightManager.selectedLightBulb;
  }

  // ---- Возвращает перенос лампочки ----
  get isDraggingLightBulb() {
    return this.lightManager.isDraggingLightBulb;
  }

  // ---- Возвращает ковёр ----
  get rug() {
    return this.rugManager.rug;
  }

  // ---- Возвращает выбранный ковёр ----
  get selectedRug() {
    return this.rugManager.selectedRug;
  }

  // ---- Возвращает выбранную мебель ----
  get selectedFurniture() {
    return this.furnitureManager.selectedFurniture;
  }

  // ---- Возвращает выбранную панель ----
  get selectedPanel() {
    return this.panelManager.selectedPanel;
  }

  // ---- Возвращает анимируемые панели ----
  get animatingPanels() {
    return this.panelManager.animatingPanels;
  }

  // ---- Возвращает общий цвет панелей ----
  get globalPanelColor() {
    return this.panelManager.globalPanelColor;
  }

  // ---- Возвращает состояние сетки ----
  get isNetVisible() {
    return this.roomManager.isNetVisible;
  }

  // ---- Возвращает мебель в сцене ----
  get furnitureItems() {
    return this.furnitureManager.furnitureItems;
  }
}
