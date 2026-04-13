import * as THREE from "three";
import { hideFloatingUi, showFloatingUi } from "../main/floatingUi.js";

export class RugManager {
// ---- Готовит состояние ковра ----
  constructor(gameContext, config) {
    this.gameContext = gameContext;
    this.config = config;
    this.worldScale = config.worldScale || 1;
    this.rug = null;
    this.selectedRug = null;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }
// ---- Создает ковёр ----
  createScene() {
    const { heightWall } = this.config;
    const rugWidth = 4 * this.worldScale;
    const rugDepth = 3 * this.worldScale;

    const rugGeometry = new THREE.PlaneGeometry(rugWidth, rugDepth);
    const textureLoader = new THREE.TextureLoader();
    const rugTexture = textureLoader.load("textures/1/carpet-color.jpg");
    const rugBump = textureLoader.load("textures/1/carpet-normal.jpg");

    rugTexture.wrapS = THREE.RepeatWrapping;
    rugTexture.wrapT = THREE.RepeatWrapping;
    rugTexture.repeat.set(rugWidth, rugDepth);

    rugBump.wrapS = THREE.RepeatWrapping;
    rugBump.wrapT = THREE.RepeatWrapping;
    rugBump.repeat.set(rugWidth, rugDepth);

    rugTexture.anisotropy =
      this.gameContext.renderer.capabilities.getMaxAnisotropy();
    rugTexture.colorSpace = THREE.SRGBColorSpace;
    rugTexture.generateMipmaps = true;
    rugTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const rugMaterial = new THREE.MeshStandardMaterial({
      map: rugTexture,
      bumpMap: rugBump,
      bumpScale: 0.08,
      color: 0xffffff,
      roughness: 0.98,
      metalness: 0.0,
    });

    this.rug = new THREE.Mesh(rugGeometry, rugMaterial);
    this.rug.rotation.x = -Math.PI / 2;
    this.rug.position.y = -heightWall / 2 + 0.003 * this.worldScale;
    this.rug.receiveShadow = true;
    this.rug.castShadow = false;
    this.rug.userData.isRug = true;
    this.rug.userData.baseWidth = rugWidth;
    this.rug.userData.baseDepth = rugDepth;

    this.gameContext.scene.add(this.rug);
  }
// ---- Проверяет клик по ковру ----
  hitTest(event) {
    if (!this.rug) return false;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObject(this.rug, false);
    return intersects.length > 0;
  }
// ---- Выбирает ковёр ----
  selectRug() {
    this.selectedRug = this.rug;
    showFloatingUi(".rug-selection-ui");
    this.refreshRugUI();
  }
// ---- Снимает выбор ковра ----
  deselectRug() {
    this.selectedRug = null;

    hideFloatingUi(".rug-selection-ui");

    if (this.rug) {
      const colorInput = document.getElementById("rug-color-picker");
      if (colorInput) {
        colorInput.value = "#" + this.rug.material.color.getHexString();
      }
    }
  }
// ---- Меняет размер и позицию ковра ----
  updateRugTransform(width, depth, posX, posZ) {
    if (!this.rug) return;

    const baseWidth = this.rug.userData.baseWidth;
    const baseDepth = this.rug.userData.baseDepth;
    const posLimitX = Math.max((this.config.widthWallFront - width) / 2, 0);
    const posLimitZ = Math.max((this.config.widthWallSide - depth) / 2, 0);

    this.rug.scale.set(width / baseWidth, 1, depth / baseDepth);
    this.rug.position.x = THREE.MathUtils.clamp(posX, -posLimitX, posLimitX);
    this.rug.position.z = THREE.MathUtils.clamp(posZ, -posLimitZ, posLimitZ);

    if (this.rug.material.map) {
      this.rug.material.map.repeat.set(width, depth);
    }
    if (this.rug.material.bumpMap) {
      this.rug.material.bumpMap.repeat.set(width, depth);
    }

    this.refreshRugUI();
  }

  // ---- Обновляет UI ковра ----
  refreshRugUI() {
    if (!this.rug) return;

    const widthInput = document.getElementById("rug-width");
    const depthInput = document.getElementById("rug-depth");
    const posXInput = document.getElementById("rug-pos-x");
    const posZInput = document.getElementById("rug-pos-z");

    const width = this.rug.userData.baseWidth * this.rug.scale.x;
    const depth = this.rug.userData.baseDepth * this.rug.scale.z;
    const maxWidth = Math.max(this.config.widthWallFront * 0.95, width);
    const maxDepth = Math.max(this.config.widthWallSide * 0.95, depth);
    const minWidth = Math.max(this.worldScale, 0.1);
    const minDepth = Math.max(this.worldScale, 0.1);
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
      posXInput.value = String(this.rug.position.x);
    }

    if (posZInput) {
      posZInput.min = String(-posLimitZ);
      posZInput.max = String(posLimitZ);
      posZInput.value = String(this.rug.position.z);
    }
  }
// ---- Меняет цвет ковра ----
  changeRugColor(hexColor) {
    if (this.rug?.material) {
      this.rug.material.color.set(hexColor);
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
