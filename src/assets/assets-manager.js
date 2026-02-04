import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class AssetsManager {
  constructor(gamecontext) {
    this.gamecontext = gamecontext;
    // this.scene = gamecontext.scene; // Ссылка на сцену здесь больше не нужна

    this.panels = []; // Здесь будут храниться шаблоны моделей
    this.urls = [
      'models/panels/panel1.gltf', 
      'models/panels/panel2.gltf', 
      'models/panels/panel3.gltf', 
      'models/panels/panel4.gltf'
    ];
  }

  /* =========================================
    LOAD MODELS
  ========================================= */
  async loadModels() {
    const gltfLoader = new GLTFLoader();
    
    // Используем Promise.all для параллельной загрузки, чтобы сохранить порядок (0, 1, 2, 3)
    const promises = this.urls.map((url, i) => {
        return gltfLoader.loadAsync(url).then(model => {
            const mesh = model.scene.children[0];
            mesh.name = 'panelTemplate_' + i;
            
            // Если модели нужны предварительные повороты/масштаб, делаем это здесь
            // Например: mesh.rotation.x = Math.PI / 2; 
            // Но лучше вращать уже при установке на стену, чтобы не путаться в осях.
            
            return mesh;
        });
    });

    this.panels = await Promise.all(promises);
    console.log("Models loaded:", this.panels);
  }
}