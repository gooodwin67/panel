import * as THREE from "three";
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import gsap from "gsap";
import { getRandomNumber } from "../utils/functions";
import { EMOTIONS_DATA, EMOTIONS_DEFAULT } from "./emotions-data";


export class CharactersClass {
  constructor(gameContext) {
    this.scene = gameContext.scene;
    this.gui = gameContext.gui;
    this.emotionsClass = gameContext.emotionsClass;


    this.charEmotions = gameContext.emotionsClass.charEmotions;

    this.characterGroup = new THREE.Group();

    this.eyes = [];
    this.eyesBack = [];
    this.brows = [];
    this.cheeks = [];

    this.mouth = null;

    this.persId = null;

    




    this.activeState = {
      base: null,
      modifiers: [] // Например: ['left', 'surprisedEyes']
    };


    this.defaults = EMOTIONS_DEFAULT;

    this.charsIdles = ['idle', 'lookUp', 'idle', 'idle'];

    document.querySelector('.test_btn1').addEventListener('click', () => {
      //this.charsIdles.forEach((idle, index) => {

        // if (idle === 'idle') {
          
        // }
        // this.activeState.modifiers = [];
        // this.activeState.modifiers.push('left');
        
        this.setEmotion('left');
        
        
          
        
      //})
    })

    document.querySelector('.test_btn2').addEventListener('click', () => {
      this.activeState.modifiers = [];
      this.activeState.modifiers.push('right');
      this.setEmotion();
    })




    // Храним текущие параметры геометрии
    this.currentMouthParams = {};

    this.faceZ = 0.62;

    this.bodyMat = new THREE.MeshStandardMaterial({ color: 0x8EE4AF, roughness: 0.9 });

    this.body = null;
    this.heightBody = 4.2;

    this.blackMat = new THREE.MeshStandardMaterial({ color: 0x734C3A, side: THREE.DoubleSide });
    this.eyeMat = new THREE.MeshStandardMaterial({ color: 0x734C3A, side: THREE.DoubleSide, transparent: true, opacity: 1 });


    // Сохраняем "чистую" копию нейтрального состояния для вычисления разницы (deltas)
    this.initialDefaults = JSON.parse(JSON.stringify(this.defaults));
    // Параметры, которые анимируются в реальном времени
    this.params = JSON.parse(JSON.stringify(this.defaults));

    // GUI для отладки персонажа (можно отключить при необходимости)
    this.setupGui();
  }



  // --- УНИВЕРСАЛЬНЫЙ МЕТОД СОЗДАНИЯ ГЕОМЕТРИИ РТА ---
  updateMouthGeometry(newParams) {
    const keysToCheck = ['radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength'];

    let needsUpdate = false;
    for (const key of keysToCheck) {
      if (this.currentMouthParams[key] !== newParams[key]) {
        needsUpdate = true;
        break;
      }
    }

    if (!needsUpdate && this.mouth) return;

    if (this.mouth && this.mouth.geometry) {
      this.mouth.geometry.dispose();
    }

    const geometry = new THREE.CylinderGeometry(
      newParams.radiusTop,
      newParams.radiusBottom,
      newParams.height,
      newParams.radialSegments,
      newParams.heightSegments,
      newParams.openEnded,
      newParams.thetaStart,
      newParams.thetaLength
    );

    geometry.rotateX(Math.PI / 2);
    geometry.center();

    if (this.mouth) {
      this.mouth.geometry = geometry;
    } else {
      this.mouth = new THREE.Mesh(geometry, this.blackMat);
      this.characterGroup.add(this.mouth);
    }

    this.currentMouthParams = { ...newParams };
  }

  blink() {
    if (this.eyes.length < 2) return;
  //  console.log(this.activeState);

    const s = this.savedScaleY || 1;
    const faceScale = Math.max(s, 0.65);

    const blinkObj = { val: 1 * faceScale };
    gsap.to(blinkObj, {
      val: 0.1 * faceScale, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut",
      onUpdate: () => {
        this.eyesBack.forEach((eye, i) => {
          eye.scale.setY(this.params.eyesBack.scaleY[i] * blinkObj.val);
        });
        this.eyes.forEach((eye, i) => {
          eye.scale.setY(this.params.eyes.scaleY[i] * blinkObj.val);
          // Скрываем зрачки когда глаза закрываются (когда val меньше 0.3)
          const normalizedVal = blinkObj.val / faceScale; // нормализуем к 0-1
          eye.material.opacity = normalizedVal > 0.7 ? 1 : 0;
        });
      }
    });
  }

