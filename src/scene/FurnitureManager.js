import * as THREE from "three";

const TABLE_POSITIONS = [
  { x: 0, z: 0 },
  { x: -1.2, z: 0.8 },
  { x: 1.2, z: 0.8 },
  { x: 0, z: -1.2 },
  { x: -1.2, z: -1.2 },
  { x: 1.2, z: -1.2 },
];

export class FurnitureManager {
  // ---- Готовит состояние мебели ----
  constructor(gameContext, config) {
    this.gameContext = gameContext;
    this.config = config;
    this.furnitureItems = [];
    this.selectedFurniture = null;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  // ---- Добавляет стол в комнату ----
  addTable() {
    const template = this.gameContext.assetManager.furniture.table;
    if (!template) {
      console.warn("Стол еще не загружен");
      return null;
    }

    const holder = new THREE.Group();
    const table = template.clone(true);
    holder.name = `table_${this.furnitureItems.length + 1}`;
    holder.userData.type = "table";
    holder.userData.isFurniture = true;
    holder.add(table);

    table.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }
    });

    const bounds = new THREE.Box3().setFromObject(table);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    table.position.x -= center.x;
    table.position.y -= bounds.min.y;
    table.position.z -= center.z;

    holder.userData.baseWidth = size.x;
    holder.userData.baseDepth = size.z;
    holder.userData.baseHeight = size.y;

    const floorY = -this.config.heightWall / 2;
    const placement =
      TABLE_POSITIONS[this.furnitureItems.length % TABLE_POSITIONS.length];
    holder.position.set(placement.x, floorY, placement.z);

    this.gameContext.scene.add(holder);
    this.furnitureItems.push(holder);
    return holder;
  }

  // ---- Проверяет клик по мебели ----
  hitTest(event) {
    if (this.furnitureItems.length === 0) return null;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(this.furnitureItems, true);
    if (intersects.length === 0) return null;

    let target = intersects[0].object;
    while (target && !target.userData.isFurniture) {
      target = target.parent;
    }

    return target || null;
  }

  // ---- Выбирает мебель ----
  selectFurniture(furniture) {
    this.selectedFurniture = furniture;

    const ui = document.querySelector(".furniture-selection-ui");
    if (ui) ui.style.display = "flex";

    this.refreshFurnitureUI();
  }

  // ---- Снимает выбор мебели ----
  deselectFurniture() {
    this.selectedFurniture = null;

    const ui = document.querySelector(".furniture-selection-ui");
    if (ui) ui.style.display = "none";
  }

  // ---- Обновляет UI мебели ----
  refreshFurnitureUI() {
    const furniture = this.selectedFurniture;
    if (!furniture) return;

    const widthInput = document.getElementById("furniture-width");
    const depthInput = document.getElementById("furniture-depth");
    const posXInput = document.getElementById("furniture-pos-x");
    const posZInput = document.getElementById("furniture-pos-z");

    const width = furniture.userData.baseWidth * furniture.scale.x;
    const depth = furniture.userData.baseDepth * furniture.scale.z;

    if (widthInput) widthInput.value = String(width);
    if (depthInput) depthInput.value = String(depth);
    if (posXInput) posXInput.value = String(furniture.position.x);
    if (posZInput) posZInput.value = String(furniture.position.z);
  }

  // ---- Меняет размер и позицию мебели ----
  updateFurnitureTransform(width, depth, posX, posZ) {
    const furniture = this.selectedFurniture;
    if (!furniture) return;

    const baseWidth = furniture.userData.baseWidth || 1;
    const baseDepth = furniture.userData.baseDepth || 1;

    furniture.scale.set(width / baseWidth, 1, depth / baseDepth);
    furniture.position.x = posX;
    furniture.position.z = posZ;
    furniture.position.y = -this.config.heightWall / 2;
  }

  // ---- Считает координаты указателя ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
}
