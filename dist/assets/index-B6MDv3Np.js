import { S as ce, P as ue, W as de, a as A, b as ge, A as me, O as pe, c as fe, R as X, V as R, d as b, e as k, f as ye, B as O, M as F, g as D, h as _, Q as K, i as G, E as be, L as Me, j as we, T as le, k as w, l as $, F as V, C as ie, m as se, n as J, o as T, G as ne, D as Q, p as xe, q as Se, r as Ce, s as Le, t as Ie } from "./three-CLYm0m9O.js";
let tt;
let __tla = (async () => {
  tt = function() {
    import.meta.url, import("_").then(async (m) => {
      await m.__tla;
      return m;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver((n) => {
      for (const s of n) if (s.type === "childList") for (const a of s.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(n) {
      const s = {};
      return n.integrity && (s.integrity = n.integrity), n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? s.credentials = "include" : n.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
    }
    function i(n) {
      if (n.ep) return;
      n.ep = true;
      const s = t(n);
      fetch(n.href, s);
    }
  })();
  class Pe {
    constructor(e) {
      var _a;
      this.gameContext = e;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.onWindowResize = this.onWindowResize.bind(this), this.scene = new ce(), this.camera = new ue(40, window.innerWidth / window.innerHeight, 0.1 * t, 40 * t), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10 * t, this.renderer = new de({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = A, this.renderer.shadowMap.enabled = true, this.renderer.shadowMap.type = ge, this.renderer.toneMapping = me, this.renderer.toneMappingExposure = 0.58, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new pe(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new fe(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const i = window.innerWidth, n = window.innerHeight, s = Math.min(i, 1920), a = Math.min(n, 1080);
      this.renderer.setSize(s, a, false);
      const o = this.renderer.domElement;
      o.style.position = "fixed", o.style.left = "50%", o.style.top = "50%", o.style.transform = "translate(-50%, -50%)", o.style.width = s + "px", o.style.height = a + "px", this.camera.aspect = s / a, this.camera.updateProjectionMatrix();
    }
  }
  class ve {
    constructor(e, t, i) {
      this.gameContext = e, this.walls = t, this.worldScale = i.worldScale || 1, this.cellSize = i.cellSize || 0.5, this.panelDepth = i.panelDepth || 0.05, this.raycaster = new X(), this.pointer = new R(), this.mouseDownPointer = new R(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
    }
    handlePointerDown(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) for (const i of t) {
        let n = i.object;
        for (; n.parent && !this.walls.includes(n); ) n = n.parent;
        if (this.walls.includes(n) && !this.isWallFacingCamera(n)) continue;
        let s = i.object;
        for (; s.parent && !s.userData.isPanel && s !== this.gameContext.scene; ) s = s.parent;
        if (s.userData.isPanel) return this.pendingPanel = s, this.mouseDownPointer.set(e.clientX, e.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    isWallFacingCamera(e) {
      const t = this.gameContext.camera, i = new b();
      e.getWorldPosition(i);
      const n = new b().subVectors(t.position, i), s = new b(0, 0, 1).applyQuaternion(e.quaternion);
      return n.dot(s) > 0;
    }
    startDrag(e, t) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const n = this.gameContext.assetManager.panels[e];
      n && (this.ghostMesh = n.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.savedColor !== null ? this.applyColor(this.ghostMesh, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(this.ghostMesh, this.gameContext.sceneClass.globalPanelColor), this.ghostMesh.traverse((s) => {
        s.raycast = () => {
        };
      }), this.gameContext.scene.add(this.ghostMesh), this.ghostMesh.visible = true, t && (this.updatePointer(t), this.onPointerMove(t)));
    }
    onPointerMove(e) {
      if (this.pendingPanel && !this.isDragging && Math.sqrt(Math.pow(e.clientX - this.mouseDownPointer.x, 2) + Math.pow(e.clientY - this.mouseDownPointer.y, 2)) > 15 && this.pickupPendingPanel(e), !this.isDragging || !this.ghostMesh) return;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, false);
      if (t.length > 0) {
        const i = t[0], n = i.object;
        if (this.currentWall !== n) {
          this.currentWall = n;
          const s = this.getWallClippingPlanes(n);
          this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: s
          });
        }
        this.snapToGrid(i, n);
        return;
      }
      this.moveInAir();
    }
    pickupPendingPanel(e) {
      const t = this.pendingPanel, i = t.userData.panelIndex;
      this.savedColor = null, t.traverse((n) => {
        if (this.savedColor === null && n.isMesh && n.material) {
          const s = Array.isArray(n.material) ? n.material[0] : n.material;
          this.savedColor = s.color.getHex();
        }
      }), this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(i, e), this.pendingPanel = null;
    }
    snapToGrid(e, t) {
      const i = t.geometry.parameters.width, n = t.geometry.parameters.height, s = t.userData.gridTexture, a = t.worldToLocal(e.point.clone());
      let o = a.x / i + 0.5, l = a.y / n + 0.5;
      o = o * s.repeat.x + s.offset.x, l = l * s.repeat.y + s.offset.y;
      const r = Math.floor(o), u = Math.floor(l);
      if (t.children.some((x) => x.userData.isPanel && x.userData.gridX === r && x.userData.gridY === u)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = r, this.ghostMesh.userData.gridY = u;
      const m = (r + 0.5 - s.offset.x) / s.repeat.x, p = (u + 0.5 - s.offset.y) / s.repeat.y, M = (m - 0.5) * i, S = (p - 0.5) * n;
      a.x = M, a.y = S, a.z = 0;
      const f = t.localToWorld(a);
      this.ghostMesh.position.copy(f), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
    placePanel() {
      const t = this.gameContext.assetManager.panels[this.draggedPanelIndex];
      if (!t) return;
      const i = t.clone();
      i.userData.isPanel = true, i.userData.panelIndex = this.draggedPanelIndex, i.userData.gridX = this.ghostMesh.userData.gridX, i.userData.gridY = this.ghostMesh.userData.gridY;
      const n = this.getWallClippingPlanes(this.currentWall);
      this.applyMaterialProperties(i, {
        transparent: false,
        opacity: 1,
        clippingPlanes: n,
        cloneMaterial: true
      }), this.savedColor !== null ? this.applyColor(i, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(i, this.gameContext.sceneClass.globalPanelColor);
      const s = this.ghostMesh.position.clone(), a = new b(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
      s.add(a.multiplyScalar(this.panelDepth * 0.25)), this.currentWall.add(i), this.currentWall.worldToLocal(s), i.position.copy(s), i.rotation.set(0, 0, 0), i.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(i);
    }
    applyColor(e, t) {
      e.traverse((i) => {
        if (!i.isMesh || !i.material) return;
        (Array.isArray(i.material) ? i.material : [
          i.material
        ]).forEach((s) => {
          s.color && (typeof t == "string" ? s.color.set(t) : s.color.setHex(t), s.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(e, { transparent: t, opacity: i, clippingPlanes: n, cloneMaterial: s }) {
      e.traverse((a) => {
        if (!a.isMesh) return;
        s && (Array.isArray(a.material) ? a.material = a.material.map((l) => l.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), i !== void 0 && (l.opacity = i), n !== void 0 && (l.clippingPlanes = n), l.needsUpdate = true;
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
      const t = e.geometry.parameters.width, i = e.geometry.parameters.height, n = new b(1, 0, 0).applyQuaternion(e.quaternion), s = new b(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new k().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(t / 2))),
        new k().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-t / 2))),
        new k().setFromNormalAndCoplanarPoint(s.clone().negate(), a.clone().add(s.clone().multiplyScalar(i / 2))),
        new k().setFromNormalAndCoplanarPoint(s.clone(), a.clone().add(s.clone().multiplyScalar(-i / 2)))
      ];
    }
  }
  class Be {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.worldScaleSquared = this.worldScale * this.worldScale, this.defaultCenterLightIntensity = 52 * this.worldScaleSquared, this.defaultSideLightIntensity = 18 * this.worldScaleSquared, this.defaultSideLightDistance = 6 * this.worldScale, this.ambientLight = new ye(16777215, 0.18), this.centerLight = null, this.lightBulbMesh = null, this.sideLight = null, this.sideBulbMesh = null, this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.lightDragPlane = new k(), this.lightDragIntersectionPoint = new b(), this.lightDragOffset = new b(), this.pointer = new R(), this.raycaster = new X();
    }
    createScene() {
      this.createCenterLight(), this.addAmbientLight();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new O(1 * this.worldScale, 0.05 * this.worldScale, 1 * this.worldScale), i = new F({
        color: 1118481,
        emissive: 16777198,
        emissiveIntensity: 2,
        roughness: 0.7
      });
      this.lightBulbMesh = new D(t, i);
      const n = e / 2 - 0.03 * this.worldScale;
      this.lightBulbMesh.position.set(0, n, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new _(16770754, this.defaultCenterLightIntensity, 0, 2), this.centerLight.position.set(0, n, 1 * this.worldScale), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 2048, this.centerLight.shadow.mapSize.height = 2048, this.centerLight.shadow.bias = -3e-5, this.centerLight.shadow.normalBias = 0.02, this.centerLight.shadow.radius = 8, this.gameContext.scene.add(this.centerLight);
      const s = new O(0.1 * this.worldScale, 0.1 * this.worldScale, 0.1 * this.worldScale), a = new F({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      });
      this.sideBulbMesh = new D(s, a), this.sideBulbMesh.position.set(1.5 * this.worldScale, 0.5 * this.worldScale, -1 * this.worldScale), this.sideLight = new _(16755302, this.defaultSideLightIntensity, 0, 2), this.sideLight.position.set(1.5 * this.worldScale, 0.5 * this.worldScale, -1 * this.worldScale), this.sideLight.castShadow = true, this.sideLight.shadow.mapSize.width = 1024, this.sideLight.shadow.mapSize.height = 1024, this.sideLight.shadow.bias = -3e-5, this.sideLight.shadow.normalBias = 0.02, this.sideLight.shadow.radius = 6;
    }
    addAmbientLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    addSideLightBulb() {
      const e = new O(0.1 * this.worldScale, 0.1 * this.worldScale, 0.1 * this.worldScale), t = new F({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      }), i = new D(e, t), n = (Math.random() - 0.5) * this.config.widthWallFront, s = (Math.random() - 0.5) * this.config.heightWall, a = (Math.random() - 0.5) * this.config.widthWallSide;
      i.position.set(n, s, a);
      const o = new _(16755302, this.defaultSideLightIntensity, this.defaultSideLightDistance, 1.7);
      o.position.copy(i.position), o.castShadow = false, i.userData.isLightBulb = true, i.userData.light = o, this.gameContext.scene.add(i), this.gameContext.scene.add(o), this.lightBulbs.push({
        mesh: i,
        light: o
      });
    }
    selectLightBulb(e) {
      this.selectedLightBulb = e;
      const t = document.querySelector(".light-selection-ui");
      t && (t.style.display = "flex"), this.refreshLightBulbUI();
    }
    deselectLightBulb() {
      this.selectedLightBulb = null;
      const e = document.querySelector(".light-selection-ui");
      e && (e.style.display = "none");
    }
    refreshLightBulbUI() {
      const e = this.selectedLightBulb;
      if (!e) return;
      const t = e.userData.light;
      if (!t) return;
      const i = Math.max(50, this.defaultSideLightIntensity * 4, t.intensity * 1.5), n = Math.max(20, this.defaultSideLightDistance * 3, t.distance * 1.5), s = document.getElementById("light-color-picker");
      s && (s.value = "#" + t.color.getHexString());
      const a = document.getElementById("light-intensity");
      a && (a.max = String(i), a.value = String(t.intensity));
      const o = document.getElementById("light-distance");
      o && (o.max = String(n), o.value = String(t.distance));
      const l = document.getElementById("light-decay");
      l && (l.value = String(t.decay));
      const r = document.getElementById("bulb-visible");
      r && (r.checked = e.visible);
      const u = document.getElementById("bulb-emissive");
      u && e.material && e.material.emissiveIntensity !== void 0 && (u.value = String(e.material.emissiveIntensity));
    }
    findLightBulbHit(e) {
      const t = this.lightBulbs.map((n) => n.mesh);
      if (t.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(t, false);
      return i.length === 0 ? null : i[0].object;
    }
    startDragLightBulb(e, t) {
      this.isDraggingLightBulb = true, this.draggedLightBulbMesh = e, this.gameContext.controls && (this.gameContext.controls.enabled = false);
      const i = new b();
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
  class Ee {
    constructor(e) {
      this.roomManager = e, this.selectedPanel = null, this.animatingPanels = [], this.globalPanelColor = null;
    }
    updateAnimations(e) {
      for (let n = this.animatingPanels.length - 1; n >= 0; n--) {
        const s = this.animatingPanels[n], a = !!s.userData.targetQuaternion, o = !!s.userData.targetPosition;
        a && (s.quaternion.slerp(s.userData.targetQuaternion, e * 10), s.quaternion.angleTo(s.userData.targetQuaternion) < 0.01 && (s.quaternion.copy(s.userData.targetQuaternion), delete s.userData.targetQuaternion)), o && (s.position.lerp(s.userData.targetPosition, e * 10), s.position.distanceTo(s.userData.targetPosition) < 1e-3 && (s.position.copy(s.userData.targetPosition), delete s.userData.targetPosition)), !s.userData.targetQuaternion && !s.userData.targetPosition && this.animatingPanels.splice(n, 1);
      }
    }
    randomRotate() {
      const e = this.getAllPanels();
      if (e.length !== 0) {
        for (let t = e.length - 1; t > 0; t--) {
          const i = Math.floor(Math.random() * (t + 1)), n = e[t];
          e[t] = e[i], e[i] = n;
        }
        e.forEach((t) => {
          const n = Math.ceil(Math.random() * 3) * (Math.PI / 2), s = new K();
          s.setFromAxisAngle(new b(0, 1, 0), n);
          const a = t.userData.targetQuaternion ? t.userData.targetQuaternion.clone() : t.quaternion.clone();
          t.userData.targetQuaternion = a.multiply(s), this.enqueueAnimation(t);
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
        })), n = this.roomManager.config.panelDepth * 0.1;
        for (let r = i.length - 1; r > 0; r--) {
          const u = Math.floor(Math.random() * (r + 1)), g = i[r];
          i[r] = i[u], i[u] = g;
        }
        const s = e.geometry.parameters.width, a = e.geometry.parameters.height, o = e.userData.gridTexture;
        if (!o) return;
        function l(r, u) {
          const g = r + 0.5, m = u + 0.5, p = (g - o.offset.x) / o.repeat.x, M = (m - o.offset.y) / o.repeat.y;
          return new b((p - 0.5) * s, (M - 0.5) * a, n);
        }
        t.forEach((r, u) => {
          const g = i[u];
          r.userData.gridX = g.gridX, r.userData.gridY = g.gridY, r.userData.targetPosition = l(g.gridX, g.gridY), this.enqueueAnimation(r);
        });
      });
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e, this.addSelectionOutline(e);
      let t = "#ffffff";
      e.traverse((n) => {
        n.isMesh && n.material && (t = "#" + (Array.isArray(n.material) ? n.material[0] : n.material).color.getHexString());
      });
      const i = document.querySelector(".selection-ui");
      if (i) {
        i.style.display = "flex";
        const n = document.getElementById("panel-color-picker");
        n && (n.value = t);
      }
    }
    deselectPanel() {
      if (!this.selectedPanel) return;
      this.removeSelectionOutline(), this.selectedPanel = null;
      const e = document.querySelector(".selection-ui");
      e && (e.style.display = "none");
    }
    changeSelectedPanelColor(e) {
      this.selectedPanel && this.selectedPanel.traverse((t) => {
        t.isMesh && t.material && t.name !== "selection_outline" && (Array.isArray(t.material) ? t.material.forEach((i) => i.color.set(e)) : t.material.color.set(e));
      });
    }
    rotateSelectedPanel(e) {
      if (!this.selectedPanel) return;
      this.selectedPanel.userData.targetQuaternion || (this.selectedPanel.userData.targetQuaternion = this.selectedPanel.quaternion.clone());
      const t = new K();
      t.setFromAxisAngle(new b(0, 1, 0), e), this.selectedPanel.userData.targetQuaternion.multiply(t), this.enqueueAnimation(this.selectedPanel);
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.roomManager.walls.forEach((t) => {
        t.traverse((i) => {
          i.userData && i.userData.isPanel && i.traverse((n) => {
            n.isMesh && n.material && (Array.isArray(n.material) ? n.material.forEach((s) => s.color.set(e)) : n.material.color.set(e));
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
      const t = new G(), i = new b();
      e.updateMatrixWorld(true);
      const n = e.matrixWorld.clone().invert();
      let s = false;
      e.traverse((m) => {
        if (m.isMesh && m.geometry) {
          const p = m.geometry.attributes.position;
          if (!p) return;
          for (let M = 0; M < p.count; M++) i.fromBufferAttribute(p, M), i.applyMatrix4(m.matrixWorld), i.applyMatrix4(n), t.expandByPoint(i);
          s = true;
        }
      }), s || t.set(new b(-0.25, -0.25, 0), new b(0.25, 0.25, 0.05));
      const a = new b(), o = new b();
      t.getSize(a), t.getCenter(o), a.multiplyScalar(1.02);
      const l = new O(a.x, a.y, a.z), r = new be(l), u = new Me({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new we(r, u);
      g.position.copy(o), g.name = "selection_outline", g.raycast = () => {
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
  const j = new b(), ae = new b();
  class De {
    constructor(e, t, i) {
      this.gameContext = e, this.config = t, this.onWallChanged = i, this.floor = null, this.ceiling = null, this.isNetVisible = true, this.activeWallIndex = 0, this.textureLoader = new le(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg"), this.wallTexture.wrapS = w, this.wallTexture.wrapT = w, this.wallTexture.colorSpace = A, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallRoughness = this.textureLoader.load("textures/1/wall-roughness.jpg"), this.wallRoughness.wrapS = w, this.wallRoughness.wrapT = w, this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg"), this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg"), this.floorRoughness = this.textureLoader.load("textures/1/floor-roughness.jpg"), [
        this.floorTexture,
        this.floorNormal,
        this.floorRoughness
      ].forEach((n) => {
        n.wrapS = w, n.wrapT = w;
      }), this.floorTexture.colorSpace = A, this.floorTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.ceilingTexture = this.textureLoader.load("textures/1/ceiling-color.jpg"), this.ceilingTexture.wrapS = w, this.ceilingTexture.wrapT = w, this.ceilingTexture.colorSpace = A, this.ceilingTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.createWalls();
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
      const i = new $(e, t), n = e / this.config.cellSize, s = t / this.config.cellSize, a = this.wallTexture.clone();
      a.repeat.set(e / 2, t / 2), a.wrapS = w, a.wrapT = w, a.needsUpdate = true;
      const o = this.wallRoughness.clone();
      o.repeat.set(n, s);
      const l = this.baseGridTexture.clone();
      l.repeat.set(n, s), l.wrapS = w, l.wrapT = w, l.needsUpdate = true;
      const r = this.baseBlankTexture.clone();
      r.repeat.set(n, s), r.wrapS = w, r.wrapT = w, r.needsUpdate = true;
      const u = new F({
        map: a,
        roughnessMap: o,
        alphaMap: l,
        transparent: true,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: V
      });
      u.envMapIntensity = 0.8;
      const g = new D(i, u);
      return g.userData.gridTexture = l, g.userData.blankTexture = r, g.receiveShadow = true, g.onBeforeRender = (m, p, M) => {
        g.getWorldPosition(j), j.subVectors(M.position, j), ae.set(0, 0, 1).transformDirection(g.matrixWorld);
        const S = j.dot(ae) > 0;
        g.children.forEach((f) => {
          f.visible = S;
        });
      }, g;
    }
    loadWalls() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: i } = this.config, n = new $(e, t), s = e / 2, a = t / 2, o = this.floorTexture.clone(), l = this.floorNormal.clone(), r = this.floorRoughness.clone();
      [
        o,
        l,
        r
      ].forEach((p) => {
        p.repeat.set(s, a), p.needsUpdate = true;
      });
      const u = new F({
        color: 16777215,
        map: o,
        normalMap: l,
        roughnessMap: r,
        roughness: 1,
        metalness: 0.1,
        side: V
      });
      this.floor = new D(n, u), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -i / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const g = this.ceilingTexture.clone();
      g.repeat.set(s, a), g.needsUpdate = true;
      const m = new F({
        color: 16777215,
        map: g,
        roughness: 0.9,
        side: V
      });
      this.ceiling = new D(n, m), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = i / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    handleWallSelection(e) {
      const t = this.getPointer(e), i = new X();
      i.setFromCamera(t, this.gameContext.camera);
      const n = i.intersectObjects(this.walls, false);
      n.length > 0 && this.setActiveWall(n[0].object);
    }
    setActiveWall(e) {
      const t = this.walls.indexOf(e);
      t !== -1 && (this.activeWallIndex = t, this.onWallChanged && this.onWallChanged());
    }
    highlightActiveWall() {
      this.walls.forEach((e, t) => {
        const i = t === this.activeWallIndex;
        e.material.color.setHex(i ? 8947848 : 16777215), e.material.opacity = i ? 0.4 : 0.8;
      });
    }
    toggleNet() {
      this.isNetVisible = !this.isNetVisible, this.walls.forEach((e) => {
        e.material && (e.material.alphaMap = this.isNetVisible ? e.userData.gridTexture : null, e.material.needsUpdate = true);
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
      t.fillStyle = "#cccccc", t.fillRect(0, 0, 128, 128), t.strokeStyle = "#444444", t.lineWidth = 2, t.strokeRect(0, 0, 128, 128);
      const i = new ie(e);
      return i.magFilter = se, i.minFilter = J, i.generateMipmaps = true, i.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i;
    }
    createBlankTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#ffffff", t.fillRect(0, 0, 128, 128);
      const i = new ie(e);
      return i.magFilter = se, i.minFilter = J, i.generateMipmaps = true, i.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i;
    }
    getPointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      return new R((e.clientX - i.left) / i.width * 2 - 1, -((e.clientY - i.top) / i.height * 2 - 1));
    }
  }
  class We {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.rug = null, this.selectedRug = null, this.raycaster = new X(), this.pointer = new R();
    }
    createScene() {
      const { heightWall: e } = this.config, t = 4 * this.worldScale, i = 3 * this.worldScale, n = new O(t, 5e-3 * this.worldScale, i), s = new le(), a = s.load("textures/1/carpet-color.jpg"), o = s.load("textures/1/carpet-normal.jpg");
      a.wrapS = w, a.wrapT = w, a.repeat.set(t, i), o.wrapS = w, o.wrapT = w, o.repeat.set(t, i), a.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), a.colorSpace = A, a.generateMipmaps = true, a.minFilter = J;
      const l = new F({
        map: a,
        bumpMap: o,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new D(n, l), this.rug.position.y = -e / 2 + 5e-3 * this.worldScale, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = t, this.rug.userData.baseDepth = i, this.gameContext.scene.add(this.rug);
    }
    hitTest(e) {
      return this.rug ? (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.intersectObject(this.rug, false).length > 0) : false;
    }
    selectRug() {
      this.selectedRug = this.rug;
      const e = document.querySelector(".rug-selection-ui");
      e && (e.style.display = "flex"), this.refreshRugUI();
    }
    deselectRug() {
      this.selectedRug = null;
      const e = document.querySelector(".rug-selection-ui");
      if (e && (e.style.display = "none"), this.rug) {
        const t = document.getElementById("rug-color-picker");
        t && (t.value = "#" + this.rug.material.color.getHexString());
      }
    }
    updateRugTransform(e, t, i, n) {
      if (!this.rug) return;
      const s = this.rug.userData.baseWidth, a = this.rug.userData.baseDepth, o = Math.max((this.config.widthWallFront - e) / 2, 0), l = Math.max((this.config.widthWallSide - t) / 2, 0);
      this.rug.scale.set(e / s, 1, t / a), this.rug.position.x = T.clamp(i, -o, o), this.rug.position.z = T.clamp(n, -l, l), this.rug.material.map && this.rug.material.map.repeat.set(e, t), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(e, t), this.refreshRugUI();
    }
    refreshRugUI() {
      if (!this.rug) return;
      const e = document.getElementById("rug-width"), t = document.getElementById("rug-depth"), i = document.getElementById("rug-pos-x"), n = document.getElementById("rug-pos-z"), s = this.rug.userData.baseWidth * this.rug.scale.x, a = this.rug.userData.baseDepth * this.rug.scale.z, o = Math.max(this.config.widthWallFront * 0.95, s), l = Math.max(this.config.widthWallSide * 0.95, a), r = Math.max(this.worldScale, 0.1), u = Math.max(this.worldScale, 0.1), g = Math.max((this.config.widthWallFront - s) / 2, 0), m = Math.max((this.config.widthWallSide - a) / 2, 0);
      e && (e.min = String(r), e.max = String(o), e.value = String(s)), t && (t.min = String(u), t.max = String(l), t.value = String(a)), i && (i.min = String(-g), i.max = String(g), i.value = String(this.rug.position.x)), n && (n.min = String(-m), n.max = String(m), n.value = String(this.rug.position.z));
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
  const re = [
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
  ], Z = {
    x: 0,
    y: -0.2,
    z: 0
  };
  class Te {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.furnitureItems = [], this.tableLamps = [], this.selectedFurniture = null, this.selectedLamp = null, this.raycaster = new X(), this.pointer = new R(), this._tempQuaternion = new K();
    }
    addTable() {
      if (this.furnitureItems.length > 0) {
        const r = this.furnitureItems[0];
        return this.selectFurniture(r), r;
      }
      const e = this.gameContext.assetManager.furniture.table;
      if (!e) return console.warn("\u0421\u0442\u043E\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new ne(), i = e.clone(true);
      t.name = "table_".concat(this.furnitureItems.length + 1), t.userData.type = "table", t.userData.isFurniture = true, t.add(i), i.traverse((r) => {
        r.isMesh && (r.castShadow = true, r.receiveShadow = false, Array.isArray(r.material) ? r.material = r.material.map((u) => u.clone()) : r.material && (r.material = r.material.clone()), this.tuneFurnitureMaterial(r));
      });
      const n = new G().setFromObject(i), s = n.getCenter(new b()), a = n.getSize(new b());
      i.position.x -= s.x, i.position.y -= n.min.y, i.position.z -= s.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.userData.rotationStep = 0;
      const o = -this.config.heightWall / 2, l = re[this.furnitureItems.length % re.length];
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
      const t = new ne(), i = e.clone(true);
      t.name = "table_lamp_".concat(this.tableLamps.length + 1), t.userData.isTableLamp = true, t.userData.type = "tableLamp", t.add(i), i.traverse((o) => {
        o.isMesh && (o.castShadow = true, o.receiveShadow = false, Array.isArray(o.material) ? o.material = o.material.map((l) => l.clone()) : o.material && (o.material = o.material.clone()), this.tuneLampMaterial(o));
      });
      const n = new G().setFromObject(i), s = n.getCenter(new b()), a = n.getSize(new b());
      return i.position.x -= s.x, i.position.y -= n.min.y, i.position.z -= s.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.position.set(Z.x * this.worldScale, Z.y * this.worldScale, Z.z * this.worldScale), this.gameContext.scene.add(t), this.tableLamps.push(t), this.selectLamp(t), t;
    }
    deleteTableLamp() {
      const e = this.tableLamps[0];
      e && (this.removeObject(e), this.tableLamps = [], this.selectedLamp === e && this.deselectLamp());
    }
    tuneFurnitureMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = Q, i.envMap = null, i.envMapIntensity = 0, i.shadowSide = Q, i.toneMapped = true, i.map && (i.map.colorSpace = A, i.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), i.map.needsUpdate = true), i.name === "Material.002" && (i.color.setRGB(0.62, 0.62, 0.64), i.roughness = 0.68, i.metalness = 0), i.name === "default.001" && (i.color.setRGB(1, 1, 1), i.roughness = 0.58, i.metalness = 0), i.needsUpdate = true);
      });
    }
    tuneLampMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((i) => {
        i && (i.side = Q, i.envMap = null, i.envMapIntensity = 0, i.name === "abajor" && (i.color.setRGB(0.95, 0.92, 0.82), i.roughness = 0.9, i.metalness = 0), (i.name === "black rkham" || i.name === "Material.005") && (i.color.multiplyScalar(1.8), i.roughness = 0.55, i.metalness = 0), i.needsUpdate = true);
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
    selectFurniture(e) {
      this.selectedFurniture = e;
      const t = document.querySelector(".furniture-selection-ui");
      t && (t.style.display = "flex"), this.refreshFurnitureUI();
    }
    deselectFurniture() {
      this.selectedFurniture = null;
      const e = document.querySelector(".furniture-selection-ui");
      e && (e.style.display = "none");
    }
    removeObject(e) {
      this.gameContext.scene.remove(e), e.traverse((t) => {
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
      const t = document.getElementById("furniture-width"), i = document.getElementById("furniture-depth"), n = document.getElementById("furniture-pos-x"), s = document.getElementById("furniture-pos-z"), a = document.getElementById("furniture-rotation"), o = document.getElementById("furniture-rotation-value"), l = e.userData.baseWidth * e.scale.x, r = e.userData.baseDepth * e.scale.z, u = e.userData.rotationStep || 0, g = Math.max(this.config.widthWallFront * 0.9, l), m = Math.max(this.config.widthWallSide * 0.9, r), p = Math.max(e.userData.baseWidth * 0.5, 0.1), M = Math.max(e.userData.baseDepth * 0.5, 0.1), S = Math.max((this.config.widthWallFront - l) / 2, 0), f = Math.max((this.config.widthWallSide - r) / 2, 0);
      t && (t.min = String(p), t.max = String(g), t.value = String(l)), i && (i.min = String(M), i.max = String(m), i.value = String(r)), n && (n.min = String(-S), n.max = String(S), n.value = String(e.position.x)), s && (s.min = String(-f), s.max = String(f), s.value = String(e.position.z)), a && (a.value = String(u)), o && (o.textContent = "".concat(u * 90, "\xB0"));
    }
    updateFurnitureTransform(e, t, i, n) {
      const s = this.selectedFurniture;
      if (!s) return;
      const a = s.userData.baseWidth || 1, o = s.userData.baseDepth || 1;
      s.scale.set(e / a, 1, t / o);
      const l = Math.max((this.config.widthWallFront - e) / 2, 0), r = Math.max((this.config.widthWallSide - t) / 2, 0);
      s.position.x = T.clamp(i, -l, l), s.position.z = T.clamp(n, -r, r), s.position.y = -this.config.heightWall / 2, this.refreshFurnitureUI();
    }
    updateFurnitureRotation(e) {
      const t = this.selectedFurniture;
      if (!t) return;
      const i = (e % 4 + 4) % 4;
      t.userData.rotationStep = i, t.rotation.y = i * (Math.PI / 2);
      const n = document.getElementById("furniture-rotation-value");
      n && (n.textContent = "".concat(i * 90, "\xB0"));
    }
    selectLamp(e) {
      this.selectedLamp = e;
      const t = document.querySelector(".table-lamp-selection-ui");
      t && (t.style.display = "flex"), this.refreshLampUI();
    }
    deselectLamp() {
      this.selectedLamp = null;
      const e = document.querySelector(".table-lamp-selection-ui");
      e && (e.style.display = "none");
    }
    refreshLampUI() {
      const e = this.selectedLamp;
      if (!e) return;
      const t = document.getElementById("table-lamp-width"), i = document.getElementById("table-lamp-height"), n = document.getElementById("table-lamp-pos-x"), s = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z"), o = e.userData.baseWidth * e.scale.x, l = e.userData.baseHeight * e.scale.y, r = this.config.widthWallFront / 2, u = this.config.heightWall / 2, g = this.config.widthWallSide / 2;
      t && (t.min = String(Math.max(e.userData.baseWidth * 0.5, 0.1)), t.max = String(Math.max(e.userData.baseWidth * 3, o)), t.value = String(o)), i && (i.min = String(Math.max(e.userData.baseHeight * 0.5, 0.1)), i.max = String(Math.max(e.userData.baseHeight * 3, l)), i.value = String(l)), n && (n.min = String(-r), n.max = String(r), n.value = String(e.position.x)), s && (s.min = String(-u), s.max = String(u), s.value = String(e.position.y)), a && (a.min = String(-g), a.max = String(g), a.value = String(e.position.z));
    }
    updateLampTransform(e, t, i, n, s) {
      const a = this.selectedLamp;
      if (!a) return;
      const o = a.userData.baseWidth || 1, l = a.userData.baseHeight || 1, r = e / o;
      a.scale.set(r, t / l, r), a.position.x = T.clamp(i, -this.config.widthWallFront / 2, this.config.widthWallFront / 2), a.position.y = T.clamp(n, -this.config.heightWall / 2, this.config.heightWall / 2), a.position.z = T.clamp(s, -this.config.widthWallSide / 2, this.config.widthWallSide / 2), this.refreshLampUI();
    }
    updatePointer(e) {
      const i = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - i.left) / i.width * 2 - 1, this.pointer.y = -((e.clientY - i.top) / i.height * 2 - 1);
    }
  }
  class Ae {
    constructor(e, t) {
      this.sceneClass = e, this.dragHandler = t;
    }
    bindEvents() {
      window.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.onPointerMove(e)), window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    }
    onPointerDown(e) {
      if (e.target.closest(".floating-ui") || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
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
      if (this.sceneClass.lightManager.isDraggingLightBulb) {
        this.sceneClass.lightManager.onPointerMoveLightBulb(e);
        return;
      }
      this.dragHandler.onPointerMove(e);
    }
    onPointerUp(e) {
      if (this.sceneClass.lightManager.isDraggingLightBulb) {
        this.sceneClass.lightManager.stopDragLightBulb();
        return;
      }
      this.dragHandler.onPointerUp(e);
    }
  }
  class Fe {
    constructor(e) {
      var _a;
      this.gameContext = e, this.onWallChanged = null;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.config = {
        worldScale: t,
        cellSize: 0.5 * t,
        panelDepth: 0.05 * t,
        widthWallFront: 5 * t,
        heightWall: 2.7 * t,
        widthWallSide: 4 * t
      }, this.roomManager = new De(e, this.config, () => {
        this.onWallChanged && this.onWallChanged();
      }), this.panelManager = new Ee(this.roomManager), this.lightManager = new Be(e, this.config), this.rugManager = new We(e, this.config), this.furnitureManager = new Te(e, this.config), this.dragHandler = new ve(e, this.roomManager.walls, this.config), this.interactionController = new Ae(this, this.dragHandler);
    }
    createScene() {
      this.roomManager.createScene(), this.rugManager.createScene(), this.lightManager.createScene(), this.interactionController.bindEvents();
    }
    getSceneState() {
      const e = this.panelManager.getAllPanels().map((o) => {
        let l = "#ffffff";
        return o.traverse((r) => {
          r.isMesh && r.material && l === "#ffffff" && (l = "#" + (Array.isArray(r.material) ? r.material[0] : r.material).color.getHexString());
        }), {
          wallIndex: this.roomManager.walls.indexOf(o.parent),
          panelIndex: o.userData.panelIndex,
          gridX: o.userData.gridX,
          gridY: o.userData.gridY,
          position: o.position.toArray(),
          quaternion: o.quaternion.toArray(),
          color: l
        };
      }), t = this.roomManager.walls.map((o) => {
        var _a, _b, _c;
        return {
          color: ((_a = o.material) == null ? void 0 : _a.color) ? "#" + o.material.color.getHexString() : "#ffffff",
          offsetX: ((_b = o.userData.gridTexture) == null ? void 0 : _b.offset.x) || 0,
          offsetY: ((_c = o.userData.gridTexture) == null ? void 0 : _c.offset.y) || 0
        };
      }), i = this.lightManager.lightBulbs.map(({ mesh: o, light: l }) => {
        var _a, _b;
        return {
          position: o.position.toArray(),
          color: "#" + l.color.getHexString(),
          intensity: l.intensity,
          distance: l.distance,
          decay: l.decay,
          visible: o.visible,
          emissiveIntensity: (_b = (_a = o.material) == null ? void 0 : _a.emissiveIntensity) != null ? _b : 2
        };
      }), n = this.rugManager.rug ? {
        width: this.rugManager.rug.userData.baseWidth * this.rugManager.rug.scale.x,
        depth: this.rugManager.rug.userData.baseDepth * this.rugManager.rug.scale.z,
        posX: this.rugManager.rug.position.x,
        posZ: this.rugManager.rug.position.z,
        color: "#" + this.rugManager.rug.material.color.getHexString()
      } : null, s = this.furnitureManager.furnitureItems[0] ? {
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
        centerLight: this.lightManager.centerLight ? {
          position: this.lightManager.centerLight.position.toArray(),
          color: "#" + this.lightManager.centerLight.color.getHexString(),
          intensity: this.lightManager.centerLight.intensity,
          distance: this.lightManager.centerLight.distance,
          decay: this.lightManager.centerLight.decay
        } : null,
        rug: n,
        table: s,
        lamp: a
      };
    }
    applySceneState(e) {
      var _a, _b, _c, _d;
      if (!e || typeof e != "object") throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u0446\u0435\u043D\u044B");
      if (this.clearSelections(), this.roomManager.walls.forEach((t) => {
        t.children.filter((i) => {
          var _a2;
          return (_a2 = i.userData) == null ? void 0 : _a2.isPanel;
        }).forEach((i) => {
          t.remove(i), this.dragHandler.disposeModel(i);
        });
      }), this.lightManager.lightBulbs.forEach(({ mesh: t, light: i }) => {
        var _a2, _b2, _c2, _d2;
        this.gameContext.scene.remove(t), this.gameContext.scene.remove(i), (_b2 = (_a2 = t.geometry) == null ? void 0 : _a2.dispose) == null ? void 0 : _b2.call(_a2), (_d2 = (_c2 = t.material) == null ? void 0 : _c2.dispose) == null ? void 0 : _d2.call(_c2);
      }), this.lightManager.lightBulbs = [], this.lightManager.deselectLightBulb(), this.furnitureManager.deleteTableLamp(), this.furnitureManager.deleteTable(), Array.isArray(e.walls) && e.walls.forEach((t, i) => {
        var _a2;
        const n = this.roomManager.walls[i];
        n && (t.color && ((_a2 = n.material) == null ? void 0 : _a2.color) && n.material.color.set(t.color), n.userData.gridTexture && (n.userData.gridTexture.offset.x = Number(t.offsetX || 0), n.userData.gridTexture.offset.y = Number(t.offsetY || 0), n.userData.gridTexture.needsUpdate = true));
      }), typeof e.activeWallIndex == "number" && (this.roomManager.activeWallIndex = e.activeWallIndex), typeof e.isNetVisible == "boolean" && e.isNetVisible !== this.roomManager.isNetVisible && this.roomManager.toggleNet(), this.panelManager.globalPanelColor = e.globalPanelColor || null, (e.panels || []).forEach((t) => {
        const i = this.roomManager.walls[t.wallIndex], n = this.gameContext.assetManager.panels[t.panelIndex];
        if (!i || !n) return;
        const s = n.clone();
        s.userData.isPanel = true, s.userData.panelIndex = t.panelIndex, s.userData.gridX = t.gridX, s.userData.gridY = t.gridY;
        const a = this.dragHandler.getWallClippingPlanes(i);
        this.dragHandler.applyMaterialProperties(s, {
          transparent: false,
          opacity: 1,
          clippingPlanes: a,
          cloneMaterial: true
        }), t.color ? this.dragHandler.applyColor(s, t.color) : this.panelManager.globalPanelColor && this.dragHandler.applyColor(s, this.panelManager.globalPanelColor), i.add(s), Array.isArray(t.position) && s.position.fromArray(t.position), Array.isArray(t.quaternion) ? s.quaternion.fromArray(t.quaternion) : (s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2));
      }), e.ambientLight && (this.lightManager.ambientLight.intensity = Number((_a = e.ambientLight.intensity) != null ? _a : this.lightManager.ambientLight.intensity), e.ambientLight.color && this.lightManager.ambientLight.color.set(e.ambientLight.color)), e.centerLight && this.lightManager.centerLight && (this.lightManager.centerLight.position.fromArray(e.centerLight.position || this.lightManager.centerLight.position.toArray()), this.lightManager.lightBulbMesh.position.copy(this.lightManager.centerLight.position), this.lightManager.centerLight.color.set(e.centerLight.color || "#ffe6c2"), this.lightManager.centerLight.intensity = Number((_b = e.centerLight.intensity) != null ? _b : this.lightManager.centerLight.intensity), this.lightManager.centerLight.distance = Number((_c = e.centerLight.distance) != null ? _c : this.lightManager.centerLight.distance), this.lightManager.centerLight.decay = Number((_d = e.centerLight.decay) != null ? _d : this.lightManager.centerLight.decay)), (e.sideLights || []).forEach((t) => {
        var _a2, _b2, _c2, _d2, _e2;
        this.lightManager.addSideLightBulb();
        const i = this.lightManager.lightBulbs[this.lightManager.lightBulbs.length - 1];
        i && (i.mesh.position.fromArray(t.position || i.mesh.position.toArray()), i.light.position.copy(i.mesh.position), i.light.color.set(t.color || "#ffaa66"), i.light.intensity = Number((_a2 = t.intensity) != null ? _a2 : i.light.intensity), i.light.distance = Number((_b2 = t.distance) != null ? _b2 : i.light.distance), i.light.decay = Number((_c2 = t.decay) != null ? _c2 : i.light.decay), i.mesh.visible = t.visible !== false, ((_d2 = i.mesh.material) == null ? void 0 : _d2.emissiveIntensity) !== void 0 && (i.mesh.material.emissiveIntensity = Number((_e2 = t.emissiveIntensity) != null ? _e2 : i.mesh.material.emissiveIntensity)));
      }), e.rug && this.rugManager.rug && (this.rugManager.updateRugTransform(Number(e.rug.width), Number(e.rug.depth), Number(e.rug.posX), Number(e.rug.posZ)), e.rug.color && this.rugManager.changeRugColor(e.rug.color)), e.table) {
        const t = this.addTable();
        t && (this.furnitureManager.selectFurniture(t), this.updateFurnitureTransform(Number(e.table.width), Number(e.table.depth), Number(e.table.posX), Number(e.table.posZ)), this.updateFurnitureRotation(Number(e.table.rotationStep || 0)));
      }
      if (e.lamp) {
        const t = this.addTableLamp();
        t && (this.selectTableLamp(t), this.updateTableLampTransform(Number(e.lamp.width), Number(e.lamp.height), Number(e.lamp.posX), Number(e.lamp.posY), Number(e.lamp.posZ)));
      }
    }
    setRoomColor(e, t) {
      this.roomManager.setRoomColor(e, t);
    }
    updateAnimations(e) {
      this.panelManager.updateAnimations(e);
    }
    startDrag(e, t) {
      this.clearSelections(), this.dragHandler.startDrag(e, t);
    }
    randomRotate() {
      this.panelManager.randomRotate();
    }
    shufflePanelsOnWalls() {
      this.clearSelections(), this.panelManager.shufflePanelsOnWalls();
    }
    addTable() {
      return this.clearSelections(), this.furnitureManager.addTable();
    }
    deleteTable() {
      this.furnitureManager.deleteTable();
    }
    addTableLamp() {
      return this.furnitureManager.addTableLamp();
    }
    deleteTableLamp() {
      this.furnitureManager.deleteTableLamp();
    }
    selectTableLamp(e) {
      this.clearSelections(), this.furnitureManager.selectLamp(e);
    }
    deselectTableLamp() {
      this.furnitureManager.deselectLamp();
    }
    updateTableLampTransform(e, t, i, n, s) {
      this.furnitureManager.updateLampTransform(e, t, i, n, s);
    }
    selectFurniture(e) {
      this.clearSelections(), this.furnitureManager.selectFurniture(e);
    }
    deselectFurniture() {
      this.furnitureManager.deselectFurniture();
    }
    updateFurnitureTransform(e, t, i, n) {
      this.furnitureManager.updateFurnitureTransform(e, t, i, n);
    }
    updateFurnitureRotation(e) {
      this.furnitureManager.updateFurnitureRotation(e);
    }
    onPanelSelected(e) {
      this.selectPanel(e);
    }
    selectPanel(e) {
      this.clearSelections(), this.panelManager.onPanelSelected(e);
    }
    selectLightBulb(e) {
      this.clearSelections(), this.lightManager.selectLightBulb(e);
    }
    selectRug() {
      this.clearSelections(), this.rugManager.selectRug();
    }
    clearSelections() {
      this.panelManager.deselectPanel(), this.lightManager.deselectLightBulb(), this.rugManager.deselectRug(), this.furnitureManager.deselectFurniture(), this.furnitureManager.deselectLamp();
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
      this.roomManager.toggleNet();
    }
    setAllWallsColor(e) {
      this.roomManager.setAllWallsColor(e);
    }
    setAllPanelsColor(e) {
      this.panelManager.setAllPanelsColor(e);
    }
    addSideLightBulb() {
      this.lightManager.addSideLightBulb();
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
    updateRugTransform(e, t, i, n) {
      this.rugManager.updateRugTransform(e, t, i, n);
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
    get centerLight() {
      return this.lightManager.centerLight;
    }
    get lightBulbMesh() {
      return this.lightManager.lightBulbMesh;
    }
    get sideLight() {
      return this.lightManager.sideLight;
    }
    get sideBulbMesh() {
      return this.lightManager.sideBulbMesh;
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
  class ze {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh(), this.gameContext.gui && (this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442"), this.ambientFolder = this.gameContext.gui.addFolder("\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430")), this.refreshLight(), this.refreshAmbient();
    }
    refreshLight() {
      var _a;
      if (!this.lightFolder) return;
      this.lightControllers || (this.lightControllers = []), this.lightControllers.forEach((f) => f.destroy()), this.lightControllers = [];
      const e = this.sceneClass, t = e.centerLight, i = e.lightBulbMesh, n = ((_a = e.config) == null ? void 0 : _a.worldScale) || 1, s = 10 * n;
      if (!t || !i) return;
      const a = Math.max(50, t.intensity * 2), o = Math.max(50 * n, t.distance * 2), l = {
        lightColor: "#" + t.color.getHexString(),
        bulbColor: "#" + i.material.color.getHexString(),
        bulbVisible: i.visible,
        castShadow: t.castShadow,
        shadowMapSize: t.shadow.mapSize.width,
        shadowBias: t.shadow.bias,
        kelvin: 2800
      }, r = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), u = () => i.position.copy(t.position), g = r.add(t.position, "x", -s, s, 0.01).name("X").listen().onChange(u), m = r.add(t.position, "y", -s, s, 0.01).name("Y").listen().onChange(u), p = r.add(t.position, "z", -s, s, 0.01).name("Z").listen().onChange(u);
      this.lightControllers.push(g, m, p), this.lightControllers.push(this.lightFolder.add(t, "intensity", 0, a, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "distance", 0, o, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(l, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((f) => {
        t.color.set(f);
      })), this.lightControllers.push(this.lightFolder.add(l, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((f) => {
        const x = this.kelvinToHex(f);
        t.color.set(x), l.lightColor = "#" + t.color.getHexString();
      }));
      const M = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(M.add(l, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((f) => {
        i.visible = f;
      }), M.addColor(l, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((f) => {
        i.material.color.set(f);
      }));
      const S = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(S.add(l, "castShadow").name("castShadow").onChange((f) => {
        t.castShadow = f;
      }), S.add(l, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((f) => {
        const x = Number(f);
        t.shadow.mapSize.set(x, x), t.shadow.needsUpdate = true;
      }), S.add(l, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((f) => {
        t.shadow.bias = f;
      })), u();
    }
    refreshAmbient() {
      if (!this.ambientFolder) return;
      this.ambientControllers || (this.ambientControllers = []), this.ambientControllers.forEach((i) => i.destroy()), this.ambientControllers = [];
      const e = this.sceneClass.ambientLight;
      if (!e) return;
      const t = {
        ambientColor: "#" + e.color.getHexString()
      };
      this.ambientControllers.push(this.ambientFolder.add(e, "intensity", 0, 5, 0.01).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.ambientFolder.addColor(t, "ambientColor").name("\u0426\u0432\u0435\u0442").onChange((i) => {
        e.color.set(i);
      }));
    }
    kelvinToHex(e) {
      const t = e / 100;
      let i, n, s;
      t <= 66 ? (i = 255, n = 99.4708025861 * Math.log(t) - 161.1195681661, s = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307) : (i = 329.698727446 * Math.pow(t - 60, -0.1332047592), n = 288.1221695283 * Math.pow(t - 60, -0.0755148492), s = 255);
      const a = (l) => Math.min(255, Math.max(0, l));
      return i = a(i), n = a(n), s = a(s), "#" + new xe(i / 255, n / 255, s / 255).getHexString();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((s) => s.destroy()), this.controllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) return;
      const t = e.material.alphaMap;
      if (!t) return;
      const i = this.folder.add(t.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), n = this.folder.add(t.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(i, n);
    }
  }
  class Re {
    constructor(e) {
      var _a;
      this.gameContext = e, this.loader = new Se(), this.worldScale = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1, this.basePanelCellSize = 0.5, this.basePanelGap = -2e-3, this.panelTargetSize = this.basePanelCellSize * this.worldScale - this.basePanelGap, this.panels = [], this.furniture = {
        table: null,
        tableLamp: null
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
      const e = new $(0.49, 0.49), t = this.panelUrls.map((i, n) => this.loader.loadAsync(i).then((s) => {
        const a = s.scene.children[0];
        a.name = "panelTemplate_".concat(n);
        const o = [];
        a.traverse((p) => {
          p.isMesh && (p.scale.set(1, 2, 1), o.push(p));
        }), a.updateMatrixWorld(true);
        const r = new G().setFromObject(a).getSize(new b()), u = [
          r.x,
          r.y,
          r.z
        ].filter((p) => p > 0).sort((p, M) => M - p), g = u[1] || u[0] || 1, m = this.panelTargetSize / g;
        return a.scale.multiplyScalar(m), o.forEach((p) => {
          const M = p.material, S = Array.isArray(M) ? M : [
            M
          ];
          p.material = S.map((L) => {
            var _a;
            const C = new Ce({
              color: 16777215,
              map: (L == null ? void 0 : L.map) || null,
              normalMap: (L == null ? void 0 : L.normalMap) || null,
              roughnessMap: (L == null ? void 0 : L.roughnessMap) || null,
              metalnessMap: (L == null ? void 0 : L.metalnessMap) || null,
              aoMap: (L == null ? void 0 : L.aoMap) || null,
              displacementMap: (L == null ? void 0 : L.displacementMap) || null,
              alphaMap: (L == null ? void 0 : L.alphaMap) || null,
              transparent: (L == null ? void 0 : L.transparent) || false,
              opacity: (_a = L == null ? void 0 : L.opacity) != null ? _a : 1,
              emissive: 0,
              metalness: 0.02,
              roughness: 0.94,
              clearcoat: 0.02,
              clearcoatRoughness: 0.9,
              sheen: 0.08,
              sheenRoughness: 0.95,
              side: V
            });
            return C.map && (C.map.colorSpace = A, C.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy()), [
              C.normalMap,
              C.roughnessMap,
              C.metalnessMap,
              C.aoMap,
              C.displacementMap,
              C.alphaMap
            ].forEach((I) => {
              I && (I.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy());
            }), C;
          }), Array.isArray(M) || (p.material = p.material[0]), p.castShadow = true, p.receiveShadow = true;
          const f = Array.isArray(p.material) ? p.material[0].clone() : p.material.clone(), x = new D(e, f);
          x.position.y = 5e-4, x.rotation.x = -Math.PI / 2;
        }), a;
      }));
      this.panels = await Promise.all(t);
    }
    async loadFurniture() {
      const [e, t] = await Promise.all([
        this.loader.loadAsync("models/mebel/table.gltf"),
        this.loader.loadAsync("models/mebel/lampgltf.gltf")
      ]);
      e.scene.scale.multiplyScalar(this.worldScale), t.scene.scale.multiplyScalar(this.worldScale), this.furniture.table = e.scene, this.furniture.tableLamp = t.scene;
    }
  }
  class Ne {
    constructor(e) {
      this.camera = e.camera, this.controls = e.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new b(), this.forward = new b(), this.right = new b(), window.addEventListener("keydown", (t) => {
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
  class ke {
    constructor(e) {
      this.gameContext = e, this.mode = "2d", this.board = null, this.emptyState = null, this.root = null, this.items = [], this.selectedItem = null, this.draggingItem = null, this.dragOffsetX = 0, this.dragOffsetY = 0, this.gridVisible = true, this.nextItemId = 1, this.tileSize = 140, this.snapThreshold = 24, this.panelImages = [
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
      const { x: i, y: n } = this.getBoardPoint(t.clientX, t.clientY), s = this.addPanel(e, i - this.tileSize / 2, n - this.tileSize / 2);
      this.selectPanel(s), this.startDraggingItem(s, t, this.tileSize / 2, this.tileSize / 2);
    }
    addPanel(e, t, i, n = 0) {
      const s = document.createElement("div");
      s.className = "panel-2d-item", s.dataset.id = String(this.nextItemId++);
      const a = document.createElement("img");
      return a.src = this.panelImages[e], a.alt = "Panel ".concat(e + 1), s.appendChild(a), s.userData = {
        panelIndex: e,
        x: 0,
        y: 0,
        rotation: n
      }, s.addEventListener("pointerdown", (o) => {
        o.stopPropagation(), this.selectPanel(s);
        const l = s.getBoundingClientRect();
        this.startDraggingItem(s, o, o.clientX - l.left, o.clientY - l.top);
      }), this.board.appendChild(s), this.items.push(s), this.setItemPosition(s, t, i), this.setItemRotation(s, n), this.refreshEmptyState(), s;
    }
    startDraggingItem(e, t, i, n) {
      this.draggingItem = e, this.dragOffsetX = i, this.dragOffsetY = n, window.addEventListener("pointermove", this.handlePointerMove), window.addEventListener("pointerup", this.handlePointerUp), t.cancelable && t.preventDefault();
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
      const i = Math.max(0, this.board.clientWidth - this.tileSize), n = Math.max(0, this.board.clientHeight - this.tileSize);
      return {
        x: Math.min(Math.max(0, e), i),
        y: Math.min(Math.max(0, t), n)
      };
    }
    updateBoardMetrics() {
      if (!this.board) return;
      const e = this.tileSize, t = this.board.clientWidth || window.innerWidth, i = this.board.clientHeight || window.innerHeight, n = Math.min(t, i), s = window.innerWidth <= 600, a = Math.floor(t / (s ? 6.2 : 3)), r = Math.max(s ? 48 : 82, Math.min(s ? 64 : 140, a, Math.round(n * (s ? 0.135 : 0.26))));
      this.tileSize = r, this.snapThreshold = Math.max(12, Math.round(this.tileSize * 0.18)), this.board.style.setProperty("--panel-tile-size", "".concat(this.tileSize, "px")), !(!this.items.length || e === this.tileSize) && this.items.forEach((u) => {
        const g = Math.round(u.userData.x / e) * this.tileSize, m = Math.round(u.userData.y / e) * this.tileSize;
        this.setItemPosition(u, g, m);
      });
    }
    getSnapCandidates(e, t) {
      const n = [
        0,
        t === "x" ? Math.max(0, this.board.clientWidth - this.tileSize) : Math.max(0, this.board.clientHeight - this.tileSize)
      ];
      return this.items.forEach((s) => {
        if (s === e) return;
        const a = t === "x" ? s.userData.x : s.userData.y;
        n.push(a), n.push(a - this.tileSize), n.push(a + this.tileSize);
      }), n;
    }
    snapValue(e, t, i) {
      const n = Math.round(i / this.tileSize) * this.tileSize, s = [
        ...this.getSnapCandidates(e, t),
        n
      ];
      let a = i, o = this.snapThreshold;
      return s.forEach((l) => {
        const r = Math.abs(l - i);
        r <= o && (o = r, a = l);
      }), a;
    }
    setItemPosition(e, t, i) {
      const n = this.snapValue(e, "x", t), s = this.snapValue(e, "y", i), a = this.clampPosition(n, s);
      e.userData.x = a.x, e.userData.y = a.y, e.style.left = "".concat(a.x, "px"), e.style.top = "".concat(a.y, "px");
    }
    setItemRotation(e, t) {
      e.userData.rotation = t, e.style.transform = "rotate(".concat(t, "deg)");
    }
    selectPanel(e) {
      if (this.selectedItem === e) return;
      this.deselectPanel(), this.selectedItem = e, e.classList.add("selected");
      const t = document.getElementById("selection-ui");
      t && (t.style.display = "flex");
    }
    deselectPanel() {
      this.selectedItem && this.selectedItem.classList.remove("selected"), this.selectedItem = null;
      const e = document.getElementById("selection-ui");
      e && (e.style.display = "none");
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
        const i = Math.floor(Math.random() * (t + 1)), n = e[t];
        e[t] = e[i], e[i] = n;
      }
      this.items.forEach((t, i) => {
        const n = e[i];
        this.setItemPosition(t, n.x, n.y);
      });
    }
    toggleNet() {
      this.gridVisible = !this.gridVisible, this.board.classList.toggle("grid-hidden", !this.gridVisible);
    }
    changeSelectedPanelColor() {
    }
    setAllPanelsColor() {
    }
    getSceneState() {
      return {
        version: 1,
        mode: "2d",
        gridVisible: this.gridVisible,
        panels: this.items.map((e) => ({
          panelIndex: e.userData.panelIndex,
          x: e.userData.x,
          y: e.userData.y,
          rotation: e.userData.rotation
        }))
      };
    }
    applySceneState(e) {
      if (!e || typeof e != "object" || !Array.isArray(e.panels)) throw new Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 2D \u0441\u0446\u0435\u043D\u044B");
      this.clearPanels(), this.gridVisible = e.gridVisible !== false, this.board.classList.toggle("grid-hidden", !this.gridVisible), e.panels.forEach((t) => {
        this.addPanel(Number(t.panelIndex) || 0, Number(t.x) || 0, Number(t.y) || 0, Number(t.rotation) || 0);
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
  h.clock = new Ie();
  h.sceneConfig = {
    worldScale: 10
  };
  h.appMode = null;
  const B = "room-configurator-scene-state", oe = "room-configurator-scene-library";
  Ue();
  Ye();
  async function Oe() {
    try {
      await Xe(), await He(), et();
    } catch (d) {
      console.error("Init error", d);
    }
  }
  async function Xe() {
    h.gui = new Le(), h.initClass = new Pe(h), h.scene = h.initClass.scene, h.camera = h.initClass.camera, h.renderer = h.initClass.renderer, h.assetManager = new Re(h), h.sceneClass = new Fe(h), h.keyboardOrbitMove = new Ne(h), h.renderer.localClippingEnabled = true, h.guiClass = new ze(h);
  }
  async function He() {
    await h.assetManager.loadModels(), Ge(), _e(), Qe(), Ze(), h.sceneClass.createScene(), h.guiClass && (h.guiClass.refresh(), h.guiClass.refreshLight());
  }
  function Ue() {
    Ve(), je(), qe(), Ke();
  }
  function Ye() {
    const d = document.getElementById("app-mode-modal"), e = document.getElementById("btn-start-3d"), t = document.getElementById("btn-start-2d");
    if (!d || !e || !t) return;
    const i = () => {
      d.style.display = "none";
    };
    e.onclick = async () => {
      i(), document.body.classList.remove("mode-2d"), h.appMode = "3d", await Oe();
    }, t.onclick = () => {
      i(), document.body.classList.add("mode-2d"), h.appMode = "2d", h.panel2dApp = new ke(h), h.panel2dApp.init(), h.panel2dApp.show();
    };
  }
  function E() {
    return h.appMode === "2d" ? h.panel2dApp || null : h.sceneClass || null;
  }
  function qe() {
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
  function je() {
    document.getElementById("random_rotate").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.randomRotate) == null ? void 0 : _b.call(_a);
    }, document.getElementById("random_shuffle").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.shufflePanelsOnWalls) == null ? void 0 : _b.call(_a);
    }, document.getElementById("toglle_net").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.toggleNet) == null ? void 0 : _b.call(_a);
    };
    const d = document.getElementById("add-light-bulb");
    d && (d.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addSideLightBulb();
    });
    const e = document.getElementById("add-table");
    e && (e.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTable();
    });
    const t = document.getElementById("add-table-lamp");
    t && (t.onclick = () => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.addTableLamp();
    });
  }
  function Ve() {
    document.getElementById("btn-rot-left").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.rotateSelectedPanel) == null ? void 0 : _b.call(_a, -Math.PI / 2);
    };
    const d = document.getElementById("panel-color-picker");
    d && d.addEventListener("input", (i) => {
      var _a;
      h.appMode === "3d" && ((_a = h.sceneClass) == null ? void 0 : _a.changeSelectedPanelColor(i.target.value));
    }), document.getElementById("btn-close-sel").onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.deselectPanel) == null ? void 0 : _b.call(_a);
    };
    const e = document.getElementById("btn-delete-2d-panel");
    e && (e.onclick = () => {
      var _a, _b;
      (_b = (_a = E()) == null ? void 0 : _a.deleteSelectedPanel) == null ? void 0 : _b.call(_a);
    }), document.getElementById("btn-all-color").onclick = () => {
      var _a;
      const i = document.getElementById("panel-color-picker");
      i && h.appMode === "3d" && ((_a = h.sceneClass) == null ? void 0 : _a.setAllPanelsColor(i.value));
    };
    const t = document.getElementById("wall-color-picker");
    t && t.addEventListener("input", (i) => {
      var _a;
      (_a = h.sceneClass) == null ? void 0 : _a.setAllWallsColor(i.target.value);
    });
  }
  function Ge() {
    var _a;
    if (!document.getElementById("light-selection-ui")) return;
    const e = ((_a = h.sceneConfig) == null ? void 0 : _a.worldScale) || 1, i = 18 * (e * e), n = 6 * e, s = document.getElementById("light-intensity");
    s && (s.max = String(Math.max(i * 4, 50)), s.value = String(i));
    const a = document.getElementById("light-distance");
    a && (a.max = String(Math.max(n * 3, 20)), a.value = String(n));
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
      r && r.pointLight.color.set(l.target.value);
    }), document.getElementById("light-kelvin").addEventListener("input", (l) => {
      const r = o();
      if (!r) return;
      const u = Number(l.target.value), g = h.guiClass.kelvinToHex(u);
      r.pointLight.color.set(g);
      const m = document.getElementById("light-color-picker");
      m && (m.value = "#" + r.pointLight.color.getHexString());
    }), document.getElementById("light-intensity").addEventListener("input", (l) => {
      const r = o();
      r && (r.pointLight.intensity = Number(l.target.value));
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
      r && r.bulbMesh.material && (r.bulbMesh.material.emissiveIntensity = Number(l.target.value), r.bulbMesh.material.needsUpdate = true);
    }), document.getElementById("btn-delete-light").onclick = () => {
      const l = o();
      if (!l) return;
      h.scene.remove(l.bulbMesh), h.scene.remove(l.pointLight);
      const r = h.sceneClass.lightBulbs.findIndex((u) => u.mesh === l.bulbMesh);
      r !== -1 && h.sceneClass.lightBulbs.splice(r, 1), l.bulbMesh.geometry && l.bulbMesh.geometry.dispose(), l.bulbMesh.material && l.bulbMesh.material.dispose(), h.sceneClass.deselectLightBulb();
    };
  }
  function _e() {
    const d = document.getElementById("btn-close-rug");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("rug-width"), n = document.getElementById("rug-depth"), s = document.getElementById("rug-pos-x"), a = document.getElementById("rug-pos-z");
    i && (i.min = String(h.sceneConfig.worldScale), i.max = String(e * 0.95)), n && (n.min = String(h.sceneConfig.worldScale), n.max = String(t * 0.95)), s && (s.min = String(-e / 2), s.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectRug();
    };
    const o = () => {
      const r = Number(document.getElementById("rug-width").value), u = Number(document.getElementById("rug-depth").value), g = Number(document.getElementById("rug-pos-x").value), m = Number(document.getElementById("rug-pos-z").value);
      h.sceneClass.updateRugTransform(r, u, g, m);
    }, l = document.getElementById("rug-color-picker");
    l && l.addEventListener("input", (r) => {
      h.sceneClass.changeRugColor(r.target.value);
    }), document.getElementById("rug-width").addEventListener("input", o), document.getElementById("rug-depth").addEventListener("input", o), document.getElementById("rug-pos-x").addEventListener("input", o), document.getElementById("rug-pos-z").addEventListener("input", o);
  }
  function Qe() {
    const d = document.getElementById("btn-close-furniture");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, i = document.getElementById("furniture-width"), n = document.getElementById("furniture-depth"), s = document.getElementById("furniture-pos-x"), a = document.getElementById("furniture-pos-z");
    i && (i.max = String(e * 0.9)), n && (n.max = String(t * 0.9)), s && (s.min = String(-e / 2), s.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectFurniture();
    };
    const o = () => {
      const r = Number(document.getElementById("furniture-width").value), u = Number(document.getElementById("furniture-depth").value), g = Number(document.getElementById("furniture-pos-x").value), m = Number(document.getElementById("furniture-pos-z").value);
      h.sceneClass.updateFurnitureTransform(r, u, g, m);
    };
    document.getElementById("furniture-width").addEventListener("input", o), document.getElementById("furniture-depth").addEventListener("input", o), document.getElementById("furniture-pos-x").addEventListener("input", o), document.getElementById("furniture-pos-z").addEventListener("input", o), document.getElementById("furniture-rotation").addEventListener("input", (r) => {
      h.sceneClass.updateFurnitureRotation(Number(r.target.value));
    });
    const l = document.getElementById("btn-delete-furniture");
    l && (l.onclick = () => {
      h.sceneClass.deleteTable();
    });
  }
  function Ze() {
    const d = document.getElementById("btn-close-table-lamp");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t, heightWall: i } = h.sceneClass.config, n = document.getElementById("table-lamp-pos-x"), s = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z");
    n && (n.min = String(-e / 2), n.max = String(e / 2)), s && (s.min = String(-i / 2), s.max = String(i / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectTableLamp();
    };
    const o = () => {
      const r = Number(document.getElementById("table-lamp-width").value), u = Number(document.getElementById("table-lamp-height").value), g = Number(document.getElementById("table-lamp-pos-x").value), m = Number(document.getElementById("table-lamp-pos-y").value), p = Number(document.getElementById("table-lamp-pos-z").value);
      h.sceneClass.updateTableLampTransform(r, u, g, m, p);
    };
    document.getElementById("table-lamp-width").addEventListener("input", o), document.getElementById("table-lamp-height").addEventListener("input", o), document.getElementById("table-lamp-pos-x").addEventListener("input", o), document.getElementById("table-lamp-pos-y").addEventListener("input", o), document.getElementById("table-lamp-pos-z").addEventListener("input", o);
    const l = document.getElementById("btn-delete-table-lamp-ui");
    l && (l.onclick = () => {
      h.sceneClass.deleteTableLamp();
    });
  }
  function Ke() {
    const d = document.getElementById("save-load-modal"), e = document.getElementById("btn-presets"), t = document.getElementById("btn-close-save-load"), i = document.getElementById("save-load-backdrop"), n = document.getElementById("btn-save-scene-state"), s = document.getElementById("btn-load-scene-storage"), a = document.getElementById("btn-copy-scene-state"), o = document.getElementById("btn-paste-scene-state"), l = document.getElementById("btn-load-scene-text"), r = document.getElementById("scene-state-text"), u = document.getElementById("scene-state-status"), g = document.getElementById("scene-state-saved-list");
    if (!d || !e || !r || !u || !g) return;
    const m = (c) => {
      u.textContent = c;
    }, p = (c) => "roomcfg:" + btoa(unescape(encodeURIComponent(JSON.stringify(c)))), M = (c) => {
      const y = c.trim().replace(/^roomcfg:/, "");
      return JSON.parse(decodeURIComponent(escape(atob(y))));
    }, S = () => {
      const c = E();
      if (!(c == null ? void 0 : c.getSceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      return {
        mode: h.appMode || "3d",
        state: c.getSceneState()
      };
    }, f = (c) => {
      const y = c && typeof c == "object" && c.mode && Object.prototype.hasOwnProperty.call(c, "state"), W = y ? c.mode : "3d", P = y ? c.state : c;
      if (W !== h.appMode) throw new Error("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u0430\u043D\u043E \u0434\u043B\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430");
      const v = E();
      if (!(v == null ? void 0 : v.applySceneState)) throw new Error("\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u0435\u0449\u0435 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D");
      v.applySceneState(P);
    }, x = () => {
      try {
        const c = JSON.parse(localStorage.getItem(oe) || "[]");
        return Array.isArray(c) ? c.filter((y) => typeof y == "string" && y.trim().length > 0) : [];
      } catch (c) {
        return console.error(c), [];
      }
    }, L = (c) => {
      localStorage.setItem(oe, JSON.stringify(c));
    }, C = (c) => {
      const y = c.trim(), W = x(), P = W.includes(y), v = P ? W : [
        y,
        ...W
      ];
      return localStorage.setItem(B, y), L(v), {
        alreadyExists: P,
        library: v
      };
    }, I = () => {
      const c = x();
      if (g.innerHTML = "", !c.length) {
        const y = document.createElement("div");
        y.className = "scene-state-saved-empty", y.textContent = "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043D\u044B\u0445 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439.", g.appendChild(y);
        return;
      }
      c.forEach((y, W) => {
        const P = document.createElement("div");
        P.className = "scene-state-saved-item";
        const v = document.createElement("div");
        v.className = "scene-state-saved-preview", v.textContent = "".concat(W + 1, ". ").concat(y);
        const N = document.createElement("div");
        N.className = "scene-state-saved-actions";
        const H = document.createElement("button");
        H.className = "action-btn", H.textContent = "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C", H.onclick = () => {
          try {
            r.value = y, f(M(y)), localStorage.setItem(B, y), m("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0439.");
          } catch (z) {
            m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(z);
          }
        };
        const U = document.createElement("button");
        U.className = "action-btn", U.textContent = "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", U.onclick = async () => {
          try {
            await navigator.clipboard.writeText(y), r.value = y, localStorage.setItem(B, y), m("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430.");
          } catch (z) {
            m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(z);
          }
        };
        const Y = document.createElement("button");
        Y.className = "action-btn", Y.textContent = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", Y.onclick = () => {
          const z = x().filter((q) => q !== y);
          if (L(z), (r.value || "").trim() === y && (r.value = ""), (localStorage.getItem(B) || "").trim() === y) {
            const q = z[0] || "";
            q ? localStorage.setItem(B, q) : localStorage.removeItem(B);
          }
          I(), m("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0438\u0437 \u043F\u0430\u043C\u044F\u0442\u0438 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430.");
        }, N.appendChild(H), N.appendChild(U), N.appendChild(Y), P.appendChild(v), P.appendChild(N), g.appendChild(P);
      });
    }, ee = () => {
      const c = localStorage.getItem(B);
      !c || x().includes(c) || L([
        c,
        ...x()
      ]);
    }, he = () => {
      d.style.display = "block", r.value = localStorage.getItem(B) || "", ee(), I(), m("");
    }, te = () => {
      d.style.display = "none";
    };
    e.onclick = he, t && (t.onclick = te), i && (i.onclick = te), n && (n.onclick = async () => {
      try {
        const c = p(S()), { alreadyExists: y } = C(c);
        r.value = c, I(), m(y ? "\u0422\u0430\u043A\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0432 \u043F\u0430\u043C\u044F\u0442\u0438. \u0421\u0442\u0440\u043E\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u043D\u0438\u0436\u0435." : "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u0432 \u043F\u0430\u043C\u044F\u0442\u044C \u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0441\u043F\u0438\u0441\u043E\u043A.");
      } catch (c) {
        m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435."), console.error(c);
      }
    }), s && (s.onclick = () => {
      try {
        const c = localStorage.getItem(B);
        if (!c) {
          m("\u0412 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043F\u043E\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442.");
          return;
        }
        r.value = c, f(M(c)), I(), m("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430.");
      } catch (c) {
        m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430."), console.error(c);
      }
    }), a && (a.onclick = async () => {
      try {
        if (!r.value.trim()) {
          const c = p(S());
          C(c), r.value = c, I();
        }
        await navigator.clipboard.writeText(r.value), m("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430.");
      } catch (c) {
        m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443."), console.error(c);
      }
    }), o && (o.onclick = async () => {
      try {
        const c = await navigator.clipboard.readText();
        if (!c.trim()) {
          m("\u0411\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430 \u043F\u0443\u0441\u0442.");
          return;
        }
        r.value = c, f(M(c)), C(c), I(), m("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0431\u0443\u0444\u0435\u0440\u0430 \u043E\u0431\u043C\u0435\u043D\u0430.");
      } catch (c) {
        m("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430."), console.error(c);
      }
    }), l && (l.onclick = () => {
      try {
        if (!r.value.trim()) {
          m("\u041F\u043E\u043B\u0435 \u0441\u043E \u0441\u0442\u0440\u043E\u043A\u043E\u0439 \u043F\u0443\u0441\u0442\u043E\u0435.");
          return;
        }
        const c = r.value.trim();
        f(M(c)), C(c), I(), m("\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043B\u044F.");
      } catch (c) {
        m("\u0421\u0442\u0440\u043E\u043A\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430 \u0438\u043B\u0438 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442."), console.error(c);
      }
    }), ee(), I();
  }
  function $e(d) {
    h.testMesh && (h.testMesh.rotation.y += d * 0.5), h.keyboardOrbitMove && h.keyboardOrbitMove.update(d), h.sceneClass && h.sceneClass.updateAnimations(d);
  }
  function Je() {
    h.renderer && h.scene && h.camera && h.renderer.render(h.scene, h.camera), h.initClass && h.initClass.stats && h.initClass.stats.update();
  }
  function et() {
    let d = 0;
    const e = 1 / 60, t = 0.1;
    h.renderer.setAnimationLoop(() => {
      let i = h.clock.getDelta();
      i > t && (i = t), d += i;
      let n = 5;
      for (; d >= e && n > 0; ) $e(e), d -= e, n--;
      d > e && (d = 0), Je();
    });
  }
})();
export {
  __tla,
  tt as __vite_legacy_guard
};