  // --- ПРИМЕНЕНИЕ ЭМОЦИЙ К КОНКРЕТНОМУ ПЕРСОНАЖУ ---
  setEmotion = (emotionsList) => {

    

    // 1. Если передали одну строку (например 'idle1'), превращаем её в массив ['idle1']
    // Если передали null или undefined, используем пустой массив (вернется в дефолт)
    // const activeEmotions = Array.isArray(emotionsList) ? emotionsList : (emotionsList ? [emotionsList] : []);

    const activeEmotions = [emotionsList, ...this.activeState.modifiers];


    // 2. Создаем "базу" из чистых дефолтных значений. 
    // Мы будем наслаивать изменения (оффсеты) на эту копию.
    const targetParams = JSON.parse(JSON.stringify(this.defaults));

    // 3. Проходим циклом по всем активным эмоциям и СУММИРУЕМ параметры
    activeEmotions.forEach(emotionName => {

      // Ищем данные эмоции (в charEmotions или EMOTIONS_DATA)

      const offsets = this.charEmotions.idleEmotions[this.persId - 1][this.activeState.base][emotionName] || this.charEmotions[emotionName] || {};


      // --- А. Простые параметры ---

      if (offsets.bodyRotate !== undefined) targetParams.bodyRotate += offsets.bodyRotate;
      if (offsets.color !== undefined) targetParams.color = offsets.color; // Цвет заменяем, не плюсуем

      // --- Б. Парные части (Eyes, Brows, Cheeks, EyesBack) ---
      ['eyes', 'eyesBack', 'brows', 'cheeks'].forEach(part => {
        if (!offsets[part]) return;

        // Проверяем, является ли это направленной эмоцией (left, right, top, bottom)
        const isDirectionalEmotion = ['left', 'right', 'top', 'bottom'].includes(emotionName);
        
        Object.keys(offsets[part]).forEach(prop => {
          // Если в эмоции есть этот параметр
          if (offsets[part][prop]) {
            if (isDirectionalEmotion && part === 'eyes') {
              // Для направленных эмоций вычисляем смещение относительно центральной позиции из defaults
              // Центральная позиция - это значение из EMOTIONS_DEFAULT
              // Это гарантирует, что направленные эмоции всегда перемещают зрачки относительно центра,
              // независимо от того, какая базовая эмоция была применена ранее
              const centerPos = this.initialDefaults.eyes[prop];
              if (centerPos) {
                targetParams[part][prop][0] = centerPos[0] + offsets[part][prop][0]; // Левая сторона
                targetParams[part][prop][1] = centerPos[1] + offsets[part][prop][1]; // Правая сторона
              }
            } else {
              // Для обычных эмоций прибавляем оффсет к текущей позиции
              targetParams[part][prop][0] += offsets[part][prop][0]; // Левая сторона
              targetParams[part][prop][1] += offsets[part][prop][1]; // Правая сторона
            }
          }
        });
      });

      // --- В. Рот (Трансформации + Геометрия) ---
      if (offsets.mouth) {
        // 1. Трансформации (x, y, scale...) — СУММИРУЕМ
        ['x', 'y', 'scaleX', 'scaleY', 'rotationX', 'rotationY', 'rotationZ'].forEach(key => {
          if (offsets.mouth[key] !== undefined) {
            targetParams.mouth[key] += offsets.mouth[key];
          }
        });

        // 2. Геометрия (форма, сегменты) — ЗАМЕНЯЕМ (последняя эмоция в списке перекрывает предыдущие)
        // Обработка "шорткатов" формы
        if (offsets.mouth.shape === 'half') targetParams.mouth.thetaLength = Math.PI;
        if (offsets.mouth.shape === 'full') targetParams.mouth.thetaLength = Math.PI * 2;
        if (offsets.mouth.open !== undefined) targetParams.mouth.openEnded = offsets.mouth.open;

        // Прямые параметры геометрии
        const geoKeys = ['radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength'];
        geoKeys.forEach(key => {
          if (offsets.mouth[key] !== undefined) {
            targetParams.mouth[key] = offsets.mouth[key];
          }
        });
      }
    });

    // --- 4. Применяем полученный результат (TargetParams) ---

    // Обновляем геометрию рта (сразу, так как нельзя плавно анимировать количество сегментов)
    this.updateMouthGeometry(targetParams.mouth);

    // GSAP Анимация к рассчитанным значениям
    const duration = 1.2;
    const ease = "back.out(1.7)";

    // 4.1 Анимация простых свойств
    gsap.to(this.params, {
      bodyRotate: targetParams.bodyRotate,
      color: targetParams.color,
      duration,
      ease
    });

    // 4.2 Анимация массивов (глаза, брови и т.д.)
    ['eyes', 'eyesBack', 'brows', 'cheeks'].forEach(part => {
      Object.keys(targetParams[part]).forEach(prop => {
        gsap.to(this.params[part][prop], {
          0: targetParams[part][prop][0],
          1: targetParams[part][prop][1],
          duration,
          ease,
          onUpdate: () => this.updateCharacterVisuals() // Перерисовка каждый кадр
        });
      });
    });

    // 4.3 Анимация трансформаций рта
    // Собираем объект только с transform-ключами для GSAP
    const mouthTargets = {};
    ['x', 'y', 'scaleX', 'scaleY', 'rotationX', 'rotationY', 'rotationZ'].forEach(key => {
      mouthTargets[key] = targetParams.mouth[key];
    });

    gsap.to(this.params.mouth, {
      ...mouthTargets,
      duration,
      ease,
      onUpdate: () => this.updateCharacterVisuals()
    });
  };


