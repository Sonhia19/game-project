import { context } from '../../src/main.js';


let playerName;
let tokenGame;

export class LobbyGameScene extends Phaser.Scene {
	
	constructor() {
		super('LOBBYGAME');
	}
	
	preload() {
        console.log('FROM LOBBY GAME');

		this.load.image("plane-type1", "assets/plane-type1.png");
        this.load.image("plane-type2", "assets/plane-type2.png");
        this.load.image("plane-type3", "assets/plane-type3.png");
        this.load.image("plane-type4", "assets/plane-type4.png");
		this.load.image("joingame_font", "assets/joingame-font.png");

		// playerName.setText(context.gameSession.playerName);
		// tokenGame.setText(context.gameSession.gameId);

	}
	
	create() {
		context.currentScene = 'LOBBYGAME';
		console.log(context.playerSession);

		const style = { font: "bold 32px Arial", fill: "#fff" };
  		this.add.text(0, 0, `Game Token: ${context.playerSession.gameId}`, style);
		this.add.text(0, 30, `Player Name: ${context.playerSession.name}`, style);

		var plane1Type = 1;
		var plane2Type = 1;
		var plane3Type = 1;
		var plane4Type = 1;

		//se incorporan botones avion 1
        var plane1Type1Button = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.40, "plane-type1").setDepth(0);
        plane1Type1Button.setInteractive();

        var plane1Type2Button = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.40, "plane-type2").setDepth(0);
        plane1Type2Button.setInteractive();

		var plane1Type3Button = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.40, "plane-type3").setDepth(0);
        plane1Type3Button.setInteractive();

		var plane1Type4Button = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.40, "plane-type4").setDepth(0);
        plane1Type4Button.setInteractive();

        plane1Type1Button.on('pointerdown', function () {
			//this.style.border = "2px solid red";
            plane1Type = 1
        }, this);

		plane1Type2Button.on('pointerdown', function () {
            plane1Type = 2
        }, this);

		plane1Type3Button.on('pointerdown', function () {
            plane1Type = 3
        }, this);

		plane1Type4Button.on('pointerdown', function () {
            plane1Type = 4
        }, this);


		var planesType = [plane1Type, plane2Type, plane3Type, plane4Type];

		var joinGameButton = this.add.image(context.game.renderer.width * 0.80, context.game.renderer.height * 0.80, "joingame_font").setDepth(0);
        joinGameButton.setInteractive();
		
        joinGameButton.on('pointerdown', function () {

			if (context.playersConnected == 2) {

				var message = context.messagesFormat.connectToGame(context.playerSession.name, context.playerSession.teamSide, planesType, context.playerSession.gameId);
				console.log(message);
				context.functions.sendMessage(message);

				this.time.addEvent({
					delay: 2000,
					callback: ()=>{
						this.scene.start("GAME", "hello from LOBBY scene");	
					},
					loop: false
				})
			}
			
        }, this);
		
	}

}