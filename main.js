import * as THREE from "three";

import GUI from "three/addons/libs/lil-gui.module.min.js";
import { InitClass } from "./src/main/init.js";
import { SceneClass } from "./src/main/scene.js";
import { GuiClass } from "./src/main/gui.js";
import { AssetsManager } from "./src/assets/assets-manager.js";
import { KeyboardOrbitMove } from "./src/main/keyboardOrbitMove.js";
import { Panel2DApp } from "./src/main/Panel2DApp.js";

console.clear();

const gameContext = {};
gameContext.clock = new THREE.Clock();
gameContext.sceneConfig = {
  worldScale: 1,
};
gameContext.appMode = null;
const SCENE_STATE_STORAGE_KEY = "room-configurator-scene-state";
const SCENE_STATE_LIBRARY_KEY = "room-configurator-scene-library";
const SCENE_LOCK_DISABLED_SELECTORS = [
  "#random_rotate",
  "#random_shuffle",
  "#toglle_net",
  "#add-light-bulb",
  "#toggle-light-bulb-visuals",
  "#add-table",
  "#add-sofa",
  "#add-sofa2",
  "#add-table2",
  "#add-chair",
  "#add-wardrobe",
  "#add-table-lamp",
  "#add-table-lamp-2",
  "#add-wall-tv",
  "#wall-color-picker",
  "#panel-global-color-picker",
  "#btn-apply-panel-global-color",
  "[data-panel-preset-color]",
  "#btn-rot-left",
  "#btn-rot-right",
  "#btn-all-color",
  "#btn-delete-2d-panel",
  "#panel-color-picker",
  "#light-color-picker",
  "#light-kelvin",
  "#light-intensity",
  "#light-distance",
  "#light-decay",
  "#bulb-emissive",
  "#bulb-visible",
  "#btn-delete-light",
  "#rug-color-picker",
  "#rug-width",
  "#rug-depth",
  "#rug-pos-x",
  "#rug-pos-z",
  "#furniture-width",
  "#furniture-depth",
  "#furniture-pos-x",
  "#furniture-pos-z",
  "#furniture-rotation",
  "#btn-delete-furniture",
  "#table-lamp-width",
  "#table-lamp-height",
  "#table-lamp-pos-x",
  "#table-lamp-pos-y",
  "#table-lamp-pos-z",
  "#btn-delete-table-lamp-ui",
  "#wall-tv-width",
  "#wall-tv-height",
  "#wall-tv-pos-x",
  "#wall-tv-pos-y",
  "#wall-tv-wall",
  "#btn-delete-wall-tv-ui",
];

initStaticUI();
initAppModeChooser();

// ---- Запускает приложение ----
async function startScene() {
  try {
    await initClases();
    await initSceneFunctions();
    startAnimationLoop();
  } catch (error) {
    console.error("Init error", error);
  }
}

// ---- Создает основные классы ----
async function initClases() {
  gameContext.gui = new GUI({ title: "Характеристики" });
  gameContext.initClass = new InitClass(gameContext);
  gameContext.scene = gameContext.initClass.scene;
  gameContext.camera = gameContext.initClass.camera;
  gameContext.renderer = gameContext.initClass.renderer;
  gameContext.assetManager = new AssetsManager(gameContext);
  gameContext.sceneClass = new SceneClass(gameContext);
  gameContext.keyboardOrbitMove = new KeyboardOrbitMove(gameContext);
  syncSceneLockUI();

  gameContext.renderer.localClippingEnabled = true;
  gameContext.guiClass = new GuiClass(gameContext);
}

// ---- Связывает стартовую логику ----
async function initSceneFunctions() {
  await gameContext.assetManager.loadModels();

  initLightSelectionUI();
  initRugSelectionUI();
  initFurnitureSelectionUI();
  initTableLampSelectionUI();
  initWallTvSelectionUI();

  gameContext.sceneClass.createScene();
  gameContext.sceneClass.onPanelsChanged = refreshPanelKitCounter;
  refreshPanelKitCounter();

  if (gameContext.guiClass) {
    gameContext.guiClass.refresh();
    gameContext.guiClass.refreshLight();
    gameContext.guiClass.refreshAmbient?.();
  }
}

