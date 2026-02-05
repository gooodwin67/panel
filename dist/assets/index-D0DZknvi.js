import { S as A, C as L, P as E, W as I, a as F, O as T, R as W, V as f, b as g, c as u, D as H, A as G, d as z, e as x, M as O, F as R, f as q, Q as N, g as X, N as C, G as Y, h as Q, i as U } from "./three-DEhUPX1m.js";
let ne;
let __tla = (async () => {
  ne = function() {
    import.meta.url, import("_").then(async (m2) => {
      await m2.__tla;
      return m2;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
    new MutationObserver((i) => {
      for (const a of i) if (a.type === "childList") for (const o of a.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function t(i) {
      const a = {};
      return i.integrity && (a.integrity = i.integrity), i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? a.credentials = "include" : i.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin", a;
    }
    function s(i) {
      if (i.ep) return;
      i.ep = true;
      const a = t(i);
      fetch(i.href, a);
    }
  })();
  class j {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new A(), this.scene.background = new L(10392058), this.camera = new E(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new I({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = F, document.body.appendChild(this.renderer.domElement), this.controls = new T(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const e = document.body.offsetWidth || window.innerWidth, t = document.body.offsetHeight || window.innerHeight;
      this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
    }
  }
  class k {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new W(), this.pointer = new f(), this.mouseDownPointer = new f(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null;
    }
    handlePointerDown(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) for (const s of t) {
        let i = s.object;
        for (; i.parent && !i.userData.isPanel && i !== this.gameContext.scene; ) i = i.parent;
        if (i.userData.isPanel) return this.pendingPanel = i, this.mouseDownPointer.set(e.clientX, e.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    startDrag(e) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const s = this.gameContext.assetManager.panels[e];
      s && (this.ghostMesh = s.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.ghostMesh.traverse((i) => {
        i.raycast = () => {
        };
      }), this.gameContext.scene.add(this.ghostMesh), this.ghostMesh.visible = true);
    }
    onPointerMove(e) {
      if (this.pendingPanel && !this.isDragging && Math.sqrt(Math.pow(e.clientX - this.mouseDownPointer.x, 2) + Math.pow(e.clientY - this.mouseDownPointer.y, 2)) > 15 && this.pickupPendingPanel(e), !this.isDragging || !this.ghostMesh) return;
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, false);
      if (t.length > 0) {
        const s = t[0], i = s.object;
        if (this.currentWall !== i) {
          this.currentWall = i;
          const a = this.getWallClippingPlanes(i);
          this.applyMaterialProperties(this.ghostMesh, {
            clippingPlanes: a
          });
        }
        this.snapToGrid(s, i);
      } else this.moveInAir();
    }
    pickupPendingPanel(e) {
      const t = this.pendingPanel, s = t.userData.panelIndex;
      this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(s), this.pendingPanel = null, this.onPointerMove(e);
    }
    snapToGrid(e, t) {
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, a = t.worldToLocal(e.point.clone()), o = t.material.map, p = a.x / s + 0.5, l = a.y / i + 0.5;
      let w = p * o.repeat.x + o.offset.x, P = l * o.repeat.y + o.offset.y;
      const c = Math.floor(w), h = Math.floor(P);
      if (t.children.some((d) => d.userData.isPanel && d.userData.gridX === c && d.userData.gridY === h)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = c, this.ghostMesh.userData.gridY = h;
        const d = c + 0.5, b = h + 0.5, v = (d - o.offset.x) / o.repeat.x, D = (b - o.offset.y) / o.repeat.y;
        a.x = (v - 0.5) * s, a.y = (D - 0.5) * i, a.z = 0;
        const S = t.localToWorld(a);
        this.ghostMesh.position.copy(S), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
      }
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
    }
    onPointerUp(e) {
      if (this.gameContext.controls && (this.gameContext.controls.enabled = true), this.pendingPanel) {
        this.gameContext.sceneClass.onPanelSelected(this.pendingPanel), this.pendingPanel = null;
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
      });
      const a = this.ghostMesh.position.clone();
      this.currentWall.add(s), this.currentWall.worldToLocal(a), s.position.copy(a), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(s);
    }
    applyMaterialProperties(e, { transparent: t, opacity: s, clippingPlanes: i, cloneMaterial: a }) {
      e.traverse((o) => {
        o.isMesh && (a && (Array.isArray(o.material) ? o.material = o.material.map((l) => l.clone()) : o.material = o.material.clone()), (Array.isArray(o.material) ? o.material : [
          o.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), s !== void 0 && (l.opacity = s), i !== void 0 && (l.clippingPlanes = i), l.needsUpdate = true;
        }));
      });
    }
    cleanupGhost() {
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
    }
    disposeModel(e) {
      e.traverse((t) => {
        t.isMesh && (t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((s) => s.dispose()) : t.material.dispose()));
      });
    }
    updatePointer(e) {
      this.pointer.x = e.clientX / window.innerWidth * 2 - 1, this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    getWallClippingPlanes(e) {
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new g(1, 0, 0).applyQuaternion(e.quaternion), a = new g(0, 1, 0).applyQuaternion(e.quaternion), o = e.position;
      return [
        new u().setFromNormalAndCoplanarPoint(i.clone().negate(), o.clone().add(i.clone().multiplyScalar(t / 2))),
        new u().setFromNormalAndCoplanarPoint(i.clone(), o.clone().add(i.clone().multiplyScalar(-t / 2))),
        new u().setFromNormalAndCoplanarPoint(a.clone().negate(), o.clone().add(a.clone().multiplyScalar(s / 2))),
        new u().setFromNormalAndCoplanarPoint(a.clone(), o.clone().add(a.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const m = new g(), M = new g();
  class V {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.selectedPanel = null, this.originalEmissives = /* @__PURE__ */ new Map(), this.animatingPanels = [], this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new H(16777215, 1), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new G(16777215, 0.4), this.raycaster = new W(), this.pointer = new f(), this.baseGridTexture = this.createGridTexture(), this.createWalls(), this.dragHandler = new k(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.addLight(), this.initEvents();
    }
    updateAnimations(e) {
      for (let s = this.animatingPanels.length - 1; s >= 0; s--) {
        const i = this.animatingPanels[s];
        if (!i.userData.targetQuaternion) {
          this.animatingPanels.splice(s, 1);
          continue;
        }
        i.quaternion.slerp(i.userData.targetQuaternion, e * 10), i.quaternion.angleTo(i.userData.targetQuaternion) < 0.01 && (i.quaternion.copy(i.userData.targetQuaternion), this.animatingPanels.splice(s, 1));
      }
    }
    createWalls() {
      const { widthWallFront: e, heightWall: t, widthWallSide: s } = this.config;
      this.wall = this.createWallPlane(e, t), this.wall.position.z = -s / 2, this.wall2 = this.createWallPlane(e, t), this.wall2.position.z = s / 2, this.wall2.rotation.y = Math.PI, this.wall3 = this.createWallPlane(s, t), this.wall3.rotation.y = -Math.PI / 2, this.wall3.position.x = e / 2, this.wall4 = this.createWallPlane(s, t), this.wall4.rotation.y = Math.PI / 2, this.wall4.position.x = -e / 2, this.walls = [
        this.wall,
        this.wall2,
        this.wall3,
        this.wall4
      ], this.activeWallIndex = 0;
    }
    createWallPlane(e, t) {
      const s = new z(e, t), i = this.baseGridTexture.clone(), a = e / this.config.cellSize, o = t / this.config.cellSize;
      i.repeat.set(a, o), i.wrapS = x, i.wrapT = x, i.needsUpdate = true;
      const p = new O({
        color: 13421772,
        map: i,
        opacity: 0.6,
        transparent: true,
        side: R
      }), l = new q(s, p);
      return l.onBeforeRender = function(w, P, c) {
        l.getWorldPosition(m), m.subVectors(c.position, m), M.set(0, 0, 1).transformDirection(l.matrixWorld);
        const h = m.dot(M) > 0;
        l.children.forEach((y) => y.visible = h);
      }, l;
    }
    loadWall() {
      this.walls.forEach((e) => this.gameContext.scene.add(e)), this.highlightActiveWall();
    }
    addLight() {
      this.gameContext.scene.add(this.directionalLight), this.gameContext.scene.add(this.ambientLight);
    }
    initEvents() {
      window.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.dragHandler.onPointerMove(e)), window.addEventListener("pointerup", (e) => this.dragHandler.onPointerUp(e));
    }
    startDrag(e) {
      this.deselectPanel(), this.dragHandler.startDrag(e);
    }
    onPointerDown(e) {
      if (e.target.closest(".selection-ui") || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
      this.dragHandler.handlePointerDown(e) || (this.handleWallSelection(e), this.deselectPanel());
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e, console.log("Panel Selected:", e), this.originalEmissives.clear(), e.traverse((s) => {
        if (s.isMesh && s.material) {
          const i = Array.isArray(s.material) ? s.material[0] : s.material;
          this.originalEmissives.set(s.uuid, i.emissive.getHex()), i.emissive.setHex(5592388);
        }
      });
      const t = document.querySelector(".selection-ui");
      t && (t.style.display = "flex");
    }
    deselectPanel() {
      if (!this.selectedPanel) return;
      this.selectedPanel.traverse((t) => {
        if (t.isMesh && t.material) {
          const s = Array.isArray(t.material) ? t.material[0] : t.material, i = this.originalEmissives.get(t.uuid) || 0;
          s.emissive.setHex(i);
        }
      }), this.selectedPanel = null, this.originalEmissives.clear();
      const e = document.querySelector(".selection-ui");
      e && (e.style.display = "none");
    }
    rotateSelectedPanel(e) {
      if (!this.selectedPanel) return;
      const t = this.selectedPanel;
      t.userData.targetQuaternion || (t.userData.targetQuaternion = t.quaternion.clone());
      const s = new N();
      s.setFromAxisAngle(new g(0, 1, 0), e), t.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
    }
    handleWallSelection(e) {
      this.pointer.x = e.clientX / window.innerWidth * 2 - 1, this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, false);
      if (t.length > 0) {
        const s = t[0].object;
        this.setActiveWall(s);
      }
    }
    setActiveWall(e) {
      const t = this.walls.indexOf(e);
      this.activeWallIndex = t, this.highlightActiveWall(), this.onWallChanged && this.onWallChanged(this.walls[this.activeWallIndex]);
    }
    highlightActiveWall() {
      this.walls.forEach((e, t) => {
        const s = t === this.activeWallIndex;
        e.material.color.setHex(s ? 16777215 : 8947848), e.material.opacity = s ? 0.8 : 0.4, e.material.emissive.setHex(s ? 2236962 : 0);
      });
    }
    createGridTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#cccccc", t.fillRect(0, 0, 128, 128), t.strokeStyle = "#444444", t.lineWidth = 2, t.strokeRect(0, 0, 128, 128);
      const s = new X(e);
      return s.magFilter = C, s.minFilter = C, s;
    }
  }
  class B {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((a) => a.destroy()), this.controllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) return;
      const t = e.material.map, s = this.folder.add(t.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), i = this.folder.add(t.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, i);
    }
  }
  class _ {
    constructor(e) {
      this.gameContext = e;
    }
  }
  class K {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new Y(), t = this.urls.map((s, i) => e.loadAsync(s).then((a) => {
        const o = a.scene.children[0];
        return o.name = "panelTemplate_" + i, o;
      }));
      this.panels = await Promise.all(t), console.log("Models loaded:", this.panels);
    }
  }
  console.clear();
  const n = {};
  n.clock = new U();
  $();
  async function $() {
    try {
      await J(), await Z(), ie();
    } catch (r) {
      console.error("Init error", r);
    }
  }
  async function J() {
    n.gui = new Q(), n.initClass = new j(n), n.scene = n.initClass.scene, n.camera = n.initClass.camera, n.renderer = n.initClass.renderer, n.assetManager = new K(n), n.sceneClass = new V(n), n.panelsClass = new _(n), n.renderer.localClippingEnabled = true, new B(n);
  }
  async function Z() {
    await n.assetManager.loadModels(), ee();
    const r = n.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), r.startDrag(e - 1);
      });
    }
    n.sceneClass.createScene();
  }
  function ee() {
    const r = document.createElement("div");
    r.className = "selection-ui", r.style.position = "absolute", r.style.top = "20px", r.style.left = "20px", r.style.background = "rgba(255, 255, 255, 0.9)", r.style.padding = "15px", r.style.borderRadius = "8px", r.style.display = "none", r.style.flexDirection = "column", r.style.gap = "10px", r.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)", r.style.fontFamily = "sans-serif", r.innerHTML = '\n    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">\u041F\u0430\u043D\u0435\u043B\u044C</div>\n    <div style="display:flex; gap:10px;">\n      <button id="btn-rot-left" style="padding: 8px; cursor:pointer;">\u21BA \u041B\u0435\u0432.</button>\n      <button id="btn-rot-right" style="padding: 8px; cursor:pointer;">\u041F\u0440\u0430\u0432. \u21BB</button>\n    </div>\n    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa;">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n  ', document.body.appendChild(r), document.getElementById("btn-rot-left").onclick = () => {
      n.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      n.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    }, document.getElementById("btn-close-sel").onclick = () => {
      n.sceneClass.deselectPanel();
    };
  }
  function te(r) {
    n.testMesh && (n.testMesh.rotation.y += r * 0.5), n.sceneClass && n.sceneClass.updateAnimations(r);
  }
  function se() {
    n.initClass && n.initClass.stats && n.initClass.stats.update(), n.renderer && n.scene && n.camera && n.renderer.render(n.scene, n.camera);
  }
  function ie() {
    let r = 0;
    const e = 1 / 60, t = 0.1;
    n.renderer.setAnimationLoop(() => {
      let s = n.clock.getDelta();
      s > t && (s = t), r += s;
      let i = 5;
      for (; r >= e && i > 0; ) te(e), r -= e, i--;
      r > e && (r = 0), se();
    });
  }
})();
export {
  __tla,
  ne as __vite_legacy_guard
};
