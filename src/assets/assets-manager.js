import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class AssetsManager {
  // ---- Настраивает пути к ассетам ----
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.loader = new GLTFLoader();
    this.panels = [];
    this.furniture = {
      table: null,
      tableLamp: null,
    };
    this.panelUrls = [
      "models/panels/panel1.gltf",
      "models/panels/panel2.gltf",
      "models/panels/panel3.gltf",
      "models/panels/panel4.gltf",
    ];
  }

  // ---- Загружает все модели ----
  async loadModels() {
    await Promise.all([this.loadPanels(), this.loadFurniture()]);
  }

  // ---- Загружает модели панелей ----
  async loadPanels() {
    const backGeometry = new THREE.PlaneGeometry(0.49, 0.49);

    const promises = this.panelUrls.map((url, index) => {
      return this.loader.loadAsync(url).then((model) => {
        const root = model.scene.children[0];
        root.name = `panelTemplate_${index}`;

        const meshesToProcess = [];
        root.traverse((child) => {
          if (!child.isMesh) return;
          child.scale.set(1, 2, 1);
          meshesToProcess.push(child);
        });

        meshesToProcess.forEach((child) => {
          const oldMaterial = child.material;
          const material = Array.isArray(oldMaterial)
            ? oldMaterial[0]
            : oldMaterial;

          const newMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            normalMap: material?.normalMap || null,
            emissive: 0x000000,
            metalness: 0.4,
            roughness: 0.8,
            side: THREE.FrontSide,
          });

          child.castShadow = true;
          child.receiveShadow = true;

          const backMesh = new THREE.Mesh(backGeometry, newMaterial);
          backMesh.position.y = 0.0005;
          backMesh.rotation.x = -Math.PI / 2;

          // child.add(backMesh);
        });

        return root;
      });
    });

    this.panels = await Promise.all(promises);
  }

  // ---- Загружает мебель ----
  async loadFurniture() {
    const [tableModel, lampModel] = await Promise.all([
      this.loader.loadAsync("models/mebel/table.gltf"),
      this.loader.loadAsync("models/mebel/lampgltf.gltf"),
    ]);

    this.furniture.table = tableModel.scene;
    this.furniture.tableLamp = lampModel.scene;
  }
}
