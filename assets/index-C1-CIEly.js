import { S as z, P as O, W as H, a as P, A as U, b as q, O as G, c as X, d as j, R as Y, e as B, V as M, f as u, g as x, h as Q, B as S, M as w, i as y, j as W, Q as T, k as V, E as _, L as K, l as Z, T as N, m as p, n as E, F as v, C as R, o as F, p as A, q as $, G as J, r as ee, s as te } from "./three-JtXRI4m0.js";
let Pe;
let __tla = (async () => {
  Pe = function() {
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
  class se {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new z(), this.camera = new O(40, window.innerWidth / window.innerHeight, 0.1, 40), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10, this.renderer = new H({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = P, this.renderer.shadowMap.enabled = true, this.renderer.toneMapping = U, this.renderer.toneMappingExposure = 0.5, this.renderer.shadowMap.type = q, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new G(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new X(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
      const t = new j(this.renderer);
      t.compileEquirectangularShader(), new Y().setPath("./hdr/").load("studio_small_08_1k.hdr", (s) => {
        t.fromEquirectangular(s).texture, s.dispose(), t.dispose();
      });
    }
    onWindowResize() {
      const s = window.innerWidth, i = window.innerHeight, n = Math.min(s, 1920), a = Math.min(i, 1080);
      this.renderer.setSize(n, a, false);
      const o = this.renderer.domElement;
      o.style.position = "fixed", o.style.left = "50%", o.style.top = "50%", o.style.transform = "translate(-50%, -50%)", o.style.width = n + "px", o.style.height = a + "px", this.camera.aspect = n / a, this.camera.updateProjectionMatrix();
    }
  }
  class ie {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new B(), this.pointer = new M(), this.mouseDownPointer = new M(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      const t = this.gameContext.camera, s = new u();
      e.getWorldPosition(s);
      const i = new u().subVectors(t.position, s), n = new u(0, 0, 1).applyQuaternion(e.quaternion);
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
      let o = a.x / s + 0.5, h = a.y / i + 0.5;
      o = o * n.repeat.x + n.offset.x, h = h * n.repeat.y + n.offset.y;
      const g = Math.floor(o), d = Math.floor(h);
      if (t.children.some((C) => C.userData.isPanel && C.userData.gridX === g && C.userData.gridY === d)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = d;
      const l = (g + 0.5 - n.offset.x) / n.repeat.x, f = (d + 0.5 - n.offset.y) / n.repeat.y, b = (l - 0.5) * s, D = (f - 0.5) * i;
      a.x = b, a.y = D, a.z = 0;
      const I = t.localToWorld(a);
      this.ghostMesh.position.copy(I), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
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
      const n = this.ghostMesh.position.clone(), a = new u(0, 0, 1).applyQuaternion(this.currentWall.quaternion);
      n.add(a.multiplyScalar(5e-3)), this.currentWall.add(s), this.currentWall.worldToLocal(n), s.position.copy(n), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(s);
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
        n && (Array.isArray(a.material) ? a.material = a.material.map((h) => h.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((h) => {
          t !== void 0 && (h.transparent = t), s !== void 0 && (h.opacity = s), i !== void 0 && (h.clippingPlanes = i), h.needsUpdate = true;
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new u(1, 0, 0).applyQuaternion(e.quaternion), n = new u(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new x().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(t / 2))),
        new x().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-t / 2))),
        new x().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new x().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  class ne {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.ambientLight = new Q(16777215, 0.05), this.centerLight = null, this.lightBulbMesh = null, this.sideLight = null, this.sideBulbMesh = null, this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.lightDragPlane = new x(), this.lightDragIntersectionPoint = new u(), this.lightDragOffset = new u(), this.pointer = new M(), this.raycaster = new B();
    }
    createScene() {
      this.createCenterLight(), this.addAmbientLight();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new S(1, 0.05, 1), s = new w({
        color: 1118481,
        emissive: 16777198,
        emissiveIntensity: 2,
        roughness: 0.7
      });
      this.lightBulbMesh = new y(t, s);
      const i = e / 2 - 0.03;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new W(16770754, 60, 0, 2), this.centerLight.position.set(0, i, 1), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.centerLight);
      const n = new S(0.1, 0.1, 0.1), a = new w({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      });
      this.sideBulbMesh = new y(n, a), this.sideBulbMesh.position.set(1.5, 0.5, -1), this.sideLight = new W(16755302, 20, 0, 2), this.sideLight.position.set(1.5, 0.5, -1), this.sideLight.castShadow = true, this.sideLight.shadow.mapSize.width = 1024, this.sideLight.shadow.mapSize.height = 1024, this.sideLight.shadow.bias = -1e-4;
    }
    addAmbientLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    addSideLightBulb() {
      const e = new S(0.1, 0.1, 0.1), t = new w({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      }), s = new y(e, t), i = (Math.random() - 0.5) * this.config.widthWallFront, n = (Math.random() - 0.5) * this.config.heightWall, a = (Math.random() - 0.5) * this.config.widthWallSide;
      s.position.set(i, n, a);
      const o = new W(16755302, 20, 0, 2);
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
      const s = document.getElementById("light-color-picker");
      s && (s.value = "#" + t.color.getHexString());
      const i = document.getElementById("light-intensity");
      i && (i.value = String(t.intensity));
      const n = document.getElementById("light-distance");
      n && (n.value = String(t.distance));
      const a = document.getElementById("light-decay");
      a && (a.value = String(t.decay));
      const o = document.getElementById("bulb-visible");
      o && (o.checked = e.visible);
      const h = document.getElementById("bulb-emissive");
      h && e.material && e.material.emissiveIntensity !== void 0 && (h.value = String(e.material.emissiveIntensity));
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
      const s = new u();
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
  class ae {
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
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new T();
          n.setFromAxisAngle(new u(0, 1, 0), i);
          const a = t.userData.targetQuaternion ? t.userData.targetQuaternion.clone() : t.quaternion.clone();
          t.userData.targetQuaternion = a.multiply(n), this.enqueueAnimation(t);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.roomManager.walls.forEach((e) => {
        const t = e.children.filter((o) => o.userData && o.userData.isPanel);
        if (t.length < 2) return;
        const s = t.map((o) => ({
          gridX: o.userData.gridX,
          gridY: o.userData.gridY
        }));
        for (let o = s.length - 1; o > 0; o--) {
          const h = Math.floor(Math.random() * (o + 1)), g = s[o];
          s[o] = s[h], s[h] = g;
        }
        const i = e.geometry.parameters.width, n = e.geometry.parameters.height;
        function a(o, h) {
          const g = o + 0.5, d = h + 0.5, m = (g - texture.offset.x) / texture.repeat.x, l = (d - texture.offset.y) / texture.repeat.y;
          return new u((m - 0.5) * i, (l - 0.5) * n, 5e-3);
        }
        t.forEach((o, h) => {
          const g = s[h];
          o.userData.gridX = g.gridX, o.userData.gridY = g.gridY, o.userData.targetPosition = a(g.gridX, g.gridY), this.enqueueAnimation(o);
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
      const t = new T();
      t.setFromAxisAngle(new u(0, 1, 0), e), this.selectedPanel.userData.targetQuaternion.multiply(t), this.enqueueAnimation(this.selectedPanel);
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
      const t = new V(), s = new u();
      e.updateMatrixWorld(true);
      const i = e.matrixWorld.clone().invert();
      let n = false;
      e.traverse((l) => {
        if (l.isMesh && l.geometry) {
          const f = l.geometry.attributes.position;
          if (!f) return;
          for (let b = 0; b < f.count; b++) s.fromBufferAttribute(f, b), s.applyMatrix4(l.matrixWorld), s.applyMatrix4(i), t.expandByPoint(s);
          n = true;
        }
      }), n || t.set(new u(-0.25, -0.25, 0), new u(0.25, 0.25, 0.05));
      const a = new u(), o = new u();
      t.getSize(a), t.getCenter(o), a.multiplyScalar(1.02);
      const h = new S(a.x, a.y, a.z), g = new _(h), d = new K({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), m = new Z(g, d);
      m.position.copy(o), m.name = "selection_outline", m.raycast = () => {
      }, e.add(m);
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
  const L = new u(), k = new u();
  class re {
    constructor(e, t, s) {
      this.gameContext = e, this.config = t, this.onWallChanged = s, this.floor = null, this.ceiling = null, this.isNetVisible = true, this.activeWallIndex = 0, this.textureLoader = new N(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.wallTexture = this.textureLoader.load("textures/1/wall-color.jpg"), this.wallTexture.wrapS = p, this.wallTexture.wrapT = p, this.wallTexture.colorSpace = P, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallNormal = this.textureLoader.load("textures/1/wall-normal.jpg"), this.wallRoughness = this.textureLoader.load("textures/1/wall-roughness.jpg"), this.wallNormal.wrapS = p, this.wallNormal.wrapT = p, this.wallRoughness.wrapS = p, this.wallRoughness.wrapT = p, this.floorTexture = this.textureLoader.load("textures/1/floor-color.jpg"), this.floorNormal = this.textureLoader.load("textures/1/floor-normal.jpg"), this.floorRoughness = this.textureLoader.load("textures/1/floor-roughness.jpg"), [
        this.floorTexture,
        this.floorNormal,
        this.floorRoughness
      ].forEach((i) => {
        i.wrapS = p, i.wrapT = p;
      }), this.floorTexture.colorSpace = P, this.floorTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.ceilingTexture = this.textureLoader.load("textures/1/ceiling-color.jpg"), this.ceilingTexture.wrapS = p, this.ceilingTexture.wrapT = p, this.ceilingTexture.colorSpace = P, this.ceilingTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.createWalls();
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
      const s = new E(e, t), i = e / this.config.cellSize, n = t / this.config.cellSize, a = this.wallTexture.clone();
      a.repeat.set(e / 2, t / 2), a.wrapS = p, a.wrapT = p, a.needsUpdate = true;
      const o = this.wallNormal.clone(), h = this.wallRoughness.clone();
      o.repeat.set(i, n), h.repeat.set(i, n);
      const g = this.baseGridTexture.clone();
      g.repeat.set(i, n), g.wrapS = p, g.wrapT = p, g.needsUpdate = true;
      const d = this.baseBlankTexture.clone();
      d.repeat.set(i, n), d.wrapS = p, d.wrapT = p, d.needsUpdate = true;
      const m = new w({
        map: a,
        normalMap: o,
        roughnessMap: h,
        normalScale: new M(0.3, 0.3),
        alphaMap: g,
        transparent: true,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: v
      });
      m.envMapIntensity = 0.8;
      const l = new y(s, m);
      return l.userData.gridTexture = g, l.userData.blankTexture = d, l.receiveShadow = true, l.onBeforeRender = (f, b, D) => {
        l.getWorldPosition(L), L.subVectors(D.position, L), k.set(0, 0, 1).transformDirection(l.matrixWorld);
        const I = L.dot(k) > 0;
        l.children.forEach((C) => {
          C.visible = I;
        });
      }, l;
    }
    loadWalls() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new E(e, t), n = e / 2, a = t / 2, o = this.floorTexture.clone(), h = this.floorNormal.clone(), g = this.floorRoughness.clone();
      [
        o,
        h,
        g
      ].forEach((f) => {
        f.repeat.set(n, a), f.needsUpdate = true;
      });
      const d = new w({
        color: 16777215,
        map: o,
        normalMap: h,
        roughnessMap: g,
        roughness: 1,
        metalness: 0.1,
        side: v
      });
      this.floor = new y(i, d), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const m = this.ceilingTexture.clone();
      m.repeat.set(n, a), m.needsUpdate = true;
      const l = new w({
        color: 16777215,
        map: m,
        roughness: 0.9,
        side: v
      });
      this.ceiling = new y(i, l), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    handleWallSelection(e) {
      const t = this.getPointer(e), s = new B();
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
      const s = new R(e);
      return s.magFilter = F, s.minFilter = A, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    createBlankTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#ffffff", t.fillRect(0, 0, 128, 128);
      const s = new R(e);
      return s.magFilter = F, s.minFilter = A, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    getPointer(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      return new M((e.clientX - s.left) / s.width * 2 - 1, -((e.clientY - s.top) / s.height * 2 - 1));
    }
  }
  class oe {
    constructor(e, t) {
      this.gameContext = e, this.config = t, this.rug = null, this.selectedRug = null, this.raycaster = new B(), this.pointer = new M();
    }
    createScene() {
      const { heightWall: e } = this.config, t = 4, s = 3, i = new S(t, 5e-3, s), n = new N(), a = n.load("textures/1/carpet-color.jpg"), o = n.load("textures/1/carpet-normal.jpg");
      a.wrapS = p, a.wrapT = p, a.repeat.set(t, s), o.wrapS = p, o.wrapT = p, o.repeat.set(t, s), a.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), a.colorSpace = P, a.generateMipmaps = true, a.minFilter = A;
      const h = new w({
        map: a,
        bumpMap: o,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new y(i, h), this.rug.position.y = -e / 2 + 5e-3, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = t, this.rug.userData.baseDepth = s, this.gameContext.scene.add(this.rug);
    }
    hitTest(e) {
      return this.rug ? (this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.intersectObject(this.rug, false).length > 0) : false;
    }
    selectRug() {
      this.selectedRug = this.rug;
      const e = document.querySelector(".rug-selection-ui");
      e && (e.style.display = "flex");
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
      const n = this.rug.userData.baseWidth, a = this.rug.userData.baseDepth;
      this.rug.scale.set(e / n, 1, t / a), this.rug.position.x = s, this.rug.position.z = i, this.rug.material.map && this.rug.material.map.repeat.set(e, t), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(e, t);
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
  class le {
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
  class he {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.roomManager = new re(e, this.config, () => {
        this.onWallChanged && this.onWallChanged();
      }), this.panelManager = new ae(this.roomManager), this.lightManager = new ne(e, this.config), this.rugManager = new oe(e, this.config), this.dragHandler = new ie(e, this.roomManager.walls, this.config), this.interactionController = new le(this, this.dragHandler);
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
      this.panelManager.deselectPanel(), this.lightManager.deselectLightBulb(), this.rugManager.deselectRug();
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
  }
  class ce {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh(), this.gameContext.gui && (this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442"), this.ambientFolder = this.gameContext.gui.addFolder("\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430")), this.refreshLight(), this.refreshAmbient();
    }
    refreshLight() {
      if (!this.lightFolder) return;
      this.lightControllers || (this.lightControllers = []), this.lightControllers.forEach((l) => l.destroy()), this.lightControllers = [];
      const e = this.sceneClass, t = e.centerLight, s = e.lightBulbMesh;
      if (!t || !s) return;
      const i = {
        lightColor: "#" + t.color.getHexString(),
        bulbColor: "#" + s.material.color.getHexString(),
        bulbVisible: s.visible,
        castShadow: t.castShadow,
        shadowMapSize: t.shadow.mapSize.width,
        shadowBias: t.shadow.bias,
        kelvin: 2800
      }, n = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), a = () => s.position.copy(t.position), o = n.add(t.position, "x", -10, 10, 0.01).name("X").listen().onChange(a), h = n.add(t.position, "y", -10, 10, 0.01).name("Y").listen().onChange(a), g = n.add(t.position, "z", -10, 10, 0.01).name("Z").listen().onChange(a);
      this.lightControllers.push(o, h, g), this.lightControllers.push(this.lightFolder.add(t, "intensity", 0, 50, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "distance", 0, 50, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(i, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((l) => {
        t.color.set(l);
      })), this.lightControllers.push(this.lightFolder.add(i, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((l) => {
        const f = this.kelvinToHex(l);
        t.color.set(f), i.lightColor = "#" + t.color.getHexString();
      }));
      const d = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(d.add(i, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((l) => {
        s.visible = l;
      }), d.addColor(i, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((l) => {
        s.material.color.set(l);
      }));
      const m = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(m.add(i, "castShadow").name("castShadow").onChange((l) => {
        t.castShadow = l;
      }), m.add(i, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((l) => {
        const f = Number(l);
        t.shadow.mapSize.set(f, f), t.shadow.needsUpdate = true;
      }), m.add(i, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((l) => {
        t.shadow.bias = l;
      })), a();
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
      const a = (h) => Math.min(255, Math.max(0, h));
      return s = a(s), i = a(i), n = a(n), "#" + new $(s / 255, i / 255, n / 255).getHexString();
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
  class ge {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new J(), t = new E(0.49, 0.49), s = this.urls.map((i, n) => e.loadAsync(i).then((a) => {
        const o = a.scene.children[0];
        o.name = "panelTemplate_" + n;
        const h = [];
        return o.traverse((g) => {
          g.isMesh && (g.scale.set(1, 2, 1), h.push(g));
        }), h.forEach((g) => {
          const d = g.material, m = new w({
            color: 16777215,
            normalMap: d.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: v
          });
          g.castShadow = true, g.receiveShadow = true;
          const l = new y(t, m);
          l.position.y = 5e-4, l.rotation.x = -Math.PI / 2;
        }), o;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  class ue {
    constructor(e) {
      this.camera = e.camera, this.controls = e.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new u(), this.forward = new u(), this.right = new u(), window.addEventListener("keydown", (t) => {
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
  const r = {};
  r.clock = new te();
  de();
  async function de() {
    try {
      await me(), await pe(), xe();
    } catch (c) {
      console.error("Init error", c);
    }
  }
  async function me() {
    r.gui = new ee(), r.initClass = new se(r), r.scene = r.initClass.scene, r.camera = r.initClass.camera, r.renderer = r.initClass.renderer, r.assetManager = new ge(r), r.sceneClass = new he(r), r.keyboardOrbitMove = new ue(r), r.renderer.localClippingEnabled = true, r.guiClass = new ce(r);
  }
  async function pe() {
    await r.assetManager.loadModels(), we(), ye(), be(), fe();
    const c = r.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), c.startDrag(e - 1, s);
      });
    }
    r.sceneClass.createScene(), r.guiClass && (r.guiClass.refresh(), r.guiClass.refreshLight());
  }
  function fe() {
    document.getElementById("random_rotate").onclick = () => {
      r.sceneClass.randomRotate();
    }, document.getElementById("random_shuffle").onclick = () => {
      r.sceneClass.shufflePanelsOnWalls();
    }, document.getElementById("toglle_net").onclick = () => {
      r.sceneClass.toggleNet();
    };
    const c = document.getElementById("add-light-bulb");
    c && (c.onclick = () => {
      r.sceneClass.addSideLightBulb();
    });
  }
  function we() {
    document.getElementById("btn-rot-left").onclick = () => {
      r.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      r.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    };
    const c = document.getElementById("panel-color-picker");
    c && c.addEventListener("input", (t) => {
      r.sceneClass.changeSelectedPanelColor(t.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      r.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const t = document.getElementById("panel-color-picker");
      t && r.sceneClass.setAllPanelsColor(t.value);
    };
    const e = document.getElementById("wall-color-picker");
    e && e.addEventListener("input", (t) => {
      r.sceneClass.setAllWallsColor(t.target.value);
    });
  }
  function ye() {
    if (!document.getElementById("light-selection-ui")) return;
    const e = () => {
      const t = r.sceneClass.selectedLightBulb;
      if (!t) return null;
      const s = t.userData.light;
      return s ? {
        bulbMesh: t,
        pointLight: s
      } : null;
    };
    document.getElementById("btn-close-light").onclick = () => {
      r.sceneClass.deselectLightBulb();
    }, document.getElementById("light-color-picker").addEventListener("input", (t) => {
      const s = e();
      s && s.pointLight.color.set(t.target.value);
    }), document.getElementById("light-kelvin").addEventListener("input", (t) => {
      const s = e();
      if (!s) return;
      const i = Number(t.target.value), n = r.guiClass.kelvinToHex(i);
      s.pointLight.color.set(n);
      const a = document.getElementById("light-color-picker");
      a && (a.value = "#" + s.pointLight.color.getHexString());
    }), document.getElementById("light-intensity").addEventListener("input", (t) => {
      const s = e();
      s && (s.pointLight.intensity = Number(t.target.value));
    }), document.getElementById("light-distance").addEventListener("input", (t) => {
      const s = e();
      s && (s.pointLight.distance = Number(t.target.value));
    }), document.getElementById("light-decay").addEventListener("input", (t) => {
      const s = e();
      s && (s.pointLight.decay = Number(t.target.value));
    }), document.getElementById("bulb-visible").addEventListener("change", (t) => {
      const s = e();
      s && (s.bulbMesh.visible = t.target.checked);
    }), document.getElementById("bulb-emissive").addEventListener("input", (t) => {
      const s = e();
      s && s.bulbMesh.material && (s.bulbMesh.material.emissiveIntensity = Number(t.target.value), s.bulbMesh.material.needsUpdate = true);
    }), document.getElementById("btn-delete-light").onclick = () => {
      const t = e();
      if (!t) return;
      r.scene.remove(t.bulbMesh), r.scene.remove(t.pointLight);
      const s = r.sceneClass.lightBulbs.findIndex((i) => i.mesh === t.bulbMesh);
      s !== -1 && r.sceneClass.lightBulbs.splice(s, 1), t.bulbMesh.geometry && t.bulbMesh.geometry.dispose(), t.bulbMesh.material && t.bulbMesh.material.dispose(), r.sceneClass.deselectLightBulb();
    };
  }
  function be() {
    const c = document.getElementById("btn-close-rug");
    if (!c) return;
    c.onclick = () => {
      r.sceneClass.deselectRug();
    };
    const e = () => {
      const s = Number(document.getElementById("rug-width").value), i = Number(document.getElementById("rug-depth").value), n = Number(document.getElementById("rug-pos-x").value), a = Number(document.getElementById("rug-pos-z").value);
      r.sceneClass.updateRugTransform(s, i, n, a);
    }, t = document.getElementById("rug-color-picker");
    t && t.addEventListener("input", (s) => {
      r.sceneClass.changeRugColor(s.target.value);
    }), document.getElementById("rug-width").addEventListener("input", e), document.getElementById("rug-depth").addEventListener("input", e), document.getElementById("rug-pos-x").addEventListener("input", e), document.getElementById("rug-pos-z").addEventListener("input", e);
  }
  function Me(c) {
    r.testMesh && (r.testMesh.rotation.y += c * 0.5), r.keyboardOrbitMove && r.keyboardOrbitMove.update(c), r.sceneClass && r.sceneClass.updateAnimations(c);
  }
  function Ce() {
    r.renderer && r.scene && r.camera && r.renderer.render(r.scene, r.camera), r.initClass && r.initClass.stats && r.initClass.stats.update();
  }
  function xe() {
    let c = 0;
    const e = 1 / 60, t = 0.1;
    r.renderer.setAnimationLoop(() => {
      let s = r.clock.getDelta();
      s > t && (s = t), c += s;
      let i = 5;
      for (; c >= e && i > 0; ) Me(e), c -= e, i--;
      c > e && (c = 0), Ce();
    });
  }
})();
export {
  __tla,
  Pe as __vite_legacy_guard
};
