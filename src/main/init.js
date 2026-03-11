import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

export class InitClass {
// ---- Собирает базовую сцену ----
  constructor(gameContext) {
    this.gameContext = gameContext;

    this.onWindowResize = this.onWindowResize.bind(this);

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x9E91FA);

    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      40
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.shadowMap.enabled = true;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.5;

    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.physicallyCorrectLights = true;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.enablePan = false;
    // this.controls.enableZoom = false;
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    // this.controls.zoomSpeed = 0.5;
    // this.controls.panSpeed = 0.5;
    // this.controls.minDistance = 0.1;
    // this.controls.maxDistance = 100;
    this.gameContext.controls = this.controls;

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.stats.dom.style.top = "0px";
    this.stats.dom.style.left = "0%";

    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setPath("./hdr/")
      .load("studio_small_08_1k.hdr", (hdrTexture) => {
        const environmentTexture =
          pmremGenerator.fromEquirectangular(hdrTexture).texture;

        // this.scene.environment = environmentTexture;
        // this.scene.background = environmentTexture; // если хочешь фон

        hdrTexture.dispose();
        pmremGenerator.dispose();
      });
  }
// ---- Обновляет размер вьюпорта ----
  onWindowResize() {
    const maxWidth = 1920;
    const maxHeight = 1080;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const viewportWidth = Math.min(windowWidth, maxWidth);
    const viewportHeight = Math.min(windowHeight, maxHeight);

    // ВАЖНО: чтобы реально снизить нагрузку
    // this.renderer.setPixelRatio(1);

    // Рендерим реально в ограниченный размер
    this.renderer.setSize(viewportWidth, viewportHeight, false);

    // Центруем canvas как "окно"
    const canvas = this.renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
    canvas.style.width = viewportWidth + "px";
    canvas.style.height = viewportHeight + "px";

    // Камера должна считать аспект именно "окна", а не всего монитора
    this.camera.aspect = viewportWidth / viewportHeight;
    this.camera.updateProjectionMatrix();
  }
}
