import * as THREE from 'three';

export class PreviewClass {
    constructor(gameContext) {
        this.gameContext = gameContext;
        this.renderer = gameContext.renderer;
        
        this.previewItems = [];
        this.time = 0; // Счетчик времени для анимации света

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xe0e0e0); 

        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.camera.position.set(0, 0, 0.7); 
        this.camera.lookAt(0, 0, 0);

        // --- СВЕТ ---
        
        // 1. Слабый заполняющий свет (чтобы тени не были черными)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        // this.scene.add(ambientLight);

        // 2. ГУЛЯЮЩИЙ СВЕТ (сохраняем в this, чтобы двигать в animate)
        this.movingLight = new THREE.DirectionalLight(0xffffff, 9.5);
        this.movingLight.position.set(7, -7, 0); // Стартовая позиция
        this.scene.add(this.movingLight);
    }

    initPreviews(panelModels) {
        const panelElements = document.querySelectorAll('.panel');

        panelElements.forEach((el, index) => {
            if (panelModels[index]) {
                const model = panelModels[index].clone();
                
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x999999, // Серый
                            roughness: 0.5,  // Чуть более глянцевый, чтобы ловить блики
                            metalness: 0.1,
                            flatShading: true // Подчеркивает грани
                        });
                    }
                });

                model.position.set(0, 0, 0);
                model.rotation.set(0, 0, 0);
                
                // Поворот, чтобы панель смотрела "лицом" (зависит от вашей модели)
                model.rotation.x = Math.PI / 2; 

                this.scene.add(model);

                this.previewItems.push({
                    element: el,
                    mesh: model
                });
            }
        });
    }

    animate(delta) {
        // this.time += delta;

        // --- АНИМАЦИЯ СВЕТА ---
        // Свет летает по кругу перед панелью
        const radius = 1; // Радиус вращения света
        const speed = 0.5; // Скорость света
        
        this.movingLight.position.x = Math.sin(this.time * speed) * radius;
        this.movingLight.position.y = Math.cos(this.time * speed) * radius;
        // Z держим положительным, чтобы свет был спереди
        this.movingLight.position.z = 0; 

        // Сами панели стоят на месте (или можно добавить микро-движение, если захочется)
        /* 
        this.previewItems.forEach(item => {
             item.mesh.rotation.z = Math.sin(this.time * 0.5) * 0.05; // Еле заметное дыхание
        });
        */
    }

    render() {
        const renderer = this.renderer;
        
        renderer.setScissorTest(true);

        this.previewItems.forEach(item => {
            const element = item.element;
            const mesh = item.mesh;

            const rect = element.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
                return;
            }

            const width = rect.width;
            const height = rect.height;
            const left = rect.left;
            const bottom = renderer.domElement.clientHeight - rect.bottom;

            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);

            this.previewItems.forEach(i => i.mesh.visible = false);
            mesh.visible = true;

            renderer.render(this.scene, this.camera);
        });

        renderer.setScissorTest(false);
    }
}