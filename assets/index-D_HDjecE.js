import { S as B, P as z, W as H, a as O, O as G, b as N, R as F, V as v, c as m, d as w, D as R, A as X, B as D, M as Y, e as y, f as _, g as S, h as b, F as M, i as x, Q as W, j as q, E as Q, L as U, k as V, C as L, N as C, l as j, G as K, m as Z, n as $ } from "./three-BpRoMPCf.js";
let me;
let __tla = (async () => {
  me = function() {
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
      this.gameContext = e, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new B(), this.camera = new z(40, window.innerWidth / window.innerHeight, 0.1, 40), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10, this.renderer = new H({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = O, this.renderer.shadowMap.enabled = true, document.body.appendChild(this.renderer.domElement), this.controls = new G(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, this.stats = new N(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
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
      this.gameContext = e, this.walls = t, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new F(), this.pointer = new v(), this.mouseDownPointer = new v(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      const t = this.gameContext.camera, s = new m();
      e.getWorldPosition(s);
      const i = new m().subVectors(t.position, s), n = new m(0, 0, 1).applyQuaternion(e.quaternion);
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
      const s = t.geometry.parameters.width, i = t.geometry.parameters.height, n = t.worldToLocal(e.point.clone()), a = t.material.map, h = n.x / s + 0.5, l = n.y / i + 0.5;
      let d = h * a.repeat.x + a.offset.x, u = l * a.repeat.y + a.offset.y;
      const g = Math.floor(d), c = Math.floor(u);
      if (t.children.some((f) => f.userData.isPanel && f.userData.gridX === g && f.userData.gridY === c)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = c;
        const f = g + 0.5, A = c + 0.5, k = (f - a.offset.x) / a.repeat.x, T = (A - a.offset.y) / a.repeat.y;
        n.x = (k - 0.5) * s, n.y = (T - 0.5) * i, n.z = 0;
        const I = t.localToWorld(n);
        this.ghostMesh.position.copy(I), this.ghostMesh.quaternion.copy(t.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
        a.isMesh && (n && (Array.isArray(a.material) ? a.material = a.material.map((l) => l.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
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
      const t = e.geometry.parameters.width, s = e.geometry.parameters.height, i = new m(1, 0, 0).applyQuaternion(e.quaternion), n = new m(0, 1, 0).applyQuaternion(e.quaternion), a = e.position;
      return [
        new w().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(t / 2))),
        new w().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-t / 2))),
        new w().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new w().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const P = new m(), E = new m();
  class te {
    constructor(e) {
      this.gameContext = e, this.onWallChanged = null, this.selectedPanel = null, this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.animatingPanels = [], this.globalPanelColor = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.directionalLight = new R(16777215, 0.5), this.directionalLight.position.set(5, 5, 5), this.ambientLight = new X(16777215, 0), this.raycaster = new F(), this.pointer = new v(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.isNetVisible = true, this.createWalls(), this.dragHandler = new ee(e, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createCenterLight(), this.addLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: e } = this.config, t = new D(1.3, 0.05, 1.3), s = new Y({
        color: 16777198
      });
      this.lightBulbMesh = new y(t, s);
      const i = e / 2 - 0.03;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new _(16777198, 15, 10, 2), this.centerLight.position.set(0, i, 0), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.centerLight);
    }
    createFloorAndCeiling() {
      const { widthWallFront: e, widthWallSide: t, heightWall: s } = this.config, i = new S(e, t), n = new b({
        color: 16777215,
        roughness: 0.8,
        metalness: 0.1,
        side: M
      });
      this.floor = new y(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const a = new b({
        color: 16777215,
        roughness: 0.9,
        side: M
      });
      this.ceiling = new y(i, a), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
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
      const s = new S(e, t), i = e / this.config.cellSize, n = t / this.config.cellSize, a = this.baseGridTexture.clone();
      a.repeat.set(i, n), a.wrapS = x, a.wrapT = x, a.needsUpdate = true;
      const h = this.baseBlankTexture.clone();
      h.repeat.set(i, n), h.wrapS = x, h.wrapT = x, h.needsUpdate = true;
      const l = new b({
        color: 13421772,
        map: a,
        opacity: 0.6,
        transparent: true,
        side: M
      }), d = new y(s, l);
      return d.userData.gridTexture = a, d.userData.blankTexture = h, d.receiveShadow = true, d.onBeforeRender = function(u, g, c) {
        d.getWorldPosition(P), P.subVectors(c.position, P), E.set(0, 0, 1).transformDirection(d.matrixWorld);
        const p = P.dot(E) > 0;
        d.children.forEach((f) => f.visible = p);
      }, d;
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
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new W();
          n.setFromAxisAngle(new m(0, 1, 0), i), t.userData.targetQuaternion = t.quaternion.clone(), t.userData.targetQuaternion.multiply(n), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.deselectPanel(), this.walls.forEach((e) => {
        const t = e.children.filter((l) => l.userData && l.userData.isPanel);
        if (t.length < 2) return;
        const s = t.map((l) => ({
          gridX: l.userData.gridX,
          gridY: l.userData.gridY
        }));
        for (let l = s.length - 1; l > 0; l--) {
          const d = Math.floor(Math.random() * (l + 1)), u = s[l];
          s[l] = s[d], s[d] = u;
        }
        const i = e.geometry.parameters.width, n = e.geometry.parameters.height, a = e.material.map;
        function h(l, d) {
          const u = l + 0.5, g = d + 0.5, c = (u - a.offset.x) / a.repeat.x, p = (g - a.offset.y) / a.repeat.y;
          return new m((c - 0.5) * i, (p - 0.5) * n, 0);
        }
        t.forEach((l, d) => {
          const u = s[d];
          l.userData.gridX = u.gridX, l.userData.gridY = u.gridY;
          const g = h(u.gridX, u.gridY);
          l.userData.targetPosition = g, this.animatingPanels.includes(l) || this.animatingPanels.push(l);
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
      const t = new q(), s = new m();
      e.updateMatrixWorld(true);
      const i = e.matrixWorld.clone().invert();
      let n = false;
      e.traverse((c) => {
        if (c.isMesh && c.geometry) {
          const p = c.geometry.attributes.position;
          if (p) {
            for (let f = 0; f < p.count; f++) s.fromBufferAttribute(p, f), s.applyMatrix4(c.matrixWorld), s.applyMatrix4(i), t.expandByPoint(s);
            n = true;
          }
        }
      }), n || t.set(new m(-0.25, -0.25, 0), new m(0.25, 0.25, 0.05));
      const a = new m(), h = new m();
      t.getSize(a), t.getCenter(h), a.multiplyScalar(1.02);
      const l = new D(a.x, a.y, a.z), d = new Q(l), u = new U({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new V(d, u);
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
      const s = new W();
      s.setFromAxisAngle(new m(0, 1, 0), e), t.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(t) || this.animatingPanels.push(t);
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
      const s = new L(e);
      return s.magFilter = C, s.minFilter = C, s;
    }
    createBlankTexture() {
      const e = document.createElement("canvas");
      e.width = 128, e.height = 128;
      const t = e.getContext("2d");
      t.fillStyle = "#ffffff", t.fillRect(0, 0, 128, 128);
      const s = new L(e);
      return s.magFilter = C, s.minFilter = C, s;
    }
    toggleNet() {
      this.isNetVisible = !this.isNetVisible, this.walls.forEach((e) => {
        if (!e.material) return;
        const t = this.isNetVisible ? e.userData.gridTexture : e.userData.blankTexture;
        e.material.map = t, e.material.needsUpdate = true;
      });
    }
    setAllWallsColor(e) {
      this.walls.forEach((t) => {
        t.material && t.material.color && t.material.color.set(e);
      });
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
      }, n = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), a = () => s.position.copy(t.position), h = n.add(t.position, "x", -10, 10, 0.01).name("X").listen().onChange(a), l = n.add(t.position, "y", -10, 10, 0.01).name("Y").listen().onChange(a), d = n.add(t.position, "z", -10, 10, 0.01).name("Z").listen().onChange(a);
      this.lightControllers.push(h, l, d), this.lightControllers.push(this.lightFolder.add(t, "intensity", 0, 50, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "distance", 0, 50, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(t, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(i, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((c) => {
        t.color.set(c);
      })), this.lightControllers.push(this.lightFolder.add(i, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((c) => {
        const p = this.kelvinToHex(c);
        t.color.set(p), i.lightColor = "#" + t.color.getHexString();
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
        const p = Number(c);
        t.shadow.mapSize.set(p, p), t.shadow.needsUpdate = true;
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
      const a = (l) => Math.min(255, Math.max(0, l));
      return s = a(s), i = a(i), n = a(n), "#" + new j(s / 255, i / 255, n / 255).getHexString();
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
      const e = new K(), t = new S(0.49, 0.49), s = this.urls.map((i, n) => e.loadAsync(i).then((a) => {
        const h = a.scene.children[0];
        h.name = "panelTemplate_" + n;
        const l = [];
        return h.traverse((d) => {
          d.isMesh && l.push(d);
        }), l.forEach((d) => {
          const u = d.material, g = new b({
            color: 16777215,
            normalMap: u.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: M
          });
          d.castShadow = true, d.receiveShadow = true;
          const c = new y(t, g);
          c.position.y = 5e-4, c.rotation.x = -Math.PI / 2;
        }), h;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  class ae {
    constructor(e) {
      this.camera = e.camera, this.controls = e.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new m(), this.forward = new m(), this.right = new m(), window.addEventListener("keydown", (t) => {
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
  const o = {};
  o.clock = new $();
  oe();
  async function oe() {
    try {
      await re(), await le(), ue();
    } catch (r) {
      console.error("Init error", r);
    }
  }
  async function re() {
    o.gui = new Z(), o.initClass = new J(o), o.scene = o.initClass.scene, o.camera = o.initClass.camera, o.renderer = o.initClass.renderer, o.assetManager = new ne(o), o.sceneClass = new te(o), o.panelsClass = new ie(o), o.keyboardOrbitMove = new ae(o), o.renderer.localClippingEnabled = true, o.guiClass = new se(o);
  }
  async function le() {
    await o.assetManager.loadModels(), he(), ce(), e();
    const r = o.sceneClass;
    for (let t = 1; t <= 4; t++) {
      const s = document.querySelector(".panel".concat(t));
      s && s.addEventListener("pointerdown", (i) => {
        i.preventDefault(), r.startDrag(t - 1, i);
      });
    }
    o.sceneClass.createScene(), o.guiClass && (o.guiClass.refresh(), o.guiClass.refreshLight());
    function e() {
      document.getElementById("random_rotate").onclick = () => {
        o.sceneClass.randomRotate();
      }, document.getElementById("random_shuffle").onclick = () => {
        o.sceneClass.shufflePanelsOnWalls();
      }, document.getElementById("toglle_net").onclick = () => {
        o.sceneClass.toggleNet();
      };
    }
  }
  function ce() {
    const r = document.getElementById("toggle-btn"), e = document.querySelector(".bottom_panel");
    let t = true;
    r && e && r.addEventListener("click", () => {
      t = !t, t ? (e.classList.remove("closed"), r.innerHTML = "\u25BC") : (e.classList.add("closed"), r.innerHTML = "\u25B2");
    });
  }
  function he() {
    const r = document.createElement("div");
    r.className = "selection-ui", r.style.position = "absolute", r.style.top = "20px", r.style.left = "20px", r.style.background = "rgba(255, 255, 255, 0.95)", r.style.padding = "15px", r.style.borderRadius = "8px", r.style.display = "none", r.style.flexDirection = "column", r.style.gap = "10px", r.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)", r.style.fontFamily = "sans-serif", r.style.pointerEvents = "auto", r.innerHTML = '\n    <div style="font-weight: bold; margin-bottom:5px; text-align:center;">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n    \n    <!-- \u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 -->\n    <div style="display:flex; gap:10px; justify-content: space-between;">\n      <button id="btn-rot-left" style="flex:1; padding: 8px; cursor:pointer;">\u21BA</button>\n      <button id="btn-rot-right" style="flex:1; padding: 8px; cursor:pointer;">\u21BB</button>\n    </div>\n\n    <!-- \u0426\u0432\u0435\u0442 -->\n    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">\n        <span style="font-size:14px;">\u0426\u0432\u0435\u0442:</span>\n        <input type="color" id="panel-color-picker" value="#ffffff" style="width:100%; height:30px; cursor:pointer; border:none; padding:0;">\n    </div>\n\n    <button id="btn-all-color" style="margin-top:10px; padding: 5px; cursor:pointer; background:#ddffdd; border:1px solid #ffaaaa; border-radius:4px;">\u0426\u0432\u0435\u0442 \u0432\u0441\u0435\u0445</button>\n\n    <button id="btn-close-sel" style="margin-top:5px; padding: 5px; cursor:pointer; background:#ffdddd; border:1px solid #ffaaaa; border-radius:4px;">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n  ', document.body.appendChild(r), document.getElementById("btn-rot-left").onclick = () => {
      o.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      o.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    }, document.getElementById("panel-color-picker").addEventListener("input", (s) => {
      o.sceneClass.changeSelectedPanelColor(s.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      o.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const s = document.getElementById("panel-color-picker");
      s && o.sceneClass.setAllPanelsColor(s.value);
    };
    const t = document.getElementById("wall-color-picker");
    t && t.addEventListener("input", (s) => {
      o.sceneClass.setAllWallsColor(s.target.value);
    });
  }
  function de(r) {
    if (o.testMesh && (o.testMesh.rotation.y += r * 0.5), o.keyboardOrbitMove && o.keyboardOrbitMove.update(r), o.controls, o.sceneClass && o.sceneClass.updateAnimations(r), o._debugTimer || (o._debugTimer = 0), o._debugTimer += r, o._debugTimer > 1) {
      o._debugTimer = 0;
      const e = o.renderer.info;
      console.log("calls", e.render.calls, "tris", e.render.triangles, "geoms", e.memory.geometries, "tex", e.memory.textures);
    }
  }
  function ge() {
    o.renderer && o.scene && o.camera && o.renderer.render(o.scene, o.camera), o.initClass && o.initClass.stats && o.initClass.stats.update();
  }
  function ue() {
    let r = 0;
    const e = 1 / 60, t = 0.1;
    o.renderer.setAnimationLoop(() => {
      let s = o.clock.getDelta();
      s > t && (s = t), r += s;
      let i = 5;
      for (; r >= e && i > 0; ) de(e), r -= e, i--;
      r > e && (r = 0), ge();
    });
  }
})();
export {
  __tla,
  me as __vite_legacy_guard
};
