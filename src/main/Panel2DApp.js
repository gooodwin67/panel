import { hideFloatingUi, showFloatingUi } from "./floatingUi.js";

export class Panel2DApp {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.mode = "2d";
    this.board = null;
    this.emptyState = null;
    this.root = null;
    this.items = [];
    this.selectedItem = null;
    this.draggingItem = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.gridVisible = true;
    this.nextItemId = 1;
    this.tileSize = 140;
    this.snapThreshold = 24;
    this.globalPanelColor = null;
    this.onPanelsChanged = null;
    this.panelImages = [
      "images/panels/panel_1.png",
      "images/panels/panel_2.png",
      "images/panels/panel_3.png",
      "images/panels/panel_4.png",
    ];

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  init() {
    this.root = document.getElementById("panel-2d-app");
    this.board = document.getElementById("panel-2d-board");
    this.emptyState = document.getElementById("panel-2d-empty");

    if (!this.root || !this.board) return;
    this.updateBoardMetrics();

    this.board.addEventListener("pointerdown", (event) => {
      if (event.target === this.board || event.target === this.emptyState) {
        this.deselectPanel();
      }
    });

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("resize", this.handleResize);
  }

  show() {
    if (!this.root) this.init();
    if (this.root) this.root.style.display = "block";
    this.refreshEmptyState();
  }

  hide() {
    if (this.root) this.root.style.display = "none";
    this.deselectPanel();
  }

  handleResize() {
    this.updateBoardMetrics();
  }

  startPaletteDrag(panelIndex, event) {
    if (!this.board) return;

    const { x, y } = this.getBoardPoint(event.clientX, event.clientY);
    const item = this.addPanel(panelIndex, x - this.tileSize / 2, y - this.tileSize / 2);
    this.selectPanel(item);
    this.startDraggingItem(item, event, this.tileSize / 2, this.tileSize / 2);
  }

