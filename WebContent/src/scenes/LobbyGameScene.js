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

		this.load.image("artillery-type1", "assets/artillery-type1.png");
        this.load.image("artillery-type2", "assets/artillery-type2.png");
        this.load.image("artillery-type3", "assets/artillery-type3.png");
        this.load.image("artillery-type4", "assets/artillery-type4.png");

		this.load.image("joingame_font", "assets/joingame-font.png");

	}

	plane1Type = 1;
	plane2Type = 1;
	plane3Type = 1;
	plane4Type = 1;

	artillery1Type = 1;
	artillery2Type = 1;
	artillery3Type = 1;
	artillery4Type = 1;
	
	create() {
		context.currentScene = 'LOBBYGAME';
		console.log(context.playerSession);

		const style = { font: "bold 25px Arial", fill: "#fff" };
  		this.add.text(1, 1, `Game Token: ${context.playerSession.gameId}`, style);
		this.add.text(1, 35, `Player Name: ${context.playerSession.name}`, style);

		/** PLANES */
		this.add.text(300, 90, `Select planes type`, style);
		/***   se incorpora boton para tipo avion 1   ***/
		var plane1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane1Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatePlane1(this.plane1Type));

		/***   se incorpora boton para tipo avion 2   ***/
		var plane2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane2Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatePlane2(this.plane2Type));

		/***   se incorpora boton para tipo avion 3   ***/
		var plane3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane3Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatePlane3(this.plane3Type));


		/***   se incorpora boton para tipo avion 4  ***/
		var plane4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane4Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updatePlane4(this.plane4Type));

		/** ARTILLERIES */
		this.add.text(300, 250, `Select artilleries type`, style);

		/***   se incorpora boton para tipo artilleria 1   ***/
		var artillery1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery1Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updateArtillery1(this.artillery1Type));

		/***   se incorpora boton para tipo artilleria 2   ***/
		var artillery2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery2Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updateArtillery2(this.artillery2Type));

		/***   se incorpora boton para tipo artilleria 3   ***/
		var artillery3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery3Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updateArtillery3(this.artillery3Type));


		/***   se incorpora boton para tipo artilleria 4  ***/
		var artillery4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery4Type)).setDepth(0)
								.setInteractive()
								.on('pointerdown', () => this.updateArtillery4(this.artillery4Type));



		var joinGameButton = this.add.image(context.game.renderer.width * 0.90, context.game.renderer.height * 0.90, "joingame_font").setDepth(0);
        joinGameButton.setInteractive();
		
        joinGameButton.on('pointerdown', function () {

			if (context.playersConnected == 2) {

				// se cargan tipos de avion
				var planesType = [this.plane1Type, this.plane2Type, this.plane3Type, this.plane4Type];
				// se cargan tipos de artilleria
				var artilleriesType = [this.artilleryType, this.artillery2Type, this.artillery3Type, this.artillery4Type];
				var message = context.messagesFormat.connectToGame(context.playerSession.name, context.playerSession.teamSide, planesType, artilleriesType, context.playerSession.gameId);
				context.functions.sendMessage(message);

				this.time.addEvent({
					delay: 1000,
					callback: ()=>{
						this.scene.start("GAME", "hello from LOBBY scene");	
					},
					loop: false
				})
			}
			
        }, this);
		
		
	}

	update() {
		this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane1Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane2Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane3Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane4Type)).setDepth(0);

		this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery1Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery2Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery3Type)).setDepth(0);
		this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery4Type)).setDepth(0);
	}

	/*** PLANES */
	updatePlane1(type) {
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

	updatePlane2(type) {
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

	updatePlane3(type) {
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

	updatePlane4(type) {
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

	/*** ARTILLERY */
	updateArtillery1(type) {
		if (type  == 1) {
			this.artillery1Type = 2;
		} else if (type == 2) {
			this.artillery1Type = 3;
		} else if (type == 3) {
			this.artillery1Type = 4;
		} else if (type == 4) {
			this.artillery1Type = 1;
		}
	}

	updateArtillery2(type) {
		if (type  == 1) {
			this.artillery2Type = 2;
		} else if (type == 2) {
			this.artillery2Type = 3;
		} else if (type == 3) {
			this.artillery2Type = 4;
		} else if (type == 4) {
			this.artillery2Type = 1;
		}
	}

	updateArtillery3(type) {
		if (type  == 1) {
			this.artillery3Type = 2;
		} else if (type == 2) {
			this.artillery3Type = 3;
		} else if (type == 3) {
			this.artillery3Type = 4;
		} else if (type == 4) {
			this.artillery3Type = 1;
		}
	}

	updateArtillery4(type) {
		if (type  == 1) {
			this.artillery4Type = 2;
		} else if (type == 2) {
			this.artillery4Type = 3;
		} else if (type == 3) {
			this.artillery4Type = 4;
		} else if (type == 4) {
			this.artillery4Type = 1;
		}
	}

	getPlaneTypeImage(planeNumber) {

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

	getArtilleryTypeImage(artilleryNumber) {

		var imageName = "artillery-type1";
		if (artilleryNumber  == 1) {
			imageName = "artillery-type1";
		} else if (artilleryNumber == 2) {
			imageName = "artillery-type2";
		} else if (artilleryNumber == 3) {
			imageName = "artillery-type3";
		} else if (artilleryNumber == 4) {
			imageName = "artillery-type4";
		}

		return imageName;
	}
}