import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";

export class InitClass {
  // ---- Собирает базовую сцену ----
  constructor(gameContext) {
    this.gameContext = gameContext;

    const worldScale = gameContext.sceneConfig?.worldScale || 1;

    this.onWindowResize = this.onWindowResize.bind(this);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1 * worldScale,
      40 * worldScale
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10 * worldScale;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.58;
    this.renderer.physicallyCorrectLights = true;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.5;
    this.gameContext.controls = this.controls;

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.stats.dom.style.cssText =
      "position: fixed; top: 100vh; top: 100dvh; right: auto; bottom: auto; left: 0; transform: translateY(-45px); z-index: 1000000;";

    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }

  // ---- Обновляет размер вьюпорта ----
  onWindowResize() {
    const maxWidth = 1920;
    const maxHeight = 1080;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const viewportWidth = Math.min(windowWidth, maxWidth);
    const viewportHeight = Math.min(windowHeight, maxHeight);

    this.renderer.setSize(viewportWidth, viewportHeight, false);

    const canvas = this.renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
    canvas.style.width = viewportWidth + "px";
    canvas.style.height = viewportHeight + "px";

    this.camera.aspect = viewportWidth / viewportHeight;
    this.camera.updateProjectionMatrix();
  }
}
