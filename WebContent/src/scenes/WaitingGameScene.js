import { context } from '../../src/main.js';

export class WaitingGameScene extends Phaser.Scene {
	
	constructor() {
		super('WAITINGGAME');
	}
	
	
	preload() {
        console.log('FROM WAITING GAME');
	}
	
	
	create() {
		context.currentScene = 'WAITINGGAME';
		
        this.time.addEvent({
			delay: 1000,
			callback: ()=>{
				var message = context.messagesFormat.newGame();
                console.log(message);
                context.functions.sendMessage(message);
			},
			loop: false
		})
            
	}
}