
import { context } from '../../src/main.js';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super('LOAD');
    }

    init() {

    }

    preload() {
        context.webSocket.connect();
        this.load.image('logo', 'assets/logo_blanco.png');
    }

    create() {
        this.add.image(context.game.renderer.width * 0.5, context.game.renderer.height * 0.40, 'logo').setScale(0.60);
        let screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        let screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 1.15;
        this.add.text(screenCenterX, screenCenterY, 'Haz click para comenzar', { fontSize: '36px', color: '#FFFFFF', }).setOrigin(0.5);
        this.input.on('pointerdown', function (pointer) {
            this.scene.start("MENU", "hello from LOAD scene");

        }, this);


    }
}