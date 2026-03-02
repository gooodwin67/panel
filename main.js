import * as THREE from "three";
import GUI from "three/addons/libs/lil-gui.module.min.js";

import { InitClass } from "./src/main/init";
import { SceneClass } from "./src/main/scene";
import { GuiClass } from "./src/main/gui";
import { AssetsManager } from "./src/assets/assets-manager";
import { KeyboardOrbitMove } from "./src/main/keyboardOrbitMove";

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
    console.error("Init error", error);
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

  gameContext.keyboardOrbitMove = new KeyboardOrbitMove(gameContext);

  gameContext.renderer.localClippingEnabled = true;
  gameContext.guiClass = new GuiClass(gameContext);
}

/* =========================================
   INIT FUNCTIONS
========================================= */
async function initFunctions() {
  await gameContext.assetManager.loadModels();

  // --- СОЗДАНИЕ UI ДЛЯ ВЫДЕЛЕННОЙ ПАНЕЛИ ---
  createSelectionUI();

  initLightSelectionUI();

  InitBottomBtns();

  const myScene = gameContext.sceneClass;

  // Кнопки добавления панелей
  for (let i = 1; i <= 4; i++) {
    const panelBtn = document.querySelector(`.panel${i}`);
    if (panelBtn) {
      panelBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        myScene.startDrag(i - 1, e);
      });
    }
  }

  gameContext.sceneClass.createScene();

  if (gameContext.guiClass) {
    gameContext.guiClass.refresh();
    gameContext.guiClass.refreshLight();
  }

  function InitBottomBtns() {
    document.getElementById("random_rotate").onclick = () => {
      gameContext.sceneClass.randomRotate();
    };
    document.getElementById("random_shuffle").onclick = () => {
      gameContext.sceneClass.shufflePanelsOnWalls();
    };
    document.getElementById("toglle_net").onclick = () => {
      gameContext.sceneClass.toggleNet();
    };
    const addLightBtn = document.getElementById("add-light-bulb");
    if (addLightBtn) {
      addLightBtn.onclick = () => {
        gameContext.sceneClass.addSideLightBulb();
      };
    }
  }
}

// --- ФУНКЦИЯ СОЗДАНИЯ HTML UI ---
function createSelectionUI() {
  const div = document.createElement("div");
  div.className = "selection-ui";
  div.style.position = "absolute";
  div.style.top = "20px";
  div.style.left = "20px";
  div.style.background = "rgba(255, 255, 255, 0.95)";
  div.style.padding = "15px";
  div.style.borderRadius = "8px";
  div.style.display = "none";
  div.style.flexDirection = "column";
  div.style.gap = "10px";
  div.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  div.style.fontFamily = "sans-serif";
  div.style.pointerEvents = "auto";

  div.innerHTML = `
    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">Настройки</div>
    
    <!-- Вращение -->
    <div style="display:flex; gap:10px; justify-content: space-between;">
      <button id="btn-rot-left" style="flex:1; padding: 8px; cursor:pointer;">↺</button>
      <button id="btn-rot-right" style="flex:1; padding: 8px; cursor:pointer;">↻</button>
    </div>

    <!-- Цвет -->
    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
        <span style="font-size:14px;">Цвет:</span>
        <input type="color" id="panel-color-picker" value="#ffffff" style="width:100%; height:30px; cursor:pointer; border:none; padding:0;">
    </div>

    <button id="btn-all-color" style="margin-top:10px; padding: 5px; cursor:pointer; background:#ddffdd; border:1px solid #ffaaaa; border-radius:4px;">Цвет всех</button>

    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa; border-radius:4px;">Закрыть</button>
  `;

  document.body.appendChild(div);

  document.getElementById("btn-rot-left").onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(Math.PI / 2);
  };

  document.getElementById("btn-rot-right").onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(-Math.PI / 2);
  };

  const colorPicker = document.getElementById("panel-color-picker");
  colorPicker.addEventListener("input", (event) => {
    gameContext.sceneClass.changeSelectedPanelColor(event.target.value);
  });

  document.getElementById("btn-close-sel").onclick = () => {
    gameContext.sceneClass.deselectPanel();
  };
  document.getElementById("btn-all-color").onclick = () => {
    const colorInput = document.getElementById("panel-color-picker");
    if (!colorInput) return;

    gameContext.sceneClass.setAllPanelsColor(colorInput.value);
  };

  // --- Цвет всех стен ---
  const wallColorPicker = document.getElementById("wall-color-picker");
  if (wallColorPicker) {
    wallColorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass.setAllWallsColor(event.target.value);
    });
  }
}

