import * as THREE from 'three';
import GUI from 'three/addons/libs/lil-gui.module.min.js';

import { InitClass } from './src/main/init';
import { SceneClass } from './src/main/scene';

console.clear();

const gameContext = {};
gameContext.clock = new THREE.Clock();

/* =========================================
   ENTRY POINT
========================================= */
startScene();

/* =========================================
   START
========================================= */
async function startScene() {
  try {
    await initClases();
    await initFunctions();
    startAnimationLoop();
  } catch (error) {
    console.error('Init error', error);
  }
}

/* =========================================
   INIT CLASSES
========================================= */
async function initClases() {

  gameContext.initClass = new InitClass(gameContext);
  gameContext.sceneClass = new SceneClass(gameContext);

  gameContext.scene = gameContext.initClass.scene;
  gameContext.camera = gameContext.initClass.camera;
  gameContext.renderer = gameContext.initClass.renderer;

  gameContext.gui = new GUI();
}

/* =========================================
   INIT FUNCTIONS
========================================= */
async function initFunctions() {

  if (location.hostname === 'localhost') {
    const sceneFolder = gameContext.gui.addFolder('Scene');
    sceneFolder.add(gameContext.camera.position, 'z', 1, 20);
  }



  gameContext.sceneClass.createScene();
}

/* =========================================
   SCENE CONTENT
========================================= */
function createTestScene() {

  
}

/* =========================================
   UPDATE & RENDER
========================================= */
function update(delta) {
  if (gameContext.testMesh) {
    gameContext.testMesh.rotation.y += delta * 0.5;
  }
}

function render() {
  if (gameContext.initClass && gameContext.initClass.stats) {
    gameContext.initClass.stats.update();
  }

  if (gameContext.renderer && gameContext.scene && gameContext.camera) {
    gameContext.renderer.render(gameContext.scene, gameContext.camera);
  }
}

/* =========================================
   LOOP
========================================= */
function startAnimationLoop() {

  let accumulator = 0;
  const dt = 1 / 60;
  const maxFrame = 0.1;

  gameContext.renderer.setAnimationLoop(() => {

    let frameDelta = gameContext.clock.getDelta();
    if (frameDelta > maxFrame) frameDelta = maxFrame;
    accumulator += frameDelta;

    let maxSteps = 5;
    while (accumulator >= dt && maxSteps > 0) {
      update(dt);
      accumulator -= dt;
      maxSteps--;
    }

    if (accumulator > dt) accumulator = 0;
    render();
  });
}
