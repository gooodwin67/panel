import { S as G, P as H, W as O, a as R, A as q, b as N, O as _, c as X, d as Q, R as Y, e as k, V as S, f as u, g as x, h as U, B as M, M as y, i as w, j as D, k as v, F as b, l as C, Q as W, m as V, E as K, L as j, n as Z, C as L, o as E, p as F, q as $, G as J, r as ee, s as te } from "./three-DzxW7qGc.js";
let ye;
let __tla = (async () => {
  ye = function() {
    import.meta.url, import("_").then(async (m) => {
      await m.__tla;
      return m;
    }).catch(() => 1), async function* () {
    }().next();
  };
  (function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
    new MutationObserver((i) => {
      for (const n of i) if (n.type === "childList") for (const a of n.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function e(i) {
      const n = {};
      return i.integrity && (n.integrity = i.integrity), i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? n.credentials = "include" : i.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
    }
    function s(i) {
      if (i.ep) return;
      i.ep = true;
      const n = e(i);
      fetch(i.href, n);
    }
  })();
  class se {
    constructor(t) {
      this.gameContext = t, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new G(), this.camera = new H(40, window.innerWidth / window.innerHeight, 0.1, 40), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10, this.renderer = new O({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = R, this.renderer.shadowMap.enabled = true, this.renderer.toneMapping = q, this.renderer.toneMappingExposure = 0.5, this.renderer.shadowMap.type = N, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new _(this.camera, this.renderer.domElement), this.controls.enableDamping = true, this.gameContext.controls = this.controls, this.stats = new X(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
      const e = new Q(this.renderer);
      e.compileEquirectangularShader(), new Y().setPath("./hdr/").load("studio_small_08_1k.hdr", (s) => {
        e.fromEquirectangular(s).texture, s.dispose(), e.dispose();
      });
    }
    onWindowResize() {
      const s = window.innerWidth, i = window.innerHeight, n = Math.min(s, 1920), a = Math.min(i, 1080);
      this.renderer.setSize(n, a, false);
      const c = this.renderer.domElement;
      c.style.position = "fixed", c.style.left = "50%", c.style.top = "50%", c.style.transform = "translate(-50%, -50%)", c.style.width = n + "px", c.style.height = a + "px", this.camera.aspect = n / a, this.camera.updateProjectionMatrix();
    }
  }
  class ie {
    constructor(t, e, s) {
      this.gameContext = t, this.walls = e, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new k(), this.pointer = new S(), this.mouseDownPointer = new S(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
    }
    handlePointerDown(t) {
      this.updatePointer(t), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const e = this.raycaster.intersectObjects(this.walls, true);
      if (e.length > 0) for (const s of e) {
        let i = s.object;
        for (; i.parent && !this.walls.includes(i); ) i = i.parent;
        if (this.walls.includes(i) && !this.isWallFacingCamera(i)) continue;
        let n = s.object;
        for (; n.parent && !n.userData.isPanel && n !== this.gameContext.scene; ) n = n.parent;
        if (n.userData.isPanel) return this.pendingPanel = n, this.mouseDownPointer.set(t.clientX, t.clientY), this.gameContext.controls && (this.gameContext.controls.enabled = false), true;
      }
      return false;
    }
    isWallFacingCamera(t) {
      const e = this.gameContext.camera, s = new u();
      t.getWorldPosition(s);
      const i = new u().subVectors(e.position, s), n = new u(0, 0, 1).applyQuaternion(t.quaternion);
      return i.dot(n) > 0;
    }
    startDrag(t, e) {
      this.gameContext.controls && (this.gameContext.controls.enabled = false), this.isDragging = true, this.draggedPanelIndex = t;
      const i = this.gameContext.assetManager.panels[t];
      i && (this.ghostMesh = i.clone(), this.applyMaterialProperties(this.ghostMesh, {
        transparent: true,
        opacity: 0.5,
        clippingPlanes: []
      }), this.savedColor !== null ? this.applyColor(this.ghostMesh, this.savedColor) : this.gameContext.sceneClass.globalPanelColor !== null && this.applyColor(this.ghostMesh, this.gameContext.sceneClass.globalPanelColor), this.ghostMesh.traverse((n) => {
        n.raycast = () => {
        };
      }), this.gameContext.scene.add(this.ghostMesh), this.ghostMesh.visible = true, e && (this.updatePointer(e), this.onPointerMove(e)));
    }
    onPointerMove(t) {
      if (this.pendingPanel && !this.isDragging && Math.sqrt(Math.pow(t.clientX - this.mouseDownPointer.x, 2) + Math.pow(t.clientY - this.mouseDownPointer.y, 2)) > 15 && this.pickupPendingPanel(t), !this.isDragging || !this.ghostMesh) return;
      this.updatePointer(t), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const e = this.raycaster.intersectObjects(this.walls, false);
      if (e.length > 0) {
        const s = e[0], i = s.object;
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
    pickupPendingPanel(t) {
      const e = this.pendingPanel, s = e.userData.panelIndex;
      this.savedColor = null, e.traverse((i) => {
        if (this.savedColor === null && i.isMesh && i.material) {
          const n = Array.isArray(i.material) ? i.material[0] : i.material;
          this.savedColor = n.color.getHex();
        }
      }), this.gameContext.sceneClass.deselectPanel(), e.parent.remove(e), this.disposeModel(e), this.startDrag(s, t), this.pendingPanel = null;
    }
    snapToGrid(t, e) {
      const s = e.geometry.parameters.width, i = e.geometry.parameters.height, n = e.worldToLocal(t.point.clone()), a = e.material.map, c = n.x / s + 0.5, l = n.y / i + 0.5;
      let d = c * a.repeat.x + a.offset.x, p = l * a.repeat.y + a.offset.y;
      const g = Math.floor(d), h = Math.floor(p);
      if (e.children.some((f) => f.userData.isPanel && f.userData.gridX === g && f.userData.gridY === h)) this.ghostMesh.visible = false, this.canPlace = false;
      else {
        this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = g, this.ghostMesh.userData.gridY = h;
        const f = g + 0.5, T = h + 0.5, B = (f - a.offset.x) / a.repeat.x, I = (T - a.offset.y) / a.repeat.y;
        n.x = (B - 0.5) * s, n.y = (I - 0.5) * i, n.z = 0;
        const z = e.localToWorld(n);
        this.ghostMesh.position.copy(z), this.ghostMesh.quaternion.copy(e.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
      }
    }
    moveInAir() {
      this.currentWall = null, this.canPlace = true, this.ghostMesh.visible = true, this.applyMaterialProperties(this.ghostMesh, {
        clippingPlanes: []
      }), this.raycaster.ray.at(10, this.ghostMesh.position), this.ghostMesh.quaternion.copy(this.gameContext.camera.quaternion);
    }
    onPointerUp(t) {
      if (this.gameContext.controls && (this.gameContext.controls.enabled = true), this.pendingPanel) {
        this.gameContext.sceneClass.onPanelSelected(this.pendingPanel), this.pendingPanel = null, this.savedColor = null;
        return;
      }
      this.isDragging && (this.ghostMesh && this.ghostMesh.visible && this.currentWall && this.canPlace && this.placePanel(), this.cleanupGhost());
    }
    placePanel() {
      const e = this.gameContext.assetManager.panels[this.draggedPanelIndex];
      if (!e) return;
      const s = e.clone();
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
    applyColor(t, e) {
      t.traverse((s) => {
        s.isMesh && s.material && (Array.isArray(s.material) ? s.material : [
          s.material
        ]).forEach((n) => {
          n.color && (typeof e == "string" ? n.color.set(e) : n.color.setHex(e), n.needsUpdate = true);
        });
      });
    }
    applyMaterialProperties(t, { transparent: e, opacity: s, clippingPlanes: i, cloneMaterial: n }) {
      t.traverse((a) => {
        a.isMesh && (n && (Array.isArray(a.material) ? a.material = a.material.map((l) => l.clone()) : a.material = a.material.clone()), (Array.isArray(a.material) ? a.material : [
          a.material
        ]).forEach((l) => {
          e !== void 0 && (l.transparent = e), s !== void 0 && (l.opacity = s), i !== void 0 && (l.clippingPlanes = i), l.needsUpdate = true;
        }));
      });
    }
    cleanupGhost() {
      this.isDragging = false, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null, this.ghostMesh && (this.gameContext.scene.remove(this.ghostMesh), this.disposeModel(this.ghostMesh), this.ghostMesh = null);
    }
    disposeModel(t) {
      t.traverse((e) => {
        e.isMesh && (e.geometry && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach((s) => s.dispose()) : e.material.dispose()));
      });
    }
    updatePointer(t) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (t.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((t.clientY - s.top) / s.height * 2 - 1);
    }
    getWallClippingPlanes(t) {
      const e = t.geometry.parameters.width, s = t.geometry.parameters.height, i = new u(1, 0, 0).applyQuaternion(t.quaternion), n = new u(0, 1, 0).applyQuaternion(t.quaternion), a = t.position;
      return [
        new x().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(e / 2))),
        new x().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-e / 2))),
        new x().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new x().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const P = new u(), A = new u();
  class ne {
    constructor(t) {
      this.gameContext = t, this.onWallChanged = null, this.selectedPanel = null, this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.sideLight = null, this.sideBulbMesh = null, this.animatingPanels = [], this.globalPanelColor = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.ambientLight = new U(16777215, 0.05), this.raycaster = new k(), this.pointer = new S(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.isNetVisible = true, this.createWalls(), this.dragHandler = new ie(t, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createCenterLight(), this.addLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: t } = this.config, e = new M(1, 0.05, 1), s = new y({
        color: 1118481,
        emissive: 16777198,
        emissiveIntensity: 2,
        roughness: 0.7
      });
      this.lightBulbMesh = new w(e, s);
      const i = t / 2 - 0.03;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new D(16770754, 60, 0, 2), this.centerLight.position.set(0, i, 1), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.centerLight);
      const n = new M(0.1, 0.4, 0.1), a = new y({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      });
      this.sideBulbMesh = new w(n, a), this.sideBulbMesh.position.set(1.5, 0.5, -1), this.gameContext.scene.add(this.sideBulbMesh), this.sideLight = new D(16755302, 20, 0, 2), this.sideLight.position.set(1.5, 0.5, -1), this.sideLight.castShadow = true, this.sideLight.shadow.mapSize.width = 1024, this.sideLight.shadow.mapSize.height = 1024, this.sideLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.sideLight);
    }
    createFloorAndCeiling() {
      const { widthWallFront: t, widthWallSide: e, heightWall: s } = this.config, i = new v(t, e), n = new y({
        color: 15790320,
        roughness: 0.8,
        metalness: 0.1,
        side: b
      });
      this.floor = new w(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const a = new y({
        color: 15790320,
        roughness: 0.9,
        side: b
      });
      this.ceiling = new w(i, a), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(t, e) {
      t === "floor" && this.floor ? this.floor.material.color.setHex(e) : t === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(e);
    }
    updateAnimations(t) {
      for (let i = this.animatingPanels.length - 1; i >= 0; i--) {
        const n = this.animatingPanels[i], a = !!n.userData.targetQuaternion, c = !!n.userData.targetPosition;
        a && (n.quaternion.slerp(n.userData.targetQuaternion, t * 10), n.quaternion.angleTo(n.userData.targetQuaternion) < 0.01 && (n.quaternion.copy(n.userData.targetQuaternion), delete n.userData.targetQuaternion)), c && (n.position.lerp(n.userData.targetPosition, t * 10), n.position.distanceTo(n.userData.targetPosition) < 1e-3 && (n.position.copy(n.userData.targetPosition), delete n.userData.targetPosition)), !n.userData.targetQuaternion && !n.userData.targetPosition && this.animatingPanels.splice(i, 1);
      }
    }
    createWalls() {
      const { widthWallFront: t, heightWall: e, widthWallSide: s } = this.config;
      this.wall = this.createWallPlane(t, e), this.wall.position.z = -s / 2, this.wall2 = this.createWallPlane(t, e), this.wall2.position.z = s / 2, this.wall2.rotation.y = Math.PI, this.wall3 = this.createWallPlane(s, e), this.wall3.rotation.y = -Math.PI / 2, this.wall3.position.x = t / 2, this.wall4 = this.createWallPlane(s, e), this.wall4.rotation.y = Math.PI / 2, this.wall4.position.x = -t / 2, this.walls = [
        this.wall,
        this.wall2,
        this.wall3,
        this.wall4
      ], this.activeWallIndex = 0;
    }
    createWallPlane(t, e) {
      const s = new v(t, e), i = t / this.config.cellSize, n = e / this.config.cellSize, a = this.baseGridTexture.clone();
      a.repeat.set(i, n), a.wrapS = C, a.wrapT = C, a.needsUpdate = true;
      const c = this.baseBlankTexture.clone();
      c.repeat.set(i, n), c.wrapS = C, c.wrapT = C, c.needsUpdate = true;
      const l = new y({
        color: 13421772,
        map: a,
        roughness: 0.9,
        metalness: 0,
        transparent: false,
        opacity: 1,
        side: b
      });
      l.envMapIntensity = 0.2;
      const d = new w(s, l);
      return d.userData.gridTexture = a, d.userData.blankTexture = c, d.receiveShadow = true, d.onBeforeRender = function(p, g, h) {
        d.getWorldPosition(P), P.subVectors(h.position, P), A.set(0, 0, 1).transformDirection(d.matrixWorld);
        const m = P.dot(A) > 0;
        d.children.forEach((f) => f.visible = m);
      }, d;
    }
    loadWall() {
      this.walls.forEach((t) => this.gameContext.scene.add(t));
    }
    addLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    initEvents() {
      window.addEventListener("pointerdown", (t) => this.onPointerDown(t)), window.addEventListener("pointermove", (t) => this.dragHandler.onPointerMove(t)), window.addEventListener("pointerup", (t) => this.dragHandler.onPointerUp(t));
    }
    startDrag(t, e) {
      this.deselectPanel(), this.dragHandler.startDrag(t, e);
    }
    onPointerDown(t) {
      if (t.target.closest(".selection-ui") || t.target.tagName === "BUTTON" || t.target.tagName === "INPUT") return;
      this.dragHandler.handlePointerDown(t) || (this.handleWallSelection(t), this.deselectPanel());
    }
    randomRotate() {
      const t = [];
      if (this.walls.forEach((e) => {
        e.children.forEach((s) => {
          s.userData && s.userData.isPanel && t.push(s);
        });
      }), t.length !== 0) {
        for (let e = t.length - 1; e > 0; e--) {
          const s = Math.floor(Math.random() * (e + 1)), i = t[e];
          t[e] = t[s], t[s] = i;
        }
        t.forEach((e) => {
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new W();
          n.setFromAxisAngle(new u(0, 1, 0), i), e.userData.targetQuaternion = e.quaternion.clone(), e.userData.targetQuaternion.multiply(n), this.animatingPanels.includes(e) || this.animatingPanels.push(e);
        });
      }
    }
    shufflePanelsOnWalls() {
      this.deselectPanel(), this.walls.forEach((t) => {
        const e = t.children.filter((l) => l.userData && l.userData.isPanel);
        if (e.length < 2) return;
        const s = e.map((l) => ({
          gridX: l.userData.gridX,
          gridY: l.userData.gridY
        }));
        for (let l = s.length - 1; l > 0; l--) {
          const d = Math.floor(Math.random() * (l + 1)), p = s[l];
          s[l] = s[d], s[d] = p;
        }
        const i = t.geometry.parameters.width, n = t.geometry.parameters.height, a = t.material.map;
        function c(l, d) {
          const p = l + 0.5, g = d + 0.5, h = (p - a.offset.x) / a.repeat.x, m = (g - a.offset.y) / a.repeat.y;
          return new u((h - 0.5) * i, (m - 0.5) * n, 0);
        }
        e.forEach((l, d) => {
          const p = s[d];
          l.userData.gridX = p.gridX, l.userData.gridY = p.gridY;
          const g = c(p.gridX, p.gridY);
          l.userData.targetPosition = g, this.animatingPanels.includes(l) || this.animatingPanels.push(l);
        });
      });
    }
    onPanelSelected(t) {
      if (this.selectedPanel === t) return;
      this.deselectPanel(), this.selectedPanel = t, this.addSelectionOutline(t);
      let e = "#ffffff";
      t.traverse((i) => {
        i.isMesh && i.material && (e = "#" + (Array.isArray(i.material) ? i.material[0] : i.material).color.getHexString());
      });
      const s = document.querySelector(".selection-ui");
      if (s) {
        s.style.display = "flex";
        const i = document.getElementById("panel-color-picker");
        i && (i.value = e);
      }
    }
    addSelectionOutline(t) {
      const e = new V(), s = new u();
      t.updateMatrixWorld(true);
      const i = t.matrixWorld.clone().invert();
      let n = false;
      t.traverse((h) => {
        if (h.isMesh && h.geometry) {
          const m = h.geometry.attributes.position;
          if (m) {
            for (let f = 0; f < m.count; f++) s.fromBufferAttribute(m, f), s.applyMatrix4(h.matrixWorld), s.applyMatrix4(i), e.expandByPoint(s);
            n = true;
          }
        }
      }), n || e.set(new u(-0.25, -0.25, 0), new u(0.25, 0.25, 0.05));
      const a = new u(), c = new u();
      e.getSize(a), e.getCenter(c), a.multiplyScalar(1.02);
      const l = new M(a.x, a.y, a.z), d = new K(l), p = new j({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), g = new Z(d, p);
      g.position.copy(c), g.name = "selection_outline", g.raycast = () => {
      }, t.add(g);
    }
    removeSelectionOutline() {
      if (!this.selectedPanel) return;
      const t = this.selectedPanel.getObjectByName("selection_outline");
      t && (this.selectedPanel.remove(t), t.geometry && t.geometry.dispose(), t.material && t.material.dispose());
    }
    deselectPanel() {
      if (!this.selectedPanel) return;
      this.removeSelectionOutline(), this.selectedPanel = null;
      const t = document.querySelector(".selection-ui");
      t && (t.style.display = "none");
    }
    changeSelectedPanelColor(t) {
      this.selectedPanel && this.selectedPanel.traverse((e) => {
        e.isMesh && e.material && e.name !== "selection_outline" && (Array.isArray(e.material) ? e.material.forEach((s) => s.color.set(t)) : e.material.color.set(t));
      });
    }
    rotateSelectedPanel(t) {
      if (!this.selectedPanel) return;
      const e = this.selectedPanel;
      e.userData.targetQuaternion || (e.userData.targetQuaternion = e.quaternion.clone());
      const s = new W();
      s.setFromAxisAngle(new u(0, 1, 0), t), e.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(e) || this.animatingPanels.push(e);
    }
    handleWallSelection(t) {
    }
    setActiveWall(t) {
    }
    highlightActiveWall() {
    }
    createGridTexture() {
      const t = document.createElement("canvas");
      t.width = 128, t.height = 128;
      const e = t.getContext("2d");
      e.fillStyle = "#cccccc", e.fillRect(0, 0, 128, 128), e.strokeStyle = "#444444", e.lineWidth = 2, e.strokeRect(0, 0, 128, 128);
      const s = new L(t);
      return s.magFilter = E, s.minFilter = F, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    createBlankTexture() {
      const t = document.createElement("canvas");
      t.width = 128, t.height = 128;
      const e = t.getContext("2d");
      e.fillStyle = "#ffffff", e.fillRect(0, 0, 128, 128);
      const s = new L(t);
      return s.magFilter = E, s.minFilter = F, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    toggleNet() {
      this.isNetVisible = !this.isNetVisible, this.walls.forEach((t) => {
        if (!t.material) return;
        const e = this.isNetVisible ? t.userData.gridTexture : t.userData.blankTexture;
        t.material.map = e, t.material.needsUpdate = true;
      });
    }
    setAllWallsColor(t) {
      this.walls.forEach((e) => {
        e.material && e.material.color && e.material.color.set(t);
      });
    }
    setAllPanelsColor(t) {
      this.globalPanelColor = t, this.walls.forEach((e) => {
        e.traverse((s) => {
          s.userData && s.userData.isPanel && s.traverse((i) => {
            i.isMesh && i.material && (Array.isArray(i.material) ? i.material.forEach((n) => n.color.set(t)) : i.material.color.set(t));
          });
        });
      });
    }
  }
  class ae {
    constructor(t) {
      this.gameContext = t, this.sceneClass = t.sceneClass, this.controllers = [], this.folder = null, this.init();
    }
    init() {
      this.gameContext.gui && (this.folder = this.gameContext.gui.addFolder("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0421\u0442\u0435\u043D\u044B")), this.sceneClass.onWallChanged = () => this.refresh(), this.refresh(), this.gameContext.gui && (this.lightFolder = this.gameContext.gui.addFolder("\u0421\u0432\u0435\u0442"), this.ambientFolder = this.gameContext.gui.addFolder("\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430")), this.refreshLight(), this.refreshAmbient();
    }
    refreshLight() {
      if (!this.lightFolder) return;
      this.lightControllers || (this.lightControllers = []), this.lightControllers.forEach((h) => h.destroy()), this.lightControllers = [];
      const t = this.sceneClass, e = t.centerLight, s = t.lightBulbMesh;
      if (!e || !s) return;
      const i = {
        lightColor: "#" + e.color.getHexString(),
        bulbColor: "#" + s.material.color.getHexString(),
        bulbVisible: s.visible,
        castShadow: e.castShadow,
        shadowMapSize: e.shadow.mapSize.width,
        shadowBias: e.shadow.bias,
        kelvin: 2800
      }, n = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), a = () => s.position.copy(e.position), c = n.add(e.position, "x", -10, 10, 0.01).name("X").listen().onChange(a), l = n.add(e.position, "y", -10, 10, 0.01).name("Y").listen().onChange(a), d = n.add(e.position, "z", -10, 10, 0.01).name("Z").listen().onChange(a);
      this.lightControllers.push(c, l, d), this.lightControllers.push(this.lightFolder.add(e, "intensity", 0, 50, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(e, "distance", 0, 50, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(e, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(i, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((h) => {
        e.color.set(h);
      })), this.lightControllers.push(this.lightFolder.add(i, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((h) => {
        const m = this.kelvinToHex(h);
        e.color.set(m), i.lightColor = "#" + e.color.getHexString();
      }));
      const p = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(p.add(i, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((h) => {
        s.visible = h;
      }), p.addColor(i, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((h) => {
        s.material.color.set(h);
      }));
      const g = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(g.add(i, "castShadow").name("castShadow").onChange((h) => {
        e.castShadow = h;
      }), g.add(i, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((h) => {
        const m = Number(h);
        e.shadow.mapSize.set(m, m), e.shadow.needsUpdate = true;
      }), g.add(i, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((h) => {
        e.shadow.bias = h;
      })), a();
    }
    refreshAmbient() {
      if (!this.ambientFolder) return;
      this.ambientControllers || (this.ambientControllers = []), this.ambientControllers.forEach((s) => s.destroy()), this.ambientControllers = [];
      const t = this.sceneClass.ambientLight;
      if (!t) return;
      const e = {
        ambientColor: "#" + t.color.getHexString()
      };
      this.ambientControllers.push(this.ambientFolder.add(t, "intensity", 0, 5, 0.01).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.ambientFolder.addColor(e, "ambientColor").name("\u0426\u0432\u0435\u0442").onChange((s) => {
        t.color.set(s);
      }));
    }
    kelvinToHex(t) {
      const e = t / 100;
      let s, i, n;
      e <= 66 ? (s = 255, i = 99.4708025861 * Math.log(e) - 161.1195681661, n = e <= 19 ? 0 : 138.5177312231 * Math.log(e - 10) - 305.0447927307) : (s = 329.698727446 * Math.pow(e - 60, -0.1332047592), i = 288.1221695283 * Math.pow(e - 60, -0.0755148492), n = 255);
      const a = (l) => Math.min(255, Math.max(0, l));
      return s = a(s), i = a(i), n = a(n), "#" + new $(s / 255, i / 255, n / 255).getHexString();
    }
    refresh() {
      if (!this.folder) return;
      this.controllers.forEach((n) => n.destroy()), this.controllers = [];
      const t = this.sceneClass.walls[this.sceneClass.activeWallIndex];
      if (!t) return;
      const e = t.material.map, s = this.folder.add(e.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), i = this.folder.add(e.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, i);
    }
  }
  class oe {
    constructor(t) {
      this.gameContext = t;
    }
  }
  class re {
    constructor(t) {
      this.gamecontext = t, this.panels = [], this.urls = [
        "models/panels/panel1.gltf",
        "models/panels/panel2.gltf",
        "models/panels/panel3.gltf",
        "models/panels/panel4.gltf"
      ];
    }
    async loadModels() {
      const t = new J(), e = new v(0.49, 0.49), s = this.urls.map((i, n) => t.loadAsync(i).then((a) => {
        const c = a.scene.children[0];
        c.name = "panelTemplate_" + n;
        const l = [];
        return c.traverse((d) => {
          d.isMesh && l.push(d);
        }), l.forEach((d) => {
          const p = d.material, g = new y({
            color: 16777215,
            normalMap: p.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: b
          });
          d.castShadow = true, d.receiveShadow = true;
          const h = new w(e, g);
          h.position.y = 5e-4, h.rotation.x = -Math.PI / 2;
        }), c;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  class le {
    constructor(t) {
      this.camera = t.camera, this.controls = t.controls, this.keys = {}, this.dollySpeed = 6, this.strafeSpeed = 4, this.offset = new u(), this.forward = new u(), this.right = new u(), window.addEventListener("keydown", (e) => {
        (e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyS" || e.code === "KeyD") && (this.keys[e.code] = true);
      }), window.addEventListener("keyup", (e) => {
        this.keys[e.code] = false;
      });
    }
    update(t) {
      if (!(!this.controls || !this.controls.enabled)) {
        if (this.controls.target, this.keys.KeyW || this.keys.KeyS) {
          const e = this.keys.KeyW ? 1 : -1;
          this.camera.getWorldDirection(this.forward), this.forward.y = 0, this.forward.normalize();
          const s = e * this.dollySpeed * t;
          this.camera.position.addScaledVector(this.forward, s);
        }
        if (this.keys.KeyA || this.keys.KeyD) {
          const e = this.keys.KeyD ? 1 : -1;
          this.camera.getWorldDirection(this.forward), this.forward.y = 0, this.forward.normalize(), this.right.crossVectors(this.forward, this.camera.up).normalize();
          const s = e * this.strafeSpeed * t;
          this.camera.position.addScaledVector(this.right, s);
        }
      }
    }
  }
  console.clear();
  const o = {};
  o.clock = new te();
  he();
  async function he() {
    try {
      await ce(), await de(), fe();
    } catch (r) {
      console.error("Init error", r);
    }
  }
  async function ce() {
    o.gui = new ee(), o.initClass = new se(o), o.scene = o.initClass.scene, o.camera = o.initClass.camera, o.renderer = o.initClass.renderer, o.assetManager = new re(o), o.sceneClass = new ne(o), o.panelsClass = new oe(o), o.keyboardOrbitMove = new le(o), o.renderer.localClippingEnabled = true, o.guiClass = new ae(o);
  }
  async function de() {
    await o.assetManager.loadModels(), ue(), ge(), t();
    const r = o.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const s = document.querySelector(".panel".concat(e));
      s && s.addEventListener("pointerdown", (i) => {
        i.preventDefault(), r.startDrag(e - 1, i);
      });
    }
    o.sceneClass.createScene(), o.guiClass && (o.guiClass.refresh(), o.guiClass.refreshLight());
    function t() {
      document.getElementById("random_rotate").onclick = () => {
        o.sceneClass.randomRotate();
      }, document.getElementById("random_shuffle").onclick = () => {
        o.sceneClass.shufflePanelsOnWalls();
      }, document.getElementById("toglle_net").onclick = () => {
        o.sceneClass.toggleNet();
      };
    }
  }
  function ge() {
    const r = document.getElementById("toggle-btn"), t = document.querySelector(".bottom_panel");
    let e = true;
    r && t && r.addEventListener("click", () => {
      e = !e, e ? (t.classList.remove("closed"), r.innerHTML = "\u25BC") : (t.classList.add("closed"), r.innerHTML = "\u25B2");
    });
  }
  function ue() {
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
    const e = document.getElementById("wall-color-picker");
    e && e.addEventListener("input", (s) => {
      o.sceneClass.setAllWallsColor(s.target.value);
    });
  }
  function pe(r) {
    if (o.testMesh && (o.testMesh.rotation.y += r * 0.5), o.keyboardOrbitMove && o.keyboardOrbitMove.update(r), o.controls, o.sceneClass && o.sceneClass.updateAnimations(r), o._debugTimer || (o._debugTimer = 0), o._debugTimer += r, o._debugTimer > 1) {
      o._debugTimer = 0;
      const t = o.renderer.info;
      console.log("calls", t.render.calls, "tris", t.render.triangles, "geoms", t.memory.geometries, "tex", t.memory.textures);
    }
  }
  function me() {
    o.renderer && o.scene && o.camera && o.renderer.render(o.scene, o.camera), o.initClass && o.initClass.stats && o.initClass.stats.update();
  }
  function fe() {
    let r = 0;
    const t = 1 / 60, e = 0.1;
    o.renderer.setAnimationLoop(() => {
      let s = o.clock.getDelta();
      s > e && (s = e), r += s;
      let i = 5;
      for (; r >= t && i > 0; ) pe(t), r -= t, i--;
      r > t && (r = 0), me();
    });
  }
})();
export {
  __tla,
  ye as __vite_legacy_guard
};
