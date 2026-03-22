import * as THREE from "three";

const TABLE_POSITIONS = [
  { x: 0, z: 0 },
  { x: -1.2, z: 0.8 },
  { x: 1.2, z: 0.8 },
  { x: 0, z: -1.2 },
  { x: -1.2, z: -1.2 },
  { x: 1.2, z: -1.2 },
];

const TABLE_LAMP_POSITION = {
  x: 0,
  y: -0.2,
  z: 0,
};

export class FurnitureManager {
  // ---- Готовит состояние мебели ----
  constructor(gameContext, config) {
    this.gameContext = gameContext;
    this.config = config;
    this.worldScale = config.worldScale || 1;
    this.furnitureItems = [];
    this.tableLamps = [];
    this.selectedFurniture = null;
    this.selectedLamp = null;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this._tempQuaternion = new THREE.Quaternion();
  }

  // ---- Добавляет стол в комнату ----
  addTable() {
    if (this.furnitureItems.length > 0) {
      const existingTable = this.furnitureItems[0];
      this.selectFurniture(existingTable);
      return existingTable;
    }

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
      child.receiveShadow = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }

      this.tuneFurnitureMaterial(child);
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
    holder.userData.rotationStep = 0;

    const floorY = -this.config.heightWall / 2;
    const placement =
      TABLE_POSITIONS[this.furnitureItems.length % TABLE_POSITIONS.length];
    holder.position.set(
      placement.x * this.worldScale,
      floorY,
      placement.z * this.worldScale
    );

