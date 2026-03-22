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
      emissiveIntensity: mesh.material?.emissiveIntensity ?? 2,
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
      centerLight: this.lightManager.centerLight
        ? {
            position: this.lightManager.centerLight.position.toArray(),
            color: "#" + this.lightManager.centerLight.color.getHexString(),
            intensity: this.lightManager.centerLight.intensity,
            distance: this.lightManager.centerLight.distance,
            decay: this.lightManager.centerLight.decay,
          }
        : null,
      rug,
      table,
      lamp,
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
      mesh.geometry?.dispose?.();
      mesh.material?.dispose?.();
    });
    this.lightManager.lightBulbs = [];
    this.lightManager.deselectLightBulb();

    this.furnitureManager.deleteTableLamp();
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

    if (state.centerLight && this.lightManager.centerLight) {
      this.lightManager.centerLight.position.fromArray(state.centerLight.position || this.lightManager.centerLight.position.toArray());
      this.lightManager.lightBulbMesh.position.copy(this.lightManager.centerLight.position);
      this.lightManager.centerLight.color.set(state.centerLight.color || "#ffe6c2");
      this.lightManager.centerLight.intensity = Number(state.centerLight.intensity ?? this.lightManager.centerLight.intensity);
      this.lightManager.centerLight.distance = Number(state.centerLight.distance ?? this.lightManager.centerLight.distance);
      this.lightManager.centerLight.decay = Number(state.centerLight.decay ?? this.lightManager.centerLight.decay);
    }

    (state.sideLights || []).forEach((lightState) => {
      this.lightManager.addSideLightBulb();
      const latest = this.lightManager.lightBulbs[this.lightManager.lightBulbs.length - 1];
      if (!latest) return;

      latest.mesh.position.fromArray(lightState.position || latest.mesh.position.toArray());
      latest.light.position.copy(latest.mesh.position);
      latest.light.color.set(lightState.color || "#ffaa66");
      latest.light.intensity = Number(lightState.intensity ?? latest.light.intensity);
      latest.light.distance = Number(lightState.distance ?? latest.light.distance);
      latest.light.decay = Number(lightState.decay ?? latest.light.decay);
      latest.mesh.visible = lightState.visible !== false;
      if (latest.mesh.material?.emissiveIntensity !== undefined) {
        latest.mesh.material.emissiveIntensity = Number(
          lightState.emissiveIntensity ?? latest.mesh.material.emissiveIntensity
        );
      }
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
    this.clearSelections();
    this.dragHandler.startDrag(type, event);
  }

  // ---- Случайно вращает панели ----
  randomRotate() {
    this.panelManager.randomRotate();
  }

  // ---- Перемешивает панели по стенам ----
  shufflePanelsOnWalls() {
    this.clearSelections();
    this.panelManager.shufflePanelsOnWalls();
  }

  // ---- Добавляет стол в комнату ----
  addTable() {
    this.clearSelections();
    return this.furnitureManager.addTable();
  }

  // ---- Удаляет стол из комнаты ----
  deleteTable() {
    this.furnitureManager.deleteTable();
  }

  // ---- Добавляет лампу на стол ----
  addTableLamp() {
    return this.furnitureManager.addTableLamp();
  }

  // ---- Удаляет лампу со стола ----
  deleteTableLamp() {
    this.furnitureManager.deleteTableLamp();
  }

  // ---- Выбирает настольную лампу ----
  selectTableLamp(lamp) {
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
    this.clearSelections();
    this.panelManager.onPanelSelected(panelMesh);
  }

  // ---- Выбирает лампочку ----
  selectLightBulb(bulbMesh) {
    this.clearSelections();
    this.lightManager.selectLightBulb(bulbMesh);
  }

  // ---- Выбирает ковёр ----
  selectRug() {
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
    this.roomManager.toggleNet();
  }

  // ---- Красит все стены ----
  setAllWallsColor(colorValue) {
    this.roomManager.setAllWallsColor(colorValue);
  }

  // ---- Красит все панели ----
  setAllPanelsColor(colorValue) {
    this.panelManager.setAllPanelsColor(colorValue);
  }

  // ---- Добавляет боковую лампочку ----
  addSideLightBulb() {
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

  // ---- Возвращает основной свет ----
  get centerLight() {
    return this.lightManager.centerLight;
  }

  // ---- Возвращает меш лампы ----
  get lightBulbMesh() {
    return this.lightManager.lightBulbMesh;
  }

  // ---- Возвращает боковой свет ----
  get sideLight() {
    return this.lightManager.sideLight;
  }

  // ---- Возвращает меш боковой лампы ----
  get sideBulbMesh() {
    return this.lightManager.sideBulbMesh;
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
