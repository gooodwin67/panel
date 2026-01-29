import { S as L, C as D, P as F, W as z, a as A, O as E, D as R, A as I, R as O, V as T, b as G, c as x, M as W, F as H, d as y, e as w, f as N, N as C, B as P, g as q, h as m, i as V, j } from "./three-TaLJDUKL.js";
let $;
let __tla = (async () => {
  $ = function() {
    import.meta.url, import("_").then(async (m2) => {
      await m2.__tla;
      return m2;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t);
    new MutationObserver((t) => {
      for (const o of t) if (o.type === "childList") for (const r of o.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function i(t) {
      const o = {};
      return t.integrity && (o.integrity = t.integrity), t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy), t.crossOrigin === "use-credentials" ? o.credentials = "include" : t.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
    }
    function s(t) {
      if (t.ep) return;
      t.ep = true;
      const o = i(t);
      fetch(t.href, o);
    }
  })();
  class _ {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new L(), this.scene.background = new D(10392058), this.camera = new F(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new z({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = A, document.body.appendChild(this.renderer.domElement), this.controls = new E(this.camera, this.renderer.domElement), this.controls.enableDamping = true, window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const e = document.body.offsetWidth || window.innerWidth, i = document.body.offsetHeight || window.innerHeight;
      this.camera.aspect = e / i, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, i);
    }
  }
  const f = new w(), v = new w();
  class B {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.directionalLight = new R(16777215, 1), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new I(16777215, 0.4), this.raycaster = new O(), this.pointer = new T(), this.cellSize = 0.5, this.widthWallFront = 5, this.heightWall = 2.7, this.widthWallSide = 4, this.panelDepth = 0.05, this.baseGridTexture = this.createGridTexture(), this.wall = this.createWallPlane(this.widthWallFront, this.heightWall), this.wall.position.z = -this.widthWallSide / 2, this.wall2 = this.createWallPlane(this.widthWallFront, this.heightWall), this.wall2.position.z = this.widthWallSide / 2, this.wall2.rotation.y = Math.PI, this.wall3 = this.createWallPlane(this.widthWallSide, this.heightWall), this.wall3.rotation.y = -Math.PI / 2, this.wall3.position.x = this.widthWallFront / 2, this.wall4 = this.createWallPlane(this.widthWallSide, this.heightWall), this.wall4.rotation.y = Math.PI / 2, this.wall4.position.x = -this.widthWallFront / 2, this.walls = [
        this.wall,
        this.wall2,
        this.wall3,
        this.wall4
      ], this.activeWallIndex = 0, this.isDragging = false, this.ghostMesh = null, this.draggedPanelType = null;
    }
    createScene() {
      this.loadWall(), this.addLight(), this.initEvents();
    }
    loadWall() {
      this.walls.forEach((e) => this.gameContext.scene.add(e)), this.highlightActiveWall();
    }
    addLight() {
      this.gameContext.scene.add(this.directionalLight), this.gameContext.scene.add(this.ambientLight);
    }
    initEvents() {
      window.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.onPointerMove(e)), window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    }
    onPointerDown(e) {
      this.pointer.x = e.clientX / window.innerWidth * 2 - 1, this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(this.walls);
      if (i.length > 0) {
        const s = i[0].object;
        this.setActiveWall(s);
      }
    }
    setActiveWall(e) {
      const i = this.walls.indexOf(e);
      this.activeWallIndex = i, this.highlightActiveWall(), this.onWallChanged && this.onWallChanged(this.walls[this.activeWallIndex]);
    }
    highlightActiveWall() {
      this.walls.forEach((s, t) => {
        t === this.activeWallIndex ? (s.material.color.setHex(16777215), s.material.opacity = 0.8, s.material.emissive.setHex(2236962)) : (s.material.color.setHex(8947848), s.material.opacity = 0.4, s.material.emissive.setHex(0));
      });
    }
    createWallPlane(e, i) {
      const s = new G(e, i), t = this.baseGridTexture.clone(), o = e / this.cellSize, r = i / this.cellSize;
      t.repeat.set(o, r), t.wrapS = x, t.wrapT = x, t.needsUpdate = true;
      const c = new W({
        color: 13421772,
        map: t,
        opacity: 0.6,
        transparent: true,
        side: H
      }), h = new y(s, c);
      return h.onBeforeRender = function(g, l, d) {
        h.getWorldPosition(f), f.subVectors(d.position, f), v.set(0, 0, 1).transformDirection(h.matrixWorld);
        const p = f.dot(v) > 0;
        h.children.forEach((u) => {
          u.visible = p;
        });
      }, h;
    }
    createGridTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const i = e.getContext("2d");
      i.fillStyle = "#cccccc", i.fillRect(0, 0, 128, 128), i.strokeStyle = "#444444", i.lineWidth = 2, i.strokeRect(0, 0, 128, 128);
      const s = new N(e);
      return s.magFilter = C, s.minFilter = C, s;
    }
    startDrag(e) {
      this.isDragging = true, this.draggedPanelType = e;
      const i = new P(this.cellSize, this.cellSize, this.panelDepth), s = e === "red" ? 16711680 : 65280, t = new q({
        color: s,
        opacity: 0.5,
        transparent: true
      });
      this.ghostMesh = new y(i, t), this.ghostMesh.visible = false, this.ghostMesh.raycast = () => {
      }, this.gameContext.scene.add(this.ghostMesh);
    }
    onPointerMove(e) {
      if (this.pointer.x = e.clientX / window.innerWidth * 2 - 1, this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1, !this.isDragging || !this.ghostMesh) return;
      this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(this.walls);
      if (i.length > 0) {
        const s = i[0], t = s.object;
        if (this.currentWall !== t) {
          this.currentWall = t;
          const b = this.getWallClippingPlanes(t);
          this.ghostMesh.material.clippingPlanes = b;
        }
        this.ghostMesh.visible = true;
        const o = t.geometry.parameters.width, r = t.geometry.parameters.height, c = t.worldToLocal(s.point.clone());
        let h = c.x / o + 0.5, g = c.y / r + 0.5;
        const l = t.material.map;
        let d = h * l.repeat.x + l.offset.x, p = g * l.repeat.y + l.offset.y;
        d = Math.floor(d) + 0.5, p = Math.floor(p) + 0.5;
        const u = (d - l.offset.x) / l.repeat.x, M = (p - l.offset.y) / l.repeat.y;
        c.x = (u - 0.5) * o, c.y = (M - 0.5) * r, c.z = this.panelDepth / 2;
        const S = t.localToWorld(c);
        this.ghostMesh.position.copy(S), this.ghostMesh.quaternion.copy(t.quaternion);
      } else this.ghostMesh.visible = false, this.currentWall = null;
    }
    onPointerUp(e) {
      this.isDragging && (this.ghostMesh && this.ghostMesh.visible && this.placePanel(), this.isDragging = false, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.ghostMesh.geometry.dispose(), this.ghostMesh.material.dispose(), this.ghostMesh = null));
    }
    placePanel() {
      const e = new P(this.cellSize, this.cellSize, this.panelDepth), i = this.draggedPanelType === "red" ? 16729156 : 4521796, s = this.getWallClippingPlanes(this.currentWall), t = new W({
        color: i,
        roughness: 0.5,
        metalness: 0.1,
        clippingPlanes: s
      }), o = new y(e, t), r = this.ghostMesh.position.clone();
      this.currentWall.add(o), this.currentWall.worldToLocal(r), o.position.copy(r), o.rotation.set(0, 0, 0);
    }
    getWallClippingPlanes(e) {
      const i = e.geometry.parameters.width, s = e.geometry.parameters.height, t = new w(1, 0, 0).applyQuaternion(e.quaternion), o = new w(0, 1, 0).applyQuaternion(e.quaternion), r = e.position, c = new m().setFromNormalAndCoplanarPoint(t.clone().negate(), r.clone().add(t.clone().multiplyScalar(i / 2))), h = new m().setFromNormalAndCoplanarPoint(t.clone(), r.clone().add(t.clone().multiplyScalar(-i / 2))), g = new m().setFromNormalAndCoplanarPoint(o.clone().negate(), r.clone().add(o.clone().multiplyScalar(s / 2))), l = new m().setFromNormalAndCoplanarPoint(o.clone(), r.clone().add(o.clone().multiplyScalar(-s / 2)));
      return [
        c,
        h,
        g,
        l
      ];
    }
  }
  class U {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((o) => o.destroy()), this.controllers = [];
      const e = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!e) return;
      const i = e.material.map, s = this.folder.add(i.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), t = this.folder.add(i.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, t);
    }
  }
  class X {
    constructor(e) {
      this.gameContext = e;
    }
  }
  console.clear();
  const n = {};
  n.clock = new j();
  Y();
  async function Y() {
    try {
      await k(), await Q(), Z();
    } catch (a) {
      console.error("Init error", a);
    }
  }
  async function k() {
    n.gui = new V(), n.initClass = new _(n), n.sceneClass = new B(n), n.panelsClass = new X(n), n.scene = n.initClass.scene, n.camera = n.initClass.camera, n.renderer = n.initClass.renderer, n.renderer.localClippingEnabled = true, new U(n);
  }
  async function Q() {
    const a = document.querySelector(".panel1"), e = document.querySelector(".panel2"), i = n.sceneClass;
    a && a.addEventListener("pointerdown", (s) => {
      s.preventDefault(), i.startDrag("red");
    }), e && e.addEventListener("pointerdown", (s) => {
      s.preventDefault(), i.startDrag("green");
    }), n.sceneClass.createScene();
  }
  function K(a) {
    n.testMesh && (n.testMesh.rotation.y += a * 0.5);
  }
  function J() {
    n.initClass && n.initClass.stats && n.initClass.stats.update(), n.renderer && n.scene && n.camera && n.renderer.render(n.scene, n.camera);
  }
  function Z() {
    let a = 0;
    const e = 1 / 60, i = 0.1;
    n.renderer.setAnimationLoop(() => {
      let s = n.clock.getDelta();
      s > i && (s = i), a += s;
      let t = 5;
      for (; a >= e && t > 0; ) K(e), a -= e, t--;
      a > e && (a = 0), J();
    });
  }
})();
export {
  __tla,
  $ as __vite_legacy_guard
};
