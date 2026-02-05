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

async function startScene() {
  try {
    await initClases();
    await initFunctions();
    startAnimationLoop();
  } catch (error) {
    console.error('Init error', error);
  }
}

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

  await gameContext.assetManager.loadModels();

  // --- СОЗДАНИЕ UI ДЛЯ ВЫДЕЛЕННОЙ ПАНЕЛИ ---
  createSelectionUI();
  // -----------------------------------------

  const myScene = gameContext.sceneClass;

  // Кнопки добавления панелей (Drag and Drop из меню)
  for (let i = 1; i <= 4; i++) {
      const panelBtn = document.querySelector(`.panel${i}`);
      if (panelBtn) {
          panelBtn.addEventListener('pointerdown', (e) => {
              e.preventDefault();
              myScene.startDrag(i - 1); 
          });
      }
  }

  gameContext.sceneClass.createScene();
}

// --- ФУНКЦИЯ СОЗДАНИЯ HTML UI ---
function createSelectionUI() {
  const div = document.createElement('div');
  div.className = 'selection-ui';
  div.style.position = 'absolute';
  div.style.top = '20px';
  div.style.left = '20px';
  div.style.background = 'rgba(255, 255, 255, 0.9)';
  div.style.padding = '15px';
  div.style.borderRadius = '8px';
  div.style.display = 'none'; // Скрыто по умолчанию
  div.style.flexDirection = 'column';
  div.style.gap = '10px';
  div.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  div.style.fontFamily = 'sans-serif';

  div.innerHTML = `
    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">Панель</div>
    <div style="display:flex; gap:10px;">
      <button id="btn-rot-left" style="padding: 8px; cursor:pointer;">↺ Лев.</button>
      <button id="btn-rot-right" style="padding: 8px; cursor:pointer;">Прав. ↻</button>
    </div>
    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa;">Закрыть</button>
  `;

  document.body.appendChild(div);

  // Логика кнопок
  document.getElementById('btn-rot-left').onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(Math.PI / 2); // 90 градусов
  };

  document.getElementById('btn-rot-right').onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(-Math.PI / 2); // -90 градусов
  };

  document.getElementById('btn-close-sel').onclick = () => {
    gameContext.sceneClass.deselectPanel();
  };
}


function update(delta) {
  if (gameContext.testMesh) {
    gameContext.testMesh.rotation.y += delta * 0.5;
  }

  // --- ДОБАВЛЕНО: Обновление анимаций вращения ---
  if (gameContext.sceneClass) {
      gameContext.sceneClass.updateAnimations(delta);
  }
  // ----------------------------------------------
}

function render() {
  if (gameContext.initClass && gameContext.initClass.stats) {
    gameContext.initClass.stats.update();
  }
  if (gameContext.renderer && gameContext.scene && gameContext.camera) {
    gameContext.renderer.render(gameContext.scene, gameContext.camera);
  }
}

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