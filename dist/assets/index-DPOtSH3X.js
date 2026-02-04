import { S as L, C as A, P as F, W as I, a as E, O as G, R as M, V as W, b as m, c as g, D as z, A as O, d as R, e as P, M as H, F as T, f as X, g as N, N as x, G as Y, h as j, i as q } from "./three-C27CaJIm.js";
let se;
let __tla = (async () => {
  se = function() {
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
      for (const n of i) if (n.type === "childList") for (const r of n.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
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
  class V {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new L(), this.scene.background = new A(10392058), this.camera = new F(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new I({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = E, document.body.appendChild(this.renderer.domElement), this.controls = new G(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const e = document.body.offsetWidth || window.innerWidth, t = document.body.offsetHeight || window.innerHeight;
      this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
    }
  }
  class U {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new M(), this.pointer = new W(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false;
    }
    tryPickupPanel(e) {
      this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, true);
      if (t.length > 0) {
        let s = t[0].object;
        for (; s.parent && !s.userData.isPanel && s !== this.gameContext.scene; ) s = s.parent;
        if (s.userData.isPanel) {
          const i = s.userData.panelIndex;
          return s.parent.remove(s), this.disposeModel(s), this.startDrag(i), this.onPointerMove(e), true;
        }
      }
      return false;
    }
    startDrag(e) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = e;
      const s = this.gameContext.assetManager.panels[e];
      if (!s) {
        console.error("Panel model not found or not loaded yet for index:", e), this.isDragging = false;
        return;
      }
      this.ghostMesh = s.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.ghostMesh.traverse((i) => {
        i.raycast = () => {
        };
      }), this.gameContext.scene.add(this.ghostMesh), this.ghostMesh.visible = true;
    }
    onPointerMove(e) {
      if (!this.isDragging || !this.ghostMesh) return;
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
      } else this.moveInAir();
    }
    snapToGrid(e, t) {
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.worldToLocal(e.point.clone()), r = t.material.map, p = n.x / s + 0.5, l = n.y / i + 0.5;
      let f = p * r.repeat.x + r.offset.x, w = l * r.repeat.y + r.offset.y;
      const c = Math.floor(f), h = Math.floor(w);
      if (t.children.some((d) => d.userData.isPanel && d.userData.gridX === c && d.userData.gridY === h)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = c, this.ghostMesh.userData.gridY = h;
        const d = c + 0.5, v = h + 0.5, D = (d - r.offset.x) / r.repeat.x, b = (v - r.offset.y) / r.repeat.y;
        n.x = (D - 0.5) * s, n.y = (b - 0.5) * i, n.z = 0;
        const S = t.localToWorld(n);
        this.ghostMesh.position.copy(S), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
      }
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
    }
    onPointerUp(e) {
      this.gameContext.controls && (this.gameContext.controls.enabled = true), this.isDragging && (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace && this.placePanel(), this.cleanupGhost());
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
      const n = this.ghostMesh.position.clone();
      this.currentWall.add(s), this.currentWall.worldToLocal(n), s.position.copy(n), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2);
    }
    applyMaterialProperties(e, { transparent: t, opacity: s, clippingPlanes: i, cloneMaterial: n }) {
      e.traverse((r) => {
        r.isMesh && (n && (Array.isArray(r.material) ? r.material = r.material.map((l) => l.clone()) : r.material = r.material.clone()), (Array.isArray(r.material) ? r.material : [
          r.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), s !== void 0 && (l.opacity = s), i !== void 0 && (l.clippingPlanes = i), l.needsUpdate = true;
        }));
      });
    }
    cleanupGhost() {
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new m(1, 0, 0).applyQuaternion(e.quaternion), n = new m(0, 1, 0).applyQuaternion(e.quaternion), r = e.position;
      return [
        new g().setFromNormalAndCoplanarPoint(i.clone().negate(), r.clone().add(i.clone().multiplyScalar(t / 2))),
        new g().setFromNormalAndCoplanarPoint(i.clone(), r.clone().add(i.clone().multiplyScalar(-t / 2))),
        new g().setFromNormalAndCoplanarPoint(n.clone().negate(), r.clone().add(n.clone().multiplyScalar(s / 2))),
        new g().setFromNormalAndCoplanarPoint(n.clone(), r.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const u = new m(), C = new m();
  class _ {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new z(16777215, 1), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new O(16777215, 0.4), this.raycaster = new M(), this.pointer = new W(), this.baseGridTexture = this.createGridTexture(), this.createWalls(), this.dragHandler = new U(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.addLight(), this.initEvents();
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
      const s = new R(e, t), i = this.baseGridTexture.clone(), n = e / this.config.cellSize, r = t / this.config.cellSize;
      i.repeat.set(n, r), i.wrapS = P, i.wrapT = P, i.needsUpdate = true;
      const p = new H({
        color: 13421772,
        map: i,
        opacity: 0.6,
        transparent: true,
        side: T
      }), l = new X(s, p);
      return l.onBeforeRender = function(f, w, c) {
        l.getWorldPosition(u), u.subVectors(c.position, u), C.set(0, 0, 1).transformDirection(l.matrixWorld);
        const h = u.dot(C) > 0;
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
      this.dragHandler.startDrag(e);
    }
    onPointerDown(e) {
      this.dragHandler.tryPickupPanel(e) || this.handleWallSelection(e);
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
      const s = new N(e);
      return s.magFilter = x, s.minFilter = x, s;
    }
  }
  class k {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((n) => n.destroy()), this.controllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) return;
      const t = e.material.map, s = this.folder.add(t.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), i = this.folder.add(t.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, i);
    }
  }
  class B {
    constructor(e) {
      this.gameContext = e;
    }
  }
  class Q {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new Y(), t = this.urls.map((s, i) => e.loadAsync(s).then((n) => {
        const r = n.scene.children[0];
        return r.name = "panelTemplate_" + i, r;
      }));
      this.panels = await Promise.all(t), console.log("Models loaded:", this.panels);
    }
  }
  console.clear();
  const a = {};
  a.clock = new q();
  K();
  async function K() {
    try {
      await $(), await J(), te();
    } catch (o) {
      console.error("Init error", o);
    }
  }
  async function $() {
    a.gui = new j(), a.initClass = new V(a), a.scene = a.initClass.scene, a.camera = a.initClass.camera, a.renderer = a.initClass.renderer, a.assetManager = new Q(a), a.sceneClass = new _(a), a.panelsClass = new B(a), a.renderer.localClippingEnabled = true, new k(a);
  }
  async function J() {
    await a.assetManager.loadModels();
    const o = a.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), o.startDrag(e - 1);
      });
    }
    a.sceneClass.createScene();
  }
  function Z(o) {
    a.testMesh && (a.testMesh.rotation.y += o * 0.5);
  }
  function ee() {
    a.initClass && a.initClass.stats && a.initClass.stats.update(), a.renderer && a.scene && a.camera && a.renderer.render(a.scene, a.camera);
  }
  function te() {
    let o = 0;
    const e = 1 / 60, t = 0.1;
    a.renderer.setAnimationLoop(() => {
      let s = a.clock.getDelta();
      s > t && (s = t), o += s;
      let i = 5;
      for (; o >= e && i > 0; ) Z(e), o -= e, i--;
      o > e && (o = 0), ee();
    });
  }
})();
export {
  __tla,
  se as __vite_legacy_guard
};
