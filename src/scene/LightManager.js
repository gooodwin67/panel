import * as THREE from "three";

export class LightManager {
// ---- Готовит состояние света ----
  constructor(gameContext, config) {
    this.gameContext = gameContext;
    this.config = config;

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    this.centerLight = null;
    this.lightBulbMesh = null;
    this.sideLight = null;
    this.sideBulbMesh = null;

    this.lightBulbs = [];
    this.selectedLightBulb = null;
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;
    this.lightDragPlane = new THREE.Plane();
    this.lightDragIntersectionPoint = new THREE.Vector3();
    this.lightDragOffset = new THREE.Vector3();
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  }
// ---- Создает свет сцены ----
  createScene() {
    this.createCenterLight();
    this.addAmbientLight();
  }
// ---- Создает основной свет ----
  createCenterLight() {
    const { heightWall } = this.config;

    const bulbGeometry = new THREE.BoxGeometry(1, 0.05, 1);
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0xffffee,
      emissiveIntensity: 2.0,
      roughness: 0.7,
    });

    this.lightBulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    const lightY = heightWall / 2 - 0.03;
    this.lightBulbMesh.position.set(0, lightY, 0);
    this.gameContext.scene.add(this.lightBulbMesh);

    this.centerLight = new THREE.PointLight(0xffe6c2, 60, 0, 2);
    this.centerLight.position.set(0, lightY, 1);
    this.centerLight.castShadow = true;
    this.centerLight.shadow.mapSize.width = 1024;
    this.centerLight.shadow.mapSize.height = 1024;
    this.centerLight.shadow.bias = -0.0001;
    this.gameContext.scene.add(this.centerLight);

    const sideBulbGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const sideBulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffaa77,
      emissiveIntensity: 2.0,
      roughness: 0.8,
      metalness: 0.8,
    });

    this.sideBulbMesh = new THREE.Mesh(sideBulbGeometry, sideBulbMaterial);
    this.sideBulbMesh.position.set(1.5, 0.5, -1);

    this.sideLight = new THREE.PointLight(0xffaa66, 20, 0, 2);
    this.sideLight.position.set(1.5, 0.5, -1);
    this.sideLight.castShadow = true;
    this.sideLight.shadow.mapSize.width = 1024;
    this.sideLight.shadow.mapSize.height = 1024;
    this.sideLight.shadow.bias = -0.0001;
  }
// ---- Добавляет атмосферный свет ----
  addAmbientLight() {
    this.gameContext.scene.add(this.ambientLight);
  }
// ---- Создает боковую лампочку ----
  addSideLightBulb() {
    const bulbGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffaa77,
      emissiveIntensity: 2.0,
      roughness: 0.8,
      metalness: 0.8,
    });

    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    const x = (Math.random() - 0.5) * this.config.widthWallFront;
    const y = (Math.random() - 0.5) * this.config.heightWall;
    const z = (Math.random() - 0.5) * this.config.widthWallSide;
    bulbMesh.position.set(x, y, z);

    const pointLight = new THREE.PointLight(0xffaa66, 20, 0, 2);
    pointLight.position.copy(bulbMesh.position);
    pointLight.castShadow = false;

    bulbMesh.userData.isLightBulb = true;
    bulbMesh.userData.light = pointLight;

    this.gameContext.scene.add(bulbMesh);
    this.gameContext.scene.add(pointLight);

    this.lightBulbs.push({
      mesh: bulbMesh,
      light: pointLight,
    });
  }
// ---- Выбирает лампочку ----
  selectLightBulb(bulbMesh) {
    this.selectedLightBulb = bulbMesh;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "flex";

    this.refreshLightBulbUI();
  }
// ---- Снимает выбор лампочки ----
  deselectLightBulb() {
    this.selectedLightBulb = null;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "none";
  }
// ---- Синхронизирует UI лампочки ----
  refreshLightBulbUI() {
    const bulbMesh = this.selectedLightBulb;
    if (!bulbMesh) return;

    const pointLight = bulbMesh.userData.light;
    if (!pointLight) return;

    const colorInput = document.getElementById("light-color-picker");
    if (colorInput) colorInput.value = "#" + pointLight.color.getHexString();

    const intensityInput = document.getElementById("light-intensity");
    if (intensityInput) intensityInput.value = String(pointLight.intensity);

    const distanceInput = document.getElementById("light-distance");
    if (distanceInput) distanceInput.value = String(pointLight.distance);

    const decayInput = document.getElementById("light-decay");
    if (decayInput) decayInput.value = String(pointLight.decay);

    const bulbVisibleInput = document.getElementById("bulb-visible");
    if (bulbVisibleInput) bulbVisibleInput.checked = bulbMesh.visible;

    const emissiveInput = document.getElementById("bulb-emissive");
    if (
      emissiveInput &&
      bulbMesh.material &&
      bulbMesh.material.emissiveIntensity !== undefined
    ) {
      emissiveInput.value = String(bulbMesh.material.emissiveIntensity);
    }
  }
// ---- Ищет попадание по лампочке ----
  findLightBulbHit(event) {
    const bulbMeshes = this.lightBulbs.map((entry) => entry.mesh);
    if (bulbMeshes.length === 0) return null;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(bulbMeshes, false);
    if (intersects.length === 0) return null;

    return intersects[0].object;
  }
// ---- Стартует перенос лампочки ----
  startDragLightBulb(bulbMesh, event) {
    this.isDraggingLightBulb = true;
    this.draggedLightBulbMesh = bulbMesh;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    const cameraDirection = new THREE.Vector3();
    this.gameContext.camera.getWorldDirection(cameraDirection);

    this.lightDragPlane.setFromNormalAndCoplanarPoint(
      cameraDirection,
      bulbMesh.position
    );

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    ) {
      this.lightDragOffset
        .copy(this.lightDragIntersectionPoint)
        .sub(bulbMesh.position);
    } else {
      this.lightDragOffset.set(0, 0, 0);
    }
  }
// ---- Обновляет перенос лампочки ----
  onPointerMoveLightBulb(event) {
    if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      !this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    ) {
      return;
    }

    const newPosition = this.lightDragIntersectionPoint
      .clone()
      .sub(this.lightDragOffset);

    this.draggedLightBulbMesh.position.copy(newPosition);

    const pointLight = this.draggedLightBulbMesh.userData.light;
    if (pointLight) {
      pointLight.position.copy(newPosition);
    }
  }
// ---- Останавливает перенос лампочки ----
  stopDragLightBulb() {
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }
  }
// ---- Считает координаты указателя ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
}
