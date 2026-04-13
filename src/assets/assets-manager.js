import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class AssetsManager {
  // ---- Настраивает пути к ассетам ----
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.loader = new GLTFLoader();
    this.worldScale = gameContext.sceneConfig?.worldScale || 1;
    this.basePanelCellSize = 0.5;
    this.basePanelGap = -0.002;
    this.panelTargetSize =
      this.basePanelCellSize * this.worldScale - this.basePanelGap;
    this.panels = [];
    this.furniture = {
      table: null,
      tableLamp: null,
      tv: null,
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
          if (child.geometry && !child.geometry.attributes.normal) {
            child.geometry.computeVertexNormals();
          }
          child.scale.set(1, 2, 1);
          meshesToProcess.push(child);
        });

        root.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(root);
        const size = bounds.getSize(new THREE.Vector3());
        const faceDimensions = [size.x, size.y, size.z]
          .filter((value) => value > 0)
          .sort((a, b) => b - a);
        const sourceFaceSize = faceDimensions[1] || faceDimensions[0] || 1;
        const panelScale = this.panelTargetSize / sourceFaceSize;
        root.scale.multiplyScalar(panelScale);

        meshesToProcess.forEach((child) => {
          const oldMaterial = child.material;
          const sourceMaterials = Array.isArray(oldMaterial)
            ? oldMaterial
            : [oldMaterial];

          child.material = sourceMaterials.map((sourceMaterial) => {
            const newMaterial = new THREE.MeshPhysicalMaterial({
              color: 0x91b195,
              map: sourceMaterial?.map || null,
              normalMap: sourceMaterial?.normalMap || null,
              roughnessMap: sourceMaterial?.roughnessMap || null,
              metalnessMap: sourceMaterial?.metalnessMap || null,
              aoMap: sourceMaterial?.aoMap || null,
              displacementMap: sourceMaterial?.displacementMap || null,
              alphaMap: sourceMaterial?.alphaMap || null,
              transparent: sourceMaterial?.transparent || false,
              opacity: sourceMaterial?.opacity ?? 1,
              // emissive: 0x000000,
              // metalness: 0.02,
              roughness: 0.94,
              // clearcoat: 0.02,
              // clearcoatRoughness: 0.9,
              // sheen: 0.08,
              // sheenRoughness: 0.95,
              side: THREE.FrontSide,
            });

            if (newMaterial.map) {
              newMaterial.map.colorSpace = THREE.SRGBColorSpace;
              newMaterial.map.anisotropy =
                this.gameContext.renderer.capabilities.getMaxAnisotropy();
            }

            [
              newMaterial.normalMap,
              newMaterial.roughnessMap,
              newMaterial.metalnessMap,
              newMaterial.aoMap,
              newMaterial.displacementMap,
              newMaterial.alphaMap,
            ].forEach((texture) => {
              if (!texture) return;
              texture.anisotropy =
                this.gameContext.renderer.capabilities.getMaxAnisotropy();
            });

            return newMaterial;
          });

          if (!Array.isArray(oldMaterial)) {
            child.material = child.material[0];
          }

          child.castShadow = false;
          child.receiveShadow = true;

          const backMaterial = Array.isArray(child.material)
            ? child.material[0].clone()
            : child.material.clone();
          const backMesh = new THREE.Mesh(backGeometry, backMaterial);
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
    const [tableModel, lampModel, tvModel] = await Promise.all([
      this.loader.loadAsync("models/mebel/table.gltf"),
      this.loader.loadAsync("models/mebel/lampgltf.gltf"),
      this.loader.loadAsync("models/mebel/tv.gltf"),
    ]);

    tableModel.scene.scale.multiplyScalar(this.worldScale);
    lampModel.scene.scale.multiplyScalar(this.worldScale);
    tvModel.scene.scale.multiplyScalar(this.worldScale);

    this.furniture.table = tableModel.scene;
    this.furniture.tableLamp = lampModel.scene;
    this.furniture.tv = tvModel.scene;
  }
}
