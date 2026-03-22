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
    this.tableLamps = [];
    this.selectedFurniture = null;
    this.selectedLamp = null;
    this.isDraggingLamp = false;
    this.draggedLamp = null;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lampDragPlane = new THREE.Plane();
    this.lampDragPoint = new THREE.Vector3();
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
    holder.position.set(placement.x, floorY, placement.z);

    this.gameContext.scene.add(holder);
    this.furnitureItems.push(holder);
    this.selectFurniture(holder);
    return holder;
  }

  // ---- Удаляет стол и связанную лампу ----
  deleteTable() {
    const table = this.furnitureItems[0];
    if (!table) return;

    this.deleteTableLamp();

    this.removeObject(table);
    this.furnitureItems = [];

    if (this.selectedFurniture === table) {
      this.deselectFurniture();
    }
  }

  // ---- Добавляет лампу на стол ----
  addTableLamp() {
    if (this.tableLamps.length > 0) {
      return this.tableLamps[0];
    }

    const targetTable = this.getLampTargetTable();
    if (!targetTable) {
      console.warn("Сначала добавь стол");
      return null;
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
    holder.userData.parentTable = targetTable;
    holder.userData.anchorX = 0;
    holder.userData.anchorZ = 0;
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

    this.gameContext.scene.add(holder);
    this.tableLamps.push(holder);
    this.updateLampPlacement(holder);
    return holder;
  }

  // ---- Удаляет лампу со стола ----
  deleteTableLamp() {
    const lamp = this.tableLamps[0];
    if (!lamp) return;

    if (this.draggedLamp === lamp) {
      this.stopDragLamp();
    }

    this.removeObject(lamp);
    this.tableLamps = [];

    if (this.selectedLamp === lamp) {
      this.selectedLamp = null;
    }
  }

  // ---- Подбирает стол для лампы ----
  getLampTargetTable() {
    if (this.selectedFurniture?.userData.type === "table") {
      return this.selectedFurniture;
    }

    return this.furnitureItems[this.furnitureItems.length - 1] || null;
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

    if (widthInput) widthInput.value = String(width);
    if (depthInput) depthInput.value = String(depth);
    if (posXInput) posXInput.value = String(furniture.position.x);
    if (posZInput) posZInput.value = String(furniture.position.z);
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
    furniture.position.x = posX;
    furniture.position.z = posZ;
    furniture.position.y = -this.config.heightWall / 2;

    this.syncLampsForFurniture(furniture);
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

    this.syncLampsForFurniture(furniture);
  }

  // ---- Стартует перенос лампы ----
  startDragLamp(lamp, event) {
    const parentTable = lamp.userData.parentTable;
    if (!parentTable) return;

    this.isDraggingLamp = true;
    this.draggedLamp = lamp;
    this.selectedLamp = lamp;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    this.updateLampDragPlane(parentTable);
    this.onPointerMoveLamp(event);
  }

  // ---- Двигает лампу по столу ----
  onPointerMoveLamp(event) {
    if (!this.isDraggingLamp || !this.draggedLamp) return;

    const parentTable = this.draggedLamp.userData.parentTable;
    if (!parentTable) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (!this.raycaster.ray.intersectPlane(this.lampDragPlane, this.lampDragPoint)) {
      return;
    }

    const localPoint = parentTable.worldToLocal(this.lampDragPoint.clone());
    const limits = this.getLampLimits(parentTable, this.draggedLamp);
    const clampedX = THREE.MathUtils.clamp(localPoint.x, -limits.x, limits.x);
    const clampedZ = THREE.MathUtils.clamp(localPoint.z, -limits.z, limits.z);

    this.draggedLamp.userData.anchorX = limits.x > 0 ? clampedX / limits.x : 0;
    this.draggedLamp.userData.anchorZ = limits.z > 0 ? clampedZ / limits.z : 0;

    this.updateLampPlacement(this.draggedLamp);
  }

  // ---- Завершает перенос лампы ----
  stopDragLamp() {
    this.isDraggingLamp = false;
    this.draggedLamp = null;
    this.selectedLamp = null;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }
  }

  // ---- Обновляет плоскость переноса лампы ----
  updateLampDragPlane(parentTable) {
    const tableTopPoint = parentTable.localToWorld(
      new THREE.Vector3(0, parentTable.userData.baseHeight + 0.01, 0)
    );
    const tableUp = new THREE.Vector3(0, 1, 0).applyQuaternion(
      parentTable.getWorldQuaternion(this._tempQuaternion)
    );
    this.lampDragPlane.setFromNormalAndCoplanarPoint(tableUp, tableTopPoint);
  }

  // ---- Считает границы лампы на столе ----
  getLampLimits(parentTable, lamp) {
    const lampHalfWidth = (lamp.userData.baseWidth || 0.2) / Math.max(parentTable.scale.x, 0.001) / 2;
    const lampHalfDepth = (lamp.userData.baseDepth || 0.2) / Math.max(parentTable.scale.z, 0.001) / 2;

    return {
      x: Math.max(parentTable.userData.baseWidth / 2 - lampHalfWidth - 0.05, 0),
      z: Math.max(parentTable.userData.baseDepth / 2 - lampHalfDepth - 0.05, 0),
    };
  }

  // ---- Ставит лампу на стол ----
  updateLampPlacement(lamp) {
    const parentTable = lamp.userData.parentTable;
    if (!parentTable) return;

    const limits = this.getLampLimits(parentTable, lamp);
    const localX = (lamp.userData.anchorX || 0) * limits.x;
    const localZ = (lamp.userData.anchorZ || 0) * limits.z;
    const localY = parentTable.userData.baseHeight + 0.01;

    const worldPosition = parentTable.localToWorld(
      new THREE.Vector3(localX, localY, localZ)
    );
    lamp.position.copy(worldPosition);
    lamp.quaternion.copy(parentTable.getWorldQuaternion(this._tempQuaternion));
  }

  // ---- Синхронизирует лампы стола ----
  syncLampsForFurniture(furniture) {
    this.tableLamps.forEach((lamp) => {
      if (lamp.userData.parentTable === furniture) {
        this.updateLampPlacement(lamp);
      }
    });
  }

  // ---- Считает координаты указателя ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
}
