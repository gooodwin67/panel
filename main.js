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
async function initSceneFunctions() {
  await gameContext.assetManager.loadModels();

  initLightSelectionUI();
  initRugSelectionUI();
  initFurnitureSelectionUI();
  initTableLampSelectionUI();

  gameContext.sceneClass.createScene();

  if (gameContext.guiClass) {
    gameContext.guiClass.refresh();
    gameContext.guiClass.refreshLight();
  }
}

function initStaticUI() {
  createSelectionUI();
  initBottomBtns();
  initPanelPalette();
  initSaveLoadUI();
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
    gameContext.panel2dApp.init();
    gameContext.panel2dApp.show();
  };
}

function getActiveConfigurator() {
  if (gameContext.appMode === "2d") {
    return gameContext.panel2dApp || null;
  }

  return gameContext.sceneClass || null;
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
  document.getElementById("random_rotate").onclick = () => {
    getActiveConfigurator()?.randomRotate?.();
  };

  document.getElementById("random_shuffle").onclick = () => {
    getActiveConfigurator()?.shufflePanelsOnWalls?.();
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

  const addTableBtn = document.getElementById("add-table");
  if (addTableBtn) {
    addTableBtn.onclick = () => {
      gameContext.sceneClass?.addTable();
    };
  }

  const addTableLampBtn = document.getElementById("add-table-lamp");
  if (addTableLampBtn) {
    addTableLampBtn.onclick = () => {
      gameContext.sceneClass?.addTableLamp();
    };
  }
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
    };
  }

  document.getElementById("btn-all-color").onclick = () => {
    const colorInput = document.getElementById("panel-color-picker");
    if (!colorInput) return;
    if (gameContext.appMode !== "3d") return;
    gameContext.sceneClass?.setAllPanelsColor(colorInput.value);
  };

  const wallColorPicker = document.getElementById("wall-color-picker");
  if (wallColorPicker) {
    wallColorPicker.addEventListener("input", (event) => {
      gameContext.sceneClass?.setAllWallsColor(event.target.value);
    });
  }
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
      gameContext.sceneClass.deleteTable();
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
  };

  const readStoredLibrary = () => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(SCENE_STATE_LIBRARY_KEY) || "[]"
      );
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) => typeof item === "string" && item.trim().length > 0
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const writeStoredLibrary = (items) => {
    localStorage.setItem(SCENE_STATE_LIBRARY_KEY, JSON.stringify(items));
  };

  const persistStateString = (encoded) => {
    const normalized = encoded.trim();
    const library = readStoredLibrary();
    const alreadyExists = library.includes(normalized);
    const nextLibrary = alreadyExists
      ? library
      : [normalized, ...library];

    localStorage.setItem(SCENE_STATE_STORAGE_KEY, normalized);
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
          localStorage.setItem(SCENE_STATE_STORAGE_KEY, encoded);
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
          localStorage.setItem(SCENE_STATE_STORAGE_KEY, encoded);
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

        if ((localStorage.getItem(SCENE_STATE_STORAGE_KEY) || "").trim() === encoded) {
          const nextCurrent = nextLibrary[0] || "";
          if (nextCurrent) {
            localStorage.setItem(SCENE_STATE_STORAGE_KEY, nextCurrent);
          } else {
            localStorage.removeItem(SCENE_STATE_STORAGE_KEY);
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
    const legacy = localStorage.getItem(SCENE_STATE_STORAGE_KEY);
    if (!legacy || readStoredLibrary().includes(legacy)) return;
    writeStoredLibrary([legacy, ...readStoredLibrary()]);
  };

  const openModal = () => {
    modal.style.display = "block";
    textArea.value = localStorage.getItem(SCENE_STATE_STORAGE_KEY) || "";
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
        const encoded = localStorage.getItem(SCENE_STATE_STORAGE_KEY);
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
