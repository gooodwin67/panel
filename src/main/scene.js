import * as THREE from 'three';

export class SceneClass {
  constructor(gameContext) {
    this.gameContext = gameContext;


    // Свет
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 5, 5);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);


    this.cellSize = 0.5;

    this.widthWallFront = 3.2;
    this.heightWall = 2.7;

    this.widthWallSide = 3.1;

    


    this.baseGridTexture = this.createGridTexture();

    this.wall = this.createWallPlane(this.widthWallFront, this.heightWall, true);
    this.wall.position.z = -this.widthWallSide/2;

    this.wall2 = this.createWallPlane(this.widthWallFront, this.heightWall);
    this.wall2.position.z = this.widthWallSide/2;
    this.wall2.rotation.y = Math.PI;

    this.wall3 = this.createWallPlane(this.widthWallSide, this.heightWall);
    this.wall3.rotation.y = -Math.PI/2;
    this.wall3.position.x = this.widthWallFront/2;

    this.wall4 = this.createWallPlane(this.widthWallSide, this.heightWall);
    this.wall4.rotation.y = Math.PI/2;
    this.wall4.position.x = -this.widthWallFront/2;
    
    
  }



  addLight() {
    this.gameContext.scene.add(this.directionalLight);
    this.gameContext.scene.add(this.ambientLight);
  }

  loadWall() {
    this.gameContext.scene.add(this.wall);
    this.gameContext.scene.add(this.wall2);
    this.gameContext.scene.add(this.wall3);
    this.gameContext.scene.add(this.wall4);
  }

  createScene() {
    this.loadWall();
    this.addLight();
  }


  // Функция-фабрика: создает готовую стену нужного размера
  // Добавил аргумент alignRight (по умолчанию false)
  createWallPlane(width, height, alignRight = false) {
    
    const geometry = new THREE.PlaneGeometry(width, height);

    const texture = this.baseGridTexture.clone();
    
    // Считаем повторения
    const repeatX = width / this.cellSize;
    const repeatY = height / this.cellSize;

    texture.repeat.set(repeatX, repeatY);

    // --- ЛОГИКА СДВИГА ---
    if (alignRight) {
      // Вычисляем остаток (дробную часть). Например, если repeatX = 6.4, остаток 0.4
      const fractionalPart = repeatX % 1;
      
      // Если остаток есть, сдвигаем текстуру так, чтобы конец пришелся на целое число
      if (fractionalPart > 0) {
        texture.offset.x = 1 - fractionalPart;
      }
    }
    // ---------------------
    
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    const material = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      map: texture,
      opacity: 0.5,
      transparent: true,
      side: THREE.FrontSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  createGridTexture() {
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');

    // Заливаем фон прозрачным или цветом стены (если прозрачный, будет виден color материала)
    ctx.fillStyle = '#cccccc'; 
    ctx.fillRect(0, 0, size, size);
    
    // Рисуем рамку
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter; 
    texture.minFilter = THREE.NearestFilter;
    
    return texture;
  }

}