function initStaticUI() {
  createSelectionUI();
  initBottomBtns();
  initPanelPalette();
  initSaveLoadUI();
  initAboutUI();
}

function initAppModeChooser() {
  const chooser = document.getElementById("app-mode-modal");
  const start3dBtn = document.getElementById("btn-start-3d");
  const start2dBtn = document.getElementById("btn-start-2d");

  if (!chooser || !start3dBtn || !start2dBtn) return;

  const closeChooser = () => {
    chooser.style.display = "none";
  };

  start3dBtn.onclick = async () => {
    closeChooser();
    document.body.classList.remove("mode-2d");
    gameContext.appMode = "3d";
    await startScene();
  };

  start2dBtn.onclick = () => {
    closeChooser();
    document.body.classList.add("mode-2d");
    gameContext.appMode = "2d";
    gameContext.panel2dApp = new Panel2DApp(gameContext);
    gameContext.panel2dApp.onPanelsChanged = refreshPanelKitCounter;
    gameContext.panel2dApp.init();
    gameContext.panel2dApp.show();
    refreshPanelKitCounter();
  };
}

function initAboutUI() {
  const modal = document.getElementById("about-app-modal");
  const openBtn = document.getElementById("btn-about-app");
  const closeBtn = document.getElementById("btn-close-about-app");
  const backdrop = document.getElementById("about-app-backdrop");

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.style.display = "block";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  openBtn.onclick = openModal;
  if (closeBtn) closeBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;
}

function getActiveConfigurator() {
  if (gameContext.appMode === "2d") {
    return gameContext.panel2dApp || null;
  }

  return gameContext.sceneClass || null;
}

function refreshPanelKitCounter(panelKitInfo = null) {
  const count = document.getElementById("panel-kit-count");
  if (!count) return;

  const info = panelKitInfo || getActiveConfigurator()?.getPanelKitInfo?.();
  count.textContent = String(info?.kits ?? 0);
}

function initPanelPalette() {
  for (let i = 1; i <= 4; i++) {
    const panelBtn = document.querySelector(`.panel${i}`);
    if (!panelBtn) continue;

    panelBtn.addEventListener("pointerdown", (event) => {
      event.preventDefault();

      if (gameContext.appMode === "2d") {
        gameContext.panel2dApp?.startPaletteDrag(i - 1, event);
        return;
      }

      gameContext.sceneClass?.startDrag(i - 1, event);
    });
  }
}

// ---- Подключает нижние кнопки ----
function initBottomBtns() {
  const sceneLockBtn = document.getElementById("btn-scene-lock");
  if (sceneLockBtn) {
    sceneLockBtn.onclick = () => {
      const isLocked = gameContext.sceneClass?.toggleSceneLock?.() || false;
      syncSceneLockUI(isLocked);
    };
  }

  document.getElementById("random_rotate").onclick = () => {
    getActiveConfigurator()?.randomRotate?.();
  };

  document.getElementById("random_shuffle").onclick = () => {
    getActiveConfigurator()?.shufflePanelsOnWalls?.();
    refreshPanelKitCounter();
  };

  document.getElementById("toglle_net").onclick = () => {
    getActiveConfigurator()?.toggleNet?.();
  };

  const addLightBtn = document.getElementById("add-light-bulb");
  if (addLightBtn) {
    addLightBtn.onclick = () => {
      gameContext.sceneClass?.addSideLightBulb();
    };
  }

  const toggleLightBulbVisualsBtn = document.getElementById(
    "toggle-light-bulb-visuals"
  );
  if (toggleLightBulbVisualsBtn) {
    toggleLightBulbVisualsBtn.onclick = () => {
      const isVisible =
        gameContext.sceneClass?.toggleAllLightBulbMeshesVisible?.();
      syncLightBulbVisualsButton(isVisible);
    };
  }

  const addTableBtn = document.getElementById("add-table");
  if (addTableBtn) {
    addTableBtn.onclick = () => {
      gameContext.sceneClass?.addTable();
    };
  }

  const addSofaBtn = document.getElementById("add-sofa");
  if (addSofaBtn) {
    addSofaBtn.onclick = () => {
      gameContext.sceneClass?.addSofa();
    };
  }

  const addSofa2Btn = document.getElementById("add-sofa2");
  if (addSofa2Btn) {
    addSofa2Btn.onclick = () => {
      gameContext.sceneClass?.addSofa2();
    };
  }

  const addTable2Btn = document.getElementById("add-table2");
  if (addTable2Btn) {
    addTable2Btn.onclick = () => {
      gameContext.sceneClass?.addTable2();
    };
  }

  const addChairBtn = document.getElementById("add-chair");
  if (addChairBtn) {
    addChairBtn.onclick = () => {
      gameContext.sceneClass?.addChair();
    };
  }

  const addWardrobeBtn = document.getElementById("add-wardrobe");
  if (addWardrobeBtn) {
    addWardrobeBtn.onclick = () => {
      gameContext.sceneClass?.addWardrobe();
    };
  }

  const addTableLampBtn = document.getElementById("add-table-lamp");
  if (addTableLampBtn) {
    addTableLampBtn.onclick = () => {
      gameContext.sceneClass?.addTableLamp();
    };
  }

  const addTableLamp2Btn = document.getElementById("add-table-lamp-2");
  if (addTableLamp2Btn) {
    addTableLamp2Btn.onclick = () => {
      gameContext.sceneClass?.addTableLamp(true);
    };
  }

  const addWallTvBtn = document.getElementById("add-wall-tv");
  if (addWallTvBtn) {
    addWallTvBtn.onclick = () => {
      gameContext.sceneClass?.addWallTv();
    };
  }
}