function initLightSelectionUI() {
  const lightUI = document.getElementById("light-selection-ui");
  if (!lightUI) return;

  const getSelected = () => {
    const bulbMesh = gameContext.sceneClass.selectedLightBulb;
    if (!bulbMesh) return null;
    const pointLight = bulbMesh.userData.light;
    if (!pointLight) return null;
    return { bulbMesh, pointLight };
  };

  document.getElementById("btn-close-light").onclick = () => {
    gameContext.sceneClass.deselectLightBulb();
  };

  document
    .getElementById("light-color-picker")
    .addEventListener("input", (event) => {
      const selected = getSelected();
      if (!selected) return;
      selected.pointLight.color.set(event.target.value);
    });

  document.getElementById("light-kelvin").addEventListener("input", (event) => {
    const selected = getSelected();
    if (!selected) return;

    const kelvin = Number(event.target.value);
    const hex = gameContext.guiClass.kelvinToHex(kelvin); // уже есть :contentReference[oaicite:2]{index=2}
    selected.pointLight.color.set(hex);

    const colorInput = document.getElementById("light-color-picker");
    if (colorInput)
      colorInput.value = "#" + selected.pointLight.color.getHexString();
  });

  document
    .getElementById("light-intensity")
    .addEventListener("input", (event) => {
      const selected = getSelected();
      if (!selected) return;
      selected.pointLight.intensity = Number(event.target.value);
    });

  document
    .getElementById("light-distance")
    .addEventListener("input", (event) => {
      const selected = getSelected();
      if (!selected) return;
      selected.pointLight.distance = Number(event.target.value);
    });

  document.getElementById("light-decay").addEventListener("input", (event) => {
    const selected = getSelected();
    if (!selected) return;
    selected.pointLight.decay = Number(event.target.value);
  });

  document
    .getElementById("bulb-visible")
    .addEventListener("change", (event) => {
      const selected = getSelected();
      if (!selected) return;
      selected.bulbMesh.visible = event.target.checked;
    });

  document
    .getElementById("bulb-emissive")
    .addEventListener("input", (event) => {
      const selected = getSelected();
      if (!selected) return;
      if (!selected.bulbMesh.material) return;

      selected.bulbMesh.material.emissiveIntensity = Number(event.target.value);
      selected.bulbMesh.material.needsUpdate = true;
    });

  document.getElementById("btn-delete-light").onclick = () => {
    const selected = getSelected();
    if (!selected) return;

    gameContext.scene.remove(selected.bulbMesh);
    gameContext.scene.remove(selected.pointLight);

    const index = gameContext.sceneClass.lightBulbs.findIndex(
      (entry) => entry.mesh === selected.bulbMesh
    );
    if (index !== -1) gameContext.sceneClass.lightBulbs.splice(index, 1);

    if (selected.bulbMesh.geometry) selected.bulbMesh.geometry.dispose();
    if (selected.bulbMesh.material) selected.bulbMesh.material.dispose();

    gameContext.sceneClass.deselectLightBulb();
  };
}

function update(delta) {
  if (gameContext.testMesh) {
    gameContext.testMesh.rotation.y += delta * 0.5;
  }

  if (gameContext.keyboardOrbitMove) {
    gameContext.keyboardOrbitMove.update(delta);
  }

  if (gameContext.controls) {
    // gameContext.controls.update();
    // gameContext.controls.target.set(0, 0, 0);
  }

  // --- Обновление анимаций вращения ---
  if (gameContext.sceneClass) {
    gameContext.sceneClass.updateAnimations(delta);
  }

  // if (!gameContext._debugTimer) gameContext._debugTimer = 0;
  // gameContext._debugTimer += delta;
  // if (gameContext._debugTimer > 1) {
  //   gameContext._debugTimer = 0;
  //   const info = gameContext.renderer.info;
  //   console.log(
  //     "calls",
  //     info.render.calls,
  //     "tris",
  //     info.render.triangles,
  //     "geoms",
  //     info.memory.geometries,
  //     "tex",
  //     info.memory.textures
  //   );
  // }
}

function render() {
  if (gameContext.renderer && gameContext.scene && gameContext.camera) {
    // gameContext.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

    gameContext.renderer.render(gameContext.scene, gameContext.camera);
  }

  if (gameContext.initClass && gameContext.initClass.stats) {
    gameContext.initClass.stats.update();
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
