import * as THREE from "three";

export class PanelManager {
// ---- Готовит состояние панелей ----
  constructor(roomManager) {
    this.roomManager = roomManager;
    this.selectedPanel = null;
    this.animatingPanels = [];
    this.globalPanelColor = null;
  }
// ---- Анимирует панели ----
  updateAnimations(delta) {
    const rotationSpeed = 10;
    const moveSpeed = 10;

    for (let index = this.animatingPanels.length - 1; index >= 0; index--) {
      const panel = this.animatingPanels[index];
      const hasTargetQuaternion = !!panel.userData.targetQuaternion;
      const hasTargetPosition = !!panel.userData.targetPosition;

      if (hasTargetQuaternion) {
        panel.quaternion.slerp(panel.userData.targetQuaternion, delta * rotationSpeed);

        if (panel.quaternion.angleTo(panel.userData.targetQuaternion) < 0.01) {
          panel.quaternion.copy(panel.userData.targetQuaternion);
          delete panel.userData.targetQuaternion;
        }
      }

      if (hasTargetPosition) {
        panel.position.lerp(panel.userData.targetPosition, delta * moveSpeed);

        if (panel.position.distanceTo(panel.userData.targetPosition) < 0.001) {
          panel.position.copy(panel.userData.targetPosition);
          delete panel.userData.targetPosition;
        }
      }

      if (!panel.userData.targetQuaternion && !panel.userData.targetPosition) {
        this.animatingPanels.splice(index, 1);
      }
    }
  }
// ---- Случайно вращает панели ----
  randomRotate() {
    const panels = this.getAllPanels();
    if (panels.length === 0) return;

    for (let i = panels.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = panels[i];
      panels[i] = panels[randomIndex];
      panels[randomIndex] = temp;
    }

    panels.forEach((panel) => {
      const randomSteps = Math.ceil(Math.random() * 3);
      const randomAngle = randomSteps * (Math.PI / 2);
      const deltaQuaternion = new THREE.Quaternion();
      deltaQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), randomAngle);

      const baseQuaternion = panel.userData.targetQuaternion
        ? panel.userData.targetQuaternion.clone()
        : panel.quaternion.clone();

      panel.userData.targetQuaternion = baseQuaternion.multiply(deltaQuaternion);
      this.enqueueAnimation(panel);
    });
  }
// ---- Перемешивает панели по ячейкам ----
  shufflePanelsOnWalls() {
    this.roomManager.walls.forEach((wall) => {
      const panelsOnWall = wall.children.filter(
        (child) => child.userData && child.userData.isPanel
      );
      if (panelsOnWall.length < 2) return;

      const occupiedCells = panelsOnWall.map((panel) => ({
        gridX: panel.userData.gridX,
        gridY: panel.userData.gridY,
      }));

      for (let i = occupiedCells.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = occupiedCells[i];
        occupiedCells[i] = occupiedCells[randomIndex];
        occupiedCells[randomIndex] = temp;
      }

      const width = wall.geometry.parameters.width;
      const height = wall.geometry.parameters.height;
// ---- Переводит ячейку в позицию ----
      function cellToLocalPosition(gridX, gridY) {
        const centerGridU = gridX + 0.5;
        const centerGridV = gridY + 0.5;
        const newU = (centerGridU - texture.offset.x) / texture.repeat.x;
        const newV = (centerGridV - texture.offset.y) / texture.repeat.y;

        return new THREE.Vector3(
          (newU - 0.5) * width,
          (newV - 0.5) * height,
          0.005
        );
      }

      panelsOnWall.forEach((panel, index) => {
        const cell = occupiedCells[index];
        panel.userData.gridX = cell.gridX;
        panel.userData.gridY = cell.gridY;
        panel.userData.targetPosition = cellToLocalPosition(cell.gridX, cell.gridY);
        this.enqueueAnimation(panel);
      });
    });
  }
// ---- Обрабатывает выбор панели ----
  onPanelSelected(panelMesh) {
    if (this.selectedPanel === panelMesh) return;

    this.deselectPanel();
    this.selectedPanel = panelMesh;
    this.addSelectionOutline(panelMesh);

    let currentColor = "#ffffff";
    panelMesh.traverse((child) => {
      if (child.isMesh && child.material) {
        const material = Array.isArray(child.material)
          ? child.material[0]
          : child.material;
        currentColor = "#" + material.color.getHexString();
      }
    });

    const ui = document.querySelector(".selection-ui");
    if (ui) {
      ui.style.display = "flex";
      const colorInput = document.getElementById("panel-color-picker");
      if (colorInput) colorInput.value = currentColor;
    }
  }
