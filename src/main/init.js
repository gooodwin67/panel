
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';


export class InitClass {
  constructor(gameContext) {

    this.gameContext = gameContext;

    this.onWindowResize = this.onWindowResize.bind(this);

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x9E91FA);

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 40);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.gameContext.controls = this.controls;

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
    this.stats.dom.style.top = "0px";
    this.stats.dom.style.left = "0%";

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  onWindowResize() {
    const maxWidth = 1920;
    const maxHeight = 1080;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const viewportWidth = Math.min(windowWidth, maxWidth);
    const viewportHeight = Math.min(windowHeight, maxHeight);

    // ВАЖНО: чтобы реально снизить нагрузку
    this.renderer.setPixelRatio(1);

    // Рендерим реально в ограниченный размер
    this.renderer.setSize(viewportWidth, viewportHeight, false);

    // Центруем canvas как "окно"
    const canvas = this.renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.width = viewportWidth + 'px';
    canvas.style.height = viewportHeight + 'px';

    // Камера должна считать аспект именно "окна", а не всего монитора
    this.camera.aspect = viewportWidth / viewportHeight;
    this.camera.updateProjectionMatrix();
  }
}
