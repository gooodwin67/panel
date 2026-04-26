import { S as Ce, P as Le, W as Pe, a as T, b as Be, A as Ee, O as De, c as We, R as $, V, d as f, e as Z, f as Te, H as Fe, g as Ae, h as ze, G as R, M as W, i as re, j as L, C as ue, k as ye, D as Q, l as oe, m as ke, F, n as j, o as ge, p as S, Q as he, B as q, q as Ne, E as Re, L as Oe, r as He, T as we, s as I, t as Ue, u as Xe, v as xe, w as Ye, x as qe, y as Ve, z as je } from "./three-DbH9v004.js";
let Dt;
let __tla = (async () => {
  Dt = function() {
    import.meta.url, import("_").then(async (m) => {
      await m.__tla;
      return m;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
    new MutationObserver((s) => {
      for (const a of s) if (a.type === "childList") for (const n of a.addedNodes) n.tagName === "LINK" && n.rel === "modulepreload" && i(n);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(s) {
      const a = {};
      return s.integrity && (a.integrity = s.integrity), s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? a.credentials = "include" : s.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin", a;
    }
    function i(s) {
      if (s.ep) return;
      s.ep = true;
      const a = t(s);
      fetch(s.href, a);
    }
  })();
  class _e {
    constructor(e) {
      var _a;
      this.gameContext = e;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.onWindowResize = this.onWindowResize.bind(this), this.scene = new Ce(), this.camera = new Le(40, window.innerWidth / window.innerHeight, 0.1 * t, 40 * t), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10 * t, this.renderer = new Pe({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = T, this.renderer.shadowMap.enabled = true, this.renderer.shadowMap.type = Be, this.renderer.toneMapping = Ee, this.renderer.toneMappingExposure = 0.58, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new De(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new We(), document.body.appendChild(this.stats.dom), this.stats.dom.style.cssText = "position: fixed; top: 100vh; top: 100dvh; right: auto; bottom: auto; left: 0; transform: translateY(-45px); z-index: 1000000;", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const i = window.innerWidth, s = window.innerHeight, a = Math.min(i, 1920), n = Math.min(s, 1080);
      this.renderer.setSize(a, n, false);
      const l = this.renderer.domElement;
      l.style.position = "fixed", l.style.left = "50%", l.style.top = "50%", l.style.transform = "translate(-50%, -50%)", l.style.width = a + "px", l.style.height = n + "px", this.camera.aspect = a / n, this.camera.updateProjectionMatrix();
    }
  }
  class Ge {
    constructor(e, t, i) {
      this.gameContext = e, this.walls = t, this.worldScale = i.worldScale || 1, this.cellSize = i.cellSize || 0.5, this.panelDepth = i.panelDepth || 0.05, this.raycaster = new $(), this.pointer = new V(), this.mouseDownPointer = new V(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
    }
    handlePointerDown(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) for (const i of t) {
        let s = i.object;
        for (; s.parent && !this.walls.includes(s); ) s = s.parent;
        if (this.walls.includes(s) && !this.isWallFacingCamera(s)) continue;
        let a = i.object;
        for (; a.parent && !a.userData.isPanel && a !== this.gameContext.scene; ) a = a.parent;
        if (a.userData.isPanel) return this.pendingPanel = a, this.mouseDownPointer.set(e.clientX, e.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    isWallFacingCamera(e) {
      const t = this.gameContext.camera, i = new f();
      e.getWorldPosition(i);
      const s = new f().subVectors(t.position, i), a = new f(0, 0, 1).applyQuaternion(e.quaternion);
      return s.dot(a) > 0;
    }
    startDrag(e, t) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const s = this.gameContext.assetManager.panels[e];
      s && (this.ghostMesh = s.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.savedColor !== null ? this.applyColor(this.ghostMesh, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(this.ghostMesh, this.gameContext.sceneClass.globalPanelColor), this.ghostMesh.traverse((a) => {
        a.raycast = () => {
        };
      }), this.gameContext.scene.add(this.ghostMesh), this.ghostMesh.visible = true, t && (this.updatePointer(t), this.onPointerMove(t)));
    }
    onPointerMove(e) {
      if (this.pendingPanel && !this.isDragging && Math.sqrt(Math.pow(e.clientX - this.mouseDownPointer.x, 2) + Math.pow(e.clientY - this.mouseDownPointer.y, 2)) > 15 && this.pickupPendingPanel(e), !this.isDragging || !this.ghostMesh) return;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, false);
      if (t.length > 0) {
        const i = t[0], s = i.object;
        if (this.currentWall !== s) {
          this.currentWall = s;
          const a = this.getWallClippingPlanes(s);
          this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: a
          });
        }
        this.snapToGrid(i, s);
        return;
      }
      this.moveInAir();
    }
    pickupPendingPanel(e) {
      const t = this.pendingPanel, i = t.userData.panelIndex;
      this.savedColor = null, t.traverse((s) => {
        if (this.savedColor === null && s.isMesh && s.material) {
          const a = Array.isArray(s.material) ? s.material[0] : s.material;
          this.savedColor = a.color.getHex();
        }
      }), this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(i, e), this.pendingPanel = null;
    }
    snapToGrid(e, t) {
      const i = t.geometry.parameters.width, s = t.geometry.parameters.height, a = t.userData.gridTexture, n = t.worldToLocal(e.point.clone());
      let l = n.x / i + 0.5, o = n.y / s + 0.5;
      l = l * a.repeat.x + a.offset.x, o = o * a.repeat.y + a.offset.y;
      const r = Math.floor(l), c = Math.floor(o);
      if (t.children.some((M) => M.userData.isPanel && M.userData.gridX === r && M.userData.gridY === c)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = r, this.ghostMesh.userData.gridY = c;
      const d = (r + 0.5 - a.offset.x) / a.repeat.x, p = (c + 0.5 - a.offset.y) / a.repeat.y, y = (d - 0.5) * i, x = (p - 0.5) * s;
      n.x = y, n.y = x, n.z = 0;
      const C = t.localToWorld(n);
      this.ghostMesh.position.copy(C), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10 * this.worldScale, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
    }
    onPointerUp() {
      if (this.gameContext.controls && (this.gameContext.controls.enabled = true), this.pendingPanel) {
        this.gameContext.sceneClass.onPanelSelected(this.pendingPanel), this.pendingPanel = null, this.savedColor = null;
        return;
      }
      this.isDragging && (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace && this.placePanel(), this.cleanupGhost());
    }
    cancelDrag() {
      this.gameContext.controls && (this.gameContext.controls.enabled = true), this.cleanupGhost();
    }
    placePanel() {
      const t = this.gameContext.assetManager.panels[this.draggedPanelIndex];
      if (!t) return;
      const i = t.clone();
      i.userData.isPanel = true, i.userData.panelIndex = this.draggedPanelIndex, i.userData.gridX = this.ghostMesh.userData.gridX, i.userData.gridY = this.ghostMesh.userData.gridY;
      const s = this.getWallClippingPlanes(this.currentWall);
      this.applyMaterialProperties(i, {
        transparent: false,
        opacity: 1,
        clippingPlanes: s,
        cloneMaterial: true
      }), this.savedColor !== null ? this.applyColor(i, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(i, this.gameContext.sceneClass.globalPanelColor);
      const a = this.ghostMesh.position.clone(), n = new f(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
      a.add(n.multiplyScalar(this.panelDepth * 0.25)), this.currentWall.add(i), this.currentWall.worldToLocal(a), i.position.copy(a), i.rotation.set(0, 0, 0), i.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(i);
    }
    applyColor(e, t) {
      e.traverse((i) => {
        if (!i.isMesh || !i.material) return;
        (Array.isArray(i.material) ? i.material : [
          i.material
        ]).forEach((a) => {
          a.color && (typeof t == "string" ? a.color.set(t) : a.color.setHex(t), a.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(e, { transparent: t, opacity: i, clippingPlanes: s, cloneMaterial: a }) {
      e.traverse((n) => {
        if (!n.isMesh) return;
        a && (Array.isArray(n.material) ? n.material = n.material.map((o) => o.clone()) : n.material = n.material.clone()), (Array.isArray(n.material) ? n.material : [
          n.material
        ]).forEach((o) => {
          t !== void 0 && (o.transparent = t), i !== void 0 && (o.opacity = i), s !== void 0 && (o.clippingPlanes = s), o.needsUpdate = true;
        });
      });
    }
    cleanupGhost() {
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
    }
    disposeModel(e) {
      e.traverse((t) => {
        t.isMesh && (t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((i) => i.dispose()) : t.material.dispose()));
      });
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
    getWallClippingPlanes(e) {
      const t = e.geometry.parameters.width, i = e.geometry.parameters.height, s = new f(1, 0, 0).applyQuaternion(e.quaternion), a = new f(0, 1, 0).applyQuaternion(e.quaternion), n = e.position;
      return [
        new Z().setFromNormalAndCoplanarPoint(s.clone().negate(), n.clone().add(s.clone().multiplyScalar(t / 2))),
        new Z().setFromNormalAndCoplanarPoint(s.clone(), n.clone().add(s.clone().multiplyScalar(-t / 2))),
        new Z().setFromNormalAndCoplanarPoint(a.clone().negate(), n.clone().add(a.clone().multiplyScalar(i / 2))),
        new Z().setFromNormalAndCoplanarPoint(a.clone(), n.clone().add(a.clone().multiplyScalar(-i / 2)))
      ];
    }
  }
  const Ke = ".floating-ui";
  function Ze() {
    document.querySelectorAll(Ke).forEach((u) => {
      u.style.display = "none";
    });
  }
  function O(u) {
    Ze();
    const e = document.querySelector(u);
    return e && (e.style.display = "flex"), e;
  }
  function z(u) {
    const e = document.querySelector(u);
    e && (e.style.display = "none");
  }
  class Qe {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.worldScaleSquared = this.worldScale * this.worldScale, this.defaultSideLightIntensity = 18 * this.worldScaleSquared, this.defaultSideLightDistance = 6 * this.worldScale, this.ambientLight = new Te(16774376, 0.12), this.hemisphereLight = null, this.ceilingSpotLight = null, this.ceilingSpotTarget = null, this.fillLights = [], this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.areLightBulbMeshesVisible = true, this.lightDragPlane = new Z(), this.lightDragIntersectionPoint = new f(), this.lightDragOffset = new f(), this.pointer = new V(), this.raycaster = new $();
    }
    createScene() {
      this.createRoomLights(), this.addAmbientLight(), this.tuneRendererExposure();
    }
    createRoomLights() {
      const { widthWallFront: e, widthWallSide: t, heightWall: i } = this.config, s = Math.max(e, t), a = i / 2 - 0.06 * this.worldScale;
      this.hemisphereLight = new Fe(16118766, 12757133, 0.62), this.hemisphereLight.position.set(0, i / 2, 0), this.gameContext.scene.add(this.hemisphereLight), this.ceilingSpotLight = new Ae(16773852, 34 * this.worldScaleSquared, s * 3.2, Math.PI / 2.2, 0.92, 1.35), this.ceilingSpotLight.position.set(0, a, 0.18 * this.worldScale), this.ceilingSpotLight.castShadow = true, this.ceilingSpotLight.shadow.mapSize.set(2048, 2048), this.ceilingSpotLight.shadow.bias = -8e-5, this.ceilingSpotLight.shadow.normalBias = 0.04, this.ceilingSpotLight.shadow.radius = 10, this.ceilingSpotTarget = new ze(), this.ceilingSpotTarget.position.set(0, -i * 0.32, 0), this.ceilingSpotLight.target = this.ceilingSpotTarget, this.attachCeilingFixture(this.ceilingSpotLight), this.gameContext.scene.add(this.ceilingSpotTarget), this.gameContext.scene.add(this.ceilingSpotLight), this.syncRoomLightVisuals();
    }
    clearFillLights() {
      this.fillLights.forEach((e) => {
        this.gameContext.scene.remove(e);
      }), this.fillLights = [];
    }
    addAmbientLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    tuneRendererExposure() {
      this.gameContext.renderer && (this.gameContext.renderer.toneMappingExposure = 0.72);
    }
    attachCeilingFixture(e) {
      const t = new R();
      t.position.y = -0.022 * this.worldScale;
      const i = new W({
        color: 14209219,
        roughness: 0.72,
        metalness: 0.02
      }), s = new re({
        color: e.color.clone(),
        transparent: true,
        opacity: 0.78,
        toneMapped: false
      }), a = new L(new ue(0.13 * this.worldScale, 0.105 * this.worldScale, 0.045 * this.worldScale, 40), i), n = new L(new ue(0.124 * this.worldScale, 0.124 * this.worldScale, 0.026 * this.worldScale, 40), s);
      n.rotation.x = Math.PI, n.position.y = -0.024 * this.worldScale, t.add(a), t.add(n), e.add(t), e.userData.fixtureMaterials = {
        glow: n.material,
        emissive: []
      };
    }
    createLightBulbMesh(e = 16755302) {
      const t = new R(), i = new W({
        color: e,
        emissive: e,
        emissiveIntensity: 2,
        roughness: 0.22,
        metalness: 0
      }), s = new ye({
        color: 16777215,
        roughness: 0.12,
        metalness: 0,
        transparent: true,
        opacity: 0.34,
        transmission: 0.45,
        thickness: 0.02 * this.worldScale,
        side: Q
      }), a = new re({
        color: e,
        transparent: true,
        opacity: 0.28,
        toneMapped: false,
        depthWrite: false
      }), n = new L(new oe(0.036 * this.worldScale, 32, 16), i), l = new L(new oe(0.064 * this.worldScale, 32, 16), s), o = new L(new oe(0.082 * this.worldScale, 24, 12), a);
      return o.raycast = () => {
      }, t.add(n), t.add(l), t.add(o), t.userData.lightVisualMaterials = {
        emissive: [
          i
        ],
        color: [
          i
        ],
        glow: a
      }, t;
    }
    addLightBulb({ color: e = 16755302, intensity: t = this.defaultSideLightIntensity, distance: i = this.defaultSideLightDistance, decay: s = 1.7, position: a = null, isRoomLight: n = false } = {}) {
      const l = this.createLightBulbMesh(e), o = a || new f((Math.random() - 0.5) * this.config.widthWallFront, (Math.random() - 0.5) * this.config.heightWall, (Math.random() - 0.5) * this.config.widthWallSide);
      l.position.copy(o);
      const r = new ke(e, t, i, s);
      r.position.copy(l.position), r.castShadow = false, l.userData.isLightBulb = true, l.userData.isRoomLight = n, l.userData.light = r, l.visible = this.areLightBulbMeshesVisible, r.userData.bulbMesh = l, this.gameContext.scene.add(l), this.gameContext.scene.add(r);
      const c = {
        mesh: l,
        light: r
      };
      return this.lightBulbs.push(c), n && this.fillLights.push(r), c;
    }
    attachFillFixture(e) {
      const t = new R(), i = new W({
        color: 2039585,
        roughness: 0.78,
        metalness: 0.18,
        side: F
      }), s = new W({
        color: 2302758,
        roughness: 0.72,
        metalness: 0.2,
        side: F
      }), a = new W({
        color: 15854819,
        roughness: 0.38,
        metalness: 0.02,
        emissive: e.color.clone(),
        emissiveIntensity: 0.32,
        side: F
      }), n = new L(new j(0.09 * this.worldScale, 0.18 * this.worldScale), i);
      n.position.set(0, 0, 1e-3 * this.worldScale);
      const l = new L(new j(0.018 * this.worldScale, 0.24 * this.worldScale), s);
      l.position.set(0, 0, 0.012 * this.worldScale);
      const o = new L(new ge(0.048 * this.worldScale, 24), a);
      o.position.set(0, 0, 0.02 * this.worldScale);
      const r = new L(new ge(0.07 * this.worldScale, 24), new re({
        color: e.color.clone(),
        transparent: true,
        opacity: 0.34,
        side: F,
        toneMapped: false
      }));
      r.position.set(0, 0, 0.019 * this.worldScale), t.add(n), t.add(l), t.add(o), t.add(r), e.add(t), e.userData.fixtureMaterials = {
        root: t,
        glow: r.material,
        emissive: [
          o.material
        ]
      }, this.syncFillFixturePlacement(e);
    }
    syncFillFixturePlacement(e) {
      var _a, _b;
      const i = (_b = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.fixtureMaterials) == null ? void 0 : _b.root;
      if (!i) return;
      const s = this.config.widthWallFront / 2, a = this.config.widthWallSide / 2, n = e.position, o = [
        {
          distance: Math.abs(n.x + s),
          localPosition: new f(-s - n.x + 0.02 * this.worldScale, 0, 0),
          rotationY: Math.PI / 2
        },
        {
          distance: Math.abs(s - n.x),
          localPosition: new f(s - n.x - 0.02 * this.worldScale, 0, 0),
          rotationY: -Math.PI / 2
        },
        {
          distance: Math.abs(n.z + a),
          localPosition: new f(0, 0, -a - n.z + 0.02 * this.worldScale),
          rotationY: 0
        },
        {
          distance: Math.abs(a - n.z),
          localPosition: new f(0, 0, a - n.z - 0.02 * this.worldScale),
          rotationY: Math.PI
        }
      ].reduce((r, c) => c.distance < r.distance ? c : r);
      i.position.copy(o.localPosition), i.rotation.set(0, o.rotationY, 0);
    }
    syncLightFixture(e) {
      var _a;
      this.syncLightBulbMesh(e);
      const t = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.fixtureMaterials;
      if (!t) return;
      const i = S.clamp(0.18 + e.intensity / (18 * this.worldScaleSquared), 0.18, 1.6);
      t.emissive.forEach((s) => {
        s.emissive.copy(e.color), s.emissiveIntensity = i;
      }), t.glow && (t.glow.color.copy(e.color), t.glow.opacity = S.clamp(0.22 + e.intensity / (28 * this.worldScaleSquared), 0.22, 0.95));
    }
    syncLightBulbMesh(e) {
      var _a, _b, _c;
      const t = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.bulbMesh, i = (_b = t == null ? void 0 : t.userData) == null ? void 0 : _b.lightVisualMaterials;
      if (i) {
        const a = (_c = t.userData.emissiveIntensity) != null ? _c : S.clamp(0.4 + e.intensity / (18 * this.worldScaleSquared), 0.4, 6);
        i.emissive.forEach((n) => {
          n.color && n.color.copy(e.color), n.emissive.copy(e.color), n.emissiveIntensity = a, n.needsUpdate = true;
        }), i.glow && (i.glow.color.copy(e.color), i.glow.opacity = S.clamp(0.14 + e.intensity / (40 * this.worldScaleSquared), 0.14, 0.62), i.glow.needsUpdate = true);
        return;
      }
      const s = t == null ? void 0 : t.material;
      s && (s.emissive && s.emissive.copy(e.color), s.emissiveIntensity = S.clamp(0.4 + e.intensity / (18 * this.worldScaleSquared), 0.4, 6), s.needsUpdate = true);
    }
    getLightBulbEmissiveIntensity(e) {
      var _a, _b, _c, _d, _e2;
      const t = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.lightVisualMaterials;
      return ((_b = e == null ? void 0 : e.userData) == null ? void 0 : _b.emissiveIntensity) !== void 0 ? e.userData.emissiveIntensity : ((_c = t == null ? void 0 : t.emissive) == null ? void 0 : _c[0]) ? t.emissive[0].emissiveIntensity : (_e2 = (_d = e == null ? void 0 : e.material) == null ? void 0 : _d.emissiveIntensity) != null ? _e2 : 2;
    }
    setLightBulbEmissiveIntensity(e, t) {
      var _a, _b;
      e.userData.emissiveIntensity = t;
      const i = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.lightVisualMaterials;
      if (i) {
        i.emissive.forEach((s) => {
          s.emissiveIntensity = t, s.needsUpdate = true;
        }), i.glow && (i.glow.opacity = S.clamp(t / 8, 0.08, 0.8), i.glow.needsUpdate = true);
        return;
      }
      ((_b = e == null ? void 0 : e.material) == null ? void 0 : _b.emissiveIntensity) !== void 0 && (e.material.emissiveIntensity = t, e.material.needsUpdate = true);
    }
    disposeLightBulbMesh(e) {
      e.traverse((t) => {
        var _a, _b, _c, _d;
        (_b = (_a = t.geometry) == null ? void 0 : _a.dispose) == null ? void 0 : _b.call(_a), Array.isArray(t.material) ? t.material.forEach((i) => {
          var _a2;
          return (_a2 = i.dispose) == null ? void 0 : _a2.call(i);
        }) : (_d = (_c = t.material) == null ? void 0 : _c.dispose) == null ? void 0 : _d.call(_c);
      });
    }
    syncRoomLightVisuals() {
      this.ceilingSpotLight && this.syncLightFixture(this.ceilingSpotLight), this.fillLights.forEach((e) => {
        this.syncFillFixturePlacement(e), this.syncLightFixture(e);
      });
    }
    applyLightingPreset(e) {
      const t = this.gameContext.renderer, { ambientLight: i, hemisphereLight: s, ceilingSpotLight: a, ceilingSpotTarget: n, fillLights: l } = this.getRoomLights();
      if (!t || !i || !s || !a || !n) return;
      const r = {
        day: {
          exposure: 0.72,
          ambient: {
            color: 16774376,
            intensity: 0.12
          },
          hemisphere: {
            skyColor: 16118766,
            groundColor: 12757133,
            intensity: 0.62,
            y: this.config.heightWall / 2
          },
          ceiling: {
            color: 16773852,
            intensity: 34 * this.worldScaleSquared,
            distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 3.2,
            decay: 1.35,
            angle: Math.PI / 2.2,
            penumbra: 0.92,
            position: [
              0,
              this.config.heightWall / 2 - 0.06 * this.worldScale,
              0.18 * this.worldScale
            ],
            target: [
              0,
              -this.config.heightWall * 0.32,
              0
            ],
            castShadow: true,
            shadowBias: -8e-5,
            shadowNormalBias: 0.04,
            shadowMapSize: 2048
          },
          fillLights: [
            {
              color: 16773341,
              intensity: 10 * this.worldScaleSquared,
              distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.9,
              decay: 1.35,
              position: [
                -this.config.widthWallFront * 0.26,
                this.config.heightWall * 0.18,
                this.config.widthWallSide * 0.18
              ]
            },
            {
              color: 16773341,
              intensity: 10 * this.worldScaleSquared,
              distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.9,
              decay: 1.35,
              position: [
                this.config.widthWallFront * 0.26,
                this.config.heightWall * 0.18,
                this.config.widthWallSide * 0.18
              ]
            },
            {
              color: 15921386,
              intensity: 7 * this.worldScaleSquared,
              distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 1.7,
              decay: 1.25,
              position: [
                0,
                -this.config.heightWall * 0.08,
                -this.config.widthWallSide * 0.22
              ]
            }
          ]
        },
        evening: {
          exposure: 0.68,
          ambient: {
            color: 15979955,
            intensity: 0.09
          },
          hemisphere: {
            skyColor: 15253398,
            groundColor: 8347724,
            intensity: 0.3,
            y: this.config.heightWall * 0.46
          },
          ceiling: {
            color: 16763279,
            intensity: 24 * this.worldScaleSquared,
            distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 2.55,
            decay: 1.55,
            angle: Math.PI / 2.45,
            penumbra: 0.96,
            position: [
              0,
              this.config.heightWall / 2 - 0.1 * this.worldScale,
              0.16 * this.worldScale
            ],
            target: [
              0,
              -this.config.heightWall * 0.3,
              0.08 * this.worldScale
            ],
            castShadow: true,
            shadowBias: -1e-4,
            shadowNormalBias: 0.05,
            shadowMapSize: 2048
          },
          fillLights: [
            {
              color: 16758382,
              intensity: 9 * this.worldScaleSquared,
              distance: 7.8,
              decay: 1.45,
              position: [
                -1.3,
                0.28,
                0.9
              ]
            },
            {
              color: 16758382,
              intensity: 9 * this.worldScaleSquared,
              distance: 7.8,
              decay: 1.45,
              position: [
                1.3,
                0.28,
                0.9
              ]
            },
            {
              color: 13478285,
              intensity: 3.2 * this.worldScaleSquared,
              distance: 6.5,
              decay: 1.25,
              position: [
                0,
                -0.34,
                -1.02
              ]
            }
          ]
        },
        night: {
          exposure: 0.42,
          ambient: {
            color: 9345462,
            intensity: 0.045
          },
          hemisphere: {
            skyColor: 5859720,
            groundColor: 2368556,
            intensity: 0.2,
            y: this.config.heightWall * 0.45
          },
          ceiling: {
            color: 12110079,
            intensity: 9 * this.worldScaleSquared,
            distance: Math.max(this.config.widthWallFront, this.config.widthWallSide) * 2.35,
            decay: 1.9,
            angle: Math.PI / 3.2,
            penumbra: 0.82,
            position: [
              0,
              this.config.heightWall / 2 - 0.12 * this.worldScale,
              0.18 * this.worldScale
            ],
            target: [
              0,
              -this.config.heightWall * 0.34,
              0.06 * this.worldScale
            ],
            castShadow: true,
            shadowBias: -1e-4,
            shadowNormalBias: 0.065,
            shadowMapSize: 2048
          },
          fillLights: [
            {
              color: 14145218,
              intensity: 2.4 * this.worldScaleSquared,
              distance: 5.5,
              decay: 1.8,
              position: [
                -1.55,
                0.08,
                0.55
              ]
            },
            {
              color: 13352860,
              intensity: 2.4 * this.worldScaleSquared,
              distance: 5.5,
              decay: 1.8,
              position: [
                1.55,
                0.08,
                0.55
              ]
            },
            {
              color: 3818344,
              intensity: 2.3 * this.worldScaleSquared,
              distance: 4.8,
              decay: 1.55,
              position: [
                0,
                -0.42,
                -1.1
              ]
            }
          ]
        }
      }[e];
      r && (t.toneMappingExposure = r.exposure, i.color.setHex(r.ambient.color), i.intensity = r.ambient.intensity, s.color.setHex(r.hemisphere.skyColor), s.groundColor.setHex(r.hemisphere.groundColor), s.intensity = r.hemisphere.intensity, s.position.y = r.hemisphere.y, a.color.setHex(r.ceiling.color), a.intensity = r.ceiling.intensity, a.distance = r.ceiling.distance, a.decay = r.ceiling.decay, a.angle = r.ceiling.angle, a.penumbra = r.ceiling.penumbra, a.position.set(...r.ceiling.position), n.position.set(...r.ceiling.target), a.castShadow = r.ceiling.castShadow, a.shadow.bias = r.ceiling.shadowBias, a.shadow.normalBias = r.ceiling.shadowNormalBias, a.shadow.mapSize.set(r.ceiling.shadowMapSize, r.ceiling.shadowMapSize), a.shadow.needsUpdate = true, l.forEach((c, g) => {
        var _a;
        const d = r.fillLights[g];
        d && (c.color.setHex(d.color), c.intensity = d.intensity, c.distance = d.distance, c.decay = d.decay, c.position.set(...d.position), ((_a = c.userData) == null ? void 0 : _a.bulbMesh) && c.userData.bulbMesh.position.copy(c.position));
      }), this.syncRoomLightVisuals());
    }
    getRoomLights() {
      return {
        ambientLight: this.ambientLight,
        hemisphereLight: this.hemisphereLight,
        ceilingSpotLight: this.ceilingSpotLight,
        ceilingSpotTarget: this.ceilingSpotTarget,
        fillLights: this.fillLights
      };
    }
    addSideLightBulb() {
      return this.addLightBulb({
        color: 16755302,
        intensity: this.defaultSideLightIntensity,
        distance: this.defaultSideLightDistance,
        decay: 1.7
      });
    }
    setAllLightBulbMeshesVisible(e) {
      return this.areLightBulbMeshesVisible = !!e, this.lightBulbs.forEach(({ mesh: t }) => {
        t.visible = this.areLightBulbMeshesVisible;
      }), this.areLightBulbMeshesVisible || (this.deselectLightBulb(), this.stopDragLightBulb()), this.refreshLightBulbUI(), this.areLightBulbMeshesVisible;
    }
    toggleAllLightBulbMeshesVisible() {
      return this.setAllLightBulbMeshesVisible(!this.areLightBulbMeshesVisible);
    }
    selectLightBulb(e) {
      this.selectedLightBulb = e, O(".light-selection-ui"), this.refreshLightBulbUI();
    }
    deselectLightBulb() {
      this.selectedLightBulb = null, z(".light-selection-ui");
    }
    refreshLightBulbUI() {
      const e = this.selectedLightBulb;
      if (!e) return;
      const t = e.userData.light;
      if (!t) return;
      const i = Math.max(50, this.defaultSideLightIntensity * 4, t.intensity * 1.5), s = Math.max(20, this.defaultSideLightDistance * 3, t.distance * 1.5), a = document.getElementById("light-color-picker");
      a && (a.value = "#" + t.color.getHexString());
      const n = document.getElementById("light-intensity");
      n && (n.max = String(i), n.value = String(t.intensity));
      const l = document.getElementById("light-distance");
      l && (l.max = String(s), l.value = String(t.distance));
      const o = document.getElementById("light-decay");
      o && (o.value = String(t.decay));
      const r = document.getElementById("bulb-visible");
      r && (r.checked = e.visible);
      const c = document.getElementById("bulb-emissive");
      c && (c.value = String(this.getLightBulbEmissiveIntensity(e)));
    }
    findLightBulbHit(e) {
      const t = this.lightBulbs.map((a) => a.mesh).filter((a) => a.visible);
      if (t.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(t, true);
      if (i.length === 0) return null;
      let s = i[0].object;
      for (; s.parent && !s.userData.isLightBulb; ) s = s.parent;
      return s.userData.isLightBulb ? s : null;
    }
    startDragLightBulb(e, t) {
      this.isDraggingLightBulb = true, this.draggedLightBulbMesh = e, this.gameContext.controls && (this.gameContext.controls.enabled = false);
      const i = new f();
      this.gameContext.camera.getWorldDirection(i), this.lightDragPlane.setFromNormalAndCoplanarPoint(i, e.position), this.updatePointer(t), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint) ? this.lightDragOffset.copy(this.lightDragIntersectionPoint).sub(e.position) : this.lightDragOffset.set(0, 0, 0);
    }
    onPointerMoveLightBulb(e) {
      if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh || (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), !this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint))) return;
      const t = this.lightDragIntersectionPoint.clone().sub(this.lightDragOffset);
      this.draggedLightBulbMesh.position.copy(t);
      const i = this.draggedLightBulbMesh.userData.light;
      i && i.position.copy(t);
    }
    stopDragLightBulb() {
      this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.gameContext.controls && (this.gameContext.controls.enabled = true);
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
  }
  const se = new f(), me = new f();
  class $e {
    constructor(e) {
      this.roomManager = e, this.selectedPanel = null, this.animatingPanels = [], this.globalPanelColor = null;
    }
    updateAnimations(e) {
      this.updatePanelVisibility();
      const t = 10, i = 10;
      for (let s = this.animatingPanels.length - 1; s >= 0; s--) {
        const a = this.animatingPanels[s], n = !!a.userData.targetQuaternion, l = !!a.userData.targetPosition;
        n && (a.quaternion.slerp(a.userData.targetQuaternion, e * t), a.quaternion.angleTo(a.userData.targetQuaternion) < 0.01 && (a.quaternion.copy(a.userData.targetQuaternion), delete a.userData.targetQuaternion)), l && (a.position.lerp(a.userData.targetPosition, e * i), a.position.distanceTo(a.userData.targetPosition) < 1e-3 && (a.position.copy(a.userData.targetPosition), delete a.userData.targetPosition)), !a.userData.targetQuaternion && !a.userData.targetPosition && this.animatingPanels.splice(s, 1);
      }
    }
    updatePanelVisibility() {
      var _a;
      const e = (_a = this.roomManager.gameContext) == null ? void 0 : _a.camera;
      e && this.roomManager.walls.forEach((t) => {
        const i = this.isWallFacingCamera(t, e);
        t.children.forEach((s) => {
          var _a2;
          ((_a2 = s.userData) == null ? void 0 : _a2.isPanel) && (s.visible = i);
        });
      });
    }
    isWallFacingCamera(e, t) {
      return e.getWorldPosition(se), se.subVectors(t.position, se), me.set(0, 0, 1).transformDirection(e.matrixWorld), se.dot(me) > 0;
    }
    randomRotate() {
      const e = this.getAllPanels();
      if (e.length !== 0) {
        for (let t = e.length - 1; t > 0; t--) {
          const i = Math.floor(Math.random() * (t + 1)), s = e[t];
          e[t] = e[i], e[i] = s;
        }
        e.forEach((t) => {
          const s = Math.ceil(Math.random() * 3) * (Math.PI / 2), a = new he();
          a.setFromAxisAngle(new f(0, 1, 0), s);
          const n = t.userData.targetQuaternion ? t.userData.targetQuaternion.clone() : t.quaternion.clone();
          t.userData.targetQuaternion = n.multiply(a), this.enqueueAnimation(t);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.roomManager.walls.forEach((e) => {
        const t = e.children.filter((r) => r.userData && r.userData.isPanel);
        if (t.length < 2) return;
        const i = t.map((r) => ({
          gridX: r.userData.gridX,
          gridY: r.userData.gridY
        })), s = this.roomManager.config.panelDepth * 0.1;
        for (let r = i.length - 1; r > 0; r--) {
          const c = Math.floor(Math.random() * (r + 1)), g = i[r];
          i[r] = i[c], i[c] = g;
        }
        const a = e.geometry.parameters.width, n = e.geometry.parameters.height, l = e.userData.gridTexture;
        if (!l) return;
        function o(r, c) {
          const g = r + 0.5, d = c + 0.5, p = (g - l.offset.x) / l.repeat.x, y = (d - l.offset.y) / l.repeat.y;
          return new f((p - 0.5) * a, (y - 0.5) * n, s);
        }
        t.forEach((r, c) => {
          const g = i[c];
          r.userData.gridX = g.gridX, r.userData.gridY = g.gridY, r.userData.targetPosition = o(g.gridX, g.gridY), this.enqueueAnimation(r);
        });
      });
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e, this.addSelectionOutline(e);
      let t = "#ffffff";
      if (e.traverse((s) => {
        s.isMesh && s.material && (t = "#" + (Array.isArray(s.material) ? s.material[0] : s.material).color.getHexString());
      }), O(".selection-ui")) {
        const s = document.getElementById("panel-color-picker");
        s && (s.value = t);
      }
    }
    deselectPanel() {
      if (!this.selectedPanel) {
        z(".selection-ui");
        return;
      }
      this.removeSelectionOutline(), this.selectedPanel = null, z(".selection-ui");
    }
    changeSelectedPanelColor(e) {
      this.selectedPanel && this.selectedPanel.traverse((t) => {
        t.isMesh && t.material && t.name !== "selection_outline" && (Array.isArray(t.material) ? t.material.forEach((i) => i.color.set(e)) : t.material.color.set(e));
      });
    }
    rotateSelectedPanel(e) {
      if (!this.selectedPanel) return;
      this.selectedPanel.userData.targetQuaternion || (this.selectedPanel.userData.targetQuaternion = this.selectedPanel.quaternion.clone());
      const t = new he();
      t.setFromAxisAngle(new f(0, 1, 0), e), this.selectedPanel.userData.targetQuaternion.multiply(t), this.enqueueAnimation(this.selectedPanel);
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.roomManager.walls.forEach((t) => {
        t.traverse((i) => {
          i.userData && i.userData.isPanel && i.traverse((s) => {
            s.isMesh && s.material && (Array.isArray(s.material) ? s.material.forEach((a) => a.color.set(e)) : s.material.color.set(e));
          });
        });
      });
    }
    removeSelectionOutline() {
      if (!this.selectedPanel) return;
      const e = this.selectedPanel.getObjectByName("selection_outline");
      e && (this.selectedPanel.remove(e), e.geometry && e.geometry.dispose(), e.material && e.material.dispose());
    }
    addSelectionOutline(e) {
      const t = new q(), i = new f();
      e.updateMatrixWorld(true);
      const s = e.matrixWorld.clone().invert();
      let a = false;
      e.traverse((d) => {
        if (d.isMesh && d.geometry) {
          const p = d.geometry.attributes.position;
          if (!p) return;
          for (let y = 0; y < p.count; y++) i.fromBufferAttribute(p, y), i.applyMatrix4(d.matrixWorld), i.applyMatrix4(s), t.expandByPoint(i);
          a = true;
        }
      }), a || t.set(new f(-0.25, -0.25, 0), new f(0.25, 0.25, 0.05));
      const n = new f(), l = new f();
      t.getSize(n), t.getCenter(l), n.multiplyScalar(1.02);
      const o = new Ne(n.x, n.y, n.z), r = new Re(o), c = new Oe({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new He(r, c);
      g.position.copy(l), g.name = "selection_outline", g.raycast = () => {
      }, e.add(g);
    }
    enqueueAnimation(e) {
      this.animatingPanels.includes(e) || this.animatingPanels.push(e);
    }
    getAllPanels() {
      const e = [];
      return this.roomManager.walls.forEach((t) => {
        t.children.forEach((i) => {
          i.userData && i.userData.isPanel && e.push(i);
        });
      }), e;
    }
  }
  const ae = new f(), pe = new f();
  class Je {
    constructor(e, t, i) {
      this.gameContext = e, this.config = t, this.onWallChanged = i, this.floor = null, this.ceiling = null, this.isNetVisible = true, this.activeWallIndex = null, this.gridSelectionColor = "#1612d3", this.inactiveGridOpacity = 0.45, this.activeGridOpacity = 1, this.textureLoader = new we(), this.baseGridTexture = this.createGridTexture(), this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg"), this.wallTexture.wrapS = I, this.wallTexture.wrapT = I, this.wallTexture.colorSpace = T, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallRoughness = this.textureLoader.load("textures/1/wall-roughness.jpg"), this.wallRoughness.wrapS = I, this.wallRoughness.wrapT = I, this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg"), this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg"), this.floorRoughness = this.textureLoader.load("textures/1/floor-roughness.jpg"), [
        this.floorTexture,
        this.floorNormal,
        this.floorRoughness
      ].forEach((s) => {
        s.wrapS = I, s.wrapT = I;
      }), this.floorTexture.colorSpace = T, this.floorTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.ceilingTexture = this.textureLoader.load("textures/1/ceiling-color.jpg"), this.ceilingTexture.wrapS = I, this.ceilingTexture.wrapT = I, this.ceilingTexture.colorSpace = T, this.ceilingTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.createWalls();
    }
    createScene() {
      this.loadWalls(), this.createFloorAndCeiling();
    }
    createWalls() {
      const { widthWallFront: e, heightWall: t, widthWallSide: i } = this.config;
      this.wall = this.createWallPlane(e, t), this.wall.position.z = -i / 2, this.wall2 = this.createWallPlane(e, t), this.wall2.position.z = i / 2, this.wall2.rotation.y = Math.PI, this.wall3 = this.createWallPlane(i, t), this.wall3.rotation.y = -Math.PI / 2, this.wall3.position.x = e / 2, this.wall4 = this.createWallPlane(i, t), this.wall4.rotation.y = Math.PI / 2, this.wall4.position.x = -e / 2, this.walls = [
        this.wall,
        this.wall2,
        this.wall3,
        this.wall4
      ];
    }
    createWallPlane(e, t) {
      const i = new j(e, t), s = e / this.config.cellSize, a = t / this.config.cellSize, n = this.wallTexture.clone();
      n.repeat.set(e / 2, t / 2), n.wrapS = I, n.wrapT = I, n.needsUpdate = true;
      const l = this.wallRoughness.clone();
      l.repeat.set(s, a);
      const o = this.baseGridTexture.clone();
      o.repeat.set(s, a), o.wrapS = I, o.wrapT = I, o.needsUpdate = true;
      const r = new W({
        map: n,
        roughnessMap: l,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: F
      });
      r.envMapIntensity = 0.8;
      const c = new L(i, r), g = new re({
        map: o,
        color: 16777215,
        transparent: true,
        opacity: this.inactiveGridOpacity,
        depthWrite: false,
        side: F,
        toneMapped: false
      }), d = new L(i, g);
      return d.position.z = 1e-3 * this.config.worldScale, d.renderOrder = 2, d.visible = this.isNetVisible, d.raycast = () => {
      }, c.userData.gridTexture = o, c.userData.gridOverlay = d, c.receiveShadow = true, c.add(d), c.onBeforeRender = (p, y, x) => {
        c.getWorldPosition(ae), ae.subVectors(x.position, ae), pe.set(0, 0, 1).transformDirection(c.matrixWorld);
        const C = ae.dot(pe) > 0;
        c.userData.gridOverlay && (c.userData.gridOverlay.visible = this.isNetVisible && C);
      }, c;
    }
    loadWalls() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: i } = this.config, s = new j(e, t), a = e / 2, n = t / 2, l = this.floorTexture.clone(), o = this.floorNormal.clone(), r = this.floorRoughness.clone();
      [
        l,
        o,
        r
      ].forEach((p) => {
        p.repeat.set(a, n), p.needsUpdate = true;
      });
      const c = new W({
        color: 16777215,
        map: l,
        normalMap: o,
        roughnessMap: r,
        roughness: 1,
        metalness: 0.1,
        side: F
      });
      this.floor = new L(s, c), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -i / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const g = this.ceilingTexture.clone();
      g.repeat.set(a, n), g.needsUpdate = true;
      const d = new W({
        color: 16777215,
        map: g,
        roughness: 0.9,
        side: F
      });
      this.ceiling = new L(s, d), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = i / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    handleWallSelection(e) {
      const t = this.getPointer(e), i = new $();
      i.setFromCamera(t, this.gameContext.camera);
      const s = i.intersectObjects(this.walls, false);
      s.length > 0 && this.setActiveWall(s[0].object);
    }
    setActiveWall(e) {
      const t = this.walls.indexOf(e);
      t !== -1 && (this.activeWallIndex = t, this.highlightActiveWall(), this.onWallChanged && this.onWallChanged());
    }
    highlightActiveWall() {
      this.walls.forEach((e, t) => {
        var _a;
        const i = t === this.activeWallIndex, s = (_a = e.userData.gridOverlay) == null ? void 0 : _a.material;
        s && (s.color.set(this.gridSelectionColor), s.opacity = i ? this.activeGridOpacity : this.inactiveGridOpacity, s.needsUpdate = true);
      });
    }
    toggleNet() {
      this.isNetVisible = !this.isNetVisible, this.walls.forEach((e) => {
        e.userData.gridOverlay && (e.userData.gridOverlay.visible = this.isNetVisible);
      });
    }
    setAllWallsColor(e) {
      this.walls.forEach((t) => {
        var _a;
        ((_a = t.material) == null ? void 0 : _a.color) && t.material.color.set(e);
      });
    }
    createGridTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.clearRect(0, 0, 128, 128), t.strokeStyle = "rgba(68, 68, 68, 0.95)", t.lineWidth = 2, t.strokeRect(0, 0, 128, 128);
      const i = new Ue(e);
      return i.colorSpace = T, i.magFilter = Xe, i.minFilter = xe, i.generateMipmaps = true, i.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i;
    }
    getPointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      return new V((e.clientX - i.left) / i.width * 2 - 1, -((e.clientY - i.top) / i.height * 2 - 1));
    }
  }
  class et {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.rug = null, this.selectedRug = null, this.raycaster = new $(), this.pointer = new V();
    }
    createScene() {
      const { heightWall: e } = this.config, t = 4 * this.worldScale, i = 3 * this.worldScale, s = new j(t, i), a = new we(), n = a.load("textures/1/carpet-color.jpg"), l = a.load("textures/1/carpet-normal.jpg");
      n.wrapS = I, n.wrapT = I, n.repeat.set(t, i), l.wrapS = I, l.wrapT = I, l.repeat.set(t, i), n.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), n.colorSpace = T, n.generateMipmaps = true, n.minFilter = xe;
      const o = new W({
        map: n,
        bumpMap: l,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new L(s, o), this.rug.rotation.x = -Math.PI / 2, this.rug.position.y = -e / 2 + 3e-3 * this.worldScale, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = t, this.rug.userData.baseDepth = i, this.gameContext.scene.add(this.rug);
    }
    hitTest(e) {
      return this.rug ? (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.intersectObject(this.rug, false).length > 0) : false;
    }
    selectRug() {
      this.selectedRug = this.rug, O(".rug-selection-ui"), this.refreshRugUI();
    }
    deselectRug() {
      if (this.selectedRug = null, z(".rug-selection-ui"), this.rug) {
        const e = document.getElementById("rug-color-picker");
        e && (e.value = "#" + this.rug.material.color.getHexString());
      }
    }
    updateRugTransform(e, t, i, s) {
      if (!this.rug) return;
      const a = this.rug.userData.baseWidth, n = this.rug.userData.baseDepth, l = Math.max((this.config.widthWallFront - e) / 2, 0), o = Math.max((this.config.widthWallSide - t) / 2, 0);
      this.rug.scale.set(e / a, 1, t / n), this.rug.position.x = S.clamp(i, -l, l), this.rug.position.z = S.clamp(s, -o, o), this.rug.material.map && this.rug.material.map.repeat.set(e, t), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(e, t), this.refreshRugUI();
    }
    refreshRugUI() {
      if (!this.rug) return;
      const e = document.getElementById("rug-width"), t = document.getElementById("rug-depth"), i = document.getElementById("rug-pos-x"), s = document.getElementById("rug-pos-z"), a = this.rug.userData.baseWidth * this.rug.scale.x, n = this.rug.userData.baseDepth * this.rug.scale.z, l = Math.max(this.config.widthWallFront * 0.95, a), o = Math.max(this.config.widthWallSide * 0.95, n), r = Math.max(this.worldScale, 0.1), c = Math.max(this.worldScale, 0.1), g = Math.max((this.config.widthWallFront - a) / 2, 0), d = Math.max((this.config.widthWallSide - n) / 2, 0);
      e && (e.min = String(r), e.max = String(l), e.value = String(a)), t && (t.min = String(c), t.max = String(o), t.value = String(n)), i && (i.min = String(-g), i.max = String(g), i.value = String(this.rug.position.x)), s && (s.min = String(-d), s.max = String(d), s.value = String(this.rug.position.z));
    }
    changeRugColor(e) {
      var _a;
      ((_a = this.rug) == null ? void 0 : _a.material) && this.rug.material.color.set(e);
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
  }
  const ne = [
    {
      x: 0,
      z: 0
    },
    {
      x: -1.2,
      z: 0.8
    },
    {
      x: 1.2,
      z: 0.8
    },
    {
      x: 0,
      z: -1.2
    },
    {
      x: -1.2,
      z: -1.2
    },
    {
      x: 1.2,
      z: -1.2
    }
  ], le = {
    x: 0,
    y: -0.2,
    z: 0
  }, tt = {
    table: {
      assetKey: "table",
      collectionName: "furnitureItems",
      itemName: "table",
      label: "\u0421\u0442\u043E\u043B",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u043E\u043B",
      missingLabel: "\u0421\u0442\u043E\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 0.5,
        y: 1,
        z: 0.5
      }
    },
    sofa: {
      assetKey: "sofa",
      collectionName: "sofaItems",
      itemName: "sofa",
      label: "\u0414\u0438\u0432\u0430\u043D",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0438\u0432\u0430\u043D",
      missingLabel: "\u0414\u0438\u0432\u0430\u043D \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 1,
        y: 1,
        z: 1
      }
    },
    sofa2: {
      assetKey: "sofa2",
      collectionName: "sofa2Items",
      itemName: "sofa2",
      label: "\u0414\u0438\u0432\u0430\u043D 2",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0438\u0432\u0430\u043D 2",
      missingLabel: "\u0414\u0438\u0432\u0430\u043D 2 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 1,
        y: 1,
        z: 1
      }
    },
    table2: {
      assetKey: "table2",
      collectionName: "table2Items",
      itemName: "table2",
      label: "\u0421\u0442\u043E\u043B 2",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u043E\u043B 2",
      missingLabel: "\u0421\u0442\u043E\u043B 2 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 1,
        y: 1,
        z: 1
      }
    },
    chair: {
      assetKey: "chair",
      collectionName: "chairItems",
      itemName: "chair",
      label: "\u0421\u0442\u0443\u043B",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u0443\u043B",
      missingLabel: "\u0421\u0442\u0443\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 1,
        y: 1,
        z: 1
      }
    },
    wardrobe: {
      assetKey: "wardrobe",
      collectionName: "wardrobeItems",
      itemName: "wardrobe",
      label: "\u0428\u043A\u0430\u0444",
      deleteLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0448\u043A\u0430\u0444",
      missingLabel: "\u0428\u043A\u0430\u0444 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D",
      initialScale: {
        x: 1,
        y: 1,
        z: 1
      }
    }
  };
  class it {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.furnitureItems = [], this.sofaItems = [], this.sofa2Items = [], this.table2Items = [], this.chairItems = [], this.wardrobeItems = [], this.tableLamps = [], this.wallTvs = [], this.selectedFurniture = null, this.selectedLamp = null, this.selectedTv = null, this.raycaster = new $(), this.pointer = new V(), this._tempQuaternion = new he();
    }
    addTable() {
      if (this.furnitureItems.length > 0) {
        const r = this.furnitureItems[0];
        return this.selectFurniture(r), r;
      }
      const e = this.gameContext.assetManager.furniture.table;
      if (!e) return console.warn("\u0421\u0442\u043E\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new R(), i = e.clone(true);
      t.name = "table_".concat(this.furnitureItems.length + 1), t.userData.type = "table", t.userData.label = "\u0421\u0442\u043E\u043B", t.userData.deleteLabel = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u043E\u043B", t.userData.isFurniture = true, t.add(i), i.traverse((r) => {
        r.isMesh && (r.castShadow = true, r.receiveShadow = false, Array.isArray(r.material) ? r.material = r.material.map((c) => c.clone()) : r.material && (r.material = r.material.clone()), this.tuneFurnitureMaterial(r));
      });
      const s = new q().setFromObject(i), a = s.getCenter(new f()), n = s.getSize(new f());
      i.position.x -= a.x, i.position.y -= s.min.y, i.position.z -= a.z, t.userData.baseWidth = n.x, t.userData.baseDepth = n.z, t.userData.baseHeight = n.y, t.userData.rotationStep = 0, t.scale.set(0.5, 1, 0.5);
      const l = -this.config.heightWall / 2, o = ne[this.furnitureItems.length % ne.length];
      return t.position.set(o.x * this.worldScale, l, o.z * this.worldScale), this.gameContext.scene.add(t), this.furnitureItems.push(t), this.selectFurniture(t), t;
    }
    deleteTable() {
      const e = this.furnitureItems[0];
      e && (this.removeObject(e), this.furnitureItems = [], this.selectedFurniture === e && this.deselectFurniture());
    }
    addSofa() {
      return this.addFloorFurniture("sofa");
    }
    addSofa2() {
      return this.addFloorFurniture("sofa2");
    }
    addTable2() {
      return this.addFloorFurniture("table2");
    }
    addChair() {
      return this.addFloorFurniture("chair");
    }
    addWardrobe() {
      return this.addFloorFurniture("wardrobe");
    }
    addFloorFurniture(e) {
      const t = tt[e];
      if (!t) return null;
      const i = this[t.collectionName];
      if (i.length > 0) {
        const d = i[0];
        return this.selectFurniture(d), d;
      }
      const s = this.gameContext.assetManager.furniture[t.assetKey];
      if (!s) return console.warn(t.missingLabel), null;
      const a = new R(), n = s.clone(true);
      a.name = "".concat(t.itemName, "_").concat(i.length + 1), a.userData.type = e, a.userData.label = t.label, a.userData.deleteLabel = t.deleteLabel, a.userData.isFurniture = true, a.add(n), n.traverse((d) => {
        d.isMesh && (d.castShadow = true, d.receiveShadow = false, Array.isArray(d.material) ? d.material = d.material.map((p) => p.clone()) : d.material && (d.material = d.material.clone()), this.tuneFurnitureMaterial(d));
      });
      const l = new q().setFromObject(n), o = l.getCenter(new f()), r = l.getSize(new f());
      n.position.x -= o.x, n.position.y -= l.min.y, n.position.z -= o.z, a.userData.baseWidth = Math.max(r.x, 0.1), a.userData.baseDepth = Math.max(r.z, 0.1), a.userData.baseHeight = Math.max(r.y, 0.1), a.userData.rotationStep = 0, a.scale.set(t.initialScale.x, t.initialScale.y, t.initialScale.z);
      const c = -this.config.heightWall / 2, g = ne[this.getAllFloorFurniture().length % ne.length];
      return a.position.set(g.x * this.worldScale, c, g.z * this.worldScale), this.gameContext.scene.add(a), i.push(a), this.selectFurniture(a), a;
    }
    deleteSelectedFurniture() {
      const e = this.selectedFurniture;
      e && (this.removeObject(e), this.furnitureItems = this.furnitureItems.filter((t) => t !== e), this.sofaItems = this.sofaItems.filter((t) => t !== e), this.sofa2Items = this.sofa2Items.filter((t) => t !== e), this.table2Items = this.table2Items.filter((t) => t !== e), this.chairItems = this.chairItems.filter((t) => t !== e), this.wardrobeItems = this.wardrobeItems.filter((t) => t !== e), this.deselectFurniture());
    }
    addTableLamp(e = false) {
      if (this.tableLamps.length > 0 && !e) {
        const o = this.tableLamps[0];
        return this.selectLamp(o), o;
      }
      const t = this.gameContext.assetManager.furniture.tableLamp;
      if (!t) return console.warn("\u041B\u0430\u043C\u043F\u0430 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430"), null;
      const i = new R(), s = t.clone(true);
      i.name = "table_lamp_".concat(this.tableLamps.length + 1), i.userData.isTableLamp = true, i.userData.type = "tableLamp", i.add(s), s.traverse((o) => {
        o.isMesh && (o.castShadow = true, o.receiveShadow = false, Array.isArray(o.material) ? o.material = o.material.map((r) => r.clone()) : o.material && (o.material = o.material.clone()), this.tuneLampMaterial(o));
      });
      const a = new q().setFromObject(s), n = a.getCenter(new f()), l = a.getSize(new f());
      return s.position.x -= n.x, s.position.y -= a.min.y, s.position.z -= n.z, i.userData.baseWidth = l.x, i.userData.baseDepth = l.z, i.userData.baseHeight = l.y, i.position.set((le.x + this.tableLamps.length * 0.45) * this.worldScale, le.y * this.worldScale, le.z * this.worldScale), this.gameContext.scene.add(i), this.tableLamps.push(i), this.selectLamp(i), i;
    }
    deleteTableLamp() {
      const e = this.selectedLamp || this.tableLamps[0];
      e && (this.removeObject(e), this.tableLamps = this.tableLamps.filter((t) => t !== e), this.selectedLamp === e && this.deselectLamp());
    }
    clearTableLamps() {
      this.tableLamps.slice().forEach((e) => {
        this.removeObject(e);
      }), this.tableLamps = [], this.deselectLamp();
    }
    addWallTv() {
      if (this.wallTvs.length > 0) {
        const c = this.wallTvs[0];
        return this.selectWallTv(c), c;
      }
      const e = this.gameContext.assetManager.furniture.tv;
      if (!e) return console.warn("\u0422\u0435\u043B\u0435\u0432\u0438\u0437\u043E\u0440 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new R(), i = e.clone(true);
      t.name = "wall_tv_".concat(this.wallTvs.length + 1), t.userData.isWallTv = true, t.userData.type = "wallTv", t.add(i), i.traverse((c) => {
        c.isMesh && (c.castShadow = true, c.receiveShadow = false, Array.isArray(c.material) ? c.material = c.material.map((g) => g.clone()) : c.material && (c.material = c.material.clone()), this.tuneTvMaterial(c));
      });
      const s = new q().setFromObject(i), a = s.getCenter(new f()), n = s.getSize(new f());
      i.position.x -= a.x, i.position.y -= a.y, i.position.z -= a.z, t.userData.baseWidth = Math.max(n.x, 0.1), t.userData.baseHeight = Math.max(n.y, 0.1), t.userData.baseDepth = Math.max(n.z, 0.01);
      const l = this.getWallSizeForTv(this.getDefaultTvWallIndex()), r = Math.min(t.userData.baseWidth, l.width * 0.55) / t.userData.baseWidth;
      return t.scale.set(r, r, r), t.position.set(0, 0, 0), this.attachTvToWall(t, this.getDefaultTvWallIndex()), this.wallTvs.push(t), this.selectWallTv(t), t;
    }
    deleteWallTv() {
      const e = this.wallTvs[0];
      e && (this.removeObject(e), this.wallTvs = [], this.selectedTv === e && this.deselectWallTv());
    }
    tuneFurnitureMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = Q, i.envMap = null, i.envMapIntensity = 0, i.shadowSide = Q, i.toneMapped = true, i.map && (i.map.colorSpace = T, i.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i.map.needsUpdate = true), i.name === "Material.002" && (i.color.setRGB(0.62, 0.62, 0.64), i.roughness = 0.68, i.metalness = 0), i.name === "default.001" && (i.color.setRGB(1, 1, 1), i.roughness = 0.58, i.metalness = 0), i.needsUpdate = true);
      });
    }
    tuneLampMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = Q, i.envMap = null, i.envMapIntensity = 0, i.name === "abajor" && (i.color.setRGB(0.95, 0.92, 0.82), i.roughness = 0.9, i.metalness = 0), (i.name === "black rkham" || i.name === "Material.005") && (i.color.multiplyScalar(1.8), i.roughness = 0.55, i.metalness = 0), i.needsUpdate = true);
      });
    }
    tuneTvMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = Q, i.envMap = null, i.envMapIntensity = 0, i.toneMapped = true, i.map && (i.map.colorSpace = T, i.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i.map.needsUpdate = true), i.color.multiplyScalar(2.4), i.roughness = 0.36, i.metalness = 0.06, i.emissive && (i.emissive.setRGB(0.03, 0.035, 0.04), i.emissiveIntensity = 0.65), i.needsUpdate = true);
      });
    }
    hitTest(e) {
      const t = this.getAllFloorFurniture();
      if (t.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(t, true);
      if (i.length === 0) return null;
      let s = i[0].object;
      for (; s && !s.userData.isFurniture; ) s = s.parent;
      return s || null;
    }
    hitLampTest(e) {
      if (this.tableLamps.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.tableLamps, true);
      if (t.length === 0) return null;
      let i = t[0].object;
      for (; i && !i.userData.isTableLamp; ) i = i.parent;
      return i || null;
    }
    getAllFloorFurniture() {
      return [
        ...this.furnitureItems,
        ...this.sofaItems,
        ...this.sofa2Items,
        ...this.table2Items,
        ...this.chairItems,
        ...this.wardrobeItems
      ];
    }
    hitWallTvTest(e) {
      if (this.wallTvs.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.wallTvs, true);
      if (t.length === 0) return null;
      let i = t[0].object;
      for (; i && !i.userData.isWallTv; ) i = i.parent;
      return i || null;
    }
    selectFurniture(e) {
      this.selectedFurniture = e, O(".furniture-selection-ui"), this.refreshFurnitureUI();
    }
    deselectFurniture() {
      this.selectedFurniture = null, z(".furniture-selection-ui");
    }
    removeObject(e) {
      e.parent && e.parent.remove(e), this.gameContext.scene.remove(e), e.traverse((t) => {
        var _a, _b;
        !t.isMesh || !t.material || (Array.isArray(t.material) ? t.material.forEach((i) => {
          var _a2;
          return (_a2 = i == null ? void 0 : i.dispose) == null ? void 0 : _a2.call(i);
        }) : (_b = (_a = t.material).dispose) == null ? void 0 : _b.call(_a));
      });
    }
    refreshFurnitureUI() {
      const e = this.selectedFurniture;
      if (!e) return;
      const t = document.getElementById("furniture-width"), i = document.getElementById("furniture-depth"), s = document.getElementById("furniture-width-row"), a = document.getElementById("furniture-depth-row"), n = document.getElementById("furniture-width-label"), l = document.getElementById("furniture-depth-label"), o = document.getElementById("furniture-pos-x"), r = document.getElementById("furniture-pos-z"), c = document.getElementById("furniture-rotation"), g = document.getElementById("furniture-rotation-value"), d = document.getElementById("furniture-selection-title"), p = document.getElementById("btn-delete-furniture"), y = e.userData.baseWidth * e.scale.x, x = e.userData.baseDepth * e.scale.z, C = e.userData.type === "chair", M = e.userData.type === "wardrobe", v = M ? e.userData.baseHeight * e.scale.y : x, w = e.userData.rotationStep || 0, A = this.getRotatedFurnitureFootprint(e, y, x), U = Math.max(this.config.widthWallFront * 0.9, y), k = M ? Math.max(this.config.heightWall * 0.95, v) : Math.max(this.config.widthWallSide * 0.9, x), _ = Math.max(e.userData.baseWidth * 0.15, 0.05), X = Math.max(M ? e.userData.baseHeight * 0.15 : e.userData.baseDepth * 0.15, 0.05), B = Math.max((this.config.widthWallFront - A.width) / 2, 0), G = Math.max((this.config.widthWallSide - A.depth) / 2, 0);
      s && (s.style.display = "flex"), a && (a.style.display = C ? "none" : "flex"), n && (n.textContent = C ? "\u0420\u0430\u0437\u043C\u0435\u0440:" : "\u0428\u0438\u0440\u0438\u043D\u0430:"), l && (l.textContent = M ? "\u0412\u044B\u0441\u043E\u0442\u0430:" : "\u0413\u043B\u0443\u0431\u0438\u043D\u0430:"), t && (t.min = String(_), t.max = String(U), t.value = String(y)), i && (i.min = String(X), i.max = String(k), i.value = String(v)), o && (o.min = String(-B), o.max = String(B), o.value = String(e.position.x)), r && (r.min = String(-G), r.max = String(G), r.value = String(e.position.z)), c && (c.value = String(w)), g && (g.textContent = "".concat(w * 90, "\xB0")), d && (d.textContent = e.userData.label || "\u041C\u0435\u0431\u0435\u043B\u044C"), p && (p.textContent = e.userData.deleteLabel || "\u0423\u0434\u0430\u043B\u0438\u0442\u044C");
    }
    updateFurnitureTransform(e, t, i, s) {
      const a = this.selectedFurniture;
      if (!a) return;
      const n = a.userData.baseWidth || 1, l = a.userData.baseDepth || 1, o = Math.max(e, Math.max(n * 0.15, 0.05)), r = Math.max(t, Math.max(l * 0.15, 0.05)), c = a.userData.type === "chair", g = a.userData.type === "wardrobe";
      if (c) {
        const x = o / n;
        a.scale.set(x, x, x);
      } else if (g) {
        const x = a.userData.baseHeight || 1, C = Math.max(t, Math.max(x * 0.15, 0.05));
        a.scale.set(o / n, C / x, 1);
      } else a.scale.set(o / n, 1, r / l);
      const d = this.getRotatedFurnitureFootprint(a, o, c || g ? a.userData.baseDepth * a.scale.z : r), p = Math.max((this.config.widthWallFront - d.width) / 2, 0), y = Math.max((this.config.widthWallSide - d.depth) / 2, 0);
      a.position.x = S.clamp(i, -p, p), a.position.z = S.clamp(s, -y, y), a.position.y = -this.config.heightWall / 2, this.refreshFurnitureUI();
    }
    updateFurnitureRotation(e) {
      const t = this.selectedFurniture;
      if (!t) return;
      const i = (e % 4 + 4) % 4;
      t.userData.rotationStep = i, t.rotation.y = i * (Math.PI / 2);
      const s = document.getElementById("furniture-rotation-value");
      s && (s.textContent = "".concat(i * 90, "\xB0"));
      const a = t.userData.baseWidth * t.scale.x, n = t.userData.baseDepth * t.scale.z, l = this.getRotatedFurnitureFootprint(t, a, n), o = Math.max((this.config.widthWallFront - l.width) / 2, 0), r = Math.max((this.config.widthWallSide - l.depth) / 2, 0);
      t.position.x = S.clamp(t.position.x, -o, o), t.position.z = S.clamp(t.position.z, -r, r), this.refreshFurnitureUI();
    }
    getRotatedFurnitureFootprint(e, t, i) {
      return Math.abs(e.userData.rotationStep || 0) % 2 === 1 ? {
        width: i,
        depth: t
      } : {
        width: t,
        depth: i
      };
    }
    selectLamp(e) {
      this.selectedLamp = e, O(".table-lamp-selection-ui"), this.refreshLampUI();
    }
    deselectLamp() {
      this.selectedLamp = null, z(".table-lamp-selection-ui");
    }
    refreshLampUI() {
      const e = this.selectedLamp;
      if (!e) return;
      const t = document.getElementById("table-lamp-width"), i = document.getElementById("table-lamp-height"), s = document.getElementById("table-lamp-pos-x"), a = document.getElementById("table-lamp-pos-y"), n = document.getElementById("table-lamp-pos-z"), l = e.userData.baseWidth * e.scale.x, o = e.userData.baseHeight * e.scale.y, r = this.config.widthWallFront / 2, c = this.config.heightWall / 2, g = this.config.widthWallSide / 2;
      t && (t.min = String(Math.max(e.userData.baseWidth * 0.5, 0.1)), t.max = String(Math.max(e.userData.baseWidth * 3, l)), t.value = String(l)), i && (i.min = String(Math.max(e.userData.baseHeight * 0.5, 0.1)), i.max = String(Math.max(e.userData.baseHeight * 3, o)), i.value = String(o)), s && (s.min = String(-r), s.max = String(r), s.value = String(e.position.x)), a && (a.min = String(-c), a.max = String(c), a.value = String(e.position.y)), n && (n.min = String(-g), n.max = String(g), n.value = String(e.position.z));
    }
    updateLampTransform(e, t, i, s, a) {
      const n = this.selectedLamp;
      if (!n) return;
      const l = n.userData.baseWidth || 1, o = n.userData.baseHeight || 1, r = e / l;
      n.scale.set(r, t / o, r), n.position.x = S.clamp(i, -this.config.widthWallFront / 2, this.config.widthWallFront / 2), n.position.y = S.clamp(s, -this.config.heightWall / 2, this.config.heightWall / 2), n.position.z = S.clamp(a, -this.config.widthWallSide / 2, this.config.widthWallSide / 2), this.refreshLampUI();
    }
    selectWallTv(e) {
      this.selectedTv = e, O(".wall-tv-selection-ui"), this.refreshWallTvUI();
    }
    deselectWallTv() {
      this.selectedTv = null, z(".wall-tv-selection-ui");
    }
    refreshWallTvUI() {
      var _a, _b;
      const e = this.selectedTv;
      if (!e) return;
      const t = document.getElementById("wall-tv-width"), i = document.getElementById("wall-tv-height"), s = document.getElementById("wall-tv-pos-x"), a = document.getElementById("wall-tv-pos-y"), n = document.getElementById("wall-tv-wall"), l = document.getElementById("wall-tv-wall-value"), o = e.userData.wallIndex || 0, r = this.getWallSizeForTv(o), c = e.userData.baseWidth * e.scale.x, g = e.userData.baseHeight * e.scale.y, d = Math.max(e.userData.baseWidth * 0.25, 0.1), p = Math.max(e.userData.baseHeight * 0.25, 0.1), y = Math.max(r.width * 0.9, c), x = Math.max(r.height * 0.9, g), C = Math.max((r.width - c) / 2, 0), M = Math.max((r.height - g) / 2, 0);
      t && (t.min = String(d), t.max = String(y), t.value = String(c)), i && (i.min = String(p), i.max = String(x), i.value = String(g)), s && (s.min = String(-C), s.max = String(C), s.value = String(e.position.x)), a && (a.min = String(-M), a.max = String(M), a.value = String(e.position.y)), n && (n.min = "1", n.max = String(Math.max(((_b = (_a = this.gameContext.sceneClass) == null ? void 0 : _a.walls) == null ? void 0 : _b.length) || 4, 1)), n.value = String(o + 1)), l && (l.textContent = String(o + 1));
    }
    updateWallTvTransform(e, t, i, s, a) {
      const n = this.selectedTv;
      if (!n) return;
      const l = Number.isFinite(a) ? a - 1 : n.userData.wallIndex || 0, o = this.getClampedTvWallIndex(l), r = this.getWallSizeForTv(o), c = S.clamp(e, Math.max(n.userData.baseWidth * 0.25, 0.1), r.width * 0.9), g = S.clamp(t, Math.max(n.userData.baseHeight * 0.25, 0.1), r.height * 0.9);
      this.attachTvToWall(n, o), n.scale.set(c / (n.userData.baseWidth || 1), g / (n.userData.baseHeight || 1), Math.max(c / (n.userData.baseWidth || 1), g / (n.userData.baseHeight || 1)));
      const d = Math.max((r.width - c) / 2, 0), p = Math.max((r.height - g) / 2, 0);
      n.position.x = S.clamp(i, -d, d), n.position.y = S.clamp(s, -p, p), this.setWallTvDepthOffset(n), this.refreshWallTvUI();
    }
    attachTvToWall(e, t) {
      var _a;
      const i = ((_a = this.gameContext.sceneClass) == null ? void 0 : _a.walls) || [], s = this.getClampedTvWallIndex(t), a = i[s];
      a && (a.add(e), e.userData.wallIndex = s, this.setWallTvDepthOffset(e));
    }
    setWallTvDepthOffset(e) {
      const t = e.userData.baseDepth || 0.01, i = e.scale.z || 1;
      e.position.z = Math.max(6e-3 * this.worldScale, t * i * 0.5 + 6e-3 * this.worldScale);
    }
    getWallSizeForTv(e) {
      const t = this.getClampedTvWallIndex(e);
      return {
        width: t === 2 || t === 3 ? this.config.widthWallSide : this.config.widthWallFront,
        height: this.config.heightWall
      };
    }
    getDefaultTvWallIndex() {
      var _a;
      const e = (_a = this.gameContext.sceneClass) == null ? void 0 : _a.activeWallIndex;
      return Number.isFinite(e) ? this.getClampedTvWallIndex(e) : 0;
    }
    getClampedTvWallIndex(e) {
      var _a, _b;
      const t = ((_b = (_a = this.gameContext.sceneClass) == null ? void 0 : _a.walls) == null ? void 0 : _b.length) || 4;
      return S.clamp(Math.round(Number(e) || 0), 0, Math.max(t - 1, 0));
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
  }
  class st {
    constructor(e, t) {
      this.sceneClass = e, this.dragHandler = t;
    }
    bindEvents() {
      window.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.onPointerMove(e)), window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    }
    onPointerDown(e) {
      if (e.target.closest(".floating-ui") || e.target.closest(".bottom_panel") || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || this.sceneClass.isSceneLocked) return;
      const t = this.sceneClass.lightManager.findLightBulbHit(e);
      if (t) {
        this.sceneClass.selectLightBulb(t), this.sceneClass.lightManager.startDragLightBulb(t, e);
        return;
      }
      const i = this.sceneClass.furnitureManager.hitLampTest(e);
      if (i) {
        this.sceneClass.selectTableLamp(i);
        return;
      }
      const s = this.sceneClass.furnitureManager.hitWallTvTest(e);
      if (s) {
        this.sceneClass.selectWallTv(s);
        return;
      }
      const a = this.sceneClass.furnitureManager.hitTest(e);
      if (a) {
        this.sceneClass.selectFurniture(a);
        return;
      }
      if (this.sceneClass.rugManager.hitTest(e)) {
        this.sceneClass.selectRug();
        return;
      }
      this.dragHandler.handlePointerDown(e) || (this.sceneClass.roomManager.handleWallSelection(e), this.sceneClass.clearSelections());
    }
    onPointerMove(e) {
      if (!this.sceneClass.isSceneLocked) {
        if (this.sceneClass.lightManager.isDraggingLightBulb) {
          this.sceneClass.lightManager.onPointerMoveLightBulb(e);
          return;
        }
        this.dragHandler.onPointerMove(e);
      }
    }
    onPointerUp(e) {
      if (!this.sceneClass.isSceneLocked) {
        if (this.sceneClass.lightManager.isDraggingLightBulb) {
          this.sceneClass.lightManager.stopDragLightBulb();
          return;
        }
        this.dragHandler.onPointerUp(e), this.sceneClass.notifyPanelsChanged();
      }
    }
  }
  class at {
    constructor(e) {
      var _a;
      this.gameContext = e, this.onWallChanged = null, this.onPanelsChanged = null, this.isSceneLocked = false;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.config = {
        worldScale: t,
        cellSize: 0.5 * t,
        panelDepth: 0.05 * t,
        widthWallFront: 5 * t,
        heightWall: 2.7 * t,
        widthWallSide: 4 * t
      }, this.roomManager = new Je(e, this.config, () => {
        this.onWallChanged && this.onWallChanged();
      }), this.panelManager = new $e(this.roomManager), this.lightManager = new Qe(e, this.config), this.rugManager = new et(e, this.config), this.furnitureManager = new it(e, this.config), this.dragHandler = new Ge(e, this.roomManager.walls, this.config), this.interactionController = new st(this, this.dragHandler);
    }
    createScene() {
      this.roomManager.createScene(), this.rugManager.createScene(), this.lightManager.createScene(), this.interactionController.bindEvents();
    }
    getSceneState() {
      const e = this.panelManager.getAllPanels().map((c) => {
        let g = "#ffffff";
        return c.traverse((d) => {
          d.isMesh && d.material && g === "#ffffff" && (g = "#" + (Array.isArray(d.material) ? d.material[0] : d.material).color.getHexString());
        }), {
          wallIndex: this.roomManager.walls.indexOf(c.parent),
          panelIndex: c.userData.panelIndex,
          gridX: c.userData.gridX,
          gridY: c.userData.gridY,
          position: c.position.toArray(),
          quaternion: c.quaternion.toArray(),
          color: g
        };
      }), t = this.roomManager.walls.map((c) => {
        var _a, _b, _c;
        return {
          color: ((_a = c.material) == null ? void 0 : _a.color) ? "#" + c.material.color.getHexString() : "#ffffff",
          offsetX: ((_b = c.userData.gridTexture) == null ? void 0 : _b.offset.x) || 0,
          offsetY: ((_c = c.userData.gridTexture) == null ? void 0 : _c.offset.y) || 0
        };
      }), i = this.lightManager.lightBulbs.map(({ mesh: c, light: g }) => ({
        position: c.position.toArray(),
        color: "#" + g.color.getHexString(),
        intensity: g.intensity,
        distance: g.distance,
        decay: g.decay,
        visible: c.visible,
        isRoomLight: !!c.userData.isRoomLight,
        emissiveIntensity: this.lightManager.getLightBulbEmissiveIntensity(c)
      })), s = this.rugManager.rug ? {
        width: this.rugManager.rug.userData.baseWidth * this.rugManager.rug.scale.x,
        depth: this.rugManager.rug.userData.baseDepth * this.rugManager.rug.scale.z,
        posX: this.rugManager.rug.position.x,
        posZ: this.rugManager.rug.position.z,
        color: "#" + this.rugManager.rug.material.color.getHexString()
      } : null, a = this.furnitureManager.furnitureItems[0] ? {
        width: this.furnitureManager.furnitureItems[0].userData.baseWidth * this.furnitureManager.furnitureItems[0].scale.x,
        depth: this.furnitureManager.furnitureItems[0].userData.baseDepth * this.furnitureManager.furnitureItems[0].scale.z,
        posX: this.furnitureManager.furnitureItems[0].position.x,
        posZ: this.furnitureManager.furnitureItems[0].position.z,
        rotationStep: this.furnitureManager.furnitureItems[0].userData.rotationStep || 0
      } : null, n = this.furnitureManager.tableLamps.map((c) => ({
        width: c.userData.baseWidth * c.scale.x,
        height: c.userData.baseHeight * c.scale.y,
        posX: c.position.x,
        posY: c.position.y,
        posZ: c.position.z
      })), l = n[0] || null, o = [
        ...this.furnitureManager.sofaItems,
        ...this.furnitureManager.sofa2Items,
        ...this.furnitureManager.table2Items,
        ...this.furnitureManager.chairItems,
        ...this.furnitureManager.wardrobeItems
      ].map((c) => ({
        type: c.userData.type,
        width: c.userData.baseWidth * c.scale.x,
        depth: c.userData.type === "wardrobe" ? c.userData.baseHeight * c.scale.y : c.userData.baseDepth * c.scale.z,
        posX: c.position.x,
        posZ: c.position.z,
        rotationStep: c.userData.rotationStep || 0
      })), r = this.furnitureManager.wallTvs[0] ? {
        width: this.furnitureManager.wallTvs[0].userData.baseWidth * this.furnitureManager.wallTvs[0].scale.x,
        height: this.furnitureManager.wallTvs[0].userData.baseHeight * this.furnitureManager.wallTvs[0].scale.y,
        posX: this.furnitureManager.wallTvs[0].position.x,
        posY: this.furnitureManager.wallTvs[0].position.y,
        wallIndex: this.furnitureManager.wallTvs[0].userData.wallIndex || 0
      } : null;
      return {
        version: 1,
        worldScale: this.config.worldScale,
        activeWallIndex: this.roomManager.activeWallIndex,
        isNetVisible: this.roomManager.isNetVisible,
        globalPanelColor: this.panelManager.globalPanelColor,
        walls: t,
        panels: e,
        sideLights: i,
        ambientLight: {
          intensity: this.lightManager.ambientLight.intensity,
          color: "#" + this.lightManager.ambientLight.color.getHexString()
        },
        rug: s,
        table: a,
        lamp: l,
        tableLamps: n,
        floorFurniture: o,
        wallTv: r
      };
    }
    applySceneState(e) {
      var _a;
      if (!e || typeof e != "object") throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B");
      if (this.clearSelections(), this.roomManager.walls.forEach((i) => {
        i.children.filter((s) => {
          var _a2;
          return (_a2 = s.userData) == null ? void 0 : _a2.isPanel;
        }).forEach((s) => {
          i.remove(s), this.dragHandler.disposeModel(s);
        });
      }), this.lightManager.lightBulbs.forEach(({ mesh: i, light: s }) => {
        this.gameContext.scene.remove(i), this.gameContext.scene.remove(s), this.lightManager.disposeLightBulbMesh(i);
      }), this.lightManager.lightBulbs = [], this.lightManager.clearFillLights(), this.lightManager.deselectLightBulb(), this.furnitureManager.clearTableLamps(), this.furnitureManager.deleteWallTv(), this.furnitureManager.sofaItems.slice().forEach((i) => {
        this.furnitureManager.removeObject(i);
      }), this.furnitureManager.sofaItems = [], this.furnitureManager.sofa2Items.slice().forEach((i) => {
        this.furnitureManager.removeObject(i);
      }), this.furnitureManager.sofa2Items = [], this.furnitureManager.table2Items.slice().forEach((i) => {
        this.furnitureManager.removeObject(i);
      }), this.furnitureManager.table2Items = [], this.furnitureManager.chairItems.slice().forEach((i) => {
        this.furnitureManager.removeObject(i);
      }), this.furnitureManager.chairItems = [], this.furnitureManager.wardrobeItems.slice().forEach((i) => {
        this.furnitureManager.removeObject(i);
      }), this.furnitureManager.wardrobeItems = [], this.furnitureManager.deleteTable(), Array.isArray(e.walls) && e.walls.forEach((i, s) => {
        var _a2;
        const a = this.roomManager.walls[s];
        a && (i.color && ((_a2 = a.material) == null ? void 0 : _a2.color) && a.material.color.set(i.color), a.userData.gridTexture && (a.userData.gridTexture.offset.x = Number(i.offsetX || 0), a.userData.gridTexture.offset.y = Number(i.offsetY || 0), a.userData.gridTexture.needsUpdate = true));
      }), typeof e.activeWallIndex == "number" && (this.roomManager.activeWallIndex = e.activeWallIndex, this.roomManager.highlightActiveWall(), this.onWallChanged && this.onWallChanged()), typeof e.isNetVisible == "boolean" && e.isNetVisible !== this.roomManager.isNetVisible && this.roomManager.toggleNet(), this.panelManager.globalPanelColor = e.globalPanelColor || null, (e.panels || []).forEach((i) => {
        const s = this.roomManager.walls[i.wallIndex], a = this.gameContext.assetManager.panels[i.panelIndex];
        if (!s || !a) return;
        const n = a.clone();
        n.userData.isPanel = true, n.userData.panelIndex = i.panelIndex, n.userData.gridX = i.gridX, n.userData.gridY = i.gridY;
        const l = this.dragHandler.getWallClippingPlanes(s);
        this.dragHandler.applyMaterialProperties(n, {
          transparent: false,
          opacity: 1,
          clippingPlanes: l,
          cloneMaterial: true
        }), i.color ? this.dragHandler.applyColor(n, i.color) : this.panelManager.globalPanelColor && this.dragHandler.applyColor(n, this.panelManager.globalPanelColor), s.add(n), Array.isArray(i.position) && n.position.fromArray(i.position), Array.isArray(i.quaternion) ? n.quaternion.fromArray(i.quaternion) : (n.rotation.set(0, 0, 0), n.rotateX(Math.PI / 2));
      }), e.ambientLight && (this.lightManager.ambientLight.intensity = Number((_a = e.ambientLight.intensity) != null ? _a : this.lightManager.ambientLight.intensity), e.ambientLight.color && this.lightManager.ambientLight.color.set(e.ambientLight.color)), (e.sideLights || []).filter((i) => !i.isRoomLight).forEach((i) => {
        var _a2, _b, _c, _d, _e2, _f, _g;
        const s = this.lightManager.addLightBulb({
          color: i.color || 16755302,
          intensity: Number((_a2 = i.intensity) != null ? _a2 : this.lightManager.defaultSideLightIntensity),
          distance: Number((_b = i.distance) != null ? _b : this.lightManager.defaultSideLightDistance),
          decay: Number((_c = i.decay) != null ? _c : 1.7)
        });
        s && (s.mesh.position.fromArray(i.position || s.mesh.position.toArray()), s.light.position.copy(s.mesh.position), s.light.color.set(i.color || "#ffaa66"), s.light.intensity = Number((_d = i.intensity) != null ? _d : s.light.intensity), s.light.distance = Number((_e2 = i.distance) != null ? _e2 : s.light.distance), s.light.decay = Number((_f = i.decay) != null ? _f : s.light.decay), s.mesh.visible = i.visible !== false, this.lightManager.setLightBulbEmissiveIntensity(s.mesh, Number((_g = i.emissiveIntensity) != null ? _g : this.lightManager.getLightBulbEmissiveIntensity(s.mesh))), this.lightManager.syncLightFixture(s.light));
      }), e.rug && this.rugManager.rug && (this.rugManager.updateRugTransform(Number(e.rug.width), Number(e.rug.depth), Number(e.rug.posX), Number(e.rug.posZ)), e.rug.color && this.rugManager.changeRugColor(e.rug.color)), e.table) {
        const i = this.addTable();
        i && (this.furnitureManager.selectFurniture(i), this.updateFurnitureRotation(Number(e.table.rotationStep || 0)), this.updateFurnitureTransform(Number(e.table.width), Number(e.table.depth), Number(e.table.posX), Number(e.table.posZ)));
      }
      if ((Array.isArray(e.tableLamps) ? e.tableLamps : e.lamp ? [
        e.lamp
      ] : []).forEach((i, s) => {
        const a = this.addTableLamp(s > 0);
        a && (this.selectTableLamp(a), this.updateTableLampTransform(Number(i.width), Number(i.height), Number(i.posX), Number(i.posY), Number(i.posZ)));
      }), (e.floorFurniture || []).forEach((i) => {
        const s = i.type === "sofa" ? this.addSofa() : i.type === "sofa2" ? this.addSofa2() : i.type === "table2" ? this.addTable2() : i.type === "chair" ? this.addChair() : i.type === "wardrobe" || i.type === "cabinet" ? this.addWardrobe() : null;
        s && (this.selectFurniture(s), this.updateFurnitureRotation(Number(i.rotationStep || 0)), this.updateFurnitureTransform(Number(i.width), Number(i.depth), Number(i.posX), Number(i.posZ)));
      }), e.wallTv) {
        const i = this.addWallTv();
        i && (this.selectWallTv(i), this.updateWallTvTransform(Number(e.wallTv.width), Number(e.wallTv.height), Number(e.wallTv.posX), Number(e.wallTv.posY), Number(e.wallTv.wallIndex || 0) + 1));
      }
      this.notifyPanelsChanged();
    }
    getPanelKitInfo() {
      const e = [
        0,
        0,
        0,
        0
      ];
      return this.panelManager.getAllPanels().forEach((t) => {
        const i = Number(t.userData.panelIndex);
        i >= 0 && i < e.length && (e[i] += 1);
      }), {
        counts: e,
        kits: Math.max(0, ...e)
      };
    }
    notifyPanelsChanged() {
      this.onPanelsChanged && this.onPanelsChanged(this.getPanelKitInfo());
    }
    setRoomColor(e, t) {
      this.roomManager.setRoomColor(e, t);
    }
    updateAnimations(e) {
      this.panelManager.updateAnimations(e);
    }
    startDrag(e, t) {
      this.isSceneLocked || (this.clearSelections(), this.dragHandler.startDrag(e, t));
    }
    randomRotate() {
      this.isSceneLocked || this.panelManager.randomRotate();
    }
    shufflePanelsOnWalls() {
      this.isSceneLocked || (this.clearSelections(), this.panelManager.shufflePanelsOnWalls());
    }
    addTable() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addTable());
    }
    deleteTable() {
      this.furnitureManager.deleteTable();
    }
    addSofa() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addSofa());
    }
    addSofa2() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addSofa2());
    }
    addTable2() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addTable2());
    }
    addChair() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addChair());
    }
    addWardrobe() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addWardrobe());
    }
    deleteSelectedFurniture() {
      this.furnitureManager.deleteSelectedFurniture();
    }
    addTableLamp(e = false) {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addTableLamp(e));
    }
    deleteTableLamp() {
      this.furnitureManager.deleteTableLamp();
    }
    addWallTv() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addWallTv());
    }
    deleteWallTv() {
      this.furnitureManager.deleteWallTv();
    }
    selectWallTv(e) {
      this.isSceneLocked || (this.clearSelections(), this.furnitureManager.selectWallTv(e));
    }
    deselectWallTv() {
      this.furnitureManager.deselectWallTv();
    }
    updateWallTvTransform(e, t, i, s, a) {
      this.furnitureManager.updateWallTvTransform(e, t, i, s, a);
    }
    selectTableLamp(e) {
      this.isSceneLocked || (this.clearSelections(), this.furnitureManager.selectLamp(e));
    }
    deselectTableLamp() {
      this.furnitureManager.deselectLamp();
    }
    updateTableLampTransform(e, t, i, s, a) {
      this.furnitureManager.updateLampTransform(e, t, i, s, a);
    }
    selectFurniture(e) {
      this.isSceneLocked || (this.clearSelections(), this.furnitureManager.selectFurniture(e));
    }
    deselectFurniture() {
      this.furnitureManager.deselectFurniture();
    }
    updateFurnitureTransform(e, t, i, s) {
      this.furnitureManager.updateFurnitureTransform(e, t, i, s);
    }
    updateFurnitureRotation(e) {
      this.furnitureManager.updateFurnitureRotation(e);
    }
    onPanelSelected(e) {
      this.selectPanel(e);
    }
    selectPanel(e) {
      this.isSceneLocked || (this.clearSelections(), this.panelManager.onPanelSelected(e));
    }
    selectLightBulb(e) {
      this.isSceneLocked || (this.clearSelections(), this.lightManager.selectLightBulb(e));
    }
    selectRug() {
      this.isSceneLocked || (this.clearSelections(), this.rugManager.selectRug());
    }
    clearSelections() {
      this.panelManager.deselectPanel(), this.lightManager.deselectLightBulb(), this.rugManager.deselectRug(), this.furnitureManager.deselectFurniture(), this.furnitureManager.deselectLamp(), this.furnitureManager.deselectWallTv();
    }
    setSceneLocked(e) {
      this.isSceneLocked = !!e, this.isSceneLocked && (this.clearSelections(), this.dragHandler.cancelDrag(), this.lightManager.stopDragLightBulb(), this.gameContext.controls && (this.gameContext.controls.enabled = true));
    }
    toggleSceneLock() {
      return this.setSceneLocked(!this.isSceneLocked), this.isSceneLocked;
    }
    deselectPanel() {
      this.clearSelections();
    }
    deselectLightBulb() {
      this.lightManager.deselectLightBulb();
    }
    deselectRug() {
      this.rugManager.deselectRug();
    }
    changeSelectedPanelColor(e) {
      this.panelManager.changeSelectedPanelColor(e);
    }
    rotateSelectedPanel(e) {
      this.panelManager.rotateSelectedPanel(e);
    }
    handleWallSelection(e) {
      this.roomManager.handleWallSelection(e);
    }
    setActiveWall(e) {
      this.roomManager.setActiveWall(e);
    }
    highlightActiveWall() {
      this.roomManager.highlightActiveWall();
    }
    toggleNet() {
      this.isSceneLocked || this.roomManager.toggleNet();
    }
    setAllWallsColor(e) {
      this.isSceneLocked || this.roomManager.setAllWallsColor(e);
    }
    setAllPanelsColor(e) {
      this.isSceneLocked || this.panelManager.setAllPanelsColor(e);
    }
    addSideLightBulb() {
      this.isSceneLocked || this.lightManager.addSideLightBulb();
    }
    toggleAllLightBulbMeshesVisible() {
      return this.isSceneLocked ? true : this.lightManager.toggleAllLightBulbMeshesVisible();
    }
    refreshLightBulbUI() {
      this.lightManager.refreshLightBulbUI();
    }
    startDragLightBulb(e, t) {
      this.lightManager.startDragLightBulb(e, t);
    }
    onPointerMoveLightBulb(e) {
      this.lightManager.onPointerMoveLightBulb(e);
    }
    stopDragLightBulb() {
      this.lightManager.stopDragLightBulb();
    }
    updateRugTransform(e, t, i, s) {
      this.rugManager.updateRugTransform(e, t, i, s);
    }
    changeRugColor(e) {
      this.rugManager.changeRugColor(e);
    }
    get walls() {
      return this.roomManager.walls;
    }
    get activeWallIndex() {
      return this.roomManager.activeWallIndex;
    }
    get floor() {
      return this.roomManager.floor;
    }
    get ceiling() {
      return this.roomManager.ceiling;
    }
    get ambientLight() {
      return this.lightManager.ambientLight;
    }
    get lightBulbs() {
      return this.lightManager.lightBulbs;
    }
    get selectedLightBulb() {
      return this.lightManager.selectedLightBulb;
    }
    get isDraggingLightBulb() {
      return this.lightManager.isDraggingLightBulb;
    }
    get rug() {
      return this.rugManager.rug;
    }
    get selectedRug() {
      return this.rugManager.selectedRug;
    }
    get selectedFurniture() {
      return this.furnitureManager.selectedFurniture;
    }
    get selectedPanel() {
      return this.panelManager.selectedPanel;
    }
    get animatingPanels() {
      return this.panelManager.animatingPanels;
    }
    get globalPanelColor() {
      return this.panelManager.globalPanelColor;
    }
    get isNetVisible() {
      return this.roomManager.isNetVisible;
    }
    get furnitureItems() {
      return this.furnitureManager.furnitureItems;
    }
  }
  class nt {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.wallControllers = [], this.rendererControllers = [], this.ambientControllers = [], this.ceilingControllers = [], this.init();
    }
    init() {
      this.gameContext.gui && (this.wallFolder = this.gameContext.gui.addFolder("\u0421\u0435\u0442\u043A\u0430"), this.rendererFolder = this.gameContext.gui.addFolder("\u0420\u0435\u043D\u0434\u0435\u0440"), this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442 \u043A\u043E\u043C\u043D\u0430\u0442\u044B"), this.presetsFolder = this.lightFolder.addFolder("\u041F\u0440\u0435\u0441\u0435\u0442\u044B"), this.ambientFolder = this.lightFolder.addFolder("\u0424\u043E\u043D\u043E\u0432\u044B\u0439 \u0441\u0432\u0435\u0442"), this.ceilingFolder = this.lightFolder.addFolder("\u041F\u043E\u0442\u043E\u043B\u043E\u0447\u043D\u044B\u0439 \u0441\u0432\u0435\u0442"), this.ceilingPositionFolder = this.ceilingFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), this.ceilingBeamFolder = this.ceilingFolder.addFolder("\u041B\u0443\u0447"), this.ceilingTargetFolder = this.ceilingFolder.addFolder("\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"), this.ceilingShadowFolder = this.ceilingFolder.addFolder("\u0422\u0435\u043D\u0438"), [
        this.wallFolder,
        this.rendererFolder,
        this.lightFolder,
        this.presetsFolder,
        this.ambientFolder,
        this.ceilingFolder,
        this.ceilingPositionFolder,
        this.ceilingBeamFolder,
        this.ceilingTargetFolder,
        this.ceilingShadowFolder
      ].forEach((e) => e.close()), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh(), this.refreshLight());
    }
    refresh() {
      var _a, _b;
      if (!this.wallFolder) return;
      this.wallControllers.forEach((i) => i.destroy()), this.wallControllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) {
        const i = {
          message: "\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0435\u043D\u0443"
        }, s = this.wallFolder.add(i, "message").name(" ");
        (_a = s.disable) == null ? void 0 : _a.call(s), this.wallControllers.push(s);
        return;
      }
      const t = e.userData.gridTexture;
      if (!t) {
        const i = {
          message: "\u0412\u044B\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0435\u043D\u0443"
        }, s = this.wallFolder.add(i, "message").name(" ");
        (_b = s.disable) == null ? void 0 : _b.call(s), this.wallControllers.push(s);
        return;
      }
      this.wallControllers.push(this.wallFolder.add(t.offset, "x", 0, 1, 0.01).name("\u0421\u0434\u0432\u0438\u0433 X").listen(), this.wallFolder.add(t.offset, "y", 0, 1, 0.01).name("\u0421\u0434\u0432\u0438\u0433 Y").listen());
    }
    refreshLight() {
      this.lightFolder && (this.refreshRendererControls(), this.refreshPresetControls(), this.refreshAmbient(), this.refreshCeilingControls());
    }
    refreshPresetControls() {
      if (!this.presetsFolder) return;
      this.presetControllers && this.presetControllers.forEach((t) => t.destroy());
      const e = {
        day: () => {
          this.sceneClass.lightManager.applyLightingPreset("day"), this.refreshLight();
        },
        evening: () => {
          this.sceneClass.lightManager.applyLightingPreset("evening"), this.refreshLight();
        },
        night: () => {
          this.sceneClass.lightManager.applyLightingPreset("night"), this.refreshLight();
        }
      };
      this.presetControllers = [
        this.presetsFolder.add(e, "day").name("\u0414\u0435\u043D\u044C"),
        this.presetsFolder.add(e, "evening").name("\u0412\u0435\u0447\u0435\u0440"),
        this.presetsFolder.add(e, "night").name("\u041D\u043E\u0447\u044C")
      ];
    }
    refreshRendererControls() {
      if (!this.rendererFolder) return;
      this.rendererControllers.forEach((i) => i.destroy()), this.rendererControllers = [];
      const e = this.gameContext.renderer;
      if (!e) return;
      const t = {
        exposure: e.toneMappingExposure,
        shadowsEnabled: e.shadowMap.enabled
      };
      this.rendererControllers.push(this.rendererFolder.add(t, "exposure", 0.2, 1.6, 0.01).name("\u042D\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0438\u044F").onChange((i) => {
        e.toneMappingExposure = i;
      }), this.rendererFolder.add(t, "shadowsEnabled").name("\u0422\u0435\u043D\u0438").onChange((i) => {
        e.shadowMap.enabled = i;
      }));
    }
    refreshAmbient() {
      if (!this.ambientFolder) return;
      this.ambientControllers.forEach((i) => i.destroy()), this.ambientControllers = [];
      const e = this.sceneClass.ambientLight;
      if (!e) return;
      const t = {
        color: "#" + e.color.getHexString()
      };
      this.ambientControllers.push(this.ambientFolder.add(e, "intensity", 0, 2, 0.01).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.ambientFolder.addColor(t, "color").name("\u0426\u0432\u0435\u0442").onChange((i) => {
        e.color.set(i);
      }));
    }
    refreshCeilingControls() {
      if (!this.ceilingFolder) return;
      this.ceilingControllers.forEach((a) => a.destroy()), this.ceilingControllers = [];
      const e = this.sceneClass.lightManager.getRoomLights(), t = e.ceilingSpotLight, i = e.ceilingSpotTarget;
      if (!t || !i) return;
      const s = {
        color: "#" + t.color.getHexString(),
        castShadow: t.castShadow,
        shadowMapSize: t.shadow.mapSize.x,
        shadowBias: t.shadow.bias,
        shadowNormalBias: t.shadow.normalBias,
        targetX: i.position.x,
        targetY: i.position.y,
        targetZ: i.position.z
      };
      this.ceilingControllers.push(this.ceilingPositionFolder.add(t.position, "x", -4, 4, 0.01).name("X").listen(), this.ceilingPositionFolder.add(t.position, "y", -4, 4, 0.01).name("Y").listen(), this.ceilingPositionFolder.add(t.position, "z", -4, 4, 0.01).name("Z").listen(), this.ceilingFolder.add(t, "intensity", 0, 120, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").onChange(() => {
        this.sceneClass.lightManager.syncLightFixture(t);
      }).listen(), this.ceilingFolder.add(t, "distance", 0, 30, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.ceilingFolder.add(t, "decay", 0, 4, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen(), this.ceilingFolder.addColor(s, "color").name("\u0426\u0432\u0435\u0442").onChange((a) => {
        t.color.set(a), this.sceneClass.lightManager.syncLightFixture(t);
      }), this.ceilingBeamFolder.add(t, "angle", 0.1, Math.PI / 1.5, 1e-3).name("\u0423\u0433\u043E\u043B").listen(), this.ceilingBeamFolder.add(t, "penumbra", 0, 1, 0.01).name("\u041C\u044F\u0433\u043A\u043E\u0441\u0442\u044C").listen(), this.ceilingTargetFolder.add(s, "targetX", -4, 4, 0.01).name("X").onChange((a) => {
        i.position.x = a;
      }), this.ceilingTargetFolder.add(s, "targetY", -4, 4, 0.01).name("Y").onChange((a) => {
        i.position.y = a;
      }), this.ceilingTargetFolder.add(s, "targetZ", -4, 4, 0.01).name("Z").onChange((a) => {
        i.position.z = a;
      }), this.ceilingShadowFolder.add(s, "castShadow").name("\u041E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0442\u044C").onChange((a) => {
        t.castShadow = a;
      }), this.ceilingShadowFolder.add(s, "shadowMapSize", [
        512,
        1024,
        2048,
        4096
      ]).name("\u0420\u0430\u0437\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B").onChange((a) => {
        const n = Number(a);
        t.shadow.mapSize.set(n, n), t.shadow.needsUpdate = true;
      }), this.ceilingShadowFolder.add(s, "shadowBias", -0.01, 0.01, 1e-5).name("\u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435").onChange((a) => {
        t.shadow.bias = a;
      }), this.ceilingShadowFolder.add(s, "shadowNormalBias", 0, 0.2, 1e-3).name("\u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u043E\u0440\u043C\u0430\u043B\u0438").onChange((a) => {
        t.shadow.normalBias = a;
      }));
    }
    kelvinToHex(e) {
      const t = e / 100;
      let i, s, a;
      t <= 66 ? (i = 255, s = 99.4708025861 * Math.log(t) - 161.1195681661, a = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307) : (i = 329.698727446 * Math.pow(t - 60, -0.1332047592), s = 288.1221695283 * Math.pow(t - 60, -0.0755148492), a = 255);
      const n = (o) => Math.min(255, Math.max(0, o));
      return i = n(i), s = n(s), a = n(a), "#" + new Ye(i / 255, s / 255, a / 255).getHexString();
    }
  }
  class rt {
    constructor(e) {
      var _a;
      this.gameContext = e, this.loader = new qe(), this.worldScale = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1, this.basePanelCellSize = 0.5, this.basePanelGap = -2e-3, this.panelTargetSize = this.basePanelCellSize * this.worldScale - this.basePanelGap, this.panels = [], this.furniture = {
        table: null,
        tableLamp: null,
        tv: null,
        sofa: null,
        sofa2: null,
        table2: null,
        chair: null,
        wardrobe: null
      }, this.panelUrls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      await Promise.all([
        this.loadPanels(),
        this.loadFurniture()
      ]);
    }
    async loadPanels() {
      const e = new j(0.49, 0.49), t = this.panelUrls.map((i, s) => this.loader.loadAsync(i).then((a) => {
        const n = a.scene.children[0];
        n.name = "panelTemplate_".concat(s);
        const l = [];
        n.traverse((p) => {
          p.isMesh && (p.geometry && !p.geometry.attributes.normal && p.geometry.computeVertexNormals(), p.scale.set(1, 2, 1), l.push(p));
        }), n.updateMatrixWorld(true);
        const r = new q().setFromObject(n).getSize(new f()), c = [
          r.x,
          r.y,
          r.z
        ].filter((p) => p > 0).sort((p, y) => y - p), g = c[1] || c[0] || 1, d = this.panelTargetSize / g;
        return n.scale.multiplyScalar(d), l.forEach((p) => {
          const y = p.material, x = Array.isArray(y) ? y : [
            y
          ];
          p.material = x.map((v) => {
            var _a;
            const w = new ye({
              color: 9548181,
              map: (v == null ? void 0 : v.map) || null,
              normalMap: (v == null ? void 0 : v.normalMap) || null,
              roughnessMap: (v == null ? void 0 : v.roughnessMap) || null,
              metalnessMap: (v == null ? void 0 : v.metalnessMap) || null,
              aoMap: (v == null ? void 0 : v.aoMap) || null,
              displacementMap: (v == null ? void 0 : v.displacementMap) || null,
              alphaMap: (v == null ? void 0 : v.alphaMap) || null,
              transparent: (v == null ? void 0 : v.transparent) || false,
              opacity: (_a = v == null ? void 0 : v.opacity) != null ? _a : 1,
              roughness: 0.94,
              side: F
            });
            return w.map && (w.map.colorSpace = T, w.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy()), [
              w.normalMap,
              w.roughnessMap,
              w.metalnessMap,
              w.aoMap,
              w.displacementMap,
              w.alphaMap
            ].forEach((A) => {
              A && (A.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy());
            }), w;
          }), Array.isArray(y) || (p.material = p.material[0]), p.castShadow = false, p.receiveShadow = true;
          const C = Array.isArray(p.material) ? p.material[0].clone() : p.material.clone(), M = new L(e, C);
          M.position.y = 5e-4, M.rotation.x = -Math.PI / 2;
        }), n;
      }));
      this.panels = await Promise.all(t);
    }
    async loadFurniture() {
      const [e, t, i] = await Promise.all([
        this.loader.loadAsync("models/mebel/table.gltf"),
        this.loader.loadAsync("models/mebel/lampgltf.gltf"),
        this.loader.loadAsync("models/mebel/tv.gltf")
      ]);
      e.scene.scale.multiplyScalar(this.worldScale), t.scene.scale.multiplyScalar(this.worldScale), i.scene.scale.multiplyScalar(this.worldScale), this.furniture.table = e.scene, this.furniture.tableLamp = t.scene, this.furniture.tv = i.scene, await Promise.all([
        this.loadOptionalFurniture("sofa", "models/mebel/sofa.gltf"),
        this.loadOptionalFurniture("sofa2", "models/mebel/sofa2.gltf"),
        this.loadOptionalFurniture("table2", "models/mebel/table2.gltf"),
        this.loadOptionalFurniture("chair", "models/mebel/chair.gltf"),
        this.loadOptionalFurniture("wardrobe", "models/mebel/wardrobe.gltf")
      ]);
    }
    async loadOptionalFurniture(e, t) {
      try {
        const i = await this.loader.loadAsync(t);
        i.scene.scale.multiplyScalar(this.worldScale), this.furniture[e] = i.scene;
      } catch (i) {
        console.warn("\u041C\u043E\u0434\u0435\u043B\u044C ".concat(t, " \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"), i);
      }
    }
  }
  class ot {
    constructor(e) {
      this.camera = e.camera, this.controls = e.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new f(), this.forward = new f(), this.right = new f(), window.addEventListener("keydown", (t) => {
        (t.code === "KeyW" || t.code === "KeyA" || t.code === "KeyS" || t.code === "KeyD") && (this.keys[t.code] = true);
      }), window.addEventListener("keyup", (t) => {
        this.keys[t.code] = false;
      });
    }
    update(e) {
      if (!(!this.controls || !this.controls.enabled)) {
        if (this.controls.target, this.keys.KeyW || this.keys.KeyS) {
          const t = this.keys.KeyW ? 1 : -1;
          this.camera.getWorldDirection(this.forward), this.forward.y = 0, this.forward.normalize();
          const i = t * this.dollySpeed * e;
          this.camera.position.addScaledVector(this.forward, i);
        }
        if (this.keys.KeyA || this.keys.KeyD) {
          const t = this.keys.KeyD ? 1 : -1;
          this.camera.getWorldDirection(this.forward), this.forward.y = 0, this.forward.normalize(), this.right.crossVectors(this.forward, this.camera.up).normalize();
          const i = t * this.strafeSpeed * e;
          this.camera.position.addScaledVector(this.right, i);
        }
      }
    }
  }
  class lt {
    constructor(e) {
      this.gameContext = e, this.mode = "2d", this.board = null, this.emptyState = null, this.root = null, this.items = [], this.selectedItem = null, this.draggingItem = null, this.dragOffsetX = 0, this.dragOffsetY = 0, this.gridVisible = true, this.nextItemId = 1, this.tileSize = 140, this.snapThreshold = 24, this.globalPanelColor = null, this.onPanelsChanged = null, this.panelImages = [
        "images/panels/panel_1.png",
        "images/panels/panel_2.png",
        "images/panels/panel_3.png",
        "images/panels/panel_4.png"
      ], this.handlePointerMove = this.handlePointerMove.bind(this), this.handlePointerUp = this.handlePointerUp.bind(this), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleResize = this.handleResize.bind(this);
    }
    init() {
      this.root = document.getElementById("panel-2d-app"), this.board = document.getElementById("panel-2d-board"), this.emptyState = document.getElementById("panel-2d-empty"), !(!this.root || !this.board) && (this.updateBoardMetrics(), this.board.addEventListener("pointerdown", (e) => {
        (e.target === this.board || e.target === this.emptyState) && this.deselectPanel();
      }), window.addEventListener("keydown", this.handleKeyDown), window.addEventListener("resize", this.handleResize));
    }
    show() {
      this.root || this.init(), this.root && (this.root.style.display = "block"), this.refreshEmptyState();
    }
    hide() {
      this.root && (this.root.style.display = "none"), this.deselectPanel();
    }
    handleResize() {
      this.updateBoardMetrics();
    }
    startPaletteDrag(e, t) {
      if (!this.board) return;
      const { x: i, y: s } = this.getBoardPoint(t.clientX, t.clientY), a = this.addPanel(e, i - this.tileSize / 2, s - this.tileSize / 2);
      this.selectPanel(a), this.startDraggingItem(a, t, this.tileSize / 2, this.tileSize / 2);
    }
    addPanel(e, t, i, s = 0) {
      const a = document.createElement("div");
      a.className = "panel-2d-item", a.dataset.id = String(this.nextItemId++);
      const n = document.createElement("img");
      return n.src = this.panelImages[e], n.alt = "Panel ".concat(e + 1), a.appendChild(n), a.userData = {
        panelIndex: e,
        x: 0,
        y: 0,
        rotation: s,
        color: null
      }, a.addEventListener("pointerdown", (l) => {
        l.stopPropagation(), this.selectPanel(a);
        const o = a.getBoundingClientRect();
        this.startDraggingItem(a, l, l.clientX - o.left, l.clientY - o.top);
      }), this.board.appendChild(a), this.items.push(a), this.setItemPosition(a, t, i), this.setItemRotation(a, s), this.globalPanelColor && this.setItemColor(a, this.globalPanelColor), this.refreshEmptyState(), this.notifyPanelsChanged(), a;
    }
    startDraggingItem(e, t, i, s) {
      this.draggingItem = e, this.dragOffsetX = i, this.dragOffsetY = s, window.addEventListener("pointermove", this.handlePointerMove), window.addEventListener("pointerup", this.handlePointerUp), t.cancelable && t.preventDefault();
    }
    handlePointerMove(e) {
      if (!this.draggingItem) return;
      const { x: t, y: i } = this.getBoardPoint(e.clientX, e.clientY);
      this.setItemPosition(this.draggingItem, t - this.dragOffsetX, i - this.dragOffsetY);
    }
    handlePointerUp() {
      this.draggingItem = null, window.removeEventListener("pointermove", this.handlePointerMove), window.removeEventListener("pointerup", this.handlePointerUp);
    }
    handleKeyDown(e) {
      var _a;
      ((_a = this.root) == null ? void 0 : _a.style.display) !== "none" && (e.key !== "Delete" && e.key !== "Backspace" || this.selectedItem && (e.preventDefault(), this.deleteSelectedPanel()));
    }
    getBoardPoint(e, t) {
      const i = this.board.getBoundingClientRect();
      return {
        x: e - i.left,
        y: t - i.top
      };
    }
    clampPosition(e, t) {
      const i = Math.max(0, this.board.clientWidth - this.tileSize), s = Math.max(0, this.board.clientHeight - this.tileSize);
      return {
        x: Math.min(Math.max(0, e), i),
        y: Math.min(Math.max(0, t), s)
      };
    }
    updateBoardMetrics() {
      if (!this.board) return;
      const e = this.tileSize, t = this.board.clientWidth || window.innerWidth, i = this.board.clientHeight || window.innerHeight, s = Math.min(t, i), a = window.innerWidth <= 600, n = Math.floor(t / (a ? 6.2 : 3)), r = Math.max(a ? 48 : 82, Math.min(a ? 64 : 140, n, Math.round(s * (a ? 0.135 : 0.26))));
      this.tileSize = r, this.snapThreshold = Math.max(12, Math.round(this.tileSize * 0.18)), this.board.style.setProperty("--panel-tile-size", "".concat(this.tileSize, "px")), !(!this.items.length || e === this.tileSize) && this.items.forEach((c) => {
        const g = Math.round(c.userData.x / e) * this.tileSize, d = Math.round(c.userData.y / e) * this.tileSize;
        this.setItemPosition(c, g, d);
      });
    }
    getSnapCandidates(e, t) {
      const s = [
        0,
        t === "x" ? Math.max(0, this.board.clientWidth - this.tileSize) : Math.max(0, this.board.clientHeight - this.tileSize)
      ];
      return this.items.forEach((a) => {
        if (a === e) return;
        const n = t === "x" ? a.userData.x : a.userData.y;
        s.push(n), s.push(n - this.tileSize), s.push(n + this.tileSize);
      }), s;
    }
    snapValue(e, t, i) {
      const s = Math.round(i / this.tileSize) * this.tileSize, a = [
        ...this.getSnapCandidates(e, t),
        s
      ];
      let n = i, l = this.snapThreshold;
      return a.forEach((o) => {
        const r = Math.abs(o - i);
        r <= l && (l = r, n = o);
      }), n;
    }
    setItemPosition(e, t, i) {
      const s = this.snapValue(e, "x", t), a = this.snapValue(e, "y", i), n = this.clampPosition(s, a);
      e.userData.x = n.x, e.userData.y = n.y, e.style.left = "".concat(n.x, "px"), e.style.top = "".concat(n.y, "px");
    }
    setItemRotation(e, t) {
      e.userData.rotation = t, e.style.transform = "rotate(".concat(t, "deg)");
    }
    selectPanel(e) {
      this.selectedItem !== e && (this.deselectPanel(), this.selectedItem = e, e.classList.add("selected"), O("#selection-ui"));
    }
    deselectPanel() {
      this.selectedItem && this.selectedItem.classList.remove("selected"), this.selectedItem = null, z("#selection-ui");
    }
    deleteSelectedPanel() {
      if (!this.selectedItem) return;
      const e = this.selectedItem;
      this.deselectPanel(), this.items = this.items.filter((t) => t !== e), e.remove(), this.refreshEmptyState(), this.notifyPanelsChanged();
    }
    rotateSelectedPanel(e) {
      if (!this.selectedItem) return;
      const t = Math.round(e * 180 / Math.PI), i = this.selectedItem.userData.rotation + t;
      this.setItemRotation(this.selectedItem, i);
    }
    randomRotate() {
      this.items.forEach((e) => {
        const t = [
          0,
          90,
          180,
          270
        ][Math.floor(Math.random() * 4)];
        this.setItemRotation(e, t);
      });
    }
    shufflePanelsOnWalls() {
      if (this.items.length < 2) return;
      const e = this.items.map((t) => ({
        x: t.userData.x,
        y: t.userData.y
      }));
      for (let t = e.length - 1; t > 0; t--) {
        const i = Math.floor(Math.random() * (t + 1)), s = e[t];
        e[t] = e[i], e[i] = s;
      }
      this.items.forEach((t, i) => {
        const s = e[i];
        this.setItemPosition(t, s.x, s.y);
      });
    }
    toggleNet() {
      this.gridVisible = !this.gridVisible, this.board.classList.toggle("grid-hidden", !this.gridVisible);
    }
    setItemColor(e, t) {
      e.userData.color = t, e.style.setProperty("--panel-color-overlay", this.toPanelOverlayColor(t));
    }
    toPanelOverlayColor(e) {
      if (typeof e != "string" || !e.startsWith("#")) return e;
      const t = e.slice(1), i = t.length === 3 ? t.split("").map((o) => o + o).join("") : t, s = Number.parseInt(i, 16);
      if (Number.isNaN(s)) return e;
      const a = s >> 16 & 255, n = s >> 8 & 255, l = s & 255;
      return "rgb(".concat(a, " ").concat(n, " ").concat(l, " / 40%)");
    }
    changeSelectedPanelColor(e) {
      this.selectedItem && this.setItemColor(this.selectedItem, e);
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.items.forEach((t) => this.setItemColor(t, e));
    }
    getSceneState() {
      return {
        version: 1,
        mode: "2d",
        gridVisible: this.gridVisible,
        globalPanelColor: this.globalPanelColor,
        panels: this.items.map((e) => ({
          panelIndex: e.userData.panelIndex,
          x: e.userData.x,
          y: e.userData.y,
          rotation: e.userData.rotation,
          color: e.userData.color
        }))
      };
    }
    applySceneState(e) {
      if (!e || typeof e != "object" || !Array.isArray(e.panels)) throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 2D \u0441\u0446\u0435\u043D\u044B");
      this.clearPanels(), this.gridVisible = e.gridVisible !== false, this.globalPanelColor = e.globalPanelColor || null, this.board.classList.toggle("grid-hidden", !this.gridVisible), e.panels.forEach((t) => {
        const i = this.addPanel(Number(t.panelIndex) || 0, Number(t.x) || 0, Number(t.y) || 0, Number(t.rotation) || 0);
        t.color && this.setItemColor(i, t.color);
      }), this.notifyPanelsChanged();
    }
    clearPanels() {
      this.deselectPanel(), this.items.forEach((e) => e.remove()), this.items = [], this.refreshEmptyState(), this.notifyPanelsChanged();
    }
    getPanelKitInfo() {
      const e = [
        0,
        0,
        0,
        0
      ];
      return this.items.forEach((t) => {
        const i = Number(t.userData.panelIndex);
        i >= 0 && i < e.length && (e[i] += 1);
      }), {
        counts: e,
        kits: Math.max(0, ...e)
      };
    }
    notifyPanelsChanged() {
      this.onPanelsChanged && this.onPanelsChanged(this.getPanelKitInfo());
    }
    refreshEmptyState() {
      this.emptyState && (this.emptyState.style.display = this.items.length ? "none" : "flex");
    }
  }
  console.clear();
  const h = {};
  h.clock = new je();
  h.sceneConfig = {
    worldScale: 1
  };
  h.appMode = null;
  const fe = "room-configurator-scene-state", be = "room-configurator-scene-library", ct = [
    "#random_rotate",
    "#random_shuffle",
    "#toglle_net",
    "#add-light-bulb",
    "#toggle-light-bulb-visuals",
    "#add-table",
    "#add-sofa",
    "#add-sofa2",
    "#add-table2",
    "#add-chair",
    "#add-wardrobe",
    "#add-table-lamp",
    "#add-table-lamp-2",
    "#add-wall-tv",
    "#wall-color-picker",
    "#panel-global-color-picker",
    "#btn-apply-panel-global-color",
    "[data-panel-preset-color]",
    "#btn-rot-left",
    "#btn-rot-right",
    "#btn-all-color",
    "#btn-delete-2d-panel",
    "#panel-color-picker",
    "#light-color-picker",
    "#light-kelvin",
    "#light-intensity",
    "#light-distance",
    "#light-decay",
    "#bulb-emissive",
    "#bulb-visible",
    "#btn-delete-light",
    "#rug-color-picker",
    "#rug-width",
    "#rug-depth",
    "#rug-pos-x",
    "#rug-pos-z",
    "#furniture-width",
    "#furniture-depth",
    "#furniture-pos-x",
    "#furniture-pos-z",
    "#furniture-rotation",
    "#btn-delete-furniture",
    "#table-lamp-width",
    "#table-lamp-height",
    "#table-lamp-pos-x",
    "#table-lamp-pos-y",
    "#table-lamp-pos-z",
    "#btn-delete-table-lamp-ui",
    "#wall-tv-width",
    "#wall-tv-height",
    "#wall-tv-pos-x",
    "#wall-tv-pos-y",
    "#wall-tv-wall",
    "#btn-delete-wall-tv-ui"
  ];
  gt();
  mt();
  async function ht() {
    try {
      await dt(), await ut(), Et();
    } catch (u) {
      console.error("Init error", u);
    }
  }
  async function dt() {
    h.gui = new Ve({
      title: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"
    }), h.initClass = new _e(h), h.scene = h.initClass.scene, h.camera = h.initClass.camera, h.renderer = h.initClass.renderer, h.assetManager = new rt(h), h.sceneClass = new at(h), h.keyboardOrbitMove = new ot(h), Se(), h.renderer.localClippingEnabled = true, h.guiClass = new nt(h);
  }
  async function ut() {
    var _a, _b;
    await h.assetManager.loadModels(), St(), Mt(), vt(), It(), Ct(), h.sceneClass.createScene(), h.sceneClass.onPanelsChanged = H, H(), h.guiClass && (h.guiClass.refresh(), h.guiClass.refreshLight(), (_b = (_a = h.guiClass).refreshAmbient) == null ? void 0 : _b.call(_a));
  }
  function gt() {
    wt(), bt(), ft(), Lt(), pt();
  }
  function mt() {
    const u = document.getElementById("app-mode-modal"), e = document.getElementById("btn-start-3d"), t = document.getElementById("btn-start-2d");
    if (!u || !e || !t) return;
    const i = () => {
      u.style.display = "none";
    };
    e.onclick = async () => {
      i(), document.body.classList.remove("mode-2d"), h.appMode = "3d", await ht();
    }, t.onclick = () => {
      i(), document.body.classList.add("mode-2d"), h.appMode = "2d", h.panel2dApp = new lt(h), h.panel2dApp.onPanelsChanged = H, h.panel2dApp.init(), h.panel2dApp.show(), H();
    };
  }
  function pt() {
    const u = document.getElementById("about-app-modal"), e = document.getElementById("btn-about-app"), t = document.getElementById("btn-close-about-app"), i = document.getElementById("about-app-backdrop");
    if (!u || !e) return;
    const s = () => {
      u.style.display = "block";
    }, a = () => {
      u.style.display = "none";
    };
    e.onclick = s, t && (t.onclick = a), i && (i.onclick = a);
  }
  function P() {
    return h.appMode === "2d" ? h.panel2dApp || null : h.sceneClass || null;
  }
  function H(u = null) {
    var _a, _b, _c;
    const e = document.getElementById("panel-kit-count");
    if (!e) return;
    const t = u || ((_b = (_a = P()) == null ? void 0 : _a.getPanelKitInfo) == null ? void 0 : _b.call(_a));
    e.textContent = String((_c = t == null ? void 0 : t.kits) != null ? _c : 0);
  }
  function ft() {
    for (let u = 1; u <= 4; u++) {
      const e = document.querySelector(".panel".concat(u));
      e && e.addEventListener("pointerdown", (t) => {
        var _a, _b;
        if (t.preventDefault(), h.appMode === "2d") {
          (_a = h.panel2dApp) == null ? void 0 : _a.startPaletteDrag(u - 1, t);
          return;
        }
        (_b = h.sceneClass) == null ? void 0 : _b.startDrag(u - 1, t);
      });
    }
  }
  function bt() {
    const u = document.getElementById("btn-scene-lock");
    u && (u.onclick = () => {
      var _a, _b;
      const d = ((_b = (_a = h.sceneClass) == null ? void 0 : _a.toggleSceneLock) == null ? void 0 : _b.call(_a)) || false;
      Se(d);
    }), document.getElementById("random_rotate").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.randomRotate) == null ? void 0 : _b.call(_a);
    }, document.getElementById("random_shuffle").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.shufflePanelsOnWalls) == null ? void 0 : _b.call(_a), H();
    }, document.getElementById("toglle_net").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.toggleNet) == null ? void 0 : _b.call(_a);
    };
    const e = document.getElementById("add-light-bulb");
    e && (e.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addSideLightBulb();
    });
    const t = document.getElementById("toggle-light-bulb-visuals");
    t && (t.onclick = () => {
      var _a, _b;
      const d = (_b = (_a = h.sceneClass) == null ? void 0 : _a.toggleAllLightBulbMeshesVisible) == null ? void 0 : _b.call(_a);
      yt(d);
    });
    const i = document.getElementById("add-table");
    i && (i.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTable();
    });
    const s = document.getElementById("add-sofa");
    s && (s.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addSofa();
    });
    const a = document.getElementById("add-sofa2");
    a && (a.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addSofa2();
    });
    const n = document.getElementById("add-table2");
    n && (n.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTable2();
    });
    const l = document.getElementById("add-chair");
    l && (l.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addChair();
    });
    const o = document.getElementById("add-wardrobe");
    o && (o.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addWardrobe();
    });
    const r = document.getElementById("add-table-lamp");
    r && (r.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTableLamp();
    });
    const c = document.getElementById("add-table-lamp-2");
    c && (c.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTableLamp(true);
    });
    const g = document.getElementById("add-wall-tv");
    g && (g.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addWallTv();
    });
  }
  function yt(u = null) {
    var _a, _b;
    const e = document.getElementById("toggle-light-bulb-visuals");
    if (!e) return;
    const t = u != null ? u : !!((_b = (_a = h.sceneClass) == null ? void 0 : _a.lightManager) == null ? void 0 : _b.areLightBulbMeshesVisible), i = e.querySelector(".btn-text");
    e.firstChild.textContent = t ? "\u{1F648} " : "\u{1F441} ", i && (i.textContent = t ? "\u0421\u043A\u0440\u044B\u0442\u044C \u043B\u0430\u043C\u043F\u043E\u0447\u043A\u0438" : "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043B\u0430\u043C\u043F\u043E\u0447\u043A\u0438");
  }
  function Se(u = null) {
    var _a;
    const e = u != null ? u : !!((_a = h.sceneClass) == null ? void 0 : _a.isSceneLocked), t = document.getElementById("btn-scene-lock"), i = document.getElementById("bottom_panel");
    document.body.classList.toggle("scene-locked", e), i && (i.classList.toggle("closed", e), e && i.classList.remove("compact")), t && (t.textContent = e ? "\u{1F512}" : "\u{1F513}", t.title = e ? "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B" : "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B", t.setAttribute("aria-pressed", String(e)), t.classList.toggle("active", e)), document.querySelectorAll(ct.join(",")).forEach((s) => {
      s.disabled = e, s.classList.toggle("scene-lock-disabled", e);
    });
  }
  function wt() {
    document.getElementById("btn-rot-left").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, -Math.PI / 2);
    };
    const u = document.getElementById("panel-color-picker");
    u && u.addEventListener("input", (a) => {
      var _a;
      h.appMode === "3d" && ((_a = h.sceneClass) == null ? void 0 : _a.changeSelectedPanelColor(a.target.value));
    }), document.getElementById("btn-close-sel").onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.deselectPanel) == null ? void 0 : _b.call(_a);
    };
    const e = document.getElementById("btn-delete-2d-panel");
    e && (e.onclick = () => {
      var _a, _b;
      (_b = (_a = P()) == null ? void 0 : _a.deleteSelectedPanel) == null ? void 0 : _b.call(_a), H();
    }), document.getElementById("btn-all-color").onclick = () => {
      var _a, _b;
      const a = document.getElementById("panel-color-picker");
      a && ((_b = (_a = P()) == null ? void 0 : _a.setAllPanelsColor) == null ? void 0 : _b.call(_a, a.value), Me(a.value));
    };
    const t = document.getElementById("wall-color-picker");
    t && t.addEventListener("input", (a) => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.setAllWallsColor(a.target.value), ve("wall-color-preview", a.target.value);
    });
    const i = document.getElementById("panel-global-color-picker");
    i && i.addEventListener("input", (a) => {
      ce(a.target.value);
    });
    const s = document.getElementById("btn-apply-panel-global-color");
    s && (s.onclick = () => {
      const a = document.getElementById("panel-global-color-picker");
      a && ce(a.value);
    }), document.querySelectorAll("[data-panel-preset-color]").forEach((a) => {
      a.addEventListener("click", () => {
        ce(a.dataset.panelPresetColor);
      });
    });
  }
  function ce(u) {
    var _a, _b;
    (_b = (_a = P()) == null ? void 0 : _a.setAllPanelsColor) == null ? void 0 : _b.call(_a, u), Me(u), xt(u), ve("panel-global-color-preview", u);
  }
  function Me(u) {
    const e = document.getElementById("panel-global-color-picker");
    e && (e.value = u);
  }
  function xt(u) {
    const e = document.getElementById("panel-color-picker");
    e && (e.value = u);
  }
  function ve(u, e) {
    const t = document.getElementById(u);
    t && t.style.setProperty("--preview-color", e);
  }
  function St() {
    var _a;
    if (!document.getElementById("light-selection-ui")) return;
    const e = ((_a = h.sceneConfig) == null ? void 0 : _a.worldScale) || 1, i = 18 * (e * e), s = 6 * e, a = document.getElementById("light-intensity");
    a && (a.max = String(Math.max(i * 4, 50)), a.value = String(i));
    const n = document.getElementById("light-distance");
    n && (n.max = String(Math.max(s * 3, 20)), n.value = String(s));
    const l = () => {
      const o = h.sceneClass.selectedLightBulb;
      if (!o) return null;
      const r = o.userData.light;
      return r ? {
        bulbMesh: o,
        pointLight: r
      } : null;
    };
    document.getElementById("btn-close-light").onclick = () => {
      h.sceneClass.deselectLightBulb();
    }, document.getElementById("light-color-picker").addEventListener("input", (o) => {
      const r = l();
      r && (r.pointLight.color.set(o.target.value), h.sceneClass.lightManager.syncLightFixture(r.pointLight));
    }), document.getElementById("light-kelvin").addEventListener("input", (o) => {
      const r = l();
      if (!r) return;
      const c = Number(o.target.value), g = h.guiClass.kelvinToHex(c);
      r.pointLight.color.set(g), h.sceneClass.lightManager.syncLightFixture(r.pointLight);
      const d = document.getElementById("light-color-picker");
      d && (d.value = "#" + r.pointLight.color.getHexString());
    }), document.getElementById("light-intensity").addEventListener("input", (o) => {
      const r = l();
      r && (r.pointLight.intensity = Number(o.target.value), h.sceneClass.lightManager.syncLightFixture(r.pointLight));
    }), document.getElementById("light-distance").addEventListener("input", (o) => {
      const r = l();
      r && (r.pointLight.distance = Number(o.target.value));
    }), document.getElementById("light-decay").addEventListener("input", (o) => {
      const r = l();
      r && (r.pointLight.decay = Number(o.target.value));
    }), document.getElementById("bulb-visible").addEventListener("change", (o) => {
      const r = l();
      r && (r.bulbMesh.visible = o.target.checked);
    }), document.getElementById("bulb-emissive").addEventListener("input", (o) => {
      const r = l();
      r && h.sceneClass.lightManager.setLightBulbEmissiveIntensity(r.bulbMesh, Number(o.target.value));
    }), document.getElementById("btn-delete-light").onclick = () => {
      const o = l();
      if (!o) return;
      h.scene.remove(o.bulbMesh), h.scene.remove(o.pointLight);
      const r = h.sceneClass.lightBulbs.findIndex((c) => c.mesh === o.bulbMesh);
      r !== -1 && h.sceneClass.lightBulbs.splice(r, 1), h.sceneClass.lightManager.fillLights = h.sceneClass.lightManager.fillLights.filter((c) => c !== o.pointLight), h.sceneClass.lightManager.disposeLightBulbMesh(o.bulbMesh), h.sceneClass.deselectLightBulb();
    };
  }
  function Mt() {
    const u = document.getElementById("btn-close-rug");
    if (!u) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("rug-width"), s = document.getElementById("rug-depth"), a = document.getElementById("rug-pos-x"), n = document.getElementById("rug-pos-z");
    i && (i.min = String(h.sceneConfig.worldScale), i.max = String(e * 0.95)), s && (s.min = String(h.sceneConfig.worldScale), s.max = String(t * 0.95)), a && (a.min = String(-e / 2), a.max = String(e / 2)), n && (n.min = String(-t / 2), n.max = String(t / 2)), u.onclick = () => {
      h.sceneClass.deselectRug();
    };
    const l = () => {
      const r = Number(document.getElementById("rug-width").value), c = Number(document.getElementById("rug-depth").value), g = Number(document.getElementById("rug-pos-x").value), d = Number(document.getElementById("rug-pos-z").value);
      h.sceneClass.updateRugTransform(r, c, g, d);
    }, o = document.getElementById("rug-color-picker");
    o && o.addEventListener("input", (r) => {
      h.sceneClass.changeRugColor(r.target.value);
    }), document.getElementById("rug-width").addEventListener("input", l), document.getElementById("rug-depth").addEventListener("input", l), document.getElementById("rug-pos-x").addEventListener("input", l), document.getElementById("rug-pos-z").addEventListener("input", l);
  }
  function vt() {
    const u = document.getElementById("btn-close-furniture");
    if (!u) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("furniture-width"), s = document.getElementById("furniture-depth"), a = document.getElementById("furniture-pos-x"), n = document.getElementById("furniture-pos-z");
    i && (i.max = String(e * 0.9)), s && (s.max = String(t * 0.9)), a && (a.min = String(-e / 2), a.max = String(e / 2)), n && (n.min = String(-t / 2), n.max = String(t / 2)), u.onclick = () => {
      h.sceneClass.deselectFurniture();
    };
    const l = () => {
      const r = Number(document.getElementById("furniture-width").value), c = Number(document.getElementById("furniture-depth").value), g = Number(document.getElementById("furniture-pos-x").value), d = Number(document.getElementById("furniture-pos-z").value);
      h.sceneClass.updateFurnitureTransform(r, c, g, d);
    };
    document.getElementById("furniture-width").addEventListener("input", l), document.getElementById("furniture-depth").addEventListener("input", l), document.getElementById("furniture-pos-x").addEventListener("input", l), document.getElementById("furniture-pos-z").addEventListener("input", l), document.getElementById("furniture-rotation").addEventListener("input", (r) => {
      h.sceneClass.updateFurnitureRotation(Number(r.target.value));
    });
    const o = document.getElementById("btn-delete-furniture");
    o && (o.onclick = () => {
      h.sceneClass.deleteSelectedFurniture();
    });
  }
  function It() {
    const u = document.getElementById("btn-close-table-lamp");
    if (!u) return;
    const { widthWallFront: e, widthWallSide: t, heightWall: i } = h.sceneClass.config, s = document.getElementById("table-lamp-pos-x"), a = document.getElementById("table-lamp-pos-y"), n = document.getElementById("table-lamp-pos-z");
    s && (s.min = String(-e / 2), s.max = String(e / 2)), a && (a.min = String(-i / 2), a.max = String(i / 2)), n && (n.min = String(-t / 2), n.max = String(t / 2)), u.onclick = () => {
      h.sceneClass.deselectTableLamp();
    };
    const l = () => {
      const r = Number(document.getElementById("table-lamp-width").value), c = Number(document.getElementById("table-lamp-height").value), g = Number(document.getElementById("table-lamp-pos-x").value), d = Number(document.getElementById("table-lamp-pos-y").value), p = Number(document.getElementById("table-lamp-pos-z").value);
      h.sceneClass.updateTableLampTransform(r, c, g, d, p);
    };
    document.getElementById("table-lamp-width").addEventListener("input", l), document.getElementById("table-lamp-height").addEventListener("input", l), document.getElementById("table-lamp-pos-x").addEventListener("input", l), document.getElementById("table-lamp-pos-y").addEventListener("input", l), document.getElementById("table-lamp-pos-z").addEventListener("input", l);
    const o = document.getElementById("btn-delete-table-lamp-ui");
    o && (o.onclick = () => {
      h.sceneClass.deleteTableLamp();
    });
  }
  function Ct() {
    const u = document.getElementById("btn-close-wall-tv");
    if (!u) return;
    u.onclick = () => {
      h.sceneClass.deselectWallTv();
    };
    const e = () => {
      const i = Number(document.getElementById("wall-tv-width").value), s = Number(document.getElementById("wall-tv-height").value), a = Number(document.getElementById("wall-tv-pos-x").value), n = Number(document.getElementById("wall-tv-pos-y").value), l = Number(document.getElementById("wall-tv-wall").value);
      h.sceneClass.updateWallTvTransform(i, s, a, n, l);
    };
    document.getElementById("wall-tv-width").addEventListener("input", e), document.getElementById("wall-tv-height").addEventListener("input", e), document.getElementById("wall-tv-pos-x").addEventListener("input", e), document.getElementById("wall-tv-pos-y").addEventListener("input", e), document.getElementById("wall-tv-wall").addEventListener("input", e);
    const t = document.getElementById("btn-delete-wall-tv-ui");
    t && (t.onclick = () => {
      h.sceneClass.deleteWallTv();
    });
  }
  function Lt() {
    const u = document.getElementById("save-load-modal"), e = document.getElementById("btn-presets"), t = document.getElementById("btn-close-save-load"), i = document.getElementById("save-load-backdrop"), s = document.getElementById("btn-save-scene-state"), a = document.getElementById("btn-load-scene-storage"), n = document.getElementById("btn-copy-scene-state"), l = document.getElementById("btn-paste-scene-state"), o = document.getElementById("btn-load-scene-text"), r = document.getElementById("scene-state-text"), c = document.getElementById("scene-state-status"), g = document.getElementById("scene-state-saved-list");
    if (!u || !e || !r || !c || !g) return;
    const d = (m) => {
      c.textContent = m;
    }, p = (m) => "roomcfg:" + btoa(unescape(encodeURIComponent(JSON.stringify(m)))), y = (m) => {
      const b = m.trim().replace(/^roomcfg:/, "");
      return JSON.parse(decodeURIComponent(escape(atob(b))));
    }, x = () => {
      const m = P();
      if (!(m == null ? void 0 : m.getSceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      return {
        mode: h.appMode || "3d",
        state: m.getSceneState()
      };
    }, C = (m) => m && typeof m == "object" && m.mode && Object.prototype.hasOwnProperty.call(m, "state") ? m.mode : "3d", M = (m) => {
      try {
        return C(y(m));
      } catch (b) {
        return console.error(b), null;
      }
    }, v = () => h.appMode || "3d", w = () => v() === "2d" ? "".concat(fe, "-2d") : fe, A = () => v() === "2d" ? "".concat(be, "-2d") : be, U = (m) => {
      const b = m && typeof m == "object" && m.mode && Object.prototype.hasOwnProperty.call(m, "state"), N = b ? m.mode : "3d", E = b ? m.state : m;
      if (N !== h.appMode) throw new Error("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u0430\u043D\u043E \u0434\u043B\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430");
      const D = P();
      if (!(D == null ? void 0 : D.applySceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      D.applySceneState(E), H();
    }, k = () => {
      try {
        const m = JSON.parse(localStorage.getItem(A()) || "[]");
        return Array.isArray(m) ? m.filter((b) => typeof b == "string" && b.trim().length > 0 && M(b) === v()) : [];
      } catch (m) {
        return console.error(m), [];
      }
    }, _ = (m) => {
      localStorage.setItem(A(), JSON.stringify(m));
    }, X = (m) => {
      const b = m.trim(), N = k(), E = N.includes(b), D = E ? N : [
        b,
        ...N
      ];
      return localStorage.setItem(w(), b), _(D), {
        alreadyExists: E,
        library: D
      };
    }, B = () => {
      const m = k();
      if (g.innerHTML = "", !m.length) {
        const b = document.createElement("div");
        b.className = "scene-state-saved-empty", b.textContent = "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439.", g.appendChild(b);
        return;
      }
      m.forEach((b, N) => {
        const E = document.createElement("div");
        E.className = "scene-state-saved-item";
        const D = document.createElement("div");
        D.className = "scene-state-saved-preview", D.textContent = "".concat(N + 1, ". ").concat(b);
        const K = document.createElement("div");
        K.className = "scene-state-saved-actions";
        const J = document.createElement("button");
        J.className = "action-btn", J.textContent = "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C", J.onclick = () => {
          try {
            r.value = b, U(y(b)), localStorage.setItem(w(), b), d("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0439.");
          } catch (Y) {
            d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(Y);
          }
        };
        const ee = document.createElement("button");
        ee.className = "action-btn", ee.textContent = "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", ee.onclick = async () => {
          try {
            await navigator.clipboard.writeText(b), r.value = b, localStorage.setItem(w(), b), d("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430.");
          } catch (Y) {
            d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(Y);
          }
        };
        const te = document.createElement("button");
        te.className = "action-btn", te.textContent = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", te.onclick = () => {
          const Y = k().filter((ie) => ie !== b);
          if (_(Y), (r.value || "").trim() === b && (r.value = ""), (localStorage.getItem(w()) || "").trim() === b) {
            const ie = Y[0] || "";
            ie ? localStorage.setItem(w(), ie) : localStorage.removeItem(w());
          }
          B(), d("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0438\u0437 \u043F\u0430\u043C\u044F\u0442\u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430.");
        }, K.appendChild(J), K.appendChild(ee), K.appendChild(te), E.appendChild(D), E.appendChild(K), g.appendChild(E);
      });
    }, G = () => {
      const m = localStorage.getItem(w());
      !m || k().includes(m) || M(m) === v() && _([
        m,
        ...k()
      ]);
    }, Ie = () => {
      u.style.display = "block", r.value = localStorage.getItem(w()) || "", G(), B(), d("");
    }, de = () => {
      u.style.display = "none";
    };
    e.onclick = Ie, t && (t.onclick = de), i && (i.onclick = de), s && (s.onclick = async () => {
      try {
        const m = p(x()), { alreadyExists: b } = X(m);
        r.value = m, B(), d(b ? "\u0422\u0430\u043A\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0432 \u043F\u0430\u043C\u044F\u0442\u0438. \u0421\u0442\u0440\u043E\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043D\u0438\u0436\u0435." : "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0432 \u043F\u0430\u043C\u044F\u0442\u044C \u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0441\u043F\u0438\u0441\u043E\u043A.");
      } catch (m) {
        d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(m);
      }
    }), a && (a.onclick = () => {
      try {
        const m = localStorage.getItem(w());
        if (!m) {
          d("\u0412 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043F\u043E\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442.");
          return;
        }
        r.value = m, U(y(m)), B(), d("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430.");
      } catch (m) {
        d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430."), console.error(m);
      }
    }), n && (n.onclick = async () => {
      try {
        if (!r.value.trim()) {
          const m = p(x());
          X(m), r.value = m, B();
        }
        await navigator.clipboard.writeText(r.value), d("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430.");
      } catch (m) {
        d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(m);
      }
    }), l && (l.onclick = async () => {
      try {
        const m = await navigator.clipboard.readText();
        if (!m.trim()) {
          d("\u0411\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430 \u043F\u0443\u0441\u0442.");
          return;
        }
        r.value = m, U(y(m)), X(m), B(), d("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430.");
      } catch (m) {
        d("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430."), console.error(m);
      }
    }), o && (o.onclick = () => {
      try {
        if (!r.value.trim()) {
          d("\u041F\u043E\u043B\u0435 \u0441\u043E \u0441\u0442\u0440\u043E\u043A\u043E\u0439 \u043F\u0443\u0441\u0442\u043E\u0435.");
          return;
        }
        const m = r.value.trim();
        U(y(m)), X(m), B(), d("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043B\u044F.");
      } catch (m) {
        d("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430 \u0438\u043B\u0438 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442."), console.error(m);
      }
    }), G(), B();
  }
  function Pt(u) {
    h.testMesh && (h.testMesh.rotation.y += u * 0.5), h.keyboardOrbitMove && h.keyboardOrbitMove.update(u), h.sceneClass && h.sceneClass.updateAnimations(u);
  }
  function Bt() {
    h.renderer && h.scene && h.camera && h.renderer.render(h.scene, h.camera), h.initClass && h.initClass.stats && h.initClass.stats.update();
  }
  function Et() {
    let u = 0;
    const e = 1 / 60, t = 0.1;
    h.renderer.setAnimationLoop(() => {
      let i = h.clock.getDelta();
      i > t && (i = t), u += i;
      let s = 5;
      for (; u >= e && s > 0; ) Pt(e), u -= e, s--;
      u > e && (u = 0), Bt();
    });
  }
})();
export {
  __tla,
  Dt as __vite_legacy_guard
};