  addPanel(panelIndex, x, y, rotation = 0) {
    const item = document.createElement("div");
    item.className = "panel-2d-item";
    item.dataset.id = String(this.nextItemId++);

    const image = document.createElement("img");
    image.src = this.panelImages[panelIndex];
    image.alt = `Panel ${panelIndex + 1}`;
    item.appendChild(image);

    item.userData = {
      panelIndex,
      x: 0,
      y: 0,
      rotation,
      color: null,
    };

    item.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      this.selectPanel(item);

      const rect = item.getBoundingClientRect();
      this.startDraggingItem(
        item,
        event,
        event.clientX - rect.left,
        event.clientY - rect.top
      );
    });

    this.board.appendChild(item);
    this.items.push(item);

    this.setItemPosition(item, x, y);
    this.setItemRotation(item, rotation);
    if (this.globalPanelColor) {
      this.setItemColor(item, this.globalPanelColor);
    }
    this.refreshEmptyState();
    this.notifyPanelsChanged();

    return item;
  }

  startDraggingItem(item, event, offsetX, offsetY) {
    this.draggingItem = item;
    this.dragOffsetX = offsetX;
    this.dragOffsetY = offsetY;

    window.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);

    if (event.cancelable) {
      event.preventDefault();
    }
  }

  handlePointerMove(event) {
    if (!this.draggingItem) return;

    const { x, y } = this.getBoardPoint(event.clientX, event.clientY);
    this.setItemPosition(
      this.draggingItem,
      x - this.dragOffsetX,
      y - this.dragOffsetY
    );
  }

  handlePointerUp() {
    this.draggingItem = null;
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
  }

  handleKeyDown(event) {
    if (this.root?.style.display === "none") return;
    if (event.key !== "Delete" && event.key !== "Backspace") return;
    if (!this.selectedItem) return;

    event.preventDefault();
    this.deleteSelectedPanel();
  }

  getBoardPoint(clientX, clientY) {
    const rect = this.board.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  clampPosition(x, y) {
    const maxX = Math.max(0, this.board.clientWidth - this.tileSize);
    const maxY = Math.max(0, this.board.clientHeight - this.tileSize);

    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    };
  }

  updateBoardMetrics() {
    if (!this.board) return;

    const previousTileSize = this.tileSize;
    const boardWidth = this.board.clientWidth || window.innerWidth;
    const boardHeight = this.board.clientHeight || window.innerHeight;
    const minSide = Math.min(boardWidth, boardHeight);
    const isMobile = window.innerWidth <= 600;
    const maxTileByBoard = Math.floor(boardWidth / (isMobile ? 6.2 : 3));
    const minTileSize = isMobile ? 48 : 82;
    const preferredRatio = isMobile ? 0.135 : 0.26;
    const nextTileSize = Math.max(
      minTileSize,
      Math.min(isMobile ? 64 : 140, maxTileByBoard, Math.round(minSide * preferredRatio))
    );

    this.tileSize = nextTileSize;
    this.snapThreshold = Math.max(12, Math.round(this.tileSize * 0.18));
    this.board.style.setProperty("--panel-tile-size", `${this.tileSize}px`);

    if (!this.items.length || previousTileSize === this.tileSize) return;

    this.items.forEach((item) => {
      const nextX = Math.round(item.userData.x / previousTileSize) * this.tileSize;
      const nextY = Math.round(item.userData.y / previousTileSize) * this.tileSize;
      this.setItemPosition(item, nextX, nextY);
    });
  }

  getSnapCandidates(item, axis) {
    const boardLimit =
      axis === "x"
        ? Math.max(0, this.board.clientWidth - this.tileSize)
        : Math.max(0, this.board.clientHeight - this.tileSize);
    const candidates = [0, boardLimit];

    this.items.forEach((otherItem) => {
      if (otherItem === item) return;

      const baseValue = axis === "x" ? otherItem.userData.x : otherItem.userData.y;
      candidates.push(baseValue);
      candidates.push(baseValue - this.tileSize);
      candidates.push(baseValue + this.tileSize);
    });

    return candidates;
  }

  snapValue(item, axis, rawValue) {
    const roundedToTile = Math.round(rawValue / this.tileSize) * this.tileSize;
    const candidates = [...this.getSnapCandidates(item, axis), roundedToTile];

    let bestValue = rawValue;
    let bestDistance = this.snapThreshold;

    candidates.forEach((candidate) => {
      const distance = Math.abs(candidate - rawValue);
      if (distance <= bestDistance) {
        bestDistance = distance;
        bestValue = candidate;
      }
    });

    return bestValue;
  }

  setItemPosition(item, x, y) {
    const snappedX = this.snapValue(item, "x", x);
    const snappedY = this.snapValue(item, "y", y);
    const clamped = this.clampPosition(snappedX, snappedY);
    item.userData.x = clamped.x;
    item.userData.y = clamped.y;
    item.style.left = `${clamped.x}px`;
    item.style.top = `${clamped.y}px`;
  }

  setItemRotation(item, rotation) {
    item.userData.rotation = rotation;
    item.style.transform = `rotate(${rotation}deg)`;
  }

  selectPanel(item) {
    if (this.selectedItem === item) return;

    this.deselectPanel();
    this.selectedItem = item;
    item.classList.add("selected");

    showFloatingUi("#selection-ui");
  }

  deselectPanel() {
    if (this.selectedItem) {
      this.selectedItem.classList.remove("selected");
    }

    this.selectedItem = null;

    hideFloatingUi("#selection-ui");
  }

  deleteSelectedPanel() {
    if (!this.selectedItem) return;

    const itemToDelete = this.selectedItem;
    this.deselectPanel();
    this.items = this.items.filter((item) => item !== itemToDelete);
    itemToDelete.remove();
    this.refreshEmptyState();
    this.notifyPanelsChanged();
  }

  rotateSelectedPanel(angle) {
    if (!this.selectedItem) return;

    const deltaDegrees = Math.round((angle * 180) / Math.PI);
    const nextRotation = this.selectedItem.userData.rotation + deltaDegrees;
    this.setItemRotation(this.selectedItem, nextRotation);
  }

  randomRotate() {
    this.items.forEach((item) => {
      const nextRotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
      this.setItemRotation(item, nextRotation);
    });
  }

  shufflePanelsOnWalls() {
    if (this.items.length < 2) return;

    const occupiedPositions = this.items.map((item) => ({
      x: item.userData.x,
      y: item.userData.y,
    }));

    for (let index = occupiedPositions.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const temp = occupiedPositions[index];
      occupiedPositions[index] = occupiedPositions[randomIndex];
      occupiedPositions[randomIndex] = temp;
    }

    this.items.forEach((item, index) => {
      const slot = occupiedPositions[index];
      this.setItemPosition(item, slot.x, slot.y);
    });
  }

  toggleNet() {
    this.gridVisible = !this.gridVisible;
    this.board.classList.toggle("grid-hidden", !this.gridVisible);
  }

  setItemColor(item, colorValue) {
    item.userData.color = colorValue;
    item.style.setProperty(
      "--panel-color-overlay",
      this.toPanelOverlayColor(colorValue)
    );
  }

  toPanelOverlayColor(colorValue) {
    if (typeof colorValue !== "string" || !colorValue.startsWith("#")) {
      return colorValue;
    }

    const hex = colorValue.slice(1);
    const normalizedHex = hex.length === 3
      ? hex.split("").map((char) => char + char).join("")
      : hex;
    const colorNumber = Number.parseInt(normalizedHex, 16);

    if (Number.isNaN(colorNumber)) return colorValue;

    const red = (colorNumber >> 16) & 255;
    const green = (colorNumber >> 8) & 255;
    const blue = colorNumber & 255;

    return `rgb(${red} ${green} ${blue} / 40%)`;
  }

  changeSelectedPanelColor(colorValue) {
    if (!this.selectedItem) return;
    this.setItemColor(this.selectedItem, colorValue);
  }

  setAllPanelsColor(colorValue) {
    this.globalPanelColor = colorValue;
    this.items.forEach((item) => this.setItemColor(item, colorValue));
  }

  getSceneState() {
    return {
      version: 1,
      mode: "2d",
      gridVisible: this.gridVisible,
      globalPanelColor: this.globalPanelColor,
      panels: this.items.map((item) => ({
        panelIndex: item.userData.panelIndex,
        x: item.userData.x,
        y: item.userData.y,
        rotation: item.userData.rotation,
        color: item.userData.color,
      })),
    };
  }

  applySceneState(state) {
    if (!state || typeof state !== "object" || !Array.isArray(state.panels)) {
      throw new Error("Некорректное состояние 2D сцены");
    }

    this.clearPanels();

    this.gridVisible = state.gridVisible !== false;
    this.globalPanelColor = state.globalPanelColor || null;
    this.board.classList.toggle("grid-hidden", !this.gridVisible);

    state.panels.forEach((panelState) => {
      const item = this.addPanel(
        Number(panelState.panelIndex) || 0,
        Number(panelState.x) || 0,
        Number(panelState.y) || 0,
        Number(panelState.rotation) || 0
      );
      if (panelState.color) {
        this.setItemColor(item, panelState.color);
      }
    });
    this.notifyPanelsChanged();
  }

  clearPanels() {
    this.deselectPanel();
    this.items.forEach((item) => item.remove());
    this.items = [];
    this.refreshEmptyState();
    this.notifyPanelsChanged();
  }

  getPanelKitInfo() {
    const counts = [0, 0, 0, 0];

    this.items.forEach((item) => {
      const panelIndex = Number(item.userData.panelIndex);
      if (panelIndex >= 0 && panelIndex < counts.length) {
        counts[panelIndex] += 1;
      }
    });

    return {
      counts,
      kits: Math.max(0, ...counts),
    };
  }

  notifyPanelsChanged() {
    if (this.onPanelsChanged) {
      this.onPanelsChanged(this.getPanelKitInfo());
    }
  }

  refreshEmptyState() {
    if (!this.emptyState) return;
    this.emptyState.style.display = this.items.length ? "none" : "flex";
  }
}
