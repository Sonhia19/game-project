import { context } from '../../src/main.js';

export class LobbyGameScene extends Phaser.Scene {
	
	/**
	 * Constructor.
	 */
	constructor() {
		super('LOBBYGAME');
	}
	
	/**
	 * Pre-carga de recursos.
	 */
	preload() {
        console.log('FROM LOBBY GAME');
		this.load.html('newGameForm', 'assets/html//newGameForm.html');

		// this.load.scenePlugin({
		// 	key: 'rexuiplugin',
		// 	url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
		// 	sceneKey: 'rexUI'
		// })
		
		// this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
	}
	
	/**
	 * Creación de la escena.
	 */
	create() {
		context.currentScene = 'LOBBYGAME';

		// const text = this.add.text(400, 300, 'Hello World', { fixedWidth: 150, fixedHeight: 36 })
		// text.setOrigin(0.5, 0.5)

		// text.setInteractive().on('pointerdown', () => {
		// 	context.game.rexUI.edit(text);
		// })
		console.log(this.add);
		var form = this.scene.add.dom(600, 250).createFromCache('newGameForm')
			.addListener('click').on('click', function(event) {
				if (event.target.name != 'submit')
					return;
				
				var playerName = this.getChildByName('playerName').value;
				console.log(playerName);
				if (playerName != '') {
					alert('Ingresa nombre del jugador');
					return;
				}
				
				// Enviamos el mensaje al servidor.
				var message = context.messagesFormat.newGame();
                console.log(message);
                context.functions.sendMessage(message);
			});
            
        // this.time.addEvent({
		// 	delay: 1000,
		// 	callback: ()=>{
		// 		var message = context.messagesFormat.newGame();
        //         console.log(message);
        //         context.functions.sendMessage(message);
		// 	},
		// 	loop: false
		// })
	}
}