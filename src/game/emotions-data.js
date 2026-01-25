// --- ПАРАМЕТРЫ (БАЗОВЫЕ / НЕЙТРАЛЬНЫЕ) ---
export const EMOTIONS_DEFAULT = {
 bodyRotate: 0,
 color: '#8EE4AF',

 eyesBack: {
  x: [-0.4, 0.4],
  y: [1.2, 1.2],
  scaleX: [1, 1],
  scaleY: [1, 1],
 },

 eyes: {
  x: [-0.4, 0.4],
  y: [1.2, 1.2],
  scaleX: [1, 1],
  scaleY: [1, 1],
 },
 brows: {
  x: [-0.4, 0.4],
  y: [1.6, 1.6],
  scaleX: [1, 1],
  scaleY: [1, 1],
  rotation: [0, 0]
 },
 cheeks: {
  x: [-0.50, 0.50],
  y: [0.8, 0.8],
  scaleX: [1, 1],
  scaleY: [2, 2],
  opacity: [0.4, 0.4]
 },

 // --- РОТ ---
 mouth: {
  // Трансформации (Relative offsets)
  x: 0,
  y: 0.6,
  scaleX: 0.5,
  scaleY: -0.143,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 1.51,

  // Геометрия (Absolute values)
  radiusTop: 0,
  radiusBottom: 0.3,
  height: 0.01,
  radialSegments: 12,
  heightSegments: 1,
  openEnded: false,
  thetaStart: 0,
  thetaLength: 2.9,
 }

};

export const EMOTIONS_DATA = {
 emotionsIdle1: {
  idle1: {

   eyes: { x: [0.052, -0.052], y: [-0.012, -0.012] },
   mouth: { scaleX: 0.25, scaleY: 0.40, radiusTop: 0.2, thetaLength: 3.4, },
   brows: {
    x: [0.2, -0.2],
    y: [-0.05, -0.05],
    // scaleX: [-0.5, -0.5],
    scaleY: [-0.5, -0.5],
    rotation: [-0.5, 0.5],
   }
  },

//   idle2: {
//    bodyRotate: 0.12,
   
   
//   },
//   idle3: {
//    bodyRotate: 0,
   
//   },
 },

 emotionsIdle2: {
  idle1: {
   // bodyRotate: -0.22,
   eyes: { x: [-0.072, -0.072], y: [-0.052, -0.052] },
   mouth: { scaleX: 0.15, scaleY: 0.684, radiusTop: 0.2, rotationZ: 3.2 },
   brows: {
    x: [-0.2, 0.2],
    y: [-0.05, -0.05],
    // scaleX: [-0.5, -0.5],
    scaleY: [-0.5, -0.5],
    rotation: [0.5, -0.5],
   },
  },

  // idle2: {
  //  bodyRotate: 0.22,
  //  mouth: { scaleX: 0.15, scaleY: 0.02 }
  // },
  // idle3: {
  //  bodyRotate: 0,
  //  mouth: { scaleX: 0.05, scaleY: 0.02 }
  // },
 },

 emotionsIdle3: {
  idle1: {
   // bodyRotate: -0.22,
   eyes: { x: [-0.07, 0.06], y: [-0.082, +0.032] },
   mouth: { y: -0.1, scaleX: 0.65, scaleY: 0.884, radiusTop: 0.1, thetaStart: 0.9, rotationZ: 2.6 },
   brows: {
    // x: [-0.2, 0.2],
    y: [+0.03, +0.17],
    // scaleX: [-0.5, -0.5],
    scaleY: [-0.5, -0.5],
    rotation: [0.1, -0.5],
   },
  },
  // idle2: {
  //  bodyRotate: 0.32,
  //  mouth: { scaleX: 0.15, scaleY: 0.02 }
  // },
  // idle3: {
  //  bodyRotate: 0,
  //  mouth: { scaleX: 0.05, scaleY: 0.02 }
  // },
 },

 emotionsIdle4: {
    idle1: {
        // bodyRotate: -0.22,
        eyes: { x: [+0.077, +0.07], y: [-0.052, -0.052] },
        mouth: { y: -0.2, scaleX: 0.15, scaleY: 0.50, radiusTop: 0.2, thetaLength: 3, thetaStart: 0.1},
        brows: {
            x: [-0.0, 0.0],
            y: [+0.08, +0.05],
            // scaleX: [-0.5, -0.5],
            scaleY: [-0.5, -0.5],
            rotation: [0.5, -0.5],
        },
        
       },
  
 },

 emotionsLeft: {
  eyes: { x: [-0.12, -0.12] },
 },
 emotionsRight: {
  eyes: { x: [+0.12, +0.12] },
 },
 emotionsTop: {
  eyes: { y: [0.12, 0.12] },
 },
 emotionsBottom: {
  eyes: { y: [-0.12, -0.12] },
 },

}



