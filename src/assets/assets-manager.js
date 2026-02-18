import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class AssetsManager {
  constructor(gamecontext) {
    this.gamecontext = gamecontext;
    this.panels = []; 
    this.urls = [
      'models/panels/panel1.gltf', 
      'models/panels/panel2.gltf', 
      'models/panels/panel3.gltf', 
      'models/panels/panel4.gltf'
    ];
  }

  async loadModels() {
    const gltfLoader = new GLTFLoader();
    
    // Создаем геометрию подложки ОДИН раз
    // Размер 0.49 (чуть меньше 0.5, чтобы не мерцало по краям)
    const backGeometry = new THREE.PlaneGeometry(0.49, 0.49);

    const promises = this.urls.map((url, i) => {
        return gltfLoader.loadAsync(url).then(model => {
            const root = model.scene.children[0];
            root.name = 'panelTemplate_' + i;
            
            // 1. Сначала собираем все меши в список
            const meshesToProcess = [];
            
            root.traverse((child) => {
                if (child.isMesh) {
                    meshesToProcess.push(child);
                }
            });

            // 2. Теперь обрабатываем список (безопасно, рекурсии не будет)
            meshesToProcess.forEach((child) => {
                const oldMat = child.material;

                // Настраиваем материал
                const newMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    // map: undefined, // Если текстура не нужна
                    normalMap: oldMat.normalMap,
                    emissive: 0x000000,
                    metalness: 0.4,
                    roughness: 0.8,
                    side: THREE.FrontSide
                });

                //child.material = newMat;
                child.castShadow = true;    
                child.receiveShadow = true; 

                // --- ДОБАВЛЯЕМ ПОДЛОЖКУ ---
                const backMesh = new THREE.Mesh(backGeometry, newMat);
                
                // Сдвигаем назад. Если центр модели в 0, то -0.01 это сзади.
                // Подберите экспериментально, чтобы не "съедало" рейки, но закрывало дырки.
                //backMesh.position.z = 0.3; 
                backMesh.position.y = +0.0005; 
                
                // Разворачиваем на 180, если она смотрит не туда (обычно Plane смотрит в +Z)
                backMesh.rotation.x = -Math.PI/2; 

                // child.add(backMesh);   //////ПОДЛОЖКА, ПРОВЕРИТЬ НУЖНА ЛИ, НЕ ЗАБЫТЬ
                
            });

            return root;
        });
    });

    this.panels = await Promise.all(promises);
    console.log("Models loaded with Backing Plates:", this.panels);
  }
}