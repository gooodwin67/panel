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
    this.panelImages = [
      "images/panels/panel_1.png",
      "images/panels/panel_2.png",
      "images/panels/panel_3.png",
      "images/panels/panel_4.png",
    ];

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  init() {
    this.root = document.getElementById("panel-2d-app");
    this.board = document.getElementById("panel-2d-board");
    this.emptyState = document.getElementById("panel-2d-empty");

    if (!this.root || !this.board) return;

    this.board.addEventListener("pointerdown", (event) => {
      if (event.target === this.board || event.target === this.emptyState) {
        this.deselectPanel();
      }
    });

    window.addEventListener("keydown", this.handleKeyDown);
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
    this.refreshEmptyState();

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

    const ui = document.getElementById("selection-ui");
    if (ui) {
      ui.style.display = "flex";
    }
  }

  deselectPanel() {
    if (this.selectedItem) {
      this.selectedItem.classList.remove("selected");
    }

    this.selectedItem = null;

    const ui = document.getElementById("selection-ui");
    if (ui) {
      ui.style.display = "none";
    }
  }

  deleteSelectedPanel() {
    if (!this.selectedItem) return;

    const itemToDelete = this.selectedItem;
    this.deselectPanel();
    this.items = this.items.filter((item) => item !== itemToDelete);
    itemToDelete.remove();
    this.refreshEmptyState();
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
    if (!this.items.length) return;

    const gap = 12;
    const step = this.tileSize + gap;
    const cols = Math.max(1, Math.floor((this.board.clientWidth + gap) / step));
    const slots = [];

    for (let row = 0; row < 100; row++) {
      for (let col = 0; col < cols; col++) {
        slots.push({
          x: col * step,
          y: row * step,
        });
      }

      if ((row + 1) * step > this.board.clientHeight - this.tileSize) {
        break;
      }
    }

    for (let index = slots.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const temp = slots[index];
      slots[index] = slots[randomIndex];
      slots[randomIndex] = temp;
    }

    this.items.forEach((item, index) => {
      const slot = slots[index] || {
        x: (index % cols) * step,
        y: Math.floor(index / cols) * step,
      };
      this.setItemPosition(item, slot.x, slot.y);
    });
  }

  toggleNet() {
    this.gridVisible = !this.gridVisible;
    this.board.classList.toggle("grid-hidden", !this.gridVisible);
  }

  changeSelectedPanelColor() {}

  setAllPanelsColor() {}

  getSceneState() {
    return {
      version: 1,
      mode: "2d",
      gridVisible: this.gridVisible,
      panels: this.items.map((item) => ({
        panelIndex: item.userData.panelIndex,
        x: item.userData.x,
        y: item.userData.y,
        rotation: item.userData.rotation,
      })),
    };
  }

  applySceneState(state) {
    if (!state || typeof state !== "object" || !Array.isArray(state.panels)) {
      throw new Error("Некорректное состояние 2D сцены");
    }

    this.clearPanels();

    this.gridVisible = state.gridVisible !== false;
    this.board.classList.toggle("grid-hidden", !this.gridVisible);

    state.panels.forEach((panelState) => {
      this.addPanel(
        Number(panelState.panelIndex) || 0,
        Number(panelState.x) || 0,
        Number(panelState.y) || 0,
        Number(panelState.rotation) || 0
      );
    });
  }

  clearPanels() {
    this.deselectPanel();
    this.items.forEach((item) => item.remove());
    this.items = [];
    this.refreshEmptyState();
  }

  refreshEmptyState() {
    if (!this.emptyState) return;
    this.emptyState.style.display = this.items.length ? "none" : "flex";
  }
}
