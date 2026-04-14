import * as THREE from "three";

import { hideFloatingUi, showFloatingUi } from "../main/floatingUi.js";

export class LightManager {
  // ---- Готовит состояние света ----
  constructor(gameContext, config) {
    this.gameContext = gameContext;
    this.config = config;
    this.worldScale = config.worldScale || 1;
    this.worldScaleSquared = this.worldScale * this.worldScale;
    this.defaultSideLightIntensity = 18 * this.worldScaleSquared;
    this.defaultSideLightDistance = 6 * this.worldScale;

    this.ambientLight = new THREE.AmbientLight(0xfff4e8, 0.12);
    this.hemisphereLight = null;
    this.ceilingSpotLight = null;
    this.ceilingSpotTarget = null;
    this.fillLights = [];

    this.lightBulbs = [];
    this.selectedLightBulb = null;
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;
    this.areLightBulbMeshesVisible = true;
    this.lightDragPlane = new THREE.Plane();
    this.lightDragIntersectionPoint = new THREE.Vector3();
    this.lightDragOffset = new THREE.Vector3();
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  }

  // ---- Создает свет сцены ----
  createScene() {
    this.createRoomLights();
    this.addAmbientLight();
    this.tuneRendererExposure();
  }
  // ---- Создает новое комнатное освещение ----
  createRoomLights() {
    const { widthWallFront, widthWallSide, heightWall } = this.config;
    const maxRoomSpan = Math.max(widthWallFront, widthWallSide);
    const ceilingY = heightWall / 2 - 0.06 * this.worldScale;

    this.hemisphereLight = new THREE.HemisphereLight(
      0xf5f3ee,
      0xc2a88d,
      0.62
    );
    this.hemisphereLight.position.set(0, heightWall / 2, 0);
    this.gameContext.scene.add(this.hemisphereLight);

    this.ceilingSpotLight = new THREE.SpotLight(
      0xfff2dc,
      34 * this.worldScaleSquared,
      maxRoomSpan * 3.2,
      Math.PI / 2.2,
      0.92,
      1.35
    );
    this.ceilingSpotLight.position.set(0, ceilingY, 0.18 * this.worldScale);
    this.ceilingSpotLight.castShadow = true;
    this.ceilingSpotLight.shadow.mapSize.set(2048, 2048);
    this.ceilingSpotLight.shadow.bias = -0.00008;
    this.ceilingSpotLight.shadow.normalBias = 0.04;
    this.ceilingSpotLight.shadow.radius = 10;
    this.ceilingSpotTarget = new THREE.Object3D();
    this.ceilingSpotTarget.position.set(0, -heightWall * 0.32, 0);
    this.ceilingSpotLight.target = this.ceilingSpotTarget;
    this.attachCeilingFixture(this.ceilingSpotLight);
    this.gameContext.scene.add(this.ceilingSpotTarget);
    this.gameContext.scene.add(this.ceilingSpotLight);

    this.syncRoomLightVisuals();
  }
  // ---- Удаляет служебные источники комнатного света ----
  clearFillLights() {
    this.fillLights.forEach((light) => {
      this.gameContext.scene.remove(light);
    });
    this.fillLights = [];
  }
  // ---- Добавляет атмосферный свет ----
  addAmbientLight() {
    this.gameContext.scene.add(this.ambientLight);
  }
  // ---- Подгоняет экспозицию под мягкий интерьерный свет ----
  tuneRendererExposure() {
    if (!this.gameContext.renderer) return;
    this.gameContext.renderer.toneMappingExposure = 0.72;
  }
  // ---- Добавляет корпус потолочного светильника ----
  attachCeilingFixture(light) {
    const fixtureRoot = new THREE.Group();
    fixtureRoot.position.y = -0.022 * this.worldScale;

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d0c3,
      roughness: 0.72,
      metalness: 0.02,
    });
    const diffuserMaterial = new THREE.MeshBasicMaterial({
      color: light.color.clone(),
      transparent: true,
      opacity: 0.78,
      toneMapped: false,
    });

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.13 * this.worldScale,
        0.105 * this.worldScale,
        0.045 * this.worldScale,
        40
      ),
      bodyMaterial
    );

    const diffuser = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.124 * this.worldScale,
        0.124 * this.worldScale,
        0.026 * this.worldScale,
        40,
      ),
      diffuserMaterial
    );
    diffuser.rotation.x = Math.PI;
    diffuser.position.y = -0.024 * this.worldScale;

    fixtureRoot.add(body);
    fixtureRoot.add(diffuser);
    light.add(fixtureRoot);
    light.userData.fixtureMaterials = {
      glow: diffuser.material,
      emissive: [],
    };
  }
  // ---- Создает единый вид лампочки ----
  createLightBulbMesh(colorValue = 0xffaa66) {
    const bulbGroup = new THREE.Group();
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: colorValue,
      emissive: colorValue,
      emissiveIntensity: 2.0,
      roughness: 0.22,
      metalness: 0,
    });
    const outerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0,
      transparent: true,
      opacity: 0.34,
      transmission: 0.45,
      thickness: 0.02 * this.worldScale,
      side: THREE.DoubleSide,
    });
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: colorValue,
      transparent: true,
      opacity: 0.28,
      toneMapped: false,
      depthWrite: false,
    });

    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.036 * this.worldScale,
        32,
        16
      ),
      innerMaterial
    );

    const outer = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.064 * this.worldScale,
        32,
        16
      ),
      outerMaterial
    );

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.082 * this.worldScale, 24, 12),
      glowMaterial
    );
    glow.raycast = () => { };

    bulbGroup.add(inner);
    bulbGroup.add(outer);
    bulbGroup.add(glow);
    bulbGroup.userData.lightVisualMaterials = {
      emissive: [innerMaterial],
      color: [innerMaterial],
      glow: glowMaterial,
    };

    return bulbGroup;
  }
  // ---- Создает лампочку и источник света ----
  addLightBulb({
    color = 0xffaa66,
    intensity = this.defaultSideLightIntensity,
    distance = this.defaultSideLightDistance,
    decay = 1.7,
    position = null,
    isRoomLight = false,
  } = {}) {
    const bulbMesh = this.createLightBulbMesh(color);
    const nextPosition =
      position ||
      new THREE.Vector3(
        (Math.random() - 0.5) * this.config.widthWallFront,
        (Math.random() - 0.5) * this.config.heightWall,
        (Math.random() - 0.5) * this.config.widthWallSide
      );
    bulbMesh.position.copy(nextPosition);

    const pointLight = new THREE.PointLight(
      color,
      intensity,
      distance,
      decay
    );
    pointLight.position.copy(bulbMesh.position);
    pointLight.castShadow = false;

    bulbMesh.userData.isLightBulb = true;
    bulbMesh.userData.isRoomLight = isRoomLight;
    bulbMesh.userData.light = pointLight;
    bulbMesh.visible = this.areLightBulbMeshesVisible;
    pointLight.userData.bulbMesh = bulbMesh;

    this.gameContext.scene.add(bulbMesh);
    this.gameContext.scene.add(pointLight);

    const entry = {
      mesh: bulbMesh,
      light: pointLight,
    };
    this.lightBulbs.push(entry);

    if (isRoomLight) {
      this.fillLights.push(pointLight);
    }

    return entry;
  }
  // ---- Добавляет корпус локального источника света ----
  attachFillFixture(light) {
    const fixtureRoot = new THREE.Group();
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f21,
      roughness: 0.78,
      metalness: 0.18,
      side: THREE.FrontSide,
    });
    const barMaterial = new THREE.MeshStandardMaterial({
      color: 0x232326,
      roughness: 0.72,
      metalness: 0.2,
      side: THREE.FrontSide,
    });
    const diffuserMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1ece3,
      roughness: 0.38,
      metalness: 0.02,
      emissive: light.color.clone(),
      emissiveIntensity: 0.32,
      side: THREE.FrontSide,
    });
    const backPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(
        0.09 * this.worldScale,
        0.18 * this.worldScale
      ),
      plateMaterial
    );
    backPlate.position.set(0, 0, 0.001 * this.worldScale);

    const centerBar = new THREE.Mesh(
      new THREE.PlaneGeometry(
        0.018 * this.worldScale,
        0.24 * this.worldScale
      ),
      barMaterial
    );
    centerBar.position.set(0, 0, 0.012 * this.worldScale);

    const diffuser = new THREE.Mesh(
      new THREE.CircleGeometry(0.048 * this.worldScale, 24),
      diffuserMaterial
    );
    diffuser.position.set(0, 0, 0.02 * this.worldScale);

    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(0.07 * this.worldScale, 24),
      new THREE.MeshBasicMaterial({
        color: light.color.clone(),
        transparent: true,
        opacity: 0.34,
        side: THREE.FrontSide,
        toneMapped: false,
      })
    );
    glow.position.set(0, 0, 0.019 * this.worldScale);

    fixtureRoot.add(backPlate);
    fixtureRoot.add(centerBar);
    fixtureRoot.add(diffuser);
    fixtureRoot.add(glow);
    light.add(fixtureRoot);
    light.userData.fixtureMaterials = {
      root: fixtureRoot,
      glow: glow.material,
      emissive: [diffuser.material],
    };
    this.syncFillFixturePlacement(light);
  }
  // ---- Прижимает локальный светильник к ближайшей стене ----
  syncFillFixturePlacement(light) {
    const fixture = light?.userData?.fixtureMaterials;
    const fixtureRoot = fixture?.root;
    if (!fixtureRoot) return;

    const halfFront = this.config.widthWallFront / 2;
    const halfSide = this.config.widthWallSide / 2;
    const worldPosition = light.position;

    const wallCandidates = [
      {
        distance: Math.abs(worldPosition.x + halfFront),
        localPosition: new THREE.Vector3(
          -halfFront - worldPosition.x + 0.02 * this.worldScale,
          0,
          0
        ),
        rotationY: Math.PI / 2,
      },
      {
        distance: Math.abs(halfFront - worldPosition.x),
        localPosition: new THREE.Vector3(
          halfFront - worldPosition.x - 0.02 * this.worldScale,
          0,
          0
        ),
        rotationY: -Math.PI / 2,
      },
      {
        distance: Math.abs(worldPosition.z + halfSide),
        localPosition: new THREE.Vector3(
          0,
          0,
          -halfSide - worldPosition.z + 0.02 * this.worldScale
        ),
        rotationY: 0,
      },
      {
        distance: Math.abs(halfSide - worldPosition.z),
        localPosition: new THREE.Vector3(
          0,
          0,
          halfSide - worldPosition.z - 0.02 * this.worldScale
        ),
        rotationY: Math.PI,
      },
    ];

    const nearestWall = wallCandidates.reduce((closest, candidate) =>
      candidate.distance < closest.distance ? candidate : closest
    );

    fixtureRoot.position.copy(nearestWall.localPosition);
    fixtureRoot.rotation.set(0, nearestWall.rotationY, 0);
  }
  // ---- Синхронизирует вид корпусов со светом ----
  syncLightFixture(light) {
    this.syncLightBulbMesh(light);

    const fixture = light?.userData?.fixtureMaterials;
    if (!fixture) return;

    const emissiveIntensity = THREE.MathUtils.clamp(
      0.18 + light.intensity / (18 * this.worldScaleSquared),
      0.18,
      1.6
    );
    fixture.emissive.forEach((material) => {
      material.emissive.copy(light.color);
      material.emissiveIntensity = emissiveIntensity;
    });

    if (fixture.glow) {
      fixture.glow.color.copy(light.color);
      fixture.glow.opacity = THREE.MathUtils.clamp(
        0.22 + light.intensity / (28 * this.worldScaleSquared),
        0.22,
        0.95
      );
    }
  }
  // ---- Синхронизирует единый корпус лампочки со светом ----
  syncLightBulbMesh(light) {
    const bulbMesh = light?.userData?.bulbMesh;
    const visualMaterials = bulbMesh?.userData?.lightVisualMaterials;
    if (visualMaterials) {
      const emissiveIntensity = bulbMesh.userData.emissiveIntensity ?? THREE.MathUtils.clamp(
        0.4 + light.intensity / (18 * this.worldScaleSquared),
        0.4,
        6
      );
      visualMaterials.emissive.forEach((material) => {
        if (material.color) {
          material.color.copy(light.color);
        }
        material.emissive.copy(light.color);
        material.emissiveIntensity = emissiveIntensity;
        material.needsUpdate = true;
      });

      if (visualMaterials.glow) {
        visualMaterials.glow.color.copy(light.color);
        visualMaterials.glow.opacity = THREE.MathUtils.clamp(
          0.14 + light.intensity / (40 * this.worldScaleSquared),
          0.14,
          0.62
        );
        visualMaterials.glow.needsUpdate = true;
      }
      return;
    }

    const material = bulbMesh?.material;
    if (!material) return;
    if (material.emissive) {
      material.emissive.copy(light.color);
    }
    material.emissiveIntensity = THREE.MathUtils.clamp(
      0.4 + light.intensity / (18 * this.worldScaleSquared),
      0.4,
      6
    );
    material.needsUpdate = true;
  }
  // ---- Возвращает яркость визуального свечения лампочки ----
  getLightBulbEmissiveIntensity(bulbMesh) {
    const visualMaterials = bulbMesh?.userData?.lightVisualMaterials;
    if (bulbMesh?.userData?.emissiveIntensity !== undefined) {
      return bulbMesh.userData.emissiveIntensity;
    }

    if (visualMaterials?.emissive?.[0]) {
      return visualMaterials.emissive[0].emissiveIntensity;
    }

    return bulbMesh?.material?.emissiveIntensity ?? 2;
  }
  // ---- Меняет яркость визуального свечения лампочки ----
  setLightBulbEmissiveIntensity(bulbMesh, value) {
    bulbMesh.userData.emissiveIntensity = value;

    const visualMaterials = bulbMesh?.userData?.lightVisualMaterials;
    if (visualMaterials) {
      visualMaterials.emissive.forEach((material) => {
        material.emissiveIntensity = value;
        material.needsUpdate = true;
      });

      if (visualMaterials.glow) {
        visualMaterials.glow.opacity = THREE.MathUtils.clamp(value / 8, 0.08, 0.8);
        visualMaterials.glow.needsUpdate = true;
      }
      return;
    }

    if (bulbMesh?.material?.emissiveIntensity !== undefined) {
      bulbMesh.material.emissiveIntensity = value;
      bulbMesh.material.needsUpdate = true;
    }
  }
  // ---- Освобождает геометрию и материалы лампочки ----
  disposeLightBulbMesh(bulbMesh) {
    bulbMesh.traverse((child) => {
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
  }
  // ---- Синхронизирует все корпуса нового света ----
  syncRoomLightVisuals() {
    if (this.ceilingSpotLight) {
      this.syncLightFixture(this.ceilingSpotLight);
    }
    this.fillLights.forEach((light) => {
      this.syncFillFixturePlacement(light);
      this.syncLightFixture(light);
    });
  }
  // ---- Применяет один из пресетов освещения комнаты ----
  applyLightingPreset(presetName) {
    const renderer = this.gameContext.renderer;
    const { ambientLight, hemisphereLight, ceilingSpotLight, ceilingSpotTarget, fillLights } =
      this.getRoomLights();

    if (
      !renderer ||
      !ambientLight ||
      !hemisphereLight ||
      !ceilingSpotLight ||
      !ceilingSpotTarget
    ) {
      return;
    }

    const presets = {
      day: {
        exposure: 0.72,
        ambient: { color: 0xfff4e8, intensity: 0.12 },
        hemisphere: {
          skyColor: 0xf5f3ee,
          groundColor: 0xc2a88d,
          intensity: 0.62,
          y: this.config.heightWall / 2,
        },
        ceiling: {
          color: 0xfff2dc,
          intensity: 34 * this.worldScaleSquared,
          distance:
            Math.max(this.config.widthWallFront, this.config.widthWallSide) * 3.2,
          decay: 1.35,
          angle: Math.PI / 2.2,
          penumbra: 0.92,
          position: [
            0,
            this.config.heightWall / 2 - 0.06 * this.worldScale,
            0.18 * this.worldScale,
          ],
          target: [0, -this.config.heightWall * 0.32, 0],
          castShadow: true,
          shadowBias: -0.00008,
          shadowNormalBias: 0.04,
          shadowMapSize: 2048,
        },
        fillLights: [
          {
            color: 0xfff0dd,
            intensity: 10 * this.worldScaleSquared,
            distance:
              Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.9,
            decay: 1.35,
            position: [
              -this.config.widthWallFront * 0.26,
              this.config.heightWall * 0.18,
              this.config.widthWallSide * 0.18,
            ],
          },
          {
            color: 0xfff0dd,
            intensity: 10 * this.worldScaleSquared,
            distance:
              Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.9,
            decay: 1.35,
            position: [
              this.config.widthWallFront * 0.26,
              this.config.heightWall * 0.18,
              this.config.widthWallSide * 0.18,
            ],
          },
          {
            color: 0xf2f0ea,
            intensity: 7 * this.worldScaleSquared,
            distance:
              Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.7,
            decay: 1.25,
            position: [
              0,
              -this.config.heightWall * 0.08,
              -this.config.widthWallSide * 0.22,
            ],
          },
        ],
      },
      evening: {
        exposure: 0.68,
        ambient: { color: 0xf3d5b3, intensity: 0.09 },
        hemisphere: {
          skyColor: 0xe8bf96,
          groundColor: 0x7f604c,
          intensity: 0.3,
          y: this.config.heightWall * 0.46,
        },
        ceiling: {
          color: 0xffc98f,
          intensity: 24 * this.worldScaleSquared,
          distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 2.55,
          decay: 1.55,
          angle: Math.PI / 2.45,
          penumbra: 0.96,
          position: [0, this.config.heightWall / 2 - 0.1 * this.worldScale, 0.16 * this.worldScale],
          target: [0, -this.config.heightWall * 0.3, 0.08 * this.worldScale],
          castShadow: true,
          shadowBias: -0.0001,
          shadowNormalBias: 0.05,
          shadowMapSize: 2048,
        },
        fillLights: [
          { color: 0xffb66e, intensity: 9 * this.worldScaleSquared, distance: 7.8, decay: 1.45, position: [-1.3, 0.28, 0.9] },
          { color: 0xffb66e, intensity: 9 * this.worldScaleSquared, distance: 7.8, decay: 1.45, position: [1.3, 0.28, 0.9] },
          { color: 0xcda98d, intensity: 3.2 * this.worldScaleSquared, distance: 6.5, decay: 1.25, position: [0, -0.34, -1.02] },
        ],
      },
      night: {
        exposure: 0.42,
        ambient: { color: 0x8e99b6, intensity: 0.045 },
        hemisphere: {
          skyColor: 0x596988,
          groundColor: 0x24242c,
          intensity: 0.2,
          y: this.config.heightWall * 0.45,
        },
        ceiling: {
          color: 0xb8c8ff,
          intensity: 9 * this.worldScaleSquared,
          distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 2.35,
          decay: 1.9,
          angle: Math.PI / 3.2,
          penumbra: 0.82,
          position: [0, this.config.heightWall / 2 - 0.12 * this.worldScale, 0.18 * this.worldScale],
          target: [0, -this.config.heightWall * 0.34, 0.06 * this.worldScale],
          castShadow: true,
          shadowBias: -0.0001,
          shadowNormalBias: 0.065,
          shadowMapSize: 2048,
        },
        fillLights: [
          { color: 0xd7d6c2, intensity: 2.4 * this.worldScaleSquared, distance: 5.5, decay: 1.8, position: [-1.55, 0.08, 0.55] },
          { color: 0xcbbf9c, intensity: 2.4 * this.worldScaleSquared, distance: 5.5, decay: 1.8, position: [1.55, 0.08, 0.55] },
          { color: 0x3a4368, intensity: 2.3 * this.worldScaleSquared, distance: 4.8, decay: 1.55, position: [0, -0.42, -1.1] },
        ],
      },
    };

    const preset = presets[presetName];
    if (!preset) return;

    renderer.toneMappingExposure = preset.exposure;
    ambientLight.color.setHex(preset.ambient.color);
    ambientLight.intensity = preset.ambient.intensity;

    hemisphereLight.color.setHex(preset.hemisphere.skyColor);
    hemisphereLight.groundColor.setHex(preset.hemisphere.groundColor);
    hemisphereLight.intensity = preset.hemisphere.intensity;
    hemisphereLight.position.y = preset.hemisphere.y;

    ceilingSpotLight.color.setHex(preset.ceiling.color);
    ceilingSpotLight.intensity = preset.ceiling.intensity;
    ceilingSpotLight.distance = preset.ceiling.distance;
    ceilingSpotLight.decay = preset.ceiling.decay;
    ceilingSpotLight.angle = preset.ceiling.angle;
    ceilingSpotLight.penumbra = preset.ceiling.penumbra;
    ceilingSpotLight.position.set(...preset.ceiling.position);
    ceilingSpotTarget.position.set(...preset.ceiling.target);
    ceilingSpotLight.castShadow = preset.ceiling.castShadow;
    ceilingSpotLight.shadow.bias = preset.ceiling.shadowBias;
    ceilingSpotLight.shadow.normalBias = preset.ceiling.shadowNormalBias;
    ceilingSpotLight.shadow.mapSize.set(
      preset.ceiling.shadowMapSize,
      preset.ceiling.shadowMapSize
    );
    ceilingSpotLight.shadow.needsUpdate = true;

    fillLights.forEach((light, index) => {
      const fillPreset = preset.fillLights[index];
      if (!fillPreset) return;

      light.color.setHex(fillPreset.color);
      light.intensity = fillPreset.intensity;
      light.distance = fillPreset.distance;
      light.decay = fillPreset.decay;
      light.position.set(...fillPreset.position);
      if (light.userData?.bulbMesh) {
        light.userData.bulbMesh.position.copy(light.position);
      }
    });

    this.syncRoomLightVisuals();
  }
  // ---- Возвращает основные источники нового света ----
  getRoomLights() {
    return {
      ambientLight: this.ambientLight,
      hemisphereLight: this.hemisphereLight,
      ceilingSpotLight: this.ceilingSpotLight,
      ceilingSpotTarget: this.ceilingSpotTarget,
      fillLights: this.fillLights,
    };
  }
  // ---- Создает боковую лампочку ----
  addSideLightBulb() {
    return this.addLightBulb({
      color: 0xffaa66,
      intensity: this.defaultSideLightIntensity,
      distance: this.defaultSideLightDistance,
      decay: 1.7,
    });
  }
  // ---- Показывает или скрывает плафоны всех лампочек ----
  setAllLightBulbMeshesVisible(isVisible) {
    this.areLightBulbMeshesVisible = Boolean(isVisible);
    this.lightBulbs.forEach(({ mesh }) => {
      mesh.visible = this.areLightBulbMeshesVisible;
    });
    if (!this.areLightBulbMeshesVisible) {
      this.deselectLightBulb();
      this.stopDragLightBulb();
    }
    this.refreshLightBulbUI();
    return this.areLightBulbMeshesVisible;
  }
  // ---- Переключает видимость плафонов всех лампочек ----
  toggleAllLightBulbMeshesVisible() {
    return this.setAllLightBulbMeshesVisible(
      !this.areLightBulbMeshesVisible
    );
  }
  // ---- Выбирает лампочку ----
  selectLightBulb(bulbMesh) {
    this.selectedLightBulb = bulbMesh;

    showFloatingUi(".light-selection-ui");

    this.refreshLightBulbUI();
  }
  // ---- Снимает выбор лампочки ----
  deselectLightBulb() {
    this.selectedLightBulb = null;

    hideFloatingUi(".light-selection-ui");
  }
  // ---- Синхронизирует UI лампочки ----
  refreshLightBulbUI() {
    const bulbMesh = this.selectedLightBulb;
    if (!bulbMesh) return;

    const pointLight = bulbMesh.userData.light;
    if (!pointLight) return;
    const intensityRangeMax = Math.max(
      50,
      this.defaultSideLightIntensity * 4,
      pointLight.intensity * 1.5
    );
    const distanceRangeMax = Math.max(
      20,
      this.defaultSideLightDistance * 3,
      pointLight.distance * 1.5
    );

    const colorInput = document.getElementById("light-color-picker");
    if (colorInput) colorInput.value = "#" + pointLight.color.getHexString();

    const intensityInput = document.getElementById("light-intensity");
    if (intensityInput) {
      intensityInput.max = String(intensityRangeMax);
      intensityInput.value = String(pointLight.intensity);
    }

    const distanceInput = document.getElementById("light-distance");
    if (distanceInput) {
      distanceInput.max = String(distanceRangeMax);
      distanceInput.value = String(pointLight.distance);
    }

    const decayInput = document.getElementById("light-decay");
    if (decayInput) decayInput.value = String(pointLight.decay);

    const bulbVisibleInput = document.getElementById("bulb-visible");
    if (bulbVisibleInput) bulbVisibleInput.checked = bulbMesh.visible;

    const emissiveInput = document.getElementById("bulb-emissive");
    if (emissiveInput) {
      emissiveInput.value = String(this.getLightBulbEmissiveIntensity(bulbMesh));
    }
  }
  // ---- Ищет попадание по лампочке ----
  findLightBulbHit(event) {
    const bulbMeshes = this.lightBulbs
      .map((entry) => entry.mesh)
      .filter((mesh) => mesh.visible);
    if (bulbMeshes.length === 0) return null;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(bulbMeshes, true);
    if (intersects.length === 0) return null;

    let target = intersects[0].object;
    while (target.parent && !target.userData.isLightBulb) {
      target = target.parent;
    }

    return target.userData.isLightBulb ? target : null;
  }
  // ---- Стартует перенос лампочки ----
  startDragLightBulb(bulbMesh, event) {
    this.isDraggingLightBulb = true;
    this.draggedLightBulbMesh = bulbMesh;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = false;
    }

    const cameraDirection = new THREE.Vector3();
    this.gameContext.camera.getWorldDirection(cameraDirection);

    this.lightDragPlane.setFromNormalAndCoplanarPoint(
      cameraDirection,
      bulbMesh.position
    );

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    ) {
      this.lightDragOffset
        .copy(this.lightDragIntersectionPoint)
        .sub(bulbMesh.position);
    } else {
      this.lightDragOffset.set(0, 0, 0);
    }
  }
  // ---- Обновляет перенос лампочки ----
  onPointerMoveLightBulb(event) {
    if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh) return;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    if (
      !this.raycaster.ray.intersectPlane(
        this.lightDragPlane,
        this.lightDragIntersectionPoint
      )
    ) {
      return;
    }

    const newPosition = this.lightDragIntersectionPoint
      .clone()
      .sub(this.lightDragOffset);

    this.draggedLightBulbMesh.position.copy(newPosition);

    const pointLight = this.draggedLightBulbMesh.userData.light;
    if (pointLight) {
      pointLight.position.copy(newPosition);
    }
  }
  // ---- Останавливает перенос лампочки ----
  stopDragLightBulb() {
    this.isDraggingLightBulb = false;
    this.draggedLightBulbMesh = null;

    if (this.gameContext.controls) {
      this.gameContext.controls.enabled = true;
    }
  }
  // ---- Считает координаты указателя ----
  updatePointer(event) {
    const canvas = this.gameContext.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
}
