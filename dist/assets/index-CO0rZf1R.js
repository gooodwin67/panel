import { S as F, P as B, W as z, a as G, O as H, b as O, R as L, V as M, c as p, d as w, D as k, A as R, B as v, M as q, e as y, f as N, g as b, h as P, F as C, i as W, j as _, E as X, L as Y, k as j, Q, C as U, N as S, G as V, l as K, m as $ } from "./three-CmlSuXyL.js";
let ge;
let __tla = (async () => {
  ge = function() {
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
      for (const n of i) if (n.type === "childList") for (const o of n.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
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
  class J {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new F(), this.camera = new B(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new z({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = G, this.renderer.shadowMap.enabled = true, document.body.appendChild(this.renderer.domElement), this.controls = new H(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, this.stats = new O(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const s = window.innerWidth, i = window.innerHeight, n = Math.min(s, 1920), o = Math.min(i, 1080);
      this.renderer.setPixelRatio(1), this.renderer.setSize(n, o, false);
      const c = this.renderer.domElement;
      c.style.position = "fixed", c.style.left = "50%", c.style.top = "50%", c.style.transform = "translate(-50%, -50%)", c.style.width = n + "px", c.style.height = o + "px", this.camera.aspect = n / o, this.camera.updateProjectionMatrix();
    }
  }
  class Z {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new L(), this.pointer = new M(), this.mouseDownPointer = new M(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      } else this.moveInAir();
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
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.worldToLocal(e.point.clone()), o = t.material.map, c = n.x / s + 0.5, l = n.y / i + 0.5;
      let d = c * o.repeat.x + o.offset.x, m = l * o.repeat.y + o.offset.y;
      const g = Math.floor(d), h = Math.floor(m);
      if (t.children.some((u) => u.userData.isPanel && u.userData.gridX === g && u.userData.gridY === h)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = h;
        const u = g + 0.5, A = h + 0.5, E = (u - o.offset.x) / o.repeat.x, I = (A - o.offset.y) / o.repeat.y;
        n.x = (E - 0.5) * s, n.y = (I - 0.5) * i, n.z = 0;
        const T = t.localToWorld(n);
        this.ghostMesh.position.copy(T), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
      }
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
    }
    onPointerUp(e) {
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
      const n = this.ghostMesh.position.clone();
      this.currentWall.add(s), this.currentWall.worldToLocal(n), s.position.copy(n), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(s);
    }
    applyColor(e, t) {
      e.traverse((s) => {
        s.isMesh && s.material && (Array.isArray(s.material) ? s.material : [
          s.material
        ]).forEach((n) => {
          n.color && (typeof t == "string" ? n.color.set(t) : n.color.setHex(t), n.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(e, { transparent: t, opacity: s, clippingPlanes: i, cloneMaterial: n }) {
      e.traverse((o) => {
        o.isMesh && (n && (Array.isArray(o.material) ? o.material = o.material.map((l) => l.clone()) : o.material = o.material.clone()), (Array.isArray(o.material) ? o.material : [
          o.material
        ]).forEach((l) => {
          t !== void 0 && (l.transparent = t), s !== void 0 && (l.opacity = s), i !== void 0 && (l.clippingPlanes = i), l.needsUpdate = true;
        }));
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new p(1, 0, 0).applyQuaternion(e.quaternion), n = new p(0, 1, 0).applyQuaternion(e.quaternion), o = e.position;
      return [
        new w().setFromNormalAndCoplanarPoint(i.clone().negate(), o.clone().add(i.clone().multiplyScalar(t / 2))),
        new w().setFromNormalAndCoplanarPoint(i.clone(), o.clone().add(i.clone().multiplyScalar(-t / 2))),
        new w().setFromNormalAndCoplanarPoint(n.clone().negate(), o.clone().add(n.clone().multiplyScalar(s / 2))),
        new w().setFromNormalAndCoplanarPoint(n.clone(), o.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const x = new p(), D = new p();
  class ee {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.selectedPanel = null, this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.animatingPanels = [], this.globalPanelColor = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new k(16777215, 0.5), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new R(16777215, 0), this.raycaster = new L(), this.pointer = new M(), this.baseGridTexture = this.createGridTexture(), this.createWalls(), this.dragHandler = new Z(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createCenterLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new v(0.3, 0.05, 0.3), s = new q({
        color: 16777198
      });
      this.lightBulbMesh = new y(t, s);
      const i = e / 2 - 0.05;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new N(16777198, 15, 10, 2), this.centerLight.position.set(0, i, 0), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-3, this.gameContext.scene.add(this.centerLight);
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new b(e, t), n = new P({
        color: 5592405,
        roughness: 0.8,
        metalness: 0.1,
        side: C
      });
      this.floor = new y(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const o = new P({
        color: 15658734,
        roughness: 0.9,
        side: C
      });
      this.ceiling = new y(i, o), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
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
      const s = new b(e, t), i = this.baseGridTexture.clone(), n = e / this.config.cellSize, o = t / this.config.cellSize;
      i.repeat.set(n, o), i.wrapS = W, i.wrapT = W, i.needsUpdate = true;
      const c = new P({
        color: 13421772,
        map: i,
        opacity: 0.6,
        transparent: true,
        side: C
      }), l = new y(s, c);
      return l.receiveShadow = true, l.onBeforeRender = function(d, m, g) {
        l.getWorldPosition(x), x.subVectors(g.position, x), D.set(0, 0, 1).transformDirection(l.matrixWorld);
        const h = x.dot(D) > 0;
        l.children.forEach((f) => f.visible = h);
      }, l;
    }
    loadWall() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    addLight() {
      this.gameContext.scene.add(this.directionalLight), this.gameContext.scene.add(this.ambientLight);
    }
    initEvents() {
      window.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.dragHandler.onPointerMove(e)), window.addEventListener("pointerup", (e) => this.dragHandler.onPointerUp(e));
    }
    startDrag(e, t) {
      this.deselectPanel(), this.dragHandler.startDrag(e, t);
    }
    onPointerDown(e) {
      if (e.target.closest(".selection-ui") || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
      this.dragHandler.handlePointerDown(e) || (this.handleWallSelection(e), this.deselectPanel());
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
    addSelectionOutline(e) {
      const t = new _(), s = new p();
      e.updateMatrixWorld(true);
      const i = e.matrixWorld.clone().invert();
      let n = false;
      e.traverse((h) => {
        if (h.isMesh && h.geometry) {
          const f = h.geometry.attributes.position;
          if (f) {
            for (let u = 0; u < f.count; u++) s.fromBufferAttribute(f, u), s.applyMatrix4(h.matrixWorld), s.applyMatrix4(i), t.expandByPoint(s);
            n = true;
          }
        }
      }), n || t.set(new p(-0.25, -0.25, 0), new p(0.25, 0.25, 0.05));
      const o = new p(), c = new p();
      t.getSize(o), t.getCenter(c), o.multiplyScalar(1.02);
      const l = new v(o.x, o.y, o.z), d = new X(l), m = new Y({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new j(d, m);
      g.position.copy(c), g.name = "selection_outline", g.raycast = () => {
      }, e.add(g);
    }
    removeSelectionOutline() {
      if (!this.selectedPanel) return;
      const e = this.selectedPanel.getObjectByName("selection_outline");
      e && (this.selectedPanel.remove(e), e.geometry && e.geometry.dispose(), e.material && e.material.dispose());
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
      const t = this.selectedPanel;
      t.userData.targetQuaternion || (t.userData.targetQuaternion = t.quaternion.clone());
      const s = new Q();
      s.setFromAxisAngle(new p(0, 1, 0), e), t.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
    }
    handleWallSelection(e) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (e.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((e.clientY - s.top) / s.height * 2 - 1), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(this.walls, false);
      i.length > 0 && i[0].object;
    }
    setActiveWall(e) {
      const t = this.walls.indexOf(e);
      this.activeWallIndex = t, this.onWallChanged && this.onWallChanged(this.walls[this.activeWallIndex]);
    }
    highlightActiveWall() {
      this.walls.forEach((e, t) => {
        const s = t === this.activeWallIndex;
        e.material.color.setHex(s ? 8947848 : 16777215), e.material.opacity = s ? 0.4 : 0.8, e.material.emissive.setHex(s ? 0 : 2236962);
      });
    }
    createGridTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#cccccc", t.fillRect(0, 0, 128, 128), t.strokeStyle = "#444444", t.lineWidth = 2, t.strokeRect(0, 0, 128, 128);
      const s = new U(e);
      return s.magFilter = S, s.minFilter = S, s;
    }
    setAllPanelsColor(e) {
      this.globalPanelColor = e, this.walls.forEach((t) => {
        t.traverse((s) => {
          s.userData && s.userData.isPanel && s.traverse((i) => {
            i.isMesh && i.material && (Array.isArray(i.material) ? i.material.forEach((n) => n.color.set(e)) : i.material.color.set(e));
          });
        });
      });
    }
  }
  class te {
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
  class se {
    constructor(e) {
      this.gameContext = e;
    }
  }
  class ie {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new V(), t = new b(0.49, 0.49), s = this.urls.map((i, n) => e.loadAsync(i).then((o) => {
        const c = o.scene.children[0];
        c.name = "panelTemplate_" + n;
        const l = [];
        return c.traverse((d) => {
          d.isMesh && l.push(d);
        }), l.forEach((d) => {
          const m = d.material, g = new P({
            color: 16777215,
            normalMap: m.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: C
          });
          d.castShadow = true, d.receiveShadow = true;
          const h = new y(t, g);
          h.position.y = 5e-4, h.rotation.x = -Math.PI / 2, d.add(h);
        }), c;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  console.clear();
  const a = {};
  a.clock = new $();
  ne();
  async function ne() {
    try {
      await ae(), await oe(), de();
    } catch (r) {
      console.error("Init error", r);
    }
  }
  async function ae() {
    a.gui = new K(), a.initClass = new J(a), a.scene = a.initClass.scene, a.camera = a.initClass.camera, a.renderer = a.initClass.renderer, a.assetManager = new ie(a), a.sceneClass = new ee(a), a.panelsClass = new se(a), a.renderer.localClippingEnabled = true, new te(a);
  }
  async function oe() {
    await a.assetManager.loadModels(), le(), re();
    const r = a.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), r.startDrag(e - 1, s);
      });
    }
    a.sceneClass.createScene();
  }
  function re() {
    const r = document.getElementById("toggle-btn"), e = document.querySelector(".bottom_panel");
    let t = true;
    r && e && r.addEventListener("click", () => {
      t = !t, t ? (e.classList.remove("closed"), r.innerHTML = "\u25BC") : (e.classList.add("closed"), r.innerHTML = "\u25B2");
    });
  }
  function le() {
    const r = document.createElement("div");
    r.className = "selection-ui", r.style.position = "absolute", r.style.top = "20px", r.style.left = "20px", r.style.background = "rgba(255, 255, 255, 0.95)", r.style.padding = "15px", r.style.borderRadius = "8px", r.style.display = "none", r.style.flexDirection = "column", r.style.gap = "10px", r.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)", r.style.fontFamily = "sans-serif", r.style.pointerEvents = "auto", r.innerHTML = '\n    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n    \n    <!-- \u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 -->\n    <div style="display:flex; gap:10px; justify-content: space-between;">\n      <button id="btn-rot-left" style="flex:1; padding: 8px; cursor:pointer;">\u21BA</button>\n      <button id="btn-rot-right" style="flex:1; padding: 8px; cursor:pointer;">\u21BB</button>\n    </div>\n\n    <!-- \u0426\u0432\u0435\u0442 -->\n    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">\n        <span style="font-size:14px;">\u0426\u0432\u0435\u0442:</span>\n        <input type="color" id="panel-color-picker" value="#ffffff" style="width:100%; height:30px; cursor:pointer; border:none; padding:0;">\n    </div>\n\n    <button id="btn-all-color" style="margin-top:10px; padding: 5px; cursor:pointer; background:#ddffdd; border:1px solid #ffaaaa; border-radius:4px;">\u0426\u0432\u0435\u0442 \u0432\u0441\u0435\u0445</button>\n\n    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa; border-radius:4px;">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n  ', document.body.appendChild(r), document.getElementById("btn-rot-left").onclick = () => {
      a.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      a.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    }, document.getElementById("panel-color-picker").addEventListener("input", (t) => {
      a.sceneClass.changeSelectedPanelColor(t.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      a.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const t = document.getElementById("panel-color-picker");
      t && a.sceneClass.setAllPanelsColor(t.value);
    };
  }
  function ce(r) {
    if (a.testMesh && (a.testMesh.rotation.y += r * 0.5), a.sceneClass && a.sceneClass.updateAnimations(r), a._debugTimer || (a._debugTimer = 0), a._debugTimer += r, a._debugTimer > 1) {
      a._debugTimer = 0;
      const e = a.renderer.info;
      console.log("calls", e.render.calls, "tris", e.render.triangles, "geoms", e.memory.geometries, "tex", e.memory.textures);
    }
  }
  function he() {
    a.renderer && a.scene && a.camera && a.renderer.render(a.scene, a.camera), a.initClass && a.initClass.stats && a.initClass.stats.update();
  }
  function de() {
    let r = 0;
    const e = 1 / 60, t = 0.1;
    a.renderer.setAnimationLoop(() => {
      let s = a.clock.getDelta();
      s > t && (s = t), r += s;
      let i = 5;
      for (; r >= e && i > 0; ) ce(e), r -= e, i--;
      r > e && (r = 0), he();
    });
  }
})();
export {
  __tla,
  ge as __vite_legacy_guard
};