function syncLightBulbVisualsButton(forcedVisible = null) {
  const button = document.getElementById("toggle-light-bulb-visuals");
  if (!button) return;

  const isVisible =
    forcedVisible ??
    Boolean(gameContext.sceneClass?.lightManager?.areLightBulbMeshesVisible);
  const text = button.querySelector(".btn-text");
  button.firstChild.textContent = isVisible ? "🙈 " : "👁 ";
  if (text) {
    text.textContent = isVisible ? "Скрыть лампочки" : "Показать лампочки";
  }
}

function syncSceneLockUI(forcedLocked = null) {
  const isLocked =
    forcedLocked ?? Boolean(gameContext.sceneClass?.isSceneLocked);
  const sceneLockBtn = document.getElementById("btn-scene-lock");
  const bottomPanel = document.getElementById("bottom_panel");

  document.body.classList.toggle("scene-locked", isLocked);
  if (bottomPanel) {
    bottomPanel.classList.toggle("closed", isLocked);
    if (isLocked) {
      bottomPanel.classList.remove("compact");
    }
  }

  if (sceneLockBtn) {
    sceneLockBtn.textContent = isLocked ? "🔒" : "🔓";
    sceneLockBtn.title = isLocked
      ? "Разблокировать редактирование сцены"
      : "Заблокировать редактирование сцены";
    sceneLockBtn.setAttribute("aria-pressed", String(isLocked));
    sceneLockBtn.classList.toggle("active", isLocked);
  }

  document
    .querySelectorAll(SCENE_LOCK_DISABLED_SELECTORS.join(","))
    .forEach((element) => {
      element.disabled = isLocked;
      element.classList.toggle("scene-lock-disabled", isLocked);
    });
}