    this.gameContext.scene.add(holder);
    this.furnitureItems.push(holder);
    this.selectFurniture(holder);
    return holder;
  }

  // ---- Удаляет стол и связанную лампу ----
  deleteTable() {
    const table = this.furnitureItems[0];
    if (!table) return;

    this.removeObject(table);
    this.furnitureItems = [];

    if (this.selectedFurniture === table) {
      this.deselectFurniture();
    }
  }

  // ---- Добавляет независимую лампу в комнату ----
  addTableLamp() {
    if (this.tableLamps.length > 0) {
      const existingLamp = this.tableLamps[0];
      this.selectLamp(existingLamp);
      return existingLamp;
    }

    const template = this.gameContext.assetManager.furniture.tableLamp;
    if (!template) {
      console.warn("Лампа еще не загружена");
      return null;
    }

    const holder = new THREE.Group();
    const lamp = template.clone(true);
    holder.name = `table_lamp_${this.tableLamps.length + 1}`;
    holder.userData.isTableLamp = true;
    holder.userData.type = "tableLamp";
    holder.add(lamp);

    lamp.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }

      this.tuneLampMaterial(child);
    });

    const bounds = new THREE.Box3().setFromObject(lamp);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    lamp.position.x -= center.x;
    lamp.position.y -= bounds.min.y;
    lamp.position.z -= center.z;

    holder.userData.baseWidth = size.x;
    holder.userData.baseDepth = size.z;
    holder.userData.baseHeight = size.y;
    holder.position.set(
      TABLE_LAMP_POSITION.x * this.worldScale,
      TABLE_LAMP_POSITION.y * this.worldScale,
      TABLE_LAMP_POSITION.z * this.worldScale
    );

    this.gameContext.scene.add(holder);
    this.tableLamps.push(holder);
    this.selectLamp(holder);
    return holder;
  }

  // ---- Удаляет лампу со стола ----
  deleteTableLamp() {
    const lamp = this.tableLamps[0];
    if (!lamp) return;

    this.removeObject(lamp);
    this.tableLamps = [];

    if (this.selectedLamp === lamp) {
      this.deselectLamp();
    }
  }

  // ---- Подстраивает материалы мебели ----
  tuneFurnitureMaterial(mesh) {
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((material) => {
      if (!material) return;

      material.side = THREE.DoubleSide;
      material.envMap = null;
      material.envMapIntensity = 0;
      material.shadowSide = THREE.DoubleSide;
      material.toneMapped = true;

      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace;
        material.map.anisotropy =
          this.gameContext.renderer.capabilities.getMaxAnisotropy();
        material.map.needsUpdate = true;
      }

      if (material.name === "Material.002") {
        material.color.setRGB(0.62, 0.62, 0.64);
        material.roughness = 0.68;
        material.metalness = 0.0;
      }

      if (material.name === "default.001") {
        material.color.setRGB(1, 1, 1);
        material.roughness = 0.58;
        material.metalness = 0.0;
      }

      material.needsUpdate = true;
    });
  }

  // ---- Подстраивает материалы лампы ----
  tuneLampMaterial(mesh) {
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((material) => {
      if (!material) return;

      material.side = THREE.DoubleSide;
      material.envMap = null;
      material.envMapIntensity = 0;

      if (material.name === "abajor") {
        material.color.setRGB(0.95, 0.92, 0.82);
        material.roughness = 0.9;
        material.metalness = 0.0;
      }

      if (material.name === "black rkham" || material.name === "Material.005") {
        material.color.multiplyScalar(1.8);
        material.roughness = 0.55;
        material.metalness = 0.0;
      }

      material.needsUpdate = true;
    });
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

  // ---- Проверяет клик по лампе стола ----
  hitLampTest(event) {
    if (this.tableLamps.length === 0) return null;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(this.tableLamps, true);
    if (intersects.length === 0) return null;

    let target = intersects[0].object;
    while (target && !target.userData.isTableLamp) {
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

  // ---- Удаляет объект мебели из сцены ----
  removeObject(object) {
    this.gameContext.scene.remove(object);

    object.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material?.dispose?.());
      } else {
        child.material.dispose?.();
      }
    });
  }

  // ---- Обновляет UI мебели ----
  refreshFurnitureUI() {
    const furniture = this.selectedFurniture;
    if (!furniture) return;

    const widthInput = document.getElementById("furniture-width");
    const depthInput = document.getElementById("furniture-depth");
    const posXInput = document.getElementById("furniture-pos-x");
    const posZInput = document.getElementById("furniture-pos-z");
    const rotationInput = document.getElementById("furniture-rotation");
    const rotationValue = document.getElementById("furniture-rotation-value");

    const width = furniture.userData.baseWidth * furniture.scale.x;
    const depth = furniture.userData.baseDepth * furniture.scale.z;
    const rotationStep = furniture.userData.rotationStep || 0;
    const maxWidth = Math.max(this.config.widthWallFront * 0.9, width);
    const maxDepth = Math.max(this.config.widthWallSide * 0.9, depth);
    const minWidth = Math.max(furniture.userData.baseWidth * 0.5, 0.1);
    const minDepth = Math.max(furniture.userData.baseDepth * 0.5, 0.1);
    const posLimitX = Math.max((this.config.widthWallFront - width) / 2, 0);
    const posLimitZ = Math.max((this.config.widthWallSide - depth) / 2, 0);

    if (widthInput) {
      widthInput.min = String(minWidth);
      widthInput.max = String(maxWidth);
      widthInput.value = String(width);
    }
    if (depthInput) {
      depthInput.min = String(minDepth);
      depthInput.max = String(maxDepth);
      depthInput.value = String(depth);
    }
    if (posXInput) {
      posXInput.min = String(-posLimitX);
      posXInput.max = String(posLimitX);
      posXInput.value = String(furniture.position.x);
    }
    if (posZInput) {
      posZInput.min = String(-posLimitZ);
      posZInput.max = String(posLimitZ);
      posZInput.value = String(furniture.position.z);
    }
    if (rotationInput) rotationInput.value = String(rotationStep);
    if (rotationValue) rotationValue.textContent = `${rotationStep * 90}\u00b0`;
  }

  // ---- Меняет размер и позицию мебели ----
  updateFurnitureTransform(width, depth, posX, posZ) {
    const furniture = this.selectedFurniture;
    if (!furniture) return;

    const baseWidth = furniture.userData.baseWidth || 1;
    const baseDepth = furniture.userData.baseDepth || 1;

    furniture.scale.set(width / baseWidth, 1, depth / baseDepth);

    const posLimitX = Math.max((this.config.widthWallFront - width) / 2, 0);
    const posLimitZ = Math.max((this.config.widthWallSide - depth) / 2, 0);
    furniture.position.x = THREE.MathUtils.clamp(posX, -posLimitX, posLimitX);
    furniture.position.z = THREE.MathUtils.clamp(posZ, -posLimitZ, posLimitZ);
    furniture.position.y = -this.config.heightWall / 2;

    this.refreshFurnitureUI();
  }

  // ---- Поворачивает мебель по шагам ----
  updateFurnitureRotation(step) {
    const furniture = this.selectedFurniture;
    if (!furniture) return;

    const normalizedStep = ((step % 4) + 4) % 4;
    furniture.userData.rotationStep = normalizedStep;
    furniture.rotation.y = normalizedStep * (Math.PI / 2);

    const rotationValue = document.getElementById("furniture-rotation-value");
    if (rotationValue) {
      rotationValue.textContent = `${normalizedStep * 90}\u00b0`;
    }

  }

  // ---- Выбирает настольную лампу ----
  selectLamp(lamp) {
    this.selectedLamp = lamp;

    const ui = document.querySelector(".table-lamp-selection-ui");
    if (ui) ui.style.display = "flex";

    this.refreshLampUI();
  }

  // ---- Снимает выбор настольной лампы ----
  deselectLamp() {
    this.selectedLamp = null;

    const ui = document.querySelector(".table-lamp-selection-ui");
    if (ui) ui.style.display = "none";
  }

  // ---- Обновляет UI настольной лампы ----
  refreshLampUI() {
    const lamp = this.selectedLamp;
    if (!lamp) return;

    const widthInput = document.getElementById("table-lamp-width");
    const heightInput = document.getElementById("table-lamp-height");
    const posXInput = document.getElementById("table-lamp-pos-x");
    const posYInput = document.getElementById("table-lamp-pos-y");
    const posZInput = document.getElementById("table-lamp-pos-z");
    const width = lamp.userData.baseWidth * lamp.scale.x;
    const height = lamp.userData.baseHeight * lamp.scale.y;
    const posLimitX = this.config.widthWallFront / 2;
    const posLimitY = this.config.heightWall / 2;
    const posLimitZ = this.config.widthWallSide / 2;

    if (widthInput) {
      widthInput.min = String(Math.max(lamp.userData.baseWidth * 0.5, 0.1));
      widthInput.max = String(Math.max(lamp.userData.baseWidth * 3, width));
      widthInput.value = String(width);
    }

    if (heightInput) {
      heightInput.min = String(Math.max(lamp.userData.baseHeight * 0.5, 0.1));
      heightInput.max = String(Math.max(lamp.userData.baseHeight * 3, height));
      heightInput.value = String(height);
    }

    if (posXInput) {
      posXInput.min = String(-posLimitX);
      posXInput.max = String(posLimitX);
      posXInput.value = String(lamp.position.x);
    }

    if (posYInput) {
      posYInput.min = String(-posLimitY);
      posYInput.max = String(posLimitY);
      posYInput.value = String(lamp.position.y);
    }

    if (posZInput) {
      posZInput.min = String(-posLimitZ);
      posZInput.max = String(posLimitZ);
      posZInput.value = String(lamp.position.z);
    }
  }

  // ---- Меняет размер и позицию настольной лампы ----
  updateLampTransform(width, height, posX, posY, posZ) {
    const lamp = this.selectedLamp;
    if (!lamp) return;

    const baseWidth = lamp.userData.baseWidth || 1;
    const baseHeight = lamp.userData.baseHeight || 1;
    const footprintScale = width / baseWidth;
    lamp.scale.set(footprintScale, height / baseHeight, footprintScale);
    lamp.position.x = THREE.MathUtils.clamp(
      posX,
      -this.config.widthWallFront / 2,
      this.config.widthWallFront / 2
    );
    lamp.position.y = THREE.MathUtils.clamp(
      posY,
      -this.config.heightWall / 2,
      this.config.heightWall / 2
    );
    lamp.position.z = THREE.MathUtils.clamp(
      posZ,
      -this.config.widthWallSide / 2,
      this.config.widthWallSide / 2
    );
    this.refreshLampUI();
  }

  // ---- Считает координаты указателя ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
}
