import { context } from '../../src/main.js';

export class LobbyGameScene extends Phaser.Scene {
	
	constructor() {
		super('LOBBYGAME');
	}
	
	preload() {
        console.log('FROM LOBBY GAME');

		this.add.image(0, 0, 'background_menu').setOrigin(0);
		this.load.image("plane-type1", "assets/plane-type1.png");
        this.load.image("plane-type2", "assets/plane-type2.png");
        this.load.image("plane-type3", "assets/plane-type3.png");
        this.load.image("plane-type4", "assets/plane-type4.png");
		this.load.image("joingame_font", "assets/joingame-font.png");

	}

	plane1Type = 1;
	plane2Type = 1;
	plane3Type = 1;
	plane4Type = 1;
	
	create() {
		context.currentScene = 'LOBBYGAME';
		console.log(context.playerSession);

		const style = { font: "bold 25px Arial", fill: "#fff" };
  		this.add.text(1, 1, `Game Token: ${context.playerSession.gameId}`, style);
		this.add.text(1, 35, `Player Name: ${context.playerSession.name}`, style);
		this.add.text(300, 90, `Select planes type`, style);
		/***   se incorpora boton para tipo avion 1   ***/
		var plane1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, this.getTypeImage(this.plane1Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatPlane1(this.plane1Type));

		/***   se incorpora boton para tipo avion 2   ***/
		var plane2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, this.getTypeImage(this.plane2Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatPlane2(this.plane2Type));

		/***   se incorpora boton para tipo avion 3   ***/
		var plane3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, this.getTypeImage(this.plane3Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatPlane3(this.plane3Type));


		/***   se incorpora boton para tipo avion 4  ***/
		var plane4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, this.getTypeImage(this.plane4Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatPlane4(this.plane4Type));

		var joinGameButton = this.add.image(context.game.renderer.width * 0.90, context.game.renderer.height * 0.90, "joingame_font").setDepth(0);
        joinGameButton.setInteractive();
		
        joinGameButton.on('pointerdown', function () {

			if (context.playersConnected == 2) {

				// se cargan tipos de avion
				var planesType = [this.plane1Type, this.plane2Type, this.plane3Type, this.plane4Type];
				var message = context.messagesFormat.connectToGame(context.playerSession.name, context.playerSession.teamSide, planesType, context.playerSession.gameId);
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

	update() {
		this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, this.getTypeImage(this.plane1Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, this.getTypeImage(this.plane2Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, this.getTypeImage(this.plane3Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, this.getTypeImage(this.plane4Type)).setDepth(0);
	}

	updatPlane1(type) {
		if (type  == 1) {
			this.plane1Type = 2;
		} else if (type == 2) {
			this.plane1Type = 3;
		} else if (type == 3) {
			this.plane1Type = 4;
		} else if (type == 4) {
			this.plane1Type = 1;
		}
	}

	updatPlane2(type) {
		if (type  == 1) {
			this.plane2Type = 2;
		} else if (type == 2) {
			this.plane2Type = 3;
		} else if (type == 3) {
			this.plane2Type = 4;
		} else if (type == 4) {
			this.plane2Type = 1;
		}
	}

	updatPlane3(type) {
		if (type  == 1) {
			this.plane3Type = 2;
		} else if (type == 2) {
			this.plane3Type = 3;
		} else if (type == 3) {
			this.plane3Type = 4;
		} else if (type == 4) {
			this.plane3Type = 1;
		}
	}

	updatPlane4(type) {
		if (type  == 1) {
			this.plane4Type = 2;
		} else if (type == 2) {
			this.plane4Type = 3;
		} else if (type == 3) {
			this.plane4Type = 4;
		} else if (type == 4) {
			this.plane4Type = 1;
		}
	}
	getTypeImage(planeNumber) {

		var imageName = "plane-type1";
		if (planeNumber  == 1) {
			imageName = "plane-type1";
		} else if (planeNumber == 2) {
			imageName = "plane-type2";
		} else if (planeNumber == 3) {
			imageName = "plane-type3";
		} else if (planeNumber == 4) {
			imageName = "plane-type4";
		}

		return imageName;
	}
}