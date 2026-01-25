import { EMOTIONS_DATA } from "./emotions-data";
import { getRandomNumber } from "../utils/functions";

export class EmotionsClass {
  constructor(gameContext) {
    this.scene = gameContext.scene;
    this.gameContext = gameContext;

    // индивидуальные таймеры по персонажам (ключ: persId или индекс)
    this.nextEmotionChangeTimeByChar = {}; // смена эмоций
    this.nextBlinkTimeByChar = {};         // моргание

    this.charEmotions = {
      idleEmotions: [
        {
          idle1: EMOTIONS_DATA.emotionsIdle1.idle1,
          idle1mas: EMOTIONS_DATA.emotionsIdle1,
        },
        {
          idle2: EMOTIONS_DATA.emotionsIdle2.idle1,
          idle2mas: EMOTIONS_DATA.emotionsIdle2,
        },
        {
          idle3: EMOTIONS_DATA.emotionsIdle3.idle1,
          idle3mas: EMOTIONS_DATA.emotionsIdle3,
        },
        {
          idle4: EMOTIONS_DATA.emotionsIdle4.idle1,
          idle4mas: EMOTIONS_DATA.emotionsIdle4,
        }
      ],

      left: EMOTIONS_DATA.emotionsLeft,
      right: EMOTIONS_DATA.emotionsRight,
      top: EMOTIONS_DATA.emotionsTop,
      bottom: EMOTIONS_DATA.emotionsBottom,
    };
  }

  updateEmotions() {
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());

    const gameClass = this.gameContext.gameClass;
    if (!gameClass || !Array.isArray(gameClass.characters)) return;

    gameClass.characters.forEach((character, index) => {
      if (!character || typeof character.setEmotion !== 'function' || !character.activeState) return;

      const base = character.activeState.base || 'idle1mas';
      const idIndex = (character.persId || index + 1) - 1;
      const idleConfig = this.charEmotions.idleEmotions[idIndex] && this.charEmotions.idleEmotions[idIndex][base];
      if (!idleConfig) return;

      const charKey = character.persId || (index + 1);

      // ===== ЭМОЦИИ (1–3 сек) =====
      const nextEmotionTime = this.nextEmotionChangeTimeByChar[charKey] || 0;
      if (now >= nextEmotionTime) {
        const list = Object.keys(idleConfig);
        if (list.length) {
          const rand = list[Math.floor(Math.random() * list.length)];
          character.setEmotion(rand);
        }
        this.nextEmotionChangeTimeByChar[charKey] = now + getRandomNumber(1000, 3000);
      }

      // ===== МОРГАНИЕ (реже, 3–7 сек) =====
      const nextBlinkTime = this.nextBlinkTimeByChar[charKey] || 0;
      if (now >= nextBlinkTime && typeof character.blink === 'function') {
        character.blink();
        this.nextBlinkTimeByChar[charKey] = now + getRandomNumber(3000, 7000);
      }
    });
  }
}