// ---- Подключает UI панели ----
function createSelectionUI() {
  document.getElementById("btn-rot-left").onclick = () => {
    getActiveConfigurator()?.rotateSelectedPanel?.(Math.PI / 2);
  };

  document.getElementById("btn-rot-right").onclick = () => {
    getActiveConfigurator()?.rotateSelectedPanel?.(-Math.PI / 2);
  };

  const colorPicker = document.getElementById("panel-color-picker");
  if (colorPicker) {
    colorPicker.addEventListener("input", (event) => {
      if (gameContext.appMode !== "3d") return;
      gameContext.sceneClass?.changeSelectedPanelColor(event.target.value);
    });
  }

  document.getElementById("btn-close-sel").onclick = () => {
    getActiveConfigurator()?.deselectPanel?.();
  };

  const delete2dPanelBtn = document.getElementById("btn-delete-2d-panel");
  if (delete2dPanelBtn) {
    delete2dPanelBtn.onclick = () => {
      getActiveConfigurator()?.deleteSelectedPanel?.();
      refreshPanelKitCounter();
    };
  }

  document.getElementById("btn-all-color").onclick = () => {
    const colorInput = document.getElementById("panel-color-picker");
    if (!colorInput) return;
    getActiveConfigurator()?.setAllPanelsColor?.(colorInput.value);
    syncGlobalPanelColorPicker(colorInput.value);
  };

  const wallColorPicker = document.getElementById("wall-color-picker");
  if (wallColorPicker) {
    wallColorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass?.setAllWallsColor(event.target.value);
      syncColorPreview("wall-color-preview", event.target.value);
    });
  }

  const globalPanelColorPicker = document.getElementById("panel-global-color-picker");
  if (globalPanelColorPicker) {
    globalPanelColorPicker.addEventListener("input", (event) => {
      applyGlobalPanelColor(event.target.value);
    });
  }

  const applyGlobalPanelColorBtn = document.getElementById("btn-apply-panel-global-color");
  if (applyGlobalPanelColorBtn) {
    applyGlobalPanelColorBtn.onclick = () => {
      const colorInput = document.getElementById("panel-global-color-picker");
      if (!colorInput) return;
      applyGlobalPanelColor(colorInput.value);
    };
  }

  document.querySelectorAll("[data-panel-preset-color]").forEach((presetBtn) => {
    presetBtn.addEventListener("click", () => {
      applyGlobalPanelColor(presetBtn.dataset.panelPresetColor);
    });
  });
}

function applyGlobalPanelColor(colorValue) {
  getActiveConfigurator()?.setAllPanelsColor?.(colorValue);
  syncGlobalPanelColorPicker(colorValue);
  syncSelectionPanelColorPicker(colorValue);
  syncColorPreview("panel-global-color-preview", colorValue);
}

function syncGlobalPanelColorPicker(colorValue) {
  const colorInput = document.getElementById("panel-global-color-picker");
  if (colorInput) colorInput.value = colorValue;
}

function syncSelectionPanelColorPicker(colorValue) {
  const colorInput = document.getElementById("panel-color-picker");
  if (colorInput) colorInput.value = colorValue;
}

function syncColorPreview(previewId, colorValue) {
  const preview = document.getElementById(previewId);
  if (preview) preview.style.setProperty("--preview-color", colorValue);
}

// ---- Подключает UI света ----
function initLightSelectionUI() {
  const lightUI = document.getElementById("light-selection-ui");
  if (!lightUI) return;
  const worldScale = gameContext.sceneConfig?.worldScale || 1;
  const worldScaleSquared = worldScale * worldScale;
  const defaultLightIntensity = 18 * worldScaleSquared;
  const defaultLightDistance = 6 * worldScale;

  const intensityInput = document.getElementById("light-intensity");
  if (intensityInput) {
    intensityInput.max = String(Math.max(defaultLightIntensity * 4, 50));
    intensityInput.value = String(defaultLightIntensity);
  }

  const distanceInput = document.getElementById("light-distance");
  if (distanceInput) {
    distanceInput.max = String(Math.max(defaultLightDistance * 3, 20));
    distanceInput.value = String(defaultLightDistance);
  }

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
      gameContext.sceneClass.lightManager.syncLightFixture(selected.pointLight);
    });

  document.getElementById("light-kelvin").addEventListener("input", (event) => {
    const selected = getSelected();
    if (!selected) return;

    const kelvin = Number(event.target.value);
    const hex = gameContext.guiClass.kelvinToHex(kelvin);
    selected.pointLight.color.set(hex);
    gameContext.sceneClass.lightManager.syncLightFixture(selected.pointLight);

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
      gameContext.sceneClass.lightManager.syncLightFixture(selected.pointLight);
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
      gameContext.sceneClass.lightManager.setLightBulbEmissiveIntensity(
        selected.bulbMesh,
        Number(event.target.value)
      );
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
    gameContext.sceneClass.lightManager.fillLights =
      gameContext.sceneClass.lightManager.fillLights.filter(
        (light) => light !== selected.pointLight
      );

    gameContext.sceneClass.lightManager.disposeLightBulbMesh(selected.bulbMesh);

    gameContext.sceneClass.deselectLightBulb();
  };
}

