export class SceneInteractionController {
// ---- Готовит обработку ввода ----
  constructor(sceneClass, dragHandler) {
    this.sceneClass = sceneClass;
    this.dragHandler = dragHandler;
  }
// ---- Подключает pointer-события ----
  bindEvents() {
    window.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    window.addEventListener("pointermove", (event) => this.onPointerMove(event));
    window.addEventListener("pointerup", (event) => this.onPointerUp(event));
  }
// ---- Обрабатывает нажатие указателя ----
  onPointerDown(event) {
    if (
      event.target.closest(".floating-ui") ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "INPUT"
    ) {
      return;
    }

    const hitBulb = this.sceneClass.lightManager.findLightBulbHit(event);
    if (hitBulb) {
      this.sceneClass.selectLightBulb(hitBulb);
      this.sceneClass.lightManager.startDragLightBulb(hitBulb, event);
      return;
    }

    const hitFurniture = this.sceneClass.furnitureManager.hitTest(event);
    if (hitFurniture) {
      this.sceneClass.selectFurniture(hitFurniture);
      return;
    }

    if (this.sceneClass.rugManager.hitTest(event)) {
      this.sceneClass.selectRug();
      return;
    }

    const isPanelTouch = this.dragHandler.handlePointerDown(event);
    if (!isPanelTouch) {
      this.sceneClass.roomManager.handleWallSelection(event);
      this.sceneClass.clearSelections();
    }
  }
// ---- Обрабатывает движение указателя ----
  onPointerMove(event) {
    if (this.sceneClass.lightManager.isDraggingLightBulb) {
      this.sceneClass.lightManager.onPointerMoveLightBulb(event);
      return;
    }

    this.dragHandler.onPointerMove(event);
  }
// ---- Обрабатывает отпускание указателя ----
  onPointerUp(event) {
    if (this.sceneClass.lightManager.isDraggingLightBulb) {
      this.sceneClass.lightManager.stopDragLightBulb();
      return;
    }

    this.dragHandler.onPointerUp(event);
  }
}
