/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ei = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Qn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Wo = 0, Qs = 1, Xo = 2, io = 1, Yo = 2, Je = 3, _n = 0, ye = 1, Qe = 2, pn = 0, ni = 1, ta = 2, ea = 3, na = 4, qo = 5, wn = 100, $o = 101, jo = 102, Ko = 103, Zo = 104, Jo = 200, Qo = 201, tl = 202, el = 203, Xr = 204, Yr = 205, nl = 206, il = 207, rl = 208, sl = 209, al = 210, ol = 211, ll = 212, cl = 213, hl = 214, qr = 0, $r = 1, jr = 2, si = 3, Kr = 4, Zr = 5, Jr = 6, Qr = 7, ro = 0, ul = 1, dl = 2, mn = 0, fl = 1, pl = 2, ml = 3, _l = 4, gl = 5, vl = 6, xl = 7, so = 300, ai = 301, oi = 302, ts = 303, es = 304, lr = 306, ns = 1e3, Cn = 1001, is = 1002, He = 1003, Ml = 1004, Ci = 1005, ke = 1006, fr = 1007, Pn = 1008, sn = 1009, ao = 1010, oo = 1011, Mi = 1012, Is = 1013, Ln = 1014, tn = 1015, Ei = 1016, Ns = 1017, Fs = 1018, li = 1020, lo = 35902, co = 1021, ho = 1022, ze = 1023, uo = 1024, fo = 1025, ii = 1026, ci = 1027, po = 1028, Os = 1029, mo = 1030, Bs = 1031, zs = 1033, Ji = 33776, Qi = 33777, tr = 33778, er = 33779, rs = 35840, ss = 35841, as = 35842, os = 35843, ls = 36196, cs = 37492, hs = 37496, us = 37808, ds = 37809, fs = 37810, ps = 37811, ms = 37812, _s = 37813, gs = 37814, vs = 37815, xs = 37816, Ms = 37817, Ss = 37818, Es = 37819, ys = 37820, bs = 37821, nr = 36492, Ts = 36494, As = 36495, _o = 36283, ws = 36284, Rs = 36285, Cs = 36286, Sl = 3200, El = 3201, go = 0, yl = 1, fn = "", De = "srgb", hi = "srgb-linear", sr = "linear", $t = "srgb", Bn = 7680, ia = 519, bl = 512, Tl = 513, Al = 514, vo = 515, wl = 516, Rl = 517, Cl = 518, Pl = 519, ra = 35044, sa = "300 es", en = 2e3, ar = 2001;
class Nn {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return false;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const r = this._listeners[t];
    if (r !== void 0) {
      const s = r.indexOf(e);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++) r[s].call(this, t);
      t.target = null;
    }
  }
}
const pe = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], ir = Math.PI / 180, Ps = 180 / Math.PI;
function yi() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (pe[i & 255] + pe[i >> 8 & 255] + pe[i >> 16 & 255] + pe[i >> 24 & 255] + "-" + pe[t & 255] + pe[t >> 8 & 255] + "-" + pe[t >> 16 & 15 | 64] + pe[t >> 24 & 255] + "-" + pe[e & 63 | 128] + pe[e >> 8 & 255] + "-" + pe[e >> 16 & 255] + pe[e >> 24 & 255] + pe[n & 255] + pe[n >> 8 & 255] + pe[n >> 16 & 255] + pe[n >> 24 & 255]).toLowerCase();
}
function Nt(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Dl(i, t) {
  return (i % t + t) % t;
}
function pr(i, t, e) {
  return (1 - e) * i + e * t;
}
function pi(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Se(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const Ll = { DEG2RAD: ir };
class Pt {
  constructor(t = 0, e = 0) {
    Pt.prototype.isVector2 = true, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6], this.y = r[1] * e + r[4] * n + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Nt(this.x, t.x, e.x), this.y = Nt(this.y, t.y, e.y), this;
  }
  clampScalar(t, e) {
    return this.x = Nt(this.x, t, e), this.y = Nt(this.y, t, e), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Nt(n, t, e));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Nt(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * n - a * r + t.x, this.y = s * r + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Ct {
  constructor(t, e, n, r, s, a, o, l, c) {
    Ct.prototype.isMatrix3 = true, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c);
  }
  set(t, e, n, r, s, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = r, h[2] = o, h[3] = e, h[4] = s, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], f = n[7], d = n[2], m = n[5], v = n[8], M = r[0], p = r[3], u = r[6], T = r[1], b = r[4], y = r[7], U = r[2], w = r[5], P = r[8];
    return s[0] = a * M + o * T + l * U, s[3] = a * p + o * b + l * w, s[6] = a * u + o * y + l * P, s[1] = c * M + h * T + f * U, s[4] = c * p + h * b + f * w, s[7] = c * u + h * y + f * P, s[2] = d * M + m * T + v * U, s[5] = d * p + m * b + v * w, s[8] = d * u + m * y + v * P, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return e * a * h - e * o * c - n * s * h + n * o * l + r * s * c - r * a * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = h * a - o * c, d = o * l - h * s, m = c * s - a * l, v = e * f + n * d + r * m;
    if (v === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / v;
    return t[0] = f * M, t[1] = (r * c - h * n) * M, t[2] = (o * n - r * a) * M, t[3] = d * M, t[4] = (h * e - r * l) * M, t[5] = (r * s - o * e) * M, t[6] = m * M, t[7] = (n * l - c * e) * M, t[8] = (a * e - n * s) * M, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(n * l, n * c, -n * (l * a + c * o) + a + t, -r * c, r * l, -r * (-c * a + l * o) + o + e, 0, 0, 1), this;
  }
  scale(t, e) {
    return this.premultiply(mr.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(mr.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(mr.makeTranslation(t, e)), this;
  }
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this;
  }
  makeScale(t, e) {
    return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 9; r++) if (e[r] !== n[r]) return false;
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const mr = new Ct();
function xo(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return true;
  return false;
}
function or(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Ul() {
  const i = or("canvas");
  return i.style.display = "block", i;
}
const aa = {};
function Jn(i) {
  i in aa || (aa[i] = true, console.warn(i));
}
function Il(i, t, e) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, e);
          break;
        default:
          n();
      }
    }
    setTimeout(s, e);
  });
}
function Nl(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Fl(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const oa = new Ct().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), la = new Ct().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Ol() {
  const i = { enabled: true, workingColorSpace: hi, spaces: {}, convert: function(r, s, a) {
    return this.enabled === false || s === a || !s || !a || (this.spaces[s].transfer === $t && (r.r = rn(r.r), r.g = rn(r.g), r.b = rn(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === $t && (r.r = ri(r.r), r.g = ri(r.g), r.b = ri(r.b))), r;
  }, fromWorkingColorSpace: function(r, s) {
    return this.convert(r, this.workingColorSpace, s);
  }, toWorkingColorSpace: function(r, s) {
    return this.convert(r, s, this.workingColorSpace);
  }, getPrimaries: function(r) {
    return this.spaces[r].primaries;
  }, getTransfer: function(r) {
    return r === fn ? sr : this.spaces[r].transfer;
  }, getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
    return r.fromArray(this.spaces[s].luminanceCoefficients);
  }, define: function(r) {
    Object.assign(this.spaces, r);
  }, _getMatrix: function(r, s, a) {
    return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
  }, _getDrawingBufferColorSpace: function(r) {
    return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
  }, _getUnpackColorSpace: function(r = this.workingColorSpace) {
    return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
  } }, t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], e = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return i.define({ [hi]: { primaries: t, whitePoint: n, transfer: sr, toXYZ: oa, fromXYZ: la, luminanceCoefficients: e, workingColorSpaceConfig: { unpackColorSpace: De }, outputColorSpaceConfig: { drawingBufferColorSpace: De } }, [De]: { primaries: t, whitePoint: n, transfer: $t, toXYZ: oa, fromXYZ: la, luminanceCoefficients: e, outputColorSpaceConfig: { drawingBufferColorSpace: De } } }), i;
}
const Gt = Ol();
function rn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function ri(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let zn;
class Bl {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
    let e;
    if (t instanceof HTMLCanvasElement) e = t;
    else {
      zn === void 0 && (zn = or("canvas")), zn.width = t.width, zn.height = t.height;
      const n = zn.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = zn;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = or("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const r = n.getImageData(0, 0, t.width, t.height), s = r.data;
      for (let a = 0; a < s.length; a++) s[a] = rn(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(rn(e[n] / 255) * 255) : e[n] = rn(e[n]);
      return { data: e, width: t.width, height: t.height };
    } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let zl = 0;
class Mo {
  constructor(t = null) {
    this.isSource = true, Object.defineProperty(this, "id", { value: zl++ }), this.uuid = yi(), this.data = t, this.dataReady = true, this.version = 0;
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const n = { uuid: this.uuid, url: "" }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++) r[a].isDataTexture ? s.push(_r(r[a].image)) : s.push(_r(r[a]));
      } else s = _r(r);
      n.url = s;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function _r(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Bl.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Hl = 0;
class xe extends Nn {
  constructor(t = xe.DEFAULT_IMAGE, e = xe.DEFAULT_MAPPING, n = Cn, r = Cn, s = ke, a = Pn, o = ze, l = sn, c = xe.DEFAULT_ANISOTROPY, h = fn) {
    super(), this.isTexture = true, Object.defineProperty(this, "id", { value: Hl++ }), this.uuid = yi(), this.name = "", this.source = new Mo(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Pt(0, 0), this.repeat = new Pt(1, 1), this.center = new Pt(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new Ct(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = false, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = true, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = { metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(t).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== so) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case ns:
        t.x = t.x - Math.floor(t.x);
        break;
      case Cn:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case is:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case ns:
        t.y = t.y - Math.floor(t.y);
        break;
      case Cn:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case is:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === true && (this.version++, this.source.needsUpdate = true);
  }
  set needsPMREMUpdate(t) {
    t === true && this.pmremVersion++;
  }
}
xe.DEFAULT_IMAGE = null;
xe.DEFAULT_MAPPING = so;
xe.DEFAULT_ANISOTROPY = 1;
class re {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    re.prototype.isVector4 = true, this.x = t, this.y = e, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, r) {
    return this.x = t, this.y = e, this.z = n, this.w = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * e + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * e + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * e + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, r, s;
    const l = t.elements, c = l[0], h = l[4], f = l[8], d = l[1], m = l[5], v = l[9], M = l[2], p = l[6], u = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(f - M) < 0.01 && Math.abs(v - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(f + M) < 0.1 && Math.abs(v + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1) return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const b = (c + 1) / 2, y = (m + 1) / 2, U = (u + 1) / 2, w = (h + d) / 4, P = (f + M) / 4, I = (v + p) / 4;
      return b > y && b > U ? b < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(b), r = w / n, s = P / n) : y > U ? y < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(y), n = w / r, s = I / r) : U < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(U), n = P / s, r = I / s), this.set(n, r, s, e), this;
    }
    let T = Math.sqrt((p - v) * (p - v) + (f - M) * (f - M) + (d - h) * (d - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (p - v) / T, this.y = (f - M) / T, this.z = (d - h) / T, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Nt(this.x, t.x, e.x), this.y = Nt(this.y, t.y, e.y), this.z = Nt(this.z, t.z, e.z), this.w = Nt(this.w, t.w, e.w), this;
  }
  clampScalar(t, e) {
    return this.x = Nt(this.x, t, e), this.y = Nt(this.y, t, e), this.z = Nt(this.z, t, e), this.w = Nt(this.w, t, e), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Nt(n, t, e));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Vl extends Nn {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = 1, this.scissor = new re(0, 0, t, e), this.scissorTest = false, this.viewport = new re(0, 0, t, e);
    const r = { width: t, height: e, depth: 1 };
    n = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: ke, depthBuffer: true, stencilBuffer: false, resolveDepthBuffer: true, resolveStencilBuffer: true, depthTexture: null, samples: 0, count: 1 }, n);
    const s = new xe(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = false, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++) this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = true;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++) this.textures[r].image.width = t, this.textures[r].image.height = e, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, r = t.textures.length; n < r; n++) this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = true;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new Mo(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Un extends Vl {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = true;
  }
}
class So extends xe {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = He, this.minFilter = He, this.wrapR = Cn, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class kl extends xe {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = He, this.minFilter = He, this.wrapR = Cn, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
  }
}
class In {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.isQuaternion = true, this._x = t, this._y = e, this._z = n, this._w = r;
  }
  static slerpFlat(t, e, n, r, s, a, o) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], f = n[r + 3];
    const d = s[a + 0], m = s[a + 1], v = s[a + 2], M = s[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
      return;
    }
    if (o === 1) {
      t[e + 0] = d, t[e + 1] = m, t[e + 2] = v, t[e + 3] = M;
      return;
    }
    if (f !== M || l !== d || c !== m || h !== v) {
      let p = 1 - o;
      const u = l * d + c * m + h * v + f * M, T = u >= 0 ? 1 : -1, b = 1 - u * u;
      if (b > Number.EPSILON) {
        const U = Math.sqrt(b), w = Math.atan2(U, u * T);
        p = Math.sin(p * w) / U, o = Math.sin(o * w) / U;
      }
      const y = o * T;
      if (l = l * p + d * y, c = c * p + m * y, h = h * p + v * y, f = f * p + M * y, p === 1 - o) {
        const U = 1 / Math.sqrt(l * l + c * c + h * h + f * f);
        l *= U, c *= U, h *= U, f *= U;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
  }
  static multiplyQuaternionsFlat(t, e, n, r, s, a) {
    const o = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], f = s[a], d = s[a + 1], m = s[a + 2], v = s[a + 3];
    return t[e] = o * v + h * f + l * m - c * d, t[e + 1] = l * v + h * d + c * f - o * m, t[e + 2] = c * v + h * m + o * d - l * f, t[e + 3] = h * v - o * f - l * d - c * m, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, r) {
    return this._x = t, this._y = e, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = true) {
    const n = t._x, r = t._y, s = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(r / 2), f = o(s / 2), d = l(n / 2), m = l(r / 2), v = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * f + c * m * v, this._y = c * m * f - d * h * v, this._z = c * h * v + d * m * f, this._w = c * h * f - d * m * v;
        break;
      case "YXZ":
        this._x = d * h * f + c * m * v, this._y = c * m * f - d * h * v, this._z = c * h * v - d * m * f, this._w = c * h * f + d * m * v;
        break;
      case "ZXY":
        this._x = d * h * f - c * m * v, this._y = c * m * f + d * h * v, this._z = c * h * v + d * m * f, this._w = c * h * f - d * m * v;
        break;
      case "ZYX":
        this._x = d * h * f - c * m * v, this._y = c * m * f + d * h * v, this._z = c * h * v - d * m * f, this._w = c * h * f + d * m * v;
        break;
      case "YZX":
        this._x = d * h * f + c * m * v, this._y = c * m * f + d * h * v, this._z = c * h * v - d * m * f, this._w = c * h * f - d * m * v;
        break;
      case "XZY":
        this._x = d * h * f - c * m * v, this._y = c * m * f - d * h * v, this._z = c * h * v + d * m * f, this._w = c * h * f + d * m * v;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === true && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, r = Math.sin(n);
    return this._x = t.x * r, this._y = t.y * r, this._z = t.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], r = e[4], s = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], f = e[10], d = n + o + f;
    if (d > 0) {
      const m = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / m, this._x = (h - l) * m, this._y = (s - c) * m, this._z = (a - r) * m;
    } else if (n > o && n > f) {
      const m = 2 * Math.sqrt(1 + n - o - f);
      this._w = (h - l) / m, this._x = 0.25 * m, this._y = (r + a) / m, this._z = (s + c) / m;
    } else if (o > f) {
      const m = 2 * Math.sqrt(1 + o - n - f);
      this._w = (s - c) / m, this._x = (r + a) / m, this._y = 0.25 * m, this._z = (l + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + f - n - o);
      this._w = (a - r) / m, this._x = (s + c) / m, this._y = (l + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Nt(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const r = Math.min(1, e / n);
    return this.slerp(t, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, r = t._y, s = t._z, a = t._w, o = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + a * o + r * c - s * l, this._y = r * h + a * l + s * o - n * c, this._z = s * h + a * c + n * l - r * o, this._w = a * h - n * o - r * l - s * c, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, r = this._y, s = this._z, a = this._w;
    let o = a * t._w + n * t._x + r * t._y + s * t._z;
    if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1) return this._w = a, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const m = 1 - e;
      return this._w = m * a + e * this._w, this._x = m * n + e * this._x, this._y = m * r + e * this._y, this._z = m * s + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), f = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
    return this._w = a * f + this._w * d, this._x = n * f + this._x * d, this._y = r * f + this._y * d, this._z = s * f + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(r * Math.sin(t), r * Math.cos(t), s * Math.sin(e), s * Math.cos(e));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class F {
  constructor(t = 0, e = 0, n = 0) {
    F.prototype.isVector3 = true, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(ca.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(ca.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6] * r, this.y = s[1] * e + s[4] * n + s[7] * r, this.z = s[2] * e + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * e + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * e + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * e + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * e + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * r - o * n), h = 2 * (o * e - s * r), f = 2 * (s * n - a * e);
    return this.x = e + l * c + a * f - o * h, this.y = n + l * h + o * c - s * f, this.z = r + l * f + s * h - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[4] * n + s[8] * r, this.y = s[1] * e + s[5] * n + s[9] * r, this.z = s[2] * e + s[6] * n + s[10] * r, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Nt(this.x, t.x, e.x), this.y = Nt(this.y, t.y, e.y), this.z = Nt(this.z, t.z, e.z), this;
  }
  clampScalar(t, e) {
    return this.x = Nt(this.x, t, e), this.y = Nt(this.y, t, e), this.z = Nt(this.z, t, e), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Nt(n, t, e));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, r = t.y, s = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return gr.copy(this).projectOnVector(t), this.sub(gr);
  }
  reflect(t) {
    return this.sub(gr.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Nt(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    return this.x = r * Math.sin(n), this.y = Math.cos(e) * t, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const gr = new F(), ca = new In();
class bi {
  constructor(t = new F(1 / 0, 1 / 0, 1 / 0), e = new F(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = true, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(Ie.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(Ie.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = Ie.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = false) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = false) {
    t.updateWorldMatrix(false, false);
    const n = t.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (e === true && s !== void 0 && t.isInstancedMesh !== true) for (let a = 0, o = s.count; a < o; a++) t.isMesh === true ? t.getVertexPosition(a, Ie) : Ie.fromBufferAttribute(s, a), Ie.applyMatrix4(t.matrixWorld), this.expandByPoint(Ie);
      else t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Pi.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Pi.copy(n.boundingBox)), Pi.applyMatrix4(t.matrixWorld), this.union(Pi);
    }
    const r = t.children;
    for (let s = 0, a = r.length; s < a; s++) this.expandByObject(r[s], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, Ie), Ie.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return false;
    this.getCenter(mi), Di.subVectors(this.max, mi), Hn.subVectors(t.a, mi), Vn.subVectors(t.b, mi), kn.subVectors(t.c, mi), an.subVectors(Vn, Hn), on.subVectors(kn, Vn), Mn.subVectors(Hn, kn);
    let e = [0, -an.z, an.y, 0, -on.z, on.y, 0, -Mn.z, Mn.y, an.z, 0, -an.x, on.z, 0, -on.x, Mn.z, 0, -Mn.x, -an.y, an.x, 0, -on.y, on.x, 0, -Mn.y, Mn.x, 0];
    return !vr(e, Hn, Vn, kn, Di) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !vr(e, Hn, Vn, kn, Di)) ? false : (Li.crossVectors(an, on), e = [Li.x, Li.y, Li.z], vr(e, Hn, Vn, kn, Di));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, Ie).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(Ie).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (qe[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), qe[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), qe[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), qe[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), qe[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), qe[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), qe[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), qe[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(qe), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const qe = [new F(), new F(), new F(), new F(), new F(), new F(), new F(), new F()], Ie = new F(), Pi = new bi(), Hn = new F(), Vn = new F(), kn = new F(), an = new F(), on = new F(), Mn = new F(), mi = new F(), Di = new F(), Li = new F(), Sn = new F();
function vr(i, t, e, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    Sn.fromArray(i, s);
    const o = r.x * Math.abs(Sn.x) + r.y * Math.abs(Sn.y) + r.z * Math.abs(Sn.z), l = t.dot(Sn), c = e.dot(Sn), h = n.dot(Sn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o) return false;
  }
  return true;
}
const Gl = new bi(), _i = new F(), xr = new F();
class Hs {
  constructor(t = new F(), e = -1) {
    this.isSphere = true, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Gl.setFromPoints(t).getCenter(n);
    let r = 0;
    for (let s = 0, a = t.length; s < a; s++) r = Math.max(r, n.distanceToSquared(t[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
    _i.subVectors(t, this.center);
    const e = _i.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(_i, r / n), this.radius += r;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === true ? this.radius = Math.max(this.radius, t.radius) : (xr.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(_i.copy(t.center).add(xr)), this.expandByPoint(_i.copy(t.center).sub(xr))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const $e = new F(), Mr = new F(), Ui = new F(), ln = new F(), Sr = new F(), Ii = new F(), Er = new F();
class Vs {
  constructor(t = new F(), e = new F(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, $e)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = $e.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : ($e.copy(this.origin).addScaledVector(this.direction, e), $e.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, r) {
    Mr.copy(t).add(e).multiplyScalar(0.5), Ui.copy(e).sub(t).normalize(), ln.copy(this.origin).sub(Mr);
    const s = t.distanceTo(e) * 0.5, a = -this.direction.dot(Ui), o = ln.dot(this.direction), l = -ln.dot(Ui), c = ln.lengthSq(), h = Math.abs(1 - a * a);
    let f, d, m, v;
    if (h > 0) if (f = a * l - o, d = a * o - l, v = s * h, f >= 0) if (d >= -v) if (d <= v) {
      const M = 1 / h;
      f *= M, d *= M, m = f * (f + a * d + 2 * o) + d * (a * f + d + 2 * l) + c;
    } else d = s, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    else d = -s, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    else d <= -v ? (f = Math.max(0, -(-a * s + o)), d = f > 0 ? -s : Math.min(Math.max(-s, -l), s), m = -f * f + d * (d + 2 * l) + c) : d <= v ? (f = 0, d = Math.min(Math.max(-s, -l), s), m = d * (d + 2 * l) + c) : (f = Math.max(0, -(a * s + o)), d = f > 0 ? s : Math.min(Math.max(-s, -l), s), m = -f * f + d * (d + 2 * l) + c);
    else d = a > 0 ? -s : s, f = Math.max(0, -(a * d + o)), m = -f * f + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy(Mr).addScaledVector(Ui, d), m;
  }
  intersectSphere(t, e) {
    $e.subVectors(t.center, this.origin);
    const n = $e.dot(this.direction), r = $e.dot($e) - n * n, s = t.radius * t.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, r, s, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, f = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, r = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, r = (t.min.x - d.x) * c), h >= 0 ? (s = (t.min.y - d.y) * h, a = (t.max.y - d.y) * h) : (s = (t.max.y - d.y) * h, a = (t.min.y - d.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), f >= 0 ? (o = (t.min.z - d.z) * f, l = (t.max.z - d.z) * f) : (o = (t.max.z - d.z) * f, l = (t.min.z - d.z) * f), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, $e) !== null;
  }
  intersectTriangle(t, e, n, r, s) {
    Sr.subVectors(e, t), Ii.subVectors(n, t), Er.crossVectors(Sr, Ii);
    let a = this.direction.dot(Er), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0) o = -1, a = -a;
    else return null;
    ln.subVectors(this.origin, t);
    const l = o * this.direction.dot(Ii.crossVectors(ln, Ii));
    if (l < 0) return null;
    const c = o * this.direction.dot(Sr.cross(ln));
    if (c < 0 || l + c > a) return null;
    const h = -o * ln.dot(Er);
    return h < 0 ? null : this.at(h / a, s);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ee {
  constructor(t, e, n, r, s, a, o, l, c, h, f, d, m, v, M, p) {
    ee.prototype.isMatrix4 = true, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c, h, f, d, m, v, M, p);
  }
  set(t, e, n, r, s, a, o, l, c, h, f, d, m, v, M, p) {
    const u = this.elements;
    return u[0] = t, u[4] = e, u[8] = n, u[12] = r, u[1] = s, u[5] = a, u[9] = o, u[13] = l, u[2] = c, u[6] = h, u[10] = f, u[14] = d, u[3] = m, u[7] = v, u[11] = M, u[15] = p, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new ee().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, r = 1 / Gn.setFromMatrixColumn(t, 0).length(), s = 1 / Gn.setFromMatrixColumn(t, 1).length(), a = 1 / Gn.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * r, e[1] = n[1] * r, e[2] = n[2] * r, e[3] = 0, e[4] = n[4] * s, e[5] = n[5] * s, e[6] = n[6] * s, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const d = a * h, m = a * f, v = o * h, M = o * f;
      e[0] = l * h, e[4] = -l * f, e[8] = c, e[1] = m + v * c, e[5] = d - M * c, e[9] = -o * l, e[2] = M - d * c, e[6] = v + m * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const d = l * h, m = l * f, v = c * h, M = c * f;
      e[0] = d + M * o, e[4] = v * o - m, e[8] = a * c, e[1] = a * f, e[5] = a * h, e[9] = -o, e[2] = m * o - v, e[6] = M + d * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const d = l * h, m = l * f, v = c * h, M = c * f;
      e[0] = d - M * o, e[4] = -a * f, e[8] = v + m * o, e[1] = m + v * o, e[5] = a * h, e[9] = M - d * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const d = a * h, m = a * f, v = o * h, M = o * f;
      e[0] = l * h, e[4] = v * c - m, e[8] = d * c + M, e[1] = l * f, e[5] = M * c + d, e[9] = m * c - v, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const d = a * l, m = a * c, v = o * l, M = o * c;
      e[0] = l * h, e[4] = M - d * f, e[8] = v * f + m, e[1] = f, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = m * f + v, e[10] = d - M * f;
    } else if (t.order === "XZY") {
      const d = a * l, m = a * c, v = o * l, M = o * c;
      e[0] = l * h, e[4] = -f, e[8] = c * h, e[1] = d * f + M, e[5] = a * h, e[9] = m * f - v, e[2] = v * f - m, e[6] = o * h, e[10] = M * f + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Wl, t, Xl);
  }
  lookAt(t, e, n) {
    const r = this.elements;
    return Te.subVectors(t, e), Te.lengthSq() === 0 && (Te.z = 1), Te.normalize(), cn.crossVectors(n, Te), cn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Te.x += 1e-4 : Te.z += 1e-4, Te.normalize(), cn.crossVectors(n, Te)), cn.normalize(), Ni.crossVectors(Te, cn), r[0] = cn.x, r[4] = Ni.x, r[8] = Te.x, r[1] = cn.y, r[5] = Ni.y, r[9] = Te.y, r[2] = cn.z, r[6] = Ni.z, r[10] = Te.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], f = n[5], d = n[9], m = n[13], v = n[2], M = n[6], p = n[10], u = n[14], T = n[3], b = n[7], y = n[11], U = n[15], w = r[0], P = r[4], I = r[8], S = r[12], x = r[1], R = r[5], Y = r[9], z = r[13], W = r[2], K = r[6], k = r[10], Q = r[14], V = r[3], rt = r[7], ht = r[11], gt = r[15];
    return s[0] = a * w + o * x + l * W + c * V, s[4] = a * P + o * R + l * K + c * rt, s[8] = a * I + o * Y + l * k + c * ht, s[12] = a * S + o * z + l * Q + c * gt, s[1] = h * w + f * x + d * W + m * V, s[5] = h * P + f * R + d * K + m * rt, s[9] = h * I + f * Y + d * k + m * ht, s[13] = h * S + f * z + d * Q + m * gt, s[2] = v * w + M * x + p * W + u * V, s[6] = v * P + M * R + p * K + u * rt, s[10] = v * I + M * Y + p * k + u * ht, s[14] = v * S + M * z + p * Q + u * gt, s[3] = T * w + b * x + y * W + U * V, s[7] = T * P + b * R + y * K + U * rt, s[11] = T * I + b * Y + y * k + U * ht, s[15] = T * S + b * z + y * Q + U * gt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], f = t[6], d = t[10], m = t[14], v = t[3], M = t[7], p = t[11], u = t[15];
    return v * (+s * l * f - r * c * f - s * o * d + n * c * d + r * o * m - n * l * m) + M * (+e * l * m - e * c * d + s * a * d - r * a * m + r * c * h - s * l * h) + p * (+e * c * f - e * o * m - s * a * f + n * a * m + s * o * h - n * c * h) + u * (-r * o * h - e * l * f + e * o * d + r * a * f - n * a * d + n * l * h);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = e, r[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = t[9], d = t[10], m = t[11], v = t[12], M = t[13], p = t[14], u = t[15], T = f * p * c - M * d * c + M * l * m - o * p * m - f * l * u + o * d * u, b = v * d * c - h * p * c - v * l * m + a * p * m + h * l * u - a * d * u, y = h * M * c - v * f * c + v * o * m - a * M * m - h * o * u + a * f * u, U = v * f * l - h * M * l - v * o * d + a * M * d + h * o * p - a * f * p, w = e * T + n * b + r * y + s * U;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const P = 1 / w;
    return t[0] = T * P, t[1] = (M * d * s - f * p * s - M * r * m + n * p * m + f * r * u - n * d * u) * P, t[2] = (o * p * s - M * l * s + M * r * c - n * p * c - o * r * u + n * l * u) * P, t[3] = (f * l * s - o * d * s - f * r * c + n * d * c + o * r * m - n * l * m) * P, t[4] = b * P, t[5] = (h * p * s - v * d * s + v * r * m - e * p * m - h * r * u + e * d * u) * P, t[6] = (v * l * s - a * p * s - v * r * c + e * p * c + a * r * u - e * l * u) * P, t[7] = (a * d * s - h * l * s + h * r * c - e * d * c - a * r * m + e * l * m) * P, t[8] = y * P, t[9] = (v * f * s - h * M * s - v * n * m + e * M * m + h * n * u - e * f * u) * P, t[10] = (a * M * s - v * o * s + v * n * c - e * M * c - a * n * u + e * o * u) * P, t[11] = (h * o * s - a * f * s - h * n * c + e * f * c + a * n * m - e * o * m) * P, t[12] = U * P, t[13] = (h * M * r - v * f * r + v * n * d - e * M * d - h * n * p + e * f * p) * P, t[14] = (v * o * r - a * M * r - v * n * l + e * M * l + a * n * p - e * o * p) * P, t[15] = (a * f * r - h * o * r + h * n * l - e * f * l - a * n * d + e * o * d) * P, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z;
    return e[0] *= n, e[4] *= r, e[8] *= s, e[1] *= n, e[5] *= r, e[9] *= s, e[2] *= n, e[6] *= r, e[10] *= s, e[3] *= n, e[7] *= r, e[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = 1 - n, a = t.x, o = t.y, l = t.z, c = s * a, h = s * o;
    return this.set(c * a + n, c * o - r * l, c * l + r * o, 0, c * o + r * l, h * o + n, h * l - r * a, 0, c * l - r * o, h * l + r * a, s * l * l + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, e, n) {
    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, e, n, r, s, a) {
    return this.set(1, n, s, 0, t, 1, a, 0, e, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, e, n) {
    const r = this.elements, s = e._x, a = e._y, o = e._z, l = e._w, c = s + s, h = a + a, f = o + o, d = s * c, m = s * h, v = s * f, M = a * h, p = a * f, u = o * f, T = l * c, b = l * h, y = l * f, U = n.x, w = n.y, P = n.z;
    return r[0] = (1 - (M + u)) * U, r[1] = (m + y) * U, r[2] = (v - b) * U, r[3] = 0, r[4] = (m - y) * w, r[5] = (1 - (d + u)) * w, r[6] = (p + T) * w, r[7] = 0, r[8] = (v + b) * P, r[9] = (p - T) * P, r[10] = (1 - (d + M)) * P, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, e, n) {
    const r = this.elements;
    let s = Gn.set(r[0], r[1], r[2]).length();
    const a = Gn.set(r[4], r[5], r[6]).length(), o = Gn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), t.x = r[12], t.y = r[13], t.z = r[14], Ne.copy(this);
    const c = 1 / s, h = 1 / a, f = 1 / o;
    return Ne.elements[0] *= c, Ne.elements[1] *= c, Ne.elements[2] *= c, Ne.elements[4] *= h, Ne.elements[5] *= h, Ne.elements[6] *= h, Ne.elements[8] *= f, Ne.elements[9] *= f, Ne.elements[10] *= f, e.setFromRotationMatrix(Ne), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, r, s, a, o = en) {
    const l = this.elements, c = 2 * s / (e - t), h = 2 * s / (n - r), f = (e + t) / (e - t), d = (n + r) / (n - r);
    let m, v;
    if (o === en) m = -(a + s) / (a - s), v = -2 * a * s / (a - s);
    else if (o === ar) m = -a / (a - s), v = -a * s / (a - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = m, l[14] = v, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, r, s, a, o = en) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - r), f = 1 / (a - s), d = (e + t) * c, m = (n + r) * h;
    let v, M;
    if (o === en) v = (a + s) * f, M = -2 * f;
    else if (o === ar) v = s * f, M = -1 * f;
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -m, l[2] = 0, l[6] = 0, l[10] = M, l[14] = -v, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++) if (e[r] !== n[r]) return false;
    return true;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const Gn = new F(), Ne = new ee(), Wl = new F(0, 0, 0), Xl = new F(1, 1, 1), cn = new F(), Ni = new F(), Te = new F(), ha = new ee(), ua = new In();
class Xe {
  constructor(t = 0, e = 0, n = 0, r = Xe.DEFAULT_ORDER) {
    this.isEuler = true, this._x = t, this._y = e, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, r = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = true) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], h = r[9], f = r[2], d = r[6], m = r[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(Nt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Nt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Nt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-f, m), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Nt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(d, m), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Nt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-Nt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === true && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return ha.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ha, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return ua.setFromEuler(this), this.setFromQuaternion(ua, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Xe.DEFAULT_ORDER = "XYZ";
class ks {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let Yl = 0;
const da = new F(), Wn = new In(), je = new ee(), Fi = new F(), gi = new F(), ql = new F(), $l = new In(), fa = new F(1, 0, 0), pa = new F(0, 1, 0), ma = new F(0, 0, 1), _a = { type: "added" }, jl = { type: "removed" }, Xn = { type: "childadded", child: null }, yr = { type: "childremoved", child: null };
class _e extends Nn {
  constructor() {
    super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Yl++ }), this.uuid = yi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = _e.DEFAULT_UP.clone();
    const t = new F(), e = new Xe(), n = new In(), r = new F(1, 1, 1);
    function s() {
      n.setFromEuler(e, false);
    }
    function a() {
      e.setFromQuaternion(n, void 0, false);
    }
    e._onChange(s), n._onChange(a), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: r }, modelViewMatrix: { value: new ee() }, normalMatrix: { value: new Ct() } }), this.matrix = new ee(), this.matrixWorld = new ee(), this.matrixAutoUpdate = _e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = _e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new ks(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, true);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return Wn.setFromAxisAngle(t, e), this.quaternion.multiply(Wn), this;
  }
  rotateOnWorldAxis(t, e) {
    return Wn.setFromAxisAngle(t, e), this.quaternion.premultiply(Wn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(fa, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(pa, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(ma, t);
  }
  translateOnAxis(t, e) {
    return da.copy(t).applyQuaternion(this.quaternion), this.position.add(da.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(fa, t);
  }
  translateY(t) {
    return this.translateOnAxis(pa, t);
  }
  translateZ(t) {
    return this.translateOnAxis(ma, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(true, false), t.applyMatrix4(je.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? Fi.copy(t) : Fi.set(t, e, n);
    const r = this.parent;
    this.updateWorldMatrix(true, false), gi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? je.lookAt(gi, Fi, this.up) : je.lookAt(Fi, gi, this.up), this.quaternion.setFromRotationMatrix(je), r && (je.extractRotation(r.matrixWorld), Wn.setFromRotationMatrix(je), this.quaternion.premultiply(Wn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(_a), Xn.child = t, this.dispatchEvent(Xn), Xn.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(jl), yr.child = t, this.dispatchEvent(yr), yr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(true, false), je.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(true, false), je.multiply(t.parent.matrixWorld)), t.applyMatrix4(je), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(false, true), t.dispatchEvent(_a), Xn.child = t, this.dispatchEvent(Xn), Xn.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
      if (a !== void 0) return a;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++) r[s].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(true, false), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(gi, t, ql), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(gi, $l, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === false) return;
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, t = true);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === true && n !== null && n.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === true) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++) r[s].updateWorldMatrix(false, true);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === true && (r.castShadow = true), this.receiveShadow === true && (r.receiveShadow = true), this.visible === false && (r.visible = false), this.frustumCulled === false && (r.frustumCulled = false), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === false && (r.matrixAutoUpdate = false), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((o) => ({ boxInitialized: o.boxInitialized, boxMin: o.box.min.toArray(), boxMax: o.box.max.toArray(), sphereInitialized: o.sphereInitialized, sphereRadius: o.sphere.radius, sphereCenter: o.sphere.center.toArray() })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = { center: r.boundingSphere.center.toArray(), radius: r.boundingSphere.radius }), this.boundingBox !== null && (r.boundingBox = { min: r.boundingBox.min.toArray(), max: r.boundingBox.max.toArray() }));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l)) for (let c = 0, h = l.length; c < h; c++) {
          const f = l[c];
          s(t.shapes, f);
        }
        else s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const o = [];
      for (let l = 0, c = this.material.length; l < c; l++) o.push(s(t.materials, this.material[l]));
      r.material = o;
    } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), f = a(t.shapes), d = a(t.skeletons), m = a(t.animations), v = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), d.length > 0 && (n.skeletons = d), m.length > 0 && (n.animations = m), v.length > 0 && (n.nodes = v);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = true) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === true) for (let n = 0; n < t.children.length; n++) {
      const r = t.children[n];
      this.add(r.clone());
    }
    return this;
  }
}
_e.DEFAULT_UP = new F(0, 1, 0);
_e.DEFAULT_MATRIX_AUTO_UPDATE = true;
_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const Fe = new F(), Ke = new F(), br = new F(), Ze = new F(), Yn = new F(), qn = new F(), ga = new F(), Tr = new F(), Ar = new F(), wr = new F(), Rr = new re(), Cr = new re(), Pr = new re();
class Be {
  constructor(t = new F(), e = new F(), n = new F()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, r) {
    r.subVectors(n, e), Fe.subVectors(t, e), r.cross(Fe);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, e, n, r, s) {
    Fe.subVectors(r, e), Ke.subVectors(n, e), br.subVectors(t, e);
    const a = Fe.dot(Fe), o = Fe.dot(Ke), l = Fe.dot(br), c = Ke.dot(Ke), h = Ke.dot(br), f = a * c - o * o;
    if (f === 0) return s.set(0, 0, 0), null;
    const d = 1 / f, m = (c * l - o * h) * d, v = (a * h - o * l) * d;
    return s.set(1 - m - v, v, m);
  }
  static containsPoint(t, e, n, r) {
    return this.getBarycoord(t, e, n, r, Ze) === null ? false : Ze.x >= 0 && Ze.y >= 0 && Ze.x + Ze.y <= 1;
  }
  static getInterpolation(t, e, n, r, s, a, o, l) {
    return this.getBarycoord(t, e, n, r, Ze) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, Ze.x), l.addScaledVector(a, Ze.y), l.addScaledVector(o, Ze.z), l);
  }
  static getInterpolatedAttribute(t, e, n, r, s, a) {
    return Rr.setScalar(0), Cr.setScalar(0), Pr.setScalar(0), Rr.fromBufferAttribute(t, e), Cr.fromBufferAttribute(t, n), Pr.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(Rr, s.x), a.addScaledVector(Cr, s.y), a.addScaledVector(Pr, s.z), a;
  }
  static isFrontFacing(t, e, n, r) {
    return Fe.subVectors(n, e), Ke.subVectors(t, e), Fe.cross(Ke).dot(r) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, r) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, e, n, r) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Fe.subVectors(this.c, this.b), Ke.subVectors(this.a, this.b), Fe.cross(Ke).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Be.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Be.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, r, s) {
    return Be.getInterpolation(t, this.a, this.b, this.c, e, n, r, s);
  }
  containsPoint(t) {
    return Be.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Be.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Yn.subVectors(r, n), qn.subVectors(s, n), Tr.subVectors(t, n);
    const l = Yn.dot(Tr), c = qn.dot(Tr);
    if (l <= 0 && c <= 0) return e.copy(n);
    Ar.subVectors(t, r);
    const h = Yn.dot(Ar), f = qn.dot(Ar);
    if (h >= 0 && f <= h) return e.copy(r);
    const d = l * f - h * c;
    if (d <= 0 && l >= 0 && h <= 0) return a = l / (l - h), e.copy(n).addScaledVector(Yn, a);
    wr.subVectors(t, s);
    const m = Yn.dot(wr), v = qn.dot(wr);
    if (v >= 0 && m <= v) return e.copy(s);
    const M = m * c - l * v;
    if (M <= 0 && c >= 0 && v <= 0) return o = c / (c - v), e.copy(n).addScaledVector(qn, o);
    const p = h * v - m * f;
    if (p <= 0 && f - h >= 0 && m - v >= 0) return ga.subVectors(s, r), o = (f - h) / (f - h + (m - v)), e.copy(r).addScaledVector(ga, o);
    const u = 1 / (p + M + d);
    return a = M * u, o = d * u, e.copy(n).addScaledVector(Yn, a).addScaledVector(qn, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const Eo = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, hn = { h: 0, s: 0, l: 0 }, Oi = { h: 0, s: 0, l: 0 };
function Dr(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Wt {
  constructor(t, e, n) {
    return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const r = t;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = De) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Gt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, r = Gt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Gt.toWorkingColorSpace(this, r), this;
  }
  setHSL(t, e, n, r = Gt.workingColorSpace) {
    if (t = Dl(t, 1), e = Nt(e, 0, 1), n = Nt(n, 0, 1), e === 0) this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - s;
      this.r = Dr(a, s, t + 1 / 3), this.g = Dr(a, s, t), this.b = Dr(a, s, t - 1 / 3);
    }
    return Gt.toWorkingColorSpace(this, r), this;
  }
  setStyle(t, e = De) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(s[4]), this.setRGB(Math.min(255, parseInt(s[1], 10)) / 255, Math.min(255, parseInt(s[2], 10)) / 255, Math.min(255, parseInt(s[3], 10)) / 255, e);
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(s[4]), this.setRGB(Math.min(100, parseInt(s[1], 10)) / 100, Math.min(100, parseInt(s[2], 10)) / 100, Math.min(100, parseInt(s[3], 10)) / 100, e);
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(s[4]), this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, e);
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const s = r[1], a = s.length;
      if (a === 3) return this.setRGB(parseInt(s.charAt(0), 16) / 15, parseInt(s.charAt(1), 16) / 15, parseInt(s.charAt(2), 16) / 15, e);
      if (a === 6) return this.setHex(parseInt(s, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = De) {
    const n = Eo[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = rn(t.r), this.g = rn(t.g), this.b = rn(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = ri(t.r), this.g = ri(t.g), this.b = ri(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = De) {
    return Gt.fromWorkingColorSpace(me.copy(this), t), Math.round(Nt(me.r * 255, 0, 255)) * 65536 + Math.round(Nt(me.g * 255, 0, 255)) * 256 + Math.round(Nt(me.b * 255, 0, 255));
  }
  getHexString(t = De) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Gt.workingColorSpace) {
    Gt.fromWorkingColorSpace(me.copy(this), e);
    const n = me.r, r = me.g, s = me.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, c;
    const h = (o + a) / 2;
    if (o === a) l = 0, c = 0;
    else {
      const f = a - o;
      switch (c = h <= 0.5 ? f / (a + o) : f / (2 - a - o), a) {
        case n:
          l = (r - s) / f + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / f + 2;
          break;
        case s:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  getRGB(t, e = Gt.workingColorSpace) {
    return Gt.fromWorkingColorSpace(me.copy(this), e), t.r = me.r, t.g = me.g, t.b = me.b, t;
  }
  getStyle(t = De) {
    Gt.fromWorkingColorSpace(me.copy(this), t);
    const e = me.r, n = me.g, r = me.b;
    return t !== De ? "color(".concat(t, " ").concat(e.toFixed(3), " ").concat(n.toFixed(3), " ").concat(r.toFixed(3), ")") : "rgb(".concat(Math.round(e * 255), ",").concat(Math.round(n * 255), ",").concat(Math.round(r * 255), ")");
  }
  offsetHSL(t, e, n) {
    return this.getHSL(hn), this.setHSL(hn.h + t, hn.s + e, hn.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(hn), t.getHSL(Oi);
    const n = pr(hn.h, Oi.h, e), r = pr(hn.s, Oi.s, e), s = pr(hn.l, Oi.l, e);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, r = this.b, s = t.elements;
    return this.r = s[0] * e + s[3] * n + s[6] * r, this.g = s[1] * e + s[4] * n + s[7] * r, this.b = s[2] * e + s[5] * n + s[8] * r, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const me = new Wt();
Wt.NAMES = Eo;
let Kl = 0;
class Ti extends Nn {
  constructor() {
    super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: Kl++ }), this.uuid = yi(), this.name = "", this.type = "Material", this.blending = ni, this.side = _n, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = Xr, this.blendDst = Yr, this.blendEquation = wn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Wt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = si, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = ia, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Bn, this.stencilZFail = Bn, this.stencilZPass = Bn, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0) for (const e in t) {
      const n = t[e];
      if (n === void 0) {
        console.warn("THREE.Material: parameter '".concat(e, "' has value of undefined."));
        continue;
      }
      const r = this[e];
      if (r === void 0) {
        console.warn("THREE.Material: '".concat(e, "' is not a property of THREE.").concat(this.type, "."));
        continue;
      }
      r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[e] = n;
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = { textures: {}, images: {} });
    const n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== ni && (n.blending = this.blending), this.side !== _n && (n.side = this.side), this.vertexColors === true && (n.vertexColors = true), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === true && (n.transparent = true), this.blendSrc !== Xr && (n.blendSrc = this.blendSrc), this.blendDst !== Yr && (n.blendDst = this.blendDst), this.blendEquation !== wn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== si && (n.depthFunc = this.depthFunc), this.depthTest === false && (n.depthTest = this.depthTest), this.depthWrite === false && (n.depthWrite = this.depthWrite), this.colorWrite === false && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== ia && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Bn && (n.stencilFail = this.stencilFail), this.stencilZFail !== Bn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Bn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === true && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === true && (n.polygonOffset = true), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === true && (n.dithering = true), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === true && (n.alphaHash = true), this.alphaToCoverage === true && (n.alphaToCoverage = true), this.premultipliedAlpha === true && (n.premultipliedAlpha = true), this.forceSinglePass === true && (n.forceSinglePass = true), this.wireframe === true && (n.wireframe = true), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === true && (n.flatShading = true), this.visible === false && (n.visible = false), this.toneMapped === false && (n.toneMapped = false), this.fog === false && (n.fog = false), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const s = r(t.textures), a = r(t.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const r = e.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s) n[s] = e[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class yo extends Ti {
  constructor(t) {
    super(), this.isMeshBasicMaterial = true, this.type = "MeshBasicMaterial", this.color = new Wt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Xe(), this.combine = ro, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const oe = new F(), Bi = new Pt();
class Ge {
  constructor(t, e, n = false) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = true, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = ra, this.updateRanges = [], this.gpuType = tn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === true && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++) this.array[t + r] = e.array[n + r];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2) for (let e = 0, n = this.count; e < n; e++) Bi.fromBufferAttribute(this, e), Bi.applyMatrix3(t), this.setXY(e, Bi.x, Bi.y);
    else if (this.itemSize === 3) for (let e = 0, n = this.count; e < n; e++) oe.fromBufferAttribute(this, e), oe.applyMatrix3(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++) oe.fromBufferAttribute(this, e), oe.applyMatrix4(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) oe.fromBufferAttribute(this, e), oe.applyNormalMatrix(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) oe.fromBufferAttribute(this, e), oe.transformDirection(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = pi(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Se(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = pi(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Se(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = pi(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Se(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = pi(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Se(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = pi(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Se(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Se(e, this.array), n = Se(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, r) {
    return t *= this.itemSize, this.normalized && (e = Se(e, this.array), n = Se(n, this.array), r = Se(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this;
  }
  setXYZW(t, e, n, r, s) {
    return t *= this.itemSize, this.normalized && (e = Se(e, this.array), n = Se(n, this.array), r = Se(r, this.array), s = Se(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this.array[t + 3] = s, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
    return this.name !== "" && (t.name = this.name), this.usage !== ra && (t.usage = this.usage), t;
  }
}
class bo extends Ge {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class To extends Ge {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class Dn extends Ge {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Zl = 0;
const Pe = new ee(), Lr = new _e(), $n = new F(), Ae = new bi(), vi = new bi(), ue = new F();
class Fn extends Nn {
  constructor() {
    super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: Zl++ }), this.uuid = yi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (xo(t) ? To : bo)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({ start: t, count: e, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = true);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Ct().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = true;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Pe.makeRotationFromQuaternion(t), this.applyMatrix4(Pe), this;
  }
  rotateX(t) {
    return Pe.makeRotationX(t), this.applyMatrix4(Pe), this;
  }
  rotateY(t) {
    return Pe.makeRotationY(t), this.applyMatrix4(Pe), this;
  }
  rotateZ(t) {
    return Pe.makeRotationZ(t), this.applyMatrix4(Pe), this;
  }
  translate(t, e, n) {
    return Pe.makeTranslation(t, e, n), this.applyMatrix4(Pe), this;
  }
  scale(t, e, n) {
    return Pe.makeScale(t, e, n), this.applyMatrix4(Pe), this;
  }
  lookAt(t) {
    return Lr.lookAt(t), Lr.updateMatrix(), this.applyMatrix4(Lr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter($n).negate(), this.translate($n.x, $n.y, $n.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Dn(n, 3));
    } else {
      const n = Math.min(t.length, e.count);
      for (let r = 0; r < n; r++) {
        const s = t[r];
        e.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = true;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new bi());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new F(-1 / 0, -1 / 0, -1 / 0), new F(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e) for (let n = 0, r = e.length; n < r; n++) {
        const s = e[n];
        Ae.setFromBufferAttribute(s), this.morphTargetsRelative ? (ue.addVectors(this.boundingBox.min, Ae.min), this.boundingBox.expandByPoint(ue), ue.addVectors(this.boundingBox.max, Ae.max), this.boundingBox.expandByPoint(ue)) : (this.boundingBox.expandByPoint(Ae.min), this.boundingBox.expandByPoint(Ae.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Hs());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new F(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Ae.setFromBufferAttribute(t), e) for (let s = 0, a = e.length; s < a; s++) {
        const o = e[s];
        vi.setFromBufferAttribute(o), this.morphTargetsRelative ? (ue.addVectors(Ae.min, vi.min), Ae.expandByPoint(ue), ue.addVectors(Ae.max, vi.max), Ae.expandByPoint(ue)) : (Ae.expandByPoint(vi.min), Ae.expandByPoint(vi.max));
      }
      Ae.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++) ue.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(ue));
      if (e) for (let s = 0, a = e.length; s < a; s++) {
        const o = e[s], l = this.morphTargetsRelative;
        for (let c = 0, h = o.count; c < h; c++) ue.fromBufferAttribute(o, c), l && ($n.fromBufferAttribute(t, c), ue.add($n)), r = Math.max(r, n.distanceToSquared(ue));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, r = e.normal, s = e.uv;
    this.hasAttribute("tangent") === false && this.setAttribute("tangent", new Ge(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let I = 0; I < n.count; I++) o[I] = new F(), l[I] = new F();
    const c = new F(), h = new F(), f = new F(), d = new Pt(), m = new Pt(), v = new Pt(), M = new F(), p = new F();
    function u(I, S, x) {
      c.fromBufferAttribute(n, I), h.fromBufferAttribute(n, S), f.fromBufferAttribute(n, x), d.fromBufferAttribute(s, I), m.fromBufferAttribute(s, S), v.fromBufferAttribute(s, x), h.sub(c), f.sub(c), m.sub(d), v.sub(d);
      const R = 1 / (m.x * v.y - v.x * m.y);
      isFinite(R) && (M.copy(h).multiplyScalar(v.y).addScaledVector(f, -m.y).multiplyScalar(R), p.copy(f).multiplyScalar(m.x).addScaledVector(h, -v.x).multiplyScalar(R), o[I].add(M), o[S].add(M), o[x].add(M), l[I].add(p), l[S].add(p), l[x].add(p));
    }
    let T = this.groups;
    T.length === 0 && (T = [{ start: 0, count: t.count }]);
    for (let I = 0, S = T.length; I < S; ++I) {
      const x = T[I], R = x.start, Y = x.count;
      for (let z = R, W = R + Y; z < W; z += 3) u(t.getX(z + 0), t.getX(z + 1), t.getX(z + 2));
    }
    const b = new F(), y = new F(), U = new F(), w = new F();
    function P(I) {
      U.fromBufferAttribute(r, I), w.copy(U);
      const S = o[I];
      b.copy(S), b.sub(U.multiplyScalar(U.dot(S))).normalize(), y.crossVectors(w, S);
      const R = y.dot(l[I]) < 0 ? -1 : 1;
      a.setXYZW(I, b.x, b.y, b.z, R);
    }
    for (let I = 0, S = T.length; I < S; ++I) {
      const x = T[I], R = x.start, Y = x.count;
      for (let z = R, W = R + Y; z < W; z += 3) P(t.getX(z + 0)), P(t.getX(z + 1)), P(t.getX(z + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0) n = new Ge(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else for (let d = 0, m = n.count; d < m; d++) n.setXYZ(d, 0, 0, 0);
      const r = new F(), s = new F(), a = new F(), o = new F(), l = new F(), c = new F(), h = new F(), f = new F();
      if (t) for (let d = 0, m = t.count; d < m; d += 3) {
        const v = t.getX(d + 0), M = t.getX(d + 1), p = t.getX(d + 2);
        r.fromBufferAttribute(e, v), s.fromBufferAttribute(e, M), a.fromBufferAttribute(e, p), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), o.fromBufferAttribute(n, v), l.fromBufferAttribute(n, M), c.fromBufferAttribute(n, p), o.add(h), l.add(h), c.add(h), n.setXYZ(v, o.x, o.y, o.z), n.setXYZ(M, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
      }
      else for (let d = 0, m = e.count; d < m; d += 3) r.fromBufferAttribute(e, d + 0), s.fromBufferAttribute(e, d + 1), a.fromBufferAttribute(e, d + 2), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = true;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++) ue.fromBufferAttribute(t, e), ue.normalize(), t.setXYZ(e, ue.x, ue.y, ue.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, f = o.normalized, d = new c.constructor(l.length * h);
      let m = 0, v = 0;
      for (let M = 0, p = l.length; M < p; M++) {
        o.isInterleavedBufferAttribute ? m = l[M] * o.data.stride + o.offset : m = l[M] * h;
        for (let u = 0; u < h; u++) d[v++] = c[m++];
      }
      return new Ge(d, h, f);
    }
    if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Fn(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let h = 0, f = c.length; h < f; h++) {
        const d = c[h], m = t(d, n);
        l.push(m);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = false;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let f = 0, d = c.length; f < d; f++) {
        const m = c[f];
        h.push(m.toJSON(t.data));
      }
      h.length > 0 && (r[l] = h, s = true);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = { center: o.center.toArray(), radius: o.radius }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const r = t.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(e));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const h = [], f = s[c];
      for (let d = 0, m = f.length; d < m; d++) h.push(f[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const f = a[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const va = new ee(), En = new Vs(), zi = new Hs(), xa = new F(), Hi = new F(), Vi = new F(), ki = new F(), Ur = new F(), Gi = new F(), Ma = new F(), Wi = new F();
class nn extends _e {
  constructor(t = new Fn(), e = new yo()) {
    super(), this.isMesh = true, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(r, t);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Gi.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = o[l], f = s[l];
        h !== 0 && (Ur.fromBufferAttribute(f, t), a ? Gi.addScaledVector(Ur, h) : Gi.addScaledVector(Ur.sub(e), h));
      }
      e.add(Gi);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), zi.copy(n.boundingSphere), zi.applyMatrix4(s), En.copy(t.ray).recast(t.near), !(zi.containsPoint(En.origin) === false && (En.intersectSphere(zi, xa) === null || En.origin.distanceToSquared(xa) > (t.far - t.near) ** 2)) && (va.copy(s).invert(), En.copy(t.ray).applyMatrix4(va), !(n.boundingBox !== null && En.intersectsBox(n.boundingBox) === false) && this._computeIntersections(t, e, En)));
  }
  _computeIntersections(t, e, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, f = s.attributes.normal, d = s.groups, m = s.drawRange;
    if (o !== null) if (Array.isArray(a)) for (let v = 0, M = d.length; v < M; v++) {
      const p = d[v], u = a[p.materialIndex], T = Math.max(p.start, m.start), b = Math.min(o.count, Math.min(p.start + p.count, m.start + m.count));
      for (let y = T, U = b; y < U; y += 3) {
        const w = o.getX(y), P = o.getX(y + 1), I = o.getX(y + 2);
        r = Xi(this, u, t, n, c, h, f, w, P, I), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, e.push(r));
      }
    }
    else {
      const v = Math.max(0, m.start), M = Math.min(o.count, m.start + m.count);
      for (let p = v, u = M; p < u; p += 3) {
        const T = o.getX(p), b = o.getX(p + 1), y = o.getX(p + 2);
        r = Xi(this, a, t, n, c, h, f, T, b, y), r && (r.faceIndex = Math.floor(p / 3), e.push(r));
      }
    }
    else if (l !== void 0) if (Array.isArray(a)) for (let v = 0, M = d.length; v < M; v++) {
      const p = d[v], u = a[p.materialIndex], T = Math.max(p.start, m.start), b = Math.min(l.count, Math.min(p.start + p.count, m.start + m.count));
      for (let y = T, U = b; y < U; y += 3) {
        const w = y, P = y + 1, I = y + 2;
        r = Xi(this, u, t, n, c, h, f, w, P, I), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, e.push(r));
      }
    }
    else {
      const v = Math.max(0, m.start), M = Math.min(l.count, m.start + m.count);
      for (let p = v, u = M; p < u; p += 3) {
        const T = p, b = p + 1, y = p + 2;
        r = Xi(this, a, t, n, c, h, f, T, b, y), r && (r.faceIndex = Math.floor(p / 3), e.push(r));
      }
    }
  }
}
function Jl(i, t, e, n, r, s, a, o) {
  let l;
  if (t.side === ye ? l = n.intersectTriangle(a, s, r, true, o) : l = n.intersectTriangle(r, s, a, t.side === _n, o), l === null) return null;
  Wi.copy(o), Wi.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(Wi);
  return c < e.near || c > e.far ? null : { distance: c, point: Wi.clone(), object: i };
}
function Xi(i, t, e, n, r, s, a, o, l, c) {
  i.getVertexPosition(o, Hi), i.getVertexPosition(l, Vi), i.getVertexPosition(c, ki);
  const h = Jl(i, t, e, n, Hi, Vi, ki, Ma);
  if (h) {
    const f = new F();
    Be.getBarycoord(Ma, Hi, Vi, ki, f), r && (h.uv = Be.getInterpolatedAttribute(r, o, l, c, f, new Pt())), s && (h.uv1 = Be.getInterpolatedAttribute(s, o, l, c, f, new Pt())), a && (h.normal = Be.getInterpolatedAttribute(a, o, l, c, f, new F()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = { a: o, b: l, c, normal: new F(), materialIndex: 0 };
    Be.getNormal(Hi, Vi, ki, d.normal), h.face = d, h.barycoord = f;
  }
  return h;
}
class Ai extends Fn {
  constructor(t = 1, e = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: n, widthSegments: r, heightSegments: s, depthSegments: a };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], h = [], f = [];
    let d = 0, m = 0;
    v("z", "y", "x", -1, -1, n, e, t, a, s, 0), v("z", "y", "x", 1, -1, n, e, -t, a, s, 1), v("x", "z", "y", 1, 1, t, n, e, r, a, 2), v("x", "z", "y", 1, -1, t, n, -e, r, a, 3), v("x", "y", "z", 1, -1, t, e, n, r, s, 4), v("x", "y", "z", -1, -1, t, e, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new Dn(c, 3)), this.setAttribute("normal", new Dn(h, 3)), this.setAttribute("uv", new Dn(f, 2));
    function v(M, p, u, T, b, y, U, w, P, I, S) {
      const x = y / P, R = U / I, Y = y / 2, z = U / 2, W = w / 2, K = P + 1, k = I + 1;
      let Q = 0, V = 0;
      const rt = new F();
      for (let ht = 0; ht < k; ht++) {
        const gt = ht * R - z;
        for (let Ut = 0; Ut < K; Ut++) {
          const Kt = Ut * x - Y;
          rt[M] = Kt * T, rt[p] = gt * b, rt[u] = W, c.push(rt.x, rt.y, rt.z), rt[M] = 0, rt[p] = 0, rt[u] = w > 0 ? 1 : -1, h.push(rt.x, rt.y, rt.z), f.push(Ut / P), f.push(1 - ht / I), Q += 1;
        }
      }
      for (let ht = 0; ht < I; ht++) for (let gt = 0; gt < P; gt++) {
        const Ut = d + gt + K * ht, Kt = d + gt + K * (ht + 1), X = d + (gt + 1) + K * (ht + 1), tt = d + (gt + 1) + K * ht;
        l.push(Ut, Kt, tt), l.push(Kt, X, tt), V += 6;
      }
      o.addGroup(m, V, S), m += V, d += Q;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ai(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function ui(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const r = i[e][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = r.clone() : Array.isArray(r) ? t[e][n] = r.slice() : t[e][n] = r;
    }
  }
  return t;
}
function ve(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = ui(i[e]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function Ql(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function Ao(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === true ? t.texture.colorSpace : Gt.workingColorSpace;
}
const tc = { clone: ui, merge: ve };
var ec = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", nc = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
class gn extends Ti {
  constructor(t) {
    super(), this.isShaderMaterial = true, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = ec, this.fragmentShader = nc, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = ui(t.uniforms), this.uniformsGroups = Ql(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? e.uniforms[r] = { type: "t", value: a.toJSON(t).uuid } : a && a.isColor ? e.uniforms[r] = { type: "c", value: a.getHex() } : a && a.isVector2 ? e.uniforms[r] = { type: "v2", value: a.toArray() } : a && a.isVector3 ? e.uniforms[r] = { type: "v3", value: a.toArray() } : a && a.isVector4 ? e.uniforms[r] = { type: "v4", value: a.toArray() } : a && a.isMatrix3 ? e.uniforms[r] = { type: "m3", value: a.toArray() } : a && a.isMatrix4 ? e.uniforms[r] = { type: "m4", value: a.toArray() } : e.uniforms[r] = { value: a };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions) this.extensions[r] === true && (n[r] = true);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class wo extends _e {
  constructor() {
    super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new ee(), this.projectionMatrix = new ee(), this.projectionMatrixInverse = new ee(), this.coordinateSystem = en;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const un = new F(), Sa = new Pt(), Ea = new Pt();
class Oe extends wo {
  constructor(t = 50, e = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = Ps * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(ir * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return Ps * 2 * Math.atan(Math.tan(ir * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(t, e, n) {
    un.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(un.x, un.y).multiplyScalar(-t / un.z), un.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(un.x, un.y).multiplyScalar(-t / un.z);
  }
  getViewSize(t, e) {
    return this.getViewBounds(t, Sa, Ea), e.subVectors(Ea, Sa);
  }
  setViewOffset(t, e, n, r, s, a) {
    this.aspect = t / e, this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(ir * 0.5 * this.fov) / this.zoom, n = 2 * e, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, e -= a.offsetY * n / c, r *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const jn = -90, Kn = 1;
class ic extends _e {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Oe(jn, Kn, t, e);
    r.layers = this.layers, this.add(r);
    const s = new Oe(jn, Kn, t, e);
    s.layers = this.layers, this.add(s);
    const a = new Oe(jn, Kn, t, e);
    a.layers = this.layers, this.add(a);
    const o = new Oe(jn, Kn, t, e);
    o.layers = this.layers, this.add(o);
    const l = new Oe(jn, Kn, t, e);
    l.layers = this.layers, this.add(l);
    const c = new Oe(jn, Kn, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, r, s, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === en) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === ar) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e) this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, h] = this.children, f = t.getRenderTarget(), d = t.getActiveCubeFace(), m = t.getActiveMipmapLevel(), v = t.xr.enabled;
    t.xr.enabled = false;
    const M = n.texture.generateMipmaps;
    n.texture.generateMipmaps = false, t.setRenderTarget(n, 0, r), t.render(e, s), t.setRenderTarget(n, 1, r), t.render(e, a), t.setRenderTarget(n, 2, r), t.render(e, o), t.setRenderTarget(n, 3, r), t.render(e, l), t.setRenderTarget(n, 4, r), t.render(e, c), n.texture.generateMipmaps = M, t.setRenderTarget(n, 5, r), t.render(e, h), t.setRenderTarget(f, d, m), t.xr.enabled = v, n.texture.needsPMREMUpdate = true;
  }
}
class Ro extends xe {
  constructor(t, e, n, r, s, a, o, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : ai, super(t, e, n, r, s, a, o, l, c, h), this.isCubeTexture = true, this.flipY = false;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class rc extends Un {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = true;
    const n = { width: t, height: t, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new Ro(r, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = true, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : false, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : ke;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = { uniforms: { tEquirect: { value: null } }, vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			", fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			" }, r = new Ai(5, 5, 5), s = new gn({ name: "CubemapFromEquirect", uniforms: ui(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: ye, blending: pn });
    s.uniforms.tEquirect.value = e;
    const a = new nn(r, s), o = e.minFilter;
    return e.minFilter === Pn && (e.minFilter = ke), new ic(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, r) {
    const s = t.getRenderTarget();
    for (let a = 0; a < 6; a++) t.setRenderTarget(this, a), t.clear(e, n, r);
    t.setRenderTarget(s);
  }
}
class vp extends _e {
  constructor() {
    super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Xe(), this.environmentIntensity = 1, this.environmentRotation = new Xe(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
const Ir = new F(), sc = new F(), ac = new Ct();
class dn {
  constructor(t = new F(1, 0, 0), e = 0) {
    this.isPlane = true, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, r) {
    return this.normal.set(t, e, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const r = Ir.subVectors(n, e).cross(sc.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(Ir), r = this.normal.dot(n);
    if (r === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const s = -(t.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : e.copy(t.start).addScaledVector(n, s);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || ac.getNormalMatrix(t), r = this.coplanarPoint(Ir).applyMatrix4(t), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const yn = new Hs(), Yi = new F();
class Gs {
  constructor(t = new dn(), e = new dn(), n = new dn(), r = new dn(), s = new dn(), a = new dn()) {
    this.planes = [t, e, n, r, s, a];
  }
  set(t, e, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = en) {
    const n = this.planes, r = t.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], h = r[5], f = r[6], d = r[7], m = r[8], v = r[9], M = r[10], p = r[11], u = r[12], T = r[13], b = r[14], y = r[15];
    if (n[0].setComponents(l - s, d - c, p - m, y - u).normalize(), n[1].setComponents(l + s, d + c, p + m, y + u).normalize(), n[2].setComponents(l + a, d + h, p + v, y + T).normalize(), n[3].setComponents(l - a, d - h, p - v, y - T).normalize(), n[4].setComponents(l - o, d - f, p - M, y - b).normalize(), e === en) n[5].setComponents(l + o, d + f, p + M, y + b).normalize();
    else if (e === ar) n[5].setComponents(o, f, M, b).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), yn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(yn);
  }
  intersectsSprite(t) {
    return yn.center.set(0, 0, 0), yn.radius = 0.7071067811865476, yn.applyMatrix4(t.matrixWorld), this.intersectsSphere(yn);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, r = -t.radius;
    for (let s = 0; s < 6; s++) if (e[s].distanceToPoint(n) < r) return false;
    return true;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      if (Yi.x = r.normal.x > 0 ? t.max.x : t.min.x, Yi.y = r.normal.y > 0 ? t.max.y : t.min.y, Yi.z = r.normal.z > 0 ? t.max.z : t.min.z, r.distanceToPoint(Yi) < 0) return false;
    }
    return true;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return false;
    return true;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class qi extends _e {
  constructor() {
    super(), this.isGroup = true, this.type = "Group";
  }
}
class xp extends xe {
  constructor(t, e, n, r, s, a, o, l, c) {
    super(t, e, n, r, s, a, o, l, c), this.isCanvasTexture = true, this.needsUpdate = true;
  }
}
class Co extends xe {
  constructor(t, e, n, r, s, a, o, l, c, h = ii) {
    if (h !== ii && h !== ci) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === ii && (n = Ln), n === void 0 && h === ci && (n = li), super(null, r, s, a, o, l, h, n, c), this.isDepthTexture = true, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : He, this.minFilter = l !== void 0 ? l : He, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
class cr extends Fn {
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: n, heightSegments: r };
    const s = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, h = l + 1, f = t / o, d = e / l, m = [], v = [], M = [], p = [];
    for (let u = 0; u < h; u++) {
      const T = u * d - a;
      for (let b = 0; b < c; b++) {
        const y = b * f - s;
        v.push(y, -T, 0), M.push(0, 0, 1), p.push(b / o), p.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++) for (let T = 0; T < o; T++) {
      const b = T + c * u, y = T + c * (u + 1), U = T + 1 + c * (u + 1), w = T + 1 + c * u;
      m.push(b, y, w), m.push(y, U, w);
    }
    this.setIndex(m), this.setAttribute("position", new Dn(v, 3)), this.setAttribute("normal", new Dn(M, 3)), this.setAttribute("uv", new Dn(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new cr(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
class Mp extends Ti {
  constructor(t) {
    super(), this.isMeshStandardMaterial = true, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Wt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Wt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = go, this.normalScale = new Pt(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Xe(), this.envMapIntensity = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = false, this.fog = true, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class oc extends Ti {
  constructor(t) {
    super(), this.isMeshDepthMaterial = true, this.type = "MeshDepthMaterial", this.depthPacking = Sl, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class lc extends Ti {
  constructor(t) {
    super(), this.isMeshDistanceMaterial = true, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
class Po extends _e {
  constructor(t, e = 1) {
    super(), this.isLight = true, this.type = "Light", this.color = new Wt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
const Nr = new ee(), ya = new F(), ba = new F();
class cc {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Pt(512, 512), this.map = null, this.mapPass = null, this.matrix = new ee(), this.autoUpdate = true, this.needsUpdate = false, this._frustum = new Gs(), this._frameExtents = new Pt(1, 1), this._viewportCount = 1, this._viewports = [new re(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    ya.setFromMatrixPosition(t.matrixWorld), e.position.copy(ya), ba.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(ba), e.updateMatrixWorld(), Nr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Nr), n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(Nr);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(false).object, delete t.camera.matrix, t;
  }
}
class Do extends wo {
  constructor(t = -1, e = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, r, s, a) {
    this.view === null && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = false), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - t, a = n + t, o = r + e, l = r - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
class hc extends cc {
  constructor() {
    super(new Do(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = true;
  }
}
class Sp extends Po {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = true, this.type = "DirectionalLight", this.position.copy(_e.DEFAULT_UP), this.updateMatrix(), this.target = new _e(), this.shadow = new hc();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class Ep extends Po {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = true, this.type = "AmbientLight";
  }
}
class uc extends Oe {
  constructor(t = []) {
    super(), this.isArrayCamera = true, this.cameras = t;
  }
}
class yp {
  constructor(t = true) {
    this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = false;
  }
  start() {
    this.startTime = Ta(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = true;
  }
  stop() {
    this.getElapsedTime(), this.running = false, this.autoStart = false;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let t = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const e = Ta();
      t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
    }
    return t;
  }
}
function Ta() {
  return performance.now();
}
const Aa = new ee();
class bp {
  constructor(t, e, n = 0, r = 1 / 0) {
    this.ray = new Vs(t, e), this.near = n, this.far = r, this.camera = null, this.layers = new ks(), this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} };
  }
  set(t, e) {
    this.ray.set(t, e);
  }
  setFromCamera(t, e) {
    e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
  }
  setFromXRController(t) {
    return Aa.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Aa), this;
  }
  intersectObject(t, e = true, n = []) {
    return Ds(t, this, n, e), n.sort(wa), n;
  }
  intersectObjects(t, e = true, n = []) {
    for (let r = 0, s = t.length; r < s; r++) Ds(t[r], this, n, e);
    return n.sort(wa), n;
  }
}
function wa(i, t) {
  return i.distance - t.distance;
}
function Ds(i, t, e, n) {
  let r = true;
  if (i.layers.test(t.layers) && i.raycast(t, e) === false && (r = false), r === true && n === true) {
    const s = i.children;
    for (let a = 0, o = s.length; a < o; a++) Ds(s[a], t, e, true);
  }
}
class Ra {
  constructor(t = 1, e = 0, n = 0) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  set(t, e, n) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  copy(t) {
    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
  }
  makeSafe() {
    return this.phi = Nt(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(Nt(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class dc extends Nn {
  constructor(t, e = null) {
    super(), this.object = t, this.domElement = e, this.enabled = true, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
function Ca(i, t, e, n) {
  const r = fc(n);
  switch (e) {
    case co:
      return i * t;
    case uo:
      return i * t;
    case fo:
      return i * t * 2;
    case po:
      return i * t / r.components * r.byteLength;
    case Os:
      return i * t / r.components * r.byteLength;
    case mo:
      return i * t * 2 / r.components * r.byteLength;
    case Bs:
      return i * t * 2 / r.components * r.byteLength;
    case ho:
      return i * t * 3 / r.components * r.byteLength;
    case ze:
      return i * t * 4 / r.components * r.byteLength;
    case zs:
      return i * t * 4 / r.components * r.byteLength;
    case Ji:
    case Qi:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case tr:
    case er:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case ss:
    case os:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case rs:
    case as:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case ls:
    case cs:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case hs:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case us:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case ds:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case fs:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case ps:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case ms:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case _s:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case gs:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case vs:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case xs:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Ms:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Ss:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Es:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case ys:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case bs:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case nr:
    case Ts:
    case As:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case _o:
    case ws:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case Rs:
    case Cs:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error("Unable to determine texture byte length for ".concat(e, " format."));
}
function fc(i) {
  switch (i) {
    case sn:
    case ao:
      return { byteLength: 1, components: 1 };
    case Mi:
    case oo:
    case Ei:
      return { byteLength: 2, components: 1 };
    case Ns:
    case Fs:
      return { byteLength: 2, components: 4 };
    case Ln:
    case Is:
    case tn:
      return { byteLength: 4, components: 1 };
    case lo:
      return { byteLength: 4, components: 3 };
  }
  throw new Error("Unknown texture type ".concat(i, "."));
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "171" } }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "171");
/**
* @license
* Copyright 2010-2024 Three.js Authors
* SPDX-License-Identifier: MIT
*/
function Lo() {
  let i = null, t = false, e = null, n = null;
  function r(s, a) {
    e(s, a), n = i.requestAnimationFrame(r);
  }
  return { start: function() {
    t !== true && e !== null && (n = i.requestAnimationFrame(r), t = true);
  }, stop: function() {
    i.cancelAnimationFrame(n), t = false;
  }, setAnimationLoop: function(s) {
    e = s;
  }, setContext: function(s) {
    i = s;
  } };
}
function pc(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, f = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let m;
    if (c instanceof Float32Array) m = i.FLOAT;
    else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? m = i.HALF_FLOAT : m = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) m = i.SHORT;
    else if (c instanceof Uint32Array) m = i.UNSIGNED_INT;
    else if (c instanceof Int32Array) m = i.INT;
    else if (c instanceof Int8Array) m = i.BYTE;
    else if (c instanceof Uint8Array) m = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) m = i.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return { buffer: d, type: m, bytesPerElement: c.BYTES_PER_ELEMENT, version: o.version, size: f };
  }
  function n(o, l, c) {
    const h = l.array, f = l.updateRanges;
    if (i.bindBuffer(c, o), f.length === 0) i.bufferSubData(c, 0, h);
    else {
      f.sort((m, v) => m.start - v.start);
      let d = 0;
      for (let m = 1; m < f.length; m++) {
        const v = f[d], M = f[m];
        M.start <= v.start + v.count + 1 ? v.count = Math.max(v.count, M.start + M.count - v.start) : (++d, f[d] = M);
      }
      f.length = d + 1;
      for (let m = 0, v = f.length; m < v; m++) {
        const M = f[m];
        i.bufferSubData(c, M.start * h.BYTES_PER_ELEMENT, h, M.start, M.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, { buffer: o.buffer, type: o.type, bytesPerElement: o.elementSize, version: o.version });
      return;
    }
    const c = t.get(o);
    if (c === void 0) t.set(o, e(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return { get: r, remove: s, update: a };
}
var mc = "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif", _c = "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif", gc = "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif", vc = "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif", xc = "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif", Mc = "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif", Sc = "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif", Ec = "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif", yc = "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec3 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n	}\n#endif", bc = "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif", Tc = "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif", Ac = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif", wc = "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated", Rc = "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif", Cc = "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif", Pc = "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif", Dc = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif", Lc = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif", Uc = "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif", Ic = "#if defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n	diffuseColor.rgb *= vColor;\n#endif", Nc = "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR )\n	varying vec3 vColor;\n#endif", Fc = "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec3 vColor;\n#endif", Oc = "#if defined( USE_COLOR_ALPHA )\n	vColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n	vColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n	vColor.xyz *= batchingColor.xyz;\n#endif", Bc = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n	mat3 tmp;\n	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n	return tmp;\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated", zc = "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif", Hc = "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif", Vc = "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif", kc = "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif", Gc = "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif", Wc = "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif", Xc = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Yc = "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}", qc = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 envColor = vec4( 0.0 );\n	#endif\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif", $c = "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform float flipEnvMap;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	\n#endif", jc = "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif", Kc = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif", Zc = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif", Jc = "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif", Qc = "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif", th = "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif", eh = "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif", nh = "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}", ih = "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif", rh = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;", sh = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert", ah = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif", oh = "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif", lh = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;", ch = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon", hh = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;", uh = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong", dh = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif", fh = "struct PhysicalMaterial {\n	vec3 diffuseColor;\n	float roughness;\n	vec3 specularColor;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		float v = 0.5 / ( gv + gl );\n		return saturate(v);\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColor;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n	return saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n	vec4 r = roughness * c0 + c1;\n	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n	return fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n	#endif\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n	#endif\n	vec3 totalScattering = singleScattering + multiScattering;\n	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n	reflectedLight.indirectSpecular += radiance * singleScattering;\n	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}", ph = "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif", mh = "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n		iblIrradiance += getIBLIrradiance( geometryNormal );\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif", _h = "#if defined( RE_IndirectDiffuse )\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif", gh = "#if defined( USE_LOGDEPTHBUF )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif", vh = "#if defined( USE_LOGDEPTHBUF )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif", xh = "#ifdef USE_LOGDEPTHBUF\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif", Mh = "#ifdef USE_LOGDEPTHBUF\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif", Sh = "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif", Eh = "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif", yh = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif", bh = "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif", Th = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif", Ah = "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif", wh = "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif", Rh = "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif", Ch = "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif", Ph = "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif", Dh = "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif", Lh = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;", Uh = "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif", Ih = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif", Nh = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif", Fh = "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif", Oh = "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif", Bh = "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif", zh = "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif", Hh = "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif", Vh = "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif", kh = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );", Gh = "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return ( near * far ) / ( ( far - near ) * depth - far );\n}", Wh = "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif", Xh = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;", Yh = "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif", qh = "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif", $h = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif", jh = "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif", Kh = "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n	}\n	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n		return unpackRGBATo2Half( texture2D( shadow, uv ) );\n	}\n	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n		float occlusion = 1.0;\n		vec2 distribution = texture2DDistribution( shadow, uv );\n		float hard_shadow = step( compare , distribution.x );\n		if (hard_shadow != 1.0 ) {\n			float distance = compare - distribution.x ;\n			float variance = max( 0.00000, distribution.y * distribution.y );\n			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n		}\n		return occlusion;\n	}\n	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		float shadow = 1.0;\n		shadowCoord.xyz /= shadowCoord.w;\n		shadowCoord.z += shadowBias;\n		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n		if ( frustumTest ) {\n		#if defined( SHADOWMAP_TYPE_PCF )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			float dx2 = dx0 / 2.0;\n			float dy2 = dy0 / 2.0;\n			float dx3 = dx1 / 2.0;\n			float dy3 = dy1 / 2.0;\n			shadow = (\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 17.0 );\n		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx = texelSize.x;\n			float dy = texelSize.y;\n			vec2 uv = shadowCoord.xy;\n			vec2 f = fract( uv * shadowMapSize + 0.5 );\n			uv -= f * texelSize;\n			shadow = (\n				texture2DCompare( shadowMap, uv, shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n						  f.x ),\n					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n						  f.x ),\n					 f.y )\n			) * ( 1.0 / 9.0 );\n		#elif defined( SHADOWMAP_TYPE_VSM )\n			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#else\n			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	vec2 cubeToUV( vec3 v, float texelSizeY ) {\n		vec3 absV = abs( v );\n		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n		absV *= scaleToCube;\n		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n		vec2 planar = v.xy;\n		float almostATexel = 1.5 * texelSizeY;\n		float almostOne = 1.0 - almostATexel;\n		if ( absV.z >= almostOne ) {\n			if ( v.z > 0.0 )\n				planar.x = 4.0 - v.x;\n		} else if ( absV.x >= almostOne ) {\n			float signX = sign( v.x );\n			planar.x = v.z * signX + 2.0 * signX;\n		} else if ( absV.y >= almostOne ) {\n			float signY = sign( v.y );\n			planar.x = v.x + 2.0 * signY + 2.0;\n			planar.y = v.z * signY - 2.0;\n		}\n		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n	}\n	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		\n		float lightToPositionLength = length( lightToPosition );\n		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n				shadow = (\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n				) * ( 1.0 / 9.0 );\n			#else\n				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n			#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n#endif", Zh = "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif", Jh = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif", Qh = "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}", tu = "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif", eu = "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif", nu = "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif", iu = "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif", ru = "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif", su = "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif", au = "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif", ou = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }", lu = "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif", cu = "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n		\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n		\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		\n		#else\n		\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif", hu = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif", uu = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif", du = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif", fu = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif";
const pu = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}", mu = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", _u = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}", gu = "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", vu = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}", xu = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", Mu = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}", Su = "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}", Eu = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}", yu = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = packDepthToRGBA( dist );\n}", bu = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}", Tu = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}", Au = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}", wu = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}", Ru = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}", Cu = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", Pu = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", Du = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", Lu = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}", Uu = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", Iu = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}", Nu = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}", Fu = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", Ou = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", Bu = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}", zu = "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", Hu = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", Vu = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}", ku = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}", Gu = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}", Wu = "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}", Xu = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}", Yu = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}", qu = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}", Lt = { alphahash_fragment: mc, alphahash_pars_fragment: _c, alphamap_fragment: gc, alphamap_pars_fragment: vc, alphatest_fragment: xc, alphatest_pars_fragment: Mc, aomap_fragment: Sc, aomap_pars_fragment: Ec, batching_pars_vertex: yc, batching_vertex: bc, begin_vertex: Tc, beginnormal_vertex: Ac, bsdfs: wc, iridescence_fragment: Rc, bumpmap_pars_fragment: Cc, clipping_planes_fragment: Pc, clipping_planes_pars_fragment: Dc, clipping_planes_pars_vertex: Lc, clipping_planes_vertex: Uc, color_fragment: Ic, color_pars_fragment: Nc, color_pars_vertex: Fc, color_vertex: Oc, common: Bc, cube_uv_reflection_fragment: zc, defaultnormal_vertex: Hc, displacementmap_pars_vertex: Vc, displacementmap_vertex: kc, emissivemap_fragment: Gc, emissivemap_pars_fragment: Wc, colorspace_fragment: Xc, colorspace_pars_fragment: Yc, envmap_fragment: qc, envmap_common_pars_fragment: $c, envmap_pars_fragment: jc, envmap_pars_vertex: Kc, envmap_physical_pars_fragment: oh, envmap_vertex: Zc, fog_vertex: Jc, fog_pars_vertex: Qc, fog_fragment: th, fog_pars_fragment: eh, gradientmap_pars_fragment: nh, lightmap_pars_fragment: ih, lights_lambert_fragment: rh, lights_lambert_pars_fragment: sh, lights_pars_begin: ah, lights_toon_fragment: lh, lights_toon_pars_fragment: ch, lights_phong_fragment: hh, lights_phong_pars_fragment: uh, lights_physical_fragment: dh, lights_physical_pars_fragment: fh, lights_fragment_begin: ph, lights_fragment_maps: mh, lights_fragment_end: _h, logdepthbuf_fragment: gh, logdepthbuf_pars_fragment: vh, logdepthbuf_pars_vertex: xh, logdepthbuf_vertex: Mh, map_fragment: Sh, map_pars_fragment: Eh, map_particle_fragment: yh, map_particle_pars_fragment: bh, metalnessmap_fragment: Th, metalnessmap_pars_fragment: Ah, morphinstance_vertex: wh, morphcolor_vertex: Rh, morphnormal_vertex: Ch, morphtarget_pars_vertex: Ph, morphtarget_vertex: Dh, normal_fragment_begin: Lh, normal_fragment_maps: Uh, normal_pars_fragment: Ih, normal_pars_vertex: Nh, normal_vertex: Fh, normalmap_pars_fragment: Oh, clearcoat_normal_fragment_begin: Bh, clearcoat_normal_fragment_maps: zh, clearcoat_pars_fragment: Hh, iridescence_pars_fragment: Vh, opaque_fragment: kh, packing: Gh, premultiplied_alpha_fragment: Wh, project_vertex: Xh, dithering_fragment: Yh, dithering_pars_fragment: qh, roughnessmap_fragment: $h, roughnessmap_pars_fragment: jh, shadowmap_pars_fragment: Kh, shadowmap_pars_vertex: Zh, shadowmap_vertex: Jh, shadowmask_pars_fragment: Qh, skinbase_vertex: tu, skinning_pars_vertex: eu, skinning_vertex: nu, skinnormal_vertex: iu, specularmap_fragment: ru, specularmap_pars_fragment: su, tonemapping_fragment: au, tonemapping_pars_fragment: ou, transmission_fragment: lu, transmission_pars_fragment: cu, uv_pars_fragment: hu, uv_pars_vertex: uu, uv_vertex: du, worldpos_vertex: fu, background_vert: pu, background_frag: mu, backgroundCube_vert: _u, backgroundCube_frag: gu, cube_vert: vu, cube_frag: xu, depth_vert: Mu, depth_frag: Su, distanceRGBA_vert: Eu, distanceRGBA_frag: yu, equirect_vert: bu, equirect_frag: Tu, linedashed_vert: Au, linedashed_frag: wu, meshbasic_vert: Ru, meshbasic_frag: Cu, meshlambert_vert: Pu, meshlambert_frag: Du, meshmatcap_vert: Lu, meshmatcap_frag: Uu, meshnormal_vert: Iu, meshnormal_frag: Nu, meshphong_vert: Fu, meshphong_frag: Ou, meshphysical_vert: Bu, meshphysical_frag: zu, meshtoon_vert: Hu, meshtoon_frag: Vu, points_vert: ku, points_frag: Gu, shadow_vert: Wu, shadow_frag: Xu, sprite_vert: Yu, sprite_frag: qu }, et = { common: { diffuse: { value: new Wt(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new Ct() }, alphaMap: { value: null }, alphaMapTransform: { value: new Ct() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Ct() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new Ct() }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Ct() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Ct() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Ct() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Ct() }, normalScale: { value: new Pt(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new Ct() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Ct() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Ct() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Ct() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Wt(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Wt(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new Ct() }, alphaTest: { value: 0 }, uvTransform: { value: new Ct() } }, sprite: { diffuse: { value: new Wt(16777215) }, opacity: { value: 1 }, center: { value: new Pt(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new Ct() }, alphaMap: { value: null }, alphaMapTransform: { value: new Ct() }, alphaTest: { value: 0 } } }, Ve = { basic: { uniforms: ve([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.fog]), vertexShader: Lt.meshbasic_vert, fragmentShader: Lt.meshbasic_frag }, lambert: { uniforms: ve([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new Wt(0) } }]), vertexShader: Lt.meshlambert_vert, fragmentShader: Lt.meshlambert_frag }, phong: { uniforms: ve([et.common, et.specularmap, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.fog, et.lights, { emissive: { value: new Wt(0) }, specular: { value: new Wt(1118481) }, shininess: { value: 30 } }]), vertexShader: Lt.meshphong_vert, fragmentShader: Lt.meshphong_frag }, standard: { uniforms: ve([et.common, et.envmap, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.roughnessmap, et.metalnessmap, et.fog, et.lights, { emissive: { value: new Wt(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Lt.meshphysical_vert, fragmentShader: Lt.meshphysical_frag }, toon: { uniforms: ve([et.common, et.aomap, et.lightmap, et.emissivemap, et.bumpmap, et.normalmap, et.displacementmap, et.gradientmap, et.fog, et.lights, { emissive: { value: new Wt(0) } }]), vertexShader: Lt.meshtoon_vert, fragmentShader: Lt.meshtoon_frag }, matcap: { uniforms: ve([et.common, et.bumpmap, et.normalmap, et.displacementmap, et.fog, { matcap: { value: null } }]), vertexShader: Lt.meshmatcap_vert, fragmentShader: Lt.meshmatcap_frag }, points: { uniforms: ve([et.points, et.fog]), vertexShader: Lt.points_vert, fragmentShader: Lt.points_frag }, dashed: { uniforms: ve([et.common, et.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Lt.linedashed_vert, fragmentShader: Lt.linedashed_frag }, depth: { uniforms: ve([et.common, et.displacementmap]), vertexShader: Lt.depth_vert, fragmentShader: Lt.depth_frag }, normal: { uniforms: ve([et.common, et.bumpmap, et.normalmap, et.displacementmap, { opacity: { value: 1 } }]), vertexShader: Lt.meshnormal_vert, fragmentShader: Lt.meshnormal_frag }, sprite: { uniforms: ve([et.sprite, et.fog]), vertexShader: Lt.sprite_vert, fragmentShader: Lt.sprite_frag }, background: { uniforms: { uvTransform: { value: new Ct() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Lt.background_vert, fragmentShader: Lt.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new Ct() } }, vertexShader: Lt.backgroundCube_vert, fragmentShader: Lt.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Lt.cube_vert, fragmentShader: Lt.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Lt.equirect_vert, fragmentShader: Lt.equirect_frag }, distanceRGBA: { uniforms: ve([et.common, et.displacementmap, { referencePosition: { value: new F() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Lt.distanceRGBA_vert, fragmentShader: Lt.distanceRGBA_frag }, shadow: { uniforms: ve([et.lights, et.fog, { color: { value: new Wt(0) }, opacity: { value: 1 } }]), vertexShader: Lt.shadow_vert, fragmentShader: Lt.shadow_frag } };
Ve.physical = { uniforms: ve([Ve.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new Ct() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new Ct() }, clearcoatNormalScale: { value: new Pt(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new Ct() }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new Ct() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new Ct() }, sheen: { value: 0 }, sheenColor: { value: new Wt(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new Ct() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new Ct() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new Ct() }, transmissionSamplerSize: { value: new Pt() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new Ct() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Wt(0) }, specularColor: { value: new Wt(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new Ct() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new Ct() }, anisotropyVector: { value: new Pt() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new Ct() } }]), vertexShader: Lt.meshphysical_vert, fragmentShader: Lt.meshphysical_frag };
const $i = { r: 0, b: 0, g: 0 }, bn = new Xe(), $u = new ee();
function ju(i, t, e, n, r, s, a) {
  const o = new Wt(0);
  let l = s === true ? 0 : 1, c, h, f = null, d = 0, m = null;
  function v(b) {
    let y = b.isScene === true ? b.background : null;
    return y && y.isTexture && (y = (b.backgroundBlurriness > 0 ? e : t).get(y)), y;
  }
  function M(b) {
    let y = false;
    const U = v(b);
    U === null ? u(o, l) : U && U.isColor && (u(U, 1), y = true);
    const w = i.xr.getEnvironmentBlendMode();
    w === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : w === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || y) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(b, y) {
    const U = v(y);
    U && (U.isCubeTexture || U.mapping === lr) ? (h === void 0 && (h = new nn(new Ai(1, 1, 1), new gn({ name: "BackgroundCubeMaterial", uniforms: ui(Ve.backgroundCube.uniforms), vertexShader: Ve.backgroundCube.vertexShader, fragmentShader: Ve.backgroundCube.fragmentShader, side: ye, depthTest: false, depthWrite: false, fog: false })), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(w, P, I) {
      this.matrixWorld.copyPosition(I.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), r.update(h)), bn.copy(y.backgroundRotation), bn.x *= -1, bn.y *= -1, bn.z *= -1, U.isCubeTexture && U.isRenderTargetTexture === false && (bn.y *= -1, bn.z *= -1), h.material.uniforms.envMap.value = U, h.material.uniforms.flipEnvMap.value = U.isCubeTexture && U.isRenderTargetTexture === false ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4($u.makeRotationFromEuler(bn)), h.material.toneMapped = Gt.getTransfer(U.colorSpace) !== $t, (f !== U || d !== U.version || m !== i.toneMapping) && (h.material.needsUpdate = true, f = U, d = U.version, m = i.toneMapping), h.layers.enableAll(), b.unshift(h, h.geometry, h.material, 0, 0, null)) : U && U.isTexture && (c === void 0 && (c = new nn(new cr(2, 2), new gn({ name: "BackgroundMaterial", uniforms: ui(Ve.background.uniforms), vertexShader: Ve.background.vertexShader, fragmentShader: Ve.background.fragmentShader, side: _n, depthTest: false, depthWrite: false, fog: false })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), r.update(c)), c.material.uniforms.t2D.value = U, c.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, c.material.toneMapped = Gt.getTransfer(U.colorSpace) !== $t, U.matrixAutoUpdate === true && U.updateMatrix(), c.material.uniforms.uvTransform.value.copy(U.matrix), (f !== U || d !== U.version || m !== i.toneMapping) && (c.material.needsUpdate = true, f = U, d = U.version, m = i.toneMapping), c.layers.enableAll(), b.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(b, y) {
    b.getRGB($i, Ao(i)), n.buffers.color.setClear($i.r, $i.g, $i.b, y, a);
  }
  function T() {
    h !== void 0 && (h.geometry.dispose(), h.material.dispose()), c !== void 0 && (c.geometry.dispose(), c.material.dispose());
  }
  return { getClearColor: function() {
    return o;
  }, setClearColor: function(b, y = 1) {
    o.set(b), l = y, u(o, l);
  }, getClearAlpha: function() {
    return l;
  }, setClearAlpha: function(b) {
    l = b, u(o, l);
  }, render: M, addToRenderList: p, dispose: T };
}
function Ku(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = d(null);
  let s = r, a = false;
  function o(x, R, Y, z, W) {
    let K = false;
    const k = f(z, Y, R);
    s !== k && (s = k, c(s.object)), K = m(x, z, Y, W), K && v(x, z, Y, W), W !== null && t.update(W, i.ELEMENT_ARRAY_BUFFER), (K || a) && (a = false, y(x, R, Y, z), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(W).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(x) {
    return i.bindVertexArray(x);
  }
  function h(x) {
    return i.deleteVertexArray(x);
  }
  function f(x, R, Y) {
    const z = Y.wireframe === true;
    let W = n[x.id];
    W === void 0 && (W = {}, n[x.id] = W);
    let K = W[R.id];
    K === void 0 && (K = {}, W[R.id] = K);
    let k = K[z];
    return k === void 0 && (k = d(l()), K[z] = k), k;
  }
  function d(x) {
    const R = [], Y = [], z = [];
    for (let W = 0; W < e; W++) R[W] = 0, Y[W] = 0, z[W] = 0;
    return { geometry: null, program: null, wireframe: false, newAttributes: R, enabledAttributes: Y, attributeDivisors: z, object: x, attributes: {}, index: null };
  }
  function m(x, R, Y, z) {
    const W = s.attributes, K = R.attributes;
    let k = 0;
    const Q = Y.getAttributes();
    for (const V in Q) if (Q[V].location >= 0) {
      const ht = W[V];
      let gt = K[V];
      if (gt === void 0 && (V === "instanceMatrix" && x.instanceMatrix && (gt = x.instanceMatrix), V === "instanceColor" && x.instanceColor && (gt = x.instanceColor)), ht === void 0 || ht.attribute !== gt || gt && ht.data !== gt.data) return true;
      k++;
    }
    return s.attributesNum !== k || s.index !== z;
  }
  function v(x, R, Y, z) {
    const W = {}, K = R.attributes;
    let k = 0;
    const Q = Y.getAttributes();
    for (const V in Q) if (Q[V].location >= 0) {
      let ht = K[V];
      ht === void 0 && (V === "instanceMatrix" && x.instanceMatrix && (ht = x.instanceMatrix), V === "instanceColor" && x.instanceColor && (ht = x.instanceColor));
      const gt = {};
      gt.attribute = ht, ht && ht.data && (gt.data = ht.data), W[V] = gt, k++;
    }
    s.attributes = W, s.attributesNum = k, s.index = z;
  }
  function M() {
    const x = s.newAttributes;
    for (let R = 0, Y = x.length; R < Y; R++) x[R] = 0;
  }
  function p(x) {
    u(x, 0);
  }
  function u(x, R) {
    const Y = s.newAttributes, z = s.enabledAttributes, W = s.attributeDivisors;
    Y[x] = 1, z[x] === 0 && (i.enableVertexAttribArray(x), z[x] = 1), W[x] !== R && (i.vertexAttribDivisor(x, R), W[x] = R);
  }
  function T() {
    const x = s.newAttributes, R = s.enabledAttributes;
    for (let Y = 0, z = R.length; Y < z; Y++) R[Y] !== x[Y] && (i.disableVertexAttribArray(Y), R[Y] = 0);
  }
  function b(x, R, Y, z, W, K, k) {
    k === true ? i.vertexAttribIPointer(x, R, Y, W, K) : i.vertexAttribPointer(x, R, Y, z, W, K);
  }
  function y(x, R, Y, z) {
    M();
    const W = z.attributes, K = Y.getAttributes(), k = R.defaultAttributeValues;
    for (const Q in K) {
      const V = K[Q];
      if (V.location >= 0) {
        let rt = W[Q];
        if (rt === void 0 && (Q === "instanceMatrix" && x.instanceMatrix && (rt = x.instanceMatrix), Q === "instanceColor" && x.instanceColor && (rt = x.instanceColor)), rt !== void 0) {
          const ht = rt.normalized, gt = rt.itemSize, Ut = t.get(rt);
          if (Ut === void 0) continue;
          const Kt = Ut.buffer, X = Ut.type, tt = Ut.bytesPerElement, mt = X === i.INT || X === i.UNSIGNED_INT || rt.gpuType === Is;
          if (rt.isInterleavedBufferAttribute) {
            const st = rt.data, yt = st.stride, wt = rt.offset;
            if (st.isInstancedInterleavedBuffer) {
              for (let It = 0; It < V.locationSize; It++) u(V.location + It, st.meshPerAttribute);
              x.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = st.meshPerAttribute * st.count);
            } else for (let It = 0; It < V.locationSize; It++) p(V.location + It);
            i.bindBuffer(i.ARRAY_BUFFER, Kt);
            for (let It = 0; It < V.locationSize; It++) b(V.location + It, gt / V.locationSize, X, ht, yt * tt, (wt + gt / V.locationSize * It) * tt, mt);
          } else {
            if (rt.isInstancedBufferAttribute) {
              for (let st = 0; st < V.locationSize; st++) u(V.location + st, rt.meshPerAttribute);
              x.isInstancedMesh !== true && z._maxInstanceCount === void 0 && (z._maxInstanceCount = rt.meshPerAttribute * rt.count);
            } else for (let st = 0; st < V.locationSize; st++) p(V.location + st);
            i.bindBuffer(i.ARRAY_BUFFER, Kt);
            for (let st = 0; st < V.locationSize; st++) b(V.location + st, gt / V.locationSize, X, ht, gt * tt, gt / V.locationSize * st * tt, mt);
          }
        } else if (k !== void 0) {
          const ht = k[Q];
          if (ht !== void 0) switch (ht.length) {
            case 2:
              i.vertexAttrib2fv(V.location, ht);
              break;
            case 3:
              i.vertexAttrib3fv(V.location, ht);
              break;
            case 4:
              i.vertexAttrib4fv(V.location, ht);
              break;
            default:
              i.vertexAttrib1fv(V.location, ht);
          }
        }
      }
    }
    T();
  }
  function U() {
    I();
    for (const x in n) {
      const R = n[x];
      for (const Y in R) {
        const z = R[Y];
        for (const W in z) h(z[W].object), delete z[W];
        delete R[Y];
      }
      delete n[x];
    }
  }
  function w(x) {
    if (n[x.id] === void 0) return;
    const R = n[x.id];
    for (const Y in R) {
      const z = R[Y];
      for (const W in z) h(z[W].object), delete z[W];
      delete R[Y];
    }
    delete n[x.id];
  }
  function P(x) {
    for (const R in n) {
      const Y = n[R];
      if (Y[x.id] === void 0) continue;
      const z = Y[x.id];
      for (const W in z) h(z[W].object), delete z[W];
      delete Y[x.id];
    }
  }
  function I() {
    S(), a = true, s !== r && (s = r, c(s.object));
  }
  function S() {
    r.geometry = null, r.program = null, r.wireframe = false;
  }
  return { setup: o, reset: I, resetDefaultState: S, dispose: U, releaseStatesOfGeometry: w, releaseStatesOfProgram: P, initAttributes: M, enableAttribute: p, disableUnusedAttributes: T };
}
function Zu(i, t, e) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function a(c, h, f) {
    f !== 0 && (i.drawArraysInstanced(n, c, h, f), e.update(h, n, f));
  }
  function o(c, h, f) {
    if (f === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, f);
    let m = 0;
    for (let v = 0; v < f; v++) m += h[v];
    e.update(m, n, 1);
  }
  function l(c, h, f, d) {
    if (f === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let v = 0; v < c.length; v++) a(c[v], h[v], d[v]);
    else {
      m.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, f);
      let v = 0;
      for (let M = 0; M < f; M++) v += h[M] * d[M];
      e.update(v, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Ju(i, t, e, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === true) {
      const P = t.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function a(P) {
    return !(P !== ze && n.convert(P) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(P) {
    const I = P === Ei && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(P !== sn && n.convert(P) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && P !== tn && !I);
  }
  function l(P) {
    if (P === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0) return "highp";
      P = "mediump";
    }
    return P === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const f = e.logarithmicDepthBuffer === true, d = e.reverseDepthBuffer === true && t.has("EXT_clip_control"), m = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), v = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), M = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), T = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), b = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), U = v > 0, w = i.getParameter(i.MAX_SAMPLES);
  return { isWebGL2: true, getMaxAnisotropy: s, getMaxPrecision: l, textureFormatReadable: a, textureTypeReadable: o, precision: c, logarithmicDepthBuffer: f, reverseDepthBuffer: d, maxTextures: m, maxVertexTextures: v, maxTextureSize: M, maxCubemapSize: p, maxAttributes: u, maxVertexUniforms: T, maxVaryings: b, maxFragmentUniforms: y, vertexTextures: U, maxSamples: w };
}
function Qu(i) {
  const t = this;
  let e = null, n = 0, r = false, s = false;
  const a = new dn(), o = new Ct(), l = { value: null, needsUpdate: false };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, d) {
    const m = f.length !== 0 || d || n !== 0 || r;
    return r = d, n = f.length, m;
  }, this.beginShadows = function() {
    s = true, h(null);
  }, this.endShadows = function() {
    s = false;
  }, this.setGlobalState = function(f, d) {
    e = h(f, d, 0);
  }, this.setState = function(f, d, m) {
    const v = f.clippingPlanes, M = f.clipIntersection, p = f.clipShadows, u = i.get(f);
    if (!r || v === null || v.length === 0 || s && !p) s ? h(null) : c();
    else {
      const T = s ? 0 : n, b = T * 4;
      let y = u.clippingState || null;
      l.value = y, y = h(v, d, b, m);
      for (let U = 0; U !== b; ++U) y[U] = e[U];
      u.clippingState = y, this.numIntersection = M ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(f, d, m, v) {
    const M = f !== null ? f.length : 0;
    let p = null;
    if (M !== 0) {
      if (p = l.value, v !== true || p === null) {
        const u = m + M * 4, T = d.matrixWorldInverse;
        o.getNormalMatrix(T), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let b = 0, y = m; b !== M; ++b, y += 4) a.copy(f[b]).applyMatrix4(T, o), a.normal.toArray(p, y), p[y + 3] = a.constant;
      }
      l.value = p, l.needsUpdate = true;
    }
    return t.numPlanes = M, t.numIntersection = 0, p;
  }
}
function td(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === ts ? a.mapping = ai : o === es && (a.mapping = oi), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === ts || o === es) if (t.has(a)) {
        const l = t.get(a).texture;
        return e(l, a.mapping);
      } else {
        const l = a.image;
        if (l && l.height > 0) {
          const c = new rc(l.height);
          return c.fromEquirectangularTexture(i, a), t.set(a, c), a.addEventListener("dispose", r), e(c.texture, a.mapping);
        } else return null;
      }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = t.get(o);
    l !== void 0 && (t.delete(o), l.dispose());
  }
  function s() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return { get: n, dispose: s };
}
const ti = 4, Pa = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Rn = 20, Fr = new Do(), Da = new Wt();
let Or = null, Br = 0, zr = 0, Hr = false;
const An = (1 + Math.sqrt(5)) / 2, Zn = 1 / An, La = [new F(-An, Zn, 0), new F(An, Zn, 0), new F(-Zn, 0, An), new F(Zn, 0, An), new F(0, An, -Zn), new F(0, An, Zn), new F(-1, 1, -1), new F(1, 1, -1), new F(-1, 1, 1), new F(1, 1, 1)];
class Ua {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(t, e = 0, n = 0.1, r = 100) {
    Or = this._renderer.getRenderTarget(), Br = this._renderer.getActiveCubeFace(), zr = this._renderer.getActiveMipmapLevel(), Hr = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = true, this._sceneToCubeUV(t, n, r, s), e > 0 && this._blur(s, 0, 0, e), this._applyPMREM(s), this._cleanup(s), s;
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Fa(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Na(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(Or, Br, zr), this._renderer.xr.enabled = Hr, t.scissorTest = false, ji(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === ai || t.mapping === oi ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Or = this._renderer.getRenderTarget(), Br = this._renderer.getActiveCubeFace(), zr = this._renderer.getActiveMipmapLevel(), Hr = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = { magFilter: ke, minFilter: ke, generateMipmaps: false, type: Ei, format: ze, colorSpace: hi, depthBuffer: false }, r = Ia(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ia(t, e, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = ed(s)), this._blurMaterial = nd(s, t, e);
    }
    return r;
  }
  _compileMaterial(t) {
    const e = new nn(this._lodPlanes[0], t);
    this._renderer.compile(e, Fr);
  }
  _sceneToCubeUV(t, e, n, r) {
    const o = new Oe(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, f = h.autoClear, d = h.toneMapping;
    h.getClearColor(Da), h.toneMapping = mn, h.autoClear = false;
    const m = new yo({ name: "PMREM.Background", side: ye, depthWrite: false, depthTest: false }), v = new nn(new Ai(), m);
    let M = false;
    const p = t.background;
    p ? p.isColor && (m.color.copy(p), t.background = null, M = true) : (m.color.copy(Da), M = true);
    for (let u = 0; u < 6; u++) {
      const T = u % 3;
      T === 0 ? (o.up.set(0, l[u], 0), o.lookAt(c[u], 0, 0)) : T === 1 ? (o.up.set(0, 0, l[u]), o.lookAt(0, c[u], 0)) : (o.up.set(0, l[u], 0), o.lookAt(0, 0, c[u]));
      const b = this._cubeSize;
      ji(r, T * b, u > 2 ? b : 0, b, b), h.setRenderTarget(r), M && h.render(v, o), h.render(t, o);
    }
    v.geometry.dispose(), v.material.dispose(), h.toneMapping = d, h.autoClear = f, t.background = p;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, r = t.mapping === ai || t.mapping === oi;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Fa()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === false ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Na());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = new nn(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    ji(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, Fr);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = false;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = La[(r - s - 1) % La.length];
      this._blur(t, s - 1, s, a, o);
    }
    e.autoClear = n;
  }
  _blur(t, e, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(t, a, e, n, r, "latitudinal", s), this._halfBlur(a, t, n, n, r, "longitudinal", s);
  }
  _halfBlur(t, e, n, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
    const h = 3, f = new nn(this._lodPlanes[r], c), d = c.uniforms, m = this._sizeLods[n] - 1, v = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * Rn - 1), M = s / v, p = isFinite(s) ? 1 + Math.floor(h * M) : Rn;
    p > Rn && console.warn("sigmaRadians, ".concat(s, ", is too large and will clip, as it requested ").concat(p, " samples when the maximum is set to ").concat(Rn));
    const u = [];
    let T = 0;
    for (let P = 0; P < Rn; ++P) {
      const I = P / M, S = Math.exp(-I * I / 2);
      u.push(S), P === 0 ? T += S : P < p && (T += 2 * S);
    }
    for (let P = 0; P < u.length; P++) u[P] = u[P] / T;
    d.envMap.value = t.texture, d.samples.value = p, d.weights.value = u, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: b } = this;
    d.dTheta.value = v, d.mipInt.value = b - n;
    const y = this._sizeLods[r], U = 3 * y * (r > b - ti ? r - b + ti : 0), w = 4 * (this._cubeSize - y);
    ji(e, U, w, 3 * y, 2 * y), l.setRenderTarget(e), l.render(f, Fr);
  }
}
function ed(i) {
  const t = [], e = [], n = [];
  let r = i;
  const s = i - ti + 1 + Pa.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let l = 1 / o;
    a > i - ti ? l = Pa[a - i + ti - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, f = 1 + c, d = [h, h, f, h, f, f, h, h, f, f, h, f], m = 6, v = 6, M = 3, p = 2, u = 1, T = new Float32Array(M * v * m), b = new Float32Array(p * v * m), y = new Float32Array(u * v * m);
    for (let w = 0; w < m; w++) {
      const P = w % 3 * 2 / 3 - 1, I = w > 2 ? 0 : -1, S = [P, I, 0, P + 2 / 3, I, 0, P + 2 / 3, I + 1, 0, P, I, 0, P + 2 / 3, I + 1, 0, P, I + 1, 0];
      T.set(S, M * v * w), b.set(d, p * v * w);
      const x = [w, w, w, w, w, w];
      y.set(x, u * v * w);
    }
    const U = new Fn();
    U.setAttribute("position", new Ge(T, M)), U.setAttribute("uv", new Ge(b, p)), U.setAttribute("faceIndex", new Ge(y, u)), t.push(U), r > ti && r--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function Ia(i, t, e) {
  const n = new Un(i, t, e);
  return n.texture.mapping = lr, n.texture.name = "PMREM.cubeUv", n.scissorTest = true, n;
}
function ji(i, t, e, n, r) {
  i.viewport.set(t, e, n, r), i.scissor.set(t, e, n, r);
}
function nd(i, t, e) {
  const n = new Float32Array(Rn), r = new F(0, 1, 0);
  return new gn({ name: "SphericalGaussianBlur", defines: { n: Rn, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: "".concat(i, ".0") }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: false }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: r } }, vertexShader: Ws(), fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform int samples;\n			uniform float weights[ n ];\n			uniform bool latitudinal;\n			uniform float dTheta;\n			uniform float mipInt;\n			uniform vec3 poleAxis;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			vec3 getSample( float theta, vec3 axis ) {\n\n				float cosTheta = cos( theta );\n				// Rodrigues' axis-angle rotation\n				vec3 sampleDirection = vOutputDirection * cosTheta\n					+ cross( axis, vOutputDirection ) * sin( theta )\n					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n				return bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n			}\n\n			void main() {\n\n				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n				}\n\n				axis = normalize( axis );\n\n				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n				for ( int i = 1; i < n; i++ ) {\n\n					if ( i >= samples ) {\n\n						break;\n\n					}\n\n					float theta = dTheta * float( i );\n					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n				}\n\n			}\n		", blending: pn, depthTest: false, depthWrite: false });
}
function Na() {
  return new gn({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: Ws(), fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		", blending: pn, depthTest: false, depthWrite: false });
}
function Fa() {
  return new gn({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: Ws(), fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		", blending: pn, depthTest: false, depthWrite: false });
}
function Ws() {
  return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute float faceIndex;\n\n		varying vec3 vOutputDirection;\n\n		// RH coordinate system; PMREM face-indexing convention\n		vec3 getDirection( vec2 uv, float face ) {\n\n			uv = 2.0 * uv - 1.0;\n\n			vec3 direction = vec3( uv, 1.0 );\n\n			if ( face == 0.0 ) {\n\n				direction = direction.zyx; // ( 1, v, u ) pos x\n\n			} else if ( face == 1.0 ) {\n\n				direction = direction.xzy;\n				direction.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n			} else if ( face == 2.0 ) {\n\n				direction.x *= -1.0; // ( -u, v, 1 ) pos z\n\n			} else if ( face == 3.0 ) {\n\n				direction = direction.zyx;\n				direction.xz *= -1.0; // ( -1, v, -u ) neg x\n\n			} else if ( face == 4.0 ) {\n\n				direction = direction.xzy;\n				direction.xy *= -1.0; // ( -u, -1, v ) neg y\n\n			} else if ( face == 5.0 ) {\n\n				direction.z *= -1.0; // ( u, v, -1 ) neg z\n\n			}\n\n			return direction;\n\n		}\n\n		void main() {\n\n			vOutputDirection = getDirection( uv, faceIndex );\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
}
function id(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === ts || l === es, h = l === ai || l === oi;
      if (c || h) {
        let f = t.get(o);
        const d = f !== void 0 ? f.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d) return e === null && (e = new Ua(i)), f = c ? e.fromEquirectangular(o, f) : e.fromCubemap(o, f), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), f.texture;
        if (f !== void 0) return f.texture;
        {
          const m = o.image;
          return c && m && m.height > 0 || h && m && r(m) ? (e === null && (e = new Ua(i)), f = c ? e.fromEquirectangular(o) : e.fromCubemap(o), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), o.addEventListener("dispose", s), f.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++) o[h] !== void 0 && l++;
    return l === c;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function a() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return { get: n, dispose: a };
}
function rd(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0) return t[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return t[n] = r, r;
  }
  return { has: function(n) {
    return e(n) !== null;
  }, init: function() {
    e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
  }, get: function(n) {
    const r = e(n);
    return r === null && Jn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
  } };
}
function sd(i, t, e, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const d = f.target;
    d.index !== null && t.remove(d.index);
    for (const v in d.attributes) t.remove(d.attributes[v]);
    d.removeEventListener("dispose", a), delete r[d.id];
    const m = s.get(d);
    m && (t.remove(m), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === true && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function o(f, d) {
    return r[d.id] === true || (d.addEventListener("dispose", a), r[d.id] = true, e.memory.geometries++), d;
  }
  function l(f) {
    const d = f.attributes;
    for (const m in d) t.update(d[m], i.ARRAY_BUFFER);
  }
  function c(f) {
    const d = [], m = f.index, v = f.attributes.position;
    let M = 0;
    if (m !== null) {
      const T = m.array;
      M = m.version;
      for (let b = 0, y = T.length; b < y; b += 3) {
        const U = T[b + 0], w = T[b + 1], P = T[b + 2];
        d.push(U, w, w, P, P, U);
      }
    } else if (v !== void 0) {
      const T = v.array;
      M = v.version;
      for (let b = 0, y = T.length / 3 - 1; b < y; b += 3) {
        const U = b + 0, w = b + 1, P = b + 2;
        d.push(U, w, w, P, P, U);
      }
    } else return;
    const p = new (xo(d) ? To : bo)(d, 1);
    p.version = M;
    const u = s.get(f);
    u && t.remove(u), s.set(f, p);
  }
  function h(f) {
    const d = s.get(f);
    if (d) {
      const m = f.index;
      m !== null && d.version < m.version && c(f);
    } else c(f);
    return s.get(f);
  }
  return { get: o, update: l, getWireframeAttribute: h };
}
function ad(i, t, e) {
  let n;
  function r(d) {
    n = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function l(d, m) {
    i.drawElements(n, m, s, d * a), e.update(m, n, 1);
  }
  function c(d, m, v) {
    v !== 0 && (i.drawElementsInstanced(n, m, s, d * a, v), e.update(m, n, v));
  }
  function h(d, m, v) {
    if (v === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, m, 0, s, d, 0, v);
    let p = 0;
    for (let u = 0; u < v; u++) p += m[u];
    e.update(p, n, 1);
  }
  function f(d, m, v, M) {
    if (v === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let u = 0; u < d.length; u++) c(d[u] / a, m[u], M[u]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, m, 0, s, d, 0, M, 0, v);
      let u = 0;
      for (let T = 0; T < v; T++) u += m[T] * M[T];
      e.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = f;
}
function od(i) {
  const t = { geometries: 0, textures: 0 }, e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function n(s, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (s / 3);
        break;
      case i.LINES:
        e.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * s;
        break;
      case i.POINTS:
        e.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return { memory: t, render: e, programs: null, autoReset: true, reset: r, update: n };
}
function ld(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), r = new re();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== f) {
      let S = function() {
        P.dispose(), n.delete(o), o.removeEventListener("dispose", S);
      };
      d !== void 0 && d.texture.dispose();
      const m = o.morphAttributes.position !== void 0, v = o.morphAttributes.normal !== void 0, M = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], u = o.morphAttributes.normal || [], T = o.morphAttributes.color || [];
      let b = 0;
      m === true && (b = 1), v === true && (b = 2), M === true && (b = 3);
      let y = o.attributes.position.count * b, U = 1;
      y > t.maxTextureSize && (U = Math.ceil(y / t.maxTextureSize), y = t.maxTextureSize);
      const w = new Float32Array(y * U * 4 * f), P = new So(w, y, U, f);
      P.type = tn, P.needsUpdate = true;
      const I = b * 4;
      for (let x = 0; x < f; x++) {
        const R = p[x], Y = u[x], z = T[x], W = y * U * 4 * x;
        for (let K = 0; K < R.count; K++) {
          const k = K * I;
          m === true && (r.fromBufferAttribute(R, K), w[W + k + 0] = r.x, w[W + k + 1] = r.y, w[W + k + 2] = r.z, w[W + k + 3] = 0), v === true && (r.fromBufferAttribute(Y, K), w[W + k + 4] = r.x, w[W + k + 5] = r.y, w[W + k + 6] = r.z, w[W + k + 7] = 0), M === true && (r.fromBufferAttribute(z, K), w[W + k + 8] = r.x, w[W + k + 9] = r.y, w[W + k + 10] = r.z, w[W + k + 11] = z.itemSize === 4 ? r.w : 1);
        }
      }
      d = { count: f, texture: P, size: new Pt(y, U) }, n.set(o, d), o.addEventListener("dispose", S);
    }
    if (a.isInstancedMesh === true && a.morphTexture !== null) l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let m = 0;
      for (let M = 0; M < c.length; M++) m += c[M];
      const v = o.morphTargetsRelative ? 1 : 1 - m;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", v), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return { update: s };
}
function cd(i, t, e, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, f = t.get(l, h);
    if (r.get(f) !== c && (t.update(f), r.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === false && l.addEventListener("dispose", o), r.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      r.get(d) !== c && (d.update(), r.set(d, c));
    }
    return f;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return { update: s, dispose: a };
}
const Uo = new xe(), Oa = new Co(1, 1), Io = new So(), No = new kl(), Fo = new Ro(), Ba = [], za = [], Ha = new Float32Array(16), Va = new Float32Array(9), ka = new Float32Array(4);
function di(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = t * e;
  let s = Ba[r];
  if (s === void 0 && (s = new Float32Array(r), Ba[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a) o += e, i[a].toArray(s, o);
  }
  return s;
}
function ce(i, t) {
  if (i.length !== t.length) return false;
  for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return false;
  return true;
}
function he(i, t) {
  for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
}
function hr(i, t) {
  let e = za[t];
  e === void 0 && (e = new Int32Array(t), za[t] = e);
  for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
  return e;
}
function hd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function ud(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ce(e, t)) return;
    i.uniform2fv(this.addr, t), he(e, t);
  }
}
function dd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0) (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (ce(e, t)) return;
    i.uniform3fv(this.addr, t), he(e, t);
  }
}
function fd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ce(e, t)) return;
    i.uniform4fv(this.addr, t), he(e, t);
  }
}
function pd(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ce(e, t)) return;
    i.uniformMatrix2fv(this.addr, false, t), he(e, t);
  } else {
    if (ce(e, n)) return;
    ka.set(n), i.uniformMatrix2fv(this.addr, false, ka), he(e, n);
  }
}
function md(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ce(e, t)) return;
    i.uniformMatrix3fv(this.addr, false, t), he(e, t);
  } else {
    if (ce(e, n)) return;
    Va.set(n), i.uniformMatrix3fv(this.addr, false, Va), he(e, n);
  }
}
function _d(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ce(e, t)) return;
    i.uniformMatrix4fv(this.addr, false, t), he(e, t);
  } else {
    if (ce(e, n)) return;
    Ha.set(n), i.uniformMatrix4fv(this.addr, false, Ha), he(e, n);
  }
}
function gd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function vd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ce(e, t)) return;
    i.uniform2iv(this.addr, t), he(e, t);
  }
}
function xd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ce(e, t)) return;
    i.uniform3iv(this.addr, t), he(e, t);
  }
}
function Md(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ce(e, t)) return;
    i.uniform4iv(this.addr, t), he(e, t);
  }
}
function Sd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function Ed(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ce(e, t)) return;
    i.uniform2uiv(this.addr, t), he(e, t);
  }
}
function yd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ce(e, t)) return;
    i.uniform3uiv(this.addr, t), he(e, t);
  }
}
function bd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ce(e, t)) return;
    i.uniform4uiv(this.addr, t), he(e, t);
  }
}
function Td(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (Oa.compareFunction = vo, s = Oa) : s = Uo, e.setTexture2D(t || s, r);
}
function Ad(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture3D(t || No, r);
}
function wd(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTextureCube(t || Fo, r);
}
function Rd(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture2DArray(t || Io, r);
}
function Cd(i) {
  switch (i) {
    case 5126:
      return hd;
    case 35664:
      return ud;
    case 35665:
      return dd;
    case 35666:
      return fd;
    case 35674:
      return pd;
    case 35675:
      return md;
    case 35676:
      return _d;
    case 5124:
    case 35670:
      return gd;
    case 35667:
    case 35671:
      return vd;
    case 35668:
    case 35672:
      return xd;
    case 35669:
    case 35673:
      return Md;
    case 5125:
      return Sd;
    case 36294:
      return Ed;
    case 36295:
      return yd;
    case 36296:
      return bd;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Td;
    case 35679:
    case 36299:
    case 36307:
      return Ad;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return wd;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Rd;
  }
}
function Pd(i, t) {
  i.uniform1fv(this.addr, t);
}
function Dd(i, t) {
  const e = di(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function Ld(i, t) {
  const e = di(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function Ud(i, t) {
  const e = di(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Id(i, t) {
  const e = di(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, false, e);
}
function Nd(i, t) {
  const e = di(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, false, e);
}
function Fd(i, t) {
  const e = di(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, false, e);
}
function Od(i, t) {
  i.uniform1iv(this.addr, t);
}
function Bd(i, t) {
  i.uniform2iv(this.addr, t);
}
function zd(i, t) {
  i.uniform3iv(this.addr, t);
}
function Hd(i, t) {
  i.uniform4iv(this.addr, t);
}
function Vd(i, t) {
  i.uniform1uiv(this.addr, t);
}
function kd(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Gd(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Wd(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Xd(i, t, e) {
  const n = this.cache, r = t.length, s = hr(e, r);
  ce(n, s) || (i.uniform1iv(this.addr, s), he(n, s));
  for (let a = 0; a !== r; ++a) e.setTexture2D(t[a] || Uo, s[a]);
}
function Yd(i, t, e) {
  const n = this.cache, r = t.length, s = hr(e, r);
  ce(n, s) || (i.uniform1iv(this.addr, s), he(n, s));
  for (let a = 0; a !== r; ++a) e.setTexture3D(t[a] || No, s[a]);
}
function qd(i, t, e) {
  const n = this.cache, r = t.length, s = hr(e, r);
  ce(n, s) || (i.uniform1iv(this.addr, s), he(n, s));
  for (let a = 0; a !== r; ++a) e.setTextureCube(t[a] || Fo, s[a]);
}
function $d(i, t, e) {
  const n = this.cache, r = t.length, s = hr(e, r);
  ce(n, s) || (i.uniform1iv(this.addr, s), he(n, s));
  for (let a = 0; a !== r; ++a) e.setTexture2DArray(t[a] || Io, s[a]);
}
function jd(i) {
  switch (i) {
    case 5126:
      return Pd;
    case 35664:
      return Dd;
    case 35665:
      return Ld;
    case 35666:
      return Ud;
    case 35674:
      return Id;
    case 35675:
      return Nd;
    case 35676:
      return Fd;
    case 5124:
    case 35670:
      return Od;
    case 35667:
    case 35671:
      return Bd;
    case 35668:
    case 35672:
      return zd;
    case 35669:
    case 35673:
      return Hd;
    case 5125:
      return Vd;
    case 36294:
      return kd;
    case 36295:
      return Gd;
    case 36296:
      return Wd;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Xd;
    case 35679:
    case 36299:
    case 36307:
      return Yd;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return qd;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return $d;
  }
}
class Kd {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = Cd(e.type);
  }
}
class Zd {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = jd(e.type);
  }
}
class Jd {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(t, e[o.id], n);
    }
  }
}
const Vr = /(\w+)(\])?(\[|\.)?/g;
function Ga(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function Qd(i, t, e) {
  const n = i.name, r = n.length;
  for (Vr.lastIndex = 0; ; ) {
    const s = Vr.exec(n), a = Vr.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      Ga(e, c === void 0 ? new Kd(o, i, t) : new Zd(o, i, t));
      break;
    } else {
      let f = e.map[o];
      f === void 0 && (f = new Jd(o), Ga(e, f)), e = f;
    }
  }
}
class rr {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = t.getActiveUniform(e, r), a = t.getUniformLocation(e, s.name);
      Qd(s, a, this);
    }
  }
  setValue(t, e, n, r) {
    const s = this.map[e];
    s !== void 0 && s.setValue(t, n, r);
  }
  setOptional(t, e, n) {
    const r = e[n];
    r !== void 0 && this.setValue(t, n, r);
  }
  static upload(t, e, n, r) {
    for (let s = 0, a = e.length; s !== a; ++s) {
      const o = e[s], l = n[o.id];
      l.needsUpdate !== false && o.setValue(t, l.value, r);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function Wa(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const tf = 37297;
let ef = 0;
function nf(i, t) {
  const e = i.split("\n"), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, e.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push("".concat(o === t ? ">" : " ", " ").concat(o, ": ").concat(e[a]));
  }
  return n.join("\n");
}
const Xa = new Ct();
function rf(i) {
  Gt._getMatrix(Xa, Gt.workingColorSpace, i);
  const t = "mat3( ".concat(Xa.elements.map((e) => e.toFixed(4)), " )");
  switch (Gt.getTransfer(i)) {
    case sr:
      return [t, "LinearTransferOETF"];
    case $t:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function Ya(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), r = i.getShaderInfoLog(t).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return e.toUpperCase() + "\n\n" + r + "\n\n" + nf(i.getShaderSource(t), a);
  } else return r;
}
function sf(i, t) {
  const e = rf(t);
  return ["vec4 ".concat(i, "( vec4 value ) {"), "	return ".concat(e[1], "( vec4( value.rgb * ").concat(e[0], ", value.a ) );"), "}"].join("\n");
}
function af(i, t) {
  let e;
  switch (t) {
    case fl:
      e = "Linear";
      break;
    case pl:
      e = "Reinhard";
      break;
    case ml:
      e = "Cineon";
      break;
    case _l:
      e = "ACESFilmic";
      break;
    case vl:
      e = "AgX";
      break;
    case xl:
      e = "Neutral";
      break;
    case gl:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const Ki = new F();
function of() {
  Gt.getLuminanceCoefficients(Ki);
  const i = Ki.x.toFixed(4), t = Ki.y.toFixed(4), e = Ki.z.toFixed(4);
  return ["float luminance( const in vec3 rgb ) {", "	const vec3 weights = vec3( ".concat(i, ", ").concat(t, ", ").concat(e, " );"), "	return dot( weights, rgb );", "}"].join("\n");
}
function lf(i) {
  return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(xi).join("\n");
}
function cf(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== false && t.push("#define " + e + " " + n);
  }
  return t.join("\n");
}
function hf(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), e[a] = { type: s.type, location: i.getAttribLocation(t, a), locationSize: o };
  }
  return e;
}
function xi(i) {
  return i !== "";
}
function qa(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function $a(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const uf = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ls(i) {
  return i.replace(uf, ff);
}
const df = /* @__PURE__ */ new Map();
function ff(i, t) {
  let e = Lt[t];
  if (e === void 0) {
    const n = df.get(t);
    if (n !== void 0) e = Lt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return Ls(e);
}
const pf = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ja(i) {
  return i.replace(pf, mf);
}
function mf(i, t, e, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(e); s++) r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Ka(i) {
  let t = "precision ".concat(i.precision, " float;\n	precision ").concat(i.precision, " int;\n	precision ").concat(i.precision, " sampler2D;\n	precision ").concat(i.precision, " samplerCube;\n	precision ").concat(i.precision, " sampler3D;\n	precision ").concat(i.precision, " sampler2DArray;\n	precision ").concat(i.precision, " sampler2DShadow;\n	precision ").concat(i.precision, " samplerCubeShadow;\n	precision ").concat(i.precision, " sampler2DArrayShadow;\n	precision ").concat(i.precision, " isampler2D;\n	precision ").concat(i.precision, " isampler3D;\n	precision ").concat(i.precision, " isamplerCube;\n	precision ").concat(i.precision, " isampler2DArray;\n	precision ").concat(i.precision, " usampler2D;\n	precision ").concat(i.precision, " usampler3D;\n	precision ").concat(i.precision, " usamplerCube;\n	precision ").concat(i.precision, " usampler2DArray;\n	");
  return i.precision === "highp" ? t += "\n#define HIGH_PRECISION" : i.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : i.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
function _f(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === io ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Yo ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === Je && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function gf(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap) switch (i.envMapMode) {
    case ai:
    case oi:
      t = "ENVMAP_TYPE_CUBE";
      break;
    case lr:
      t = "ENVMAP_TYPE_CUBE_UV";
      break;
  }
  return t;
}
function vf(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap) switch (i.envMapMode) {
    case oi:
      t = "ENVMAP_MODE_REFRACTION";
      break;
  }
  return t;
}
function xf(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap) switch (i.combine) {
    case ro:
      t = "ENVMAP_BLENDING_MULTIPLY";
      break;
    case ul:
      t = "ENVMAP_BLENDING_MIX";
      break;
    case dl:
      t = "ENVMAP_BLENDING_ADD";
      break;
  }
  return t;
}
function Mf(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function Sf(i, t, e, n) {
  const r = i.getContext(), s = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = _f(e), c = gf(e), h = vf(e), f = xf(e), d = Mf(e), m = lf(e), v = cf(s), M = r.createProgram();
  let p, u, T = e.glslVersion ? "#version " + e.glslVersion + "\n" : "";
  e.isRawShaderMaterial ? (p = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v].filter(xi).join("\n"), p.length > 0 && (p += "\n"), u = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v].filter(xi).join("\n"), u.length > 0 && (u += "\n")) : (p = [Ka(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v, e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", e.batching ? "#define USE_BATCHING" : "", e.batchingColor ? "#define USE_BATCHING_COLOR" : "", e.instancing ? "#define USE_INSTANCING" : "", e.instancingColor ? "#define USE_INSTANCING_COLOR" : "", e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.map ? "#define USE_MAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + h : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.mapUv ? "#define MAP_UV " + e.mapUv : "", e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "", e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "", e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "", e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "", e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "", e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "", e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "", e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "", e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "", e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "", e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "", e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "", e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "", e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "", e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "", e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "", e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "", e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "", e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "", e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "", e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "", e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.skinning ? "#define USE_SKINNING" : "", e.morphTargets ? "#define USE_MORPHTARGETS" : "", e.morphNormals && e.flatShading === false ? "#define USE_MORPHNORMALS" : "", e.morphColors ? "#define USE_MORPHCOLORS" : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "", e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(xi).join("\n"), u = [Ka(e), "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v, e.useFog && e.fog ? "#define USE_FOG" : "", e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "", e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", e.map ? "#define USE_MAP" : "", e.matcap ? "#define USE_MATCAP" : "", e.envMap ? "#define USE_ENVMAP" : "", e.envMap ? "#define " + c : "", e.envMap ? "#define " + h : "", e.envMap ? "#define " + f : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", e.lightMap ? "#define USE_LIGHTMAP" : "", e.aoMap ? "#define USE_AOMAP" : "", e.bumpMap ? "#define USE_BUMPMAP" : "", e.normalMap ? "#define USE_NORMALMAP" : "", e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", e.emissiveMap ? "#define USE_EMISSIVEMAP" : "", e.anisotropy ? "#define USE_ANISOTROPY" : "", e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", e.clearcoat ? "#define USE_CLEARCOAT" : "", e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", e.dispersion ? "#define USE_DISPERSION" : "", e.iridescence ? "#define USE_IRIDESCENCE" : "", e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", e.specularMap ? "#define USE_SPECULARMAP" : "", e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", e.metalnessMap ? "#define USE_METALNESSMAP" : "", e.alphaMap ? "#define USE_ALPHAMAP" : "", e.alphaTest ? "#define USE_ALPHATEST" : "", e.alphaHash ? "#define USE_ALPHAHASH" : "", e.sheen ? "#define USE_SHEEN" : "", e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", e.transmission ? "#define USE_TRANSMISSION" : "", e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", e.thicknessMap ? "#define USE_THICKNESSMAP" : "", e.vertexTangents && e.flatShading === false ? "#define USE_TANGENT" : "", e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "", e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", e.vertexUv1s ? "#define USE_UV1" : "", e.vertexUv2s ? "#define USE_UV2" : "", e.vertexUv3s ? "#define USE_UV3" : "", e.pointsUvs ? "#define USE_POINTS_UV" : "", e.gradientMap ? "#define USE_GRADIENTMAP" : "", e.flatShading ? "#define FLAT_SHADED" : "", e.doubleSided ? "#define DOUBLE_SIDED" : "", e.flipSided ? "#define FLIP_SIDED" : "", e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", e.shadowMapEnabled ? "#define " + l : "", e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", e.toneMapping !== mn ? "#define TONE_MAPPING" : "", e.toneMapping !== mn ? Lt.tonemapping_pars_fragment : "", e.toneMapping !== mn ? af("toneMapping", e.toneMapping) : "", e.dithering ? "#define DITHERING" : "", e.opaque ? "#define OPAQUE" : "", Lt.colorspace_pars_fragment, sf("linearToOutputTexel", e.outputColorSpace), of(), e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", "\n"].filter(xi).join("\n")), a = Ls(a), a = qa(a, e), a = $a(a, e), o = Ls(o), o = qa(o, e), o = $a(o, e), a = ja(a), o = ja(o), e.isRawShaderMaterial !== true && (T = "#version 300 es\n", p = [m, "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + p, u = ["#define varying in", e.glslVersion === sa ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", e.glslVersion === sa ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + u);
  const b = T + p + a, y = T + u + o, U = Wa(r, r.VERTEX_SHADER, b), w = Wa(r, r.FRAGMENT_SHADER, y);
  r.attachShader(M, U), r.attachShader(M, w), e.index0AttributeName !== void 0 ? r.bindAttribLocation(M, 0, e.index0AttributeName) : e.morphTargets === true && r.bindAttribLocation(M, 0, "position"), r.linkProgram(M);
  function P(R) {
    if (i.debug.checkShaderErrors) {
      const Y = r.getProgramInfoLog(M).trim(), z = r.getShaderInfoLog(U).trim(), W = r.getShaderInfoLog(w).trim();
      let K = true, k = true;
      if (r.getProgramParameter(M, r.LINK_STATUS) === false) if (K = false, typeof i.debug.onShaderError == "function") i.debug.onShaderError(r, M, U, w);
      else {
        const Q = Ya(r, U, "vertex"), V = Ya(r, w, "fragment");
        console.error("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(M, r.VALIDATE_STATUS) + "\n\nMaterial Name: " + R.name + "\nMaterial Type: " + R.type + "\n\nProgram Info Log: " + Y + "\n" + Q + "\n" + V);
      }
      else Y !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", Y) : (z === "" || W === "") && (k = false);
      k && (R.diagnostics = { runnable: K, programLog: Y, vertexShader: { log: z, prefix: p }, fragmentShader: { log: W, prefix: u } });
    }
    r.deleteShader(U), r.deleteShader(w), I = new rr(r, M), S = hf(r, M);
  }
  let I;
  this.getUniforms = function() {
    return I === void 0 && P(this), I;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && P(this), S;
  };
  let x = e.rendererExtensionParallelShaderCompile === false;
  return this.isReady = function() {
    return x === false && (x = r.getProgramParameter(M, tf)), x;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(M), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = ef++, this.cacheKey = t, this.usedTimes = 1, this.program = M, this.vertexShader = U, this.fragmentShader = w, this;
}
let Ef = 0;
class yf {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, r = this._getShaderStage(e), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
    return a.has(r) === false && (a.add(r), r.usedTimes++), a.has(s) === false && (a.add(s), s.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new bf(t), e.set(t, n)), n;
  }
}
class bf {
  constructor(t) {
    this.id = Ef++, this.code = t, this.usedTimes = 0;
  }
}
function Tf(i, t, e, n, r, s, a) {
  const o = new ks(), l = new yf(), c = /* @__PURE__ */ new Set(), h = [], f = r.logarithmicDepthBuffer, d = r.vertexTextures;
  let m = r.precision;
  const v = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
  function M(S) {
    return c.add(S), S === 0 ? "uv" : "uv".concat(S);
  }
  function p(S, x, R, Y, z) {
    const W = Y.fog, K = z.geometry, k = S.isMeshStandardMaterial ? Y.environment : null, Q = (S.isMeshStandardMaterial ? e : t).get(S.envMap || k), V = Q && Q.mapping === lr ? Q.image.height : null, rt = v[S.type];
    S.precision !== null && (m = r.getMaxPrecision(S.precision), m !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", m, "instead."));
    const ht = K.morphAttributes.position || K.morphAttributes.normal || K.morphAttributes.color, gt = ht !== void 0 ? ht.length : 0;
    let Ut = 0;
    K.morphAttributes.position !== void 0 && (Ut = 1), K.morphAttributes.normal !== void 0 && (Ut = 2), K.morphAttributes.color !== void 0 && (Ut = 3);
    let Kt, X, tt, mt;
    if (rt) {
      const qt = Ve[rt];
      Kt = qt.vertexShader, X = qt.fragmentShader;
    } else Kt = S.vertexShader, X = S.fragmentShader, l.update(S), tt = l.getVertexShaderID(S), mt = l.getFragmentShaderID(S);
    const st = i.getRenderTarget(), yt = i.state.buffers.depth.getReversed(), wt = z.isInstancedMesh === true, It = z.isBatchedMesh === true, te = !!S.map, zt = !!S.matcap, se = !!Q, A = !!S.aoMap, we = !!S.lightMap, Ft = !!S.bumpMap, Ot = !!S.normalMap, vt = !!S.displacementMap, Jt = !!S.emissiveMap, xt = !!S.metalnessMap, E = !!S.roughnessMap, _ = S.anisotropy > 0, N = S.clearcoat > 0, q = S.dispersion > 0, j = S.iridescence > 0, G = S.sheen > 0, _t = S.transmission > 0, at = _ && !!S.anisotropyMap, ut = N && !!S.clearcoatMap, Ht = N && !!S.clearcoatNormalMap, J = N && !!S.clearcoatRoughnessMap, dt = j && !!S.iridescenceMap, Et = j && !!S.iridescenceThicknessMap, bt = G && !!S.sheenColorMap, ft = G && !!S.sheenRoughnessMap, Bt = !!S.specularMap, Dt = !!S.specularColorMap, Zt = !!S.specularIntensityMap, C = _t && !!S.transmissionMap, nt = _t && !!S.thicknessMap, H = !!S.gradientMap, $ = !!S.alphaMap, lt = S.alphaTest > 0, ot = !!S.alphaHash, Rt = !!S.extensions;
    let ne = mn;
    S.toneMapped && (st === null || st.isXRRenderTarget === true) && (ne = i.toneMapping);
    const fe = { shaderID: rt, shaderType: S.type, shaderName: S.name, vertexShader: Kt, fragmentShader: X, defines: S.defines, customVertexShaderID: tt, customFragmentShaderID: mt, isRawShaderMaterial: S.isRawShaderMaterial === true, glslVersion: S.glslVersion, precision: m, batching: It, batchingColor: It && z._colorsTexture !== null, instancing: wt, instancingColor: wt && z.instanceColor !== null, instancingMorph: wt && z.morphTexture !== null, supportsVertexTextures: d, outputColorSpace: st === null ? i.outputColorSpace : st.isXRRenderTarget === true ? st.texture.colorSpace : hi, alphaToCoverage: !!S.alphaToCoverage, map: te, matcap: zt, envMap: se, envMapMode: se && Q.mapping, envMapCubeUVHeight: V, aoMap: A, lightMap: we, bumpMap: Ft, normalMap: Ot, displacementMap: d && vt, emissiveMap: Jt, normalMapObjectSpace: Ot && S.normalMapType === yl, normalMapTangentSpace: Ot && S.normalMapType === go, metalnessMap: xt, roughnessMap: E, anisotropy: _, anisotropyMap: at, clearcoat: N, clearcoatMap: ut, clearcoatNormalMap: Ht, clearcoatRoughnessMap: J, dispersion: q, iridescence: j, iridescenceMap: dt, iridescenceThicknessMap: Et, sheen: G, sheenColorMap: bt, sheenRoughnessMap: ft, specularMap: Bt, specularColorMap: Dt, specularIntensityMap: Zt, transmission: _t, transmissionMap: C, thicknessMap: nt, gradientMap: H, opaque: S.transparent === false && S.blending === ni && S.alphaToCoverage === false, alphaMap: $, alphaTest: lt, alphaHash: ot, combine: S.combine, mapUv: te && M(S.map.channel), aoMapUv: A && M(S.aoMap.channel), lightMapUv: we && M(S.lightMap.channel), bumpMapUv: Ft && M(S.bumpMap.channel), normalMapUv: Ot && M(S.normalMap.channel), displacementMapUv: vt && M(S.displacementMap.channel), emissiveMapUv: Jt && M(S.emissiveMap.channel), metalnessMapUv: xt && M(S.metalnessMap.channel), roughnessMapUv: E && M(S.roughnessMap.channel), anisotropyMapUv: at && M(S.anisotropyMap.channel), clearcoatMapUv: ut && M(S.clearcoatMap.channel), clearcoatNormalMapUv: Ht && M(S.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: J && M(S.clearcoatRoughnessMap.channel), iridescenceMapUv: dt && M(S.iridescenceMap.channel), iridescenceThicknessMapUv: Et && M(S.iridescenceThicknessMap.channel), sheenColorMapUv: bt && M(S.sheenColorMap.channel), sheenRoughnessMapUv: ft && M(S.sheenRoughnessMap.channel), specularMapUv: Bt && M(S.specularMap.channel), specularColorMapUv: Dt && M(S.specularColorMap.channel), specularIntensityMapUv: Zt && M(S.specularIntensityMap.channel), transmissionMapUv: C && M(S.transmissionMap.channel), thicknessMapUv: nt && M(S.thicknessMap.channel), alphaMapUv: $ && M(S.alphaMap.channel), vertexTangents: !!K.attributes.tangent && (Ot || _), vertexColors: S.vertexColors, vertexAlphas: S.vertexColors === true && !!K.attributes.color && K.attributes.color.itemSize === 4, pointsUvs: z.isPoints === true && !!K.attributes.uv && (te || $), fog: !!W, useFog: S.fog === true, fogExp2: !!W && W.isFogExp2, flatShading: S.flatShading === true, sizeAttenuation: S.sizeAttenuation === true, logarithmicDepthBuffer: f, reverseDepthBuffer: yt, skinning: z.isSkinnedMesh === true, morphTargets: K.morphAttributes.position !== void 0, morphNormals: K.morphAttributes.normal !== void 0, morphColors: K.morphAttributes.color !== void 0, morphTargetsCount: gt, morphTextureStride: Ut, numDirLights: x.directional.length, numPointLights: x.point.length, numSpotLights: x.spot.length, numSpotLightMaps: x.spotLightMap.length, numRectAreaLights: x.rectArea.length, numHemiLights: x.hemi.length, numDirLightShadows: x.directionalShadowMap.length, numPointLightShadows: x.pointShadowMap.length, numSpotLightShadows: x.spotShadowMap.length, numSpotLightShadowsWithMaps: x.numSpotLightShadowsWithMaps, numLightProbes: x.numLightProbes, numClippingPlanes: a.numPlanes, numClipIntersection: a.numIntersection, dithering: S.dithering, shadowMapEnabled: i.shadowMap.enabled && R.length > 0, shadowMapType: i.shadowMap.type, toneMapping: ne, decodeVideoTexture: te && S.map.isVideoTexture === true && Gt.getTransfer(S.map.colorSpace) === $t, decodeVideoTextureEmissive: Jt && S.emissiveMap.isVideoTexture === true && Gt.getTransfer(S.emissiveMap.colorSpace) === $t, premultipliedAlpha: S.premultipliedAlpha, doubleSided: S.side === Qe, flipSided: S.side === ye, useDepthPacking: S.depthPacking >= 0, depthPacking: S.depthPacking || 0, index0AttributeName: S.index0AttributeName, extensionClipCullDistance: Rt && S.extensions.clipCullDistance === true && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (Rt && S.extensions.multiDraw === true || It) && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: S.customProgramCacheKey() };
    return fe.vertexUv1s = c.has(1), fe.vertexUv2s = c.has(2), fe.vertexUv3s = c.has(3), c.clear(), fe;
  }
  function u(S) {
    const x = [];
    if (S.shaderID ? x.push(S.shaderID) : (x.push(S.customVertexShaderID), x.push(S.customFragmentShaderID)), S.defines !== void 0) for (const R in S.defines) x.push(R), x.push(S.defines[R]);
    return S.isRawShaderMaterial === false && (T(x, S), b(x, S), x.push(i.outputColorSpace)), x.push(S.customProgramCacheKey), x.join();
  }
  function T(S, x) {
    S.push(x.precision), S.push(x.outputColorSpace), S.push(x.envMapMode), S.push(x.envMapCubeUVHeight), S.push(x.mapUv), S.push(x.alphaMapUv), S.push(x.lightMapUv), S.push(x.aoMapUv), S.push(x.bumpMapUv), S.push(x.normalMapUv), S.push(x.displacementMapUv), S.push(x.emissiveMapUv), S.push(x.metalnessMapUv), S.push(x.roughnessMapUv), S.push(x.anisotropyMapUv), S.push(x.clearcoatMapUv), S.push(x.clearcoatNormalMapUv), S.push(x.clearcoatRoughnessMapUv), S.push(x.iridescenceMapUv), S.push(x.iridescenceThicknessMapUv), S.push(x.sheenColorMapUv), S.push(x.sheenRoughnessMapUv), S.push(x.specularMapUv), S.push(x.specularColorMapUv), S.push(x.specularIntensityMapUv), S.push(x.transmissionMapUv), S.push(x.thicknessMapUv), S.push(x.combine), S.push(x.fogExp2), S.push(x.sizeAttenuation), S.push(x.morphTargetsCount), S.push(x.morphAttributeCount), S.push(x.numDirLights), S.push(x.numPointLights), S.push(x.numSpotLights), S.push(x.numSpotLightMaps), S.push(x.numHemiLights), S.push(x.numRectAreaLights), S.push(x.numDirLightShadows), S.push(x.numPointLightShadows), S.push(x.numSpotLightShadows), S.push(x.numSpotLightShadowsWithMaps), S.push(x.numLightProbes), S.push(x.shadowMapType), S.push(x.toneMapping), S.push(x.numClippingPlanes), S.push(x.numClipIntersection), S.push(x.depthPacking);
  }
  function b(S, x) {
    o.disableAll(), x.supportsVertexTextures && o.enable(0), x.instancing && o.enable(1), x.instancingColor && o.enable(2), x.instancingMorph && o.enable(3), x.matcap && o.enable(4), x.envMap && o.enable(5), x.normalMapObjectSpace && o.enable(6), x.normalMapTangentSpace && o.enable(7), x.clearcoat && o.enable(8), x.iridescence && o.enable(9), x.alphaTest && o.enable(10), x.vertexColors && o.enable(11), x.vertexAlphas && o.enable(12), x.vertexUv1s && o.enable(13), x.vertexUv2s && o.enable(14), x.vertexUv3s && o.enable(15), x.vertexTangents && o.enable(16), x.anisotropy && o.enable(17), x.alphaHash && o.enable(18), x.batching && o.enable(19), x.dispersion && o.enable(20), x.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), x.fog && o.enable(0), x.useFog && o.enable(1), x.flatShading && o.enable(2), x.logarithmicDepthBuffer && o.enable(3), x.reverseDepthBuffer && o.enable(4), x.skinning && o.enable(5), x.morphTargets && o.enable(6), x.morphNormals && o.enable(7), x.morphColors && o.enable(8), x.premultipliedAlpha && o.enable(9), x.shadowMapEnabled && o.enable(10), x.doubleSided && o.enable(11), x.flipSided && o.enable(12), x.useDepthPacking && o.enable(13), x.dithering && o.enable(14), x.transmission && o.enable(15), x.sheen && o.enable(16), x.opaque && o.enable(17), x.pointsUvs && o.enable(18), x.decodeVideoTexture && o.enable(19), x.decodeVideoTextureEmissive && o.enable(20), x.alphaToCoverage && o.enable(21), S.push(o.mask);
  }
  function y(S) {
    const x = v[S.type];
    let R;
    if (x) {
      const Y = Ve[x];
      R = tc.clone(Y.uniforms);
    } else R = S.uniforms;
    return R;
  }
  function U(S, x) {
    let R;
    for (let Y = 0, z = h.length; Y < z; Y++) {
      const W = h[Y];
      if (W.cacheKey === x) {
        R = W, ++R.usedTimes;
        break;
      }
    }
    return R === void 0 && (R = new Sf(i, x, S, s), h.push(R)), R;
  }
  function w(S) {
    if (--S.usedTimes === 0) {
      const x = h.indexOf(S);
      h[x] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function P(S) {
    l.remove(S);
  }
  function I() {
    l.dispose();
  }
  return { getParameters: p, getProgramCacheKey: u, getUniforms: y, acquireProgram: U, releaseProgram: w, releaseShaderCache: P, programs: h, dispose: I };
}
function Af() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return { has: t, get: e, remove: n, update: r, dispose: s };
}
function wf(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Za(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function Ja() {
  const i = [];
  let t = 0;
  const e = [], n = [], r = [];
  function s() {
    t = 0, e.length = 0, n.length = 0, r.length = 0;
  }
  function a(f, d, m, v, M, p) {
    let u = i[t];
    return u === void 0 ? (u = { id: f.id, object: f, geometry: d, material: m, groupOrder: v, renderOrder: f.renderOrder, z: M, group: p }, i[t] = u) : (u.id = f.id, u.object = f, u.geometry = d, u.material = m, u.groupOrder = v, u.renderOrder = f.renderOrder, u.z = M, u.group = p), t++, u;
  }
  function o(f, d, m, v, M, p) {
    const u = a(f, d, m, v, M, p);
    m.transmission > 0 ? n.push(u) : m.transparent === true ? r.push(u) : e.push(u);
  }
  function l(f, d, m, v, M, p) {
    const u = a(f, d, m, v, M, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === true ? r.unshift(u) : e.unshift(u);
  }
  function c(f, d) {
    e.length > 1 && e.sort(f || wf), n.length > 1 && n.sort(d || Za), r.length > 1 && r.sort(d || Za);
  }
  function h() {
    for (let f = t, d = i.length; f < d; f++) {
      const m = i[f];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return { opaque: e, transmissive: n, transparent: r, init: s, push: o, unshift: l, finish: h, sort: c };
}
function Rf() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new Ja(), i.set(n, [a])) : r >= s.length ? (a = new Ja(), s.push(a)) : a = s[r], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return { get: t, dispose: e };
}
function Cf() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { direction: new F(), color: new Wt() };
        break;
      case "SpotLight":
        e = { position: new F(), direction: new F(), color: new Wt(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
        break;
      case "PointLight":
        e = { position: new F(), color: new Wt(), distance: 0, decay: 0 };
        break;
      case "HemisphereLight":
        e = { direction: new F(), skyColor: new Wt(), groundColor: new Wt() };
        break;
      case "RectAreaLight":
        e = { color: new Wt(), position: new F(), halfWidth: new F(), halfHeight: new F() };
        break;
    }
    return i[t.id] = e, e;
  } };
}
function Pf() {
  const i = {};
  return { get: function(t) {
    if (i[t.id] !== void 0) return i[t.id];
    let e;
    switch (t.type) {
      case "DirectionalLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Pt() };
        break;
      case "SpotLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Pt() };
        break;
      case "PointLight":
        e = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Pt(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
        break;
    }
    return i[t.id] = e, e;
  } };
}
let Df = 0;
function Lf(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Uf(i) {
  const t = new Cf(), e = Pf(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
  for (let c = 0; c < 9; c++) n.probe.push(new F());
  const r = new F(), s = new ee(), a = new ee();
  function o(c) {
    let h = 0, f = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let m = 0, v = 0, M = 0, p = 0, u = 0, T = 0, b = 0, y = 0, U = 0, w = 0, P = 0;
    c.sort(Lf);
    for (let S = 0, x = c.length; S < x; S++) {
      const R = c[S], Y = R.color, z = R.intensity, W = R.distance, K = R.shadow && R.shadow.map ? R.shadow.map.texture : null;
      if (R.isAmbientLight) h += Y.r * z, f += Y.g * z, d += Y.b * z;
      else if (R.isLightProbe) {
        for (let k = 0; k < 9; k++) n.probe[k].addScaledVector(R.sh.coefficients[k], z);
        P++;
      } else if (R.isDirectionalLight) {
        const k = t.get(R);
        if (k.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) {
          const Q = R.shadow, V = e.get(R);
          V.shadowIntensity = Q.intensity, V.shadowBias = Q.bias, V.shadowNormalBias = Q.normalBias, V.shadowRadius = Q.radius, V.shadowMapSize = Q.mapSize, n.directionalShadow[m] = V, n.directionalShadowMap[m] = K, n.directionalShadowMatrix[m] = R.shadow.matrix, T++;
        }
        n.directional[m] = k, m++;
      } else if (R.isSpotLight) {
        const k = t.get(R);
        k.position.setFromMatrixPosition(R.matrixWorld), k.color.copy(Y).multiplyScalar(z), k.distance = W, k.coneCos = Math.cos(R.angle), k.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), k.decay = R.decay, n.spot[M] = k;
        const Q = R.shadow;
        if (R.map && (n.spotLightMap[U] = R.map, U++, Q.updateMatrices(R), R.castShadow && w++), n.spotLightMatrix[M] = Q.matrix, R.castShadow) {
          const V = e.get(R);
          V.shadowIntensity = Q.intensity, V.shadowBias = Q.bias, V.shadowNormalBias = Q.normalBias, V.shadowRadius = Q.radius, V.shadowMapSize = Q.mapSize, n.spotShadow[M] = V, n.spotShadowMap[M] = K, y++;
        }
        M++;
      } else if (R.isRectAreaLight) {
        const k = t.get(R);
        k.color.copy(Y).multiplyScalar(z), k.halfWidth.set(R.width * 0.5, 0, 0), k.halfHeight.set(0, R.height * 0.5, 0), n.rectArea[p] = k, p++;
      } else if (R.isPointLight) {
        const k = t.get(R);
        if (k.color.copy(R.color).multiplyScalar(R.intensity), k.distance = R.distance, k.decay = R.decay, R.castShadow) {
          const Q = R.shadow, V = e.get(R);
          V.shadowIntensity = Q.intensity, V.shadowBias = Q.bias, V.shadowNormalBias = Q.normalBias, V.shadowRadius = Q.radius, V.shadowMapSize = Q.mapSize, V.shadowCameraNear = Q.camera.near, V.shadowCameraFar = Q.camera.far, n.pointShadow[v] = V, n.pointShadowMap[v] = K, n.pointShadowMatrix[v] = R.shadow.matrix, b++;
        }
        n.point[v] = k, v++;
      } else if (R.isHemisphereLight) {
        const k = t.get(R);
        k.skyColor.copy(R.color).multiplyScalar(z), k.groundColor.copy(R.groundColor).multiplyScalar(z), n.hemi[u] = k, u++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === true ? (n.rectAreaLTC1 = et.LTC_FLOAT_1, n.rectAreaLTC2 = et.LTC_FLOAT_2) : (n.rectAreaLTC1 = et.LTC_HALF_1, n.rectAreaLTC2 = et.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = d;
    const I = n.hash;
    (I.directionalLength !== m || I.pointLength !== v || I.spotLength !== M || I.rectAreaLength !== p || I.hemiLength !== u || I.numDirectionalShadows !== T || I.numPointShadows !== b || I.numSpotShadows !== y || I.numSpotMaps !== U || I.numLightProbes !== P) && (n.directional.length = m, n.spot.length = M, n.rectArea.length = p, n.point.length = v, n.hemi.length = u, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.pointShadow.length = b, n.pointShadowMap.length = b, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = T, n.pointShadowMatrix.length = b, n.spotLightMatrix.length = y + U - w, n.spotLightMap.length = U, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = P, I.directionalLength = m, I.pointLength = v, I.spotLength = M, I.rectAreaLength = p, I.hemiLength = u, I.numDirectionalShadows = T, I.numPointShadows = b, I.numSpotShadows = y, I.numSpotMaps = U, I.numLightProbes = P, n.version = Df++);
  }
  function l(c, h) {
    let f = 0, d = 0, m = 0, v = 0, M = 0;
    const p = h.matrixWorldInverse;
    for (let u = 0, T = c.length; u < T; u++) {
      const b = c[u];
      if (b.isDirectionalLight) {
        const y = n.directional[f];
        y.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), f++;
      } else if (b.isSpotLight) {
        const y = n.spot[m];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), y.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), m++;
      } else if (b.isRectAreaLight) {
        const y = n.rectArea[v];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), a.identity(), s.copy(b.matrixWorld), s.premultiply(p), a.extractRotation(s), y.halfWidth.set(b.width * 0.5, 0, 0), y.halfHeight.set(0, b.height * 0.5, 0), y.halfWidth.applyMatrix4(a), y.halfHeight.applyMatrix4(a), v++;
      } else if (b.isPointLight) {
        const y = n.point[d];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), d++;
      } else if (b.isHemisphereLight) {
        const y = n.hemi[M];
        y.direction.setFromMatrixPosition(b.matrixWorld), y.direction.transformDirection(p), M++;
      }
    }
  }
  return { setup: o, setupView: l, state: n };
}
function Qa(i) {
  const t = new Uf(i), e = [], n = [];
  function r(h) {
    c.camera = h, e.length = 0, n.length = 0;
  }
  function s(h) {
    e.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    t.setup(e);
  }
  function l(h) {
    t.setupView(e, h);
  }
  const c = { lightsArray: e, shadowsArray: n, camera: null, lights: t, transmissionRenderTarget: {} };
  return { init: r, state: c, setupLights: o, setupLightsView: l, pushLight: s, pushShadow: a };
}
function If(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new Qa(i), t.set(r, [o])) : s >= a.length ? (o = new Qa(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return { get: e, dispose: n };
}
const Nf = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", Ff = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( squared_mean - mean * mean );\n	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";
function Of(i, t, e) {
  let n = new Gs();
  const r = new Pt(), s = new Pt(), a = new re(), o = new oc({ depthPacking: El }), l = new lc(), c = {}, h = e.maxTextureSize, f = { [_n]: ye, [ye]: _n, [Qe]: Qe }, d = new gn({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new Pt() }, radius: { value: 4 } }, vertexShader: Nf, fragmentShader: Ff }), m = d.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const v = new Fn();
  v.setAttribute("position", new Ge(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const M = new nn(v, d), p = this;
  this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = io;
  let u = this.type;
  this.render = function(w, P, I) {
    if (p.enabled === false || p.autoUpdate === false && p.needsUpdate === false || w.length === 0) return;
    const S = i.getRenderTarget(), x = i.getActiveCubeFace(), R = i.getActiveMipmapLevel(), Y = i.state;
    Y.setBlending(pn), Y.buffers.color.setClear(1, 1, 1, 1), Y.buffers.depth.setTest(true), Y.setScissorTest(false);
    const z = u !== Je && this.type === Je, W = u === Je && this.type !== Je;
    for (let K = 0, k = w.length; K < k; K++) {
      const Q = w[K], V = Q.shadow;
      if (V === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === false && V.needsUpdate === false) continue;
      r.copy(V.mapSize);
      const rt = V.getFrameExtents();
      if (r.multiply(rt), s.copy(V.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / rt.x), r.x = s.x * rt.x, V.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / rt.y), r.y = s.y * rt.y, V.mapSize.y = s.y)), V.map === null || z === true || W === true) {
        const gt = this.type !== Je ? { minFilter: He, magFilter: He } : {};
        V.map !== null && V.map.dispose(), V.map = new Un(r.x, r.y, gt), V.map.texture.name = Q.name + ".shadowMap", V.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(V.map), i.clear();
      const ht = V.getViewportCount();
      for (let gt = 0; gt < ht; gt++) {
        const Ut = V.getViewport(gt);
        a.set(s.x * Ut.x, s.y * Ut.y, s.x * Ut.z, s.y * Ut.w), Y.viewport(a), V.updateMatrices(Q, gt), n = V.getFrustum(), y(P, I, V.camera, Q, this.type);
      }
      V.isPointLightShadow !== true && this.type === Je && T(V, I), V.needsUpdate = false;
    }
    u = this.type, p.needsUpdate = false, i.setRenderTarget(S, x, R);
  };
  function T(w, P) {
    const I = t.update(M);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, m.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = true, m.needsUpdate = true), w.mapPass === null && (w.mapPass = new Un(r.x, r.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(P, null, I, d, M, null), m.uniforms.shadow_pass.value = w.mapPass.texture, m.uniforms.resolution.value = w.mapSize, m.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(P, null, I, m, M, null);
  }
  function b(w, P, I, S) {
    let x = null;
    const R = I.isPointLight === true ? w.customDistanceMaterial : w.customDepthMaterial;
    if (R !== void 0) x = R;
    else if (x = I.isPointLight === true ? l : o, i.localClippingEnabled && P.clipShadows === true && Array.isArray(P.clippingPlanes) && P.clippingPlanes.length !== 0 || P.displacementMap && P.displacementScale !== 0 || P.alphaMap && P.alphaTest > 0 || P.map && P.alphaTest > 0) {
      const Y = x.uuid, z = P.uuid;
      let W = c[Y];
      W === void 0 && (W = {}, c[Y] = W);
      let K = W[z];
      K === void 0 && (K = x.clone(), W[z] = K, P.addEventListener("dispose", U)), x = K;
    }
    if (x.visible = P.visible, x.wireframe = P.wireframe, S === Je ? x.side = P.shadowSide !== null ? P.shadowSide : P.side : x.side = P.shadowSide !== null ? P.shadowSide : f[P.side], x.alphaMap = P.alphaMap, x.alphaTest = P.alphaTest, x.map = P.map, x.clipShadows = P.clipShadows, x.clippingPlanes = P.clippingPlanes, x.clipIntersection = P.clipIntersection, x.displacementMap = P.displacementMap, x.displacementScale = P.displacementScale, x.displacementBias = P.displacementBias, x.wireframeLinewidth = P.wireframeLinewidth, x.linewidth = P.linewidth, I.isPointLight === true && x.isMeshDistanceMaterial === true) {
      const Y = i.properties.get(x);
      Y.light = I;
    }
    return x;
  }
  function y(w, P, I, S, x) {
    if (w.visible === false) return;
    if (w.layers.test(P.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && x === Je) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse, w.matrixWorld);
      const z = t.update(w), W = w.material;
      if (Array.isArray(W)) {
        const K = z.groups;
        for (let k = 0, Q = K.length; k < Q; k++) {
          const V = K[k], rt = W[V.materialIndex];
          if (rt && rt.visible) {
            const ht = b(w, rt, S, x);
            w.onBeforeShadow(i, w, P, I, z, ht, V), i.renderBufferDirect(I, null, z, ht, w, V), w.onAfterShadow(i, w, P, I, z, ht, V);
          }
        }
      } else if (W.visible) {
        const K = b(w, W, S, x);
        w.onBeforeShadow(i, w, P, I, z, K, null), i.renderBufferDirect(I, null, z, K, w, null), w.onAfterShadow(i, w, P, I, z, K, null);
      }
    }
    const Y = w.children;
    for (let z = 0, W = Y.length; z < W; z++) y(Y[z], P, I, S, x);
  }
  function U(w) {
    w.target.removeEventListener("dispose", U);
    for (const I in c) {
      const S = c[I], x = w.target.uuid;
      x in S && (S[x].dispose(), delete S[x]);
    }
  }
}
const Bf = { [qr]: $r, [jr]: Jr, [Kr]: Qr, [si]: Zr, [$r]: qr, [Jr]: jr, [Qr]: Kr, [Zr]: si };
function zf(i, t) {
  function e() {
    let C = false;
    const nt = new re();
    let H = null;
    const $ = new re(0, 0, 0, 0);
    return { setMask: function(lt) {
      H !== lt && !C && (i.colorMask(lt, lt, lt, lt), H = lt);
    }, setLocked: function(lt) {
      C = lt;
    }, setClear: function(lt, ot, Rt, ne, fe) {
      fe === true && (lt *= ne, ot *= ne, Rt *= ne), nt.set(lt, ot, Rt, ne), $.equals(nt) === false && (i.clearColor(lt, ot, Rt, ne), $.copy(nt));
    }, reset: function() {
      C = false, H = null, $.set(-1, 0, 0, 0);
    } };
  }
  function n() {
    let C = false, nt = false, H = null, $ = null, lt = null;
    return { setReversed: function(ot) {
      if (nt !== ot) {
        const Rt = t.get("EXT_clip_control");
        nt ? Rt.clipControlEXT(Rt.LOWER_LEFT_EXT, Rt.ZERO_TO_ONE_EXT) : Rt.clipControlEXT(Rt.LOWER_LEFT_EXT, Rt.NEGATIVE_ONE_TO_ONE_EXT);
        const ne = lt;
        lt = null, this.setClear(ne);
      }
      nt = ot;
    }, getReversed: function() {
      return nt;
    }, setTest: function(ot) {
      ot ? st(i.DEPTH_TEST) : yt(i.DEPTH_TEST);
    }, setMask: function(ot) {
      H !== ot && !C && (i.depthMask(ot), H = ot);
    }, setFunc: function(ot) {
      if (nt && (ot = Bf[ot]), $ !== ot) {
        switch (ot) {
          case qr:
            i.depthFunc(i.NEVER);
            break;
          case $r:
            i.depthFunc(i.ALWAYS);
            break;
          case jr:
            i.depthFunc(i.LESS);
            break;
          case si:
            i.depthFunc(i.LEQUAL);
            break;
          case Kr:
            i.depthFunc(i.EQUAL);
            break;
          case Zr:
            i.depthFunc(i.GEQUAL);
            break;
          case Jr:
            i.depthFunc(i.GREATER);
            break;
          case Qr:
            i.depthFunc(i.NOTEQUAL);
            break;
          default:
            i.depthFunc(i.LEQUAL);
        }
        $ = ot;
      }
    }, setLocked: function(ot) {
      C = ot;
    }, setClear: function(ot) {
      lt !== ot && (nt && (ot = 1 - ot), i.clearDepth(ot), lt = ot);
    }, reset: function() {
      C = false, H = null, $ = null, lt = null, nt = false;
    } };
  }
  function r() {
    let C = false, nt = null, H = null, $ = null, lt = null, ot = null, Rt = null, ne = null, fe = null;
    return { setTest: function(qt) {
      C || (qt ? st(i.STENCIL_TEST) : yt(i.STENCIL_TEST));
    }, setMask: function(qt) {
      nt !== qt && !C && (i.stencilMask(qt), nt = qt);
    }, setFunc: function(qt, Le, Ye) {
      (H !== qt || $ !== Le || lt !== Ye) && (i.stencilFunc(qt, Le, Ye), H = qt, $ = Le, lt = Ye);
    }, setOp: function(qt, Le, Ye) {
      (ot !== qt || Rt !== Le || ne !== Ye) && (i.stencilOp(qt, Le, Ye), ot = qt, Rt = Le, ne = Ye);
    }, setLocked: function(qt) {
      C = qt;
    }, setClear: function(qt) {
      fe !== qt && (i.clearStencil(qt), fe = qt);
    }, reset: function() {
      C = false, nt = null, H = null, $ = null, lt = null, ot = null, Rt = null, ne = null, fe = null;
    } };
  }
  const s = new e(), a = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], v = null, M = false, p = null, u = null, T = null, b = null, y = null, U = null, w = null, P = new Wt(0, 0, 0), I = 0, S = false, x = null, R = null, Y = null, z = null, W = null;
  const K = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let k = false, Q = 0;
  const V = i.getParameter(i.VERSION);
  V.indexOf("WebGL") !== -1 ? (Q = parseFloat(/^WebGL (\d)/.exec(V)[1]), k = Q >= 1) : V.indexOf("OpenGL ES") !== -1 && (Q = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), k = Q >= 2);
  let rt = null, ht = {};
  const gt = i.getParameter(i.SCISSOR_BOX), Ut = i.getParameter(i.VIEWPORT), Kt = new re().fromArray(gt), X = new re().fromArray(Ut);
  function tt(C, nt, H, $) {
    const lt = new Uint8Array(4), ot = i.createTexture();
    i.bindTexture(C, ot), i.texParameteri(C, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(C, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Rt = 0; Rt < H; Rt++) C === i.TEXTURE_3D || C === i.TEXTURE_2D_ARRAY ? i.texImage3D(nt, 0, i.RGBA, 1, 1, $, 0, i.RGBA, i.UNSIGNED_BYTE, lt) : i.texImage2D(nt + Rt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, lt);
    return ot;
  }
  const mt = {};
  mt[i.TEXTURE_2D] = tt(i.TEXTURE_2D, i.TEXTURE_2D, 1), mt[i.TEXTURE_CUBE_MAP] = tt(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), mt[i.TEXTURE_2D_ARRAY] = tt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), mt[i.TEXTURE_3D] = tt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), st(i.DEPTH_TEST), a.setFunc(si), Ft(false), Ot(Qs), st(i.CULL_FACE), A(pn);
  function st(C) {
    h[C] !== true && (i.enable(C), h[C] = true);
  }
  function yt(C) {
    h[C] !== false && (i.disable(C), h[C] = false);
  }
  function wt(C, nt) {
    return f[C] !== nt ? (i.bindFramebuffer(C, nt), f[C] = nt, C === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = nt), C === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = nt), true) : false;
  }
  function It(C, nt) {
    let H = m, $ = false;
    if (C) {
      H = d.get(nt), H === void 0 && (H = [], d.set(nt, H));
      const lt = C.textures;
      if (H.length !== lt.length || H[0] !== i.COLOR_ATTACHMENT0) {
        for (let ot = 0, Rt = lt.length; ot < Rt; ot++) H[ot] = i.COLOR_ATTACHMENT0 + ot;
        H.length = lt.length, $ = true;
      }
    } else H[0] !== i.BACK && (H[0] = i.BACK, $ = true);
    $ && i.drawBuffers(H);
  }
  function te(C) {
    return v !== C ? (i.useProgram(C), v = C, true) : false;
  }
  const zt = { [wn]: i.FUNC_ADD, [$o]: i.FUNC_SUBTRACT, [jo]: i.FUNC_REVERSE_SUBTRACT };
  zt[Ko] = i.MIN, zt[Zo] = i.MAX;
  const se = { [Jo]: i.ZERO, [Qo]: i.ONE, [tl]: i.SRC_COLOR, [Xr]: i.SRC_ALPHA, [al]: i.SRC_ALPHA_SATURATE, [rl]: i.DST_COLOR, [nl]: i.DST_ALPHA, [el]: i.ONE_MINUS_SRC_COLOR, [Yr]: i.ONE_MINUS_SRC_ALPHA, [sl]: i.ONE_MINUS_DST_COLOR, [il]: i.ONE_MINUS_DST_ALPHA, [ol]: i.CONSTANT_COLOR, [ll]: i.ONE_MINUS_CONSTANT_COLOR, [cl]: i.CONSTANT_ALPHA, [hl]: i.ONE_MINUS_CONSTANT_ALPHA };
  function A(C, nt, H, $, lt, ot, Rt, ne, fe, qt) {
    if (C === pn) {
      M === true && (yt(i.BLEND), M = false);
      return;
    }
    if (M === false && (st(i.BLEND), M = true), C !== qo) {
      if (C !== p || qt !== S) {
        if ((u !== wn || y !== wn) && (i.blendEquation(i.FUNC_ADD), u = wn, y = wn), qt) switch (C) {
          case ni:
            i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case ta:
            i.blendFunc(i.ONE, i.ONE);
            break;
          case ea:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case na:
            i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", C);
            break;
        }
        else switch (C) {
          case ni:
            i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
            break;
          case ta:
            i.blendFunc(i.SRC_ALPHA, i.ONE);
            break;
          case ea:
            i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
            break;
          case na:
            i.blendFunc(i.ZERO, i.SRC_COLOR);
            break;
          default:
            console.error("THREE.WebGLState: Invalid blending: ", C);
            break;
        }
        T = null, b = null, U = null, w = null, P.set(0, 0, 0), I = 0, p = C, S = qt;
      }
      return;
    }
    lt = lt || nt, ot = ot || H, Rt = Rt || $, (nt !== u || lt !== y) && (i.blendEquationSeparate(zt[nt], zt[lt]), u = nt, y = lt), (H !== T || $ !== b || ot !== U || Rt !== w) && (i.blendFuncSeparate(se[H], se[$], se[ot], se[Rt]), T = H, b = $, U = ot, w = Rt), (ne.equals(P) === false || fe !== I) && (i.blendColor(ne.r, ne.g, ne.b, fe), P.copy(ne), I = fe), p = C, S = false;
  }
  function we(C, nt) {
    C.side === Qe ? yt(i.CULL_FACE) : st(i.CULL_FACE);
    let H = C.side === ye;
    nt && (H = !H), Ft(H), C.blending === ni && C.transparent === false ? A(pn) : A(C.blending, C.blendEquation, C.blendSrc, C.blendDst, C.blendEquationAlpha, C.blendSrcAlpha, C.blendDstAlpha, C.blendColor, C.blendAlpha, C.premultipliedAlpha), a.setFunc(C.depthFunc), a.setTest(C.depthTest), a.setMask(C.depthWrite), s.setMask(C.colorWrite);
    const $ = C.stencilWrite;
    o.setTest($), $ && (o.setMask(C.stencilWriteMask), o.setFunc(C.stencilFunc, C.stencilRef, C.stencilFuncMask), o.setOp(C.stencilFail, C.stencilZFail, C.stencilZPass)), Jt(C.polygonOffset, C.polygonOffsetFactor, C.polygonOffsetUnits), C.alphaToCoverage === true ? st(i.SAMPLE_ALPHA_TO_COVERAGE) : yt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ft(C) {
    x !== C && (C ? i.frontFace(i.CW) : i.frontFace(i.CCW), x = C);
  }
  function Ot(C) {
    C !== Wo ? (st(i.CULL_FACE), C !== R && (C === Qs ? i.cullFace(i.BACK) : C === Xo ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : yt(i.CULL_FACE), R = C;
  }
  function vt(C) {
    C !== Y && (k && i.lineWidth(C), Y = C);
  }
  function Jt(C, nt, H) {
    C ? (st(i.POLYGON_OFFSET_FILL), (z !== nt || W !== H) && (i.polygonOffset(nt, H), z = nt, W = H)) : yt(i.POLYGON_OFFSET_FILL);
  }
  function xt(C) {
    C ? st(i.SCISSOR_TEST) : yt(i.SCISSOR_TEST);
  }
  function E(C) {
    C === void 0 && (C = i.TEXTURE0 + K - 1), rt !== C && (i.activeTexture(C), rt = C);
  }
  function _(C, nt, H) {
    H === void 0 && (rt === null ? H = i.TEXTURE0 + K - 1 : H = rt);
    let $ = ht[H];
    $ === void 0 && ($ = { type: void 0, texture: void 0 }, ht[H] = $), ($.type !== C || $.texture !== nt) && (rt !== H && (i.activeTexture(H), rt = H), i.bindTexture(C, nt || mt[C]), $.type = C, $.texture = nt);
  }
  function N() {
    const C = ht[rt];
    C !== void 0 && C.type !== void 0 && (i.bindTexture(C.type, null), C.type = void 0, C.texture = void 0);
  }
  function q() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function j() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function G() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function _t() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function at() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function ut() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function Ht() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function J() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function dt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function Et() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (C) {
      console.error("THREE.WebGLState:", C);
    }
  }
  function bt(C) {
    Kt.equals(C) === false && (i.scissor(C.x, C.y, C.z, C.w), Kt.copy(C));
  }
  function ft(C) {
    X.equals(C) === false && (i.viewport(C.x, C.y, C.z, C.w), X.copy(C));
  }
  function Bt(C, nt) {
    let H = c.get(nt);
    H === void 0 && (H = /* @__PURE__ */ new WeakMap(), c.set(nt, H));
    let $ = H.get(C);
    $ === void 0 && ($ = i.getUniformBlockIndex(nt, C.name), H.set(C, $));
  }
  function Dt(C, nt) {
    const $ = c.get(nt).get(C);
    l.get(nt) !== $ && (i.uniformBlockBinding(nt, $, C.__bindingPointIndex), l.set(nt, $));
  }
  function Zt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(true, true, true, true), i.clearColor(0, 0, 0, 0), i.depthMask(true), i.depthFunc(i.LESS), a.setReversed(false), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, rt = null, ht = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), m = [], v = null, M = false, p = null, u = null, T = null, b = null, y = null, U = null, w = null, P = new Wt(0, 0, 0), I = 0, S = false, x = null, R = null, Y = null, z = null, W = null, Kt.set(0, 0, i.canvas.width, i.canvas.height), X.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return { buffers: { color: s, depth: a, stencil: o }, enable: st, disable: yt, bindFramebuffer: wt, drawBuffers: It, useProgram: te, setBlending: A, setMaterial: we, setFlipSided: Ft, setCullFace: Ot, setLineWidth: vt, setPolygonOffset: Jt, setScissorTest: xt, activeTexture: E, bindTexture: _, unbindTexture: N, compressedTexImage2D: q, compressedTexImage3D: j, texImage2D: dt, texImage3D: Et, updateUBOMapping: Bt, uniformBlockBinding: Dt, texStorage2D: Ht, texStorage3D: J, texSubImage2D: G, texSubImage3D: _t, compressedTexSubImage2D: at, compressedTexSubImage3D: ut, scissor: bt, viewport: ft, reset: Zt };
}
function Hf(i, t, e, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? false : /OculusBrowser/g.test(navigator.userAgent), c = new Pt(), h = /* @__PURE__ */ new WeakMap();
  let f;
  const d = /* @__PURE__ */ new WeakMap();
  let m = false;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch (e2) {
  }
  function v(E, _) {
    return m ? new OffscreenCanvas(E, _) : or("canvas");
  }
  function M(E, _, N) {
    let q = 1;
    const j = xt(E);
    if ((j.width > N || j.height > N) && (q = N / Math.max(j.width, j.height)), q < 1) if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
      const G = Math.floor(q * j.width), _t = Math.floor(q * j.height);
      f === void 0 && (f = v(G, _t));
      const at = _ ? v(G, _t) : f;
      return at.width = G, at.height = _t, at.getContext("2d").drawImage(E, 0, 0, G, _t), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + G + "x" + _t + ")."), at;
    } else return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), E;
    return E;
  }
  function p(E) {
    return E.generateMipmaps;
  }
  function u(E) {
    i.generateMipmap(E);
  }
  function T(E) {
    return E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? i.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function b(E, _, N, q, j = false) {
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let G = _;
    if (_ === i.RED && (N === i.FLOAT && (G = i.R32F), N === i.HALF_FLOAT && (G = i.R16F), N === i.UNSIGNED_BYTE && (G = i.R8)), _ === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (G = i.R8UI), N === i.UNSIGNED_SHORT && (G = i.R16UI), N === i.UNSIGNED_INT && (G = i.R32UI), N === i.BYTE && (G = i.R8I), N === i.SHORT && (G = i.R16I), N === i.INT && (G = i.R32I)), _ === i.RG && (N === i.FLOAT && (G = i.RG32F), N === i.HALF_FLOAT && (G = i.RG16F), N === i.UNSIGNED_BYTE && (G = i.RG8)), _ === i.RG_INTEGER && (N === i.UNSIGNED_BYTE && (G = i.RG8UI), N === i.UNSIGNED_SHORT && (G = i.RG16UI), N === i.UNSIGNED_INT && (G = i.RG32UI), N === i.BYTE && (G = i.RG8I), N === i.SHORT && (G = i.RG16I), N === i.INT && (G = i.RG32I)), _ === i.RGB_INTEGER && (N === i.UNSIGNED_BYTE && (G = i.RGB8UI), N === i.UNSIGNED_SHORT && (G = i.RGB16UI), N === i.UNSIGNED_INT && (G = i.RGB32UI), N === i.BYTE && (G = i.RGB8I), N === i.SHORT && (G = i.RGB16I), N === i.INT && (G = i.RGB32I)), _ === i.RGBA_INTEGER && (N === i.UNSIGNED_BYTE && (G = i.RGBA8UI), N === i.UNSIGNED_SHORT && (G = i.RGBA16UI), N === i.UNSIGNED_INT && (G = i.RGBA32UI), N === i.BYTE && (G = i.RGBA8I), N === i.SHORT && (G = i.RGBA16I), N === i.INT && (G = i.RGBA32I)), _ === i.RGB && N === i.UNSIGNED_INT_5_9_9_9_REV && (G = i.RGB9_E5), _ === i.RGBA) {
      const _t = j ? sr : Gt.getTransfer(q);
      N === i.FLOAT && (G = i.RGBA32F), N === i.HALF_FLOAT && (G = i.RGBA16F), N === i.UNSIGNED_BYTE && (G = _t === $t ? i.SRGB8_ALPHA8 : i.RGBA8), N === i.UNSIGNED_SHORT_4_4_4_4 && (G = i.RGBA4), N === i.UNSIGNED_SHORT_5_5_5_1 && (G = i.RGB5_A1);
    }
    return (G === i.R16F || G === i.R32F || G === i.RG16F || G === i.RG32F || G === i.RGBA16F || G === i.RGBA32F) && t.get("EXT_color_buffer_float"), G;
  }
  function y(E, _) {
    let N;
    return E ? _ === null || _ === Ln || _ === li ? N = i.DEPTH24_STENCIL8 : _ === tn ? N = i.DEPTH32F_STENCIL8 : _ === Mi && (N = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === Ln || _ === li ? N = i.DEPTH_COMPONENT24 : _ === tn ? N = i.DEPTH_COMPONENT32F : _ === Mi && (N = i.DEPTH_COMPONENT16), N;
  }
  function U(E, _) {
    return p(E) === true || E.isFramebufferTexture && E.minFilter !== He && E.minFilter !== ke ? Math.log2(Math.max(_.width, _.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? _.mipmaps.length : 1;
  }
  function w(E) {
    const _ = E.target;
    _.removeEventListener("dispose", w), I(_), _.isVideoTexture && h.delete(_);
  }
  function P(E) {
    const _ = E.target;
    _.removeEventListener("dispose", P), x(_);
  }
  function I(E) {
    const _ = n.get(E);
    if (_.__webglInit === void 0) return;
    const N = E.source, q = d.get(N);
    if (q) {
      const j = q[_.__cacheKey];
      j.usedTimes--, j.usedTimes === 0 && S(E), Object.keys(q).length === 0 && d.delete(N);
    }
    n.remove(E);
  }
  function S(E) {
    const _ = n.get(E);
    i.deleteTexture(_.__webglTexture);
    const N = E.source, q = d.get(N);
    delete q[_.__cacheKey], a.memory.textures--;
  }
  function x(E) {
    const _ = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget) for (let q = 0; q < 6; q++) {
      if (Array.isArray(_.__webglFramebuffer[q])) for (let j = 0; j < _.__webglFramebuffer[q].length; j++) i.deleteFramebuffer(_.__webglFramebuffer[q][j]);
      else i.deleteFramebuffer(_.__webglFramebuffer[q]);
      _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[q]);
    }
    else {
      if (Array.isArray(_.__webglFramebuffer)) for (let q = 0; q < _.__webglFramebuffer.length; q++) i.deleteFramebuffer(_.__webglFramebuffer[q]);
      else i.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && i.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer) for (let q = 0; q < _.__webglColorRenderbuffer.length; q++) _.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);
      _.__webglDepthRenderbuffer && i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const N = E.textures;
    for (let q = 0, j = N.length; q < j; q++) {
      const G = n.get(N[q]);
      G.__webglTexture && (i.deleteTexture(G.__webglTexture), a.memory.textures--), n.remove(N[q]);
    }
    n.remove(E);
  }
  let R = 0;
  function Y() {
    R = 0;
  }
  function z() {
    const E = R;
    return E >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), R += 1, E;
  }
  function W(E) {
    const _ = [];
    return _.push(E.wrapS), _.push(E.wrapT), _.push(E.wrapR || 0), _.push(E.magFilter), _.push(E.minFilter), _.push(E.anisotropy), _.push(E.internalFormat), _.push(E.format), _.push(E.type), _.push(E.generateMipmaps), _.push(E.premultiplyAlpha), _.push(E.flipY), _.push(E.unpackAlignment), _.push(E.colorSpace), _.join();
  }
  function K(E, _) {
    const N = n.get(E);
    if (E.isVideoTexture && vt(E), E.isRenderTargetTexture === false && E.version > 0 && N.__version !== E.version) {
      const q = E.image;
      if (q === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === false) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        X(N, E, _);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + _);
  }
  function k(E, _) {
    const N = n.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      X(N, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + _);
  }
  function Q(E, _) {
    const N = n.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      X(N, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + _);
  }
  function V(E, _) {
    const N = n.get(E);
    if (E.version > 0 && N.__version !== E.version) {
      tt(N, E, _);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + _);
  }
  const rt = { [ns]: i.REPEAT, [Cn]: i.CLAMP_TO_EDGE, [is]: i.MIRRORED_REPEAT }, ht = { [He]: i.NEAREST, [Ml]: i.NEAREST_MIPMAP_NEAREST, [Ci]: i.NEAREST_MIPMAP_LINEAR, [ke]: i.LINEAR, [fr]: i.LINEAR_MIPMAP_NEAREST, [Pn]: i.LINEAR_MIPMAP_LINEAR }, gt = { [bl]: i.NEVER, [Pl]: i.ALWAYS, [Tl]: i.LESS, [vo]: i.LEQUAL, [Al]: i.EQUAL, [Cl]: i.GEQUAL, [wl]: i.GREATER, [Rl]: i.NOTEQUAL };
  function Ut(E, _) {
    if (_.type === tn && t.has("OES_texture_float_linear") === false && (_.magFilter === ke || _.magFilter === fr || _.magFilter === Ci || _.magFilter === Pn || _.minFilter === ke || _.minFilter === fr || _.minFilter === Ci || _.minFilter === Pn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, rt[_.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, rt[_.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, rt[_.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, ht[_.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, ht[_.minFilter]), _.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, gt[_.compareFunction])), t.has("EXT_texture_filter_anisotropic") === true) {
      if (_.magFilter === He || _.minFilter !== Ci && _.minFilter !== Pn || _.type === tn && t.has("OES_texture_float_linear") === false) return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const N = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(E, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function Kt(E, _) {
    let N = false;
    E.__webglInit === void 0 && (E.__webglInit = true, _.addEventListener("dispose", w));
    const q = _.source;
    let j = d.get(q);
    j === void 0 && (j = {}, d.set(q, j));
    const G = W(_);
    if (G !== E.__cacheKey) {
      j[G] === void 0 && (j[G] = { texture: i.createTexture(), usedTimes: 0 }, a.memory.textures++, N = true), j[G].usedTimes++;
      const _t = j[E.__cacheKey];
      _t !== void 0 && (j[E.__cacheKey].usedTimes--, _t.usedTimes === 0 && S(_)), E.__cacheKey = G, E.__webglTexture = j[G].texture;
    }
    return N;
  }
  function X(E, _, N) {
    let q = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = i.TEXTURE_3D);
    const j = Kt(E, _), G = _.source;
    e.bindTexture(q, E.__webglTexture, i.TEXTURE0 + N);
    const _t = n.get(G);
    if (G.version !== _t.__version || j === true) {
      e.activeTexture(i.TEXTURE0 + N);
      const at = Gt.getPrimaries(Gt.workingColorSpace), ut = _.colorSpace === fn ? null : Gt.getPrimaries(_.colorSpace), Ht = _.colorSpace === fn || at === ut ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ht);
      let J = M(_.image, false, r.maxTextureSize);
      J = Jt(_, J);
      const dt = s.convert(_.format, _.colorSpace), Et = s.convert(_.type);
      let bt = b(_.internalFormat, dt, Et, _.colorSpace, _.isVideoTexture);
      Ut(q, _);
      let ft;
      const Bt = _.mipmaps, Dt = _.isVideoTexture !== true, Zt = _t.__version === void 0 || j === true, C = G.dataReady, nt = U(_, J);
      if (_.isDepthTexture) bt = y(_.format === ci, _.type), Zt && (Dt ? e.texStorage2D(i.TEXTURE_2D, 1, bt, J.width, J.height) : e.texImage2D(i.TEXTURE_2D, 0, bt, J.width, J.height, 0, dt, Et, null));
      else if (_.isDataTexture) if (Bt.length > 0) {
        Dt && Zt && e.texStorage2D(i.TEXTURE_2D, nt, bt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], Dt ? C && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, Et, ft.data) : e.texImage2D(i.TEXTURE_2D, H, bt, ft.width, ft.height, 0, dt, Et, ft.data);
        _.generateMipmaps = false;
      } else Dt ? (Zt && e.texStorage2D(i.TEXTURE_2D, nt, bt, J.width, J.height), C && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, dt, Et, J.data)) : e.texImage2D(i.TEXTURE_2D, 0, bt, J.width, J.height, 0, dt, Et, J.data);
      else if (_.isCompressedTexture) if (_.isCompressedArrayTexture) {
        Dt && Zt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, bt, Bt[0].width, Bt[0].height, J.depth);
        for (let H = 0, $ = Bt.length; H < $; H++) if (ft = Bt[H], _.format !== ze) if (dt !== null) if (Dt) {
          if (C) if (_.layerUpdates.size > 0) {
            const lt = Ca(ft.width, ft.height, _.format, _.type);
            for (const ot of _.layerUpdates) {
              const Rt = ft.data.subarray(ot * lt / ft.data.BYTES_PER_ELEMENT, (ot + 1) * lt / ft.data.BYTES_PER_ELEMENT);
              e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, ot, ft.width, ft.height, 1, dt, Rt);
            }
            _.clearLayerUpdates();
          } else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, ft.width, ft.height, J.depth, dt, ft.data);
        } else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, H, bt, ft.width, ft.height, J.depth, 0, ft.data, 0, 0);
        else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
        else Dt ? C && e.texSubImage3D(i.TEXTURE_2D_ARRAY, H, 0, 0, 0, ft.width, ft.height, J.depth, dt, Et, ft.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, H, bt, ft.width, ft.height, J.depth, 0, dt, Et, ft.data);
      } else {
        Dt && Zt && e.texStorage2D(i.TEXTURE_2D, nt, bt, Bt[0].width, Bt[0].height);
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], _.format !== ze ? dt !== null ? Dt ? C && e.compressedTexSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, ft.data) : e.compressedTexImage2D(i.TEXTURE_2D, H, bt, ft.width, ft.height, 0, ft.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Dt ? C && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, ft.width, ft.height, dt, Et, ft.data) : e.texImage2D(i.TEXTURE_2D, H, bt, ft.width, ft.height, 0, dt, Et, ft.data);
      }
      else if (_.isDataArrayTexture) if (Dt) {
        if (Zt && e.texStorage3D(i.TEXTURE_2D_ARRAY, nt, bt, J.width, J.height, J.depth), C) if (_.layerUpdates.size > 0) {
          const H = Ca(J.width, J.height, _.format, _.type);
          for (const $ of _.layerUpdates) {
            const lt = J.data.subarray($ * H / J.data.BYTES_PER_ELEMENT, ($ + 1) * H / J.data.BYTES_PER_ELEMENT);
            e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, $, J.width, J.height, 1, dt, Et, lt);
          }
          _.clearLayerUpdates();
        } else e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, dt, Et, J.data);
      } else e.texImage3D(i.TEXTURE_2D_ARRAY, 0, bt, J.width, J.height, J.depth, 0, dt, Et, J.data);
      else if (_.isData3DTexture) Dt ? (Zt && e.texStorage3D(i.TEXTURE_3D, nt, bt, J.width, J.height, J.depth), C && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, dt, Et, J.data)) : e.texImage3D(i.TEXTURE_3D, 0, bt, J.width, J.height, J.depth, 0, dt, Et, J.data);
      else if (_.isFramebufferTexture) {
        if (Zt) if (Dt) e.texStorage2D(i.TEXTURE_2D, nt, bt, J.width, J.height);
        else {
          let H = J.width, $ = J.height;
          for (let lt = 0; lt < nt; lt++) e.texImage2D(i.TEXTURE_2D, lt, bt, H, $, 0, dt, Et, null), H >>= 1, $ >>= 1;
        }
      } else if (Bt.length > 0) {
        if (Dt && Zt) {
          const H = xt(Bt[0]);
          e.texStorage2D(i.TEXTURE_2D, nt, bt, H.width, H.height);
        }
        for (let H = 0, $ = Bt.length; H < $; H++) ft = Bt[H], Dt ? C && e.texSubImage2D(i.TEXTURE_2D, H, 0, 0, dt, Et, ft) : e.texImage2D(i.TEXTURE_2D, H, bt, dt, Et, ft);
        _.generateMipmaps = false;
      } else if (Dt) {
        if (Zt) {
          const H = xt(J);
          e.texStorage2D(i.TEXTURE_2D, nt, bt, H.width, H.height);
        }
        C && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, dt, Et, J);
      } else e.texImage2D(i.TEXTURE_2D, 0, bt, dt, Et, J);
      p(_) && u(q), _t.__version = G.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function tt(E, _, N) {
    if (_.image.length !== 6) return;
    const q = Kt(E, _), j = _.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + N);
    const G = n.get(j);
    if (j.version !== G.__version || q === true) {
      e.activeTexture(i.TEXTURE0 + N);
      const _t = Gt.getPrimaries(Gt.workingColorSpace), at = _.colorSpace === fn ? null : Gt.getPrimaries(_.colorSpace), ut = _.colorSpace === fn || _t === at ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ut);
      const Ht = _.isCompressedTexture || _.image[0].isCompressedTexture, J = _.image[0] && _.image[0].isDataTexture, dt = [];
      for (let $ = 0; $ < 6; $++) !Ht && !J ? dt[$] = M(_.image[$], true, r.maxCubemapSize) : dt[$] = J ? _.image[$].image : _.image[$], dt[$] = Jt(_, dt[$]);
      const Et = dt[0], bt = s.convert(_.format, _.colorSpace), ft = s.convert(_.type), Bt = b(_.internalFormat, bt, ft, _.colorSpace), Dt = _.isVideoTexture !== true, Zt = G.__version === void 0 || q === true, C = j.dataReady;
      let nt = U(_, Et);
      Ut(i.TEXTURE_CUBE_MAP, _);
      let H;
      if (Ht) {
        Dt && Zt && e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, Et.width, Et.height);
        for (let $ = 0; $ < 6; $++) {
          H = dt[$].mipmaps;
          for (let lt = 0; lt < H.length; lt++) {
            const ot = H[lt];
            _.format !== ze ? bt !== null ? Dt ? C && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, 0, 0, ot.width, ot.height, bt, ot.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, Bt, ot.width, ot.height, 0, ot.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Dt ? C && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, 0, 0, ot.width, ot.height, bt, ft, ot.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt, Bt, ot.width, ot.height, 0, bt, ft, ot.data);
          }
        }
      } else {
        if (H = _.mipmaps, Dt && Zt) {
          H.length > 0 && nt++;
          const $ = xt(dt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, nt, Bt, $.width, $.height);
        }
        for (let $ = 0; $ < 6; $++) if (J) {
          Dt ? C && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, dt[$].width, dt[$].height, bt, ft, dt[$].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, dt[$].width, dt[$].height, 0, bt, ft, dt[$].data);
          for (let lt = 0; lt < H.length; lt++) {
            const Rt = H[lt].image[$].image;
            Dt ? C && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, 0, 0, Rt.width, Rt.height, bt, ft, Rt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, Bt, Rt.width, Rt.height, 0, bt, ft, Rt.data);
          }
        } else {
          Dt ? C && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, bt, ft, dt[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Bt, bt, ft, dt[$]);
          for (let lt = 0; lt < H.length; lt++) {
            const ot = H[lt];
            Dt ? C && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, 0, 0, bt, ft, ot.image[$]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + $, lt + 1, Bt, bt, ft, ot.image[$]);
          }
        }
      }
      p(_) && u(i.TEXTURE_CUBE_MAP), G.__version = j.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function mt(E, _, N, q, j, G) {
    const _t = s.convert(N.format, N.colorSpace), at = s.convert(N.type), ut = b(N.internalFormat, _t, at, N.colorSpace), Ht = n.get(_), J = n.get(N);
    if (J.__renderTarget = _, !Ht.__hasExternalTextures) {
      const dt = Math.max(1, _.width >> G), Et = Math.max(1, _.height >> G);
      j === i.TEXTURE_3D || j === i.TEXTURE_2D_ARRAY ? e.texImage3D(j, G, ut, dt, Et, _.depth, 0, _t, at, null) : e.texImage2D(j, G, ut, dt, Et, 0, _t, at, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, E), Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, j, J.__webglTexture, 0, Ft(_)) : (j === i.TEXTURE_2D || j >= i.TEXTURE_CUBE_MAP_POSITIVE_X && j <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, j, J.__webglTexture, G), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function st(E, _, N) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), _.depthBuffer) {
      const q = _.depthTexture, j = q && q.isDepthTexture ? q.type : null, G = y(_.stencilBuffer, j), _t = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, at = Ft(_);
      Ot(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, at, G, _.width, _.height) : N ? i.renderbufferStorageMultisample(i.RENDERBUFFER, at, G, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, G, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, _t, i.RENDERBUFFER, E);
    } else {
      const q = _.textures;
      for (let j = 0; j < q.length; j++) {
        const G = q[j], _t = s.convert(G.format, G.colorSpace), at = s.convert(G.type), ut = b(G.internalFormat, _t, at, G.colorSpace), Ht = Ft(_);
        N && Ot(_) === false ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ht, ut, _.width, _.height) : Ot(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ht, ut, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, ut, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function yt(E, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, E), !(_.depthTexture && _.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const q = n.get(_.depthTexture);
    q.__renderTarget = _, (!q.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = true), K(_.depthTexture, 0);
    const j = q.__webglTexture, G = Ft(_);
    if (_.depthTexture.format === ii) Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0, G) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else if (_.depthTexture.format === ci) Ot(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0, G) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function wt(E) {
    const _ = n.get(E), N = E.isWebGLCubeRenderTarget === true;
    if (_.__boundDepthTexture !== E.depthTexture) {
      const q = E.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) {
        const j = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", j);
        };
        q.addEventListener("dispose", j), _.__depthDisposeCallback = j;
      }
      _.__boundDepthTexture = q;
    }
    if (E.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (N) throw new Error("target.depthTexture not supported in Cube render targets");
      yt(_.__webglFramebuffer, E);
    } else if (N) {
      _.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++) if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0) _.__webglDepthbuffer[q] = i.createRenderbuffer(), st(_.__webglDepthbuffer[q], E, false);
      else {
        const j = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, G = _.__webglDepthbuffer[q];
        i.bindRenderbuffer(i.RENDERBUFFER, G), i.framebufferRenderbuffer(i.FRAMEBUFFER, j, i.RENDERBUFFER, G);
      }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0) _.__webglDepthbuffer = i.createRenderbuffer(), st(_.__webglDepthbuffer, E, false);
    else {
      const q = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = _.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, j);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function It(E, _, N) {
    const q = n.get(E);
    _ !== void 0 && mt(q.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), N !== void 0 && wt(E);
  }
  function te(E) {
    const _ = E.texture, N = n.get(E), q = n.get(_);
    E.addEventListener("dispose", P);
    const j = E.textures, G = E.isWebGLCubeRenderTarget === true, _t = j.length > 1;
    if (_t || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = _.version, a.memory.textures++), G) {
      N.__webglFramebuffer = [];
      for (let at = 0; at < 6; at++) if (_.mipmaps && _.mipmaps.length > 0) {
        N.__webglFramebuffer[at] = [];
        for (let ut = 0; ut < _.mipmaps.length; ut++) N.__webglFramebuffer[at][ut] = i.createFramebuffer();
      } else N.__webglFramebuffer[at] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        N.__webglFramebuffer = [];
        for (let at = 0; at < _.mipmaps.length; at++) N.__webglFramebuffer[at] = i.createFramebuffer();
      } else N.__webglFramebuffer = i.createFramebuffer();
      if (_t) for (let at = 0, ut = j.length; at < ut; at++) {
        const Ht = n.get(j[at]);
        Ht.__webglTexture === void 0 && (Ht.__webglTexture = i.createTexture(), a.memory.textures++);
      }
      if (E.samples > 0 && Ot(E) === false) {
        N.__webglMultisampledFramebuffer = i.createFramebuffer(), N.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
        for (let at = 0; at < j.length; at++) {
          const ut = j[at];
          N.__webglColorRenderbuffer[at] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[at]);
          const Ht = s.convert(ut.format, ut.colorSpace), J = s.convert(ut.type), dt = b(ut.internalFormat, Ht, J, ut.colorSpace, E.isXRRenderTarget === true), Et = Ft(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Et, dt, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + at, i.RENDERBUFFER, N.__webglColorRenderbuffer[at]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(), st(N.__webglDepthRenderbuffer, E, true)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (G) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), Ut(i.TEXTURE_CUBE_MAP, _);
      for (let at = 0; at < 6; at++) if (_.mipmaps && _.mipmaps.length > 0) for (let ut = 0; ut < _.mipmaps.length; ut++) mt(N.__webglFramebuffer[at][ut], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + at, ut);
      else mt(N.__webglFramebuffer[at], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + at, 0);
      p(_) && u(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (_t) {
      for (let at = 0, ut = j.length; at < ut; at++) {
        const Ht = j[at], J = n.get(Ht);
        e.bindTexture(i.TEXTURE_2D, J.__webglTexture), Ut(i.TEXTURE_2D, Ht), mt(N.__webglFramebuffer, E, Ht, i.COLOR_ATTACHMENT0 + at, i.TEXTURE_2D, 0), p(Ht) && u(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let at = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (at = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(at, q.__webglTexture), Ut(at, _), _.mipmaps && _.mipmaps.length > 0) for (let ut = 0; ut < _.mipmaps.length; ut++) mt(N.__webglFramebuffer[ut], E, _, i.COLOR_ATTACHMENT0, at, ut);
      else mt(N.__webglFramebuffer, E, _, i.COLOR_ATTACHMENT0, at, 0);
      p(_) && u(at), e.unbindTexture();
    }
    E.depthBuffer && wt(E);
  }
  function zt(E) {
    const _ = E.textures;
    for (let N = 0, q = _.length; N < q; N++) {
      const j = _[N];
      if (p(j)) {
        const G = T(E), _t = n.get(j).__webglTexture;
        e.bindTexture(G, _t), u(G), e.unbindTexture();
      }
    }
  }
  const se = [], A = [];
  function we(E) {
    if (E.samples > 0) {
      if (Ot(E) === false) {
        const _ = E.textures, N = E.width, q = E.height;
        let j = i.COLOR_BUFFER_BIT;
        const G = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, _t = n.get(E), at = _.length > 1;
        if (at) for (let ut = 0; ut < _.length; ut++) e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, _t.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, _t.__webglFramebuffer);
        for (let ut = 0; ut < _.length; ut++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (j |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (j |= i.STENCIL_BUFFER_BIT)), at) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, _t.__webglColorRenderbuffer[ut]);
            const Ht = n.get(_[ut]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ht, 0);
          }
          i.blitFramebuffer(0, 0, N, q, 0, 0, N, q, j, i.NEAREST), l === true && (se.length = 0, A.length = 0, se.push(i.COLOR_ATTACHMENT0 + ut), E.depthBuffer && E.resolveDepthBuffer === false && (se.push(G), A.push(G), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, A)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, se));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), at) for (let ut = 0; ut < _.length; ut++) {
          e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, _t.__webglColorRenderbuffer[ut]);
          const Ht = n.get(_[ut]).__webglTexture;
          e.bindFramebuffer(i.FRAMEBUFFER, _t.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, Ht, 0);
        }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, _t.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === false && l) {
        const _ = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function Ft(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function Ot(E) {
    const _ = n.get(E);
    return E.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === true && _.__useRenderToTexture !== false;
  }
  function vt(E) {
    const _ = a.render.frame;
    h.get(E) !== _ && (h.set(E, _), E.update());
  }
  function Jt(E, _) {
    const N = E.colorSpace, q = E.format, j = E.type;
    return E.isCompressedTexture === true || E.isVideoTexture === true || N !== hi && N !== fn && (Gt.getTransfer(N) === $t ? (q !== ze || j !== sn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), _;
  }
  function xt(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (c.width = E.naturalWidth || E.width, c.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (c.width = E.displayWidth, c.height = E.displayHeight) : (c.width = E.width, c.height = E.height), c;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = Y, this.setTexture2D = K, this.setTexture2DArray = k, this.setTexture3D = Q, this.setTextureCube = V, this.rebindTextures = It, this.setupRenderTarget = te, this.updateRenderTargetMipmap = zt, this.updateMultisampleRenderTarget = we, this.setupDepthRenderbuffer = wt, this.setupFrameBufferTexture = mt, this.useMultisampledRTT = Ot;
}
function Vf(i, t) {
  function e(n, r = fn) {
    let s;
    const a = Gt.getTransfer(r);
    if (n === sn) return i.UNSIGNED_BYTE;
    if (n === Ns) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Fs) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === lo) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === ao) return i.BYTE;
    if (n === oo) return i.SHORT;
    if (n === Mi) return i.UNSIGNED_SHORT;
    if (n === Is) return i.INT;
    if (n === Ln) return i.UNSIGNED_INT;
    if (n === tn) return i.FLOAT;
    if (n === Ei) return i.HALF_FLOAT;
    if (n === co) return i.ALPHA;
    if (n === ho) return i.RGB;
    if (n === ze) return i.RGBA;
    if (n === uo) return i.LUMINANCE;
    if (n === fo) return i.LUMINANCE_ALPHA;
    if (n === ii) return i.DEPTH_COMPONENT;
    if (n === ci) return i.DEPTH_STENCIL;
    if (n === po) return i.RED;
    if (n === Os) return i.RED_INTEGER;
    if (n === mo) return i.RG;
    if (n === Bs) return i.RG_INTEGER;
    if (n === zs) return i.RGBA_INTEGER;
    if (n === Ji || n === Qi || n === tr || n === er) if (a === $t) if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
      if (n === Ji) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
      if (n === Qi) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
      if (n === tr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
      if (n === er) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
    } else return null;
    else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
      if (n === Ji) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (n === Qi) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (n === tr) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (n === er) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (n === rs || n === ss || n === as || n === os) if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
      if (n === rs) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
      if (n === ss) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
      if (n === as) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
      if (n === os) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
    } else return null;
    if (n === ls || n === cs || n === hs) if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
      if (n === ls || n === cs) return a === $t ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
      if (n === hs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
    } else return null;
    if (n === us || n === ds || n === fs || n === ps || n === ms || n === _s || n === gs || n === vs || n === xs || n === Ms || n === Ss || n === Es || n === ys || n === bs) if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
      if (n === us) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
      if (n === ds) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
      if (n === fs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
      if (n === ps) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
      if (n === ms) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
      if (n === _s) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
      if (n === gs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
      if (n === vs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
      if (n === xs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
      if (n === Ms) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
      if (n === Ss) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
      if (n === Es) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
      if (n === ys) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
      if (n === bs) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
    } else return null;
    if (n === nr || n === Ts || n === As) if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
      if (n === nr) return a === $t ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      if (n === Ts) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
      if (n === As) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
    } else return null;
    if (n === _o || n === ws || n === Rs || n === Cs) if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
      if (n === nr) return s.COMPRESSED_RED_RGTC1_EXT;
      if (n === ws) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
      if (n === Rs) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
      if (n === Cs) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
    } else return null;
    return n === li ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
const kf = { type: "move" };
class kr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new qi(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new qi(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new F(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new F()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new qi(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new F(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new F()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e) for (const n of t.hand.values()) this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = false), this._grip !== null && (this._grip.visible = false), this._hand !== null && (this._hand.visible = false), this;
  }
  update(t, e, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        a = true;
        for (const M of t.hand.values()) {
          const p = e.getJointPose(M, n), u = this._getHandJoint(c, M);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = true, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], d = h.position.distanceTo(f.position), m = 0.02, v = 5e-3;
        c.inputState.pinching && d > m + v ? (c.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !c.inputState.pinching && d <= m - v && (c.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
      } else l !== null && t.gripSpace && (s = e.getPose(t.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = true, s.linearVelocity ? (l.hasLinearVelocity = true, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = false, s.angularVelocity ? (l.hasAngularVelocity = true, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = false));
      o !== null && (r = e.getPose(t.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, r.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = false, r.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = false, this.dispatchEvent(kf)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new qi();
      n.matrixAutoUpdate = false, n.visible = false, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const Gf = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", Wf = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}";
class Xf {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const r = new xe(), s = t.properties.get(r);
      s.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = r;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new gn({ vertexShader: Gf, fragmentShader: Wf, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: e.z }, depthHeight: { value: e.w } } });
      this.mesh = new nn(new cr(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Yf extends Nn {
  constructor(t, e) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, h = null, f = null, d = null, m = null, v = null;
    const M = new Xf(), p = e.getContextAttributes();
    let u = null, T = null;
    const b = [], y = [], U = new Pt();
    let w = null;
    const P = new Oe();
    P.viewport = new re();
    const I = new Oe();
    I.viewport = new re();
    const S = [P, I], x = new uc();
    let R = null, Y = null;
    this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(X) {
      let tt = b[X];
      return tt === void 0 && (tt = new kr(), b[X] = tt), tt.getTargetRaySpace();
    }, this.getControllerGrip = function(X) {
      let tt = b[X];
      return tt === void 0 && (tt = new kr(), b[X] = tt), tt.getGripSpace();
    }, this.getHand = function(X) {
      let tt = b[X];
      return tt === void 0 && (tt = new kr(), b[X] = tt), tt.getHandSpace();
    };
    function z(X) {
      const tt = y.indexOf(X.inputSource);
      if (tt === -1) return;
      const mt = b[tt];
      mt !== void 0 && (mt.update(X.inputSource, X.frame, c || a), mt.dispatchEvent({ type: X.type, data: X.inputSource }));
    }
    function W() {
      r.removeEventListener("select", z), r.removeEventListener("selectstart", z), r.removeEventListener("selectend", z), r.removeEventListener("squeeze", z), r.removeEventListener("squeezestart", z), r.removeEventListener("squeezeend", z), r.removeEventListener("end", W), r.removeEventListener("inputsourceschange", K);
      for (let X = 0; X < b.length; X++) {
        const tt = y[X];
        tt !== null && (y[X] = null, b[X].disconnect(tt));
      }
      R = null, Y = null, M.reset(), t.setRenderTarget(u), m = null, d = null, f = null, r = null, T = null, Kt.stop(), n.isPresenting = false, t.setPixelRatio(w), t.setSize(U.width, U.height, false), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(X) {
      s = X, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(X) {
      o = X, n.isPresenting === true && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(X) {
      c = X;
    }, this.getBaseLayer = function() {
      return d !== null ? d : m;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return v;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(X) {
      if (r = X, r !== null) {
        if (u = t.getRenderTarget(), r.addEventListener("select", z), r.addEventListener("selectstart", z), r.addEventListener("selectend", z), r.addEventListener("squeeze", z), r.addEventListener("squeezestart", z), r.addEventListener("squeezeend", z), r.addEventListener("end", W), r.addEventListener("inputsourceschange", K), p.xrCompatible !== true && await e.makeXRCompatible(), w = t.getPixelRatio(), t.getSize(U), r.renderState.layers === void 0) {
          const tt = { antialias: p.antialias, alpha: true, depth: p.depth, stencil: p.stencil, framebufferScaleFactor: s };
          m = new XRWebGLLayer(r, e, tt), r.updateRenderState({ baseLayer: m }), t.setPixelRatio(1), t.setSize(m.framebufferWidth, m.framebufferHeight, false), T = new Un(m.framebufferWidth, m.framebufferHeight, { format: ze, type: sn, colorSpace: t.outputColorSpace, stencilBuffer: p.stencil });
        } else {
          let tt = null, mt = null, st = null;
          p.depth && (st = p.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, tt = p.stencil ? ci : ii, mt = p.stencil ? li : Ln);
          const yt = { colorFormat: e.RGBA8, depthFormat: st, scaleFactor: s };
          f = new XRWebGLBinding(r, e), d = f.createProjectionLayer(yt), r.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, false), T = new Un(d.textureWidth, d.textureHeight, { format: ze, type: sn, depthTexture: new Co(d.textureWidth, d.textureHeight, mt, void 0, void 0, void 0, void 0, void 0, void 0, tt), stencilBuffer: p.stencil, colorSpace: t.outputColorSpace, samples: p.antialias ? 4 : 0, resolveDepthBuffer: d.ignoreDepthValues === false });
        }
        T.isXRRenderTarget = true, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), Kt.setContext(r), Kt.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null) return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return M.getDepthTexture();
    };
    function K(X) {
      for (let tt = 0; tt < X.removed.length; tt++) {
        const mt = X.removed[tt], st = y.indexOf(mt);
        st >= 0 && (y[st] = null, b[st].disconnect(mt));
      }
      for (let tt = 0; tt < X.added.length; tt++) {
        const mt = X.added[tt];
        let st = y.indexOf(mt);
        if (st === -1) {
          for (let wt = 0; wt < b.length; wt++) if (wt >= y.length) {
            y.push(mt), st = wt;
            break;
          } else if (y[wt] === null) {
            y[wt] = mt, st = wt;
            break;
          }
          if (st === -1) break;
        }
        const yt = b[st];
        yt && yt.connect(mt);
      }
    }
    const k = new F(), Q = new F();
    function V(X, tt, mt) {
      k.setFromMatrixPosition(tt.matrixWorld), Q.setFromMatrixPosition(mt.matrixWorld);
      const st = k.distanceTo(Q), yt = tt.projectionMatrix.elements, wt = mt.projectionMatrix.elements, It = yt[14] / (yt[10] - 1), te = yt[14] / (yt[10] + 1), zt = (yt[9] + 1) / yt[5], se = (yt[9] - 1) / yt[5], A = (yt[8] - 1) / yt[0], we = (wt[8] + 1) / wt[0], Ft = It * A, Ot = It * we, vt = st / (-A + we), Jt = vt * -A;
      if (tt.matrixWorld.decompose(X.position, X.quaternion, X.scale), X.translateX(Jt), X.translateZ(vt), X.matrixWorld.compose(X.position, X.quaternion, X.scale), X.matrixWorldInverse.copy(X.matrixWorld).invert(), yt[10] === -1) X.projectionMatrix.copy(tt.projectionMatrix), X.projectionMatrixInverse.copy(tt.projectionMatrixInverse);
      else {
        const xt = It + vt, E = te + vt, _ = Ft - Jt, N = Ot + (st - Jt), q = zt * te / E * xt, j = se * te / E * xt;
        X.projectionMatrix.makePerspective(_, N, q, j, xt, E), X.projectionMatrixInverse.copy(X.projectionMatrix).invert();
      }
    }
    function rt(X, tt) {
      tt === null ? X.matrixWorld.copy(X.matrix) : X.matrixWorld.multiplyMatrices(tt.matrixWorld, X.matrix), X.matrixWorldInverse.copy(X.matrixWorld).invert();
    }
    this.updateCamera = function(X) {
      if (r === null) return;
      let tt = X.near, mt = X.far;
      M.texture !== null && (M.depthNear > 0 && (tt = M.depthNear), M.depthFar > 0 && (mt = M.depthFar)), x.near = I.near = P.near = tt, x.far = I.far = P.far = mt, (R !== x.near || Y !== x.far) && (r.updateRenderState({ depthNear: x.near, depthFar: x.far }), R = x.near, Y = x.far), P.layers.mask = X.layers.mask | 2, I.layers.mask = X.layers.mask | 4, x.layers.mask = P.layers.mask | I.layers.mask;
      const st = X.parent, yt = x.cameras;
      rt(x, st);
      for (let wt = 0; wt < yt.length; wt++) rt(yt[wt], st);
      yt.length === 2 ? V(x, P, I) : x.projectionMatrix.copy(P.projectionMatrix), ht(X, x, st);
    };
    function ht(X, tt, mt) {
      mt === null ? X.matrix.copy(tt.matrixWorld) : (X.matrix.copy(mt.matrixWorld), X.matrix.invert(), X.matrix.multiply(tt.matrixWorld)), X.matrix.decompose(X.position, X.quaternion, X.scale), X.updateMatrixWorld(true), X.projectionMatrix.copy(tt.projectionMatrix), X.projectionMatrixInverse.copy(tt.projectionMatrixInverse), X.isPerspectiveCamera && (X.fov = Ps * 2 * Math.atan(1 / X.projectionMatrix.elements[5]), X.zoom = 1);
    }
    this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (!(d === null && m === null)) return l;
    }, this.setFoveation = function(X) {
      l = X, d !== null && (d.fixedFoveation = X), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = X);
    }, this.hasDepthSensing = function() {
      return M.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return M.getMesh(x);
    };
    let gt = null;
    function Ut(X, tt) {
      if (h = tt.getViewerPose(c || a), v = tt, h !== null) {
        const mt = h.views;
        m !== null && (t.setRenderTargetFramebuffer(T, m.framebuffer), t.setRenderTarget(T));
        let st = false;
        mt.length !== x.cameras.length && (x.cameras.length = 0, st = true);
        for (let wt = 0; wt < mt.length; wt++) {
          const It = mt[wt];
          let te = null;
          if (m !== null) te = m.getViewport(It);
          else {
            const se = f.getViewSubImage(d, It);
            te = se.viewport, wt === 0 && (t.setRenderTargetTextures(T, se.colorTexture, d.ignoreDepthValues ? void 0 : se.depthStencilTexture), t.setRenderTarget(T));
          }
          let zt = S[wt];
          zt === void 0 && (zt = new Oe(), zt.layers.enable(wt), zt.viewport = new re(), S[wt] = zt), zt.matrix.fromArray(It.transform.matrix), zt.matrix.decompose(zt.position, zt.quaternion, zt.scale), zt.projectionMatrix.fromArray(It.projectionMatrix), zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(), zt.viewport.set(te.x, te.y, te.width, te.height), wt === 0 && (x.matrix.copy(zt.matrix), x.matrix.decompose(x.position, x.quaternion, x.scale)), st === true && x.cameras.push(zt);
        }
        const yt = r.enabledFeatures;
        if (yt && yt.includes("depth-sensing")) {
          const wt = f.getDepthInformation(mt[0]);
          wt && wt.isValid && wt.texture && M.init(t, wt, r.renderState);
        }
      }
      for (let mt = 0; mt < b.length; mt++) {
        const st = y[mt], yt = b[mt];
        st !== null && yt !== void 0 && yt.update(st, tt, c || a);
      }
      gt && gt(X, tt), tt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: tt }), v = null;
    }
    const Kt = new Lo();
    Kt.setAnimationLoop(Ut), this.setAnimationLoop = function(X) {
      gt = X;
    }, this.dispose = function() {
    };
  }
}
const Tn = new Xe(), qf = new ee();
function $f(i, t) {
  function e(p, u) {
    p.matrixAutoUpdate === true && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, Ao(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, T, b, y) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(p, u) : u.isMeshToonMaterial ? (s(p, u), f(p, u)) : u.isMeshPhongMaterial ? (s(p, u), h(p, u)) : u.isMeshStandardMaterial ? (s(p, u), d(p, u), u.isMeshPhysicalMaterial && m(p, u, y)) : u.isMeshMatcapMaterial ? (s(p, u), v(p, u)) : u.isMeshDepthMaterial ? s(p, u) : u.isMeshDistanceMaterial ? (s(p, u), M(p, u)) : u.isMeshNormalMaterial ? s(p, u) : u.isLineBasicMaterial ? (a(p, u), u.isLineDashedMaterial && o(p, u)) : u.isPointsMaterial ? l(p, u, T, b) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = false);
  }
  function s(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, e(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, e(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === ye && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, e(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === ye && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, e(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, e(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, e(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const T = t.get(u), b = T.envMap, y = T.envMapRotation;
    b && (p.envMap.value = b, Tn.copy(y), Tn.x *= -1, Tn.y *= -1, Tn.z *= -1, b.isCubeTexture && b.isRenderTargetTexture === false && (Tn.y *= -1, Tn.z *= -1), p.envMapRotation.value.setFromMatrix4(qf.makeRotationFromEuler(Tn)), p.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === false ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap && (p.lightMap.value = u.lightMap, p.lightMapIntensity.value = u.lightMapIntensity, e(u.lightMap, p.lightMapTransform)), u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, e(u.aoMap, p.aoMapTransform));
  }
  function a(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, e(u.map, p.mapTransform));
  }
  function o(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function l(p, u, T, b) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * T, p.scale.value = b * 0.5, u.map && (p.map.value = u.map, e(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, e(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, e(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function d(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, e(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, e(u.roughnessMap, p.roughnessMapTransform)), u.envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, T) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, e(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, e(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, e(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, e(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, e(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === ye && p.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (p.dispersion.value = u.dispersion), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, e(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, e(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = T.texture, p.transmissionSamplerSize.value.set(T.width, T.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, e(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, e(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, e(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, e(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, e(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function v(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function M(p, u) {
    const T = t.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(T.matrixWorld), p.nearDistance.value = T.shadow.camera.near, p.farDistance.value = T.shadow.camera.far;
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: r };
}
function jf(i, t, e, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(T, b) {
    const y = b.program;
    n.uniformBlockBinding(T, y);
  }
  function c(T, b) {
    let y = r[T.id];
    y === void 0 && (v(T), y = h(T), r[T.id] = y, T.addEventListener("dispose", p));
    const U = b.program;
    n.updateUBOMapping(T, U);
    const w = t.render.frame;
    s[T.id] !== w && (d(T), s[T.id] = w);
  }
  function h(T) {
    const b = f();
    T.__bindingPointIndex = b;
    const y = i.createBuffer(), U = T.__size, w = T.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, U, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, b, y), y;
  }
  function f() {
    for (let T = 0; T < o; T++) if (a.indexOf(T) === -1) return a.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(T) {
    const b = r[T.id], y = T.uniforms, U = T.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, b);
    for (let w = 0, P = y.length; w < P; w++) {
      const I = Array.isArray(y[w]) ? y[w] : [y[w]];
      for (let S = 0, x = I.length; S < x; S++) {
        const R = I[S];
        if (m(R, w, S, U) === true) {
          const Y = R.__offset, z = Array.isArray(R.value) ? R.value : [R.value];
          let W = 0;
          for (let K = 0; K < z.length; K++) {
            const k = z[K], Q = M(k);
            typeof k == "number" || typeof k == "boolean" ? (R.__data[0] = k, i.bufferSubData(i.UNIFORM_BUFFER, Y + W, R.__data)) : k.isMatrix3 ? (R.__data[0] = k.elements[0], R.__data[1] = k.elements[1], R.__data[2] = k.elements[2], R.__data[3] = 0, R.__data[4] = k.elements[3], R.__data[5] = k.elements[4], R.__data[6] = k.elements[5], R.__data[7] = 0, R.__data[8] = k.elements[6], R.__data[9] = k.elements[7], R.__data[10] = k.elements[8], R.__data[11] = 0) : (k.toArray(R.__data, W), W += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, Y, R.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(T, b, y, U) {
    const w = T.value, P = b + "_" + y;
    if (U[P] === void 0) return typeof w == "number" || typeof w == "boolean" ? U[P] = w : U[P] = w.clone(), true;
    {
      const I = U[P];
      if (typeof w == "number" || typeof w == "boolean") {
        if (I !== w) return U[P] = w, true;
      } else if (I.equals(w) === false) return I.copy(w), true;
    }
    return false;
  }
  function v(T) {
    const b = T.uniforms;
    let y = 0;
    const U = 16;
    for (let P = 0, I = b.length; P < I; P++) {
      const S = Array.isArray(b[P]) ? b[P] : [b[P]];
      for (let x = 0, R = S.length; x < R; x++) {
        const Y = S[x], z = Array.isArray(Y.value) ? Y.value : [Y.value];
        for (let W = 0, K = z.length; W < K; W++) {
          const k = z[W], Q = M(k), V = y % U, rt = V % Q.boundary, ht = V + rt;
          y += rt, ht !== 0 && U - ht < Q.storage && (y += U - ht), Y.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), Y.__offset = y, y += Q.storage;
        }
      }
    }
    const w = y % U;
    return w > 0 && (y += U - w), T.__size = y, T.__cache = {}, this;
  }
  function M(T) {
    const b = { boundary: 0, storage: 0 };
    return typeof T == "number" || typeof T == "boolean" ? (b.boundary = 4, b.storage = 4) : T.isVector2 ? (b.boundary = 8, b.storage = 8) : T.isVector3 || T.isColor ? (b.boundary = 16, b.storage = 12) : T.isVector4 ? (b.boundary = 16, b.storage = 16) : T.isMatrix3 ? (b.boundary = 48, b.storage = 48) : T.isMatrix4 ? (b.boundary = 64, b.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), b;
  }
  function p(T) {
    const b = T.target;
    b.removeEventListener("dispose", p);
    const y = a.indexOf(b.__bindingPointIndex);
    a.splice(y, 1), i.deleteBuffer(r[b.id]), delete r[b.id], delete s[b.id];
  }
  function u() {
    for (const T in r) i.deleteBuffer(r[T]);
    a = [], r = {}, s = {};
  }
  return { bind: l, update: c, dispose: u };
}
class Tp {
  constructor(t = {}) {
    const { canvas: e = Ul(), context: n = null, depth: r = true, stencil: s = false, alpha: a = false, antialias: o = false, premultipliedAlpha: l = true, preserveDrawingBuffer: c = false, powerPreference: h = "default", failIfMajorPerformanceCaveat: f = false, reverseDepthBuffer: d = false } = t;
    this.isWebGLRenderer = true;
    let m;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      m = n.getContextAttributes().alpha;
    } else m = a;
    const v = new Uint32Array(4), M = new Int32Array(4);
    let p = null, u = null;
    const T = [], b = [];
    this.domElement = e, this.debug = { checkShaderErrors: true, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this._outputColorSpace = De, this.toneMapping = mn, this.toneMappingExposure = 1;
    const y = this;
    let U = false, w = 0, P = 0, I = null, S = -1, x = null;
    const R = new re(), Y = new re();
    let z = null;
    const W = new Wt(0);
    let K = 0, k = e.width, Q = e.height, V = 1, rt = null, ht = null;
    const gt = new re(0, 0, k, Q), Ut = new re(0, 0, k, Q);
    let Kt = false;
    const X = new Gs();
    let tt = false, mt = false;
    const st = new ee(), yt = new ee(), wt = new F(), It = new re(), te = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
    let zt = false;
    function se() {
      return I === null ? V : 1;
    }
    let A = n;
    function we(g, D) {
      return e.getContext(g, D);
    }
    try {
      const g = { alpha: true, depth: r, stencil: s, antialias: o, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: h, failIfMajorPerformanceCaveat: f };
      if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r171"), e.addEventListener("webglcontextlost", $, false), e.addEventListener("webglcontextrestored", lt, false), e.addEventListener("webglcontextcreationerror", ot, false), A === null) {
        const D = "webgl2";
        if (A = we(D, g), A === null) throw we(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (g) {
      throw console.error("THREE.WebGLRenderer: " + g.message), g;
    }
    let Ft, Ot, vt, Jt, xt, E, _, N, q, j, G, _t, at, ut, Ht, J, dt, Et, bt, ft, Bt, Dt, Zt, C;
    function nt() {
      Ft = new rd(A), Ft.init(), Dt = new Vf(A, Ft), Ot = new Ju(A, Ft, t, Dt), vt = new zf(A, Ft), Ot.reverseDepthBuffer && d && vt.buffers.depth.setReversed(true), Jt = new od(A), xt = new Af(), E = new Hf(A, Ft, vt, xt, Ot, Dt, Jt), _ = new td(y), N = new id(y), q = new pc(A), Zt = new Ku(A, q), j = new sd(A, q, Jt, Zt), G = new cd(A, j, q, Jt), bt = new ld(A, Ot, E), J = new Qu(xt), _t = new Tf(y, _, N, Ft, Ot, Zt, J), at = new $f(y, xt), ut = new Rf(), Ht = new If(Ft), Et = new ju(y, _, N, vt, G, m, l), dt = new Of(y, G, Ot), C = new jf(A, Jt, Ot, vt), ft = new Zu(A, Ft, Jt), Bt = new ad(A, Ft, Jt), Jt.programs = _t.programs, y.capabilities = Ot, y.extensions = Ft, y.properties = xt, y.renderLists = ut, y.shadowMap = dt, y.state = vt, y.info = Jt;
    }
    nt();
    const H = new Yf(y, A);
    this.xr = H, this.getContext = function() {
      return A;
    }, this.getContextAttributes = function() {
      return A.getContextAttributes();
    }, this.forceContextLoss = function() {
      const g = Ft.get("WEBGL_lose_context");
      g && g.loseContext();
    }, this.forceContextRestore = function() {
      const g = Ft.get("WEBGL_lose_context");
      g && g.restoreContext();
    }, this.getPixelRatio = function() {
      return V;
    }, this.setPixelRatio = function(g) {
      g !== void 0 && (V = g, this.setSize(k, Q, false));
    }, this.getSize = function(g) {
      return g.set(k, Q);
    }, this.setSize = function(g, D, O = true) {
      if (H.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      k = g, Q = D, e.width = Math.floor(g * V), e.height = Math.floor(D * V), O === true && (e.style.width = g + "px", e.style.height = D + "px"), this.setViewport(0, 0, g, D);
    }, this.getDrawingBufferSize = function(g) {
      return g.set(k * V, Q * V).floor();
    }, this.setDrawingBufferSize = function(g, D, O) {
      k = g, Q = D, V = O, e.width = Math.floor(g * O), e.height = Math.floor(D * O), this.setViewport(0, 0, g, D);
    }, this.getCurrentViewport = function(g) {
      return g.copy(R);
    }, this.getViewport = function(g) {
      return g.copy(gt);
    }, this.setViewport = function(g, D, O, B) {
      g.isVector4 ? gt.set(g.x, g.y, g.z, g.w) : gt.set(g, D, O, B), vt.viewport(R.copy(gt).multiplyScalar(V).round());
    }, this.getScissor = function(g) {
      return g.copy(Ut);
    }, this.setScissor = function(g, D, O, B) {
      g.isVector4 ? Ut.set(g.x, g.y, g.z, g.w) : Ut.set(g, D, O, B), vt.scissor(Y.copy(Ut).multiplyScalar(V).round());
    }, this.getScissorTest = function() {
      return Kt;
    }, this.setScissorTest = function(g) {
      vt.setScissorTest(Kt = g);
    }, this.setOpaqueSort = function(g) {
      rt = g;
    }, this.setTransparentSort = function(g) {
      ht = g;
    }, this.getClearColor = function(g) {
      return g.copy(Et.getClearColor());
    }, this.setClearColor = function() {
      Et.setClearColor.apply(Et, arguments);
    }, this.getClearAlpha = function() {
      return Et.getClearAlpha();
    }, this.setClearAlpha = function() {
      Et.setClearAlpha.apply(Et, arguments);
    }, this.clear = function(g = true, D = true, O = true) {
      let B = 0;
      if (g) {
        let L = false;
        if (I !== null) {
          const Z = I.texture.format;
          L = Z === zs || Z === Bs || Z === Os;
        }
        if (L) {
          const Z = I.texture.type, it = Z === sn || Z === Ln || Z === Mi || Z === li || Z === Ns || Z === Fs, ct = Et.getClearColor(), pt = Et.getClearAlpha(), Tt = ct.r, At = ct.g, Mt = ct.b;
          it ? (v[0] = Tt, v[1] = At, v[2] = Mt, v[3] = pt, A.clearBufferuiv(A.COLOR, 0, v)) : (M[0] = Tt, M[1] = At, M[2] = Mt, M[3] = pt, A.clearBufferiv(A.COLOR, 0, M));
        } else B |= A.COLOR_BUFFER_BIT;
      }
      D && (B |= A.DEPTH_BUFFER_BIT), O && (B |= A.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), A.clear(B);
    }, this.clearColor = function() {
      this.clear(true, false, false);
    }, this.clearDepth = function() {
      this.clear(false, true, false);
    }, this.clearStencil = function() {
      this.clear(false, false, true);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", $, false), e.removeEventListener("webglcontextrestored", lt, false), e.removeEventListener("webglcontextcreationerror", ot, false), Et.dispose(), ut.dispose(), Ht.dispose(), xt.dispose(), _.dispose(), N.dispose(), G.dispose(), Zt.dispose(), C.dispose(), _t.dispose(), H.dispose(), H.removeEventListener("sessionstart", Ys), H.removeEventListener("sessionend", qs), vn.stop();
    };
    function $(g) {
      g.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), U = true;
    }
    function lt() {
      console.log("THREE.WebGLRenderer: Context Restored."), U = false;
      const g = Jt.autoReset, D = dt.enabled, O = dt.autoUpdate, B = dt.needsUpdate, L = dt.type;
      nt(), Jt.autoReset = g, dt.enabled = D, dt.autoUpdate = O, dt.needsUpdate = B, dt.type = L;
    }
    function ot(g) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", g.statusMessage);
    }
    function Rt(g) {
      const D = g.target;
      D.removeEventListener("dispose", Rt), ne(D);
    }
    function ne(g) {
      fe(g), xt.remove(g);
    }
    function fe(g) {
      const D = xt.get(g).programs;
      D !== void 0 && (D.forEach(function(O) {
        _t.releaseProgram(O);
      }), g.isShaderMaterial && _t.releaseShaderCache(g));
    }
    this.renderBufferDirect = function(g, D, O, B, L, Z) {
      D === null && (D = te);
      const it = L.isMesh && L.matrixWorld.determinant() < 0, ct = zo(g, D, O, B, L);
      vt.setMaterial(B, it);
      let pt = O.index, Tt = 1;
      if (B.wireframe === true) {
        if (pt = j.getWireframeAttribute(O), pt === void 0) return;
        Tt = 2;
      }
      const At = O.drawRange, Mt = O.attributes.position;
      let Vt = At.start * Tt, Xt = (At.start + At.count) * Tt;
      Z !== null && (Vt = Math.max(Vt, Z.start * Tt), Xt = Math.min(Xt, (Z.start + Z.count) * Tt)), pt !== null ? (Vt = Math.max(Vt, 0), Xt = Math.min(Xt, pt.count)) : Mt != null && (Vt = Math.max(Vt, 0), Xt = Math.min(Xt, Mt.count));
      const ae = Xt - Vt;
      if (ae < 0 || ae === 1 / 0) return;
      Zt.setup(L, B, ct, O, pt);
      let ie, kt = ft;
      if (pt !== null && (ie = q.get(pt), kt = Bt, kt.setIndex(ie)), L.isMesh) B.wireframe === true ? (vt.setLineWidth(B.wireframeLinewidth * se()), kt.setMode(A.LINES)) : kt.setMode(A.TRIANGLES);
      else if (L.isLine) {
        let St = B.linewidth;
        St === void 0 && (St = 1), vt.setLineWidth(St * se()), L.isLineSegments ? kt.setMode(A.LINES) : L.isLineLoop ? kt.setMode(A.LINE_LOOP) : kt.setMode(A.LINE_STRIP);
      } else L.isPoints ? kt.setMode(A.POINTS) : L.isSprite && kt.setMode(A.TRIANGLES);
      if (L.isBatchedMesh) if (L._multiDrawInstances !== null) kt.renderMultiDrawInstances(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount, L._multiDrawInstances);
      else if (Ft.get("WEBGL_multi_draw")) kt.renderMultiDraw(L._multiDrawStarts, L._multiDrawCounts, L._multiDrawCount);
      else {
        const St = L._multiDrawStarts, de = L._multiDrawCounts, Yt = L._multiDrawCount, Ue = pt ? q.get(pt).bytesPerElement : 1, On = xt.get(B).currentProgram.getUniforms();
        for (let be = 0; be < Yt; be++) On.setValue(A, "_gl_DrawID", be), kt.render(St[be] / Ue, de[be]);
      }
      else if (L.isInstancedMesh) kt.renderInstances(Vt, ae, L.count);
      else if (O.isInstancedBufferGeometry) {
        const St = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, de = Math.min(O.instanceCount, St);
        kt.renderInstances(Vt, ae, de);
      } else kt.render(Vt, ae);
    };
    function qt(g, D, O) {
      g.transparent === true && g.side === Qe && g.forceSinglePass === false ? (g.side = ye, g.needsUpdate = true, Ri(g, D, O), g.side = _n, g.needsUpdate = true, Ri(g, D, O), g.side = Qe) : Ri(g, D, O);
    }
    this.compile = function(g, D, O = null) {
      O === null && (O = g), u = Ht.get(O), u.init(D), b.push(u), O.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), g !== O && g.traverseVisible(function(L) {
        L.isLight && L.layers.test(D.layers) && (u.pushLight(L), L.castShadow && u.pushShadow(L));
      }), u.setupLights();
      const B = /* @__PURE__ */ new Set();
      return g.traverse(function(L) {
        if (!(L.isMesh || L.isPoints || L.isLine || L.isSprite)) return;
        const Z = L.material;
        if (Z) if (Array.isArray(Z)) for (let it = 0; it < Z.length; it++) {
          const ct = Z[it];
          qt(ct, O, L), B.add(ct);
        }
        else qt(Z, O, L), B.add(Z);
      }), b.pop(), u = null, B;
    }, this.compileAsync = function(g, D, O = null) {
      const B = this.compile(g, D, O);
      return new Promise((L) => {
        function Z() {
          if (B.forEach(function(it) {
            xt.get(it).currentProgram.isReady() && B.delete(it);
          }), B.size === 0) {
            L(g);
            return;
          }
          setTimeout(Z, 10);
        }
        Ft.get("KHR_parallel_shader_compile") !== null ? Z() : setTimeout(Z, 10);
      });
    };
    let Le = null;
    function Ye(g) {
      Le && Le(g);
    }
    function Ys() {
      vn.stop();
    }
    function qs() {
      vn.start();
    }
    const vn = new Lo();
    vn.setAnimationLoop(Ye), typeof self < "u" && vn.setContext(self), this.setAnimationLoop = function(g) {
      Le = g, H.setAnimationLoop(g), g === null ? vn.stop() : vn.start();
    }, H.addEventListener("sessionstart", Ys), H.addEventListener("sessionend", qs), this.render = function(g, D) {
      if (D !== void 0 && D.isCamera !== true) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (U === true) return;
      if (g.matrixWorldAutoUpdate === true && g.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === true && D.updateMatrixWorld(), H.enabled === true && H.isPresenting === true && (H.cameraAutoUpdate === true && H.updateCamera(D), D = H.getCamera()), g.isScene === true && g.onBeforeRender(y, g, D, I), u = Ht.get(g, b.length), u.init(D), b.push(u), yt.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), X.setFromProjectionMatrix(yt), mt = this.localClippingEnabled, tt = J.init(this.clippingPlanes, mt), p = ut.get(g, T.length), p.init(), T.push(p), H.enabled === true && H.isPresenting === true) {
        const Z = y.xr.getDepthSensingMesh();
        Z !== null && ur(Z, D, -1 / 0, y.sortObjects);
      }
      ur(g, D, 0, y.sortObjects), p.finish(), y.sortObjects === true && p.sort(rt, ht), zt = H.enabled === false || H.isPresenting === false || H.hasDepthSensing() === false, zt && Et.addToRenderList(p, g), this.info.render.frame++, tt === true && J.beginShadows();
      const O = u.state.shadowsArray;
      dt.render(O, g, D), tt === true && J.endShadows(), this.info.autoReset === true && this.info.reset();
      const B = p.opaque, L = p.transmissive;
      if (u.setupLights(), D.isArrayCamera) {
        const Z = D.cameras;
        if (L.length > 0) for (let it = 0, ct = Z.length; it < ct; it++) {
          const pt = Z[it];
          js(B, L, g, pt);
        }
        zt && Et.render(g);
        for (let it = 0, ct = Z.length; it < ct; it++) {
          const pt = Z[it];
          $s(p, g, pt, pt.viewport);
        }
      } else L.length > 0 && js(B, L, g, D), zt && Et.render(g), $s(p, g, D);
      I !== null && (E.updateMultisampleRenderTarget(I), E.updateRenderTargetMipmap(I)), g.isScene === true && g.onAfterRender(y, g, D), Zt.resetDefaultState(), S = -1, x = null, b.pop(), b.length > 0 ? (u = b[b.length - 1], tt === true && J.setGlobalState(y.clippingPlanes, u.state.camera)) : u = null, T.pop(), T.length > 0 ? p = T[T.length - 1] : p = null;
    };
    function ur(g, D, O, B) {
      if (g.visible === false) return;
      if (g.layers.test(D.layers)) {
        if (g.isGroup) O = g.renderOrder;
        else if (g.isLOD) g.autoUpdate === true && g.update(D);
        else if (g.isLight) u.pushLight(g), g.castShadow && u.pushShadow(g);
        else if (g.isSprite) {
          if (!g.frustumCulled || X.intersectsSprite(g)) {
            B && It.setFromMatrixPosition(g.matrixWorld).applyMatrix4(yt);
            const it = G.update(g), ct = g.material;
            ct.visible && p.push(g, it, ct, O, It.z, null);
          }
        } else if ((g.isMesh || g.isLine || g.isPoints) && (!g.frustumCulled || X.intersectsObject(g))) {
          const it = G.update(g), ct = g.material;
          if (B && (g.boundingSphere !== void 0 ? (g.boundingSphere === null && g.computeBoundingSphere(), It.copy(g.boundingSphere.center)) : (it.boundingSphere === null && it.computeBoundingSphere(), It.copy(it.boundingSphere.center)), It.applyMatrix4(g.matrixWorld).applyMatrix4(yt)), Array.isArray(ct)) {
            const pt = it.groups;
            for (let Tt = 0, At = pt.length; Tt < At; Tt++) {
              const Mt = pt[Tt], Vt = ct[Mt.materialIndex];
              Vt && Vt.visible && p.push(g, it, Vt, O, It.z, Mt);
            }
          } else ct.visible && p.push(g, it, ct, O, It.z, null);
        }
      }
      const Z = g.children;
      for (let it = 0, ct = Z.length; it < ct; it++) ur(Z[it], D, O, B);
    }
    function $s(g, D, O, B) {
      const L = g.opaque, Z = g.transmissive, it = g.transparent;
      u.setupLightsView(O), tt === true && J.setGlobalState(y.clippingPlanes, O), B && vt.viewport(R.copy(B)), L.length > 0 && wi(L, D, O), Z.length > 0 && wi(Z, D, O), it.length > 0 && wi(it, D, O), vt.buffers.depth.setTest(true), vt.buffers.depth.setMask(true), vt.buffers.color.setMask(true), vt.setPolygonOffset(false);
    }
    function js(g, D, O, B) {
      if ((O.isScene === true ? O.overrideMaterial : null) !== null) return;
      u.state.transmissionRenderTarget[B.id] === void 0 && (u.state.transmissionRenderTarget[B.id] = new Un(1, 1, { generateMipmaps: true, type: Ft.has("EXT_color_buffer_half_float") || Ft.has("EXT_color_buffer_float") ? Ei : sn, minFilter: Pn, samples: 4, stencilBuffer: s, resolveDepthBuffer: false, resolveStencilBuffer: false, colorSpace: Gt.workingColorSpace }));
      const Z = u.state.transmissionRenderTarget[B.id], it = B.viewport || R;
      Z.setSize(it.z, it.w);
      const ct = y.getRenderTarget();
      y.setRenderTarget(Z), y.getClearColor(W), K = y.getClearAlpha(), K < 1 && y.setClearColor(16777215, 0.5), y.clear(), zt && Et.render(O);
      const pt = y.toneMapping;
      y.toneMapping = mn;
      const Tt = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), u.setupLightsView(B), tt === true && J.setGlobalState(y.clippingPlanes, B), wi(g, O, B), E.updateMultisampleRenderTarget(Z), E.updateRenderTargetMipmap(Z), Ft.has("WEBGL_multisampled_render_to_texture") === false) {
        let At = false;
        for (let Mt = 0, Vt = D.length; Mt < Vt; Mt++) {
          const Xt = D[Mt], ae = Xt.object, ie = Xt.geometry, kt = Xt.material, St = Xt.group;
          if (kt.side === Qe && ae.layers.test(B.layers)) {
            const de = kt.side;
            kt.side = ye, kt.needsUpdate = true, Ks(ae, O, B, ie, kt, St), kt.side = de, kt.needsUpdate = true, At = true;
          }
        }
        At === true && (E.updateMultisampleRenderTarget(Z), E.updateRenderTargetMipmap(Z));
      }
      y.setRenderTarget(ct), y.setClearColor(W, K), Tt !== void 0 && (B.viewport = Tt), y.toneMapping = pt;
    }
    function wi(g, D, O) {
      const B = D.isScene === true ? D.overrideMaterial : null;
      for (let L = 0, Z = g.length; L < Z; L++) {
        const it = g[L], ct = it.object, pt = it.geometry, Tt = B === null ? it.material : B, At = it.group;
        ct.layers.test(O.layers) && Ks(ct, D, O, pt, Tt, At);
      }
    }
    function Ks(g, D, O, B, L, Z) {
      g.onBeforeRender(y, D, O, B, L, Z), g.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, g.matrixWorld), g.normalMatrix.getNormalMatrix(g.modelViewMatrix), L.onBeforeRender(y, D, O, B, g, Z), L.transparent === true && L.side === Qe && L.forceSinglePass === false ? (L.side = ye, L.needsUpdate = true, y.renderBufferDirect(O, D, B, L, g, Z), L.side = _n, L.needsUpdate = true, y.renderBufferDirect(O, D, B, L, g, Z), L.side = Qe) : y.renderBufferDirect(O, D, B, L, g, Z), g.onAfterRender(y, D, O, B, L, Z);
    }
    function Ri(g, D, O) {
      D.isScene !== true && (D = te);
      const B = xt.get(g), L = u.state.lights, Z = u.state.shadowsArray, it = L.state.version, ct = _t.getParameters(g, L.state, Z, D, O), pt = _t.getProgramCacheKey(ct);
      let Tt = B.programs;
      B.environment = g.isMeshStandardMaterial ? D.environment : null, B.fog = D.fog, B.envMap = (g.isMeshStandardMaterial ? N : _).get(g.envMap || B.environment), B.envMapRotation = B.environment !== null && g.envMap === null ? D.environmentRotation : g.envMapRotation, Tt === void 0 && (g.addEventListener("dispose", Rt), Tt = /* @__PURE__ */ new Map(), B.programs = Tt);
      let At = Tt.get(pt);
      if (At !== void 0) {
        if (B.currentProgram === At && B.lightsStateVersion === it) return Js(g, ct), At;
      } else ct.uniforms = _t.getUniforms(g), g.onBeforeCompile(ct, y), At = _t.acquireProgram(ct, pt), Tt.set(pt, At), B.uniforms = ct.uniforms;
      const Mt = B.uniforms;
      return (!g.isShaderMaterial && !g.isRawShaderMaterial || g.clipping === true) && (Mt.clippingPlanes = J.uniform), Js(g, ct), B.needsLights = Vo(g), B.lightsStateVersion = it, B.needsLights && (Mt.ambientLightColor.value = L.state.ambient, Mt.lightProbe.value = L.state.probe, Mt.directionalLights.value = L.state.directional, Mt.directionalLightShadows.value = L.state.directionalShadow, Mt.spotLights.value = L.state.spot, Mt.spotLightShadows.value = L.state.spotShadow, Mt.rectAreaLights.value = L.state.rectArea, Mt.ltc_1.value = L.state.rectAreaLTC1, Mt.ltc_2.value = L.state.rectAreaLTC2, Mt.pointLights.value = L.state.point, Mt.pointLightShadows.value = L.state.pointShadow, Mt.hemisphereLights.value = L.state.hemi, Mt.directionalShadowMap.value = L.state.directionalShadowMap, Mt.directionalShadowMatrix.value = L.state.directionalShadowMatrix, Mt.spotShadowMap.value = L.state.spotShadowMap, Mt.spotLightMatrix.value = L.state.spotLightMatrix, Mt.spotLightMap.value = L.state.spotLightMap, Mt.pointShadowMap.value = L.state.pointShadowMap, Mt.pointShadowMatrix.value = L.state.pointShadowMatrix), B.currentProgram = At, B.uniformsList = null, At;
    }
    function Zs(g) {
      if (g.uniformsList === null) {
        const D = g.currentProgram.getUniforms();
        g.uniformsList = rr.seqWithValue(D.seq, g.uniforms);
      }
      return g.uniformsList;
    }
    function Js(g, D) {
      const O = xt.get(g);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function zo(g, D, O, B, L) {
      D.isScene !== true && (D = te), E.resetTextureUnits();
      const Z = D.fog, it = B.isMeshStandardMaterial ? D.environment : null, ct = I === null ? y.outputColorSpace : I.isXRRenderTarget === true ? I.texture.colorSpace : hi, pt = (B.isMeshStandardMaterial ? N : _).get(B.envMap || it), Tt = B.vertexColors === true && !!O.attributes.color && O.attributes.color.itemSize === 4, At = !!O.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), Mt = !!O.morphAttributes.position, Vt = !!O.morphAttributes.normal, Xt = !!O.morphAttributes.color;
      let ae = mn;
      B.toneMapped && (I === null || I.isXRRenderTarget === true) && (ae = y.toneMapping);
      const ie = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, kt = ie !== void 0 ? ie.length : 0, St = xt.get(B), de = u.state.lights;
      if (tt === true && (mt === true || g !== x)) {
        const ge = g === x && B.id === S;
        J.setState(B, g, ge);
      }
      let Yt = false;
      B.version === St.__version ? (St.needsLights && St.lightsStateVersion !== de.state.version || St.outputColorSpace !== ct || L.isBatchedMesh && St.batching === false || !L.isBatchedMesh && St.batching === true || L.isBatchedMesh && St.batchingColor === true && L.colorTexture === null || L.isBatchedMesh && St.batchingColor === false && L.colorTexture !== null || L.isInstancedMesh && St.instancing === false || !L.isInstancedMesh && St.instancing === true || L.isSkinnedMesh && St.skinning === false || !L.isSkinnedMesh && St.skinning === true || L.isInstancedMesh && St.instancingColor === true && L.instanceColor === null || L.isInstancedMesh && St.instancingColor === false && L.instanceColor !== null || L.isInstancedMesh && St.instancingMorph === true && L.morphTexture === null || L.isInstancedMesh && St.instancingMorph === false && L.morphTexture !== null || St.envMap !== pt || B.fog === true && St.fog !== Z || St.numClippingPlanes !== void 0 && (St.numClippingPlanes !== J.numPlanes || St.numIntersection !== J.numIntersection) || St.vertexAlphas !== Tt || St.vertexTangents !== At || St.morphTargets !== Mt || St.morphNormals !== Vt || St.morphColors !== Xt || St.toneMapping !== ae || St.morphTargetsCount !== kt) && (Yt = true) : (Yt = true, St.__version = B.version);
      let Ue = St.currentProgram;
      Yt === true && (Ue = Ri(B, D, L));
      let On = false, be = false, fi = false;
      const Qt = Ue.getUniforms(), Re = St.uniforms;
      if (vt.useProgram(Ue.program) && (On = true, be = true, fi = true), B.id !== S && (S = B.id, be = true), On || x !== g) {
        vt.buffers.depth.getReversed() ? (st.copy(g.projectionMatrix), Nl(st), Fl(st), Qt.setValue(A, "projectionMatrix", st)) : Qt.setValue(A, "projectionMatrix", g.projectionMatrix), Qt.setValue(A, "viewMatrix", g.matrixWorldInverse);
        const Me = Qt.map.cameraPosition;
        Me !== void 0 && Me.setValue(A, wt.setFromMatrixPosition(g.matrixWorld)), Ot.logarithmicDepthBuffer && Qt.setValue(A, "logDepthBufFC", 2 / (Math.log(g.far + 1) / Math.LN2)), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && Qt.setValue(A, "isOrthographic", g.isOrthographicCamera === true), x !== g && (x = g, be = true, fi = true);
      }
      if (L.isSkinnedMesh) {
        Qt.setOptional(A, L, "bindMatrix"), Qt.setOptional(A, L, "bindMatrixInverse");
        const ge = L.skeleton;
        ge && (ge.boneTexture === null && ge.computeBoneTexture(), Qt.setValue(A, "boneTexture", ge.boneTexture, E));
      }
      L.isBatchedMesh && (Qt.setOptional(A, L, "batchingTexture"), Qt.setValue(A, "batchingTexture", L._matricesTexture, E), Qt.setOptional(A, L, "batchingIdTexture"), Qt.setValue(A, "batchingIdTexture", L._indirectTexture, E), Qt.setOptional(A, L, "batchingColorTexture"), L._colorsTexture !== null && Qt.setValue(A, "batchingColorTexture", L._colorsTexture, E));
      const Ce = O.morphAttributes;
      if ((Ce.position !== void 0 || Ce.normal !== void 0 || Ce.color !== void 0) && bt.update(L, O, Ue), (be || St.receiveShadow !== L.receiveShadow) && (St.receiveShadow = L.receiveShadow, Qt.setValue(A, "receiveShadow", L.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (Re.envMap.value = pt, Re.flipEnvMap.value = pt.isCubeTexture && pt.isRenderTargetTexture === false ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && D.environment !== null && (Re.envMapIntensity.value = D.environmentIntensity), be && (Qt.setValue(A, "toneMappingExposure", y.toneMappingExposure), St.needsLights && Ho(Re, fi), Z && B.fog === true && at.refreshFogUniforms(Re, Z), at.refreshMaterialUniforms(Re, B, V, Q, u.state.transmissionRenderTarget[g.id]), rr.upload(A, Zs(St), Re, E)), B.isShaderMaterial && B.uniformsNeedUpdate === true && (rr.upload(A, Zs(St), Re, E), B.uniformsNeedUpdate = false), B.isSpriteMaterial && Qt.setValue(A, "center", L.center), Qt.setValue(A, "modelViewMatrix", L.modelViewMatrix), Qt.setValue(A, "normalMatrix", L.normalMatrix), Qt.setValue(A, "modelMatrix", L.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const ge = B.uniformsGroups;
        for (let Me = 0, dr = ge.length; Me < dr; Me++) {
          const xn = ge[Me];
          C.update(xn, Ue), C.bind(xn, Ue);
        }
      }
      return Ue;
    }
    function Ho(g, D) {
      g.ambientLightColor.needsUpdate = D, g.lightProbe.needsUpdate = D, g.directionalLights.needsUpdate = D, g.directionalLightShadows.needsUpdate = D, g.pointLights.needsUpdate = D, g.pointLightShadows.needsUpdate = D, g.spotLights.needsUpdate = D, g.spotLightShadows.needsUpdate = D, g.rectAreaLights.needsUpdate = D, g.hemisphereLights.needsUpdate = D;
    }
    function Vo(g) {
      return g.isMeshLambertMaterial || g.isMeshToonMaterial || g.isMeshPhongMaterial || g.isMeshStandardMaterial || g.isShadowMaterial || g.isShaderMaterial && g.lights === true;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return P;
    }, this.getRenderTarget = function() {
      return I;
    }, this.setRenderTargetTextures = function(g, D, O) {
      xt.get(g.texture).__webglTexture = D, xt.get(g.depthTexture).__webglTexture = O;
      const B = xt.get(g);
      B.__hasExternalTextures = true, B.__autoAllocateDepthBuffer = O === void 0, B.__autoAllocateDepthBuffer || Ft.has("WEBGL_multisampled_render_to_texture") === true && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), B.__useRenderToTexture = false);
    }, this.setRenderTargetFramebuffer = function(g, D) {
      const O = xt.get(g);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(g, D = 0, O = 0) {
      I = g, w = D, P = O;
      let B = true, L = null, Z = false, it = false;
      if (g) {
        const pt = xt.get(g);
        if (pt.__useDefaultFramebuffer !== void 0) vt.bindFramebuffer(A.FRAMEBUFFER, null), B = false;
        else if (pt.__webglFramebuffer === void 0) E.setupRenderTarget(g);
        else if (pt.__hasExternalTextures) E.rebindTextures(g, xt.get(g.texture).__webglTexture, xt.get(g.depthTexture).__webglTexture);
        else if (g.depthBuffer) {
          const Mt = g.depthTexture;
          if (pt.__boundDepthTexture !== Mt) {
            if (Mt !== null && xt.has(Mt) && (g.width !== Mt.image.width || g.height !== Mt.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            E.setupDepthRenderbuffer(g);
          }
        }
        const Tt = g.texture;
        (Tt.isData3DTexture || Tt.isDataArrayTexture || Tt.isCompressedArrayTexture) && (it = true);
        const At = xt.get(g).__webglFramebuffer;
        g.isWebGLCubeRenderTarget ? (Array.isArray(At[D]) ? L = At[D][O] : L = At[D], Z = true) : g.samples > 0 && E.useMultisampledRTT(g) === false ? L = xt.get(g).__webglMultisampledFramebuffer : Array.isArray(At) ? L = At[O] : L = At, R.copy(g.viewport), Y.copy(g.scissor), z = g.scissorTest;
      } else R.copy(gt).multiplyScalar(V).floor(), Y.copy(Ut).multiplyScalar(V).floor(), z = Kt;
      if (vt.bindFramebuffer(A.FRAMEBUFFER, L) && B && vt.drawBuffers(g, L), vt.viewport(R), vt.scissor(Y), vt.setScissorTest(z), Z) {
        const pt = xt.get(g.texture);
        A.framebufferTexture2D(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_CUBE_MAP_POSITIVE_X + D, pt.__webglTexture, O);
      } else if (it) {
        const pt = xt.get(g.texture), Tt = D || 0;
        A.framebufferTextureLayer(A.FRAMEBUFFER, A.COLOR_ATTACHMENT0, pt.__webglTexture, O || 0, Tt);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(g, D, O, B, L, Z, it) {
      if (!(g && g.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ct = xt.get(g).__webglFramebuffer;
      if (g.isWebGLCubeRenderTarget && it !== void 0 && (ct = ct[it]), ct) {
        vt.bindFramebuffer(A.FRAMEBUFFER, ct);
        try {
          const pt = g.texture, Tt = pt.format, At = pt.type;
          if (!Ot.textureFormatReadable(Tt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ot.textureTypeReadable(At)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= g.width - B && O >= 0 && O <= g.height - L && A.readPixels(D, O, B, L, Dt.convert(Tt), Dt.convert(At), Z);
        } finally {
          const pt = I !== null ? xt.get(I).__webglFramebuffer : null;
          vt.bindFramebuffer(A.FRAMEBUFFER, pt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(g, D, O, B, L, Z, it) {
      if (!(g && g.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ct = xt.get(g).__webglFramebuffer;
      if (g.isWebGLCubeRenderTarget && it !== void 0 && (ct = ct[it]), ct) {
        const pt = g.texture, Tt = pt.format, At = pt.type;
        if (!Ot.textureFormatReadable(Tt)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ot.textureTypeReadable(At)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= g.width - B && O >= 0 && O <= g.height - L) {
          vt.bindFramebuffer(A.FRAMEBUFFER, ct);
          const Mt = A.createBuffer();
          A.bindBuffer(A.PIXEL_PACK_BUFFER, Mt), A.bufferData(A.PIXEL_PACK_BUFFER, Z.byteLength, A.STREAM_READ), A.readPixels(D, O, B, L, Dt.convert(Tt), Dt.convert(At), 0);
          const Vt = I !== null ? xt.get(I).__webglFramebuffer : null;
          vt.bindFramebuffer(A.FRAMEBUFFER, Vt);
          const Xt = A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return A.flush(), await Il(A, Xt, 4), A.bindBuffer(A.PIXEL_PACK_BUFFER, Mt), A.getBufferSubData(A.PIXEL_PACK_BUFFER, 0, Z), A.deleteBuffer(Mt), A.deleteSync(Xt), Z;
        } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(g, D = null, O = 0) {
      g.isTexture !== true && (Jn("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, g = arguments[1]);
      const B = Math.pow(2, -O), L = Math.floor(g.image.width * B), Z = Math.floor(g.image.height * B), it = D !== null ? D.x : 0, ct = D !== null ? D.y : 0;
      E.setTexture2D(g, 0), A.copyTexSubImage2D(A.TEXTURE_2D, O, 0, 0, it, ct, L, Z), vt.unbindTexture();
    };
    const ko = A.createFramebuffer(), Go = A.createFramebuffer();
    this.copyTextureToTexture = function(g, D, O = null, B = null, L = 0, Z = null) {
      g.isTexture !== true && (Jn("WebGLRenderer: copyTextureToTexture function signature has changed."), B = arguments[0] || null, g = arguments[1], D = arguments[2], Z = arguments[3] || 0, O = null), Z === null && (L !== 0 ? (Jn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), Z = L, L = 0) : Z = 0);
      let it, ct, pt, Tt, At, Mt, Vt, Xt, ae;
      const ie = g.isCompressedTexture ? g.mipmaps[Z] : g.image;
      if (O !== null) it = O.max.x - O.min.x, ct = O.max.y - O.min.y, pt = O.isBox3 ? O.max.z - O.min.z : 1, Tt = O.min.x, At = O.min.y, Mt = O.isBox3 ? O.min.z : 0;
      else {
        const Ce = Math.pow(2, -L);
        it = Math.floor(ie.width * Ce), ct = Math.floor(ie.height * Ce), g.isDataArrayTexture ? pt = ie.depth : g.isData3DTexture ? pt = Math.floor(ie.depth * Ce) : pt = 1, Tt = 0, At = 0, Mt = 0;
      }
      B !== null ? (Vt = B.x, Xt = B.y, ae = B.z) : (Vt = 0, Xt = 0, ae = 0);
      const kt = Dt.convert(D.format), St = Dt.convert(D.type);
      let de;
      D.isData3DTexture ? (E.setTexture3D(D, 0), de = A.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (E.setTexture2DArray(D, 0), de = A.TEXTURE_2D_ARRAY) : (E.setTexture2D(D, 0), de = A.TEXTURE_2D), A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, D.flipY), A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), A.pixelStorei(A.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Yt = A.getParameter(A.UNPACK_ROW_LENGTH), Ue = A.getParameter(A.UNPACK_IMAGE_HEIGHT), On = A.getParameter(A.UNPACK_SKIP_PIXELS), be = A.getParameter(A.UNPACK_SKIP_ROWS), fi = A.getParameter(A.UNPACK_SKIP_IMAGES);
      A.pixelStorei(A.UNPACK_ROW_LENGTH, ie.width), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, ie.height), A.pixelStorei(A.UNPACK_SKIP_PIXELS, Tt), A.pixelStorei(A.UNPACK_SKIP_ROWS, At), A.pixelStorei(A.UNPACK_SKIP_IMAGES, Mt);
      const Qt = g.isDataArrayTexture || g.isData3DTexture, Re = D.isDataArrayTexture || D.isData3DTexture;
      if (g.isDepthTexture) {
        const Ce = xt.get(g), ge = xt.get(D), Me = xt.get(Ce.__renderTarget), dr = xt.get(ge.__renderTarget);
        vt.bindFramebuffer(A.READ_FRAMEBUFFER, Me.__webglFramebuffer), vt.bindFramebuffer(A.DRAW_FRAMEBUFFER, dr.__webglFramebuffer);
        for (let xn = 0; xn < pt; xn++) Qt && (A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, xt.get(g).__webglTexture, L, Mt + xn), A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, xt.get(D).__webglTexture, Z, ae + xn)), A.blitFramebuffer(Tt, At, it, ct, Vt, Xt, it, ct, A.DEPTH_BUFFER_BIT, A.NEAREST);
        vt.bindFramebuffer(A.READ_FRAMEBUFFER, null), vt.bindFramebuffer(A.DRAW_FRAMEBUFFER, null);
      } else if (L !== 0 || g.isRenderTargetTexture || xt.has(g)) {
        const Ce = xt.get(g), ge = xt.get(D);
        vt.bindFramebuffer(A.READ_FRAMEBUFFER, ko), vt.bindFramebuffer(A.DRAW_FRAMEBUFFER, Go);
        for (let Me = 0; Me < pt; Me++) Qt ? A.framebufferTextureLayer(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, Ce.__webglTexture, L, Mt + Me) : A.framebufferTexture2D(A.READ_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, Ce.__webglTexture, L), Re ? A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, ge.__webglTexture, Z, ae + Me) : A.framebufferTexture2D(A.DRAW_FRAMEBUFFER, A.COLOR_ATTACHMENT0, A.TEXTURE_2D, ge.__webglTexture, Z), L !== 0 ? A.blitFramebuffer(Tt, At, it, ct, Vt, Xt, it, ct, A.COLOR_BUFFER_BIT, A.NEAREST) : Re ? A.copyTexSubImage3D(de, Z, Vt, Xt, ae + Me, Tt, At, it, ct) : A.copyTexSubImage2D(de, Z, Vt, Xt, Tt, At, it, ct);
        vt.bindFramebuffer(A.READ_FRAMEBUFFER, null), vt.bindFramebuffer(A.DRAW_FRAMEBUFFER, null);
      } else Re ? g.isDataTexture || g.isData3DTexture ? A.texSubImage3D(de, Z, Vt, Xt, ae, it, ct, pt, kt, St, ie.data) : D.isCompressedArrayTexture ? A.compressedTexSubImage3D(de, Z, Vt, Xt, ae, it, ct, pt, kt, ie.data) : A.texSubImage3D(de, Z, Vt, Xt, ae, it, ct, pt, kt, St, ie) : g.isDataTexture ? A.texSubImage2D(A.TEXTURE_2D, Z, Vt, Xt, it, ct, kt, St, ie.data) : g.isCompressedTexture ? A.compressedTexSubImage2D(A.TEXTURE_2D, Z, Vt, Xt, ie.width, ie.height, kt, ie.data) : A.texSubImage2D(A.TEXTURE_2D, Z, Vt, Xt, it, ct, kt, St, ie);
      A.pixelStorei(A.UNPACK_ROW_LENGTH, Yt), A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, Ue), A.pixelStorei(A.UNPACK_SKIP_PIXELS, On), A.pixelStorei(A.UNPACK_SKIP_ROWS, be), A.pixelStorei(A.UNPACK_SKIP_IMAGES, fi), Z === 0 && D.generateMipmaps && A.generateMipmap(de), vt.unbindTexture();
    }, this.copyTextureToTexture3D = function(g, D, O = null, B = null, L = 0) {
      return g.isTexture !== true && (Jn("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, B = arguments[1] || null, g = arguments[2], D = arguments[3], L = arguments[4] || 0), Jn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(g, D, O, B, L);
    }, this.initRenderTarget = function(g) {
      xt.get(g).__webglFramebuffer === void 0 && E.setupRenderTarget(g);
    }, this.initTexture = function(g) {
      g.isCubeTexture ? E.setTextureCube(g, 0) : g.isData3DTexture ? E.setTexture3D(g, 0) : g.isDataArrayTexture || g.isCompressedArrayTexture ? E.setTexture2DArray(g, 0) : E.setTexture2D(g, 0), vt.unbindTexture();
    }, this.resetState = function() {
      w = 0, P = 0, I = null, vt.reset(), Zt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return en;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorspace = Gt._getDrawingBufferColorSpace(t), e.unpackColorSpace = Gt._getUnpackColorSpace();
  }
}
/**
* lil-gui
* https://lil-gui.georgealways.com
* @version 0.17.0
* @author George Michael Brower
* @license MIT
*/
class We {
  constructor(t, e, n, r, s = "div") {
    this.parent = t, this.object = e, this.property = n, this._disabled = false, this._hidden = false, this.initialValue = this.getValue(), this.domElement = document.createElement("div"), this.domElement.classList.add("controller"), this.domElement.classList.add(r), this.$name = document.createElement("div"), this.$name.classList.add("name"), We.nextNameID = We.nextNameID || 0, this.$name.id = "lil-gui-name-" + ++We.nextNameID, this.$widget = document.createElement(s), this.$widget.classList.add("widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(n);
  }
  name(t) {
    return this._name = t, this.$name.innerHTML = t, this;
  }
  onChange(t) {
    return this._onChange = t, this;
  }
  _callOnChange() {
    this.parent._callOnChange(this), this._onChange !== void 0 && this._onChange.call(this, this.getValue()), this._changed = true;
  }
  onFinishChange(t) {
    return this._onFinishChange = t, this;
  }
  _callOnFinishChange() {
    this._changed && (this.parent._callOnFinishChange(this), this._onFinishChange !== void 0 && this._onFinishChange.call(this, this.getValue())), this._changed = false;
  }
  reset() {
    return this.setValue(this.initialValue), this._callOnFinishChange(), this;
  }
  enable(t = true) {
    return this.disable(!t);
  }
  disable(t = true) {
    return t === this._disabled || (this._disabled = t, this.domElement.classList.toggle("disabled", t), this.$disable.toggleAttribute("disabled", t)), this;
  }
  show(t = true) {
    return this._hidden = !t, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  options(t) {
    const e = this.parent.add(this.object, this.property, t);
    return e.name(this._name), this.destroy(), e;
  }
  min(t) {
    return this;
  }
  max(t) {
    return this;
  }
  step(t) {
    return this;
  }
  decimals(t) {
    return this;
  }
  listen(t = true) {
    return this._listening = t, this._listenCallbackID !== void 0 && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this;
  }
  _listenCallback() {
    this._listenCallbackID = requestAnimationFrame(this._listenCallback);
    const t = this.save();
    t !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = t;
  }
  getValue() {
    return this.object[this.property];
  }
  setValue(t) {
    return this.object[this.property] = t, this._callOnChange(), this.updateDisplay(), this;
  }
  updateDisplay() {
    return this;
  }
  load(t) {
    return this.setValue(t), this._callOnFinishChange(), this;
  }
  save() {
    return this.getValue();
  }
  destroy() {
    this.listen(false), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement);
  }
}
class Kf extends We {
  constructor(t, e, n) {
    super(t, e, n, "boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => {
      this.setValue(this.$input.checked), this._callOnFinishChange();
    }), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.checked = this.getValue(), this;
  }
}
function Us(i) {
  let t, e;
  return (t = i.match(/(#|0x)?([a-f0-9]{6})/i)) ? e = t[2] : (t = i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? e = parseInt(t[1]).toString(16).padStart(2, 0) + parseInt(t[2]).toString(16).padStart(2, 0) + parseInt(t[3]).toString(16).padStart(2, 0) : (t = i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (e = t[1] + t[1] + t[2] + t[2] + t[3] + t[3]), !!e && "#" + e;
}
const Zf = { isPrimitive: true, match: (i) => typeof i == "string", fromHexString: Us, toHexString: Us }, Si = { isPrimitive: true, match: (i) => typeof i == "number", fromHexString: (i) => parseInt(i.substring(1), 16), toHexString: (i) => "#" + i.toString(16).padStart(6, 0) }, Jf = { isPrimitive: false, match: Array.isArray, fromHexString(i, t, e = 1) {
  const n = Si.fromHexString(i);
  t[0] = (n >> 16 & 255) / 255 * e, t[1] = (n >> 8 & 255) / 255 * e, t[2] = (255 & n) / 255 * e;
}, toHexString: ([i, t, e], n = 1) => Si.toHexString(i * (n = 255 / n) << 16 ^ t * n << 8 ^ e * n << 0) }, Qf = { isPrimitive: false, match: (i) => Object(i) === i, fromHexString(i, t, e = 1) {
  const n = Si.fromHexString(i);
  t.r = (n >> 16 & 255) / 255 * e, t.g = (n >> 8 & 255) / 255 * e, t.b = (255 & n) / 255 * e;
}, toHexString: ({ r: i, g: t, b: e }, n = 1) => Si.toHexString(i * (n = 255 / n) << 16 ^ t * n << 8 ^ e * n << 0) }, tp = [Zf, Si, Jf, Qf];
class ep extends We {
  constructor(t, e, n, r) {
    var s;
    super(t, e, n, "color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = (s = this.initialValue, tp.find((a) => a.match(s))), this._rgbScale = r, this._initialValueHexString = this.save(), this._textFocused = false, this.$input.addEventListener("input", () => {
      this._setValueFromHexString(this.$input.value);
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$text.addEventListener("input", () => {
      const a = Us(this.$text.value);
      a && this._setValueFromHexString(a);
    }), this.$text.addEventListener("focus", () => {
      this._textFocused = true, this.$text.select();
    }), this.$text.addEventListener("blur", () => {
      this._textFocused = false, this.updateDisplay(), this._callOnFinishChange();
    }), this.$disable = this.$text, this.updateDisplay();
  }
  reset() {
    return this._setValueFromHexString(this._initialValueHexString), this;
  }
  _setValueFromHexString(t) {
    if (this._format.isPrimitive) {
      const e = this._format.fromHexString(t);
      this.setValue(e);
    } else this._format.fromHexString(t, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
  }
  save() {
    return this._format.toHexString(this.getValue(), this._rgbScale);
  }
  load(t) {
    return this._setValueFromHexString(t), this._callOnFinishChange(), this;
  }
  updateDisplay() {
    return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this;
  }
}
class Gr extends We {
  constructor(t, e, n) {
    super(t, e, n, "function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", (r) => {
      r.preventDefault(), this.getValue().call(this.object);
    }), this.$button.addEventListener("touchstart", () => {
    }, { passive: true }), this.$disable = this.$button;
  }
}
class np extends We {
  constructor(t, e, n, r, s, a) {
    super(t, e, n, "number"), this._initInput(), this.min(r), this.max(s);
    const o = a !== void 0;
    this.step(o ? a : this._getImplicitStep(), o), this.updateDisplay();
  }
  decimals(t) {
    return this._decimals = t, this.updateDisplay(), this;
  }
  min(t) {
    return this._min = t, this._onUpdateMinMax(), this;
  }
  max(t) {
    return this._max = t, this._onUpdateMinMax(), this;
  }
  step(t, e = true) {
    return this._step = t, this._stepExplicit = e, this;
  }
  updateDisplay() {
    const t = this.getValue();
    if (this._hasSlider) {
      let e = (t - this._min) / (this._max - this._min);
      e = Math.max(0, Math.min(e, 1)), this.$fill.style.width = 100 * e + "%";
    }
    return this._inputFocused || (this.$input.value = this._decimals === void 0 ? t : t.toFixed(this._decimals)), this;
  }
  _initInput() {
    this.$input = document.createElement("input"), this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$disable = this.$input;
    const t = (h) => {
      const f = parseFloat(this.$input.value);
      isNaN(f) || (this._snapClampSetValue(f + h), this.$input.value = this.getValue());
    };
    let e, n, r, s, a, o = false;
    const l = (h) => {
      if (o) {
        const f = h.clientX - e, d = h.clientY - n;
        Math.abs(d) > 5 ? (h.preventDefault(), this.$input.blur(), o = false, this._setDraggingStyle(true, "vertical")) : Math.abs(f) > 5 && c();
      }
      if (!o) {
        const f = h.clientY - r;
        a -= f * this._step * this._arrowKeyMultiplier(h), s + a > this._max ? a = this._max - s : s + a < this._min && (a = this._min - s), this._snapClampSetValue(s + a);
      }
      r = h.clientY;
    }, c = () => {
      this._setDraggingStyle(false, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", c);
    };
    this.$input.addEventListener("input", () => {
      let h = parseFloat(this.$input.value);
      isNaN(h) || (this._stepExplicit && (h = this._snap(h)), this.setValue(this._clamp(h)));
    }), this.$input.addEventListener("keydown", (h) => {
      h.code === "Enter" && this.$input.blur(), h.code === "ArrowUp" && (h.preventDefault(), t(this._step * this._arrowKeyMultiplier(h))), h.code === "ArrowDown" && (h.preventDefault(), t(this._step * this._arrowKeyMultiplier(h) * -1));
    }), this.$input.addEventListener("wheel", (h) => {
      this._inputFocused && (h.preventDefault(), t(this._step * this._normalizeMouseWheel(h)));
    }, { passive: false }), this.$input.addEventListener("mousedown", (h) => {
      e = h.clientX, n = r = h.clientY, o = true, s = this.getValue(), a = 0, window.addEventListener("mousemove", l), window.addEventListener("mouseup", c);
    }), this.$input.addEventListener("focus", () => {
      this._inputFocused = true;
    }), this.$input.addEventListener("blur", () => {
      this._inputFocused = false, this.updateDisplay(), this._callOnFinishChange();
    });
  }
  _initSlider() {
    this._hasSlider = true, this.$slider = document.createElement("div"), this.$slider.classList.add("slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("hasSlider");
    const t = (d) => {
      const m = this.$slider.getBoundingClientRect();
      let v = (M = d, p = m.left, u = m.right, T = this._min, b = this._max, (M - p) / (u - p) * (b - T) + T);
      var M, p, u, T, b;
      this._snapClampSetValue(v);
    }, e = (d) => {
      t(d.clientX);
    }, n = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", n);
    };
    let r, s, a = false;
    const o = (d) => {
      d.preventDefault(), this._setDraggingStyle(true), t(d.touches[0].clientX), a = false;
    }, l = (d) => {
      if (a) {
        const m = d.touches[0].clientX - r, v = d.touches[0].clientY - s;
        Math.abs(m) > Math.abs(v) ? o(d) : (window.removeEventListener("touchmove", l), window.removeEventListener("touchend", c));
      } else d.preventDefault(), t(d.touches[0].clientX);
    }, c = () => {
      this._callOnFinishChange(), this._setDraggingStyle(false), window.removeEventListener("touchmove", l), window.removeEventListener("touchend", c);
    }, h = this._callOnFinishChange.bind(this);
    let f;
    this.$slider.addEventListener("mousedown", (d) => {
      this._setDraggingStyle(true), t(d.clientX), window.addEventListener("mousemove", e), window.addEventListener("mouseup", n);
    }), this.$slider.addEventListener("touchstart", (d) => {
      d.touches.length > 1 || (this._hasScrollBar ? (r = d.touches[0].clientX, s = d.touches[0].clientY, a = true) : o(d), window.addEventListener("touchmove", l, { passive: false }), window.addEventListener("touchend", c));
    }, { passive: false }), this.$slider.addEventListener("wheel", (d) => {
      if (Math.abs(d.deltaX) < Math.abs(d.deltaY) && this._hasScrollBar) return;
      d.preventDefault();
      const m = this._normalizeMouseWheel(d) * this._step;
      this._snapClampSetValue(this.getValue() + m), this.$input.value = this.getValue(), clearTimeout(f), f = setTimeout(h, 400);
    }, { passive: false });
  }
  _setDraggingStyle(t, e = "horizontal") {
    this.$slider && this.$slider.classList.toggle("active", t), document.body.classList.toggle("lil-gui-dragging", t), document.body.classList.toggle("lil-gui-" + e, t);
  }
  _getImplicitStep() {
    return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
  }
  _onUpdateMinMax() {
    !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), false), this._initSlider(), this.updateDisplay());
  }
  _normalizeMouseWheel(t) {
    let { deltaX: e, deltaY: n } = t;
    return Math.floor(t.deltaY) !== t.deltaY && t.wheelDelta && (e = 0, n = -t.wheelDelta / 120, n *= this._stepExplicit ? 1 : 10), e + -n;
  }
  _arrowKeyMultiplier(t) {
    let e = this._stepExplicit ? 1 : 10;
    return t.shiftKey ? e *= 10 : t.altKey && (e /= 10), e;
  }
  _snap(t) {
    const e = Math.round(t / this._step) * this._step;
    return parseFloat(e.toPrecision(15));
  }
  _clamp(t) {
    return t < this._min && (t = this._min), t > this._max && (t = this._max), t;
  }
  _snapClampSetValue(t) {
    this.setValue(this._clamp(this._snap(t)));
  }
  get _hasScrollBar() {
    const t = this.parent.root.$children;
    return t.scrollHeight > t.clientHeight;
  }
  get _hasMin() {
    return this._min !== void 0;
  }
  get _hasMax() {
    return this._max !== void 0;
  }
}
class ip extends We {
  constructor(t, e, n, r) {
    super(t, e, n, "option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this._values = Array.isArray(r) ? r : Object.values(r), this._names = Array.isArray(r) ? r : Object.keys(r), this._names.forEach((s) => {
      const a = document.createElement("option");
      a.innerHTML = s, this.$select.appendChild(a);
    }), this.$select.addEventListener("change", () => {
      this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange();
    }), this.$select.addEventListener("focus", () => {
      this.$display.classList.add("focus");
    }), this.$select.addEventListener("blur", () => {
      this.$display.classList.remove("focus");
    }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.updateDisplay();
  }
  updateDisplay() {
    const t = this.getValue(), e = this._values.indexOf(t);
    return this.$select.selectedIndex = e, this.$display.innerHTML = e === -1 ? t : this._names[e], this;
  }
}
class rp extends We {
  constructor(t, e, n) {
    super(t, e, n, "string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => {
      this.setValue(this.$input.value);
    }), this.$input.addEventListener("keydown", (r) => {
      r.code === "Enter" && this.$input.blur();
    }), this.$input.addEventListener("blur", () => {
      this._callOnFinishChange();
    }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay();
  }
  updateDisplay() {
    return this.$input.value = this.getValue(), this;
  }
}
let to = false;
class Oo {
  constructor({ parent: t, autoPlace: e = t === void 0, container: n, width: r, title: s = "Controls", injectStyles: a = true, touchStyles: o = true } = {}) {
    if (this.parent = t, this.root = t ? t.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = false, this._hidden = false, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("div"), this.$title.classList.add("title"), this.$title.setAttribute("role", "button"), this.$title.setAttribute("aria-expanded", true), this.$title.setAttribute("tabindex", 0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("keydown", (l) => {
      l.code !== "Enter" && l.code !== "Space" || (l.preventDefault(), this.$title.click());
    }), this.$title.addEventListener("touchstart", () => {
    }, { passive: true }), this.$children = document.createElement("div"), this.$children.classList.add("children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(s), o && this.domElement.classList.add("allow-touch-styles"), this.parent) return this.parent.children.push(this), this.parent.folders.push(this), void this.parent.$children.appendChild(this.domElement);
    this.domElement.classList.add("root"), !to && a && (function(l) {
      const c = document.createElement("style");
      c.innerHTML = l;
      const h = document.querySelector("head link[rel=stylesheet], head style");
      h ? document.head.insertBefore(c, h) : document.head.appendChild(c);
    }('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"\u2195";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"\u25BE";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"\u25B8"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"\u2713";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'), to = true), n ? n.appendChild(this.domElement) : e && (this.domElement.classList.add("autoPlace"), document.body.appendChild(this.domElement)), r && this.domElement.style.setProperty("--width", r + "px"), this.domElement.addEventListener("keydown", (l) => l.stopPropagation()), this.domElement.addEventListener("keyup", (l) => l.stopPropagation());
  }
  add(t, e, n, r, s) {
    if (Object(n) === n) return new ip(this, t, e, n);
    const a = t[e];
    switch (typeof a) {
      case "number":
        return new np(this, t, e, n, r, s);
      case "boolean":
        return new Kf(this, t, e);
      case "string":
        return new rp(this, t, e);
      case "function":
        return new Gr(this, t, e);
    }
    console.error("gui.add failed\n	property:", e, "\n	object:", t, "\n	value:", a);
  }
  addColor(t, e, n = 1) {
    return new ep(this, t, e, n);
  }
  addFolder(t) {
    return new Oo({ parent: this, title: t });
  }
  load(t, e = true) {
    return t.controllers && this.controllers.forEach((n) => {
      n instanceof Gr || n._name in t.controllers && n.load(t.controllers[n._name]);
    }), e && t.folders && this.folders.forEach((n) => {
      n._title in t.folders && n.load(t.folders[n._title]);
    }), this;
  }
  save(t = true) {
    const e = { controllers: {}, folders: {} };
    return this.controllers.forEach((n) => {
      if (!(n instanceof Gr)) {
        if (n._name in e.controllers) throw new Error('Cannot save GUI with duplicate property "'.concat(n._name, '"'));
        e.controllers[n._name] = n.save();
      }
    }), t && this.folders.forEach((n) => {
      if (n._title in e.folders) throw new Error('Cannot save GUI with duplicate folder "'.concat(n._title, '"'));
      e.folders[n._title] = n.save();
    }), e;
  }
  open(t = true) {
    return this._closed = !t, this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("closed", this._closed), this;
  }
  close() {
    return this.open(false);
  }
  show(t = true) {
    return this._hidden = !t, this.domElement.style.display = this._hidden ? "none" : "", this;
  }
  hide() {
    return this.show(false);
  }
  openAnimated(t = true) {
    return this._closed = !t, this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(() => {
      const e = this.$children.clientHeight;
      this.$children.style.height = e + "px", this.domElement.classList.add("transition");
      const n = (s) => {
        s.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("transition"), this.$children.removeEventListener("transitionend", n));
      };
      this.$children.addEventListener("transitionend", n);
      const r = t ? this.$children.scrollHeight : 0;
      this.domElement.classList.toggle("closed", !t), requestAnimationFrame(() => {
        this.$children.style.height = r + "px";
      });
    }), this;
  }
  title(t) {
    return this._title = t, this.$title.innerHTML = t, this;
  }
  reset(t = true) {
    return (t ? this.controllersRecursive() : this.controllers).forEach((e) => e.reset()), this;
  }
  onChange(t) {
    return this._onChange = t, this;
  }
  _callOnChange(t) {
    this.parent && this.parent._callOnChange(t), this._onChange !== void 0 && this._onChange.call(this, { object: t.object, property: t.property, value: t.getValue(), controller: t });
  }
  onFinishChange(t) {
    return this._onFinishChange = t, this;
  }
  _callOnFinishChange(t) {
    this.parent && this.parent._callOnFinishChange(t), this._onFinishChange !== void 0 && this._onFinishChange.call(this, { object: t.object, property: t.property, value: t.getValue(), controller: t });
  }
  destroy() {
    this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach((t) => t.destroy());
  }
  controllersRecursive() {
    let t = Array.from(this.controllers);
    return this.folders.forEach((e) => {
      t = t.concat(e.controllersRecursive());
    }), t;
  }
  foldersRecursive() {
    let t = Array.from(this.folders);
    return this.folders.forEach((e) => {
      t = t.concat(e.foldersRecursive());
    }), t;
  }
}
const eo = { type: "change" }, Xs = { type: "start" }, Bo = { type: "end" }, Zi = new Vs(), no = new dn(), sp = Math.cos(70 * Ll.DEG2RAD), le = new F(), Ee = 2 * Math.PI, jt = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }, Wr = 1e-6;
class Ap extends dc {
  constructor(t, e = null) {
    super(t, e), this.state = jt.NONE, this.enabled = true, this.target = new F(), this.cursor = new F(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = false, this.dampingFactor = 0.05, this.enableZoom = true, this.zoomSpeed = 1, this.enableRotate = true, this.rotateSpeed = 1, this.enablePan = true, this.panSpeed = 1, this.screenSpacePanning = true, this.keyPanSpeed = 7, this.zoomToCursor = false, this.autoRotate = false, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ei.ROTATE, MIDDLE: ei.DOLLY, RIGHT: ei.PAN }, this.touches = { ONE: Qn.ROTATE, TWO: Qn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new F(), this._lastQuaternion = new In(), this._lastTargetPosition = new F(), this._quat = new In().setFromUnitVectors(t.up, new F(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Ra(), this._sphericalDelta = new Ra(), this._scale = 1, this._panOffset = new F(), this._rotateStart = new Pt(), this._rotateEnd = new Pt(), this._rotateDelta = new Pt(), this._panStart = new Pt(), this._panEnd = new Pt(), this._panDelta = new Pt(), this._dollyStart = new Pt(), this._dollyEnd = new Pt(), this._dollyDelta = new Pt(), this._dollyDirection = new F(), this._mouse = new Pt(), this._performCursorZoom = false, this._pointers = [], this._pointerPositions = {}, this._controlActive = false, this._onPointerMove = op.bind(this), this._onPointerDown = ap.bind(this), this._onPointerUp = lp.bind(this), this._onContextMenu = mp.bind(this), this._onMouseWheel = up.bind(this), this._onKeyDown = dp.bind(this), this._onTouchStart = fp.bind(this), this._onTouchMove = pp.bind(this), this._onMouseDown = cp.bind(this), this._onMouseMove = hp.bind(this), this._interceptControlDown = _p.bind(this), this._interceptControlUp = gp.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: true }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(eo), this.update(), this.state = jt.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    le.copy(e).sub(this.target), le.applyQuaternion(this._quat), this._spherical.setFromVector3(le), this.autoRotate && this.state === jt.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
    isFinite(n) && isFinite(r) && (n < -Math.PI ? n += Ee : n > Math.PI && (n -= Ee), r < -Math.PI ? r += Ee : r > Math.PI && (r -= Ee), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === true ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = a != this._spherical.radius;
    }
    if (le.setFromSpherical(this._spherical), le.applyQuaternion(this._quatInverse), e.copy(this.target).add(le), this.object.lookAt(this.target), this.enableDamping === true ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = le.length();
        a = this._clampDistance(o * this._scale);
        const l = o - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new F(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const c = new F(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = le.length();
      } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = false;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (Zi.origin.copy(this.object.position), Zi.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Zi.direction)) < sp ? this.object.lookAt(this.target) : (no.setFromNormalAndCoplanarPoint(this.object.up, this.target), Zi.intersectPlane(no, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), s = true);
    }
    return this._scale = 1, this._performCursorZoom = false, s || this._lastPosition.distanceToSquared(this.object.position) > Wr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Wr || this._lastTargetPosition.distanceToSquared(this.target) > Wr ? (this.dispatchEvent(eo), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), true) : false;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? Ee / 60 * this.autoRotateSpeed * t : Ee / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    le.setFromMatrixColumn(e, 0), le.multiplyScalar(-t), this._panOffset.add(le);
  }
  _panUp(t, e) {
    this.screenSpacePanning === true ? le.setFromMatrixColumn(e, 1) : (le.setFromMatrixColumn(e, 0), le.crossVectors(this.object.up, le)), le.multiplyScalar(t), this._panOffset.add(le);
  }
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const r = this.object.position;
      le.copy(r).sub(this.target);
      let s = le.length();
      s *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * s / n.clientHeight, this.object.matrix), this._panUp(2 * e * s / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = false);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = false);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = true;
    const n = this.domElement.getBoundingClientRect(), r = t - n.left, s = e - n.top, a = n.width, o = n.height;
    this._mouse.x = r / a * 2 - 1, this._mouse.y = -(s / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Ee * this._rotateDelta.x / e.clientHeight), this._rotateUp(Ee * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = false;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(Ee * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), e = true;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-Ee * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), e = true;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(Ee * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), e = true;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-Ee * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), e = true;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1) this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), r = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(n, r);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1) this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), r = 0.5 * (t.pageY + e.y);
      this._panStart.set(n, r);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, r = t.pageY - e.y, s = Math.sqrt(n * n + r * r);
    this._dollyStart.set(0, s);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1) this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), r = 0.5 * (t.pageX + n.x), s = 0.5 * (t.pageY + n.y);
      this._rotateEnd.set(r, s);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Ee * this._rotateDelta.x / e.clientHeight), this._rotateUp(Ee * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1) this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), r = 0.5 * (t.pageY + e.y);
      this._panEnd.set(n, r);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, r = t.pageY - e.y, s = Math.sqrt(n * n + r * r);
    this._dollyEnd.set(0, s), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (t.pageX + e.x) * 0.5, o = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(a, o);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) {
      this._pointers.splice(e, 1);
      return;
    }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++) if (this._pointers[e] == t.pointerId) return true;
    return false;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new Pt(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  _customWheelEvent(t) {
    const e = t.deltaMode, n = { clientX: t.clientX, clientY: t.clientY, deltaY: t.deltaY };
    switch (e) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function ap(i) {
  this.enabled !== false && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function op(i) {
  this.enabled !== false && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function lp(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Bo), this.state = jt.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function cp(i) {
  let t;
  switch (i.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case ei.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(i), this.state = jt.DOLLY;
      break;
    case ei.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(i), this.state = jt.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(i), this.state = jt.ROTATE;
      }
      break;
    case ei.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(i), this.state = jt.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(i), this.state = jt.PAN;
      }
      break;
    default:
      this.state = jt.NONE;
  }
  this.state !== jt.NONE && this.dispatchEvent(Xs);
}
function hp(i) {
  switch (this.state) {
    case jt.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(i);
      break;
    case jt.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(i);
      break;
    case jt.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function up(i) {
  this.enabled === false || this.enableZoom === false || this.state !== jt.NONE || (i.preventDefault(), this.dispatchEvent(Xs), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Bo));
}
function dp(i) {
  this.enabled !== false && this._handleKeyDown(i);
}
function fp(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Qn.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(i), this.state = jt.TOUCH_ROTATE;
          break;
        case Qn.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(i), this.state = jt.TOUCH_PAN;
          break;
        default:
          this.state = jt.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Qn.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(i), this.state = jt.TOUCH_DOLLY_PAN;
          break;
        case Qn.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(i), this.state = jt.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = jt.NONE;
      }
      break;
    default:
      this.state = jt.NONE;
  }
  this.state !== jt.NONE && this.dispatchEvent(Xs);
}
function pp(i) {
  switch (this._trackPointer(i), this.state) {
    case jt.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case jt.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case jt.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case jt.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = jt.NONE;
  }
}
function mp(i) {
  this.enabled !== false && i.preventDefault();
}
function _p(i) {
  i.key === "Control" && (this._controlActive = true, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
function gp(i) {
  i.key === "Control" && (this._controlActive = false, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true }));
}
export {
  Ep as A,
  Ai as B,
  Wt as C,
  Sp as D,
  _n as F,
  Mp as M,
  He as N,
  Ap as O,
  Oe as P,
  bp as R,
  vp as S,
  Pt as V,
  Tp as W,
  De as a,
  cr as b,
  ns as c,
  nn as d,
  F as e,
  xp as f,
  yo as g,
  dn as h,
  Oo as i,
  yp as j
};