// ---- Подключает UI ковра ----
function initRugSelectionUI() {
  const btnClose = document.getElementById("btn-close-rug");
  if (!btnClose) return;
  const { widthWallFront, widthWallSide } = gameContext.sceneClass.config;
  const rugWidthInput = document.getElementById("rug-width");
  const rugDepthInput = document.getElementById("rug-depth");
  const rugPosXInput = document.getElementById("rug-pos-x");
  const rugPosZInput = document.getElementById("rug-pos-z");

  if (rugWidthInput) {
    rugWidthInput.min = String(gameContext.sceneConfig.worldScale);
    rugWidthInput.max = String(widthWallFront * 0.95);
  }

  if (rugDepthInput) {
    rugDepthInput.min = String(gameContext.sceneConfig.worldScale);
    rugDepthInput.max = String(widthWallSide * 0.95);
  }

  if (rugPosXInput) {
    rugPosXInput.min = String(-widthWallFront / 2);
    rugPosXInput.max = String(widthWallFront / 2);
  }

  if (rugPosZInput) {
    rugPosZInput.min = String(-widthWallSide / 2);
    rugPosZInput.max = String(widthWallSide / 2);
  }

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
  const { widthWallFront, widthWallSide } = gameContext.sceneClass.config;
  const furnitureWidthInput = document.getElementById("furniture-width");
  const furnitureDepthInput = document.getElementById("furniture-depth");
  const furniturePosXInput = document.getElementById("furniture-pos-x");
  const furniturePosZInput = document.getElementById("furniture-pos-z");

  if (furnitureWidthInput) {
    furnitureWidthInput.max = String(widthWallFront * 0.9);
  }

  if (furnitureDepthInput) {
    furnitureDepthInput.max = String(widthWallSide * 0.9);
  }

  if (furniturePosXInput) {
    furniturePosXInput.min = String(-widthWallFront / 2);
    furniturePosXInput.max = String(widthWallFront / 2);
  }

  if (furniturePosZInput) {
    furniturePosZInput.min = String(-widthWallSide / 2);
    furniturePosZInput.max = String(widthWallSide / 2);
  }

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

  document
    .getElementById("furniture-rotation")
    .addEventListener("input", (event) => {
      gameContext.sceneClass.updateFurnitureRotation(
        Number(event.target.value)
      );
    });

  const deleteFurnitureBtn = document.getElementById("btn-delete-furniture");
  if (deleteFurnitureBtn) {
    deleteFurnitureBtn.onclick = () => {
      gameContext.sceneClass.deleteSelectedFurniture();
    };
  }
}

// ---- Подключает UI настольной лампы ----
function initTableLampSelectionUI() {
  const btnClose = document.getElementById("btn-close-table-lamp");
  if (!btnClose) return;
  const { widthWallFront, widthWallSide, heightWall } = gameContext.sceneClass.config;
  const lampPosXInput = document.getElementById("table-lamp-pos-x");
  const lampPosYInput = document.getElementById("table-lamp-pos-y");
  const lampPosZInput = document.getElementById("table-lamp-pos-z");

  if (lampPosXInput) {
    lampPosXInput.min = String(-widthWallFront / 2);
    lampPosXInput.max = String(widthWallFront / 2);
  }

  if (lampPosYInput) {
    lampPosYInput.min = String(-heightWall / 2);
    lampPosYInput.max = String(heightWall / 2);
  }

  if (lampPosZInput) {
    lampPosZInput.min = String(-widthWallSide / 2);
    lampPosZInput.max = String(widthWallSide / 2);
  }

  btnClose.onclick = () => {
    gameContext.sceneClass.deselectTableLamp();
  };

  const updateTableLamp = () => {
    const width = Number(document.getElementById("table-lamp-width").value);
    const height = Number(document.getElementById("table-lamp-height").value);
    const posX = Number(document.getElementById("table-lamp-pos-x").value);
    const posY = Number(document.getElementById("table-lamp-pos-y").value);
    const posZ = Number(document.getElementById("table-lamp-pos-z").value);

    gameContext.sceneClass.updateTableLampTransform(
      width,
      height,
      posX,
      posY,
      posZ
    );
  };

  document
    .getElementById("table-lamp-width")
    .addEventListener("input", updateTableLamp);
  document
    .getElementById("table-lamp-height")
    .addEventListener("input", updateTableLamp);
  document
    .getElementById("table-lamp-pos-x")
    .addEventListener("input", updateTableLamp);
  document
    .getElementById("table-lamp-pos-y")
    .addEventListener("input", updateTableLamp);
  document
    .getElementById("table-lamp-pos-z")
    .addEventListener("input", updateTableLamp);

  const deleteLampBtn = document.getElementById("btn-delete-table-lamp-ui");
  if (deleteLampBtn) {
    deleteLampBtn.onclick = () => {
      gameContext.sceneClass.deleteTableLamp();
    };
  }
}

