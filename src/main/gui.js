import * as THREE from "three";

export class GuiClass {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.sceneClass = gameContext.sceneClass;

    this.wallControllers = [];
    this.rendererControllers = [];
    this.ambientControllers = [];
    this.hemisphereControllers = [];
    this.ceilingControllers = [];
    this.fillLightFolders = [];

    this.init();
  }

  // ---- Создает структуру GUI ----
  init() {
    if (!this.gameContext.gui) return;

    this.wallFolder = this.gameContext.gui.addFolder("Стены");
    this.rendererFolder = this.gameContext.gui.addFolder("Рендер");
    this.lightFolder = this.gameContext.gui.addFolder("Свет комнаты");
    this.presetsFolder = this.lightFolder.addFolder("Пресеты");
    this.ambientFolder = this.lightFolder.addFolder("Ambient");
    this.hemisphereFolder = this.lightFolder.addFolder("Hemisphere");
    this.ceilingFolder = this.lightFolder.addFolder("Потолочный Spot");
    this.ceilingPositionFolder = this.ceilingFolder.addFolder("Позиция");
    this.ceilingBeamFolder = this.ceilingFolder.addFolder("Пятно");
    this.ceilingTargetFolder = this.ceilingFolder.addFolder("Target");
    this.ceilingShadowFolder = this.ceilingFolder.addFolder("Тени");
    this.fillFolder = this.lightFolder.addFolder("Fill Lights");

    this.sceneClass.onWallChanged = () => this.refresh();

    this.refresh();
    this.refreshLight();
  }

  // ---- Обновляет GUI стены ----
  refresh() {
    if (!this.wallFolder) return;

    this.wallControllers.forEach((controller) => controller.destroy());
    this.wallControllers = [];

    const activeWall = this.sceneClass.walls[this.sceneClass.activeWallIndex];
    if (!activeWall) return;

    const texture = activeWall.userData.gridTexture;
    if (!texture) return;

    this.wallControllers.push(
      this.wallFolder
        .add(texture.offset, "x", 0, 1, 0.01)
        .name("Сдвиг X")
        .listen(),
      this.wallFolder
        .add(texture.offset, "y", 0, 1, 0.01)
        .name("Сдвиг Y")
        .listen()
    );
  }

  // ---- Полностью перестраивает GUI освещения ----
  refreshLight() {
    if (!this.lightFolder) return;

    this.refreshRendererControls();
    this.refreshPresetControls();
    this.refreshAmbient();
    this.refreshHemisphereControls();
    this.refreshCeilingControls();
    this.refreshFillLightControls();
  }

  // ---- Обновляет кнопки пресетов ----
  refreshPresetControls() {
    if (!this.presetsFolder) return;

    if (this.presetControllers) {
      this.presetControllers.forEach((controller) => controller.destroy());
    }

    const actions = {
      day: () => {
        this.sceneClass.lightManager.applyLightingPreset("day");
        this.refreshLight();
      },
      evening: () => {
        this.sceneClass.lightManager.applyLightingPreset("evening");
        this.refreshLight();
      },
      night: () => {
        this.sceneClass.lightManager.applyLightingPreset("night");
        this.refreshLight();
      },
    };

    this.presetControllers = [
      this.presetsFolder.add(actions, "day").name("День"),
      this.presetsFolder.add(actions, "evening").name("Вечер"),
      this.presetsFolder.add(actions, "night").name("Ночь"),
    ];
  }

  // ---- Обновляет общий рендер ----
  refreshRendererControls() {
    if (!this.rendererFolder) return;

    this.rendererControllers.forEach((controller) => controller.destroy());
    this.rendererControllers = [];

    const renderer = this.gameContext.renderer;
    if (!renderer) return;

    const rendererParams = {
      exposure: renderer.toneMappingExposure,
      shadowsEnabled: renderer.shadowMap.enabled,
    };

    this.rendererControllers.push(
      this.rendererFolder
        .add(rendererParams, "exposure", 0.2, 1.6, 0.01)
        .name("Exposure")
        .onChange((value) => {
          renderer.toneMappingExposure = value;
        }),
      this.rendererFolder
        .add(rendererParams, "shadowsEnabled")
        .name("Тени")
        .onChange((value) => {
          renderer.shadowMap.enabled = value;
        })
    );
  }

  // ---- Обновляет ambient ----
  refreshAmbient() {
    if (!this.ambientFolder) return;

    this.ambientControllers.forEach((controller) => controller.destroy());
    this.ambientControllers = [];

    const ambientLight = this.sceneClass.ambientLight;
    if (!ambientLight) return;

    const params = {
      color: "#" + ambientLight.color.getHexString(),
    };

    this.ambientControllers.push(
      this.ambientFolder
        .add(ambientLight, "intensity", 0, 2, 0.01)
        .name("Intensity")
        .listen(),
      this.ambientFolder
        .addColor(params, "color")
        .name("Color")
        .onChange((value) => {
          ambientLight.color.set(value);
        })
    );
  }

  // ---- Обновляет hemisphere ----
  refreshHemisphereControls() {
    if (!this.hemisphereFolder) return;

    this.hemisphereControllers.forEach((controller) => controller.destroy());
    this.hemisphereControllers = [];

    const roomLights = this.sceneClass.lightManager.getRoomLights();
    const hemisphereLight = roomLights.hemisphereLight;
    if (!hemisphereLight) return;

    const params = {
      skyColor: "#" + hemisphereLight.color.getHexString(),
      groundColor: "#" + hemisphereLight.groundColor.getHexString(),
    };

    this.hemisphereControllers.push(
      this.hemisphereFolder
        .add(hemisphereLight, "intensity", 0, 2, 0.01)
        .name("Intensity")
        .listen(),
      this.hemisphereFolder
        .add(hemisphereLight.position, "y", -5, 5, 0.01)
        .name("Height")
        .listen(),
      this.hemisphereFolder
        .addColor(params, "skyColor")
        .name("Sky")
        .onChange((value) => {
          hemisphereLight.color.set(value);
        }),
      this.hemisphereFolder
        .addColor(params, "groundColor")
        .name("Ground")
        .onChange((value) => {
          hemisphereLight.groundColor.set(value);
        })
    );
  }

  // ---- Обновляет потолочный spot ----
  refreshCeilingControls() {
    if (!this.ceilingFolder) return;

    this.ceilingControllers.forEach((controller) => controller.destroy());
    this.ceilingControllers = [];

    const roomLights = this.sceneClass.lightManager.getRoomLights();
    const ceilingSpotLight = roomLights.ceilingSpotLight;
    const ceilingSpotTarget = roomLights.ceilingSpotTarget;
    if (!ceilingSpotLight || !ceilingSpotTarget) return;

    const params = {
      color: "#" + ceilingSpotLight.color.getHexString(),
      castShadow: ceilingSpotLight.castShadow,
      shadowMapSize: ceilingSpotLight.shadow.mapSize.x,
      shadowBias: ceilingSpotLight.shadow.bias,
      shadowNormalBias: ceilingSpotLight.shadow.normalBias,
      targetX: ceilingSpotTarget.position.x,
      targetY: ceilingSpotTarget.position.y,
      targetZ: ceilingSpotTarget.position.z,
    };

    this.ceilingControllers.push(
      this.ceilingPositionFolder
        .add(ceilingSpotLight.position, "x", -4, 4, 0.01)
        .name("X")
        .listen(),
      this.ceilingPositionFolder
        .add(ceilingSpotLight.position, "y", -4, 4, 0.01)
        .name("Y")
        .listen(),
      this.ceilingPositionFolder
        .add(ceilingSpotLight.position, "z", -4, 4, 0.01)
        .name("Z")
        .listen(),
      this.ceilingFolder
        .add(ceilingSpotLight, "intensity", 0, 120, 0.1)
        .name("Intensity")
        .onChange(() => {
          this.sceneClass.lightManager.syncLightFixture(ceilingSpotLight);
        })
        .listen(),
      this.ceilingFolder
        .add(ceilingSpotLight, "distance", 0, 30, 0.1)
        .name("Distance")
        .listen(),
      this.ceilingFolder
        .add(ceilingSpotLight, "decay", 0, 4, 0.01)
        .name("Decay")
        .listen(),
      this.ceilingFolder
        .addColor(params, "color")
        .name("Color")
        .onChange((value) => {
          ceilingSpotLight.color.set(value);
          this.sceneClass.lightManager.syncLightFixture(ceilingSpotLight);
        }),
      this.ceilingBeamFolder
        .add(ceilingSpotLight, "angle", 0.1, Math.PI / 1.5, 0.001)
        .name("Angle")
        .listen(),
      this.ceilingBeamFolder
        .add(ceilingSpotLight, "penumbra", 0, 1, 0.01)
        .name("Penumbra")
        .listen(),
      this.ceilingTargetFolder
        .add(params, "targetX", -4, 4, 0.01)
        .name("X")
        .onChange((value) => {
          ceilingSpotTarget.position.x = value;
        }),
      this.ceilingTargetFolder
        .add(params, "targetY", -4, 4, 0.01)
        .name("Y")
        .onChange((value) => {
          ceilingSpotTarget.position.y = value;
        }),
      this.ceilingTargetFolder
        .add(params, "targetZ", -4, 4, 0.01)
        .name("Z")
        .onChange((value) => {
          ceilingSpotTarget.position.z = value;
        }),
      this.ceilingShadowFolder
        .add(params, "castShadow")
        .name("castShadow")
        .onChange((value) => {
          ceilingSpotLight.castShadow = value;
        }),
      this.ceilingShadowFolder
        .add(params, "shadowMapSize", [512, 1024, 2048, 4096])
        .name("mapSize")
        .onChange((value) => {
          const size = Number(value);
          ceilingSpotLight.shadow.mapSize.set(size, size);
          ceilingSpotLight.shadow.needsUpdate = true;
        }),
      this.ceilingShadowFolder
        .add(params, "shadowBias", -0.01, 0.01, 0.00001)
        .name("bias")
        .onChange((value) => {
          ceilingSpotLight.shadow.bias = value;
        }),
      this.ceilingShadowFolder
        .add(params, "shadowNormalBias", 0, 0.2, 0.001)
        .name("normalBias")
        .onChange((value) => {
          ceilingSpotLight.shadow.normalBias = value;
        })
    );
  }

  // ---- Обновляет fill-lights ----
  refreshFillLightControls() {
    if (!this.fillFolder) return;

    this.fillLightFolders.forEach((folder) => folder.destroy());
    this.fillLightFolders = [];

    const roomLights = this.sceneClass.lightManager.getRoomLights();
    const fillLights = roomLights.fillLights || [];

    fillLights.forEach((light, index) => {
      const folder = this.fillFolder.addFolder(`Fill ${index + 1}`);
      const params = {
        color: "#" + light.color.getHexString(),
      };

      folder
        .add(light, "intensity", 0, 60, 0.1)
        .name("Intensity")
        .onChange(() => {
          this.sceneClass.lightManager.syncLightFixture(light);
        })
        .listen();
      folder
        .add(light, "distance", 0, 20, 0.1)
        .name("Distance")
        .listen();
      folder
        .add(light, "decay", 0, 4, 0.01)
        .name("Decay")
        .listen();
      folder
        .add(light.position, "x", -4, 4, 0.01)
        .name("X")
        .listen();
      folder
        .add(light.position, "y", -4, 4, 0.01)
        .name("Y")
        .listen();
      folder
        .add(light.position, "z", -4, 4, 0.01)
        .name("Z")
        .listen();
      folder
        .addColor(params, "color")
        .name("Color")
        .onChange((value) => {
          light.color.set(value);
          this.sceneClass.lightManager.syncLightFixture(light);
        });

      this.fillLightFolders.push(folder);
    });
  }

  // ---- Переводит кельвины в цвет ----
  kelvinToHex(kelvin) {
    const temperature = kelvin / 100;

    let red;
    let green;
    let blue;

    if (temperature <= 66) {
      red = 255;
      green = 99.4708025861 * Math.log(temperature) - 161.1195681661;
      blue =
        temperature <= 19
          ? 0
          : 138.5177312231 * Math.log(temperature - 10) - 305.0447927307;
    } else {
      red = 329.698727446 * Math.pow(temperature - 60, -0.1332047592);
      green = 288.1221695283 * Math.pow(temperature - 60, -0.0755148492);
      blue = 255;
    }

    const clamp255 = (value) => Math.min(255, Math.max(0, value));

    red = clamp255(red);
    green = clamp255(green);
    blue = clamp255(blue);

    const color = new THREE.Color(red / 255, green / 255, blue / 255);
    return "#" + color.getHexString();
  }
}
