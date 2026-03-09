import * as THREE from "three";

export class GuiClass {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.sceneClass = gameContext.sceneClass;

    this.controllers = [];
    this.folder = null;

    this.init();
  }

  init() {
    // 1. Создаем папку в GUI
    if (this.gameContext.gui) {
      this.folder = this.gameContext.gui.addFolder("Настройки Стены");
    }

    // 2. Подписываемся на события сцены
    // Когда в сцене меняется стена, вызывается метод refresh этого класса
    this.sceneClass.onWallChanged = () => this.refresh();

    // 3. Рисуем GUI для текущей активной стены сразу при старте
    this.refresh();

    if (this.gameContext.gui) {
      this.lightFolder = this.gameContext.gui.addFolder("Свет");
      this.ambientFolder = this.gameContext.gui.addFolder("Атмосфера");
    }
    this.refreshLight();
    this.refreshAmbient();
  }

  refreshLight() {
    if (!this.lightFolder) return;

    if (!this.lightControllers) this.lightControllers = [];
    this.lightControllers.forEach((controller) => controller.destroy());
    this.lightControllers = [];

    const sceneClass = this.sceneClass;
    const pointLight = sceneClass.centerLight;
    const bulbMesh = sceneClass.lightBulbMesh;

    if (!pointLight || !bulbMesh) return;

    const lightParams = {
      lightColor: "#" + pointLight.color.getHexString(),
      bulbColor: "#" + bulbMesh.material.color.getHexString(),
      bulbVisible: bulbMesh.visible,
      castShadow: pointLight.castShadow,
      shadowMapSize: pointLight.shadow.mapSize.width,
      shadowBias: pointLight.shadow.bias,
      kelvin: 2800,
    };

    // Позиция
    const posFolder = this.lightFolder.addFolder("Позиция");
    const syncBulb = () => bulbMesh.position.copy(pointLight.position);

    const ctrlPosX = posFolder
      .add(pointLight.position, "x", -10, 10, 0.01)
      .name("X")
      .listen()
      .onChange(syncBulb);
    const ctrlPosY = posFolder
      .add(pointLight.position, "y", -10, 10, 0.01)
      .name("Y")
      .listen()
      .onChange(syncBulb);
    const ctrlPosZ = posFolder
      .add(pointLight.position, "z", -10, 10, 0.01)
      .name("Z")
      .listen()
      .onChange(syncBulb);

    this.lightControllers.push(ctrlPosX, ctrlPosY, ctrlPosZ);

    // Параметры света
    this.lightControllers.push(
      this.lightFolder
        .add(pointLight, "intensity", 0, 50, 0.1)
        .name("Яркость")
        .listen(),
      this.lightFolder
        .add(pointLight, "distance", 0, 50, 0.1)
        .name("Дальность")
        .listen(),
      this.lightFolder
        .add(pointLight, "decay", 0, 5, 0.01)
        .name("Затухание")
        .listen()
    );

    // Цвет света
    this.lightControllers.push(
      this.lightFolder
        .addColor(lightParams, "lightColor")
        .name("Цвет света")
        .onChange((value) => {
          pointLight.color.set(value);
        })
    );

    // Температура (Kelvin -> цвет)
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

    // Корпус лампы
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

    // Тени
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

    // синк позиции сразу
    syncBulb();
  }

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

  // очень простой Kelvin -> RGB (достаточно для GUI)
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

  refresh() {
    if (!this.folder) return;

    // --- Очистка старых контроллеров ---
    // Для lil-gui метод destroy() удаляет контроллер из DOM и из памяти
    this.controllers.forEach((controller) => controller.destroy());
    this.controllers = [];

    // --- Получение данных ---
    const activeWall = this.sceneClass.walls[this.sceneClass.activeWallIndex];
    if (!activeWall) return;

    const texture = activeWall.material.alphaMap;

    // --- Создание новых контроллеров ---
    const ctrlX = this.folder
      .add(texture.offset, "x", 0, 1, 0.1) // 0.01 для плавности
      .name("Сдвиг по X")
      .listen();

    const ctrlY = this.folder
      .add(texture.offset, "y", 0, 1, 0.1)
      .name("Сдвиг по Y")
      .listen();

    // Сохраняем ссылки
    this.controllers.push(ctrlX, ctrlY);
  }
}