// ---- Подключает UI настенного телевизора ----
function initWallTvSelectionUI() {
  const btnClose = document.getElementById("btn-close-wall-tv");
  if (!btnClose) return;

  btnClose.onclick = () => {
    gameContext.sceneClass.deselectWallTv();
  };

  const updateWallTv = () => {
    const width = Number(document.getElementById("wall-tv-width").value);
    const height = Number(document.getElementById("wall-tv-height").value);
    const posX = Number(document.getElementById("wall-tv-pos-x").value);
    const posY = Number(document.getElementById("wall-tv-pos-y").value);
    const wallNumber = Number(document.getElementById("wall-tv-wall").value);

    gameContext.sceneClass.updateWallTvTransform(
      width,
      height,
      posX,
      posY,
      wallNumber
    );
  };

  document
    .getElementById("wall-tv-width")
    .addEventListener("input", updateWallTv);
  document
    .getElementById("wall-tv-height")
    .addEventListener("input", updateWallTv);
  document
    .getElementById("wall-tv-pos-x")
    .addEventListener("input", updateWallTv);
  document
    .getElementById("wall-tv-pos-y")
    .addEventListener("input", updateWallTv);
  document
    .getElementById("wall-tv-wall")
    .addEventListener("input", updateWallTv);

  const deleteWallTvBtn = document.getElementById("btn-delete-wall-tv-ui");
  if (deleteWallTvBtn) {
    deleteWallTvBtn.onclick = () => {
      gameContext.sceneClass.deleteWallTv();
    };
  }
}

