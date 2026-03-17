import * as THREE from "three";
import GUI from "three/addons/libs/lil-gui.module.min.js";

import { InitClass } from "./src/main/init.js";
import { SceneClass } from "./src/main/scene.js";
import { GuiClass } from "./src/main/gui.js";
import { AssetsManager } from "./src/assets/assets-manager.js";
import { KeyboardOrbitMove } from "./src/main/keyboardOrbitMove.js";

console.clear();

const gameContext = {};
gameContext.clock = new THREE.Clock();

startScene();

// ---- Запускает приложение ----
async function startScene() {
  try {
    await initClases();
    await initFunctions();
    startAnimationLoop();
  } catch (error) {
    console.error("Init error", error);
  }
}

// ---- Создает основные классы ----
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

// ---- Связывает стартовую логику ----
async function initFunctions() {
  await gameContext.assetManager.loadModels();

  createSelectionUI();
  initLightSelectionUI();
  initRugSelectionUI();
  initFurnitureSelectionUI();
  initBottomBtns();

  const myScene = gameContext.sceneClass;

  for (let i = 1; i <= 4; i++) {
    const panelBtn = document.querySelector(`.panel${i}`);
    if (panelBtn) {
      panelBtn.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        myScene.startDrag(i - 1, event);
      });
    }
  }

  gameContext.sceneClass.createScene();

  if (gameContext.guiClass) {
    gameContext.guiClass.refresh();
    gameContext.guiClass.refreshLight();
  }
}

// ---- Подключает нижние кнопки ----
function initBottomBtns() {
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

  const addTableBtn = document.getElementById("add-table");
  if (addTableBtn) {
    addTableBtn.onclick = () => {
      gameContext.sceneClass.addTable();
    };
  }
}

// ---- Подключает UI панели ----
function createSelectionUI() {
  document.getElementById("btn-rot-left").onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(Math.PI / 2);
  };

  document.getElementById("btn-rot-right").onclick = () => {
    gameContext.sceneClass.rotateSelectedPanel(-Math.PI / 2);
  };

  const colorPicker = document.getElementById("panel-color-picker");
  if (colorPicker) {
    colorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass.changeSelectedPanelColor(event.target.value);
    });
  }

  document.getElementById("btn-close-sel").onclick = () => {
    gameContext.sceneClass.deselectPanel();
  };

  document.getElementById("btn-all-color").onclick = () => {
    const colorInput = document.getElementById("panel-color-picker");
    if (!colorInput) return;
    gameContext.sceneClass.setAllPanelsColor(colorInput.value);
  };

  const wallColorPicker = document.getElementById("wall-color-picker");
  if (wallColorPicker) {
    wallColorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass.setAllWallsColor(event.target.value);
    });
  }
}

// ---- Подключает UI света ----
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
    const hex = gameContext.guiClass.kelvinToHex(kelvin);
    selected.pointLight.color.set(hex);

    const colorInput = document.getElementById("light-color-picker");
    if (colorInput) {
      colorInput.value = "#" + selected.pointLight.color.getHexString();
    }
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

// ---- Подключает UI ковра ----
function initRugSelectionUI() {
  const btnClose = document.getElementById("btn-close-rug");
  if (!btnClose) return;

  btnClose.onclick = () => {
    gameContext.sceneClass.deselectRug();
  };

  const updateRug = () => {
    const width = Number(document.getElementById("rug-width").value);
    const depth = Number(document.getElementById("rug-depth").value);
    const posX = Number(document.getElementById("rug-pos-x").value);
    const posZ = Number(document.getElementById("rug-pos-z").value);

    gameContext.sceneClass.updateRugTransform(width, depth, posX, posZ);
  };

  const rugColorPicker = document.getElementById("rug-color-picker");
  if (rugColorPicker) {
    rugColorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass.changeRugColor(event.target.value);
    });
  }

  document.getElementById("rug-width").addEventListener("input", updateRug);
  document.getElementById("rug-depth").addEventListener("input", updateRug);
  document.getElementById("rug-pos-x").addEventListener("input", updateRug);
  document.getElementById("rug-pos-z").addEventListener("input", updateRug);
}

// ---- Подключает UI мебели ----
function initFurnitureSelectionUI() {
  const btnClose = document.getElementById("btn-close-furniture");
  if (!btnClose) return;

  btnClose.onclick = () => {
    gameContext.sceneClass.deselectFurniture();
  };

  const updateFurniture = () => {
    const width = Number(document.getElementById("furniture-width").value);
    const depth = Number(document.getElementById("furniture-depth").value);
    const posX = Number(document.getElementById("furniture-pos-x").value);
    const posZ = Number(document.getElementById("furniture-pos-z").value);

    gameContext.sceneClass.updateFurnitureTransform(width, depth, posX, posZ);
  };

  document
    .getElementById("furniture-width")
    .addEventListener("input", updateFurniture);
  document
    .getElementById("furniture-depth")
    .addEventListener("input", updateFurniture);
  document
    .getElementById("furniture-pos-x")
    .addEventListener("input", updateFurniture);
  document
    .getElementById("furniture-pos-z")
    .addEventListener("input", updateFurniture);
}

// ---- Обновляет кадр ----
function update(delta) {
  if (gameContext.testMesh) {
    gameContext.testMesh.rotation.y += delta * 0.5;
  }

  if (gameContext.keyboardOrbitMove) {
    gameContext.keyboardOrbitMove.update(delta);
  }

  if (gameContext.sceneClass) {
    gameContext.sceneClass.updateAnimations(delta);
  }
}

// ---- Рисует сцену ----
function render() {
  if (gameContext.renderer && gameContext.scene && gameContext.camera) {
    gameContext.renderer.render(gameContext.scene, gameContext.camera);
  }

  if (gameContext.initClass && gameContext.initClass.stats) {
    gameContext.initClass.stats.update();
  }
}

// ---- Запускает цикл анимации ----
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