// ---- Снимает выбор панели ----
  deselectPanel() {
    if (!this.selectedPanel) return;

    this.removeSelectionOutline();
    this.selectedPanel = null;

    const ui = document.querySelector(".selection-ui");
    if (ui) ui.style.display = "none";
  }
// ---- Меняет цвет панели ----
  changeSelectedPanelColor(colorValue) {
    if (!this.selectedPanel) return;

    this.selectedPanel.traverse((child) => {
      if (
        child.isMesh &&
        child.material &&
        child.name !== "selection_outline"
      ) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.color.set(colorValue));
        } else {
          child.material.color.set(colorValue);
        }
      }
    });
  }
// ---- Поворачивает панель ----
  rotateSelectedPanel(angle) {
    if (!this.selectedPanel) return;

    if (!this.selectedPanel.userData.targetQuaternion) {
      this.selectedPanel.userData.targetQuaternion =
        this.selectedPanel.quaternion.clone();
    }

    const deltaRotation = new THREE.Quaternion();
    deltaRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    this.selectedPanel.userData.targetQuaternion.multiply(deltaRotation);

    this.enqueueAnimation(this.selectedPanel);
  }
// ---- Красит все панели ----
  setAllPanelsColor(colorValue) {
    this.globalPanelColor = colorValue;

    this.roomManager.walls.forEach((wall) => {
      wall.traverse((child) => {
        if (child.userData && child.userData.isPanel) {
          child.traverse((meshChild) => {
            if (meshChild.isMesh && meshChild.material) {
              if (Array.isArray(meshChild.material)) {
                meshChild.material.forEach((material) => material.color.set(colorValue));
              } else {
                meshChild.material.color.set(colorValue);
              }
            }
          });
        }
      });
    });
  }
// ---- Убирает рамку панели ----
  removeSelectionOutline() {
    if (!this.selectedPanel) return;

    const outline = this.selectedPanel.getObjectByName("selection_outline");
    if (outline) {
      this.selectedPanel.remove(outline);
      if (outline.geometry) outline.geometry.dispose();
      if (outline.material) outline.material.dispose();
    }
  }
// ---- Добавляет рамку панели ----
  addSelectionOutline(panel) {
    const localBox = new THREE.Box3();
    const vertex = new THREE.Vector3();

    panel.updateMatrixWorld(true);
    const inversePanelMatrix = panel.matrixWorld.clone().invert();

    let hasMesh = false;
    panel.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const positionAttribute = child.geometry.attributes.position;
        if (!positionAttribute) return;

        for (let i = 0; i < positionAttribute.count; i++) {
          vertex.fromBufferAttribute(positionAttribute, i);
          vertex.applyMatrix4(child.matrixWorld);
          vertex.applyMatrix4(inversePanelMatrix);
          localBox.expandByPoint(vertex);
        }

        hasMesh = true;
      }
    });

    if (!hasMesh) {
      localBox.set(
        new THREE.Vector3(-0.25, -0.25, 0),
        new THREE.Vector3(0.25, 0.25, 0.05)
      );
    }

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    localBox.getSize(size);
    localBox.getCenter(center);
    size.multiplyScalar(1.02);

    const outlineGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const edges = new THREE.EdgesGeometry(outlineGeometry);
    const outlineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      depthTest: false,
      depthWrite: false,
    });

    const outlineMesh = new THREE.LineSegments(edges, outlineMaterial);
    outlineMesh.position.copy(center);
    outlineMesh.name = "selection_outline";
    outlineMesh.raycast = () => {};

    panel.add(outlineMesh);
  }
// ---- Ставит панель в очередь анимации ----
  enqueueAnimation(panel) {
    if (!this.animatingPanels.includes(panel)) {
      this.animatingPanels.push(panel);
    }
  }
// ---- Собирает все панели ----
  getAllPanels() {
    const panels = [];

    this.roomManager.walls.forEach((wall) => {
      wall.children.forEach((child) => {
        if (child.userData && child.userData.isPanel) {
          panels.push(child);
        }
      });
    });

    return panels;
  }
}
