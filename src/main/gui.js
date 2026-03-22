import * as THREE from "three";

export class GuiClass {
  // ---- Готовит состояние GUI ----
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.sceneClass = gameContext.sceneClass;

    this.controllers = [];
    this.folder = null;

    this.init();
  }

  // ---- Создает папки GUI ----
  init() {
    if (this.gameContext.gui) {
      this.folder = this.gameContext.gui.addFolder("Настройки Стены");
    }

    this.sceneClass.onWallChanged = () => this.refresh();
    this.refresh();

    if (this.gameContext.gui) {
      this.lightFolder = this.gameContext.gui.addFolder("Свет");
      this.ambientFolder = this.gameContext.gui.addFolder("Атмосфера");
    }

    this.refreshLight();
    this.refreshAmbient();
  }

  // ---- Обновляет контролы света ----
  refreshLight() {
    if (!this.lightFolder) return;

    if (!this.lightControllers) this.lightControllers = [];
    this.lightControllers.forEach((controller) => controller.destroy());
    this.lightControllers = [];

    const sceneClass = this.sceneClass;
    const pointLight = sceneClass.centerLight;
    const bulbMesh = sceneClass.lightBulbMesh;
    const worldScale = sceneClass.config?.worldScale || 1;
    const lightPositionLimit = 10 * worldScale;

    if (!pointLight || !bulbMesh) return;
    const intensityLimit = Math.max(50, pointLight.intensity * 2);
    const distanceLimit = Math.max(50 * worldScale, pointLight.distance * 2);

    const lightParams = {
      lightColor: "#" + pointLight.color.getHexString(),
      bulbColor: "#" + bulbMesh.material.color.getHexString(),
      bulbVisible: bulbMesh.visible,
      castShadow: pointLight.castShadow,
      shadowMapSize: pointLight.shadow.mapSize.width,
      shadowBias: pointLight.shadow.bias,
      kelvin: 2800,
    };

    const posFolder = this.lightFolder.addFolder("Позиция");
    const syncBulb = () => bulbMesh.position.copy(pointLight.position);

    const ctrlPosX = posFolder
      .add(pointLight.position, "x", -lightPositionLimit, lightPositionLimit, 0.01)
      .name("X")
      .listen()
      .onChange(syncBulb);
    const ctrlPosY = posFolder
      .add(pointLight.position, "y", -lightPositionLimit, lightPositionLimit, 0.01)
      .name("Y")
      .listen()
      .onChange(syncBulb);
    const ctrlPosZ = posFolder
      .add(pointLight.position, "z", -lightPositionLimit, lightPositionLimit, 0.01)
      .name("Z")
      .listen()
      .onChange(syncBulb);

    this.lightControllers.push(ctrlPosX, ctrlPosY, ctrlPosZ);

    this.lightControllers.push(
      this.lightFolder
        .add(pointLight, "intensity", 0, intensityLimit, 0.1)
        .name("Яркость")
        .listen(),
      this.lightFolder
        .add(pointLight, "distance", 0, distanceLimit, 0.1)
        .name("Дальность")
        .listen(),
      this.lightFolder
        .add(pointLight, "decay", 0, 5, 0.01)
        .name("Затухание")
        .listen()
    );

    this.lightControllers.push(
      this.lightFolder
        .addColor(lightParams, "lightColor")
        .name("Цвет света")
        .onChange((value) => {
          pointLight.color.set(value);
        })
    );

    this.lightControllers.push(
      this.lightFolder
        .add(lightParams, "kelvin", 1000, 12000, 50)
        .name("Температура (K)")
        .onChange((value) => {
          const hex = this.kelvinToHex(value);
          pointLight.color.set(hex);
          lightParams.lightColor = "#" + pointLight.color.getHexString();
        })
    );

    const bulbFolder = this.lightFolder.addFolder("Корпус");
    this.lightControllers.push(
      bulbFolder
        .add(lightParams, "bulbVisible")
        .name("Виден")
        .onChange((value) => {
          bulbMesh.visible = value;
        }),
      bulbFolder
        .addColor(lightParams, "bulbColor")
        .name("Цвет")
        .onChange((value) => {
          bulbMesh.material.color.set(value);
        })
    );

    const shadowFolder = this.lightFolder.addFolder("Тени");
    this.lightControllers.push(
      shadowFolder
        .add(lightParams, "castShadow")
        .name("castShadow")
        .onChange((value) => {
          pointLight.castShadow = value;
        }),
      shadowFolder
        .add(lightParams, "shadowMapSize", [256, 512, 1024, 2048])
        .name("mapSize")
        .onChange((value) => {
          const size = Number(value);
          pointLight.shadow.mapSize.set(size, size);
          pointLight.shadow.needsUpdate = true;
        }),
      shadowFolder
        .add(lightParams, "shadowBias", -0.01, 0.01, 0.00001)
        .name("bias")
        .onChange((value) => {
          pointLight.shadow.bias = value;
        })
    );

    syncBulb();
  }

  // ---- Обновляет атмосферу ----
  refreshAmbient() {
    if (!this.ambientFolder) return;

    if (!this.ambientControllers) this.ambientControllers = [];
    this.ambientControllers.forEach((controller) => controller.destroy());
    this.ambientControllers = [];

    const ambientLight = this.sceneClass.ambientLight;
    if (!ambientLight) return;

    const ambientParams = {
      ambientColor: "#" + ambientLight.color.getHexString(),
    };

    this.ambientControllers.push(
      this.ambientFolder
        .add(ambientLight, "intensity", 0, 5, 0.01)
        .name("Яркость")
        .listen(),
      this.ambientFolder
        .addColor(ambientParams, "ambientColor")
        .name("Цвет")
        .onChange((value) => {
          ambientLight.color.set(value);
        })
    );
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

  // ---- Обновляет контролы стены ----
  refresh() {
    if (!this.folder) return;

    this.controllers.forEach((controller) => controller.destroy());
    this.controllers = [];

    const activeWall = this.sceneClass.walls[this.sceneClass.activeWallIndex];
    if (!activeWall) return;

    const texture = activeWall.material.alphaMap;
    if (!texture) return;

    const ctrlX = this.folder
      .add(texture.offset, "x", 0, 1, 0.1)
      .name("Сдвиг по X")
      .listen();

    const ctrlY = this.folder
      .add(texture.offset, "y", 0, 1, 0.1)
      .name("Сдвиг по Y")
      .listen();

    this.controllers.push(ctrlX, ctrlY);
  }
}
