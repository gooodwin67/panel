import { S as T, P as z, W as H, a as k, O, b as G, R as F, V as b, c as p, d as y, D as R, A as X, B as v, M as Y, e as w, f as _, g as M, h as C, F as P, i as S, Q as D, j as q, E as N, L as Q, k as U, C as j, N as W, l as V, G as K, m as Z, n as $ } from "./three-BpRoMPCf.js";
let ue;
let __tla = (async () => {
  ue = function() {
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
  class J {
    constructor(e) {
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new T(), this.camera = new z(25, window.innerWidth / window.innerHeight, 0.1, 2e3), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 15, this.renderer = new H({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = k, this.renderer.shadowMap.enabled = true, document.body.appendChild(this.renderer.domElement), this.controls = new O(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, this.stats = new G(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
    }
    onWindowResize() {
      const s = window.innerWidth, i = window.innerHeight, n = Math.min(s, 1920), a = Math.min(i, 1080);
      this.renderer.setPixelRatio(1), this.renderer.setSize(n, a, false);
      const h = this.renderer.domElement;
      h.style.position = "fixed", h.style.left = "50%", h.style.top = "50%", h.style.transform = "translate(-50%, -50%)", h.style.width = n + "px", h.style.height = a + "px", this.camera.aspect = n / a, this.camera.updateProjectionMatrix();
    }
  }
  class ee {
    constructor(e, t, s) {
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new F(), this.pointer = new b(), this.mouseDownPointer = new b(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.worldToLocal(e.point.clone()), a = t.material.map, h = n.x / s + 0.5, r = n.y / i + 0.5;
      let d = h * a.repeat.x + a.offset.x, u = r * a.repeat.y + a.offset.y;
      const g = Math.floor(d), c = Math.floor(u);
      if (t.children.some((f) => f.userData.isPanel && f.userData.gridX === g && f.userData.gridY === c)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = c;
        const f = g + 0.5, E = c + 0.5, A = (f - a.offset.x) / a.repeat.x, I = (E - a.offset.y) / a.repeat.y;
        n.x = (A - 0.5) * s, n.y = (I - 0.5) * i, n.z = 0;
        const B = t.localToWorld(n);
        this.ghostMesh.position.copy(B), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
      e.traverse((a) => {
        a.isMesh && (n && (Array.isArray(a.material) ? a.material = a.material.map((r) => r.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((r) => {
          t !== void 0 && (r.transparent = t), s !== void 0 && (r.opacity = s), i !== void 0 && (r.clippingPlanes = i), r.needsUpdate = true;
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new p(1, 0, 0).applyQuaternion(e.quaternion), n = new p(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new y().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(t / 2))),
        new y().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-t / 2))),
        new y().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new y().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const x = new p(), L = new p();
  class te {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.selectedPanel = null, this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.animatingPanels = [], this.globalPanelColor = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new R(16777215, 0.5), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new X(16777215, 0), this.raycaster = new F(), this.pointer = new b(), this.baseGridTexture = this.createGridTexture(), this.createWalls(), this.dragHandler = new ee(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createCenterLight(), this.addLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new v(1.3, 0.05, 1.3), s = new Y({
        color: 16777198
      });
      this.lightBulbMesh = new w(t, s);
      const i = e / 2 - 0.03;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new _(16777198, 15, 10, 2), this.centerLight.position.set(0, i, 0), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.centerLight);
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new M(e, t), n = new C({
        color: 5592405,
        roughness: 0.8,
        metalness: 0.1,
        side: P
      });
      this.floor = new w(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const a = new C({
        color: 15658734,
        roughness: 0.9,
        side: P
      });
      this.ceiling = new w(i, a), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(e, t) {
      e === "floor" && this.floor ? this.floor.material.color.setHex(t) : e === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(t);
    }
    updateAnimations(e) {
      for (let i = this.animatingPanels.length - 1; i >= 0; i--) {
        const n = this.animatingPanels[i], a = !!n.userData.targetQuaternion, h = !!n.userData.targetPosition;
        a && (n.quaternion.slerp(n.userData.targetQuaternion, e * 10), n.quaternion.angleTo(n.userData.targetQuaternion) < 0.01 && (n.quaternion.copy(n.userData.targetQuaternion), delete n.userData.targetQuaternion)), h && (n.position.lerp(n.userData.targetPosition, e * 10), n.position.distanceTo(n.userData.targetPosition) < 1e-3 && (n.position.copy(n.userData.targetPosition), delete n.userData.targetPosition)), !n.userData.targetQuaternion && !n.userData.targetPosition && this.animatingPanels.splice(i, 1);
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
      const s = new M(e, t), i = this.baseGridTexture.clone(), n = e / this.config.cellSize, a = t / this.config.cellSize;
      i.repeat.set(n, a), i.wrapS = S, i.wrapT = S, i.needsUpdate = true;
      const h = new C({
        color: 13421772,
        map: i,
        opacity: 0.6,
        transparent: true,
        side: P
      }), r = new w(s, h);
      return r.receiveShadow = true, r.onBeforeRender = function(d, u, g) {
        r.getWorldPosition(x), x.subVectors(g.position, x), L.set(0, 0, 1).transformDirection(r.matrixWorld);
        const c = x.dot(L) > 0;
        r.children.forEach((m) => m.visible = c);
      }, r;
    }
    loadWall() {
      this.walls.forEach((e) => this.gameContext.scene.add(e));
    }
    addLight() {
      this.gameContext.scene.add(this.ambientLight);
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
    randomRotate() {
      const e = [];
      if (this.walls.forEach((t) => {
        t.children.forEach((s) => {
          s.userData && s.userData.isPanel && e.push(s);
        });
      }), e.length !== 0) {
        for (let t = e.length - 1; t > 0; t--) {
          const s = Math.floor(Math.random() * (t + 1)), i = e[t];
          e[t] = e[s], e[s] = i;
        }
        e.forEach((t) => {
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new D();
          n.setFromAxisAngle(new p(0, 1, 0), i), t.userData.targetQuaternion = t.quaternion.clone(), t.userData.targetQuaternion.multiply(n), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.deselectPanel(), this.walls.forEach((e) => {
        const t = e.children.filter((r) => r.userData && r.userData.isPanel);
        if (t.length < 2) return;
        const s = t.map((r) => ({
          gridX: r.userData.gridX,
          gridY: r.userData.gridY
        }));
        for (let r = s.length - 1; r > 0; r--) {
          const d = Math.floor(Math.random() * (r + 1)), u = s[r];
          s[r] = s[d], s[d] = u;
        }
        const i = e.geometry.parameters.width, n = e.geometry.parameters.height, a = e.material.map;
        function h(r, d) {
          const u = r + 0.5, g = d + 0.5, c = (u - a.offset.x) / a.repeat.x, m = (g - a.offset.y) / a.repeat.y;
          return new p((c - 0.5) * i, (m - 0.5) * n, 0);
        }
        t.forEach((r, d) => {
          const u = s[d];
          r.userData.gridX = u.gridX, r.userData.gridY = u.gridY;
          const g = h(u.gridX, u.gridY);
          r.userData.targetPosition = g, this.animatingPanels.includes(r) || this.animatingPanels.push(r);
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
    addSelectionOutline(e) {
      const t = new q(), s = new p();
      e.updateMatrixWorld(true);
      const i = e.matrixWorld.clone().invert();
      let n = false;
      e.traverse((c) => {
        if (c.isMesh && c.geometry) {
          const m = c.geometry.attributes.position;
          if (m) {
            for (let f = 0; f < m.count; f++) s.fromBufferAttribute(m, f), s.applyMatrix4(c.matrixWorld), s.applyMatrix4(i), t.expandByPoint(s);
            n = true;
          }
        }
      }), n || t.set(new p(-0.25, -0.25, 0), new p(0.25, 0.25, 0.05));
      const a = new p(), h = new p();
      t.getSize(a), t.getCenter(h), a.multiplyScalar(1.02);
      const r = new v(a.x, a.y, a.z), d = new N(r), u = new Q({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new U(d, u);
      g.position.copy(h), g.name = "selection_outline", g.raycast = () => {
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
      const s = new D();
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
      const s = new j(e);
      return s.magFilter = W, s.minFilter = W, s;
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
  class se {
    constructor(e) {
      this.gameContext = e, this.sceneClass = e.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh(), this.gameContext.gui && (this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442"), this.ambientFolder = this.gameContext.gui.addFolder("\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430")), this.refreshLight(), this.refreshAmbient();
    }
    refreshLight() {
      if (!this.lightFolder) return;
      this.lightControllers || (this.lightControllers = []), this.lightControllers.forEach((c) => c.destroy()), this.lightControllers = [];
      const e = this.sceneClass, t = e.centerLight, s = e.lightBulbMesh;
      if (!t || !s) return;
      const i = {
        lightColor: "#" + t.color.getHexString(),
        bulbColor: "#" + s.material.color.getHexString(),
        bulbVisible: s.visible,
        castShadow: t.castShadow,
        shadowMapSize: t.shadow.mapSize.width,
        shadowBias: t.shadow.bias,
        kelvin: 4500
      }, n = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), a = () => s.position.copy(t.position), h = n.add(t.position, "x", -10, 10, 0.01).name("X").listen().onChange(a), r = n.add(t.position, "y", -10, 10, 0.01).name("Y").listen().onChange(a), d = n.add(t.position, "z", -10, 10, 0.01).name("Z").listen().onChange(a);
      this.lightControllers.push(h, r, d), this.lightControllers.push(this.lightFolder.add(t, "intensity", 0, 50, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "distance", 0, 50, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(i, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((c) => {
        t.color.set(c);
      })), this.lightControllers.push(this.lightFolder.add(i, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((c) => {
        const m = this.kelvinToHex(c);
        t.color.set(m), i.lightColor = "#" + t.color.getHexString();
      }));
      const u = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(u.add(i, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((c) => {
        s.visible = c;
      }), u.addColor(i, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((c) => {
        s.material.color.set(c);
      }));
      const g = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(g.add(i, "castShadow").name("castShadow").onChange((c) => {
        t.castShadow = c;
      }), g.add(i, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((c) => {
        const m = Number(c);
        t.shadow.mapSize.set(m, m), t.shadow.needsUpdate = true;
      }), g.add(i, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((c) => {
        t.shadow.bias = c;
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
      const a = (r) => Math.min(255, Math.max(0, r));
      return s = a(s), i = a(i), n = a(n), "#" + new V(s / 255, i / 255, n / 255).getHexString();
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
  class ie {
    constructor(e) {
      this.gameContext = e;
    }
  }
  class ne {
    constructor(e) {
      this.gamecontext = e, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const e = new K(), t = new M(0.49, 0.49), s = this.urls.map((i, n) => e.loadAsync(i).then((a) => {
        const h = a.scene.children[0];
        h.name = "panelTemplate_" + n;
        const r = [];
        return h.traverse((d) => {
          d.isMesh && r.push(d);
        }), r.forEach((d) => {
          const u = d.material, g = new C({
            color: 16777215,
            normalMap: u.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: P
          });
          d.castShadow = true, d.receiveShadow = true;
          const c = new w(t, g);
          c.position.y = 5e-4, c.rotation.x = -Math.PI / 2;
        }), h;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  console.clear();
  const o = {};
  o.clock = new $();
  ae();
  async function ae() {
    try {
      await oe(), await re(), ge();
    } catch (l) {
      console.error("Init error", l);
    }
  }
  async function oe() {
    o.gui = new Z(), o.initClass = new J(o), o.scene = o.initClass.scene, o.camera = o.initClass.camera, o.renderer = o.initClass.renderer, o.assetManager = new ne(o), o.sceneClass = new te(o), o.panelsClass = new ie(o), o.renderer.localClippingEnabled = true, o.guiClass = new se(o);
  }
  async function re() {
    await o.assetManager.loadModels(), ce(), le(), e();
    const l = o.sceneClass;
    for (let t = 1; t <= 4; t++) {
      const s = document.querySelector(".panel".concat(t));
      s && s.addEventListener("pointerdown", (i) => {
        i.preventDefault(), l.startDrag(t - 1, i);
      });
    }
    o.sceneClass.createScene(), o.guiClass && (o.guiClass.refresh(), o.guiClass.refreshLight());
    function e() {
      document.getElementById("random_rotate").onclick = () => {
        o.sceneClass.randomRotate();
      }, document.getElementById("random_shuffle").onclick = () => {
        o.sceneClass.shufflePanelsOnWalls();
      };
    }
  }
  function le() {
    const l = document.getElementById("toggle-btn"), e = document.querySelector(".bottom_panel");
    let t = true;
    l && e && l.addEventListener("click", () => {
      t = !t, t ? (e.classList.remove("closed"), l.innerHTML = "\u25BC") : (e.classList.add("closed"), l.innerHTML = "\u25B2");
    });
  }
  function ce() {
    const l = document.createElement("div");
    l.className = "selection-ui", l.style.position = "absolute", l.style.top = "20px", l.style.left = "20px", l.style.background = "rgba(255, 255, 255, 0.95)", l.style.padding = "15px", l.style.borderRadius = "8px", l.style.display = "none", l.style.flexDirection = "column", l.style.gap = "10px", l.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)", l.style.fontFamily = "sans-serif", l.style.pointerEvents = "auto", l.innerHTML = '\n    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n    \n    <!-- \u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 -->\n    <div style="display:flex; gap:10px; justify-content: space-between;">\n      <button id="btn-rot-left" style="flex:1; padding: 8px; cursor:pointer;">\u21BA</button>\n      <button id="btn-rot-right" style="flex:1; padding: 8px; cursor:pointer;">\u21BB</button>\n    </div>\n\n    <!-- \u0426\u0432\u0435\u0442 -->\n    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">\n        <span style="font-size:14px;">\u0426\u0432\u0435\u0442:</span>\n        <input type="color" id="panel-color-picker" value="#ffffff" style="width:100%; height:30px; cursor:pointer; border:none; padding:0;">\n    </div>\n\n    <button id="btn-all-color" style="margin-top:10px; padding: 5px; cursor:pointer; background:#ddffdd; border:1px solid #ffaaaa; border-radius:4px;">\u0426\u0432\u0435\u0442 \u0432\u0441\u0435\u0445</button>\n\n    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa; border-radius:4px;">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n  ', document.body.appendChild(l), document.getElementById("btn-rot-left").onclick = () => {
      o.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      o.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    }, document.getElementById("panel-color-picker").addEventListener("input", (t) => {
      o.sceneClass.changeSelectedPanelColor(t.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      o.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const t = document.getElementById("panel-color-picker");
      t && o.sceneClass.setAllPanelsColor(t.value);
    };
  }
  function he(l) {
    if (o.testMesh && (o.testMesh.rotation.y += l * 0.5), o.sceneClass && o.sceneClass.updateAnimations(l), o._debugTimer || (o._debugTimer = 0), o._debugTimer += l, o._debugTimer > 1) {
      o._debugTimer = 0;
      const e = o.renderer.info;
      console.log("calls", e.render.calls, "tris", e.render.triangles, "geoms", e.memory.geometries, "tex", e.memory.textures);
    }
  }
  function de() {
    o.renderer && o.scene && o.camera && o.renderer.render(o.scene, o.camera), o.initClass && o.initClass.stats && o.initClass.stats.update();
  }
  function ge() {
    let l = 0;
    const e = 1 / 60, t = 0.1;
    o.renderer.setAnimationLoop(() => {
      let s = o.clock.getDelta();
      s > t && (s = t), l += s;
      let i = 5;
      for (; l >= e && i > 0; ) he(e), l -= e, i--;
      l > e && (l = 0), de();
    });
  }
})();
export {
  __tla,
  ue as __vite_legacy_guard
};
