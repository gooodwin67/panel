
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class InitClass {
  constructor(gameContext) {

    this.gameContext = gameContext;

    this.onWindowResize = this.onWindowResize.bind(this);

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x9E91FA);

    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.gameContext.controls = this.controls;

    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }

  onWindowResize() {
    const width = document.body.offsetWidth || window.innerWidth;
    const height = document.body.offsetHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
