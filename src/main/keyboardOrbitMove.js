import * as THREE from "three";

export class KeyboardOrbitMove {
// ---- Подключает клавиши камеры ----
  constructor(gameContext) {
    this.camera = gameContext.camera;
    this.controls = gameContext.controls;

    this.keys = {};

    this.dollySpeed = 6;
    this.strafeSpeed = 4;

    this.offset = new THREE.Vector3();
    this.forward = new THREE.Vector3();
    this.right = new THREE.Vector3();

    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyW" ||
          event.code === "KeyA" ||
          event.code === "KeyS" ||
          event.code === "KeyD") {
        this.keys[event.code] = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }
// ---- Двигает камеру с клавиатуры ----
  update(delta) {
    if (!this.controls || !this.controls.enabled) return;

    const target = this.controls.target;    if (this.keys["KeyW"] || this.keys["KeyS"]) {
      const direction = this.keys["KeyW"] ? 1 : -1;

      this.camera.getWorldDirection(this.forward);
      this.forward.y = 0;
      this.forward.normalize();

      const moveAmount = direction * this.dollySpeed * delta;
      this.camera.position.addScaledVector(this.forward, moveAmount);
    }    if (this.keys["KeyA"] || this.keys["KeyD"]) {
      const direction = this.keys["KeyD"] ? 1 : -1;

      this.camera.getWorldDirection(this.forward);
      this.forward.y = 0;
      this.forward.normalize();

      this.right.crossVectors(this.forward, this.camera.up).normalize();

      const moveAmount = direction * this.strafeSpeed * delta;
      this.camera.position.addScaledVector(this.right, moveAmount);
    }

    
  }
}