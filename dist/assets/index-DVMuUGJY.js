import { S as be, P as Se, W as xe, a as A, b as Me, A as ve, O as Ce, c as Le, R as _, V as H, d as f, e as Y, f as Ie, H as Pe, g as Ee, h as Be, G as O, M as T, i as $, j as C, C as re, k as ue, D as J, l as ee, m as De, F, n as U, o as oe, p as b, Q as se, B as q, q as We, E as Te, L as Fe, r as Ae, T as ge, s as M, t as ze, u as ke, v as me, w as Ne, x as Re, y as Oe, z as He } from "./three-DbH9v004.js";
let xt;
let __tla = (async () => {
  xt = function() {
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
      for (const n of s) if (n.type === "childList") for (const a of n.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(s) {
      const n = {};
      return s.integrity && (n.integrity = s.integrity), s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? n.credentials = "include" : s.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
    }
    function i(s) {
      if (s.ep) return;
      s.ep = true;
      const n = t(s);
      fetch(s.href, n);
    }
  })();
  class Ue {
    constructor(e) {
      var _a;
      this.gameContext = e;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.onWindowResize = this.onWindowResize.bind(this), this.scene = new be(), this.camera = new Se(40, window.innerWidth / window.innerHeight, 0.1 * t, 40 * t), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10 * t, this.renderer = new xe({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = A, this.renderer.shadowMap.enabled = true, this.renderer.shadowMap.type = Me, this.renderer.toneMapping = ve, this.renderer.toneMappingExposure = 0.58, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new Ce(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new Le(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const i = window.innerWidth, s = window.innerHeight, n = Math.min(i, 1920), a = Math.min(s, 1080);
      this.renderer.setSize(n, a, false);
      const o = this.renderer.domElement;
      o.style.position = "fixed", o.style.left = "50%", o.style.top = "50%", o.style.transform = "translate(-50%, -50%)", o.style.width = n + "px", o.style.height = a + "px", this.camera.aspect = n / a, this.camera.updateProjectionMatrix();
    }
  }
  class Xe {
    constructor(e, t, i) {
      this.gameContext = e, this.walls = t, this.worldScale = i.worldScale || 1, this.cellSize = i.cellSize || 0.5, this.panelDepth = i.panelDepth || 0.05, this.raycaster = new _(), this.pointer = new H(), this.mouseDownPointer = new H(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
    }
    handlePointerDown(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) for (const i of t) {
        let s = i.object;
        for (; s.parent && !this.walls.includes(s); ) s = s.parent;
        if (this.walls.includes(s) && !this.isWallFacingCamera(s)) continue;
        let n = i.object;
        for (; n.parent && !n.userData.isPanel && n !== this.gameContext.scene; ) n = n.parent;
        if (n.userData.isPanel) return this.pendingPanel = n, this.mouseDownPointer.set(e.clientX, e.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    isWallFacingCamera(e) {
      const t = this.gameContext.camera, i = new f();
      e.getWorldPosition(i);
      const s = new f().subVectors(t.position, i), n = new f(0, 0, 1).applyQuaternion(e.quaternion);
      return s.dot(n) > 0;
    }
    startDrag(e, t) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const s = this.gameContext.assetManager.panels[e];
      s && (this.ghostMesh = s.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.savedColor !== null ? this.applyColor(this.ghostMesh, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(this.ghostMesh, this.gameContext.sceneClass.globalPanelColor), this.ghostMesh.traverse((n) => {
        n.raycast = () => {
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
          const n = this.getWallClippingPlanes(s);
          this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: n
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
          const n = Array.isArray(s.material) ? s.material[0] : s.material;
          this.savedColor = n.color.getHex();
        }
      }), this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(i, e), this.pendingPanel = null;
    }
    snapToGrid(e, t) {
      const i = t.geometry.parameters.width, s = t.geometry.parameters.height, n = t.userData.gridTexture, a = t.worldToLocal(e.point.clone());
      let o = a.x / i + 0.5, l = a.y / s + 0.5;
      o = o * n.repeat.x + n.offset.x, l = l * n.repeat.y + n.offset.y;
      const r = Math.floor(o), c = Math.floor(l);
      if (t.children.some((S) => S.userData.isPanel && S.userData.gridX === r && S.userData.gridY === c)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = r, this.ghostMesh.userData.gridY = c;
      const u = (r + 0.5 - n.offset.x) / n.repeat.x, p = (c + 0.5 - n.offset.y) / n.repeat.y, w = (u - 0.5) * i, I = (p - 0.5) * s;
      a.x = w, a.y = I, a.z = 0;
      const x = t.localToWorld(a);
      this.ghostMesh.position.copy(x), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
      const n = this.ghostMesh.position.clone(), a = new f(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
      n.add(a.multiplyScalar(this.panelDepth * 0.25)), this.currentWall.add(i), this.currentWall.worldToLocal(n), i.position.copy(n), i.rotation.set(0, 0, 0), i.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(i);
    }
    applyColor(e, t) {
      e.traverse((i) => {
        if (!i.isMesh || !i.material) return;
        (Array.isArray(i.material) ? i.material : [
          i.material
        ]).forEach((n) => {
          n.color && (typeof t == "string" ? n.color.set(t) : n.color.setHex(t), n.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(e, { transparent: t, opacity: i, clippingPlanes: s, cloneMaterial: n }) {
      e.traverse((a) => {
        if (!a.isMesh) return;
        n && (Array.isArray(a.material) ? a.material = a.material.map((l) => l.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), i !== void 0 && (l.opacity = i), s !== void 0 && (l.clippingPlanes = s), l.needsUpdate = true;
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
      const t = e.geometry.parameters.width, i = e.geometry.parameters.height, s = new f(1, 0, 0).applyQuaternion(e.quaternion), n = new f(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new Y().setFromNormalAndCoplanarPoint(s.clone().negate(), a.clone().add(s.clone().multiplyScalar(t / 2))),
        new Y().setFromNormalAndCoplanarPoint(s.clone(), a.clone().add(s.clone().multiplyScalar(-t / 2))),
        new Y().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(i / 2))),
        new Y().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-i / 2)))
      ];
    }
  }
  const Ye = ".floating-ui";
  function qe() {
    document.querySelectorAll(Ye).forEach((d) => {
      d.style.display = "none";
    });
  }
  function N(d) {
    qe();
    const e = document.querySelector(d);
    return e && (e.style.display = "flex"), e;
  }
  function z(d) {
    const e = document.querySelector(d);
    e && (e.style.display = "none");
  }
  class _e {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.worldScaleSquared = this.worldScale * this.worldScale, this.defaultSideLightIntensity = 18 * this.worldScaleSquared, this.defaultSideLightDistance = 6 * this.worldScale, this.ambientLight = new Ie(16774376, 0.12), this.hemisphereLight = null, this.ceilingSpotLight = null, this.ceilingSpotTarget = null, this.fillLights = [], this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.lightDragPlane = new Y(), this.lightDragIntersectionPoint = new f(), this.lightDragOffset = new f(), this.pointer = new H(), this.raycaster = new _();
    }
    createScene() {
      this.createRoomLights(), this.addAmbientLight(), this.tuneRendererExposure();
    }
    createRoomLights() {
      const { widthWallFront: e, widthWallSide: t, heightWall: i } = this.config, s = Math.max(e, t), n = i / 2 - 0.06 * this.worldScale;
      this.hemisphereLight = new Pe(16118766, 12757133, 0.62), this.hemisphereLight.position.set(0, i / 2, 0), this.gameContext.scene.add(this.hemisphereLight), this.ceilingSpotLight = new Ee(16773852, 34 * this.worldScaleSquared, s * 3.2, Math.PI / 2.2, 0.92, 1.35), this.ceilingSpotLight.position.set(0, n, 0.18 * this.worldScale), this.ceilingSpotLight.castShadow = true, this.ceilingSpotLight.shadow.mapSize.set(2048, 2048), this.ceilingSpotLight.shadow.bias = -8e-5, this.ceilingSpotLight.shadow.normalBias = 0.04, this.ceilingSpotLight.shadow.radius = 10, this.ceilingSpotTarget = new Be(), this.ceilingSpotTarget.position.set(0, -i * 0.32, 0), this.ceilingSpotLight.target = this.ceilingSpotTarget, this.attachCeilingFixture(this.ceilingSpotLight), this.gameContext.scene.add(this.ceilingSpotTarget), this.gameContext.scene.add(this.ceilingSpotLight);
      const a = [
        {
          color: 16773341,
          intensity: 10 * this.worldScaleSquared,
          distance: s * 1.9,
          decay: 1.35,
          position: new f(-e * 0.26, i * 0.18, t * 0.18)
        },
        {
          color: 16773341,
          intensity: 10 * this.worldScaleSquared,
          distance: s * 1.9,
          decay: 1.35,
          position: new f(e * 0.26, i * 0.18, t * 0.18)
        },
        {
          color: 15921386,
          intensity: 7 * this.worldScaleSquared,
          distance: s * 1.7,
          decay: 1.25,
          position: new f(0, -i * 0.08, -t * 0.22)
        }
      ];
      this.fillLights = [], a.forEach((o) => {
        this.addLightBulb({
          color: o.color,
          intensity: o.intensity,
          distance: o.distance,
          decay: o.decay,
          position: o.position,
          isRoomLight: true
        });
      }), this.syncRoomLightVisuals();
    }
    addAmbientLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    tuneRendererExposure() {
      this.gameContext.renderer && (this.gameContext.renderer.toneMappingExposure = 0.72);
    }
    attachCeilingFixture(e) {
      const t = new O();
      t.position.y = -0.022 * this.worldScale;
      const i = new T({
        color: 14209219,
        roughness: 0.72,
        metalness: 0.02
      }), s = new $({
        color: e.color.clone(),
        transparent: true,
        opacity: 0.78,
        toneMapped: false
      }), n = new C(new re(0.13 * this.worldScale, 0.105 * this.worldScale, 0.045 * this.worldScale, 40), i), a = new C(new re(0.124 * this.worldScale, 0.124 * this.worldScale, 0.026 * this.worldScale, 40), s);
      a.rotation.x = Math.PI, a.position.y = -0.024 * this.worldScale, t.add(n), t.add(a), e.add(t), e.userData.fixtureMaterials = {
        glow: a.material,
        emissive: []
      };
    }
    createLightBulbMesh(e = 16755302) {
      const t = new O(), i = new T({
        color: e,
        emissive: e,
        emissiveIntensity: 2,
        roughness: 0.22,
        metalness: 0
      }), s = new ue({
        color: 16777215,
        roughness: 0.12,
        metalness: 0,
        transparent: true,
        opacity: 0.34,
        transmission: 0.45,
        thickness: 0.02 * this.worldScale,
        side: J
      }), n = new $({
        color: e,
        transparent: true,
        opacity: 0.28,
        toneMapped: false,
        depthWrite: false
      }), a = new C(new ee(0.036 * this.worldScale, 32, 16), i), o = new C(new ee(0.064 * this.worldScale, 32, 16), s), l = new C(new ee(0.082 * this.worldScale, 24, 12), n);
      return l.raycast = () => {
      }, t.add(a), t.add(o), t.add(l), t.userData.lightVisualMaterials = {
        emissive: [
          i
        ],
        color: [
          i
        ],
        glow: n
      }, t;
    }
    addLightBulb({ color: e = 16755302, intensity: t = this.defaultSideLightIntensity, distance: i = this.defaultSideLightDistance, decay: s = 1.7, position: n = null, isRoomLight: a = false } = {}) {
      const o = this.createLightBulbMesh(e), l = n || new f((Math.random() - 0.5) * this.config.widthWallFront, (Math.random() - 0.5) * this.config.heightWall, (Math.random() - 0.5) * this.config.widthWallSide);
      o.position.copy(l);
      const r = new De(e, t, i, s);
      r.position.copy(o.position), r.castShadow = false, o.userData.isLightBulb = true, o.userData.isRoomLight = a, o.userData.light = r, r.userData.bulbMesh = o, this.gameContext.scene.add(o), this.gameContext.scene.add(r);
      const c = {
        mesh: o,
        light: r
      };
      return this.lightBulbs.push(c), a && this.fillLights.push(r), c;
    }
    attachFillFixture(e) {
      const t = new O(), i = new T({
        color: 2039585,
        roughness: 0.78,
        metalness: 0.18,
        side: F
      }), s = new T({
        color: 2302758,
        roughness: 0.72,
        metalness: 0.2,
        side: F
      }), n = new T({
        color: 15854819,
        roughness: 0.38,
        metalness: 0.02,
        emissive: e.color.clone(),
        emissiveIntensity: 0.32,
        side: F
      }), a = new C(new U(0.09 * this.worldScale, 0.18 * this.worldScale), i);
      a.position.set(0, 0, 1e-3 * this.worldScale);
      const o = new C(new U(0.018 * this.worldScale, 0.24 * this.worldScale), s);
      o.position.set(0, 0, 0.012 * this.worldScale);
      const l = new C(new oe(0.048 * this.worldScale, 24), n);
      l.position.set(0, 0, 0.02 * this.worldScale);
      const r = new C(new oe(0.07 * this.worldScale, 24), new $({
        color: e.color.clone(),
        transparent: true,
        opacity: 0.34,
        side: F,
        toneMapped: false
      }));
      r.position.set(0, 0, 0.019 * this.worldScale), t.add(a), t.add(o), t.add(l), t.add(r), e.add(t), e.userData.fixtureMaterials = {
        root: t,
        glow: r.material,
        emissive: [
          l.material
        ]
      }, this.syncFillFixturePlacement(e);
    }
    syncFillFixturePlacement(e) {
      var _a, _b;
      const i = (_b = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.fixtureMaterials) == null ? void 0 : _b.root;
      if (!i) return;
      const s = this.config.widthWallFront / 2, n = this.config.widthWallSide / 2, a = e.position, l = [
        {
          distance: Math.abs(a.x + s),
          localPosition: new f(-s - a.x + 0.02 * this.worldScale, 0, 0),
          rotationY: Math.PI / 2
        },
        {
          distance: Math.abs(s - a.x),
          localPosition: new f(s - a.x - 0.02 * this.worldScale, 0, 0),
          rotationY: -Math.PI / 2
        },
        {
          distance: Math.abs(a.z + n),
          localPosition: new f(0, 0, -n - a.z + 0.02 * this.worldScale),
          rotationY: 0
        },
        {
          distance: Math.abs(n - a.z),
          localPosition: new f(0, 0, n - a.z - 0.02 * this.worldScale),
          rotationY: Math.PI
        }
      ].reduce((r, c) => c.distance < r.distance ? c : r);
      i.position.copy(l.localPosition), i.rotation.set(0, l.rotationY, 0);
    }
    syncLightFixture(e) {
      var _a;
      this.syncLightBulbMesh(e);
      const t = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.fixtureMaterials;
      if (!t) return;
      const i = b.clamp(0.18 + e.intensity / (18 * this.worldScaleSquared), 0.18, 1.6);
      t.emissive.forEach((s) => {
        s.emissive.copy(e.color), s.emissiveIntensity = i;
      }), t.glow && (t.glow.color.copy(e.color), t.glow.opacity = b.clamp(0.22 + e.intensity / (28 * this.worldScaleSquared), 0.22, 0.95));
    }
    syncLightBulbMesh(e) {
      var _a, _b, _c;
      const t = (_a = e == null ? void 0 : e.userData) == null ? void 0 : _a.bulbMesh, i = (_b = t == null ? void 0 : t.userData) == null ? void 0 : _b.lightVisualMaterials;
      if (i) {
        const n = (_c = t.userData.emissiveIntensity) != null ? _c : b.clamp(0.4 + e.intensity / (18 * this.worldScaleSquared), 0.4, 6);
        i.emissive.forEach((a) => {
          a.color && a.color.copy(e.color), a.emissive.copy(e.color), a.emissiveIntensity = n, a.needsUpdate = true;
        }), i.glow && (i.glow.color.copy(e.color), i.glow.opacity = b.clamp(0.14 + e.intensity / (40 * this.worldScaleSquared), 0.14, 0.62), i.glow.needsUpdate = true);
        return;
      }
      const s = t == null ? void 0 : t.material;
      s && (s.emissive && s.emissive.copy(e.color), s.emissiveIntensity = b.clamp(0.4 + e.intensity / (18 * this.worldScaleSquared), 0.4, 6), s.needsUpdate = true);
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
        }), i.glow && (i.glow.opacity = b.clamp(t / 8, 0.08, 0.8), i.glow.needsUpdate = true);
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
      const t = this.gameContext.renderer, { ambientLight: i, hemisphereLight: s, ceilingSpotLight: n, ceilingSpotTarget: a, fillLights: o } = this.getRoomLights();
      if (!t || !i || !s || !n || !a || !o.length) return;
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
      r && (t.toneMappingExposure = r.exposure, i.color.setHex(r.ambient.color), i.intensity = r.ambient.intensity, s.color.setHex(r.hemisphere.skyColor), s.groundColor.setHex(r.hemisphere.groundColor), s.intensity = r.hemisphere.intensity, s.position.y = r.hemisphere.y, n.color.setHex(r.ceiling.color), n.intensity = r.ceiling.intensity, n.distance = r.ceiling.distance, n.decay = r.ceiling.decay, n.angle = r.ceiling.angle, n.penumbra = r.ceiling.penumbra, n.position.set(...r.ceiling.position), a.position.set(...r.ceiling.target), n.castShadow = r.ceiling.castShadow, n.shadow.bias = r.ceiling.shadowBias, n.shadow.normalBias = r.ceiling.shadowNormalBias, n.shadow.mapSize.set(r.ceiling.shadowMapSize, r.ceiling.shadowMapSize), n.shadow.needsUpdate = true, o.forEach((c, m) => {
        var _a;
        const u = r.fillLights[m];
        u && (c.color.setHex(u.color), c.intensity = u.intensity, c.distance = u.distance, c.decay = u.decay, c.position.set(...u.position), ((_a = c.userData) == null ? void 0 : _a.bulbMesh) && c.userData.bulbMesh.position.copy(c.position));
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
    selectLightBulb(e) {
      this.selectedLightBulb = e, N(".light-selection-ui"), this.refreshLightBulbUI();
    }
    deselectLightBulb() {
      this.selectedLightBulb = null, z(".light-selection-ui");
    }
    refreshLightBulbUI() {
      const e = this.selectedLightBulb;
      if (!e) return;
      const t = e.userData.light;
      if (!t) return;
      const i = Math.max(50, this.defaultSideLightIntensity * 4, t.intensity * 1.5), s = Math.max(20, this.defaultSideLightDistance * 3, t.distance * 1.5), n = document.getElementById("light-color-picker");
      n && (n.value = "#" + t.color.getHexString());
      const a = document.getElementById("light-intensity");
      a && (a.max = String(i), a.value = String(t.intensity));
      const o = document.getElementById("light-distance");
      o && (o.max = String(s), o.value = String(t.distance));
      const l = document.getElementById("light-decay");
      l && (l.value = String(t.decay));
      const r = document.getElementById("bulb-visible");
      r && (r.checked = e.visible);
      const c = document.getElementById("bulb-emissive");
      c && (c.value = String(this.getLightBulbEmissiveIntensity(e)));
    }
    findLightBulbHit(e) {
      const t = this.lightBulbs.map((n) => n.mesh);
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
  const Q = new f(), le = new f();
  class Ge {
    constructor(e) {
      this.roomManager = e, this.selectedPanel = null, this.animatingPanels = [], this.globalPanelColor = null;
    }
    updateAnimations(e) {
      this.updatePanelVisibility();
      const t = 10, i = 10;
      for (let s = this.animatingPanels.length - 1; s >= 0; s--) {
        const n = this.animatingPanels[s], a = !!n.userData.targetQuaternion, o = !!n.userData.targetPosition;
        a && (n.quaternion.slerp(n.userData.targetQuaternion, e * t), n.quaternion.angleTo(n.userData.targetQuaternion) < 0.01 && (n.quaternion.copy(n.userData.targetQuaternion), delete n.userData.targetQuaternion)), o && (n.position.lerp(n.userData.targetPosition, e * i), n.position.distanceTo(n.userData.targetPosition) < 1e-3 && (n.position.copy(n.userData.targetPosition), delete n.userData.targetPosition)), !n.userData.targetQuaternion && !n.userData.targetPosition && this.animatingPanels.splice(s, 1);
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
      return e.getWorldPosition(Q), Q.subVectors(t.position, Q), le.set(0, 0, 1).transformDirection(e.matrixWorld), Q.dot(le) > 0;
    }
    randomRotate() {
      const e = this.getAllPanels();
      if (e.length !== 0) {
        for (let t = e.length - 1; t > 0; t--) {
          const i = Math.floor(Math.random() * (t + 1)), s = e[t];
          e[t] = e[i], e[i] = s;
        }
        e.forEach((t) => {
          const s = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new se();
          n.setFromAxisAngle(new f(0, 1, 0), s);
          const a = t.userData.targetQuaternion ? t.userData.targetQuaternion.clone() : t.quaternion.clone();
          t.userData.targetQuaternion = a.multiply(n), this.enqueueAnimation(t);
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
          const c = Math.floor(Math.random() * (r + 1)), m = i[r];
          i[r] = i[c], i[c] = m;
        }
        const n = e.geometry.parameters.width, a = e.geometry.parameters.height, o = e.userData.gridTexture;
        if (!o) return;
        function l(r, c) {
          const m = r + 0.5, u = c + 0.5, p = (m - o.offset.x) / o.repeat.x, w = (u - o.offset.y) / o.repeat.y;
          return new f((p - 0.5) * n, (w - 0.5) * a, s);
        }
        t.forEach((r, c) => {
          const m = i[c];
          r.userData.gridX = m.gridX, r.userData.gridY = m.gridY, r.userData.targetPosition = l(m.gridX, m.gridY), this.enqueueAnimation(r);
        });
      });
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e, this.addSelectionOutline(e);
      let t = "#ffffff";
      if (e.traverse((s) => {
        s.isMesh && s.material && (t = "#" + (Array.isArray(s.material) ? s.material[0] : s.material).color.getHexString());
      }), N(".selection-ui")) {
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
      const t = new se();
      t.setFromAxisAngle(new f(0, 1, 0), e), this.selectedPanel.userData.targetQuaternion.multiply(t), this.enqueueAnimation(this.selectedPanel);
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.roomManager.walls.forEach((t) => {
        t.traverse((i) => {
          i.userData && i.userData.isPanel && i.traverse((s) => {
            s.isMesh && s.material && (Array.isArray(s.material) ? s.material.forEach((n) => n.color.set(e)) : s.material.color.set(e));
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
      let n = false;
      e.traverse((u) => {
        if (u.isMesh && u.geometry) {
          const p = u.geometry.attributes.position;
          if (!p) return;
          for (let w = 0; w < p.count; w++) i.fromBufferAttribute(p, w), i.applyMatrix4(u.matrixWorld), i.applyMatrix4(s), t.expandByPoint(i);
          n = true;
        }
      }), n || t.set(new f(-0.25, -0.25, 0), new f(0.25, 0.25, 0.05));
      const a = new f(), o = new f();
      t.getSize(a), t.getCenter(o), a.multiplyScalar(1.02);
      const l = new We(a.x, a.y, a.z), r = new Te(l), c = new Fe({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), m = new Ae(r, c);
      m.position.copy(o), m.name = "selection_outline", m.raycast = () => {
      }, e.add(m);
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
  const K = new f(), ce = new f();
  class je {
    constructor(e, t, i) {
      this.gameContext = e, this.config = t, this.onWallChanged = i, this.floor = null, this.ceiling = null, this.isNetVisible = true, this.activeWallIndex = null, this.gridSelectionColor = "#1612d3", this.inactiveGridOpacity = 0.45, this.activeGridOpacity = 1, this.textureLoader = new ge(), this.baseGridTexture = this.createGridTexture(), this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg"), this.wallTexture.wrapS = M, this.wallTexture.wrapT = M, this.wallTexture.colorSpace = A, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallRoughness = this.textureLoader.load("textures/1/wall-roughness.jpg"), this.wallRoughness.wrapS = M, this.wallRoughness.wrapT = M, this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg"), this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg"), this.floorRoughness = this.textureLoader.load("textures/1/floor-roughness.jpg"), [
        this.floorTexture,
        this.floorNormal,
        this.floorRoughness
      ].forEach((s) => {
        s.wrapS = M, s.wrapT = M;
      }), this.floorTexture.colorSpace = A, this.floorTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.ceilingTexture = this.textureLoader.load("textures/1/ceiling-color.jpg"), this.ceilingTexture.wrapS = M, this.ceilingTexture.wrapT = M, this.ceilingTexture.colorSpace = A, this.ceilingTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.createWalls();
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
      const i = new U(e, t), s = e / this.config.cellSize, n = t / this.config.cellSize, a = this.wallTexture.clone();
      a.repeat.set(e / 2, t / 2), a.wrapS = M, a.wrapT = M, a.needsUpdate = true;
      const o = this.wallRoughness.clone();
      o.repeat.set(s, n);
      const l = this.baseGridTexture.clone();
      l.repeat.set(s, n), l.wrapS = M, l.wrapT = M, l.needsUpdate = true;
      const r = new T({
        map: a,
        roughnessMap: o,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: F
      });
      r.envMapIntensity = 0.8;
      const c = new C(i, r), m = new $({
        map: l,
        color: 16777215,
        transparent: true,
        opacity: this.inactiveGridOpacity,
        depthWrite: false,
        side: F,
        toneMapped: false
      }), u = new C(i, m);
      return u.position.z = 1e-3 * this.config.worldScale, u.renderOrder = 2, u.visible = this.isNetVisible, u.raycast = () => {
      }, c.userData.gridTexture = l, c.userData.gridOverlay = u, c.receiveShadow = true, c.add(u), c.onBeforeRender = (p, w, I) => {
        c.getWorldPosition(K), K.subVectors(I.position, K), ce.set(0, 0, 1).transformDirection(c.matrixWorld);
        const x = K.dot(ce) > 0;
        c.userData.gridOverlay && (c.userData.gridOverlay.visible = this.isNetVisible && x);
      }, c;
    }
    loadWalls() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: i } = this.config, s = new U(e, t), n = e / 2, a = t / 2, o = this.floorTexture.clone(), l = this.floorNormal.clone(), r = this.floorRoughness.clone();
      [
        o,
        l,
        r
      ].forEach((p) => {
        p.repeat.set(n, a), p.needsUpdate = true;
      });
      const c = new T({
        color: 16777215,
        map: o,
        normalMap: l,
        roughnessMap: r,
        roughness: 1,
        metalness: 0.1,
        side: F
      });
      this.floor = new C(s, c), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -i / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const m = this.ceilingTexture.clone();
      m.repeat.set(n, a), m.needsUpdate = true;
      const u = new T({
        color: 16777215,
        map: m,
        roughness: 0.9,
        side: F
      });
      this.ceiling = new C(s, u), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = i / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    handleWallSelection(e) {
      const t = this.getPointer(e), i = new _();
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
      const i = new ze(e);
      return i.colorSpace = A, i.magFilter = ke, i.minFilter = me, i.generateMipmaps = true, i.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i;
    }
    getPointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      return new H((e.clientX - i.left) / i.width * 2 - 1, -((e.clientY - i.top) / i.height * 2 - 1));
    }
  }
  class Ve {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.rug = null, this.selectedRug = null, this.raycaster = new _(), this.pointer = new H();
    }
    createScene() {
      const { heightWall: e } = this.config, t = 4 * this.worldScale, i = 3 * this.worldScale, s = new U(t, i), n = new ge(), a = n.load("textures/1/carpet-color.jpg"), o = n.load("textures/1/carpet-normal.jpg");
      a.wrapS = M, a.wrapT = M, a.repeat.set(t, i), o.wrapS = M, o.wrapT = M, o.repeat.set(t, i), a.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), a.colorSpace = A, a.generateMipmaps = true, a.minFilter = me;
      const l = new T({
        map: a,
        bumpMap: o,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new C(s, l), this.rug.rotation.x = -Math.PI / 2, this.rug.position.y = -e / 2 + 3e-3 * this.worldScale, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = t, this.rug.userData.baseDepth = i, this.gameContext.scene.add(this.rug);
    }
    hitTest(e) {
      return this.rug ? (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.intersectObject(this.rug, false).length > 0) : false;
    }
    selectRug() {
      this.selectedRug = this.rug, N(".rug-selection-ui"), this.refreshRugUI();
    }
    deselectRug() {
      if (this.selectedRug = null, z(".rug-selection-ui"), this.rug) {
        const e = document.getElementById("rug-color-picker");
        e && (e.value = "#" + this.rug.material.color.getHexString());
      }
    }
    updateRugTransform(e, t, i, s) {
      if (!this.rug) return;
      const n = this.rug.userData.baseWidth, a = this.rug.userData.baseDepth, o = Math.max((this.config.widthWallFront - e) / 2, 0), l = Math.max((this.config.widthWallSide - t) / 2, 0);
      this.rug.scale.set(e / n, 1, t / a), this.rug.position.x = b.clamp(i, -o, o), this.rug.position.z = b.clamp(s, -l, l), this.rug.material.map && this.rug.material.map.repeat.set(e, t), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(e, t), this.refreshRugUI();
    }
    refreshRugUI() {
      if (!this.rug) return;
      const e = document.getElementById("rug-width"), t = document.getElementById("rug-depth"), i = document.getElementById("rug-pos-x"), s = document.getElementById("rug-pos-z"), n = this.rug.userData.baseWidth * this.rug.scale.x, a = this.rug.userData.baseDepth * this.rug.scale.z, o = Math.max(this.config.widthWallFront * 0.95, n), l = Math.max(this.config.widthWallSide * 0.95, a), r = Math.max(this.worldScale, 0.1), c = Math.max(this.worldScale, 0.1), m = Math.max((this.config.widthWallFront - n) / 2, 0), u = Math.max((this.config.widthWallSide - a) / 2, 0);
      e && (e.min = String(r), e.max = String(o), e.value = String(n)), t && (t.min = String(c), t.max = String(l), t.value = String(a)), i && (i.min = String(-m), i.max = String(m), i.value = String(this.rug.position.x)), s && (s.min = String(-u), s.max = String(u), s.value = String(this.rug.position.z));
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
  const he = [
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
  ], te = {
    x: 0,
    y: -0.2,
    z: 0
  };
  class Ze {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.furnitureItems = [], this.tableLamps = [], this.wallTvs = [], this.selectedFurniture = null, this.selectedLamp = null, this.selectedTv = null, this.raycaster = new _(), this.pointer = new H(), this._tempQuaternion = new se();
    }
    addTable() {
      if (this.furnitureItems.length > 0) {
        const r = this.furnitureItems[0];
        return this.selectFurniture(r), r;
      }
      const e = this.gameContext.assetManager.furniture.table;
      if (!e) return console.warn("\u0421\u0442\u043E\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new O(), i = e.clone(true);
      t.name = "table_".concat(this.furnitureItems.length + 1), t.userData.type = "table", t.userData.isFurniture = true, t.add(i), i.traverse((r) => {
        r.isMesh && (r.castShadow = true, r.receiveShadow = false, Array.isArray(r.material) ? r.material = r.material.map((c) => c.clone()) : r.material && (r.material = r.material.clone()), this.tuneFurnitureMaterial(r));
      });
      const s = new q().setFromObject(i), n = s.getCenter(new f()), a = s.getSize(new f());
      i.position.x -= n.x, i.position.y -= s.min.y, i.position.z -= n.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.userData.rotationStep = 0;
      const o = -this.config.heightWall / 2, l = he[this.furnitureItems.length % he.length];
      return t.position.set(l.x * this.worldScale, o, l.z * this.worldScale), this.gameContext.scene.add(t), this.furnitureItems.push(t), this.selectFurniture(t), t;
    }
    deleteTable() {
      const e = this.furnitureItems[0];
      e && (this.removeObject(e), this.furnitureItems = [], this.selectedFurniture === e && this.deselectFurniture());
    }
    addTableLamp() {
      if (this.tableLamps.length > 0) {
        const o = this.tableLamps[0];
        return this.selectLamp(o), o;
      }
      const e = this.gameContext.assetManager.furniture.tableLamp;
      if (!e) return console.warn("\u041B\u0430\u043C\u043F\u0430 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430"), null;
      const t = new O(), i = e.clone(true);
      t.name = "table_lamp_".concat(this.tableLamps.length + 1), t.userData.isTableLamp = true, t.userData.type = "tableLamp", t.add(i), i.traverse((o) => {
        o.isMesh && (o.castShadow = true, o.receiveShadow = false, Array.isArray(o.material) ? o.material = o.material.map((l) => l.clone()) : o.material && (o.material = o.material.clone()), this.tuneLampMaterial(o));
      });
      const s = new q().setFromObject(i), n = s.getCenter(new f()), a = s.getSize(new f());
      return i.position.x -= n.x, i.position.y -= s.min.y, i.position.z -= n.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.position.set(te.x * this.worldScale, te.y * this.worldScale, te.z * this.worldScale), this.gameContext.scene.add(t), this.tableLamps.push(t), this.selectLamp(t), t;
    }
    deleteTableLamp() {
      const e = this.tableLamps[0];
      e && (this.removeObject(e), this.tableLamps = [], this.selectedLamp === e && this.deselectLamp());
    }
    addWallTv() {
      if (this.wallTvs.length > 0) {
        const c = this.wallTvs[0];
        return this.selectWallTv(c), c;
      }
      const e = this.gameContext.assetManager.furniture.tv;
      if (!e) return console.warn("\u0422\u0435\u043B\u0435\u0432\u0438\u0437\u043E\u0440 \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new O(), i = e.clone(true);
      t.name = "wall_tv_".concat(this.wallTvs.length + 1), t.userData.isWallTv = true, t.userData.type = "wallTv", t.add(i), i.traverse((c) => {
        c.isMesh && (c.castShadow = true, c.receiveShadow = false, Array.isArray(c.material) ? c.material = c.material.map((m) => m.clone()) : c.material && (c.material = c.material.clone()), this.tuneFurnitureMaterial(c));
      });
      const s = new q().setFromObject(i), n = s.getCenter(new f()), a = s.getSize(new f());
      i.position.x -= n.x, i.position.y -= n.y, i.position.z -= n.z, t.userData.baseWidth = Math.max(a.x, 0.1), t.userData.baseHeight = Math.max(a.y, 0.1), t.userData.baseDepth = Math.max(a.z, 0.01);
      const o = this.getWallSizeForTv(this.getDefaultTvWallIndex()), r = Math.min(t.userData.baseWidth, o.width * 0.55) / t.userData.baseWidth;
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
        i && (i.side = J, i.envMap = null, i.envMapIntensity = 0, i.shadowSide = J, i.toneMapped = true, i.map && (i.map.colorSpace = A, i.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i.map.needsUpdate = true), i.name === "Material.002" && (i.color.setRGB(0.62, 0.62, 0.64), i.roughness = 0.68, i.metalness = 0), i.name === "default.001" && (i.color.setRGB(1, 1, 1), i.roughness = 0.58, i.metalness = 0), i.needsUpdate = true);
      });
    }
    tuneLampMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = J, i.envMap = null, i.envMapIntensity = 0, i.name === "abajor" && (i.color.setRGB(0.95, 0.92, 0.82), i.roughness = 0.9, i.metalness = 0), (i.name === "black rkham" || i.name === "Material.005") && (i.color.multiplyScalar(1.8), i.roughness = 0.55, i.metalness = 0), i.needsUpdate = true);
      });
    }
    hitTest(e) {
      if (this.furnitureItems.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.furnitureItems, true);
      if (t.length === 0) return null;
      let i = t[0].object;
      for (; i && !i.userData.isFurniture; ) i = i.parent;
      return i || null;
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
      this.selectedFurniture = e, N(".furniture-selection-ui"), this.refreshFurnitureUI();
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
      const t = document.getElementById("furniture-width"), i = document.getElementById("furniture-depth"), s = document.getElementById("furniture-pos-x"), n = document.getElementById("furniture-pos-z"), a = document.getElementById("furniture-rotation"), o = document.getElementById("furniture-rotation-value"), l = e.userData.baseWidth * e.scale.x, r = e.userData.baseDepth * e.scale.z, c = e.userData.rotationStep || 0, m = this.getRotatedFurnitureFootprint(e, l, r), u = Math.max(this.config.widthWallFront * 0.9, l), p = Math.max(this.config.widthWallSide * 0.9, r), w = Math.max(e.userData.baseWidth * 0.5, 0.1), I = Math.max(e.userData.baseDepth * 0.5, 0.1), x = Math.max((this.config.widthWallFront - m.width) / 2, 0), S = Math.max((this.config.widthWallSide - m.depth) / 2, 0);
      t && (t.min = String(w), t.max = String(u), t.value = String(l)), i && (i.min = String(I), i.max = String(p), i.value = String(r)), s && (s.min = String(-x), s.max = String(x), s.value = String(e.position.x)), n && (n.min = String(-S), n.max = String(S), n.value = String(e.position.z)), a && (a.value = String(c)), o && (o.textContent = "".concat(c * 90, "\xB0"));
    }
    updateFurnitureTransform(e, t, i, s) {
      const n = this.selectedFurniture;
      if (!n) return;
      const a = n.userData.baseWidth || 1, o = n.userData.baseDepth || 1;
      n.scale.set(e / a, 1, t / o);
      const l = this.getRotatedFurnitureFootprint(n, e, t), r = Math.max((this.config.widthWallFront - l.width) / 2, 0), c = Math.max((this.config.widthWallSide - l.depth) / 2, 0);
      n.position.x = b.clamp(i, -r, r), n.position.z = b.clamp(s, -c, c), n.position.y = -this.config.heightWall / 2, this.refreshFurnitureUI();
    }
    updateFurnitureRotation(e) {
      const t = this.selectedFurniture;
      if (!t) return;
      const i = (e % 4 + 4) % 4;
      t.userData.rotationStep = i, t.rotation.y = i * (Math.PI / 2);
      const s = document.getElementById("furniture-rotation-value");
      s && (s.textContent = "".concat(i * 90, "\xB0"));
      const n = t.userData.baseWidth * t.scale.x, a = t.userData.baseDepth * t.scale.z, o = this.getRotatedFurnitureFootprint(t, n, a), l = Math.max((this.config.widthWallFront - o.width) / 2, 0), r = Math.max((this.config.widthWallSide - o.depth) / 2, 0);
      t.position.x = b.clamp(t.position.x, -l, l), t.position.z = b.clamp(t.position.z, -r, r), this.refreshFurnitureUI();
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
      this.selectedLamp = e, N(".table-lamp-selection-ui"), this.refreshLampUI();
    }
    deselectLamp() {
      this.selectedLamp = null, z(".table-lamp-selection-ui");
    }
    refreshLampUI() {
      const e = this.selectedLamp;
      if (!e) return;
      const t = document.getElementById("table-lamp-width"), i = document.getElementById("table-lamp-height"), s = document.getElementById("table-lamp-pos-x"), n = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z"), o = e.userData.baseWidth * e.scale.x, l = e.userData.baseHeight * e.scale.y, r = this.config.widthWallFront / 2, c = this.config.heightWall / 2, m = this.config.widthWallSide / 2;
      t && (t.min = String(Math.max(e.userData.baseWidth * 0.5, 0.1)), t.max = String(Math.max(e.userData.baseWidth * 3, o)), t.value = String(o)), i && (i.min = String(Math.max(e.userData.baseHeight * 0.5, 0.1)), i.max = String(Math.max(e.userData.baseHeight * 3, l)), i.value = String(l)), s && (s.min = String(-r), s.max = String(r), s.value = String(e.position.x)), n && (n.min = String(-c), n.max = String(c), n.value = String(e.position.y)), a && (a.min = String(-m), a.max = String(m), a.value = String(e.position.z));
    }
    updateLampTransform(e, t, i, s, n) {
      const a = this.selectedLamp;
      if (!a) return;
      const o = a.userData.baseWidth || 1, l = a.userData.baseHeight || 1, r = e / o;
      a.scale.set(r, t / l, r), a.position.x = b.clamp(i, -this.config.widthWallFront / 2, this.config.widthWallFront / 2), a.position.y = b.clamp(s, -this.config.heightWall / 2, this.config.heightWall / 2), a.position.z = b.clamp(n, -this.config.widthWallSide / 2, this.config.widthWallSide / 2), this.refreshLampUI();
    }
    selectWallTv(e) {
      this.selectedTv = e, N(".wall-tv-selection-ui"), this.refreshWallTvUI();
    }
    deselectWallTv() {
      this.selectedTv = null, z(".wall-tv-selection-ui");
    }
    refreshWallTvUI() {
      var _a, _b;
      const e = this.selectedTv;
      if (!e) return;
      const t = document.getElementById("wall-tv-width"), i = document.getElementById("wall-tv-height"), s = document.getElementById("wall-tv-pos-x"), n = document.getElementById("wall-tv-pos-y"), a = document.getElementById("wall-tv-wall"), o = document.getElementById("wall-tv-wall-value"), l = e.userData.wallIndex || 0, r = this.getWallSizeForTv(l), c = e.userData.baseWidth * e.scale.x, m = e.userData.baseHeight * e.scale.y, u = Math.max(e.userData.baseWidth * 0.25, 0.1), p = Math.max(e.userData.baseHeight * 0.25, 0.1), w = Math.max(r.width * 0.9, c), I = Math.max(r.height * 0.9, m), x = Math.max((r.width - c) / 2, 0), S = Math.max((r.height - m) / 2, 0);
      t && (t.min = String(u), t.max = String(w), t.value = String(c)), i && (i.min = String(p), i.max = String(I), i.value = String(m)), s && (s.min = String(-x), s.max = String(x), s.value = String(e.position.x)), n && (n.min = String(-S), n.max = String(S), n.value = String(e.position.y)), a && (a.min = "1", a.max = String(Math.max(((_b = (_a = this.gameContext.sceneClass) == null ? void 0 : _a.walls) == null ? void 0 : _b.length) || 4, 1)), a.value = String(l + 1)), o && (o.textContent = String(l + 1));
    }
    updateWallTvTransform(e, t, i, s, n) {
      const a = this.selectedTv;
      if (!a) return;
      const o = Number.isFinite(n) ? n - 1 : a.userData.wallIndex || 0, l = this.getClampedTvWallIndex(o), r = this.getWallSizeForTv(l), c = b.clamp(e, Math.max(a.userData.baseWidth * 0.25, 0.1), r.width * 0.9), m = b.clamp(t, Math.max(a.userData.baseHeight * 0.25, 0.1), r.height * 0.9);
      this.attachTvToWall(a, l), a.scale.set(c / (a.userData.baseWidth || 1), m / (a.userData.baseHeight || 1), Math.max(c / (a.userData.baseWidth || 1), m / (a.userData.baseHeight || 1)));
      const u = Math.max((r.width - c) / 2, 0), p = Math.max((r.height - m) / 2, 0);
      a.position.x = b.clamp(i, -u, u), a.position.y = b.clamp(s, -p, p), this.setWallTvDepthOffset(a), this.refreshWallTvUI();
    }
    attachTvToWall(e, t) {
      var _a;
      const i = ((_a = this.gameContext.sceneClass) == null ? void 0 : _a.walls) || [], s = this.getClampedTvWallIndex(t), n = i[s];
      n && (n.add(e), e.userData.wallIndex = s, this.setWallTvDepthOffset(e));
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
      return b.clamp(Math.round(Number(e) || 0), 0, Math.max(t - 1, 0));
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
  }
  class Qe {
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
      const n = this.sceneClass.furnitureManager.hitTest(e);
      if (n) {
        this.sceneClass.selectFurniture(n);
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
        this.dragHandler.onPointerUp(e);
      }
    }
  }
  class Ke {
    constructor(e) {
      var _a;
      this.gameContext = e, this.onWallChanged = null, this.isSceneLocked = false;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.config = {
        worldScale: t,
        cellSize: 0.5 * t,
        panelDepth: 0.05 * t,
        widthWallFront: 5 * t,
        heightWall: 2.7 * t,
        widthWallSide: 4 * t
      }, this.roomManager = new je(e, this.config, () => {
        this.onWallChanged && this.onWallChanged();
      }), this.panelManager = new Ge(this.roomManager), this.lightManager = new _e(e, this.config), this.rugManager = new Ve(e, this.config), this.furnitureManager = new Ze(e, this.config), this.dragHandler = new Xe(e, this.roomManager.walls, this.config), this.interactionController = new Qe(this, this.dragHandler);
    }
    createScene() {
      this.roomManager.createScene(), this.rugManager.createScene(), this.lightManager.createScene(), this.interactionController.bindEvents();
    }
    getSceneState() {
      const e = this.panelManager.getAllPanels().map((l) => {
        let r = "#ffffff";
        return l.traverse((c) => {
          c.isMesh && c.material && r === "#ffffff" && (r = "#" + (Array.isArray(c.material) ? c.material[0] : c.material).color.getHexString());
        }), {
          wallIndex: this.roomManager.walls.indexOf(l.parent),
          panelIndex: l.userData.panelIndex,
          gridX: l.userData.gridX,
          gridY: l.userData.gridY,
          position: l.position.toArray(),
          quaternion: l.quaternion.toArray(),
          color: r
        };
      }), t = this.roomManager.walls.map((l) => {
        var _a, _b, _c;
        return {
          color: ((_a = l.material) == null ? void 0 : _a.color) ? "#" + l.material.color.getHexString() : "#ffffff",
          offsetX: ((_b = l.userData.gridTexture) == null ? void 0 : _b.offset.x) || 0,
          offsetY: ((_c = l.userData.gridTexture) == null ? void 0 : _c.offset.y) || 0
        };
      }), i = this.lightManager.lightBulbs.map(({ mesh: l, light: r }) => ({
        position: l.position.toArray(),
        color: "#" + r.color.getHexString(),
        intensity: r.intensity,
        distance: r.distance,
        decay: r.decay,
        visible: l.visible,
        isRoomLight: !!l.userData.isRoomLight,
        emissiveIntensity: this.lightManager.getLightBulbEmissiveIntensity(l)
      })), s = this.rugManager.rug ? {
        width: this.rugManager.rug.userData.baseWidth * this.rugManager.rug.scale.x,
        depth: this.rugManager.rug.userData.baseDepth * this.rugManager.rug.scale.z,
        posX: this.rugManager.rug.position.x,
        posZ: this.rugManager.rug.position.z,
        color: "#" + this.rugManager.rug.material.color.getHexString()
      } : null, n = this.furnitureManager.furnitureItems[0] ? {
        width: this.furnitureManager.furnitureItems[0].userData.baseWidth * this.furnitureManager.furnitureItems[0].scale.x,
        depth: this.furnitureManager.furnitureItems[0].userData.baseDepth * this.furnitureManager.furnitureItems[0].scale.z,
        posX: this.furnitureManager.furnitureItems[0].position.x,
        posZ: this.furnitureManager.furnitureItems[0].position.z,
        rotationStep: this.furnitureManager.furnitureItems[0].userData.rotationStep || 0
      } : null, a = this.furnitureManager.tableLamps[0] ? {
        width: this.furnitureManager.tableLamps[0].userData.baseWidth * this.furnitureManager.tableLamps[0].scale.x,
        height: this.furnitureManager.tableLamps[0].userData.baseHeight * this.furnitureManager.tableLamps[0].scale.y,
        posX: this.furnitureManager.tableLamps[0].position.x,
        posY: this.furnitureManager.tableLamps[0].position.y,
        posZ: this.furnitureManager.tableLamps[0].position.z
      } : null, o = this.furnitureManager.wallTvs[0] ? {
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
        table: n,
        lamp: a,
        wallTv: o
      };
    }
    applySceneState(e) {
      var _a;
      if (!e || typeof e != "object") throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B");
      if (this.clearSelections(), this.roomManager.walls.forEach((t) => {
        t.children.filter((i) => {
          var _a2;
          return (_a2 = i.userData) == null ? void 0 : _a2.isPanel;
        }).forEach((i) => {
          t.remove(i), this.dragHandler.disposeModel(i);
        });
      }), this.lightManager.lightBulbs.forEach(({ mesh: t, light: i }) => {
        this.gameContext.scene.remove(t), this.gameContext.scene.remove(i), this.lightManager.disposeLightBulbMesh(t);
      }), this.lightManager.lightBulbs = [], this.lightManager.fillLights = [], this.lightManager.deselectLightBulb(), this.furnitureManager.deleteTableLamp(), this.furnitureManager.deleteWallTv(), this.furnitureManager.deleteTable(), Array.isArray(e.walls) && e.walls.forEach((t, i) => {
        var _a2;
        const s = this.roomManager.walls[i];
        s && (t.color && ((_a2 = s.material) == null ? void 0 : _a2.color) && s.material.color.set(t.color), s.userData.gridTexture && (s.userData.gridTexture.offset.x = Number(t.offsetX || 0), s.userData.gridTexture.offset.y = Number(t.offsetY || 0), s.userData.gridTexture.needsUpdate = true));
      }), typeof e.activeWallIndex == "number" && (this.roomManager.activeWallIndex = e.activeWallIndex, this.roomManager.highlightActiveWall(), this.onWallChanged && this.onWallChanged()), typeof e.isNetVisible == "boolean" && e.isNetVisible !== this.roomManager.isNetVisible && this.roomManager.toggleNet(), this.panelManager.globalPanelColor = e.globalPanelColor || null, (e.panels || []).forEach((t) => {
        const i = this.roomManager.walls[t.wallIndex], s = this.gameContext.assetManager.panels[t.panelIndex];
        if (!i || !s) return;
        const n = s.clone();
        n.userData.isPanel = true, n.userData.panelIndex = t.panelIndex, n.userData.gridX = t.gridX, n.userData.gridY = t.gridY;
        const a = this.dragHandler.getWallClippingPlanes(i);
        this.dragHandler.applyMaterialProperties(n, {
          transparent: false,
          opacity: 1,
          clippingPlanes: a,
          cloneMaterial: true
        }), t.color ? this.dragHandler.applyColor(n, t.color) : this.panelManager.globalPanelColor && this.dragHandler.applyColor(n, this.panelManager.globalPanelColor), i.add(n), Array.isArray(t.position) && n.position.fromArray(t.position), Array.isArray(t.quaternion) ? n.quaternion.fromArray(t.quaternion) : (n.rotation.set(0, 0, 0), n.rotateX(Math.PI / 2));
      }), e.ambientLight && (this.lightManager.ambientLight.intensity = Number((_a = e.ambientLight.intensity) != null ? _a : this.lightManager.ambientLight.intensity), e.ambientLight.color && this.lightManager.ambientLight.color.set(e.ambientLight.color)), (e.sideLights || []).forEach((t) => {
        var _a2, _b, _c, _d, _e2, _f, _g;
        const i = this.lightManager.addLightBulb({
          color: t.color || 16755302,
          intensity: Number((_a2 = t.intensity) != null ? _a2 : this.lightManager.defaultSideLightIntensity),
          distance: Number((_b = t.distance) != null ? _b : this.lightManager.defaultSideLightDistance),
          decay: Number((_c = t.decay) != null ? _c : 1.7),
          isRoomLight: !!t.isRoomLight
        });
        i && (i.mesh.position.fromArray(t.position || i.mesh.position.toArray()), i.light.position.copy(i.mesh.position), i.light.color.set(t.color || "#ffaa66"), i.light.intensity = Number((_d = t.intensity) != null ? _d : i.light.intensity), i.light.distance = Number((_e2 = t.distance) != null ? _e2 : i.light.distance), i.light.decay = Number((_f = t.decay) != null ? _f : i.light.decay), i.mesh.visible = t.visible !== false, this.lightManager.setLightBulbEmissiveIntensity(i.mesh, Number((_g = t.emissiveIntensity) != null ? _g : this.lightManager.getLightBulbEmissiveIntensity(i.mesh))), this.lightManager.syncLightFixture(i.light));
      }), e.rug && this.rugManager.rug && (this.rugManager.updateRugTransform(Number(e.rug.width), Number(e.rug.depth), Number(e.rug.posX), Number(e.rug.posZ)), e.rug.color && this.rugManager.changeRugColor(e.rug.color)), e.table) {
        const t = this.addTable();
        t && (this.furnitureManager.selectFurniture(t), this.updateFurnitureTransform(Number(e.table.width), Number(e.table.depth), Number(e.table.posX), Number(e.table.posZ)), this.updateFurnitureRotation(Number(e.table.rotationStep || 0)));
      }
      if (e.lamp) {
        const t = this.addTableLamp();
        t && (this.selectTableLamp(t), this.updateTableLampTransform(Number(e.lamp.width), Number(e.lamp.height), Number(e.lamp.posX), Number(e.lamp.posY), Number(e.lamp.posZ)));
      }
      if (e.wallTv) {
        const t = this.addWallTv();
        t && (this.selectWallTv(t), this.updateWallTvTransform(Number(e.wallTv.width), Number(e.wallTv.height), Number(e.wallTv.posX), Number(e.wallTv.posY), Number(e.wallTv.wallIndex || 0) + 1));
      }
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
    addTableLamp() {
      return this.isSceneLocked ? null : (this.clearSelections(), this.furnitureManager.addTableLamp());
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
    updateWallTvTransform(e, t, i, s, n) {
      this.furnitureManager.updateWallTvTransform(e, t, i, s, n);
    }
    selectTableLamp(e) {
      this.isSceneLocked || (this.clearSelections(), this.furnitureManager.selectLamp(e));
    }
    deselectTableLamp() {
      this.furnitureManager.deselectLamp();
    }
    updateTableLampTransform(e, t, i, s, n) {
      this.furnitureManager.updateLampTransform(e, t, i, s, n);
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
  class $e {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.wallControllers = [], this.rendererControllers = [], this.ambientControllers = [], this.ceilingControllers = [], this.init();
    }
    init() {
      this.gameContext.gui && (this.wallFolder = this.gameContext.gui.addFolder("\u0421\u0435\u0442\u043A\u0430"), this.rendererFolder = this.gameContext.gui.addFolder("\u0420\u0435\u043D\u0434\u0435\u0440"), this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442 \u043A\u043E\u043C\u043D\u0430\u0442\u044B"), this.presetsFolder = this.lightFolder.addFolder("\u041F\u0440\u0435\u0441\u0435\u0442\u044B"), this.ambientFolder = this.lightFolder.addFolder("\u0424\u043E\u043D\u043E\u0432\u044B\u0439 \u0441\u0432\u0435\u0442"), this.ceilingFolder = this.lightFolder.addFolder("\u041F\u043E\u0442\u043E\u043B\u043E\u0447\u043D\u044B\u0439 \u0441\u0432\u0435\u0442"), this.ceilingPositionFolder = this.ceilingFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), this.ceilingBeamFolder = this.ceilingFolder.addFolder("\u041F\u044F\u0442\u043D\u043E"), this.ceilingTargetFolder = this.ceilingFolder.addFolder("\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435"), this.ceilingShadowFolder = this.ceilingFolder.addFolder("\u0422\u0435\u043D\u0438"), [
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
      this.ceilingControllers.forEach((n) => n.destroy()), this.ceilingControllers = [];
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
      }).listen(), this.ceilingFolder.add(t, "distance", 0, 30, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.ceilingFolder.add(t, "decay", 0, 4, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen(), this.ceilingFolder.addColor(s, "color").name("\u0426\u0432\u0435\u0442").onChange((n) => {
        t.color.set(n), this.sceneClass.lightManager.syncLightFixture(t);
      }), this.ceilingBeamFolder.add(t, "angle", 0.1, Math.PI / 1.5, 1e-3).name("\u0423\u0433\u043E\u043B").listen(), this.ceilingBeamFolder.add(t, "penumbra", 0, 1, 0.01).name("\u041C\u044F\u0433\u043A\u043E\u0441\u0442\u044C").listen(), this.ceilingTargetFolder.add(s, "targetX", -4, 4, 0.01).name("X").onChange((n) => {
        i.position.x = n;
      }), this.ceilingTargetFolder.add(s, "targetY", -4, 4, 0.01).name("Y").onChange((n) => {
        i.position.y = n;
      }), this.ceilingTargetFolder.add(s, "targetZ", -4, 4, 0.01).name("Z").onChange((n) => {
        i.position.z = n;
      }), this.ceilingShadowFolder.add(s, "castShadow").name("\u041E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0442\u044C").onChange((n) => {
        t.castShadow = n;
      }), this.ceilingShadowFolder.add(s, "shadowMapSize", [
        512,
        1024,
        2048,
        4096
      ]).name("\u0420\u0430\u0437\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B").onChange((n) => {
        const a = Number(n);
        t.shadow.mapSize.set(a, a), t.shadow.needsUpdate = true;
      }), this.ceilingShadowFolder.add(s, "shadowBias", -0.01, 0.01, 1e-5).name("\u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435").onChange((n) => {
        t.shadow.bias = n;
      }), this.ceilingShadowFolder.add(s, "shadowNormalBias", 0, 0.2, 1e-3).name("\u0421\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u043E\u0440\u043C\u0430\u043B\u0438").onChange((n) => {
        t.shadow.normalBias = n;
      }));
    }
    kelvinToHex(e) {
      const t = e / 100;
      let i, s, n;
      t <= 66 ? (i = 255, s = 99.4708025861 * Math.log(t) - 161.1195681661, n = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307) : (i = 329.698727446 * Math.pow(t - 60, -0.1332047592), s = 288.1221695283 * Math.pow(t - 60, -0.0755148492), n = 255);
      const a = (l) => Math.min(255, Math.max(0, l));
      return i = a(i), s = a(s), n = a(n), "#" + new Ne(i / 255, s / 255, n / 255).getHexString();
    }
  }
  class Je {
    constructor(e) {
      var _a;
      this.gameContext = e, this.loader = new Re(), this.worldScale = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1, this.basePanelCellSize = 0.5, this.basePanelGap = -2e-3, this.panelTargetSize = this.basePanelCellSize * this.worldScale - this.basePanelGap, this.panels = [], this.furniture = {
        table: null,
        tableLamp: null,
        tv: null
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
      const e = new U(0.49, 0.49), t = this.panelUrls.map((i, s) => this.loader.loadAsync(i).then((n) => {
        const a = n.scene.children[0];
        a.name = "panelTemplate_".concat(s);
        const o = [];
        a.traverse((p) => {
          p.isMesh && (p.geometry && !p.geometry.attributes.normal && p.geometry.computeVertexNormals(), p.scale.set(1, 2, 1), o.push(p));
        }), a.updateMatrixWorld(true);
        const r = new q().setFromObject(a).getSize(new f()), c = [
          r.x,
          r.y,
          r.z
        ].filter((p) => p > 0).sort((p, w) => w - p), m = c[1] || c[0] || 1, u = this.panelTargetSize / m;
        return a.scale.multiplyScalar(u), o.forEach((p) => {
          const w = p.material, I = Array.isArray(w) ? w : [
            w
          ];
          p.material = I.map((L) => {
            var _a;
            const v = new ue({
              color: 9548181,
              map: (L == null ? void 0 : L.map) || null,
              normalMap: (L == null ? void 0 : L.normalMap) || null,
              roughnessMap: (L == null ? void 0 : L.roughnessMap) || null,
              metalnessMap: (L == null ? void 0 : L.metalnessMap) || null,
              aoMap: (L == null ? void 0 : L.aoMap) || null,
              displacementMap: (L == null ? void 0 : L.displacementMap) || null,
              alphaMap: (L == null ? void 0 : L.alphaMap) || null,
              transparent: (L == null ? void 0 : L.transparent) || false,
              opacity: (_a = L == null ? void 0 : L.opacity) != null ? _a : 1,
              roughness: 0.94,
              side: F
            });
            return v.map && (v.map.colorSpace = A, v.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy()), [
              v.normalMap,
              v.roughnessMap,
              v.metalnessMap,
              v.aoMap,
              v.displacementMap,
              v.alphaMap
            ].forEach((P) => {
              P && (P.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy());
            }), v;
          }), Array.isArray(w) || (p.material = p.material[0]), p.castShadow = false, p.receiveShadow = true;
          const x = Array.isArray(p.material) ? p.material[0].clone() : p.material.clone(), S = new C(e, x);
          S.position.y = 5e-4, S.rotation.x = -Math.PI / 2;
        }), a;
      }));
      this.panels = await Promise.all(t);
    }
    async loadFurniture() {
      const [e, t, i] = await Promise.all([
        this.loader.loadAsync("models/mebel/table.gltf"),
        this.loader.loadAsync("models/mebel/lampgltf.gltf"),
        this.loader.loadAsync("models/mebel/tv.gltf")
      ]);
      e.scene.scale.multiplyScalar(this.worldScale), t.scene.scale.multiplyScalar(this.worldScale), i.scene.scale.multiplyScalar(this.worldScale), this.furniture.table = e.scene, this.furniture.tableLamp = t.scene, this.furniture.tv = i.scene;
    }
  }
  class et {
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
  class tt {
    constructor(e) {
      this.gameContext = e, this.mode = "2d", this.board = null, this.emptyState = null, this.root = null, this.items = [], this.selectedItem = null, this.draggingItem = null, this.dragOffsetX = 0, this.dragOffsetY = 0, this.gridVisible = true, this.nextItemId = 1, this.tileSize = 140, this.snapThreshold = 24, this.globalPanelColor = null, this.panelImages = [
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
      const { x: i, y: s } = this.getBoardPoint(t.clientX, t.clientY), n = this.addPanel(e, i - this.tileSize / 2, s - this.tileSize / 2);
      this.selectPanel(n), this.startDraggingItem(n, t, this.tileSize / 2, this.tileSize / 2);
    }
    addPanel(e, t, i, s = 0) {
      const n = document.createElement("div");
      n.className = "panel-2d-item", n.dataset.id = String(this.nextItemId++);
      const a = document.createElement("img");
      return a.src = this.panelImages[e], a.alt = "Panel ".concat(e + 1), n.appendChild(a), n.userData = {
        panelIndex: e,
        x: 0,
        y: 0,
        rotation: s,
        color: null
      }, n.addEventListener("pointerdown", (o) => {
        o.stopPropagation(), this.selectPanel(n);
        const l = n.getBoundingClientRect();
        this.startDraggingItem(n, o, o.clientX - l.left, o.clientY - l.top);
      }), this.board.appendChild(n), this.items.push(n), this.setItemPosition(n, t, i), this.setItemRotation(n, s), this.globalPanelColor && this.setItemColor(n, this.globalPanelColor), this.refreshEmptyState(), n;
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
      const e = this.tileSize, t = this.board.clientWidth || window.innerWidth, i = this.board.clientHeight || window.innerHeight, s = Math.min(t, i), n = window.innerWidth <= 600, a = Math.floor(t / (n ? 6.2 : 3)), r = Math.max(n ? 48 : 82, Math.min(n ? 64 : 140, a, Math.round(s * (n ? 0.135 : 0.26))));
      this.tileSize = r, this.snapThreshold = Math.max(12, Math.round(this.tileSize * 0.18)), this.board.style.setProperty("--panel-tile-size", "".concat(this.tileSize, "px")), !(!this.items.length || e === this.tileSize) && this.items.forEach((c) => {
        const m = Math.round(c.userData.x / e) * this.tileSize, u = Math.round(c.userData.y / e) * this.tileSize;
        this.setItemPosition(c, m, u);
      });
    }
    getSnapCandidates(e, t) {
      const s = [
        0,
        t === "x" ? Math.max(0, this.board.clientWidth - this.tileSize) : Math.max(0, this.board.clientHeight - this.tileSize)
      ];
      return this.items.forEach((n) => {
        if (n === e) return;
        const a = t === "x" ? n.userData.x : n.userData.y;
        s.push(a), s.push(a - this.tileSize), s.push(a + this.tileSize);
      }), s;
    }
    snapValue(e, t, i) {
      const s = Math.round(i / this.tileSize) * this.tileSize, n = [
        ...this.getSnapCandidates(e, t),
        s
      ];
      let a = i, o = this.snapThreshold;
      return n.forEach((l) => {
        const r = Math.abs(l - i);
        r <= o && (o = r, a = l);
      }), a;
    }
    setItemPosition(e, t, i) {
      const s = this.snapValue(e, "x", t), n = this.snapValue(e, "y", i), a = this.clampPosition(s, n);
      e.userData.x = a.x, e.userData.y = a.y, e.style.left = "".concat(a.x, "px"), e.style.top = "".concat(a.y, "px");
    }
    setItemRotation(e, t) {
      e.userData.rotation = t, e.style.transform = "rotate(".concat(t, "deg)");
    }
    selectPanel(e) {
      this.selectedItem !== e && (this.deselectPanel(), this.selectedItem = e, e.classList.add("selected"), N("#selection-ui"));
    }
    deselectPanel() {
      this.selectedItem && this.selectedItem.classList.remove("selected"), this.selectedItem = null, z("#selection-ui");
    }
    deleteSelectedPanel() {
      if (!this.selectedItem) return;
      const e = this.selectedItem;
      this.deselectPanel(), this.items = this.items.filter((t) => t !== e), e.remove(), this.refreshEmptyState();
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
      const t = e.slice(1), i = t.length === 3 ? t.split("").map((l) => l + l).join("") : t, s = Number.parseInt(i, 16);
      if (Number.isNaN(s)) return e;
      const n = s >> 16 & 255, a = s >> 8 & 255, o = s & 255;
      return "rgb(".concat(n, " ").concat(a, " ").concat(o, " / 40%)");
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
      });
    }
    clearPanels() {
      this.deselectPanel(), this.items.forEach((e) => e.remove()), this.items = [], this.refreshEmptyState();
    }
    refreshEmptyState() {
      this.emptyState && (this.emptyState.style.display = this.items.length ? "none" : "flex");
    }
  }
  console.clear();
  const h = {};
  h.clock = new He();
  h.sceneConfig = {
    worldScale: 1
  };
  h.appMode = null;
  const W = "room-configurator-scene-state", de = "room-configurator-scene-library", it = [
    "#random_rotate",
    "#random_shuffle",
    "#toglle_net",
    "#add-light-bulb",
    "#add-table",
    "#add-table-lamp",
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
  rt();
  ot();
  async function st() {
    try {
      await nt(), await at(), St();
    } catch (d) {
      console.error("Init error", d);
    }
  }
  async function nt() {
    h.gui = new Oe({
      title: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438"
    }), h.initClass = new Ue(h), h.scene = h.initClass.scene, h.camera = h.initClass.camera, h.renderer = h.initClass.renderer, h.assetManager = new Je(h), h.sceneClass = new Ke(h), h.keyboardOrbitMove = new et(h), pe(), h.renderer.localClippingEnabled = true, h.guiClass = new $e(h);
  }
  async function at() {
    var _a, _b;
    await h.assetManager.loadModels(), ut(), gt(), mt(), pt(), ft(), h.sceneClass.createScene(), h.guiClass && (h.guiClass.refresh(), h.guiClass.refreshLight(), (_b = (_a = h.guiClass).refreshAmbient) == null ? void 0 : _b.call(_a));
  }
  function rt() {
    ht(), ct(), lt(), yt();
  }
  function ot() {
    const d = document.getElementById("app-mode-modal"), e = document.getElementById("btn-start-3d"), t = document.getElementById("btn-start-2d");
    if (!d || !e || !t) return;
    const i = () => {
      d.style.display = "none";
    };
    e.onclick = async () => {
      i(), document.body.classList.remove("mode-2d"), h.appMode = "3d", await st();
    }, t.onclick = () => {
      i(), document.body.classList.add("mode-2d"), h.appMode = "2d", h.panel2dApp = new tt(h), h.panel2dApp.init(), h.panel2dApp.show();
    };
  }
  function E() {
    return h.appMode === "2d" ? h.panel2dApp || null : h.sceneClass || null;
  }
  function lt() {
    for (let d = 1; d <= 4; d++) {
      const e = document.querySelector(".panel".concat(d));
      e && e.addEventListener("pointerdown", (t) => {
        var _a, _b;
        if (t.preventDefault(), h.appMode === "2d") {
          (_a = h.panel2dApp) == null ? void 0 : _a.startPaletteDrag(d - 1, t);
          return;
        }
        (_b = h.sceneClass) == null ? void 0 : _b.startDrag(d - 1, t);
      });
    }
  }
  function ct() {
    const d = document.getElementById("btn-scene-lock");
    d && (d.onclick = () => {
      var _a, _b;
      const n = ((_b = (_a = h.sceneClass) == null ? void 0 : _a.toggleSceneLock) == null ? void 0 : _b.call(_a)) || false;
      pe(n);
    }), document.getElementById("random_rotate").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.randomRotate) == null ? void 0 : _b.call(_a);
    }, document.getElementById("random_shuffle").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.shufflePanelsOnWalls) == null ? void 0 : _b.call(_a);
    }, document.getElementById("toglle_net").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.toggleNet) == null ? void 0 : _b.call(_a);
    };
    const e = document.getElementById("add-light-bulb");
    e && (e.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addSideLightBulb();
    });
    const t = document.getElementById("add-table");
    t && (t.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTable();
    });
    const i = document.getElementById("add-table-lamp");
    i && (i.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTableLamp();
    });
    const s = document.getElementById("add-wall-tv");
    s && (s.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addWallTv();
    });
  }
  function pe(d = null) {
    var _a;
    const e = d != null ? d : !!((_a = h.sceneClass) == null ? void 0 : _a.isSceneLocked), t = document.getElementById("btn-scene-lock"), i = document.getElementById("bottom_panel");
    document.body.classList.toggle("scene-locked", e), i && (i.classList.toggle("closed", e), e && i.classList.remove("compact")), t && (t.textContent = e ? "\u{1F512}" : "\u{1F513}", t.title = e ? "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B" : "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B", t.setAttribute("aria-pressed", String(e)), t.classList.toggle("active", e)), document.querySelectorAll(it.join(",")).forEach((s) => {
      s.disabled = e, s.classList.toggle("scene-lock-disabled", e);
    });
  }
  function ht() {
    document.getElementById("btn-rot-left").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, -Math.PI / 2);
    };
    const d = document.getElementById("panel-color-picker");
    d && d.addEventListener("input", (n) => {
      var _a;
      h.appMode === "3d" && ((_a = h.sceneClass) == null ? void 0 : _a.changeSelectedPanelColor(n.target.value));
    }), document.getElementById("btn-close-sel").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.deselectPanel) == null ? void 0 : _b.call(_a);
    };
    const e = document.getElementById("btn-delete-2d-panel");
    e && (e.onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.deleteSelectedPanel) == null ? void 0 : _b.call(_a);
    }), document.getElementById("btn-all-color").onclick = () => {
      var _a, _b;
      const n = document.getElementById("panel-color-picker");
      n && ((_b = (_a = E()) == null ? void 0 : _a.setAllPanelsColor) == null ? void 0 : _b.call(_a, n.value), fe(n.value));
    };
    const t = document.getElementById("wall-color-picker");
    t && t.addEventListener("input", (n) => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.setAllWallsColor(n.target.value), ye("wall-color-preview", n.target.value);
    });
    const i = document.getElementById("panel-global-color-picker");
    i && i.addEventListener("input", (n) => {
      ie(n.target.value);
    });
    const s = document.getElementById("btn-apply-panel-global-color");
    s && (s.onclick = () => {
      const n = document.getElementById("panel-global-color-picker");
      n && ie(n.value);
    }), document.querySelectorAll("[data-panel-preset-color]").forEach((n) => {
      n.addEventListener("click", () => {
        ie(n.dataset.panelPresetColor);
      });
    });
  }
  function ie(d) {
    var _a, _b;
    (_b = (_a = E()) == null ? void 0 : _a.setAllPanelsColor) == null ? void 0 : _b.call(_a, d), fe(d), dt(d), ye("panel-global-color-preview", d);
  }
  function fe(d) {
    const e = document.getElementById("panel-global-color-picker");
    e && (e.value = d);
  }
  function dt(d) {
    const e = document.getElementById("panel-color-picker");
    e && (e.value = d);
  }
  function ye(d, e) {
    const t = document.getElementById(d);
    t && t.style.setProperty("--preview-color", e);
  }
  function ut() {
    var _a;
    if (!document.getElementById("light-selection-ui")) return;
    const e = ((_a = h.sceneConfig) == null ? void 0 : _a.worldScale) || 1, i = 18 * (e * e), s = 6 * e, n = document.getElementById("light-intensity");
    n && (n.max = String(Math.max(i * 4, 50)), n.value = String(i));
    const a = document.getElementById("light-distance");
    a && (a.max = String(Math.max(s * 3, 20)), a.value = String(s));
    const o = () => {
      const l = h.sceneClass.selectedLightBulb;
      if (!l) return null;
      const r = l.userData.light;
      return r ? {
        bulbMesh: l,
        pointLight: r
      } : null;
    };
    document.getElementById("btn-close-light").onclick = () => {
      h.sceneClass.deselectLightBulb();
    }, document.getElementById("light-color-picker").addEventListener("input", (l) => {
      const r = o();
      r && (r.pointLight.color.set(l.target.value), h.sceneClass.lightManager.syncLightFixture(r.pointLight));
    }), document.getElementById("light-kelvin").addEventListener("input", (l) => {
      const r = o();
      if (!r) return;
      const c = Number(l.target.value), m = h.guiClass.kelvinToHex(c);
      r.pointLight.color.set(m), h.sceneClass.lightManager.syncLightFixture(r.pointLight);
      const u = document.getElementById("light-color-picker");
      u && (u.value = "#" + r.pointLight.color.getHexString());
    }), document.getElementById("light-intensity").addEventListener("input", (l) => {
      const r = o();
      r && (r.pointLight.intensity = Number(l.target.value), h.sceneClass.lightManager.syncLightFixture(r.pointLight));
    }), document.getElementById("light-distance").addEventListener("input", (l) => {
      const r = o();
      r && (r.pointLight.distance = Number(l.target.value));
    }), document.getElementById("light-decay").addEventListener("input", (l) => {
      const r = o();
      r && (r.pointLight.decay = Number(l.target.value));
    }), document.getElementById("bulb-visible").addEventListener("change", (l) => {
      const r = o();
      r && (r.bulbMesh.visible = l.target.checked);
    }), document.getElementById("bulb-emissive").addEventListener("input", (l) => {
      const r = o();
      r && h.sceneClass.lightManager.setLightBulbEmissiveIntensity(r.bulbMesh, Number(l.target.value));
    }), document.getElementById("btn-delete-light").onclick = () => {
      const l = o();
      if (!l) return;
      h.scene.remove(l.bulbMesh), h.scene.remove(l.pointLight);
      const r = h.sceneClass.lightBulbs.findIndex((c) => c.mesh === l.bulbMesh);
      r !== -1 && h.sceneClass.lightBulbs.splice(r, 1), h.sceneClass.lightManager.fillLights = h.sceneClass.lightManager.fillLights.filter((c) => c !== l.pointLight), h.sceneClass.lightManager.disposeLightBulbMesh(l.bulbMesh), h.sceneClass.deselectLightBulb();
    };
  }
  function gt() {
    const d = document.getElementById("btn-close-rug");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("rug-width"), s = document.getElementById("rug-depth"), n = document.getElementById("rug-pos-x"), a = document.getElementById("rug-pos-z");
    i && (i.min = String(h.sceneConfig.worldScale), i.max = String(e * 0.95)), s && (s.min = String(h.sceneConfig.worldScale), s.max = String(t * 0.95)), n && (n.min = String(-e / 2), n.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectRug();
    };
    const o = () => {
      const r = Number(document.getElementById("rug-width").value), c = Number(document.getElementById("rug-depth").value), m = Number(document.getElementById("rug-pos-x").value), u = Number(document.getElementById("rug-pos-z").value);
      h.sceneClass.updateRugTransform(r, c, m, u);
    }, l = document.getElementById("rug-color-picker");
    l && l.addEventListener("input", (r) => {
      h.sceneClass.changeRugColor(r.target.value);
    }), document.getElementById("rug-width").addEventListener("input", o), document.getElementById("rug-depth").addEventListener("input", o), document.getElementById("rug-pos-x").addEventListener("input", o), document.getElementById("rug-pos-z").addEventListener("input", o);
  }
  function mt() {
    const d = document.getElementById("btn-close-furniture");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("furniture-width"), s = document.getElementById("furniture-depth"), n = document.getElementById("furniture-pos-x"), a = document.getElementById("furniture-pos-z");
    i && (i.max = String(e * 0.9)), s && (s.max = String(t * 0.9)), n && (n.min = String(-e / 2), n.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectFurniture();
    };
    const o = () => {
      const r = Number(document.getElementById("furniture-width").value), c = Number(document.getElementById("furniture-depth").value), m = Number(document.getElementById("furniture-pos-x").value), u = Number(document.getElementById("furniture-pos-z").value);
      h.sceneClass.updateFurnitureTransform(r, c, m, u);
    };
    document.getElementById("furniture-width").addEventListener("input", o), document.getElementById("furniture-depth").addEventListener("input", o), document.getElementById("furniture-pos-x").addEventListener("input", o), document.getElementById("furniture-pos-z").addEventListener("input", o), document.getElementById("furniture-rotation").addEventListener("input", (r) => {
      h.sceneClass.updateFurnitureRotation(Number(r.target.value));
    });
    const l = document.getElementById("btn-delete-furniture");
    l && (l.onclick = () => {
      h.sceneClass.deleteTable();
    });
  }
  function pt() {
    const d = document.getElementById("btn-close-table-lamp");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t, heightWall: i } = h.sceneClass.config, s = document.getElementById("table-lamp-pos-x"), n = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z");
    s && (s.min = String(-e / 2), s.max = String(e / 2)), n && (n.min = String(-i / 2), n.max = String(i / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectTableLamp();
    };
    const o = () => {
      const r = Number(document.getElementById("table-lamp-width").value), c = Number(document.getElementById("table-lamp-height").value), m = Number(document.getElementById("table-lamp-pos-x").value), u = Number(document.getElementById("table-lamp-pos-y").value), p = Number(document.getElementById("table-lamp-pos-z").value);
      h.sceneClass.updateTableLampTransform(r, c, m, u, p);
    };
    document.getElementById("table-lamp-width").addEventListener("input", o), document.getElementById("table-lamp-height").addEventListener("input", o), document.getElementById("table-lamp-pos-x").addEventListener("input", o), document.getElementById("table-lamp-pos-y").addEventListener("input", o), document.getElementById("table-lamp-pos-z").addEventListener("input", o);
    const l = document.getElementById("btn-delete-table-lamp-ui");
    l && (l.onclick = () => {
      h.sceneClass.deleteTableLamp();
    });
  }
  function ft() {
    const d = document.getElementById("btn-close-wall-tv");
    if (!d) return;
    d.onclick = () => {
      h.sceneClass.deselectWallTv();
    };
    const e = () => {
      const i = Number(document.getElementById("wall-tv-width").value), s = Number(document.getElementById("wall-tv-height").value), n = Number(document.getElementById("wall-tv-pos-x").value), a = Number(document.getElementById("wall-tv-pos-y").value), o = Number(document.getElementById("wall-tv-wall").value);
      h.sceneClass.updateWallTvTransform(i, s, n, a, o);
    };
    document.getElementById("wall-tv-width").addEventListener("input", e), document.getElementById("wall-tv-height").addEventListener("input", e), document.getElementById("wall-tv-pos-x").addEventListener("input", e), document.getElementById("wall-tv-pos-y").addEventListener("input", e), document.getElementById("wall-tv-wall").addEventListener("input", e);
    const t = document.getElementById("btn-delete-wall-tv-ui");
    t && (t.onclick = () => {
      h.sceneClass.deleteWallTv();
    });
  }
  function yt() {
    const d = document.getElementById("save-load-modal"), e = document.getElementById("btn-presets"), t = document.getElementById("btn-close-save-load"), i = document.getElementById("save-load-backdrop"), s = document.getElementById("btn-save-scene-state"), n = document.getElementById("btn-load-scene-storage"), a = document.getElementById("btn-copy-scene-state"), o = document.getElementById("btn-paste-scene-state"), l = document.getElementById("btn-load-scene-text"), r = document.getElementById("scene-state-text"), c = document.getElementById("scene-state-status"), m = document.getElementById("scene-state-saved-list");
    if (!d || !e || !r || !c || !m) return;
    const u = (g) => {
      c.textContent = g;
    }, p = (g) => "roomcfg:" + btoa(unescape(encodeURIComponent(JSON.stringify(g)))), w = (g) => {
      const y = g.trim().replace(/^roomcfg:/, "");
      return JSON.parse(decodeURIComponent(escape(atob(y))));
    }, I = () => {
      const g = E();
      if (!(g == null ? void 0 : g.getSceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      return {
        mode: h.appMode || "3d",
        state: g.getSceneState()
      };
    }, x = (g) => {
      const y = g && typeof g == "object" && g.mode && Object.prototype.hasOwnProperty.call(g, "state"), k = y ? g.mode : "3d", B = y ? g.state : g;
      if (k !== h.appMode) throw new Error("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u0430\u043D\u043E \u0434\u043B\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430");
      const D = E();
      if (!(D == null ? void 0 : D.applySceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      D.applySceneState(B);
    }, S = () => {
      try {
        const g = JSON.parse(localStorage.getItem(de) || "[]");
        return Array.isArray(g) ? g.filter((y) => typeof y == "string" && y.trim().length > 0) : [];
      } catch (g) {
        return console.error(g), [];
      }
    }, L = (g) => {
      localStorage.setItem(de, JSON.stringify(g));
    }, v = (g) => {
      const y = g.trim(), k = S(), B = k.includes(y), D = B ? k : [
        y,
        ...k
      ];
      return localStorage.setItem(W, y), L(D), {
        alreadyExists: B,
        library: D
      };
    }, P = () => {
      const g = S();
      if (m.innerHTML = "", !g.length) {
        const y = document.createElement("div");
        y.className = "scene-state-saved-empty", y.textContent = "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439.", m.appendChild(y);
        return;
      }
      g.forEach((y, k) => {
        const B = document.createElement("div");
        B.className = "scene-state-saved-item";
        const D = document.createElement("div");
        D.className = "scene-state-saved-preview", D.textContent = "".concat(k + 1, ". ").concat(y);
        const X = document.createElement("div");
        X.className = "scene-state-saved-actions";
        const G = document.createElement("button");
        G.className = "action-btn", G.textContent = "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C", G.onclick = () => {
          try {
            r.value = y, x(w(y)), localStorage.setItem(W, y), u("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0439.");
          } catch (R) {
            u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(R);
          }
        };
        const j = document.createElement("button");
        j.className = "action-btn", j.textContent = "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", j.onclick = async () => {
          try {
            await navigator.clipboard.writeText(y), r.value = y, localStorage.setItem(W, y), u("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430.");
          } catch (R) {
            u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(R);
          }
        };
        const V = document.createElement("button");
        V.className = "action-btn", V.textContent = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", V.onclick = () => {
          const R = S().filter((Z) => Z !== y);
          if (L(R), (r.value || "").trim() === y && (r.value = ""), (localStorage.getItem(W) || "").trim() === y) {
            const Z = R[0] || "";
            Z ? localStorage.setItem(W, Z) : localStorage.removeItem(W);
          }
          P(), u("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0438\u0437 \u043F\u0430\u043C\u044F\u0442\u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430.");
        }, X.appendChild(G), X.appendChild(j), X.appendChild(V), B.appendChild(D), B.appendChild(X), m.appendChild(B);
      });
    }, ne = () => {
      const g = localStorage.getItem(W);
      !g || S().includes(g) || L([
        g,
        ...S()
      ]);
    }, we = () => {
      d.style.display = "block", r.value = localStorage.getItem(W) || "", ne(), P(), u("");
    }, ae = () => {
      d.style.display = "none";
    };
    e.onclick = we, t && (t.onclick = ae), i && (i.onclick = ae), s && (s.onclick = async () => {
      try {
        const g = p(I()), { alreadyExists: y } = v(g);
        r.value = g, P(), u(y ? "\u0422\u0430\u043A\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0432 \u043F\u0430\u043C\u044F\u0442\u0438. \u0421\u0442\u0440\u043E\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043D\u0438\u0436\u0435." : "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0432 \u043F\u0430\u043C\u044F\u0442\u044C \u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0441\u043F\u0438\u0441\u043E\u043A.");
      } catch (g) {
        u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(g);
      }
    }), n && (n.onclick = () => {
      try {
        const g = localStorage.getItem(W);
        if (!g) {
          u("\u0412 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043F\u043E\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442.");
          return;
        }
        r.value = g, x(w(g)), P(), u("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430.");
      } catch (g) {
        u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430."), console.error(g);
      }
    }), a && (a.onclick = async () => {
      try {
        if (!r.value.trim()) {
          const g = p(I());
          v(g), r.value = g, P();
        }
        await navigator.clipboard.writeText(r.value), u("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430.");
      } catch (g) {
        u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(g);
      }
    }), o && (o.onclick = async () => {
      try {
        const g = await navigator.clipboard.readText();
        if (!g.trim()) {
          u("\u0411\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430 \u043F\u0443\u0441\u0442.");
          return;
        }
        r.value = g, x(w(g)), v(g), P(), u("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430.");
      } catch (g) {
        u("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430."), console.error(g);
      }
    }), l && (l.onclick = () => {
      try {
        if (!r.value.trim()) {
          u("\u041F\u043E\u043B\u0435 \u0441\u043E \u0441\u0442\u0440\u043E\u043A\u043E\u0439 \u043F\u0443\u0441\u0442\u043E\u0435.");
          return;
        }
        const g = r.value.trim();
        x(w(g)), v(g), P(), u("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043B\u044F.");
      } catch (g) {
        u("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430 \u0438\u043B\u0438 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442."), console.error(g);
      }
    }), ne(), P();
  }
  function wt(d) {
    h.testMesh && (h.testMesh.rotation.y += d * 0.5), h.keyboardOrbitMove && h.keyboardOrbitMove.update(d), h.sceneClass && h.sceneClass.updateAnimations(d);
  }
  function bt() {
    h.renderer && h.scene && h.camera && h.renderer.render(h.scene, h.camera), h.initClass && h.initClass.stats && h.initClass.stats.update();
  }
  function St() {
    let d = 0;
    const e = 1 / 60, t = 0.1;
    h.renderer.setAnimationLoop(() => {
      let i = h.clock.getDelta();
      i > t && (i = t), d += i;
      let s = 5;
      for (; d >= e && s > 0; ) wt(e), d -= e, s--;
      d > e && (d = 0), bt();
    });
  }
})();
export {
  __tla,
  xt as __vite_legacy_guard
};
