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
    table.position.x -= center.x;
    table.position.y -= bounds.min.y;
    table.position.z -= center.z;

    const floorY = -this.config.heightWall / 2;
    const placement = TABLE_POSITIONS[this.furnitureItems.length % TABLE_POSITIONS.length];
    holder.position.set(placement.x, floorY, placement.z);

    this.gameContext.scene.add(holder);
    this.furnitureItems.push(holder);
    return holder;
  }
}
