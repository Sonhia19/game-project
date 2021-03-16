import { context } from '../../src/main.js';
import { COLOR_DANGER, COLOR_SUCCESS, COLOR_WARNING } from '../constants/GameConstants.js'

let tower;
let fuel;
let hangar;
let area;
let scene;
let plane1TypeButton;
let plane2TypeButton;
let plane3TypeButton;
let plane4TypeButton;
let plane1Text;

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
		this.load.atlas('spritesPlanes', 'assets/planes/spritesheet.png', 'assets/planes/sprites.json');
		this.load.atlas('spritesArtilleries', 'assets/artilleries/spritesheet.png', 'assets/artilleries/sprites.json');
		this.load.image('black', 'assets/black.png');


		this.load.image("joingame_button", "assets/join-game-button.png");

		this.load.image("fuel", "./assets/fuel.png");
		this.load.image("hangar_red", "./assets/structures/hangar_red.png");
		this.load.image("hangar_blue", "./assets/structures/hangar_blue.png");
		this.load.image("tower", "./assets/structures/tower.png");

	}

	plane1Type;
	plane2Type;
	plane3Type;
	plane4Type;

	artillery1Type;
	artillery2Type;
	artillery3Type;
	artillery4Type;

	create() {

		this.plane1Type = 1;
		this.plane2Type = 1;
		this.plane3Type = 1;
		this.plane4Type = 1;

		this.artillery1Type = 1;
		this.artillery2Type = 1;
		this.artillery3Type = 1;
		this.artillery4Type = 1;

		scene = this;
		tower = this.add.sprite(1100, 325, 'tower');
		tower.setInteractive();
		tower.setScale(0.2);
		this.input.setDraggable(tower);

		hangar = this.add.sprite(1100, 500, context.playerSession.teamSide == 1 ? 'hangar_blue' : 'hangar_red');
		hangar.setInteractive();
		hangar.setScale(0.2);
		this.input.setDraggable(hangar);

		fuel = this.add.sprite(1100, 150, 'fuel');
		fuel.setInteractive();
		fuel.setScale(0.2);
		this.input.setDraggable(fuel);

		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			gameObject.y = dragY;

		});

		area = this.add.rectangle(1100, 300, 150, 600);

		area.setStrokeStyle(2, 0x1a65ac);

		this.input.on('dragend', function (pointer, gameObject) {

			gameObject.x = Math.round(gameObject.x);
			gameObject.y = Math.round(gameObject.y);

			let object = gameObject.texture.key;
			let initialStructureY = parseFloat(gameObject.y - gameObject.displayHeight / 2);
			let initialMapY = parseFloat(area.y - area.displayHeight / 2);

			let endStructureY = parseFloat(gameObject.y + gameObject.displayHeight / 2);
			let endMapY = parseFloat(area.y + area.displayHeight / 2)
			let overlap = false;
			let y;
			if (initialStructureY < initialMapY || endStructureY > endMapY) {
				let structure;

				if (object == "tower") {
					structure = "la torre";
					y = 325;
				}
				else if (object == "fuel") {
					structure = "el tanque";
					y = 150;
				}
				else {
					structure = "el hangar";
					y = 500;
				}

				scene.createMessage("Coloque " + structure + " dentro del mapa", COLOR_DANGER);
				gameObject.y = y;
			}
			else if (object == "tower") {
				if ((scene.checkOverlap(tower, fuel) || scene.checkOverlap(tower, hangar))) {
					overlap = true;
					y = 325
				}

			}
			else if (object == "fuel") {
				if ((scene.checkOverlap(fuel, tower) || scene.checkOverlap(fuel, hangar))) {
					{
						overlap = true;
						y = 150;
					}
				}
			}
			else if (scene.checkOverlap(hangar, tower) || scene.checkOverlap(hangar, fuel)) {
				overlap = true;
				y = 500;
			}
			if (overlap) {
				scene.createMessage("La estructuras no pueden estar superpuestas", COLOR_DANGER);
				gameObject.y = y;
			}




		})

		const style = { font: "bold 25px Arial", fill: "#fff" };
		const styleText = { font: "bold 12px Arial", fill: "#fff" };
		this.add.text(1, 1, `Token del juego: ${context.playerSession.gameId}`, style);
		this.add.text(1, 35, `Nombre jugador: ${context.playerSession.name}`, style);

		/** PLANES */
		this.add.text(300, 80, `Seleccione tipo de aviones`, style);
		/***   se incorpora boton para tipo avion 1   ***/
		this.add.circle(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, 55, 55);
		plane1TypeButton = this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.30, 'spritesPlanes', this.getPlaneTypeImage(this.plane1Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane1(this.plane1Type));
		plane1TypeButton.setScale(0.25);
		this.add.circle(context.game.renderer.width * 0.35, context.game.renderer.height * 0.40, 55, 55);
		plane1Text = this.add.text(context.game.renderer.width * 0.35, context.game.renderer.height * 0.35, this.getPlaneTypeName(this.plane1Type), styleText).setOrigin(0, 1);

		/***   se incorpora boton para tipo avion 2   ***/
		this.add.circle(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, 55, 55);
		plane2TypeButton = this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.30, 'spritesPlanes', this.getPlaneTypeImage(this.plane2Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane2(this.plane2Type));
		plane2TypeButton.setScale(0.25);

		/***   se incorpora boton para tipo avion 3   ***/
		this.add.circle(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, 55, 55);
		plane3TypeButton = this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.30, 'spritesPlanes', this.getPlaneTypeImage(this.plane3Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane3(this.plane3Type));
		plane3TypeButton.setScale(0.25);


		/***   se incorpora boton para tipo avion 4  ***/
		this.add.circle(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, 55, 55);
		plane4TypeButton = this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.30, 'spritesPlanes', this.getPlaneTypeImage(this.plane4Type)).setDepth(0)
			.setInteractive()
			.on('pointerdown', () => this.updatePlane4(this.plane4Type));
		plane4TypeButton.setScale(0.25);

		/** ARTILLERIES */
		this.add.text(300, 250, `Seleccione tipo de artillería`, style);

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
		plane1TypeButton.setTexture('spritesPlanes', this.getPlaneTypeImage(this.plane1Type));
		plane1TypeButton.setScale(0.25);
		plane1Text.setText(this.getPlaneTypeName(this.plane1Type));
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
		plane2TypeButton.setTexture('spritesPlanes', this.getPlaneTypeImage(this.plane2Type));
		plane2TypeButton.setScale(0.25);
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
		plane3TypeButton.setTexture('spritesPlanes', this.getPlaneTypeImage(this.plane3Type));
		plane3TypeButton.setScale(0.25);
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
		plane4TypeButton.setTexture('spritesPlanes', this.getPlaneTypeImage(this.plane4Type));
		plane4TypeButton.setScale(0.25);
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
		this.add.image(context.game.renderer.width * 0.35, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery1Type)).setDepth(0);
	}

	updateArtillery2(type) {
		if (type == 1) {
			this.artillery2Type = 2;
		} else if (type == 2) {
			this.artillery2Type = 3;
		} else if (type == 3) {
			this.artillery2Type = 1;
		}
		this.add.image(context.game.renderer.width * 0.45, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery2Type)).setDepth(0);
	}

	updateArtillery3(type) {
		if (type == 1) {
			this.artillery3Type = 2;
		} else if (type == 2) {
			this.artillery3Type = 3;
		} else if (type == 3) {
			this.artillery3Type = 1;
		}
		this.add.image(context.game.renderer.width * 0.55, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery3Type)).setDepth(0);
	}

	updateArtillery4(type) {
		if (type == 1) {
			this.artillery4Type = 2;
		} else if (type == 2) {
			this.artillery4Type = 3;
		} else if (type == 3) {
			this.artillery4Type = 1;
		}
		this.add.image(context.game.renderer.width * 0.65, context.game.renderer.height * 0.60, this.getArtilleryTypeImage(this.artillery4Type)).setDepth(0);
	}

	getPlaneTypeImage(planeNumber) {
		let imageName;
		switch (parseInt(planeNumber)) {
			case 1:
				imageName = "bombardero";
				break;
			case 2:
				imageName = "caza";
				break;
			case 3:
				imageName = "patrulla";
				break;
			case 4:
				imageName = "reconocimiento";
				break;
		}
		if (context.playerSession.teamSide == 1) {
			imageName = imageName + "_azul_default";
		}
		else {
			imageName = imageName + "_rojo_default";
		}
		return imageName;
	}

	getPlaneTypeName(planeNumber) {
		let name;
		switch (parseInt(planeNumber)) {
			case 1:
				name = "Bombardero";
				break;
			case 2:
				name = "Caza";
				break;
			case 3:
				name = "Patrulla";
				break;
			case 4:
				name = "Reconocimiento";
				break;
		}
		return name;
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

		console.log(structure1);
		console.log(structure2);

		let initStructure1Y = structure1.y;
		let endStructure1Y = structure1.y - structure1.displayHeight;

		let initStructure2Y = structure2.y;
		let endStructure2Y = structure2.y - structure2.displayHeight;


		let bool1 = initStructure1Y >= initStructure2Y && endStructure1Y <= initStructure2Y;
		let bool2 = initStructure1Y <= initStructure2Y && endStructure2Y <= initStructure1Y

		return false;

	}

	createMessage(message, indicator) {
		var toast = this.rexUI.add.toast({
			x: 600,
			y: 500,

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