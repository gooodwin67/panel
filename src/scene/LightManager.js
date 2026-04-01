import * as THREE from "three";

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

    const fillLightConfigs = [
      {
        color: 0xfff0dd,
        intensity: 10 * this.worldScaleSquared,
        distance: maxRoomSpan * 1.9,
        decay: 1.35,
        position: new THREE.Vector3(
          -widthWallFront * 0.26,
          heightWall * 0.18,
          widthWallSide * 0.18
        ),
      },
      {
        color: 0xfff0dd,
        intensity: 10 * this.worldScaleSquared,
        distance: maxRoomSpan * 1.9,
        decay: 1.35,
        position: new THREE.Vector3(
          widthWallFront * 0.26,
          heightWall * 0.18,
          widthWallSide * 0.18
        ),
      },
      {
        color: 0xf2f0ea,
        intensity: 7 * this.worldScaleSquared,
        distance: maxRoomSpan * 1.7,
        decay: 1.25,
        position: new THREE.Vector3(
          0,
          -heightWall * 0.08,
          -widthWallSide * 0.22
        ),
      },
    ];

    this.fillLights = fillLightConfigs.map((config) => {
      const light = new THREE.PointLight(
        config.color,
        config.intensity,
        config.distance,
        config.decay
      );
      light.position.copy(config.position);
      light.castShadow = false;
      this.attachFillFixture(light);
      this.gameContext.scene.add(light);
      return light;
    });

    this.syncRoomLightVisuals();
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
    const trim = new THREE.Mesh(
      new THREE.RingGeometry(
        0.07 * this.worldScale,
        0.16 * this.worldScale,
        32
      ),
      new THREE.MeshStandardMaterial({
        color: 0xf3eee6,
        roughness: 0.68,
        metalness: 0.02,
        side: THREE.FrontSide,
      })
    );
    trim.rotation.x = Math.PI / 2;
    trim.position.set(0, -0.0015 * this.worldScale, 0);

    const core = new THREE.Mesh(
      new THREE.CircleGeometry(0.07 * this.worldScale, 24),
      new THREE.MeshStandardMaterial({
        color: 0xd8d0c3,
        roughness: 0.95,
        metalness: 0.0,
        side: THREE.FrontSide,
      })
    );
    core.rotation.x = Math.PI / 2;
    core.position.set(0, -0.0014 * this.worldScale, 0);

    const diffuser = new THREE.Mesh(
      new THREE.CircleGeometry(0.038 * this.worldScale, 24),
      new THREE.MeshBasicMaterial({
        color: light.color.clone(),
        transparent: true,
        opacity: 0.82,
        side: THREE.FrontSide,
        toneMapped: false,
      })
    );
    diffuser.rotation.x = Math.PI / 2;
    diffuser.position.set(0, -0.0013 * this.worldScale, 0);

    fixtureRoot.add(trim);
    fixtureRoot.add(core);
    fixtureRoot.add(diffuser);
    light.add(fixtureRoot);
    light.userData.fixtureMaterials = {
      glow: diffuser.material,
      emissive: [],
    };
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
      !ceilingSpotTarget ||
      !fillLights.length
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
    const bulbGeometry = new THREE.BoxGeometry(
      0.1 * this.worldScale,
      0.1 * this.worldScale,
      0.1 * this.worldScale
    );
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xffaa77,
      emissiveIntensity: 2.0,
      roughness: 0.8,
      metalness: 0.8,
    });

    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    const x = (Math.random() - 0.5) * this.config.widthWallFront;
    const y = (Math.random() - 0.5) * this.config.heightWall;
    const z = (Math.random() - 0.5) * this.config.widthWallSide;
    bulbMesh.position.set(x, y, z);

    const pointLight = new THREE.PointLight(
      0xffaa66,
      this.defaultSideLightIntensity,
      this.defaultSideLightDistance,
      1.7
    );
    pointLight.position.copy(bulbMesh.position);
    pointLight.castShadow = false;

    bulbMesh.userData.isLightBulb = true;
    bulbMesh.userData.light = pointLight;

    this.gameContext.scene.add(bulbMesh);
    this.gameContext.scene.add(pointLight);

    this.lightBulbs.push({
      mesh: bulbMesh,
      light: pointLight,
    });
  }
  // ---- Выбирает лампочку ----
  selectLightBulb(bulbMesh) {
    this.selectedLightBulb = bulbMesh;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "flex";

    this.refreshLightBulbUI();
  }
  // ---- Снимает выбор лампочки ----
  deselectLightBulb() {
    this.selectedLightBulb = null;

    const lightUI = document.querySelector(".light-selection-ui");
    if (lightUI) lightUI.style.display = "none";
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
    if (
      emissiveInput &&
      bulbMesh.material &&
      bulbMesh.material.emissiveIntensity !== undefined
    ) {
      emissiveInput.value = String(bulbMesh.material.emissiveIntensity);
    }
  }
  // ---- Ищет попадание по лампочке ----
  findLightBulbHit(event) {
    const bulbMeshes = this.lightBulbs.map((entry) => entry.mesh);
    if (bulbMeshes.length === 0) return null;

    this.updatePointer(event);
    this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);

    const intersects = this.raycaster.intersectObjects(bulbMeshes, false);
    if (intersects.length === 0) return null;

    return intersects[0].object;
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