  updateCharacterVisuals() {
    // 1. Определяем реальный масштаб (или берем сохраненный)
    const s = this.savedScaleY || 1;

    // 2. Рассчитываем центр тела в мире (как в loadCharacters)
    const bodyY = (this.heightBody * s) / 2 - 2.2;

    // 3. --- ГЛАВНАЯ МАГИЯ ---
    // faceScale: не даем лицу стать меньше 65% от оригинала, даже если тело 30% (0.3).
    // Это сохранит глаза и рот крупными и читаемыми на маленьких персонажах.
    const faceScale = Math.max(s, 0.65);

    // defaultTop: Где макушка у базового персонажа (высота 4.2 / 2 = 2.1)
    const defaultTop = 2.1;

    // currentTop: Где макушка сейчас (относительно центра тела)
    const currentTop = (this.heightBody * s) / 2;

    // Хелпер: считает позицию Y, отступая от макушки, а не от центра
    const getFaceY = (defaultParamY) => {
      const distFromTop = defaultTop - defaultParamY; // Насколько далеко от верха в оригинале
      // Отступаем от ТЕКУЩЕЙ макушки, но расстояние сжимаем не сильно (faceScale)
      return bodyY + currentTop - (distFromTop * faceScale);
    };
    // ------------------------

    this.characterGroup.rotation.y = this.params.bodyRotate;

    for (let i = 0; i < 2; i++) {
      // Глаза
      this.eyes[i].position.set(
        this.params.eyes.x[i] * faceScale, // X можно не трогать или умножать на faceScale для ширины
        getFaceY(this.params.eyes.y[i]),
        this.faceZ
      );
      // Масштаб самих глаз тоже берем от faceScale, чтобы они не были точками
      this.eyes[i].scale.set(
        this.params.eyes.scaleX[i] * faceScale,
        this.params.eyes.scaleY[i] * faceScale,
        1
      );

      this.eyesBack[i].scale.set(
        this.params.eyesBack.scaleX[i] * faceScale,
        this.params.eyesBack.scaleY[i] * faceScale,
        1
      );

      // Брови
      this.brows[i].position.set(
        this.params.brows.x[i] * faceScale,
        getFaceY(this.params.brows.y[i]),
        this.faceZ
      );
      this.brows[i].rotation.z = this.params.brows.rotation[i];

      this.brows[i].scale.set(
        this.params.brows.scaleX[i] * faceScale,
        this.params.brows.scaleY[i] * faceScale,
        1
      );

      // Щеки
      this.cheeks[i].position.set(
        this.params.cheeks.x[i] * (faceScale * 1.1),
        getFaceY(this.params.cheeks.y[i]),
        this.faceZ
      );
      this.cheeks[i].scale.set(
        this.params.cheeks.scaleX[i] * faceScale,
        this.params.cheeks.scaleY[i] * 0.6 * faceScale,
        0.2
      );

      if (this.cheeks[i].material.opacity !== undefined) {
        this.cheeks[i].material.opacity = this.params.cheeks.opacity[i];
      }
    }

    // Рот
    if (this.mouth) {
      this.mouth.position.set(
        this.params.mouth.x,
        getFaceY(this.params.mouth.y),
        this.faceZ
      );
      this.mouth.rotation.x = this.params.mouth.rotationX;
      this.mouth.rotation.y = this.params.mouth.rotationY;
      this.mouth.rotation.z = this.params.mouth.rotationZ;


      // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
      // Мы меняем местами scaleX и scaleY, потому что из-за поворота rotationZ на 90 градусов
      // оси координат меша тоже повернулись.
      this.mouth.scale.set(
        this.params.mouth.scaleY * faceScale, // Назначаем параметр Y на ось X меша (которая теперь вертикальная)
        this.params.mouth.scaleX * faceScale, // Назначаем параметр X на ось Y меша (которая теперь горизонтальная)
        1
      );
    }
  }

