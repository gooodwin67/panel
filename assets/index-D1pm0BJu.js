import { S as D, P as L, W as G, a as k, O as R, R as A, V as C, b as w, c as y, D as E, A as I, B, M as O, d as u, e as q, f as M, g as f, F as x, h as b, Q as N, C as X, N as W, G as Y, i as j, j as Q, k as U } from "./three-BJkLFxFF.js";
let le;
let __tla = (async () => {
  le = function() {
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
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new D(), this.camera = new L(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new G({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = k, this.renderer.shadowMap.enabled = true, document.body.appendChild(this.renderer.domElement), this.controls = new R(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const e = document.body.offsetWidth || window.innerWidth, t = document.body.offsetHeight || window.innerHeight;
      this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
    }
  }
  class _ {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new A(), this.pointer = new C(), this.mouseDownPointer = new C(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      }), this.savedColor !== null && this.applyColor(this.ghostMesh, this.savedColor), this.ghostMesh.traverse((i) => {
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
      }), this.gameContext.sceneClass.deselectPanel(), t.parent.remove(t), this.disposeModel(t), this.startDrag(s), this.pendingPanel = null, this.onPointerMove(e);
    }
    snapToGrid(e, t) {
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.worldToLocal(e.point.clone()), r = t.material.map, h = n.x / s + 0.5, l = n.y / i + 0.5;
      let c = h * r.repeat.x + r.offset.x, p = l * r.repeat.y + r.offset.y;
      const g = Math.floor(c), d = Math.floor(p);
      if (t.children.some((m) => m.userData.isPanel && m.userData.gridX === g && m.userData.gridY === d)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = d;
        const m = g + 0.5, H = d + 0.5, F = (m - r.offset.x) / r.repeat.x, T = (H - r.offset.y) / r.repeat.y;
        n.x = (F - 0.5) * s, n.y = (T - 0.5) * i, n.z = 0;
        const z = t.localToWorld(n);
        this.ghostMesh.position.copy(z), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
      }), this.savedColor !== null && this.applyColor(s, this.savedColor);
      const n = this.ghostMesh.position.clone();
      this.currentWall.add(s), this.currentWall.worldToLocal(n), s.position.copy(n), s.rotation.set(0, 0, 0), s.rotateX(Math.PI / 2), this.gameContext.sceneClass.onPanelSelected(s);
    }
    applyColor(e, t) {
      e.traverse((s) => {
        s.isMesh && s.material && (Array.isArray(s.material) ? s.material.forEach((i) => i.color.setHex(t)) : s.material.color.setHex(t));
      });
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
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new w(1, 0, 0).applyQuaternion(e.quaternion), n = new w(0, 1, 0).applyQuaternion(e.quaternion), r = e.position;
      return [
        new y().setFromNormalAndCoplanarPoint(i.clone().negate(), r.clone().add(i.clone().multiplyScalar(t / 2))),
        new y().setFromNormalAndCoplanarPoint(i.clone(), r.clone().add(i.clone().multiplyScalar(-t / 2))),
        new y().setFromNormalAndCoplanarPoint(n.clone().negate(), r.clone().add(n.clone().multiplyScalar(s / 2))),
        new y().setFromNormalAndCoplanarPoint(n.clone(), r.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const P = new w(), S = new w();
  class K {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.selectedPanel = null, this.originalEmissives = /* @__PURE__ */ new Map(), this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.animatingPanels = [], this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new E(16777215, 0.5), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new I(16777215, 0), this.raycaster = new A(), this.pointer = new C(), this.baseGridTexture = this.createGridTexture(), this.createWalls(), this.dragHandler = new _(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createCenterLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new B(0.3, 0.05, 0.3), s = new O({
        color: 16777198
      });
      this.lightBulbMesh = new u(t, s);
      const i = e / 2 - 0.05;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new q(16777198, 15, 10, 2), this.centerLight.position.set(0, i, 0), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-3, this.gameContext.scene.add(this.centerLight);
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new M(e, t), n = new f({
        color: 5592405,
        roughness: 0.8,
        metalness: 0.1,
        side: x
      });
      this.floor = new u(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const r = new f({
        color: 15658734,
        roughness: 0.9,
        side: x
      });
      this.ceiling = new u(i, r), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
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
      const s = new M(e, t), i = this.baseGridTexture.clone(), n = e / this.config.cellSize, r = t / this.config.cellSize;
      i.repeat.set(n, r), i.wrapS = b, i.wrapT = b, i.needsUpdate = true;
      const h = new f({
        color: 13421772,
        map: i,
        opacity: 0.6,
        transparent: true,
        side: x
      }), l = new u(s, h);
      return l.receiveShadow = true, l.onBeforeRender = function(c, p, g) {
        l.getWorldPosition(P), P.subVectors(g.position, P), S.set(0, 0, 1).transformDirection(l.matrixWorld);
        const d = P.dot(S) > 0;
        l.children.forEach((v) => v.visible = d);
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
    startDrag(e) {
      this.deselectPanel(), this.dragHandler.startDrag(e);
    }
    onPointerDown(e) {
      if (e.target.closest(".selection-ui") || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
      this.dragHandler.handlePointerDown(e) || (this.handleWallSelection(e), this.deselectPanel());
    }
    onPanelSelected(e) {
      if (this.selectedPanel === e) return;
      this.deselectPanel(), this.selectedPanel = e;
      let t = "#ffffff";
      e.traverse((i) => {
        if (i.isMesh && i.material) {
          const n = Array.isArray(i.material) ? i.material[0] : i.material;
          this.originalEmissives.set(i.uuid, n.emissive.getHex()), t = "#" + n.color.getHexString();
        }
      });
      const s = document.querySelector(".selection-ui");
      if (s) {
        s.style.display = "flex";
        const i = document.getElementById("panel-color-picker");
        i && (i.value = t);
      }
    }
    changeSelectedPanelColor(e) {
      this.selectedPanel && this.selectedPanel.traverse((t) => {
        t.isMesh && t.material && (Array.isArray(t.material) ? t.material.forEach((s) => s.color.set(e)) : t.material.color.set(e));
      });
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
      s.setFromAxisAngle(new w(0, 1, 0), e), t.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
    }
    handleWallSelection(e) {
      this.pointer.x = e.clientX / window.innerWidth * 2 - 1, this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const t = this.raycaster.intersectObjects(this.walls, false);
      t.length > 0 && t[0].object;
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
      const s = new X(e);
      return s.magFilter = W, s.minFilter = W, s;
    }
  }
  class $ {
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
  class J {
    constructor(e) {
      this.gameContext = e;
    }
  }
  class Z {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new Y(), t = new M(0.49, 0.49), s = this.urls.map((i, n) => e.loadAsync(i).then((r) => {
        const h = r.scene.children[0];
        h.name = "panelTemplate_" + n;
        const l = [];
        return h.traverse((c) => {
          c.isMesh && l.push(c);
        }), l.forEach((c) => {
          const p = c.material, g = new f({
            color: 16777215,
            normalMap: p.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: x
          });
          c.castShadow = true, c.receiveShadow = true;
          const d = new u(t, g);
          d.position.y = 5e-4, d.rotation.x = -Math.PI / 2, c.add(d);
        }), h;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  class ee {
    constructor(e) {
      this.gameContext = e, this.renderer = e.renderer, this.previewItems = [], this.time = 0, this.scene = new D(), this.scene.background = new j(14737632), this.camera = new L(50, 1, 0.1, 100), this.camera.position.set(0, 0, 0.7), this.camera.lookAt(0, 0, 0), new I(16777215, 0.4), this.movingLight = new E(16777215, 9.5), this.movingLight.position.set(7, -7, 0), this.scene.add(this.movingLight);
    }
    initPreviews(e) {
      document.querySelectorAll(".panel").forEach((s, i) => {
        if (e[i]) {
          const n = e[i].clone();
          n.traverse((r) => {
            r.isMesh && (r.material = new f({
              color: 10066329,
              roughness: 0.5,
              metalness: 0.1,
              flatShading: true
            }));
          }), n.position.set(0, 0, 0), n.rotation.set(0, 0, 0), n.rotation.x = Math.PI / 2, this.scene.add(n), this.previewItems.push({
            element: s,
            mesh: n
          });
        }
      });
    }
    animate(e) {
      this.movingLight.position.x = Math.sin(this.time * 0.5) * 1, this.movingLight.position.y = Math.cos(this.time * 0.5) * 1, this.movingLight.position.z = 0;
    }
    render() {
      const e = this.renderer;
      e.setScissorTest(true), this.previewItems.forEach((t) => {
        const s = t.element, i = t.mesh, n = s.getBoundingClientRect();
        if (n.bottom < 0 || n.top > e.domElement.clientHeight || n.right < 0 || n.left > e.domElement.clientWidth) return;
        const r = n.width, h = n.height, l = n.left, c = e.domElement.clientHeight - n.bottom;
        e.setViewport(l, c, r, h), e.setScissor(l, c, r, h), this.previewItems.forEach((p) => p.mesh.visible = false), i.visible = true, e.render(this.scene, this.camera);
      }), e.setScissorTest(false);
    }
  }
  console.clear();
  const a = {};
  a.clock = new U();
  te();
  async function te() {
    try {
      await se(), await ie(), oe();
    } catch (o) {
      console.error("Init error", o);
    }
  }
  async function se() {
    a.gui = new Q(), a.initClass = new V(a), a.scene = a.initClass.scene, a.camera = a.initClass.camera, a.renderer = a.initClass.renderer, a.assetManager = new Z(a), a.sceneClass = new K(a), a.panelsClass = new J(a), a.previewClass = new ee(a), a.renderer.localClippingEnabled = true, new $(a);
  }
  async function ie() {
    await a.assetManager.loadModels(), a.previewClass.initPreviews(a.assetManager.panels), ne();
    const o = a.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const t = document.querySelector(".panel".concat(e));
      t && t.addEventListener("pointerdown", (s) => {
        s.preventDefault(), o.startDrag(e - 1);
      });
    }
    a.sceneClass.createScene();
  }
  function ne() {
    const o = document.createElement("div");
    o.className = "selection-ui", o.style.position = "absolute", o.style.top = "20px", o.style.left = "20px", o.style.background = "rgba(255, 255, 255, 0.95)", o.style.padding = "15px", o.style.borderRadius = "8px", o.style.display = "none", o.style.flexDirection = "column", o.style.gap = "10px", o.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)", o.style.fontFamily = "sans-serif", o.style.pointerEvents = "auto", o.innerHTML = '\n    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n    \n    <!-- \u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 -->\n    <div style="display:flex; gap:10px; justify-content: space-between;">\n      <button id="btn-rot-left" style="flex:1; padding: 8px; cursor:pointer;">\u21BA</button>\n      <button id="btn-rot-right" style="flex:1; padding: 8px; cursor:pointer;">\u21BB</button>\n    </div>\n\n    <!-- \u0426\u0432\u0435\u0442 -->\n    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">\n        <span style="font-size:14px;">\u0426\u0432\u0435\u0442:</span>\n        <input type="color" id="panel-color-picker" value="#ffffff" style="width:100%; height:30px; cursor:pointer; border:none; padding:0;">\n    </div>\n\n    <button id="btn-close-sel" style="margin-top:10px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa; border-radius:4px;">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n  ', document.body.appendChild(o), document.getElementById("btn-rot-left").onclick = () => {
      a.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      a.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    }, document.getElementById("panel-color-picker").addEventListener("input", (t) => {
      a.sceneClass.changeSelectedPanelColor(t.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      a.sceneClass.deselectPanel();
    };
  }
  function ae(o) {
    a.testMesh && (a.testMesh.rotation.y += o * 0.5), a.sceneClass && a.sceneClass.updateAnimations(o), a.previewClass && a.previewClass.animate(o);
  }
  function re() {
    a.renderer && a.scene && a.camera && (a.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight), a.renderer.render(a.scene, a.camera)), a.previewClass && a.previewClass.render(), a.initClass && a.initClass.stats && a.initClass.stats.update();
  }
  function oe() {
    let o = 0;
    const e = 1 / 60, t = 0.1;
    a.renderer.setAnimationLoop(() => {
      let s = a.clock.getDelta();
      s > t && (s = t), o += s;
      let i = 5;
      for (; o >= e && i > 0; ) ae(e), o -= e, i--;
      o > e && (o = 0), re();
    });
  }
})();
export {
  __tla,
  le as __vite_legacy_guard
};
