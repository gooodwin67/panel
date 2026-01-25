import * as THREE from "three";

export class GameClass {
  constructor(gameContext) {
    this.scene = gameContext.scene;

    this.ground = null;

    this.options = {
      size: { w: 10, h: 10, d: 0.2 },
      name: 'ground'
    }
    this.characters = [];
  }

  loadMesh() {
    let geometryPlane = new THREE.BoxGeometry(this.options.size.w, this.options.size.h, this.options.size.d);
    let materialPlane = new THREE.MeshPhongMaterial({ color: 0x9E91FA, side: THREE.DoubleSide });
    this.ground = new THREE.Mesh(geometryPlane, materialPlane);
    this.ground.userData = { ...this.options };
    this.ground.rotateX(Math.PI / 2);
    this.ground.position.y = -2.2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    let geometryDot = new THREE.SphereGeometry(0.2);
    let materialDot = new THREE.MeshPhongMaterial({ color: 0x9E91FA, side: THREE.DoubleSide });
    this.dot = new THREE.Mesh(geometryDot, materialDot);
    this.dot.userData = { ...this.options };
    this.dot.position.x = -4.2;
    this.scene.add(this.dot);
  }

}

