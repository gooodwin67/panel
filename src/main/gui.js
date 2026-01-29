import * as THREE from 'three';

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
      this.folder = this.gameContext.gui.addFolder('Настройки Стены');
    }

    // 2. Подписываемся на события сцены
    // Когда в сцене меняется стена, вызывается метод refresh этого класса
    this.sceneClass.onWallChanged = () => this.refresh();

    // 3. Рисуем GUI для текущей активной стены сразу при старте
    this.refresh();
  }

  refresh() {
    if (!this.folder) return;

    // --- Очистка старых контроллеров ---
    // Для lil-gui метод destroy() удаляет контроллер из DOM и из памяти
    this.controllers.forEach(controller => controller.destroy());
    this.controllers = [];

    // --- Получение данных ---
    const activeWall = this.sceneClass.walls[this.sceneClass.activeWallIndex];
    if (!activeWall) return;

    const texture = activeWall.material.map;

    // --- Создание новых контроллеров ---
    const ctrlX = this.folder
      .add(texture.offset, 'x', 0, 1, 0.1) // 0.01 для плавности
      .name('Сдвиг по X')
      .listen();

    const ctrlY = this.folder
      .add(texture.offset, 'y', 0, 1, 0.1)
      .name('Сдвиг по Y')
      .listen();
      
    // Сохраняем ссылки
    this.controllers.push(ctrlX, ctrlY);
  }
}