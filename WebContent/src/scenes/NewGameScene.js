import { context } from '../../src/main.js';

export class NewGameScene extends Phaser.Scene {
	
	/**
	 * Constructor.
	 */
	constructor() {
		super('NEWGAME');
	}
	
	/**
	 * Pre-carga de recursos.
	 */
	preload() {
        console.log('FROM NEW GAME');
		//this.load.html('newGameForm', '../../src/forms/newGameForm.html');
	}
	
	/**
	 * Creación de la escena.
	 */
	create() {
		context.currentScene = 'NEWGAME';
		
		
		// Volver.
		//this.add.existing(new Boton(this, 560, 450, 'Volver', 
		//	{ fill: '#fff', fontFamily: '"Press Start 2P"', fontSize: '15px' },
		//	() => { context.funciones.cambiarEscena('Menu'); }
		//));
		
		// Agregamos el formulario.
		// var form = this.add.dom(600, 250).createFromCache('newGameForm')
		// 	.addListener('click').on('click', function(event) {
		// 		if (event.target.name != 'submit')
		// 			return;
				
		// 		// Enviamos el mensaje al servidor.
		// 		context.functions.sendMessage(
		// 			context.messagesFormat.newGame()
		// 		);
		// 	});
            
        this.time.addEvent({
			delay: 1000,
			callback: ()=>{
				var message = context.messagesFormat.newGame();
                console.log(message);
                context.functions.sendMessage(message);
			},
			loop: false
		})
        
        // context.functions.sendMessage(
        //     context.messagesFormat.newGame()
        // );
        //this.scene.start("GAME", "hello from NEWGAME scene");
            
	}
}