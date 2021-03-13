import { context } from '../../src/main.js';

let tower;
let fuel;
let hangar;
let area;

let scene;

//Constantes de colores para mensajes
const COLOR_SUCCESS = 0x008025;
const COLOR_DANGER = 0xFF0000;
const COLOR_WARNING = 0xE2D510;
export class LobbyGameScene extends Phaser.Scene {

	constructor() {
		super('LOBBYGAME');
	}

	preload() {

		this.load.scenePlugin({
			key: 'rexuiplugin',
			url: 'src/rexuiplugin.min.js',
			sceneKey: 'rexUI'
		});


		this.add.image(0, 0, 'background_menu').setOrigin(0);
		this.load.image("plane-type1", "assets/plane-type1.png");
		this.load.image("plane-type2", "assets/plane-type2.png");
		this.load.image("plane-type3", "assets/plane-type3.png");
		this.load.image("plane-type4", "assets/plane-type4.png");

		this.load.image("artillery-type1", "assets/artillery-type1.png");
		this.load.image("artillery-type2", "assets/artillery-type2.png");
		this.load.image("artillery-type3", "assets/artillery-type3.png");

		this.load.image("joingame_button", "assets/join-game-button.png");

		this.load.image("fuel", "./assets/fuel.png");
		this.load.image("hangar", "./assets/hangar.png");
		this.load.image("tower", "./assets/tower.png");

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

		scene = this;
		tower = this.add.sprite(1100, 325, 'tower');
		tower.setInteractive();
		tower.setScale(0.3);
		this.input.setDraggable(tower);

		hangar = this.add.sprite(1100, 500, 'hangar');
		hangar.setInteractive();
		hangar.setScale(0.2);
		this.input.setDraggable(hangar);

		fuel = this.add.sprite(1100, 150, 'fuel');
		fuel.setInteractive();
		fuel.setScale(0.2);
		this.input.setDraggable(fuel);

		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

			gameObject.x = dragX;
			gameObject.y = dragY;

		});

		area = this.add.rectangle(1100, 300, 150, 600);

		area.setStrokeStyle(2, 0x1a65ac);

		this.input.on('dragend', function (pointer, gameObject) {

			gameObject.x = Math.round(gameObject.x);
			gameObject.y = Math.round(gameObject.y);

			let initialStructureX = parseFloat(gameObject.x - gameObject.displayWidth / 2);
			let initialMapX = parseFloat(area.x - area.displayWidth / 2);

			let initialStructureY = parseFloat(gameObject.y - gameObject.displayHeight / 2);
			let initialMapY = parseFloat(area.y - area.displayHeight / 2);

			let endStructureX = parseFloat(gameObject.x + gameObject.displayWidth / 2);
			let endMapX = parseFloat(area.x + area.displayWidth / 2)

			let endStructureY = parseFloat(gameObject.y + gameObject.displayHeight / 2);
			let endMapY = parseFloat(area.y + area.displayHeight / 2)


			if (initialStructureX < initialMapX || endStructureX > endMapX
				|| initialStructureY < initialMapY || endStructureY > endMapY) {
				let structure;
				let y;
				if (gameObject.texture.key == "tower") {
					structure = "la torre";
					y = 325;
				}
				else if (gameObject.texture.key == "hangar") {
					structure = "el hangar";
					y = 500;
				}
				else {
					structure = "el tanque";
					y = 150;
				}


				scene.createMessage("Coloque " + structure + " dentro del mapa", COLOR_DANGER);
				gameObject.x = 1100;
				gameObject.y = y;
				// }else if (scene.checkOverlap(fuel, tower) || scene.checkOverlap(tower, fuel)
				// 	|| scene.checkOverlap(fuel, hangar) || scene.checkOverlap(hangar, fuel)
				// 	|| scene.checkOverlap(hangar, tower || scene.checkOverlap(tower, hangar))) {
				// 	scene.createMessage("La estructuras no pueden estar superpuestas", COLOR_DANGER);
				// 	// gameObject.x = 1100;
				// 	// gameObject.y = y;
			}

		})

		console.log(context.playerSession);

		const style = { font: "bold 25px Arial", fill: "#fff" };
		this.add.text(1, 1, `Game Token: ${context.playerSession.gameId}`, style);
		this.add.text(1, 35, `Player Name: ${context.playerSession.name}`, style);

		/** PLANES */
		this.add.text(300, 90, `Select planes type`, style);
		/***   se incorpora boton para tipo avion 1   ***/
		let plane1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane1Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane1(this.plane1Type));

		/***   se incorpora boton para tipo avion 2   ***/
		let plane2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane2Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane2(this.plane2Type));

		/***   se incorpora boton para tipo avion 3   ***/
		let plane3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane3Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane3(this.plane3Type));


		/***   se incorpora boton para tipo avion 4  ***/
		let plane4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, this.getPlaneTypeImage(this.plane4Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane4(this.plane4Type));

		/** ARTILLERIES */
		this.add.text(300, 250, `Select artilleries type`, style);

		/***   se incorpora boton para tipo artilleria 1   ***/
		let artillery1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery1Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updateArtillery1(this.artillery1Type));

		/***   se incorpora boton para tipo artilleria 2   ***/
		let artillery2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery2Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updateArtillery2(this.artillery2Type));

		/***   se incorpora boton para tipo artilleria 3   ***/
		let artillery3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery3Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updateArtillery3(this.artillery3Type));


		/***   se incorpora boton para tipo artilleria 4  ***/
		let artillery4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery4Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updateArtillery4(this.artillery4Type));



		let joinGameButton = this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.90, "joingame_button").setDepth(0);
		joinGameButton.setInteractive();

		joinGameButton.on('pointerdown', function () {

			if (context.playersConnected == 2) {

				// se cargan tipos de avion
				let planesType = [this.plane1Type, this.plane2Type, this.plane3Type, this.plane4Type];
				// se cargan tipos de artilleria
				let artilleriesType = [this.artillery1Type, this.artillery2Type, this.artillery3Type, this.artillery4Type];
				let structurePositions = [fuel.x, fuel.y, tower.x, tower.y, hangar.x, hangar.y];
				let message = context.messagesFormat.connectToGame(context.playerSession.name, context.playerSession.teamSide, planesType, artilleriesType, context.playerSession.gameId, structurePositions);
				context.functions.sendMessage(message);
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
		if (type == 1) {
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
		if (type == 1) {
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
		if (type == 1) {
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
		if (type == 1) {
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
		if (type == 1) {
			this.artillery1Type = 2;
		} else if (type == 2) {
			this.artillery1Type = 3;
		} else if (type == 3) {
			this.artillery1Type = 1;
		}
	}

	updateArtillery2(type) {
		if (type == 1) {
			this.artillery2Type = 2;
		} else if (type == 2) {
			this.artillery2Type = 3;
		} else if (type == 3) {
			this.artillery2Type = 1;
		}
	}

	updateArtillery3(type) {
		if (type == 1) {
			this.artillery3Type = 2;
		} else if (type == 2) {
			this.artillery3Type = 3;
		} else if (type == 3) {
			this.artillery3Type = 1;
		}
	}

	updateArtillery4(type) {
		if (type == 1) {
			this.artillery4Type = 2;
		} else if (type == 2) {
			this.artillery4Type = 3;
		} else if (type == 3) {
			this.artillery4Type = 1;
		}
	}

	getPlaneTypeImage(planeNumber) {

		let imageName = "plane-type1";
		if (planeNumber == 1) {
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

		let imageName = "artillery-type1";
		if (artilleryNumber == 1) {
			imageName = "artillery-type1";
		} else if (artilleryNumber == 2) {
			imageName = "artillery-type2";
		} else if (artilleryNumber == 3) {
			imageName = "artillery-type3";
		}

		return imageName;
	}

	checkOverlap(structure1, structure2) {
		let initStructure1X = structure1.x;
		let initStructure1Y = structure1.y;
		let endStructure1X = structure1.x + structure1.displayWidth;
		let endStructure1Y = structure1.y + structure1.displayHeight;

		let initStructure2X = structure2.x;
		let initStructure2Y = structure2.y;
		let endStructure2X = structure2.x + structure2.displayWidth;
		let endStructure2Y = structure2.y + structure2.displayHeight;

		return (initStructure1X < initStructure2X && endStructure1X > initStructure2X) ||
			(initStructure2X < initStructure2X && endstructure1x > endStructure2X) ||
			(initStructure1X > initStructure2X && endStructure1X > endStructure2X) ||
			(initStructure1Y < initStructure2Y && endStructure1Y > initStructure2Y) ||
			(initStructure2Y < initStructure2Y && endstructure1Y > endStructure2Y) ||
			(initStructure1Y > initStructure2Y && endStructure1Y > endStructure2Y)

	}

	createMessage(message, indicator) {
		var toast = this.rexUI.add.toast({
			x: 600,
			y: 250,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, indicator),
			text: this.add.text(0, 0, '', {
				fontSize: '24px'
			}),
			space: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20,
			},
			duration: {
				in: 200,
				hold: 2000,
				out: 200,
			},
		});
		toast.show(message);
	}
}