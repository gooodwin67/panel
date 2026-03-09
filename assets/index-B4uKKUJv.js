import { S as N, P as O, W as H, a as E, A as G, b as U, O as q, c as X, d as Y, R as Q, e as z, V as S, f as u, g as P, h as j, T as A, i as p, B as x, M as y, j as w, k as D, l as W, F as v, Q as k, m as _, E as V, L as K, n as Z, C as F, o as T, p as I, q as $, G as J, r as ee, s as te } from "./three-DVG2ahmb.js";
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
      this.gameContext = t, this.onWindowResize = this.onWindowResize.bind(this), this.scene = new N(), this.camera = new O(40, window.innerWidth / window.innerHeight, 0.1, 40), this.camera.position.x = 0, this.camera.position.y = 0, this.camera.position.z = 10, this.renderer = new H({
        antialias: true
      }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.outputColorSpace = E, this.renderer.shadowMap.enabled = true, this.renderer.toneMapping = G, this.renderer.toneMappingExposure = 0.5, this.renderer.shadowMap.type = U, this.renderer.physicallyCorrectLights = true, document.body.appendChild(this.renderer.domElement), this.controls = new q(this.camera, this.renderer.domElement), this.controls.rotateSpeed = 0.5, this.gameContext.controls = this.controls, this.stats = new X(), document.body.appendChild(this.stats.dom), this.stats.dom.style.top = "0px", this.stats.dom.style.left = "0%", window.addEventListener("resize", this.onWindowResize), this.onWindowResize();
      const e = new Y(this.renderer);
      e.compileEquirectangularShader(), new Q().setPath("./hdr/").load("studio_small_08_1k.hdr", (s) => {
        e.fromEquirectangular(s).texture, s.dispose(), e.dispose();
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
    constructor(t, e, s) {
      this.gameContext = t, this.walls = e, this.cellSize = s.cellSize || 0.5, this.panelDepth = s.panelDepth || 0.05, this.raycaster = new z(), this.pointer = new S(), this.mouseDownPointer = new S(), this.isDragging = false, this.ghostMesh = null, this.draggedPanelIndex = null, this.currentWall = null, this.canPlace = false, this.pendingPanel = null, this.savedColor = null;
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
      const s = e.geometry.parameters.width, i = e.geometry.parameters.height, n = e.userData.gridTexture, a = e.worldToLocal(t.point.clone());
      let o = a.x / s + 0.5, l = a.y / i + 0.5;
      o = o * n.repeat.x + n.offset.x, l = l * n.repeat.y + n.offset.y;
      const c = Math.floor(o), g = Math.floor(l);
      if (e.children.some((C) => C.userData.isPanel && C.userData.gridX === c && C.userData.gridY === g)) {
        this.ghostMesh.visible = false, this.canPlace = false;
        return;
      }
      this.ghostMesh.visible = true, this.canPlace = true, this.ghostMesh.userData.gridX = c, this.ghostMesh.userData.gridY = g;
      const h = (c + 0.5 - n.offset.x) / n.repeat.x, f = (g + 0.5 - n.offset.y) / n.repeat.y, b = (h - 0.5) * s, L = (f - 0.5) * i;
      a.x = b, a.y = L, a.z = 0;
      const B = e.localToWorld(a);
      this.ghostMesh.position.copy(B), this.ghostMesh.quaternion.copy(e.quaternion), this.ghostMesh.rotateX(Math.PI / 2);
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
        new P().setFromNormalAndCoplanarPoint(i.clone().negate(), a.clone().add(i.clone().multiplyScalar(e / 2))),
        new P().setFromNormalAndCoplanarPoint(i.clone(), a.clone().add(i.clone().multiplyScalar(-e / 2))),
        new P().setFromNormalAndCoplanarPoint(n.clone().negate(), a.clone().add(n.clone().multiplyScalar(s / 2))),
        new P().setFromNormalAndCoplanarPoint(n.clone(), a.clone().add(n.clone().multiplyScalar(-s / 2)))
      ];
    }
  }
  const M = new u(), R = new u();
  class ne {
    constructor(t) {
      this.gameContext = t, this.onWallChanged = null, this.selectedPanel = null, this.floor = null, this.ceiling = null, this.centerLight = null, this.lightBulbMesh = null, this.sideLight = null, this.sideBulbMesh = null, this.animatingPanels = [], this.globalPanelColor = null, this.config = {
        cellSize: 0.5,
        panelDepth: 0.05,
        widthWallFront: 5,
        heightWall: 2.7,
        widthWallSide: 4
      }, this.ambientLight = new j(16777215, 0.05), this.lightBulbs = [], this.selectedLightBulb = null, this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.lightDragPlane = new P(), this.lightDragIntersectionPoint = new u(), this.lightDragOffset = new u(), this.raycaster = new z(), this.pointer = new S(), this.baseGridTexture = this.createGridTexture(), this.baseBlankTexture = this.createBlankTexture(), this.isNetVisible = true, this.textureLoader = new A(), this.wallTexture = this.textureLoader.load("textures/wall.jpg"), this.wallTexture.wrapS = p, this.wallTexture.wrapT = p, this.wallTexture.colorSpace = E, this.wallTexture.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), this.wallNormal = this.textureLoader.load("textures/wall-normal.jpg"), this.wallRoughness = this.textureLoader.load("textures/wall-roughness.jpg"), this.wallNormal.wrapS = p, this.wallNormal.wrapT = p, this.wallRoughness.wrapS = p, this.wallRoughness.wrapT = p, this.createWalls(), this.dragHandler = new ie(t, this.walls, this.config);
    }
    createScene() {
      this.loadWall(), this.createFloorAndCeiling(), this.createRug(), this.createCenterLight(), this.addLight(), this.initEvents();
    }
    createCenterLight() {
      const { heightWall: t } = this.config, e = new x(1, 0.05, 1), s = new y({
        color: 1118481,
        emissive: 16777198,
        emissiveIntensity: 2,
        roughness: 0.7
      });
      this.lightBulbMesh = new w(e, s);
      const i = t / 2 - 0.03;
      this.lightBulbMesh.position.set(0, i, 0), this.gameContext.scene.add(this.lightBulbMesh), this.centerLight = new D(16770754, 60, 0, 2), this.centerLight.position.set(0, i, 1), this.centerLight.castShadow = true, this.centerLight.shadow.mapSize.width = 1024, this.centerLight.shadow.mapSize.height = 1024, this.centerLight.shadow.bias = -1e-4, this.gameContext.scene.add(this.centerLight);
      const n = new x(0.1, 0.1, 0.1), a = new y({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      });
      this.sideBulbMesh = new w(n, a), this.sideBulbMesh.position.set(1.5, 0.5, -1), this.sideLight = new D(16755302, 20, 0, 2), this.sideLight.position.set(1.5, 0.5, -1), this.sideLight.castShadow = true, this.sideLight.shadow.mapSize.width = 1024, this.sideLight.shadow.mapSize.height = 1024, this.sideLight.shadow.bias = -1e-4;
    }
    createFloorAndCeiling() {
      const { widthWallFront: t, widthWallSide: e, heightWall: s } = this.config, i = new W(t, e), n = new y({
        color: 15790320,
        roughness: 0.9,
        metalness: 0,
        side: v
      });
      this.floor = new w(i, n), this.floor.rotation.x = -Math.PI / 2, this.floor.position.y = -s / 2, this.floor.receiveShadow = true, this.gameContext.scene.add(this.floor);
      const a = new y({
        color: 15790320,
        roughness: 0.9,
        side: v
      });
      this.ceiling = new w(i, a), this.ceiling.rotation.x = Math.PI / 2, this.ceiling.position.y = s / 2, this.ceiling.receiveShadow = true, this.gameContext.scene.add(this.ceiling);
    }
    setRoomColor(t, e) {
      t === "floor" && this.floor ? this.floor.material.color.setHex(e) : t === "ceiling" && this.ceiling && this.ceiling.material.color.setHex(e);
    }
    updateAnimations(t) {
      for (let i = this.animatingPanels.length - 1; i >= 0; i--) {
        const n = this.animatingPanels[i], a = !!n.userData.targetQuaternion, o = !!n.userData.targetPosition;
        a && (n.quaternion.slerp(n.userData.targetQuaternion, t * 10), n.quaternion.angleTo(n.userData.targetQuaternion) < 0.01 && (n.quaternion.copy(n.userData.targetQuaternion), delete n.userData.targetQuaternion)), o && (n.position.lerp(n.userData.targetPosition, t * 10), n.position.distanceTo(n.userData.targetPosition) < 1e-3 && (n.position.copy(n.userData.targetPosition), delete n.userData.targetPosition)), !n.userData.targetQuaternion && !n.userData.targetPosition && this.animatingPanels.splice(i, 1);
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
      const s = new W(t, e), i = t / this.config.cellSize, n = e / this.config.cellSize, a = this.wallTexture.clone();
      a.repeat.set(t / 2, e / 2), a.wrapS = p, a.wrapT = p, a.needsUpdate = true;
      const o = this.wallNormal.clone(), l = this.wallRoughness.clone();
      o.repeat.set(i, n), l.repeat.set(i, n);
      const c = this.baseGridTexture.clone();
      c.repeat.set(i, n), c.wrapS = p, c.wrapT = p, c.needsUpdate = true;
      const g = this.baseBlankTexture.clone();
      g.repeat.set(i, n), g.wrapS = p, g.wrapT = p, g.needsUpdate = true;
      const m = new y({
        map: a,
        normalMap: o,
        roughnessMap: l,
        normalScale: new S(0.3, 0.3),
        alphaMap: c,
        transparent: true,
        color: 16777215,
        roughness: 1,
        metalness: 0,
        side: v
      });
      m.envMapIntensity = 0.8;
      const h = new w(s, m);
      return h.userData.gridTexture = c, h.userData.blankTexture = g, h.receiveShadow = true, h.onBeforeRender = function(f, b, L) {
        h.getWorldPosition(M), M.subVectors(L.position, M), R.set(0, 0, 1).transformDirection(h.matrixWorld);
        const B = M.dot(R) > 0;
        h.children.forEach((C) => C.visible = B);
      }, h;
    }
    loadWall() {
      this.walls.forEach((t) => this.gameContext.scene.add(t));
    }
    addLight() {
      this.gameContext.scene.add(this.ambientLight);
    }
    initEvents() {
      window.addEventListener("pointerdown", (t) => this.onPointerDown(t)), window.addEventListener("pointermove", (t) => {
        if (this.isDraggingLightBulb) {
          this.onPointerMoveLightBulb(t);
          return;
        }
        this.dragHandler.onPointerMove(t);
      }), window.addEventListener("pointerup", (t) => {
        if (this.isDraggingLightBulb) {
          this.stopDragLightBulb();
          return;
        }
        this.dragHandler.onPointerUp(t);
      });
    }
    startDrag(t, e) {
      this.deselectPanel(), this.dragHandler.startDrag(t, e);
    }
    onPointerDown(t) {
      if (t.target.closest(".floating-ui") || t.target.tagName === "BUTTON" || t.target.tagName === "INPUT") return;
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (t.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((t.clientY - s.top) / s.height * 2 - 1), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.lightBulbs.map((o) => o.mesh), n = this.raycaster.intersectObjects(i, false);
      if (n.length > 0) {
        const o = n[0].object;
        this.selectLightBulb(o), this.startDragLightBulb(o, t);
        return;
      }
      if (this.rug && this.raycaster.intersectObject(this.rug, false).length > 0) {
        this.selectRug();
        return;
      }
      this.dragHandler.handlePointerDown(t) || (this.handleWallSelection(t), this.deselectPanel(), this.deselectLightBulb(), this.deselectRug());
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
          const i = Math.ceil(Math.random() * 3) * (Math.PI / 2), n = new k();
          n.setFromAxisAngle(new u(0, 1, 0), i);
          const a = e.userData.targetQuaternion ? e.userData.targetQuaternion.clone() : e.quaternion.clone();
          e.userData.targetQuaternion = a.multiply(n), this.animatingPanels.includes(e) || this.animatingPanels.push(e);
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
          const c = Math.floor(Math.random() * (l + 1)), g = s[l];
          s[l] = s[c], s[c] = g;
        }
        const i = t.geometry.parameters.width, n = t.geometry.parameters.height, a = t.material.alphaMap;
        function o(l, c) {
          const g = l + 0.5, m = c + 0.5, h = (g - a.offset.x) / a.repeat.x, f = (m - a.offset.y) / a.repeat.y;
          return new u((h - 0.5) * i, (f - 0.5) * n, 5e-3);
        }
        e.forEach((l, c) => {
          const g = s[c];
          l.userData.gridX = g.gridX, l.userData.gridY = g.gridY;
          const m = o(g.gridX, g.gridY);
          l.userData.targetPosition = m, this.animatingPanels.includes(l) || this.animatingPanels.push(l);
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
      const e = new _(), s = new u();
      t.updateMatrixWorld(true);
      const i = t.matrixWorld.clone().invert();
      let n = false;
      t.traverse((h) => {
        if (h.isMesh && h.geometry) {
          const f = h.geometry.attributes.position;
          if (f) {
            for (let b = 0; b < f.count; b++) s.fromBufferAttribute(f, b), s.applyMatrix4(h.matrixWorld), s.applyMatrix4(i), e.expandByPoint(s);
            n = true;
          }
        }
      }), n || e.set(new u(-0.25, -0.25, 0), new u(0.25, 0.25, 0.05));
      const a = new u(), o = new u();
      e.getSize(a), e.getCenter(o), a.multiplyScalar(1.02);
      const l = new x(a.x, a.y, a.z), c = new V(l), g = new K({
        color: 65535,
        depthTest: false,
        depthWrite: false
      }), m = new Z(c, g);
      m.position.copy(o), m.name = "selection_outline", m.raycast = () => {
      }, t.add(m);
    }
    removeSelectionOutline() {
      if (!this.selectedPanel) return;
      const t = this.selectedPanel.getObjectByName("selection_outline");
      t && (this.selectedPanel.remove(t), t.geometry && t.geometry.dispose(), t.material && t.material.dispose());
    }
    deselectPanel() {
      if (this.deselectLightBulb(), this.deselectRug(), !this.selectedPanel) return;
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
      const s = new k();
      s.setFromAxisAngle(new u(0, 1, 0), t), e.userData.targetQuaternion.multiply(s), this.animatingPanels.includes(e) || this.animatingPanels.push(e);
    }
    handleWallSelection(t) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (t.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((t.clientY - s.top) / s.height * 2 - 1), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera);
      const i = this.raycaster.intersectObjects(this.walls, false);
      i.length > 0 && this.setActiveWall(i[0].object);
    }
    setActiveWall(t) {
      const e = this.walls.indexOf(t);
      this.activeWallIndex = e, this.onWallChanged && this.onWallChanged();
    }
    highlightActiveWall() {
      this.walls.forEach((t, e) => {
        const s = e === this.activeWallIndex;
        t.material.color.setHex(s ? 8947848 : 16777215), t.material.opacity = s ? 0.4 : 0.8;
      });
    }
    createGridTexture() {
      const t = document.createElement("canvas");
      t.width = 128, t.height = 128;
      const e = t.getContext("2d");
      e.fillStyle = "#cccccc", e.fillRect(0, 0, 128, 128), e.strokeStyle = "#444444", e.lineWidth = 2, e.strokeRect(0, 0, 128, 128);
      const s = new F(t);
      return s.magFilter = T, s.minFilter = I, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    createBlankTexture() {
      const t = document.createElement("canvas");
      t.width = 128, t.height = 128;
      const e = t.getContext("2d");
      e.fillStyle = "#ffffff", e.fillRect(0, 0, 128, 128);
      const s = new F(t);
      return s.magFilter = T, s.minFilter = I, s.generateMipmaps = true, s.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), s;
    }
    toggleNet() {
      this.isNetVisible = !this.isNetVisible, this.walls.forEach((t) => {
        t.material && (t.material.alphaMap = this.isNetVisible ? t.userData.gridTexture : null, t.material.needsUpdate = true);
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
    addSideLightBulb() {
      const t = new x(0.1, 0.1, 0.1), e = new y({
        color: 0,
        emissive: 16755319,
        emissiveIntensity: 2,
        roughness: 0.8,
        metalness: 0.8
      }), s = new w(t, e), i = (Math.random() - 0.5) * this.config.widthWallFront, n = (Math.random() - 0.5) * this.config.heightWall, a = (Math.random() - 0.5) * this.config.widthWallSide;
      s.position.set(i, n, a);
      const o = new D(16755302, 20, 0, 2);
      o.position.copy(s.position), o.castShadow = false, s.userData.isLightBulb = true, s.userData.light = o, this.gameContext.scene.add(s), this.gameContext.scene.add(o), this.lightBulbs.push({
        mesh: s,
        light: o
      });
    }
    selectLightBulb(t) {
      this.deselectPanel(), this.deselectRug(), this.selectedLightBulb = t;
      const e = document.querySelector(".light-selection-ui");
      e && (e.style.display = "flex"), this.refreshLightBulbUI();
    }
    deselectLightBulb() {
      this.selectedLightBulb = null;
      const t = document.querySelector(".light-selection-ui");
      t && (t.style.display = "none");
    }
    refreshLightBulbUI() {
      const t = this.selectedLightBulb;
      if (!t) return;
      const e = t.userData.light;
      if (!e) return;
      const s = document.getElementById("light-color-picker");
      s && (s.value = "#" + e.color.getHexString());
      const i = document.getElementById("light-intensity");
      i && (i.value = String(e.intensity));
      const n = document.getElementById("light-distance");
      n && (n.value = String(e.distance));
      const a = document.getElementById("light-decay");
      a && (a.value = String(e.decay));
      const o = document.getElementById("bulb-visible");
      o && (o.checked = t.visible);
      const l = document.getElementById("bulb-emissive");
      l && t.material && t.material.emissiveIntensity !== void 0 && (l.value = String(t.material.emissiveIntensity));
    }
    startDragLightBulb(t, e) {
      this.isDraggingLightBulb = true, this.draggedLightBulbMesh = t, this.gameContext.controls && (this.gameContext.controls.enabled = false);
      const s = new u();
      this.gameContext.camera.getWorldDirection(s), this.lightDragPlane.setFromNormalAndCoplanarPoint(s, t.position), this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint) ? this.lightDragOffset.copy(this.lightDragIntersectionPoint).sub(t.position) : this.lightDragOffset.set(0, 0, 0);
    }
    onPointerMoveLightBulb(t) {
      if (!this.isDraggingLightBulb || !this.draggedLightBulbMesh || (this.updatePointer(t), this.raycaster.setFromCamera(this.pointer, this.gameContext.camera), !this.raycaster.ray.intersectPlane(this.lightDragPlane, this.lightDragIntersectionPoint))) return;
      const e = this.lightDragIntersectionPoint.clone().sub(this.lightDragOffset);
      this.draggedLightBulbMesh.position.copy(e);
      const s = this.draggedLightBulbMesh.userData.light;
      s && s.position.copy(e);
    }
    stopDragLightBulb() {
      this.isDraggingLightBulb = false, this.draggedLightBulbMesh = null, this.gameContext.controls && (this.gameContext.controls.enabled = true);
    }
    updatePointer(t) {
      const s = this.gameContext.renderer.domElement.getBoundingClientRect();
      this.pointer.x = (t.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((t.clientY - s.top) / s.height * 2 - 1);
    }
    createRug() {
      const { heightWall: t } = this.config, e = 4, s = 3, i = new x(e, 5e-3, s), n = new A(), a = n.load("textures/carpet.jpg"), o = n.load("textures/carpet_normal.jpg"), l = e, c = s;
      a.wrapS = p, a.wrapT = p, a.repeat.set(l, c), o.wrapS = p, o.wrapT = p, o.repeat.set(l, c), a.anisotropy = this.gameContext.renderer.capabilities.getMaxAnisotropy(), a.colorSpace = E, a.generateMipmaps = true, a.minFilter = I;
      const g = new y({
        map: a,
        bumpMap: o,
        bumpScale: 0.08,
        color: 16777215,
        roughness: 0.98,
        metalness: 0
      });
      this.rug = new w(i, g), this.rug.position.y = -t / 2 + 5e-3, this.rug.receiveShadow = true, this.rug.castShadow = false, this.rug.userData.isRug = true, this.rug.userData.baseWidth = e, this.rug.userData.baseDepth = s, this.gameContext.scene.add(this.rug);
    }
    selectRug() {
      this.deselectPanel(), this.deselectLightBulb(), this.selectedRug = this.rug;
      const t = document.querySelector(".rug-selection-ui");
      t && (t.style.display = "flex");
    }
    deselectRug() {
      this.selectedRug = null;
      const t = document.querySelector(".rug-selection-ui");
      if (t && (t.style.display = "none"), this.rug) {
        const e = document.getElementById("rug-color-picker");
        e && (e.value = "#" + this.rug.material.color.getHexString());
      }
    }
    updateRugTransform(t, e, s, i) {
      if (!this.rug) return;
      const n = this.rug.userData.baseWidth, a = this.rug.userData.baseDepth;
      this.rug.scale.set(t / n, 1, e / a), this.rug.position.x = s, this.rug.position.z = i, this.rug.material.map && this.rug.material.map.repeat.set(t, e), this.rug.material.bumpMap && this.rug.material.bumpMap.repeat.set(t, e);
    }
    changeRugColor(t) {
      this.rug && this.rug.material && this.rug.material.color.set(t);
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
      }, n = this.lightFolder.addFolder("\u041F\u043E\u0437\u0438\u0446\u0438\u044F"), a = () => s.position.copy(e.position), o = n.add(e.position, "x", -10, 10, 0.01).name("X").listen().onChange(a), l = n.add(e.position, "y", -10, 10, 0.01).name("Y").listen().onChange(a), c = n.add(e.position, "z", -10, 10, 0.01).name("Z").listen().onChange(a);
      this.lightControllers.push(o, l, c), this.lightControllers.push(this.lightFolder.add(e, "intensity", 0, 50, 0.1).name("\u042F\u0440\u043A\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(e, "distance", 0, 50, 0.1).name("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C").listen(), this.lightFolder.add(e, "decay", 0, 5, 0.01).name("\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435").listen()), this.lightControllers.push(this.lightFolder.addColor(i, "lightColor").name("\u0426\u0432\u0435\u0442 \u0441\u0432\u0435\u0442\u0430").onChange((h) => {
        e.color.set(h);
      })), this.lightControllers.push(this.lightFolder.add(i, "kelvin", 1e3, 12e3, 50).name("\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 (K)").onChange((h) => {
        const f = this.kelvinToHex(h);
        e.color.set(f), i.lightColor = "#" + e.color.getHexString();
      }));
      const g = this.lightFolder.addFolder("\u041A\u043E\u0440\u043F\u0443\u0441");
      this.lightControllers.push(g.add(i, "bulbVisible").name("\u0412\u0438\u0434\u0435\u043D").onChange((h) => {
        s.visible = h;
      }), g.addColor(i, "bulbColor").name("\u0426\u0432\u0435\u0442").onChange((h) => {
        s.material.color.set(h);
      }));
      const m = this.lightFolder.addFolder("\u0422\u0435\u043D\u0438");
      this.lightControllers.push(m.add(i, "castShadow").name("castShadow").onChange((h) => {
        e.castShadow = h;
      }), m.add(i, "shadowMapSize", [
        256,
        512,
        1024,
        2048
      ]).name("mapSize").onChange((h) => {
        const f = Number(h);
        e.shadow.mapSize.set(f, f), e.shadow.needsUpdate = true;
      }), m.add(i, "shadowBias", -0.01, 0.01, 1e-5).name("bias").onChange((h) => {
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
      const e = t.material.alphaMap, s = this.folder.add(e.offset, "x", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E X").listen(), i = this.folder.add(e.offset, "y", 0, 1, 0.1).name("\u0421\u0434\u0432\u0438\u0433 \u043F\u043E Y").listen();
      this.controllers.push(s, i);
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
      const t = new J(), e = new W(0.49, 0.49), s = this.urls.map((i, n) => t.loadAsync(i).then((a) => {
        const o = a.scene.children[0];
        o.name = "panelTemplate_" + n;
        const l = [];
        return o.traverse((c) => {
          c.isMesh && (c.scale.set(1, 2, 1), l.push(c));
        }), l.forEach((c) => {
          const g = c.material, m = new y({
            color: 16777215,
            normalMap: g.normalMap,
            emissive: 0,
            metalness: 0.4,
            roughness: 0.8,
            side: v
          });
          c.castShadow = true, c.receiveShadow = true;
          const h = new w(e, m);
          h.position.y = 5e-4, h.rotation.x = -Math.PI / 2;
        }), o;
      }));
      this.panels = await Promise.all(s), console.log("Models loaded with Backing Plates:", this.panels);
    }
  }
  class oe {
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
  const r = {};
  r.clock = new te();
  le();
  async function le() {
    try {
      await he(), await ce(), fe();
    } catch (d) {
      console.error("Init error", d);
    }
  }
  async function he() {
    r.gui = new ee(), r.initClass = new se(r), r.scene = r.initClass.scene, r.camera = r.initClass.camera, r.renderer = r.initClass.renderer, r.assetManager = new re(r), r.sceneClass = new ne(r), r.keyboardOrbitMove = new oe(r), r.renderer.localClippingEnabled = true, r.guiClass = new ae(r);
  }
  async function ce() {
    await r.assetManager.loadModels(), de(), ge(), ue(), t();
    const d = r.sceneClass;
    for (let e = 1; e <= 4; e++) {
      const s = document.querySelector(".panel".concat(e));
      s && s.addEventListener("pointerdown", (i) => {
        i.preventDefault(), d.startDrag(e - 1, i);
      });
    }
    r.sceneClass.createScene(), r.guiClass && (r.guiClass.refresh(), r.guiClass.refreshLight());
    function t() {
      document.getElementById("random_rotate").onclick = () => {
        r.sceneClass.randomRotate();
      }, document.getElementById("random_shuffle").onclick = () => {
        r.sceneClass.shufflePanelsOnWalls();
      }, document.getElementById("toglle_net").onclick = () => {
        r.sceneClass.toggleNet();
      };
      const e = document.getElementById("add-light-bulb");
      e && (e.onclick = () => {
        r.sceneClass.addSideLightBulb();
      });
    }
  }
  function de() {
    document.getElementById("btn-rot-left").onclick = () => {
      r.sceneClass.rotateSelectedPanel(Math.PI / 2);
    }, document.getElementById("btn-rot-right").onclick = () => {
      r.sceneClass.rotateSelectedPanel(-Math.PI / 2);
    };
    const d = document.getElementById("panel-color-picker");
    d && d.addEventListener("input", (e) => {
      r.sceneClass.changeSelectedPanelColor(e.target.value);
    }), document.getElementById("btn-close-sel").onclick = () => {
      r.sceneClass.deselectPanel();
    }, document.getElementById("btn-all-color").onclick = () => {
      const e = document.getElementById("panel-color-picker");
      e && r.sceneClass.setAllPanelsColor(e.value);
    };
    const t = document.getElementById("wall-color-picker");
    t && t.addEventListener("input", (e) => {
      r.sceneClass.setAllWallsColor(e.target.value);
    });
  }
  function ge() {
    if (!document.getElementById("light-selection-ui")) return;
    const t = () => {
      const e = r.sceneClass.selectedLightBulb;
      if (!e) return null;
      const s = e.userData.light;
      return s ? {
        bulbMesh: e,
        pointLight: s
      } : null;
    };
    document.getElementById("btn-close-light").onclick = () => {
      r.sceneClass.deselectLightBulb();
    }, document.getElementById("light-color-picker").addEventListener("input", (e) => {
      const s = t();
      s && s.pointLight.color.set(e.target.value);
    }), document.getElementById("light-kelvin").addEventListener("input", (e) => {
      const s = t();
      if (!s) return;
      const i = Number(e.target.value), n = r.guiClass.kelvinToHex(i);
      s.pointLight.color.set(n);
      const a = document.getElementById("light-color-picker");
      a && (a.value = "#" + s.pointLight.color.getHexString());
    }), document.getElementById("light-intensity").addEventListener("input", (e) => {
      const s = t();
      s && (s.pointLight.intensity = Number(e.target.value));
    }), document.getElementById("light-distance").addEventListener("input", (e) => {
      const s = t();
      s && (s.pointLight.distance = Number(e.target.value));
    }), document.getElementById("light-decay").addEventListener("input", (e) => {
      const s = t();
      s && (s.pointLight.decay = Number(e.target.value));
    }), document.getElementById("bulb-visible").addEventListener("change", (e) => {
      const s = t();
      s && (s.bulbMesh.visible = e.target.checked);
    }), document.getElementById("bulb-emissive").addEventListener("input", (e) => {
      const s = t();
      s && s.bulbMesh.material && (s.bulbMesh.material.emissiveIntensity = Number(e.target.value), s.bulbMesh.material.needsUpdate = true);
    }), document.getElementById("btn-delete-light").onclick = () => {
      const e = t();
      if (!e) return;
      r.scene.remove(e.bulbMesh), r.scene.remove(e.pointLight);
      const s = r.sceneClass.lightBulbs.findIndex((i) => i.mesh === e.bulbMesh);
      s !== -1 && r.sceneClass.lightBulbs.splice(s, 1), e.bulbMesh.geometry && e.bulbMesh.geometry.dispose(), e.bulbMesh.material && e.bulbMesh.material.dispose(), r.sceneClass.deselectLightBulb();
    };
  }
  function ue() {
    const d = document.getElementById("btn-close-rug");
    if (!d) return;
    d.onclick = () => {
      r.sceneClass.deselectRug();
    };
    const t = () => {
      const s = Number(document.getElementById("rug-width").value), i = Number(document.getElementById("rug-depth").value), n = Number(document.getElementById("rug-pos-x").value), a = Number(document.getElementById("rug-pos-z").value);
      r.sceneClass.updateRugTransform(s, i, n, a);
    }, e = document.getElementById("rug-color-picker");
    e && e.addEventListener("input", (s) => {
      r.sceneClass.changeRugColor(s.target.value);
    }), document.getElementById("rug-width").addEventListener("input", t), document.getElementById("rug-depth").addEventListener("input", t), document.getElementById("rug-pos-x").addEventListener("input", t), document.getElementById("rug-pos-z").addEventListener("input", t);
  }
  function me(d) {
    r.testMesh && (r.testMesh.rotation.y += d * 0.5), r.keyboardOrbitMove && r.keyboardOrbitMove.update(d), r.controls, r.sceneClass && r.sceneClass.updateAnimations(d);
  }
  function pe() {
    r.renderer && r.scene && r.camera && r.renderer.render(r.scene, r.camera), r.initClass && r.initClass.stats && r.initClass.stats.update();
  }
  function fe() {
    let d = 0;
    const t = 1 / 60, e = 0.1;
    r.renderer.setAnimationLoop(() => {
      let s = r.clock.getDelta();
      s > e && (s = e), d += s;
      let i = 5;
      for (; d >= t && i > 0; ) me(t), d -= t, i--;
      d > t && (d = 0), pe();
    });
  }
})();
export {
  __tla,
  ye as __vite_legacy_guard
};
