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
