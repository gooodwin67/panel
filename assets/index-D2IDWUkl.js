import { S as j, P as G, W as Y, a as L, b as Q, A as _, O as V, c as Z, R as v, V as P, d as p, e as I, f as K, B, M as S, g as M, h as T, Q as z, i as W, E as $, L as J, j as ee, T as q, k as y, l as R, F as E, C as N, m as O, n as k, o as C, G as U, D as F, p as te, q as se, r as ie, s as ne } from "./three-DkjEceXl.js";
let De;
let __tla = (async () => {
  De = function() {
    import.meta.url, import("_").then(async (m) => {
      await m.__tla;
      return m;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
    new MutationObserver((i) => {
      for (const n of i) if (n.type === "childList") for (const a of n.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(i) {
      const n = {};
      return i.integrity && (n.integrity = i.integrity), i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? n.credentials = "include" : i.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
    }
    function s(i) {
      if (i.ep) return;
      i.ep = true;
      const n = t(i);
      fetch(i.href, n);
    }
  })();
  class ae {
    constructor(e) {
      var _a;
      this.gameContext = e;
      const t = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1;
      this.onWindowResize = this.onWindowResize.bind(this), this.scene = new j(), this.camera = new G(40, window.innerWidth / window.innerHeight, 0.1 * t, 40 * t), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10 * t, this.renderer = new Y({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = L, this.renderer.shadowMap.enabled = true, this.renderer.shadowMap.type = Q, this.renderer.toneMapping = _, this.renderer.toneMappingExposure = 0.58, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new V(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new Z(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const s = window.innerWidth, i = window.innerHeight, n = Math.min(s, 1920), a = Math.min(i, 1080);
      this.renderer.setSize(n, a, false);
      const o = this.renderer.domElement;
      o.style.position = "fixed", o.style.left = "50%", o.style.top = "50%", o.style.transform = "translate(-50%, -50%)", o.style.width = n + "px", o.style.height = a + "px", this.camera.aspect = n / a, this.camera.updateProjectionMatrix();
    }
  }
  class re {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.worldScale = s.worldScale || 1, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new v(), this.pointer = new P(), this.mouseDownPointer = new P(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
    }
    handlePointerDown(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) for (const s of t) {
        let i = s.object;
        for (; i.parent && !this.walls.includes(i); ) i = i.parent;
        if (this.walls.includes(i) && !this.isWallFacingCamera(i)) continue;
        let n = s.object;
        for (; n.parent && !n.userData.isPanel && n !== this.gameContext.scene; ) n = n.parent;
        if (n.userData.isPanel) return this.pendingPanel = n, this.mouseDownPointer.set(e.clientX, e.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    isWallFacingCamera(e) {
      const t = this.gameContext.camera, s = new p();
      e.getWorldPosition(s);
      const i = new p().subVectors(t.position, s), n = new p(0, 0, 1).applyQuaternion(e.quaternion);
      return i.dot(n) > 0;
    }
    startDrag(e, t) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const i = this.gameContext.assetManager.panels[e];
      i && (this.ghostMesh = i.clone(), this.applyMaterialProperties(this.ghostMesh, {
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
        const s = t[0], i = s.object;
        if (this.currentWall !== i) {
          this.currentWall = i;
          const n = this.getWallClippingPlanes(i);
          this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: n
          });
        }
        this.snapToGrid(s, i);
        return;
      }
      this.moveInAir();
    }
    pickupPendingPanel(e) {
      const t = this.pendingPanel, s = t.userData.panelIndex;
      this.savedColor = null, t.traverse((i) => {
        if (this.savedColor === null && i.isMesh && i.material) {
          const n = Array.isArray(i.material) ? i.material[0] : i.material;
          this.savedColor = n.color.getHex();
        }
      }), this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(s, e), this.pendingPanel = null;
    }
    snapToGrid(e, t) {
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.userData.gridTexture, a = t.worldToLocal(e.point.clone());
      let o = a.x / s + 0.5, l = a.y / i + 0.5;
      o = o * n.repeat.x + n.offset.x, l = l * n.repeat.y + n.offset.y;
      const r = Math.floor(o), c = Math.floor(l);
      if (t.children.some((x) => x.userData.isPanel && x.userData.gridX === r && x.userData.gridY === c)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = r, this.ghostMesh.userData.gridY = c;
      const g = (r + 0.5 - n.offset.x) / n.repeat.x, m = (c + 0.5 - n.offset.y) / n.repeat.y, b = (g - 0.5) * s, w = (m - 0.5) * i;
      a.x = b, a.y = w, a.z = 0;
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
      const s = t.clone();
      s.userData.isPanel = true, s.userData.panelIndex = this.draggedPanelIndex, s.userData.gridX = this.ghostMesh.userData.gridX, s.userData.gridY = this.ghostMesh.userData.gridY;
      const i = this.getWallClippingPlanes(this.currentWall);
      this.applyMaterialProperties(s, {
        transparent: false,
        opacity: 1,
        clippingPlanes: i,
        cloneMaterial: true
      }), this.savedColor !== null ? this.applyColor(s, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(s, this.gameContext.sceneClass.globalPanelColor);
      const n = this.ghostMesh.position.clone(), a = new p(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
      n.add(a.multiplyScalar(this.panelDepth * 0.1)), this.currentWall.add(s), this.currentWall.worldToLocal(n), s.position.copy(n), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(s);
    }
    applyColor(e, t) {
      e.traverse((s) => {
        if (!s.isMesh || !s.material) return;
        (Array.isArray(s.material) ? s.material : [
          s.material
        ]).forEach((n) => {
          n.color && (typeof t == "string" ? n.color.set(t) : n.color.setHex(t), n.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(e, { transparent: t, opacity: s, clippingPlanes: i, cloneMaterial: n }) {
      e.traverse((a) => {
        if (!a.isMesh) return;
        n && (Array.isArray(a.material) ? a.material = a.material.map((l) => l.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), s !== void 0 && (l.opacity = s), i !== void 0 && (l.clippingPlanes = i), l.needsUpdate = true;
        });
      });
    }
    cleanupGhost() {
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
    }
    disposeModel(e) {
      e.traverse((t) => {
        t.isMesh && (t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((s) => s.dispose()) : t.material.dispose()));
      });
    }
    updatePointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((e.clientY - s.top) / s.height * 2 - 1);
    }
    getWallClippingPlanes(e) {
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new p(1, 0, 0).applyQuaternion(e.quaternion), n = new p(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new I().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(t / 2))),
        new I().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-t / 2))),
        new I().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new I().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  class oe {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.worldScaleSquared = this.worldScale * this.worldScale, this.defaultCenterLightIntensity = 52 * this.worldScaleSquared, this.defaultSideLightIntensity = 18 * this.worldScaleSquared, this.defaultSideLightDistance = 6 * this.worldScale, this.ambientLight = new K(16777215, 0.18), this.centerLight = null, this.lightBulbMesh = null, this.sideLight = null, this.sideBulbMesh = null, this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.lightDragPlane = new I(), this.lightDragIntersectionPoint = new p(), this.lightDragOffset = new p(), this.pointer = new P(), this.raycaster = new v();
    }
    createScene() {
      this.createCenterLight(), this.addAmbientLight();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new B(1 * this.worldScale, 0.05 * this.worldScale, 1 * this.worldScale), s = new S({
        color: 1118481,
        emissive: 16777198,
        emissiveIntensity: 2,
        roughness: 0.7
      });
      this.lightBulbMesh = new M(t, s);
      const i = e / 2 - 0.03 * this.worldScale;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new T(16770754, this.defaultCenterLightIntensity, 0, 2), this.centerLight.position.set(0, i, 1 * this.worldScale), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 2048, this.centerLight.shadow.mapSize.height = 2048, this.centerLight.shadow.bias = -3e-5, this.centerLight.shadow.normalBias = 0.02, this.centerLight.shadow.radius = 8, this.gameContext.scene.add(this.centerLight);
      const n = new B(0.1 * this.worldScale, 0.1 * this.worldScale, 0.1 * this.worldScale), a = new S({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      });
      this.sideBulbMesh = new M(n, a), this.sideBulbMesh.position.set(1.5 * this.worldScale, 0.5 * this.worldScale, -1 * this.worldScale), this.sideLight = new T(16755302, this.defaultSideLightIntensity, 0, 2), this.sideLight.position.set(1.5 * this.worldScale, 0.5 * this.worldScale, -1 * this.worldScale), this.sideLight.castShadow = true, this.sideLight.shadow.mapSize.width = 1024, this.sideLight.shadow.mapSize.height = 1024, this.sideLight.shadow.bias = -3e-5, this.sideLight.shadow.normalBias = 0.02, this.sideLight.shadow.radius = 6;
    }
    addAmbientLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    addSideLightBulb() {
      const e = new B(0.1 * this.worldScale, 0.1 * this.worldScale, 0.1 * this.worldScale), t = new S({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      }), s = new M(e, t), i = (Math.random() - 0.5) * this.config.widthWallFront, n = (Math.random() - 0.5) * this.config.heightWall, a = (Math.random() - 0.5) * this.config.widthWallSide;
      s.position.set(i, n, a);
      const o = new T(16755302, this.defaultSideLightIntensity, this.defaultSideLightDistance, 1.7);
      o.position.copy(s.position), o.castShadow = false, s.userData.isLightBulb = true, s.userData.light = o, this.gameContext.scene.add(s), this.gameContext.scene.add(o), this.lightBulbs.push({
        mesh: s,
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
      const s = Math.max(50, this.defaultSideLightIntensity * 4, t.intensity * 1.5), i = Math.max(20, this.defaultSideLightDistance * 3, t.distance * 1.5), n = document.getElementById("light-color-picker");
      n && (n.value = "#" + t.color.getHexString());
      const a = document.getElementById("light-intensity");
      a && (a.max = String(s), a.value = String(t.intensity));
      const o = document.getElementById("light-distance");
      o && (o.max = String(i), o.value = String(t.distance));
      const l = document.getElementById("light-decay");
      l && (l.value = String(t.decay));
      const r = document.getElementById("bulb-visible");
      r && (r.checked = e.visible);
      const c = document.getElementById("bulb-emissive");
      c && e.material && e.material.emissiveIntensity !== void 0 && (c.value = String(e.material.emissiveIntensity));
    }
    findLightBulbHit(e) {
      const t = this.lightBulbs.map((i) => i.mesh);
      if (t.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const s = this.raycaster.intersectObjects(t, false);
      return s.length === 0 ? null : s[0].object;
    }
    startDragLightBulb(e, t) {
      this.isDraggingLightBulb = true, this.draggedLightBulbMesh = e, this.gameContext.controls && (this.gameContext.controls.enabled = false);
      const s = new p();
      this.gameContext.camera.getWorldDirection(s), this.lightDragPlane.setFromNormalAndCoplanarPoint(s, e.position), this.updatePointer(t), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint) ? this.lightDragOffset.copy(this.lightDragIntersectionPoint).sub(e.position) : this.lightDragOffset.set(0, 0, 0);
    }
    onPointerMoveLightBulb(e) {
      if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh || (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), !this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint))) return;
      const t = this.lightDragIntersectionPoint.clone().sub(this.lightDragOffset);
      this.draggedLightBulbMesh.position.copy(t);
      const s = this.draggedLightBulbMesh.userData.light;
      s && s.position.copy(t);
    }
    stopDragLightBulb() {
      this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.gameContext.controls && (this.gameContext.controls.enabled = true);
    }
    updatePointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((e.clientY - s.top) / s.height * 2 - 1);
    }
  }
  class le {
    constructor(e) {
      this.roomManager = e, this.selectedPanel = null, this.animatingPanels = [], this.globalPanelColor = null;
    }
    updateAnimations(e) {
      for (let i = this.animatingPanels.length - 1; i >= 0; i--) {
        const n = this.animatingPanels[i], a = !!n.userData.targetQuaternion, o = !!n.userData.targetPosition;
        a && (n.quaternion.slerp(n.userData.targetQuaternion, e * 10), n.quaternion.angleTo(n.userData.targetQuaternion) < 0.01 && (n.quaternion.copy(n.userData.targetQuaternion), delete n.userData.targetQuaternion)), o && (n.position.lerp(n.userData.targetPosition, e * 10), n.position.distanceTo(n.userData.targetPosition) < 1e-3 && (n.position.copy(n.userData.targetPosition), delete n.userData.targetPosition)), !n.userData.targetQuaternion && !n.userData.targetPosition && this.animatingPanels.splice(i, 1);
      }
    }
    randomRotate() {
      const e = this.getAllPanels();
      if (e.length !== 0) {
        for (let t = e.length - 1; t > 0; t--) {
          const s = Math.floor(Math.random() * (t + 1)), i = e[t];
          e[t] = e[s], e[s] = i;
        }
        e.forEach((t) => {
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new z();
          n.setFromAxisAngle(new p(0, 1, 0), i);
          const a = t.userData.targetQuaternion ? t.userData.targetQuaternion.clone() : t.quaternion.clone();
          t.userData.targetQuaternion = a.multiply(n), this.enqueueAnimation(t);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.roomManager.walls.forEach((e) => {
        const t = e.children.filter((r) => r.userData && r.userData.isPanel);
        if (t.length < 2) return;
        const s = t.map((r) => ({
          gridX: r.userData.gridX,
          gridY: r.userData.gridY
        })), i = this.roomManager.config.panelDepth * 0.1;
        for (let r = s.length - 1; r > 0; r--) {
          const c = Math.floor(Math.random() * (r + 1)), u = s[r];
          s[r] = s[c], s[c] = u;
        }
        const n = e.geometry.parameters.width, a = e.geometry.parameters.height, o = e.userData.gridTexture;
        if (!o) return;
        function l(r, c) {
          const u = r + 0.5, g = c + 0.5, m = (u - o.offset.x) / o.repeat.x, b = (g - o.offset.y) / o.repeat.y;
          return new p((m - 0.5) * n, (b - 0.5) * a, i);
        }
        t.forEach((r, c) => {
          const u = s[c];
          r.userData.gridX = u.gridX, r.userData.gridY = u.gridY, r.userData.targetPosition = l(u.gridX, u.gridY), this.enqueueAnimation(r);
        });
      });
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e, this.addSelectionOutline(e);
      let t = "#ffffff";
      e.traverse((i) => {
        i.isMesh && i.material && (t = "#" + (Array.isArray(i.material) ? i.material[0] : i.material).color.getHexString());
      });
      const s = document.querySelector(".selection-ui");
      if (s) {
        s.style.display = "flex";
        const i = document.getElementById("panel-color-picker");
        i && (i.value = t);
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
        t.isMesh && t.material && t.name !== "selection_outline" && (Array.isArray(t.material) ? t.material.forEach((s) => s.color.set(e)) : t.material.color.set(e));
      });
    }
    rotateSelectedPanel(e) {
      if (!this.selectedPanel) return;
      this.selectedPanel.userData.targetQuaternion || (this.selectedPanel.userData.targetQuaternion = this.selectedPanel.quaternion.clone());
      const t = new z();
      t.setFromAxisAngle(new p(0, 1, 0), e), this.selectedPanel.userData.targetQuaternion.multiply(t), this.enqueueAnimation(this.selectedPanel);
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.roomManager.walls.forEach((t) => {
        t.traverse((s) => {
          s.userData && s.userData.isPanel && s.traverse((i) => {
            i.isMesh && i.material && (Array.isArray(i.material) ? i.material.forEach((n) => n.color.set(e)) : i.material.color.set(e));
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
      const t = new W(), s = new p();
      e.updateMatrixWorld(true);
      const i = e.matrixWorld.clone().invert();
      let n = false;
      e.traverse((g) => {
        if (g.isMesh && g.geometry) {
          const m = g.geometry.attributes.position;
          if (!m) return;
          for (let b = 0; b < m.count; b++) s.fromBufferAttribute(m, b), s.applyMatrix4(g.matrixWorld), s.applyMatrix4(i), t.expandByPoint(s);
          n = true;
        }
      }), n || t.set(new p(-0.25, -0.25, 0), new p(0.25, 0.25, 0.05));
      const a = new p(), o = new p();
      t.getSize(a), t.getCenter(o), a.multiplyScalar(1.02);
      const l = new B(a.x, a.y, a.z), r = new $(l), c = new J({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), u = new ee(r, c);
      u.position.copy(o), u.name = "selection_outline", u.raycast = () => {
      }, e.add(u);
    }
    enqueueAnimation(e) {
      this.animatingPanels.includes(e) || this.animatingPanels.push(e);
    }
    getAllPanels() {
      const e = [];
      return this.roomManager.walls.forEach((t) => {
        t.children.forEach((s) => {
          s.userData && s.userData.isPanel && e.push(s);
        });
      }), e;
    }
  }
  const D = new p(), H = new p();
  class he {
    constructor(e, t, s) {
      this.gameContext = e, this.config = t, this.onWallChanged = s, this.floor = null, this.ceiling = null, this.isNetVisible = true, this.activeWallIndex = 0, this.textureLoader = new q(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg"), this.wallTexture.wrapS = y, this.wallTexture.wrapT = y, this.wallTexture.colorSpace = L, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallRoughness = this.textureLoader.load("textures/1/wall-roughness.jpg"), this.wallRoughness.wrapS = y, this.wallRoughness.wrapT = y, this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg"), this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg"), this.floorRoughness = this.textureLoader.load("textures/1/floor-roughness.jpg"), [
        this.floorTexture,
        this.floorNormal,
        this.floorRoughness
      ].forEach((i) => {
        i.wrapS = y, i.wrapT = y;
      }), this.floorTexture.colorSpace = L, this.floorTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.ceilingTexture = this.textureLoader.load("textures/1/ceiling-color.jpg"), this.ceilingTexture.wrapS = y, this.ceilingTexture.wrapT = y, this.ceilingTexture.colorSpace = L, this.ceilingTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.createWalls();
    }
    createScene() {
      this.loadWalls(), this.createFloorAndCeiling();
    }
    createWalls() {
      const { widthWallFront: e, heightWall: t, widthWallSide: s } = this.config;
      this.wall = this.createWallPlane(e, t), this.wall.position.z = -s / 2, this.wall2 = this.createWallPlane(e, t), this.wall2.position.z = s / 2, this.wall2.rotation.y = Math.PI, this.wall3 = this.createWallPlane(s, t), this.wall3.rotation.y = -Math.PI / 2, this.wall3.position.x = e / 2, this.wall4 = this.createWallPlane(s, t), this.wall4.rotation.y = Math.PI / 2, this.wall4.position.x = -e / 2, this.walls = [
        this.wall,
        this.wall2,
        this.wall3,
        this.wall4
      ];
    }
    createWallPlane(e, t) {
      const s = new R(e, t), i = e / this.config.cellSize, n = t / this.config.cellSize, a = this.wallTexture.clone();
      a.repeat.set(e / 2, t / 2), a.wrapS = y, a.wrapT = y, a.needsUpdate = true;
      const o = this.wallRoughness.clone();
      o.repeat.set(i, n);
      const l = this.baseGridTexture.clone();
      l.repeat.set(i, n), l.wrapS = y, l.wrapT = y, l.needsUpdate = true;
      const r = this.baseBlankTexture.clone();
      r.repeat.set(i, n), r.wrapS = y, r.wrapT = y, r.needsUpdate = true;
      const c = new S({
        map: a,
        roughnessMap: o,
        alphaMap: l,
        transparent: true,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: E
      });
      c.envMapIntensity = 0.8;
      const u = new M(s, c);
      return u.userData.gridTexture = l, u.userData.blankTexture = r, u.receiveShadow = true, u.onBeforeRender = (g, m, b) => {
        u.getWorldPosition(D), D.subVectors(b.position, D), H.set(0, 0, 1).transformDirection(u.matrixWorld);
        const w = D.dot(H) > 0;
        u.children.forEach((f) => {
          f.visible = w;
        });
      }, u;
    }
    loadWalls() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new R(e, t), n = e / 2, a = t / 2, o = this.floorTexture.clone(), l = this.floorNormal.clone(), r = this.floorRoughness.clone();
      [
        o,
        l,
        r
      ].forEach((m) => {
        m.repeat.set(n, a), m.needsUpdate = true;
      });
      const c = new S({
        color: 16777215,
        map: o,
        normalMap: l,
        roughnessMap: r,
        roughness: 1,
        metalness: 0.1,
        side: E
      });
      this.floor = new M(i, c), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const u = this.ceilingTexture.clone();
      u.repeat.set(n, a), u.needsUpdate = true;
      const g = new S({
        color: 16777215,
        map: u,
        roughness: 0.9,
        side: E
      });
      this.ceiling = new M(i, g), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    handleWallSelection(e) {
      const t = this.getPointer(e), s = new v();
      s.setFromCamera(t, this.gameContext.camera);
      const i = s.intersectObjects(this.walls, false);
      i.length > 0 && this.setActiveWall(i[0].object);
    }
    setActiveWall(e) {
      const t = this.walls.indexOf(e);
      t !== -1 && (this.activeWallIndex = t, this.onWallChanged && this.onWallChanged());
    }
    highlightActiveWall() {
      this.walls.forEach((e, t) => {
        const s = t === this.activeWallIndex;
        e.material.color.setHex(s ? 8947848 : 16777215), e.material.opacity = s ? 0.4 : 0.8;
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
      const s = new N(e);
      return s.magFilter = O, s.minFilter = k, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    createBlankTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#ffffff", t.fillRect(0, 0, 128, 128);
      const s = new N(e);
      return s.magFilter = O, s.minFilter = k, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    getPointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      return new P((e.clientX - s.left) / s.width * 2 - 1, -((e.clientY - s.top) / s.height * 2 - 1));
    }
  }
  class ce {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.rug = null, this.selectedRug = null, this.raycaster = new v(), this.pointer = new P();
    }
    createScene() {
      const { heightWall: e } = this.config, t = 4 * this.worldScale, s = 3 * this.worldScale, i = new B(t, 5e-3 * this.worldScale, s), n = new q(), a = n.load("textures/1/carpet-color.jpg"), o = n.load("textures/1/carpet-normal.jpg");
      a.wrapS = y, a.wrapT = y, a.repeat.set(t, s), o.wrapS = y, o.wrapT = y, o.repeat.set(t, s), a.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), a.colorSpace = L, a.generateMipmaps = true, a.minFilter = k;
      const l = new S({
        map: a,
        bumpMap: o,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new M(i, l), this.rug.position.y = -e / 2 + 5e-3 * this.worldScale, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = t, this.rug.userData.baseDepth = s, this.gameContext.scene.add(this.rug);
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
    updateRugTransform(e, t, s, i) {
      if (!this.rug) return;
      const n = this.rug.userData.baseWidth, a = this.rug.userData.baseDepth, o = Math.max((this.config.widthWallFront - e) / 2, 0), l = Math.max((this.config.widthWallSide - t) / 2, 0);
      this.rug.scale.set(e / n, 1, t / a), this.rug.position.x = C.clamp(s, -o, o), this.rug.position.z = C.clamp(i, -l, l), this.rug.material.map && this.rug.material.map.repeat.set(e, t), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(e, t), this.refreshRugUI();
    }
    refreshRugUI() {
      if (!this.rug) return;
      const e = document.getElementById("rug-width"), t = document.getElementById("rug-depth"), s = document.getElementById("rug-pos-x"), i = document.getElementById("rug-pos-z"), n = this.rug.userData.baseWidth * this.rug.scale.x, a = this.rug.userData.baseDepth * this.rug.scale.z, o = Math.max(this.config.widthWallFront * 0.95, n), l = Math.max(this.config.widthWallSide * 0.95, a), r = Math.max(this.worldScale, 0.1), c = Math.max(this.worldScale, 0.1), u = Math.max((this.config.widthWallFront - n) / 2, 0), g = Math.max((this.config.widthWallSide - a) / 2, 0);
      e && (e.min = String(r), e.max = String(o), e.value = String(n)), t && (t.min = String(c), t.max = String(l), t.value = String(a)), s && (s.min = String(-u), s.max = String(u), s.value = String(this.rug.position.x)), i && (i.min = String(-g), i.max = String(g), i.value = String(this.rug.position.z));
    }
    changeRugColor(e) {
      var _a;
      ((_a = this.rug) == null ? void 0 : _a.material) && this.rug.material.color.set(e);
    }
    updatePointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((e.clientY - s.top) / s.height * 2 - 1);
    }
  }
  const X = [
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
  ], A = {
    x: 0,
    y: -0.2,
    z: 0
  };
  class ue {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.worldScale = t.worldScale || 1, this.furnitureItems = [], this.tableLamps = [], this.selectedFurniture = null, this.selectedLamp = null, this.raycaster = new v(), this.pointer = new P(), this._tempQuaternion = new z();
    }
    addTable() {
      if (this.furnitureItems.length > 0) {
        const r = this.furnitureItems[0];
        return this.selectFurniture(r), r;
      }
      const e = this.gameContext.assetManager.furniture.table;
      if (!e) return console.warn("\u0421\u0442\u043E\u043B \u0435\u0449\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D"), null;
      const t = new U(), s = e.clone(true);
      t.name = "table_".concat(this.furnitureItems.length + 1), t.userData.type = "table", t.userData.isFurniture = true, t.add(s), s.traverse((r) => {
        r.isMesh && (r.castShadow = true, r.receiveShadow = false, Array.isArray(r.material) ? r.material = r.material.map((c) => c.clone()) : r.material && (r.material = r.material.clone()), this.tuneFurnitureMaterial(r));
      });
      const i = new W().setFromObject(s), n = i.getCenter(new p()), a = i.getSize(new p());
      s.position.x -= n.x, s.position.y -= i.min.y, s.position.z -= n.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.userData.rotationStep = 0;
      const o = -this.config.heightWall / 2, l = X[this.furnitureItems.length % X.length];
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
      const t = new U(), s = e.clone(true);
      t.name = "table_lamp_".concat(this.tableLamps.length + 1), t.userData.isTableLamp = true, t.userData.type = "tableLamp", t.add(s), s.traverse((o) => {
        o.isMesh && (o.castShadow = true, o.receiveShadow = false, Array.isArray(o.material) ? o.material = o.material.map((l) => l.clone()) : o.material && (o.material = o.material.clone()), this.tuneLampMaterial(o));
      });
      const i = new W().setFromObject(s), n = i.getCenter(new p()), a = i.getSize(new p());
      return s.position.x -= n.x, s.position.y -= i.min.y, s.position.z -= n.z, t.userData.baseWidth = a.x, t.userData.baseDepth = a.z, t.userData.baseHeight = a.y, t.position.set(A.x * this.worldScale, A.y * this.worldScale, A.z * this.worldScale), this.gameContext.scene.add(t), this.tableLamps.push(t), this.selectLamp(t), t;
    }
    deleteTableLamp() {
      const e = this.tableLamps[0];
      e && (this.removeObject(e), this.tableLamps = [], this.selectedLamp === e && this.deselectLamp());
    }
    tuneFurnitureMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((s) => {
        s && (s.side = F, s.envMap = null, s.envMapIntensity = 0, s.shadowSide = F, s.toneMapped = true, s.map && (s.map.colorSpace = L, s.map.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s.map.needsUpdate = true), s.name === "Material.002" && (s.color.setRGB(0.62, 0.62, 0.64), s.roughness = 0.68, s.metalness = 0), s.name === "default.001" && (s.color.setRGB(1, 1, 1), s.roughness = 0.58, s.metalness = 0), s.needsUpdate = true);
      });
    }
    tuneLampMaterial(e) {
      (Array.isArray(e.material) ? e.material : [
        e.material
      ]).forEach((s) => {
        s && (s.side = F, s.envMap = null, s.envMapIntensity = 0, s.name === "abajor" && (s.color.setRGB(0.95, 0.92, 0.82), s.roughness = 0.9, s.metalness = 0), (s.name === "black rkham" || s.name === "Material.005") && (s.color.multiplyScalar(1.8), s.roughness = 0.55, s.metalness = 0), s.needsUpdate = true);
      });
    }
    hitTest(e) {
      if (this.furnitureItems.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.furnitureItems, true);
      if (t.length === 0) return null;
      let s = t[0].object;
      for (; s && !s.userData.isFurniture; ) s = s.parent;
      return s || null;
    }
    hitLampTest(e) {
      if (this.tableLamps.length === 0) return null;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.tableLamps, true);
      if (t.length === 0) return null;
      let s = t[0].object;
      for (; s && !s.userData.isTableLamp; ) s = s.parent;
      return s || null;
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
        !t.isMesh || !t.material || (Array.isArray(t.material) ? t.material.forEach((s) => {
          var _a2;
          return (_a2 = s == null ? void 0 : s.dispose) == null ? void 0 : _a2.call(s);
        }) : (_b = (_a = t.material).dispose) == null ? void 0 : _b.call(_a));
      });
    }
    refreshFurnitureUI() {
      const e = this.selectedFurniture;
      if (!e) return;
      const t = document.getElementById("furniture-width"), s = document.getElementById("furniture-depth"), i = document.getElementById("furniture-pos-x"), n = document.getElementById("furniture-pos-z"), a = document.getElementById("furniture-rotation"), o = document.getElementById("furniture-rotation-value"), l = e.userData.baseWidth * e.scale.x, r = e.userData.baseDepth * e.scale.z, c = e.userData.rotationStep || 0, u = Math.max(this.config.widthWallFront * 0.9, l), g = Math.max(this.config.widthWallSide * 0.9, r), m = Math.max(e.userData.baseWidth * 0.5, 0.1), b = Math.max(e.userData.baseDepth * 0.5, 0.1), w = Math.max((this.config.widthWallFront - l) / 2, 0), f = Math.max((this.config.widthWallSide - r) / 2, 0);
      t && (t.min = String(m), t.max = String(u), t.value = String(l)), s && (s.min = String(b), s.max = String(g), s.value = String(r)), i && (i.min = String(-w), i.max = String(w), i.value = String(e.position.x)), n && (n.min = String(-f), n.max = String(f), n.value = String(e.position.z)), a && (a.value = String(c)), o && (o.textContent = "".concat(c * 90, "\xB0"));
    }
    updateFurnitureTransform(e, t, s, i) {
      const n = this.selectedFurniture;
      if (!n) return;
      const a = n.userData.baseWidth || 1, o = n.userData.baseDepth || 1;
      n.scale.set(e / a, 1, t / o);
      const l = Math.max((this.config.widthWallFront - e) / 2, 0), r = Math.max((this.config.widthWallSide - t) / 2, 0);
      n.position.x = C.clamp(s, -l, l), n.position.z = C.clamp(i, -r, r), n.position.y = -this.config.heightWall / 2, this.refreshFurnitureUI();
    }
    updateFurnitureRotation(e) {
      const t = this.selectedFurniture;
      if (!t) return;
      const s = (e % 4 + 4) % 4;
      t.userData.rotationStep = s, t.rotation.y = s * (Math.PI / 2);
      const i = document.getElementById("furniture-rotation-value");
      i && (i.textContent = "".concat(s * 90, "\xB0"));
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
      const t = document.getElementById("table-lamp-width"), s = document.getElementById("table-lamp-height"), i = document.getElementById("table-lamp-pos-x"), n = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z"), o = e.userData.baseWidth * e.scale.x, l = e.userData.baseHeight * e.scale.y, r = this.config.widthWallFront / 2, c = this.config.heightWall / 2, u = this.config.widthWallSide / 2;
      t && (t.min = String(Math.max(e.userData.baseWidth * 0.5, 0.1)), t.max = String(Math.max(e.userData.baseWidth * 3, o)), t.value = String(o)), s && (s.min = String(Math.max(e.userData.baseHeight * 0.5, 0.1)), s.max = String(Math.max(e.userData.baseHeight * 3, l)), s.value = String(l)), i && (i.min = String(-r), i.max = String(r), i.value = String(e.position.x)), n && (n.min = String(-c), n.max = String(c), n.value = String(e.position.y)), a && (a.min = String(-u), a.max = String(u), a.value = String(e.position.z));
    }
    updateLampTransform(e, t, s, i, n) {
      const a = this.selectedLamp;
      if (!a) return;
      const o = a.userData.baseWidth || 1, l = a.userData.baseHeight || 1, r = e / o;
      a.scale.set(r, t / l, r), a.position.x = C.clamp(s, -this.config.widthWallFront / 2, this.config.widthWallFront / 2), a.position.y = C.clamp(i, -this.config.heightWall / 2, this.config.heightWall / 2), a.position.z = C.clamp(n, -this.config.widthWallSide / 2, this.config.widthWallSide / 2), this.refreshLampUI();
    }
    updatePointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((e.clientY - s.top) / s.height * 2 - 1);
    }
  }
  class de {
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
      const s = this.sceneClass.furnitureManager.hitLampTest(e);
      if (s) {
        this.sceneClass.selectTableLamp(s);
        return;
      }
      const i = this.sceneClass.furnitureManager.hitTest(e);
      if (i) {
        this.sceneClass.selectFurniture(i);
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
  class ge {
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
      }, this.roomManager = new he(e, this.config, () => {
        this.onWallChanged && this.onWallChanged();
      }), this.panelManager = new le(this.roomManager), this.lightManager = new oe(e, this.config), this.rugManager = new ce(e, this.config), this.furnitureManager = new ue(e, this.config), this.dragHandler = new re(e, this.roomManager.walls, this.config), this.interactionController = new de(this, this.dragHandler);
    }
    createScene() {
      this.roomManager.createScene(), this.rugManager.createScene(), this.lightManager.createScene(), this.interactionController.bindEvents();
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
    updateTableLampTransform(e, t, s, i, n) {
      this.furnitureManager.updateLampTransform(e, t, s, i, n);
    }
    selectFurniture(e) {
      this.clearSelections(), this.furnitureManager.selectFurniture(e);
    }
    deselectFurniture() {
      this.furnitureManager.deselectFurniture();
    }
    updateFurnitureTransform(e, t, s, i) {
      this.furnitureManager.updateFurnitureTransform(e, t, s, i);
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
    updateRugTransform(e, t, s, i) {
      this.rugManager.updateRugTransform(e, t, s, i);
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
  class me {
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
      const e = this.sceneClass, t = e.centerLight, s = e.lightBulbMesh, i = ((_a = e.config) == null ? void 0 : _a.worldScale) || 1, n = 10 * i;
      if (!t || !s) return;
      const a = Math.max(50, t.intensity * 2), o = Math.max(50 * i, t.distance * 2), l = {
        lightColor: "#" + t.color.getHexString(),
        bulbColor: "#" + s.material.color.getHexString(),
        bulbVisible: s.visible,
        castShadow: t.castShadow,
        shadowMapSize: t.shadow.mapSize.width,
        shadowBias: t.shadow.bias,
        kelvin: 2800
      }, r = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), c = () => s.position.copy(t.position), u = r.add(t.position, "x", -n, n, 0.01).name("X").listen().onChange(c), g = r.add(t.position, "y", -n, n, 0.01).name("Y").listen().onChange(c), m = r.add(t.position, "z", -n, n, 0.01).name("Z").listen().onChange(c);
      this.lightControllers.push(u, g, m), this.lightControllers.push(this.lightFolder.add(t, "intensity", 0, a, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "distance", 0, o, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(l, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((f) => {
        t.color.set(f);
      })), this.lightControllers.push(this.lightFolder.add(l, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((f) => {
        const x = this.kelvinToHex(f);
        t.color.set(x), l.lightColor = "#" + t.color.getHexString();
      }));
      const b = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(b.add(l, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((f) => {
        s.visible = f;
      }), b.addColor(l, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((f) => {
        s.material.color.set(f);
      }));
      const w = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(w.add(l, "castShadow").name("castShadow").onChange((f) => {
        t.castShadow = f;
      }), w.add(l, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((f) => {
        const x = Number(f);
        t.shadow.mapSize.set(x, x), t.shadow.needsUpdate = true;
      }), w.add(l, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((f) => {
        t.shadow.bias = f;
      })), c();
    }
    refreshAmbient() {
      if (!this.ambientFolder) return;
      this.ambientControllers || (this.ambientControllers = []), this.ambientControllers.forEach((s) => s.destroy()), this.ambientControllers = [];
      const e = this.sceneClass.ambientLight;
      if (!e) return;
      const t = {
        ambientColor: "#" + e.color.getHexString()
      };
      this.ambientControllers.push(this.ambientFolder.add(e, "intensity", 0, 5, 0.01).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.ambientFolder.addColor(t, "ambientColor").name("\u0426\u0432\u0435\u0442").onChange((s) => {
        e.color.set(s);
      }));
    }
    kelvinToHex(e) {
      const t = e / 100;
      let s, i, n;
      t <= 66 ? (s = 255, i = 99.4708025861 * Math.log(t) - 161.1195681661, n = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307) : (s = 329.698727446 * Math.pow(t - 60, -0.1332047592), i = 288.1221695283 * Math.pow(t - 60, -0.0755148492), n = 255);
      const a = (l) => Math.min(255, Math.max(0, l));
      return s = a(s), i = a(i), n = a(n), "#" + new te(s / 255, i / 255, n / 255).getHexString();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((n) => n.destroy()), this.controllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) return;
      const t = e.material.alphaMap;
      if (!t) return;
      const s = this.folder.add(t.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), i = this.folder.add(t.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, i);
    }
  }
  class pe {
    constructor(e) {
      var _a;
      this.gameContext = e, this.loader = new se(), this.worldScale = ((_a = e.sceneConfig) == null ? void 0 : _a.worldScale) || 1, this.basePanelCellSize = 0.5, this.basePanelGap = 0.01, this.panelTargetSize = this.basePanelCellSize * this.worldScale - this.basePanelGap, this.panels = [], this.furniture = {
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
      const e = new R(0.49, 0.49), t = this.panelUrls.map((s, i) => this.loader.loadAsync(s).then((n) => {
        const a = n.scene.children[0];
        a.name = "panelTemplate_".concat(i);
        const o = [];
        a.traverse((m) => {
          m.isMesh && (m.scale.set(1, 2, 1), o.push(m));
        }), a.updateMatrixWorld(true);
        const r = new W().setFromObject(a).getSize(new p()), c = [
          r.x,
          r.y,
          r.z
        ].filter((m) => m > 0).sort((m, b) => b - m), u = c[1] || c[0] || 1, g = this.panelTargetSize / u;
        return a.scale.multiplyScalar(g), o.forEach((m) => {
          const b = m.material, w = Array.isArray(b) ? b[0] : b, f = new S({
            color: 16777215,
            normalMap: (w == null ? void 0 : w.normalMap) || null,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: E
          });
          m.castShadow = true, m.receiveShadow = true;
          const x = new M(e, f);
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
  class fe {
    constructor(e) {
      this.camera = e.camera, this.controls = e.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new p(), this.forward = new p(), this.right = new p(), window.addEventListener("keydown", (t) => {
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
          const s = t * this.dollySpeed * e;
          this.camera.position.addScaledVector(this.forward, s);
        }
        if (this.keys.KeyA || this.keys.KeyD) {
          const t = this.keys.KeyD ? 1 : -1;
          this.camera.getWorldDirection(this.forward), this.forward.y = 0, this.forward.normalize(), this.right.crossVectors(this.forward, this.camera.up).normalize();
          const s = t * this.strafeSpeed * e;
          this.camera.position.addScaledVector(this.right, s);
        }
      }
    }
  }
  console.clear();
  const h = {};
  h.clock = new ne();
  h.sceneConfig = {
    worldScale: 10
  };
  be();
  async function be() {
    try {
      await ye(), await we(), ve();
    } catch (d) {
      console.error("Init error", d);
    }
  }
  async function ye() {
    h.gui = new ie(), h.initClass = new ae(h), h.scene = h.initClass.scene, h.camera = h.initClass.camera, h.renderer = h.initClass.renderer, h.assetManager = new pe(h), h.sceneClass = new ge(h), h.keyboardOrbitMove = new fe(h), h.renderer.localClippingEnabled = true, h.guiClass = new me(h);
  }
  async function we() {
    await h.assetManager.loadModels(), Se(), Me(), Ce(), Le(), Pe(), xe();
    const d = h.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), d.startDrag(e - 1, s);
      });
    }
    h.sceneClass.createScene(), h.guiClass && (h.guiClass.refresh(), h.guiClass.refreshLight());
  }
  function xe() {
    document.getElementById("random_rotate").onclick = () => {
      h.sceneClass.randomRotate();
    }, document.getElementById("random_shuffle").onclick = () => {
      h.sceneClass.shufflePanelsOnWalls();
    }, document.getElementById("toglle_net").onclick = () => {
      h.sceneClass.toggleNet();
    };
    const d = document.getElementById("add-light-bulb");
    d && (d.onclick = () => {
      h.sceneClass.addSideLightBulb();
    });
    const e = document.getElementById("add-table");
    e && (e.onclick = () => {
      h.sceneClass.addTable();
    });
    const t = document.getElementById("add-table-lamp");
    t && (t.onclick = () => {
      h.sceneClass.addTableLamp();
    });
  }
  function Se() {
    document.getElementById("btn-rot-left").onclick = () => {
      h.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      h.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    };
    const d = document.getElementById("panel-color-picker");
    d && d.addEventListener("input", (t) => {
      h.sceneClass.changeSelectedPanelColor(t.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      h.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const t = document.getElementById("panel-color-picker");
      t && h.sceneClass.setAllPanelsColor(t.value);
    };
    const e = document.getElementById("wall-color-picker");
    e && e.addEventListener("input", (t) => {
      h.sceneClass.setAllWallsColor(t.target.value);
    });
  }
  function Me() {
    var _a;
    if (!document.getElementById("light-selection-ui")) return;
    const e = ((_a = h.sceneConfig) == null ? void 0 : _a.worldScale) || 1, s = 18 * (e * e), i = 6 * e, n = document.getElementById("light-intensity");
    n && (n.max = String(Math.max(s * 4, 50)), n.value = String(s));
    const a = document.getElementById("light-distance");
    a && (a.max = String(Math.max(i * 3, 20)), a.value = String(i));
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
      const c = Number(l.target.value), u = h.guiClass.kelvinToHex(c);
      r.pointLight.color.set(u);
      const g = document.getElementById("light-color-picker");
      g && (g.value = "#" + r.pointLight.color.getHexString());
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
      const r = h.sceneClass.lightBulbs.findIndex((c) => c.mesh === l.bulbMesh);
      r !== -1 && h.sceneClass.lightBulbs.splice(r, 1), l.bulbMesh.geometry && l.bulbMesh.geometry.dispose(), l.bulbMesh.material && l.bulbMesh.material.dispose(), h.sceneClass.deselectLightBulb();
    };
  }
  function Ce() {
    const d = document.getElementById("btn-close-rug");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, s = document.getElementById("rug-width"), i = document.getElementById("rug-depth"), n = document.getElementById("rug-pos-x"), a = document.getElementById("rug-pos-z");
    s && (s.min = String(h.sceneConfig.worldScale), s.max = String(e * 0.95)), i && (i.min = String(h.sceneConfig.worldScale), i.max = String(t * 0.95)), n && (n.min = String(-e / 2), n.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectRug();
    };
    const o = () => {
      const r = Number(document.getElementById("rug-width").value), c = Number(document.getElementById("rug-depth").value), u = Number(document.getElementById("rug-pos-x").value), g = Number(document.getElementById("rug-pos-z").value);
      h.sceneClass.updateRugTransform(r, c, u, g);
    }, l = document.getElementById("rug-color-picker");
    l && l.addEventListener("input", (r) => {
      h.sceneClass.changeRugColor(r.target.value);
    }), document.getElementById("rug-width").addEventListener("input", o), document.getElementById("rug-depth").addEventListener("input", o), document.getElementById("rug-pos-x").addEventListener("input", o), document.getElementById("rug-pos-z").addEventListener("input", o);
  }
  function Le() {
    const d = document.getElementById("btn-close-furniture");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t } = h.sceneClass.config, s = document.getElementById("furniture-width"), i = document.getElementById("furniture-depth"), n = document.getElementById("furniture-pos-x"), a = document.getElementById("furniture-pos-z");
    s && (s.max = String(e * 0.9)), i && (i.max = String(t * 0.9)), n && (n.min = String(-e / 2), n.max = String(e / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectFurniture();
    };
    const o = () => {
      const r = Number(document.getElementById("furniture-width").value), c = Number(document.getElementById("furniture-depth").value), u = Number(document.getElementById("furniture-pos-x").value), g = Number(document.getElementById("furniture-pos-z").value);
      h.sceneClass.updateFurnitureTransform(r, c, u, g);
    };
    document.getElementById("furniture-width").addEventListener("input", o), document.getElementById("furniture-depth").addEventListener("input", o), document.getElementById("furniture-pos-x").addEventListener("input", o), document.getElementById("furniture-pos-z").addEventListener("input", o), document.getElementById("furniture-rotation").addEventListener("input", (r) => {
      h.sceneClass.updateFurnitureRotation(Number(r.target.value));
    });
    const l = document.getElementById("btn-delete-furniture");
    l && (l.onclick = () => {
      h.sceneClass.deleteTable();
    });
  }
  function Pe() {
    const d = document.getElementById("btn-close-table-lamp");
    if (!d) return;
    const { widthWallFront: e, widthWallSide: t, heightWall: s } = h.sceneClass.config, i = document.getElementById("table-lamp-pos-x"), n = document.getElementById("table-lamp-pos-y"), a = document.getElementById("table-lamp-pos-z");
    i && (i.min = String(-e / 2), i.max = String(e / 2)), n && (n.min = String(-s / 2), n.max = String(s / 2)), a && (a.min = String(-t / 2), a.max = String(t / 2)), d.onclick = () => {
      h.sceneClass.deselectTableLamp();
    };
    const o = () => {
      const r = Number(document.getElementById("table-lamp-width").value), c = Number(document.getElementById("table-lamp-height").value), u = Number(document.getElementById("table-lamp-pos-x").value), g = Number(document.getElementById("table-lamp-pos-y").value), m = Number(document.getElementById("table-lamp-pos-z").value);
      h.sceneClass.updateTableLampTransform(r, c, u, g, m);
    };
    document.getElementById("table-lamp-width").addEventListener("input", o), document.getElementById("table-lamp-height").addEventListener("input", o), document.getElementById("table-lamp-pos-x").addEventListener("input", o), document.getElementById("table-lamp-pos-y").addEventListener("input", o), document.getElementById("table-lamp-pos-z").addEventListener("input", o);
    const l = document.getElementById("btn-delete-table-lamp-ui");
    l && (l.onclick = () => {
      h.sceneClass.deleteTableLamp();
    });
  }
  function Ie(d) {
    h.testMesh && (h.testMesh.rotation.y += d * 0.5), h.keyboardOrbitMove && h.keyboardOrbitMove.update(d), h.sceneClass && h.sceneClass.updateAnimations(d);
  }
  function Be() {
    h.renderer && h.scene && h.camera && h.renderer.render(h.scene, h.camera), h.initClass && h.initClass.stats && h.initClass.stats.update();
  }
  function ve() {
    let d = 0;
    const e = 1 / 60, t = 0.1;
    h.renderer.setAnimationLoop(() => {
      let s = h.clock.getDelta();
      s > t && (s = t), d += s;
      let i = 5;
      for (; d >= e && i > 0; ) Ie(e), d -= e, i--;
      d > e && (d = 0), Be();
    });
  }
})();
export {
  __tla,
  De as __vite_legacy_guard
};