  // --- SETUP GUI ---
  setupGui() {
    if (!this.gui) return;

    // Срабатывает при любом изменении любого ползунка
    const onGuiChange = () => {
      // 1. Применяем изменения из GUI (this.defaults) в визуальные параметры (this.params)
      this.applyGuiToParams();
      // 2. Обновляем 3D сцену
      this.updateCharacterVisuals();
      // 3. Выводим код в консоль
      this.logChanges();
    };

    const onMouthGeoChange = () => {
      this.applyGuiToParams(); // копируем значения
      this.updateMouthGeometry(this.params.mouth); // обновляем геометрию
      this.logChanges();
    };

    const testFolder = this.gui.addFolder('Test');
    // testFolder.add(this.charEmotions, 'bodyRotate', -3, 3).onChange(onGuiChange);

    testFolder.add(this.charEmotions, '1', { Label1: 0, Label2: 1, Label3: 2 });

    // Группа: Персонаж
    const personFolder = this.gui.addFolder('Person');
    personFolder.add(this.defaults, 'bodyRotate', -3, 3).onChange(onGuiChange);
    personFolder.addColor(this.defaults, 'color').onChange(onGuiChange);

    // Группа: Парные части (Глаза, Брови, Щеки)
    const createPairFolder = (name, partObj) => {
      const folder = this.gui.addFolder(name);

      if (partObj.x) {
        folder.add(partObj.x, '0', -1, 0).name('Left X').onChange(onGuiChange);
        folder.add(partObj.x, '1', 0, 1).name('Right X').onChange(onGuiChange);
      }
      if (partObj.y) {
        folder.add(partObj.y, '0', 0, 3).name('Left Y').onChange(onGuiChange);
        folder.add(partObj.y, '1', 0, 3).name('Right Y').onChange(onGuiChange);
      }

      if (partObj.rotation) {
        folder.add(partObj.rotation, '0', -3, 3).name('Left Rot').onChange(onGuiChange);
        folder.add(partObj.rotation, '1', -3, 3).name('Right Rot').onChange(onGuiChange);
      }

      if (partObj.scaleX) {
        folder.add(partObj.scaleX, '0', 0, 3).name('L Scale X').onChange(onGuiChange);
        folder.add(partObj.scaleX, '1', 0, 3).name('R Scale X').onChange(onGuiChange);
        folder.add(partObj.scaleY, '0', 0, 3).name('L Scale Y').onChange(onGuiChange);
        folder.add(partObj.scaleY, '1', 0, 3).name('R Scale Y').onChange(onGuiChange);
      } else if (partObj.scale) {
        folder.add(partObj.scale, '0', 0, 3).name('L Scale').onChange(onGuiChange);
        folder.add(partObj.scale, '1', 0, 3).name('R Scale').onChange(onGuiChange);
      }

      if (partObj.opacity) {
        folder.add(partObj.opacity, '0', 0, 1).name('L Opacity').onChange(onGuiChange);
        folder.add(partObj.opacity, '1', 0, 1).name('R Opacity').onChange(onGuiChange);
      }
    };

    createPairFolder('Eyes', this.defaults.eyes);
    createPairFolder('EyesBack', this.defaults.eyesBack);
    createPairFolder('Brows', this.defaults.brows);
    createPairFolder('Cheeks', this.defaults.cheeks);

    // Группа: Рот (Трансформации)
    const mouthTransFolder = this.gui.addFolder('Mouth Transform');
    mouthTransFolder.add(this.defaults.mouth, 'x', -1, 1).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'y', 0, 2).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'scaleX', 0, 3).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'scaleY', 0, 3).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'rotationX', -Math.PI, Math.PI).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'rotationY', -Math.PI, Math.PI).onChange(onGuiChange);
    mouthTransFolder.add(this.defaults.mouth, 'rotationZ', -Math.PI, Math.PI).onChange(onGuiChange);

    // Группа: Рот (Геометрия)
    const mouthGeoFolder = this.gui.addFolder('Mouth Geometry');
    mouthGeoFolder.add(this.defaults.mouth, 'radiusTop', 0, 1).onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'radiusBottom', 0, 1).onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'height', 0.01, 1).onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'radialSegments', 3, 64, 1).onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'openEnded').onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'thetaStart', 0, Math.PI * 2).onChange(onMouthGeoChange);
    mouthGeoFolder.add(this.defaults.mouth, 'thetaLength', 0, Math.PI * 2).onChange(onMouthGeoChange);
  }

  applyGuiToParams() {
    // Копируем массивы
    ['eyes', 'eyesBack', 'brows', 'cheeks'].forEach(part => {
      Object.keys(this.defaults[part]).forEach(key => {
        if (this.params[part][key]) {
          this.params[part][key][0] = this.defaults[part][key][0];
          this.params[part][key][1] = this.defaults[part][key][1];
        }
      });
    });
    // Копируем рот
    Object.keys(this.defaults.mouth).forEach(key => {
      this.params.mouth[key] = this.defaults.mouth[key];
    });
    // Прочее
    this.params.bodyRotate = this.defaults.bodyRotate;
    this.params.color = this.defaults.color;
  }
  // --- ЛОГИРОВАНИЕ ИЗМЕНЕНИЙ ---
  logChanges() {
    const output = {};
    const r = (num) => Math.round(num * 1000) / 1000; // Округление до 3 знаков

    // 1. Body Rotate (Считаем разницу)
    const bodyRotDiff = this.defaults.bodyRotate - this.initialDefaults.bodyRotate;
    if (Math.abs(bodyRotDiff) > 0.001) output.bodyRotate = r(bodyRotDiff);

    // 2. Массивы (Eyes, Brows, Cheeks) - Считаем разницу
    ['eyes', 'eyesBack', 'brows', 'cheeks'].forEach(part => {
      const partObj = {};
      let hasChange = false;

      Object.keys(this.defaults[part]).forEach(prop => {
        const current = this.defaults[part][prop];
        const initial = this.initialDefaults[part][prop];

        // Для массивов [left, right]
        if (Array.isArray(current) && Array.isArray(initial)) {
          const d0 = current[0] - initial[0];
          const d1 = current[1] - initial[1];

          if (Math.abs(d0) > 0.001 || Math.abs(d1) > 0.001) {
            partObj[prop] = [r(d0), r(d1)];
            hasChange = true;
          }
        }
      });
      if (hasChange) output[part] = partObj;
    });

    // 3. Рот
    const mouthObj = {};
    let mouthHasChange = false;
    const mCurr = this.defaults.mouth;
    const mInit = this.initialDefaults.mouth;

    // А. Трансформации (Считаем разницу/Offset, так как setEmotion прибавляет их)
    ['x', 'y', 'scaleX', 'scaleY', 'rotationX', 'rotationY', 'rotationZ'].forEach(key => {
      const diff = mCurr[key] - mInit[key];
      if (Math.abs(diff) > 0.001) {
        mouthObj[key] = r(diff);
        mouthHasChange = true;
      }
    });

    // Б. Геометрия (Берем Абсолютные значения, так как setEmotion заменяет их)
    ['radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments', 'openEnded', 'thetaStart', 'thetaLength'].forEach(key => {
      if (mCurr[key] !== mInit[key]) {
        mouthObj[key] = (typeof mCurr[key] === 'number') ? r(mCurr[key]) : mCurr[key];
        mouthHasChange = true;
      }
    });

    if (mouthHasChange) output.mouth = mouthObj;

    // Выводим в консоль только если есть изменения
    if (Object.keys(output).length > 0) {
      // Очищаем консоль, чтобы не спамить (по желанию можно убрать console.clear())
      console.clear();
      console.log("✂️ Copy this object to 'this.emotions':");
      console.log(output);
    }
  }




  loadCharacters(id = 0, color = this.defaults.color, scaleY = 1, startEmotion = 'idle1mas') {

    this.persId = id;

    this.scene.add(this.characterGroup);

    this.savedScaleY = scaleY;

    this.body = new THREE.Mesh(new RoundedBoxGeometry(1.6, this.heightBody * scaleY, 1.2, 8, 0.3), this.bodyMat);
    this.body.position.y = this.heightBody * scaleY / 2 - 2.2;

    this.body.material.color.set(color);
    // this.body.scale.y = scaleY;

    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.characterGroup.add(this.body);

    const pinkMat = new THREE.MeshBasicMaterial({ color: 0xFF9999, transparent: true, opacity: 0.7 });

    const eyeGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.05, 32);
    eyeGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 2; i++) {
      const eye = new THREE.Mesh(eyeGeo, this.eyeMat);
      this.characterGroup.add(eye);
      this.eyes.push(eye);
    }

    const s = this.savedScaleY || 1;
    const bodyY = (this.heightBody * s) / 2 - 2.2;
    const faceScale = Math.max(s, 0.65);

    const defaultTop = 2.1;
    const currentTop = (this.heightBody * s) / 2;
    const getFaceY = (defaultParamY) => {
      const distFromTop = defaultTop - defaultParamY;
      return bodyY + currentTop - (distFromTop * faceScale);
    };


    const eyeBack = new THREE.CylinderGeometry(0.30, 0.12, 0.05, 32);
    eyeBack.rotateX(Math.PI / 2);
    for (let i = 0; i < 2; i++) {
      const eye = new THREE.Mesh(eyeBack, new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.4 }));
      this.characterGroup.add(eye);
      this.eyesBack.push(eye);

      eye.position.set(
        this.params.eyesBack.x[i] * faceScale,
        getFaceY(this.params.eyesBack.y[i]) + 0.02,
        this.faceZ - 0.01
      )
      eye.scale.set(
        this.params.eyesBack.scaleX[i] * faceScale,
        this.params.eyesBack.scaleY[i] * faceScale,
        1
      );
    }





    const browGeo = new THREE.TorusGeometry(0.08, 0.025, 16, 30, Math.PI / 1.1);
    for (let i = 0; i < 2; i++) {
      const brow = new THREE.Mesh(browGeo, this.blackMat);
      this.characterGroup.add(brow);
      this.brows.push(brow);
    }

    this.updateMouthGeometry(this.defaults.mouth);

    const cheekGeo = new THREE.SphereGeometry(0.18, 32, 16);
    cheekGeo.scale(1, 0.6, 0.2);
    for (let i = 0; i < 2; i++) {
      const cheek = new THREE.Mesh(cheekGeo, pinkMat);
      this.characterGroup.add(cheek);
      this.cheeks.push(cheek);
    }

    this.updateCharacterVisuals();
    gsap.to(this.characterGroup.scale, { duration: getRandomNumber(1.7, 2.3), y: "+=0.03", repeat: -1, yoyo: true, ease: "sine.inOut" });

    this.activeState.base = startEmotion;

    // this.setEmotion();


  }


}