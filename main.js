import * as THREE from 'three';
import GUI from 'three/addons/libs/lil-gui.module.min.js';

import { InitClass } from './src/main/init';
import { SceneClass } from './src/main/scene';
import { GuiClass } from './src/main/gui';
import { PanelsClass } from './src/main/panels';
import { AssetsManager } from './src/assets/assets-manager';



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

  gameContext.gui = new GUI();

  

  gameContext.initClass = new InitClass(gameContext);
  gameContext.scene = gameContext.initClass.scene;
  gameContext.camera = gameContext.initClass.camera;
  gameContext.renderer = gameContext.initClass.renderer;
  gameContext.assetManager = new AssetsManager(gameContext);
  gameContext.sceneClass = new SceneClass(gameContext);
  gameContext.panelsClass = new PanelsClass(gameContext);
  

  
  
  gameContext.renderer.localClippingEnabled = true; 

  
  const sceneGui = new GuiClass(gameContext);
  
}

/* =========================================
   INIT FUNCTIONS
========================================= */
async function initFunctions() {

  if (location.hostname === 'localhost') {
    // gameContext.sceneFolder = gameContext.gui.addFolder('Scene');
    // const myScene = gameContext.sceneClass;
    // gameContext.sceneFolder.add(myScene.walls[myScene.activeWallIndex].material.map.offset, 'x', 0, 1, 0.1).name('Сдвиг сетки по x');
    // gameContext.sceneFolder.add(myScene.walls[myScene.activeWallIndex].material.map.offset, 'y', 0, 1, 0.1).name('Сдвиг сетки по y');

    // gameContext.sceneClass.updateGui();
  }

  // Ждем загрузку моделей перед тем, как разрешить взаимодействие
  await gameContext.assetManager.loadModels();

  const myScene = gameContext.sceneClass;

  // Цикл по 4 панелям
  for (let i = 1; i <= 4; i++) {
      const panelBtn = document.querySelector(`.panel${i}`);
      if (panelBtn) {
          panelBtn.addEventListener('pointerdown', (e) => {
              e.preventDefault();
              // Передаем индекс (i-1), чтобы было 0, 1, 2, 3
              myScene.startDrag(i - 1); 
          });
      }
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