// ---- Подключает UI сохранения/загрузки ----
function initSaveLoadUI() {
  const modal = document.getElementById("save-load-modal");
  const openBtn = document.getElementById("btn-presets");
  const closeBtn = document.getElementById("btn-close-save-load");
  const backdrop = document.getElementById("save-load-backdrop");
  const saveBtn = document.getElementById("btn-save-scene-state");
  const loadStorageBtn = document.getElementById("btn-load-scene-storage");
  const copyBtn = document.getElementById("btn-copy-scene-state");
  const pasteBtn = document.getElementById("btn-paste-scene-state");
  const loadTextBtn = document.getElementById("btn-load-scene-text");
  const textArea = document.getElementById("scene-state-text");
  const status = document.getElementById("scene-state-status");
  const savedList = document.getElementById("scene-state-saved-list");

  if (!modal || !openBtn || !textArea || !status || !savedList) return;

  const setStatus = (message) => {
    status.textContent = message;
  };

  const encodeState = (state) =>
    "roomcfg:" + btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  const decodeState = (encoded) => {
    const normalized = encoded.trim().replace(/^roomcfg:/, "");
    return JSON.parse(decodeURIComponent(escape(atob(normalized))));
  };
  const buildStatePayload = () => {
    const activeConfigurator = getActiveConfigurator();
    if (!activeConfigurator?.getSceneState) {
      throw new Error("Активный режим еще не выбран");
    }

    return {
      mode: gameContext.appMode || "3d",
      state: activeConfigurator.getSceneState(),
    };
  };
  const getPayloadMode = (payload) => {
    const isWrappedState =
      payload &&
      typeof payload === "object" &&
      payload.mode &&
      Object.prototype.hasOwnProperty.call(payload, "state");

    return isWrappedState ? payload.mode : "3d";
  };
  const getEncodedStateMode = (encoded) => {
    try {
      return getPayloadMode(decodeState(encoded));
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getCurrentMode = () => gameContext.appMode || "3d";
  const getCurrentStorageKey = () =>
    getCurrentMode() === "2d"
      ? `${SCENE_STATE_STORAGE_KEY}-2d`
      : SCENE_STATE_STORAGE_KEY;
  const getCurrentLibraryKey = () =>
    getCurrentMode() === "2d"
      ? `${SCENE_STATE_LIBRARY_KEY}-2d`
      : SCENE_STATE_LIBRARY_KEY;
  const applyStatePayload = (payload) => {
    const isWrappedState =
      payload &&
      typeof payload === "object" &&
      payload.mode &&
      Object.prototype.hasOwnProperty.call(payload, "state");

    const targetMode = isWrappedState ? payload.mode : "3d";
    const targetState = isWrappedState ? payload.state : payload;

    if (targetMode !== gameContext.appMode) {
      throw new Error("Сохранение сделано для другого режима");
    }

    const activeConfigurator = getActiveConfigurator();
    if (!activeConfigurator?.applySceneState) {
      throw new Error("Активный режим еще не выбран");
    }

    activeConfigurator.applySceneState(targetState);
    refreshPanelKitCounter();
  };

  const readStoredLibrary = () => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(getCurrentLibraryKey()) || "[]"
      );
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) =>
          typeof item === "string" &&
          item.trim().length > 0 &&
          getEncodedStateMode(item) === getCurrentMode()
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const writeStoredLibrary = (items) => {
    localStorage.setItem(getCurrentLibraryKey(), JSON.stringify(items));
  };

  const persistStateString = (encoded) => {
    const normalized = encoded.trim();
    const library = readStoredLibrary();
    const alreadyExists = library.includes(normalized);
    const nextLibrary = alreadyExists
      ? library
      : [normalized, ...library];

    localStorage.setItem(getCurrentStorageKey(), normalized);
    writeStoredLibrary(nextLibrary);

    return { alreadyExists, library: nextLibrary };
  };

  const renderSavedList = () => {
    const library = readStoredLibrary();
    savedList.innerHTML = "";

    if (!library.length) {
      const empty = document.createElement("div");
      empty.className = "scene-state-saved-empty";
      empty.textContent = "Пока нет сохраненных состояний.";
      savedList.appendChild(empty);
      return;
    }

    library.forEach((encoded, index) => {
      const item = document.createElement("div");
      item.className = "scene-state-saved-item";

      const preview = document.createElement("div");
      preview.className = "scene-state-saved-preview";
      preview.textContent = `${index + 1}. ${encoded}`;

      const actions = document.createElement("div");
      actions.className = "scene-state-saved-actions";

      const loadBtn = document.createElement("button");
      loadBtn.className = "action-btn";
      loadBtn.textContent = "Загрузить";
      loadBtn.onclick = () => {
        try {
          textArea.value = encoded;
          applyStatePayload(decodeState(encoded));
          localStorage.setItem(getCurrentStorageKey(), encoded);
          setStatus("Состояние загружено из списка сохранений.");
        } catch (error) {
          setStatus("Не удалось загрузить выбранное состояние.");
          console.error(error);
        }
      };

      const copyItemBtn = document.createElement("button");
      copyItemBtn.className = "action-btn";
      copyItemBtn.textContent = "Копировать";
      copyItemBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(encoded);
          textArea.value = encoded;
          localStorage.setItem(getCurrentStorageKey(), encoded);
          setStatus("Строка состояния скопирована из списка.");
        } catch (error) {
          setStatus("Не удалось скопировать выбранную строку.");
          console.error(error);
        }
      };

      const deleteItemBtn = document.createElement("button");
      deleteItemBtn.className = "action-btn";
      deleteItemBtn.textContent = "Удалить";
      deleteItemBtn.onclick = () => {
        const nextLibrary = readStoredLibrary().filter((item) => item !== encoded);
        writeStoredLibrary(nextLibrary);

        if ((textArea.value || "").trim() === encoded) {
          textArea.value = "";
        }

        if ((localStorage.getItem(getCurrentStorageKey()) || "").trim() === encoded) {
          const nextCurrent = nextLibrary[0] || "";
          if (nextCurrent) {
            localStorage.setItem(getCurrentStorageKey(), nextCurrent);
          } else {
            localStorage.removeItem(getCurrentStorageKey());
          }
        }

        renderSavedList();
        setStatus("Сохранение удалено из памяти устройства.");
      };

      actions.appendChild(loadBtn);
      actions.appendChild(copyItemBtn);
      actions.appendChild(deleteItemBtn);
      item.appendChild(preview);
      item.appendChild(actions);
      savedList.appendChild(item);
    });
  };

  const rememberLegacySingleState = () => {
    const legacy = localStorage.getItem(getCurrentStorageKey());
    if (!legacy || readStoredLibrary().includes(legacy)) return;
    if (getEncodedStateMode(legacy) !== getCurrentMode()) return;
    writeStoredLibrary([legacy, ...readStoredLibrary()]);
  };

  const openModal = () => {
    modal.style.display = "block";
    textArea.value = localStorage.getItem(getCurrentStorageKey()) || "";
    rememberLegacySingleState();
    renderSavedList();
    setStatus("");
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  openBtn.onclick = openModal;
  if (closeBtn) closeBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;

  if (saveBtn) {
    saveBtn.onclick = async () => {
      try {
        const encoded = encodeState(buildStatePayload());
        const { alreadyExists } = persistStateString(encoded);
        textArea.value = encoded;
        renderSavedList();
        setStatus(
          alreadyExists
            ? "Такое состояние уже есть в памяти. Строка обновлена ниже."
            : "Состояние сохранено в память и добавлено в список."
        );
      } catch (error) {
        setStatus("Не удалось сохранить состояние.");
        console.error(error);
      }
    };
  }

  if (loadStorageBtn) {
    loadStorageBtn.onclick = () => {
      try {
        const encoded = localStorage.getItem(getCurrentStorageKey());
        if (!encoded) {
          setStatus("В локальном хранилище пока ничего нет.");
          return;
        }
        textArea.value = encoded;
        applyStatePayload(decodeState(encoded));
        renderSavedList();
        setStatus("Состояние загружено из локального хранилища.");
      } catch (error) {
        setStatus("Не удалось загрузить из локального хранилища.");
        console.error(error);
      }
    };
  }

  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        if (!textArea.value.trim()) {
          const encoded = encodeState(buildStatePayload());
          persistStateString(encoded);
          textArea.value = encoded;
          renderSavedList();
        }
        await navigator.clipboard.writeText(textArea.value);
        setStatus("Строка состояния скопирована.");
      } catch (error) {
        setStatus("Не удалось скопировать строку.");
        console.error(error);
      }
    };
  }

  if (pasteBtn) {
    pasteBtn.onclick = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (!clipboardText.trim()) {
          setStatus("Буфер обмена пуст.");
          return;
        }
        textArea.value = clipboardText;
        applyStatePayload(decodeState(clipboardText));
        persistStateString(clipboardText);
        renderSavedList();
        setStatus("Состояние загружено из буфера обмена.");
      } catch (error) {
        setStatus("Не удалось прочитать буфер обмена.");
        console.error(error);
      }
    };
  }

  if (loadTextBtn) {
    loadTextBtn.onclick = () => {
      try {
        if (!textArea.value.trim()) {
          setStatus("Поле со строкой пустое.");
          return;
        }
        const encoded = textArea.value.trim();
        applyStatePayload(decodeState(encoded));
        persistStateString(encoded);
        renderSavedList();
        setStatus("Состояние загружено из текстового поля.");
      } catch (error) {
        setStatus("Строка состояния повреждена или не подходит.");
        console.error(error);
      }
    };
  }

  rememberLegacySingleState();
  renderSavedList();
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
