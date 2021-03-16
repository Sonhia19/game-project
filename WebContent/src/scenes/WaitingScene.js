import { context } from '../main.js';

export class WaitingScene extends Phaser.Scene {

	constructor() {
		super('WAITING');
	}

	preload() {

		this.load.spritesheet('loading', 'assets/loading-sprite.png', { frameWidth: 500, frameHeight: 500 });
	}

	create() {

		const style = { font: "bold 40px Arial", fill: "#fff" };
		
		this.add.text(context.game.renderer.width * 0.50, context.game.renderer.height * 0.90, `Esperando contrincante`, style);

		let loading = this.physics.add.sprite(context.game.renderer.width * 0.50, context.game.renderer.height * 0.50, 'loading');
		this.anims.create({
			key: 'loading',
			frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 90 }),
			frameRate: 10,
			repeat: -1
		});

		loading.anims.play('loading', true);
	}

	update() {
		if (context.playersReadyToPlay == 2) {
			console.log("FROM UPDATE " + context.playersReadyToPlay);
			context.functions.navigateScene("WAITING", "GAME");
		}
	}

}