import { Plane } from '../objects/plane.js';
import { Artillery } from '../objects/artillery.js';
import { Bullet } from '../objects/bullet.js';
import { BulletArtillery } from '../objects/bulletArtillery.js';
import { Tower } from '../objects/tower.js';
import { Fuel } from '../objects/fuel.js';
import { Border } from '../objects/border.js';
import { Hangar } from '../objects/hangar.js';
import { Bomb } from '../objects/bomb.js';
import { Black } from '../objects/shadow.js';
import { Gray } from '../objects/shadow.js';
import { context } from '../../src/main.js';
import { BLUE_BASE_X_VIEW, MINUS_X, MINUS_Y, MORE_X, MORE_Y, RED_BASE_X_VIEW, RED_SAFE_ZONE_X, RED_BASE_X, BLUE_PLANE_HIGH_VIEW_Y, BLUE_PLANE_LOW_VIEW_Y, RED_PLANE_HIGH_VIEW_Y, RED_PLANE_LOW_VIEW_Y, BLUE_PLANE_LAND_VIEW_Y, RED_PLANE_LAND_VIEW_Y, LANDED, UNSELECT, FLYING, ELIMINATED } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { BLUE_SAFE_ZONE_X, BLUE_PLANE_X, BLUE_BASE_X, BLUE_ARTILLERY_X_VIEW } from '../constants/GameConstants.js';
import { COLOR_DANGER, COLOR_SUCCESS, COLOR_WARNING } from '../constants/GameConstants.js'
import { BOMBARDERO, CAZA, PATRULLA, RECONOCIMIENTO } from '../constants/GameConstants.js';



//#region Variables
let scene;
//Bandera para saber el bando del jugador
let isBlue;
let clearMap;
//Bandera para saber si se dibujaron los elementos del enemigo
let enemyDraw = false;

//Variables para determinar fin de juego
let myStructuresCount, myPlanesCount;
let enemyStructuresCount, enemyPlanesCount;
let gameOver = false;

//Teclas a capturar
let keyA, keyOne, keyTwo, keyThree, keyFour, keyD, keyS;
let cursors;

//Tablero
let fuelText;
let bombText;
let infoGameText;
let myPlaneSelectedText;
let highFlyPlaneText;
let plane1ArmorText;
let plane2ArmorText;
let plane3ArmorText;
let plane4ArmorText;
let towerText;
let hangarText;
let fuelsText;
let consolePlane1;
let consolePlane2;
let consolePlane3;
let consolePlane4;
let artilleryCount = 0;
let artilleryEnemyCount = 0;
let artilleryText;
let artilleryEnemyText;
let towerEnemyText;
let hangarEnemyText;
let fuelsEnemyText;
let ledRedBomb;
let myBaseText;
let enemyBaseText;
let ledGreenBomb;
let ledRedHangar;
let ledGreenHangar;
let ledGreenFuel;
let ledRedFuel;
let ledGreenTower;
let ledRedTower;
let ledGreenBombEnemy;
let ledRedHangarEnemy;
let ledGreenHangarEnemy;
let ledGreenFuelEnemy;
let ledRedFuelEnemy;
let ledGreenTowerEnemy;
let ledRedTowerEnemy;

//Colecciones de elementos del propio bando
let myBullets;
let myBulletsArtillery
let myPlanes;
let myFuels;
let myTowers;
let myHangars;
let myBombs;
let myArtilleries;
let borders;
let blacks;
let grays;

//Colecciones de elementos del bando enemigo
let enemyPlanes;
let enemyFuels;
let enemyHangars;
let enemyTowers;
let enemyArtilleries;
let enemyBullets;
let enemyBombs;
let enemyBulletsArtillery;

//Elementos del propio bando
let myFuel, myFuelView;
let myTower, myTowerView;
let myHangar, myHangarView;
let myPlaneSelected, myPlaneOne, myPlaneOneView, myPlaneTwo, myPlaneTwoView, myPlaneThree, myPlaneThreeView, myPlaneFour, myPlaneFourView;
let myArtilleryOne, myArtilleryOneView, myArtilleryTwo, myArtilleryTwoView, myArtilleryThree, myArtilleryThreeView, myArtilleryFour, myArtilleryFourView;

//Elementos del bando enemigo
let enemyFuel = null, enemyFuelView;
let enemyTower = null, enemyTowerView;
let enemyHangar = null, enemyHangarView;
let enemyPlaneSelected = null, enemyPlaneOne = null, enemyPlaneOneView, enemyPlaneTwo = null, enemyPlaneTwoView, enemyPlaneThree = null, enemyPlaneThreeView, enemyPlaneFour = null, enemyPlaneFourView;
let enemyArtilleryOne, enemyArtilleryOneView, enemyArtilleryTwo, enemyArtilleryTwoView, enemyArtilleryThree, enemyArtilleryThreeView, enemyArtilleryFour, enemyArtilleryFourView;

var createLabel = function (scene, text) {
	return scene.rexUI.add.label({
		// width: 40,
		// height: 40,

		background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

		text: scene.add.text(0, 0, text, {
			fontSize: '24px'
		}),

		space: {
			left: 10,
			right: 10,
			top: 10,
			bottom: 10
		}
	});
}
//#endregion
export class GameScene extends Phaser.Scene {

	//#region Eventos Phaser
	constructor() {
		super('GAME');
	}

	init() {

	}

	preload() {
		this.load.scenePlugin({
			key: 'rexuiplugin',
			url: 'src/rexuiplugin.min.js',
			sceneKey: 'rexUI'
		});

		//Carga de imagenes
		this.load.image('field', 'assets/structures/new_field.jpg');
		this.load.image('black', 'assets/black.png');
		this.load.atlas('spritesPlanes', 'assets/planes/spritesheet.png', 'assets/planes/sprites.json');
		this.load.image('plane_default', './assets/planes/plane_default.png');
		this.load.atlas('spritesPlanesEliminated', 'assets/planes/spritesheet_eliminated.png', 'assets/planes/sprites_eliminated.json');
		this.load.atlas('spritesArtilleries', 'assets/artilleries/spritesheet.png', 'assets/artilleries/sprites.json');
		this.load.image('bullet', './assets/Bullet3.png');
		this.load.image("fuel", "./assets/structures/fuel.png");
		this.load.image("hangar_blue", "./assets/structures/hangar_blue.png");
		this.load.image("hangar_red", "./assets/structures/hangar_red.png");
		this.load.image("tower", "./assets/structures/tower.png");
		this.load.image("bulletArtillery", "./assets/bullet.png");
		this.load.image("bomb", "./assets/bomb.png");
		this.load.image("border", "./assets/new_border.png");
		this.load.image("external_border", "./assets/border.png");
		this.load.image("ledRed", "./assets/led.png");
		this.load.image("ledGreen", "./assets/led_green.png");
		this.load.image("dashboard", "./assets/dashboard.png");

		this.load.spritesheet('explosion', 'assets/planes/explosion.png', { frameWidth: 200, frameHeight: 200 });

		//Vista lateral
		this.load.image('fieldView', 'assets/view/field_view.png');
		this.load.image('towerBlueView', 'assets/view/tower_blue_view.png');
		this.load.image('towerRedView', 'assets/view/tower_red_view.png');

		this.load.image('fuelBlueView', 'assets/view/fuel_blue_view.png');
		this.load.image('fuelRedView', 'assets/view/fuel_red_view.png');

		this.load.image('hangarBlueView', 'assets/view/hangar_blue_view.png');
		this.load.image('hangarRedView', 'assets/view/hangar_red_view.png');

		this.load.image('artilleryBlueView', 'assets/view/artillery_blue_view.png');
		this.load.image('artilleryRedView', 'assets/view/artillery_red_view.png');

		this.load.image('PlaneRightBlueView', 'assets/view/plane_blue_right_view.png');
		this.load.image('PlaneLeftBlueView', 'assets/view/plane_blue_left_view.png');

		this.load.image('PlaneRightRedView', 'assets/view/plane_red_right_view.png');
		this.load.image('PlaneLeftRedView', 'assets/view/plane_red_left_view.png');

		this.load.image("savegame_button", "assets/save.png");

		//Sonidos
		this.load.audio("game", "assets/sounds/game.mp3");
		this.load.audio("fire", "assets/sounds/fire.mp3");
		this.load.audio("canon", "assets/sounds/canon.mp3");
		this.load.audio("plane", "assets/sounds/plane.mp3");
		this.load.audio("structure", "assets/sounds/structure.mp3");
	}

	create() {
		this.clean();

		gameOver = false;
		this.game.sound.stopAll();
		this.sound.play("game", {
			loop: true,
			volume: 0.8
		});
		scene = this;
		enemyPlanesCount = 0; enemyStructuresCount = 0;
		myPlanesCount = 0; myStructuresCount = 0;
		this.add.image(1180, 140, 'fieldView').setScale(0.4);
		this.add.image(1178, 460, 'dashboard').setScale(0.27);
		let imageField = this.add.image(500, 300, 'field');
		imageField.displayHeight = 600;
		imageField.displayWidth = 1000;

		isBlue = context.playerSession.teamSide == 1
		clearMap = context.clearMap;

		this.captureKeys();

		let saveGameButton = this.add.image(context.game.renderer.width * 0.98, context.game.renderer.height * 0.96, "savegame_button").setDepth(0);
		saveGameButton.setInteractive();
		saveGameButton.displayHeight = saveGameButton.displayHeight * 35 / saveGameButton.displayWidth;
		saveGameButton.displayWidth = 35;

		saveGameButton.on('pointerdown', function () {

			this.updateContext();
			let message = context.messagesFormat.requestSaveGame(context.playerSession);
			context.functions.sendMessage(message);
			var color = COLOR_SUCCESS;
			var messageToast = "Esperando respuesta";
			scene.createMessage(messageToast, color);
		}, this);

		//Creación de elementos propios
		myBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		myBombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
		myPlanes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
		myFuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
		myHangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
		myTowers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
		myArtilleries = this.physics.add.group({ classType: Artillery, runChildUpdate: true });
		myBulletsArtillery = this.physics.add.group({ classType: BulletArtillery, runChildUpdate: true });
		borders = this.physics.add.group({ classType: Border, runChildUpdate: true });
		blacks = this.physics.add.group({ classType: Black, runChildUpdate: true });
		grays = this.physics.add.group({ classType: Gray, runChildUpdate: true });

		//Creación de elementos enemigos
		enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		enemyBombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
		enemyPlanes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
		enemyFuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
		enemyHangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
		enemyTowers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
		enemyArtilleries = this.physics.add.group({ classType: Artillery, runChildUpdate: true });
		enemyBulletsArtillery = this.physics.add.group({ classType: BulletArtillery, runChildUpdate: true });

		//Fronteras internas
		let border = borders.get();
		border.place(235, 800, true, isBlue);
		border = borders.get();
		border.place(235, 200, true, !isBlue);

		cursors = this.input.keyboard.createCursorKeys();

		//this.placeGrays();
		if (!clearMap) {
			this.placeBlacks();
		}

		let graphics = this.add.graphics();
		let path;

		graphics = this.add.graphics();
		path = this.add.path(1000, 300);
		path.lineTo(1400, 300);
		graphics.lineStyle(3, 0xffffff, 1);
		path.draw(graphics);


		//Frontera externa
		border = borders.get();
		border.place(235, 1005, false);

		if (this.existsPlayerSession()) { this.placeMyElements(); }

		//Colisión propia

		this.physics.add.overlap(myBullets, borders, this.borderBullet);
		this.physics.add.overlap(myBombs, borders, this.borderBullet);

		this.createText();
		this.checkStructures();
		this.checkArtillery();
		this.checkPlanesArmor();

	}
	update(time, delta) {

		if (gameOver) {
			if (myStructuresCount == 0 || myPlanesCount == 0) {
				context.teamSideWin = isBlue ? 2 : 1;
			} else if (enemyStructuresCount == 0 || enemyPlanesCount == 0) {
				context.teamSideWin = isBlue ? 1 : 2;
			}
			context.gameStatus = "FINISHED";
			context.functions.navigateScene("GAME", "FINISHGAME");
		} else {

			if (context.requestSaveGame) {
				context.requestSaveGame = false;
				this.createSaveConfirm();
			}
			if (!context.responseSaveGame) {
				context.responseSaveGame = true;
				var color = COLOR_WARNING;
				var message = "No se ha guardado la partida";
				scene.createMessage(message, color);
			}

			if (this.existsEnemySession()) {
				this.checkEnemyAction(time);
			}

			//Selección de avión
			if (Phaser.Input.Keyboard.JustDown(keyOne)) {
				if (myPlaneOne != null) {
					if (myPlaneOne.scene) {
						this.selectPlane(myPlaneOne);
					}
				}

			}
			else if (Phaser.Input.Keyboard.JustDown(keyTwo)) {
				if (myPlaneTwo != null) {
					if (myPlaneTwo.scene) {
						this.selectPlane(myPlaneTwo);
					}
				}

			}
			else if (Phaser.Input.Keyboard.JustDown(keyThree)) {
				if (myPlaneThree != null) {
					if (myPlaneThree.scene) {
						this.selectPlane(myPlaneThree);
					}
				}

			}
			else if (Phaser.Input.Keyboard.JustDown(keyFour)) {
				if (myPlaneFour != null) {
					if (myPlaneFour.scene) {
						this.selectPlane(myPlaneFour);
					}
				}

			}

			if (myPlaneSelected != null) {
				if (myPlaneSelected.scene) {
					//Aterrizar / Despegar
					if (Phaser.Input.Keyboard.JustDown(keyD)) {
						if (myPlaneSelected.flying) {
							myPlaneSelected.land(isBlue ? BLUE_SAFE_ZONE_X : RED_SAFE_ZONE_X);
							if (!myPlaneSelected.flying) {
								let planeView = this.checkPlaneView(false, myPlaneSelected.planeIndex);
								if (planeView != null) {
									this.changeHighFlyPlaneView(planeView.y, isBlue ? BLUE_PLANE_LAND_VIEW_Y : RED_PLANE_LAND_VIEW_Y, planeView);
									this.syncTakeOff(false);
								}
							}
							if (isBlue) {
								if (myPlaneSelected.x < BLUE_SAFE_ZONE_X) {
									this.fuelControl();
									this.checkBomb();
									highFlyPlaneText.setText('');
									infoGameText.setText("Presione (D) para despegar avión");
								} else {
									infoGameText.setText("Vuelva a la base para aterrizar");
								}
							} else {
								if (myPlaneSelected.x > RED_SAFE_ZONE_X) {
									this.fuelControl();
									this.checkBomb();
									highFlyPlaneText.setText('');
									infoGameText.setText("Presione (D) para despegar avión");
								} else {
									infoGameText.setText("Vuelva a la base para aterrizar");
								}
							}
						} else {
							let planeView = this.checkPlaneView(false, myPlaneSelected.planeIndex);
							if (planeView != null) {
								this.changeHighFlyPlaneView(planeView.y, isBlue ? BLUE_PLANE_LOW_VIEW_Y : RED_PLANE_LOW_VIEW_Y, planeView);
							}
							myPlaneSelected.takeOff();
							this.syncTakeOff(true);
							infoGameText.setText('');
							highFlyPlaneText.setText('Vuelo Bajo');
						}
					}

					// Vuelto alto / vuelo bajo
					if (Phaser.Input.Keyboard.JustDown(keyS)) {
						if (myPlaneSelected.flying) {
							if ((isBlue && myPlaneSelected.x < RED_SAFE_ZONE_X) || (!isBlue && myPlaneSelected.x > BLUE_SAFE_ZONE_X)) {
								myPlaneSelected.highFlyPlane(true);
								let planeView = this.checkPlaneView(false, myPlaneSelected.planeIndex);
								if (planeView != null) {
									this.changeHighFlyPlaneView(planeView.y, myPlaneSelected.highFly ? isBlue ? BLUE_PLANE_HIGH_VIEW_Y : RED_PLANE_HIGH_VIEW_Y : isBlue ? BLUE_PLANE_LOW_VIEW_Y : RED_PLANE_LOW_VIEW_Y, planeView);
								}
								if (myPlaneSelected.highFly) {
									highFlyPlaneText.setText('Vuelo Alto');
								} else {
									highFlyPlaneText.setText('Vuelo Bajo');
								}
							}
							else {
								highFlyPlaneText.setText('No puede volar alto en base enemiga');
							}
						}

					}

					//Si el avion se encuentra dentro de su zona, limpia todo el mapa
					if (isBlue) {
						if (myPlaneSelected.x < BLUE_SAFE_ZONE_X) {
							myPlaneSelected.gray = null;
						}
					}
					else {
						if (myPlaneSelected.x > RED_SAFE_ZONE_X) {
							myPlaneSelected.gray = null;
						}
					}
					//Movimiento de avión
					if (cursors.left.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(true, ANGLE_270, MINUS_X, delta)) {
								this.syncMove();
								this.changeFlyXPlaneView(false, false, myPlaneSelected, delta);
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}

						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					} else if (cursors.right.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(true, ANGLE_90, MORE_X, delta)) {
								this.changeFlyXPlaneView(false, true, myPlaneSelected, delta);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}
					}
					if (cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, delta)) {
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					} else if (cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(true, ANGLE_180, MORE_Y, delta)) {
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.left.isDown && cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(false, ANGLE_315, null, null)) {
								this.changeFlyXPlaneView(false, false, null, null);
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.left.isDown && cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(false, ANGLE_225, null, null)) {
								this.changeFlyXPlaneView(false, false, null, null);
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.right.isDown && cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(false, ANGLE_135, null, null)) {
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.changeFlyXPlaneView(false, true, null, null);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}
					}
					if (cursors.right.isDown && cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							if (myPlaneSelected.fly(false, ANGLE_45, null, null)) {
								this.changeFlyXPlaneView(false, true, null, null);
								this.changeFlyYPlaneView(myPlaneSelected, false);
								this.syncMove();
							}
							else {
								myPlanesCount -= 1;
								gameOver = myPlanesCount == 0;
								this.destroyPlaneView(false, myPlaneSelected.planeIndex);
							}
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}
					}



					//Disparo de avión
					if (cursors.space.isDown && time > myPlaneSelected.cadency && myPlaneSelected.scene) {
						if (myPlaneSelected.flying) {
							switch (myPlaneSelected.planeAngle) {
								case ANGLE_0:
								case ANGLE_90:
								case ANGLE_180:
								case ANGLE_270:
									myPlaneSelected.fire(time, myBullets, scene);
									this.syncShoot();
									break;
							}
						}
						else {
							infoGameText.setText("Avión en tierra. No puede disparar");
						}
					}

					//Disparo de bomba
					if (Phaser.Input.Keyboard.JustDown(keyA)) {
						if (myPlaneSelected.flying) {
							if (myPlaneSelected.withBomb) {
								if (myPlaneSelected.highFly) {
									infoGameText.setText("El vuelo alto no permite disparar la bomba");
								}
								else {
									infoGameText.setText("");
									myPlaneSelected.fireBomb(myBombs);
									this.syncBomb();
									this.checkBomb();
								}

							}
							else {
								infoGameText.setText("Retorne a la base para recargar bomba");
							}

						}
						else {
							infoGameText.setText("Avión en tierra. No puede disparar bomba");
						}
					}
				}
			}
		}
	}
	//#endregion

	//#region Tablero
	imageDestroyedPlane(type) {
		let plane;
		let color = isBlue ? "azul" : "rojo";
		switch (type) {
			case BOMBARDERO:
				plane = "bombardero";
				break;
			case CAZA:
				plane = "caza";
				break;
			case PATRULLA:
				plane = "patrulla";
				break;
			case RECONOCIMIENTO:
				plane = "reconocimiento";
				break;
		}
		return plane + "_" + color + "_eliminado";
	}


	createText() {
		//Led indicadores Bomba
		ledRedBomb = this.add.image(1075, 338, 'ledRed');
		ledRedBomb.setScale(0.05);
		ledRedBomb.setVisible(false);
		ledGreenBomb = this.add.image(1075, 338, 'ledGreen');
		ledGreenBomb.setScale(0.025);
		ledGreenBomb.setVisible(false);

		//Led indicador Hangar
		ledRedHangar = this.add.image(1075, 452, 'ledRed');
		ledRedHangar.setScale(0.05);
		ledRedHangar.setVisible(true);
		ledGreenHangar = this.add.image(1075, 452, 'ledGreen');
		ledGreenHangar.setScale(0.025);
		ledGreenHangar.setVisible(false);


		//Led indicador Tanque Combustible
		ledRedFuel = this.add.image(1075, 467, 'ledRed');
		ledRedFuel.setScale(0.05);
		ledRedFuel.setVisible(true);
		ledGreenFuel = this.add.image(1075, 467, 'ledGreen');
		ledGreenFuel.setScale(0.025);
		ledGreenFuel.setVisible(false);

		//Led indicador Torre
		ledRedTower = this.add.image(1075, 437, 'ledRed');
		ledRedTower.setScale(0.05);
		ledRedTower.setVisible(true);
		ledGreenTower = this.add.image(1075, 437, 'ledGreen');
		ledGreenTower.setScale(0.025);
		ledGreenTower.setVisible(false);

		//Led indicador Hangar Enemigo
		ledRedHangarEnemy = this.add.image(1255, 452, 'ledRed');
		ledRedHangarEnemy.setScale(0.05);
		ledRedHangarEnemy.setVisible(true);
		ledGreenHangarEnemy = this.add.image(1255, 452, 'ledGreen');
		ledGreenHangarEnemy.setScale(0.025);
		ledGreenHangarEnemy.setVisible(false);


		//Led indicador Tanque Combustible Enemigo
		ledRedFuelEnemy = this.add.image(1255, 467, 'ledRed');
		ledRedFuelEnemy.setScale(0.05);
		ledRedFuelEnemy.setVisible(true);
		ledGreenFuelEnemy = this.add.image(1255, 467, 'ledGreen');
		ledGreenFuelEnemy.setScale(0.025);
		ledGreenFuelEnemy.setVisible(false);

		//Led indicador Torre Enemigo
		ledRedTowerEnemy = this.add.image(1255, 437, 'ledRed');
		ledRedTowerEnemy.setScale(0.05);
		ledRedTowerEnemy.setVisible(true);
		ledGreenTowerEnemy = this.add.image(1255, 437, 'ledGreen');
		ledGreenTowerEnemy.setScale(0.025);
		ledGreenTowerEnemy.setVisible(false);


		//Aviones Consola
		if (myPlaneOne != null) {
			consolePlane1 = this.add.image(1050, 520, 'spritesPlanes', myPlaneOne.getImage(UNSELECT, false));
			plane1ArmorText = this.add.text(1035, 540, '', { fontSize: '15px', color: '#FFFFFF', backgroundColor: '#108C05' });
		}
		else {
			if (context.playerSession.planes != undefined) {
				consolePlane1 = this.add.image(1050, 520, 'spritesPlanesEliminated', this.imageDestroyedPlane(context.playerSession.planes[0].planeType));
			}

		}

		if (myPlaneTwo != null) {
			consolePlane2 = this.add.image(1130, 520, 'spritesPlanes', myPlaneTwo.getImage(UNSELECT, false));
			plane2ArmorText = this.add.text(1115, 540, '', { fontSize: '15px', color: '#FFFFFF', backgroundColor: '#108C05' });
		}
		else {
			if (context.playerSession.planes != undefined) {
				consolePlane2 = this.add.image(1130, 520, 'spritesPlanesEliminated', this.imageDestroyedPlane(context.playerSession.planes[1].planeType));
			}

		}


		if (myPlaneThree != null) {
			consolePlane3 = this.add.image(1210, 520, 'spritesPlanes', myPlaneThree.getImage(UNSELECT, false));
			plane3ArmorText = this.add.text(1195, 540, '', { fontSize: '15px', color: '#FFFFFF', backgroundColor: '#108C05' });
		}
		else {
			if (context.playerSession.planes != undefined) {
				consolePlane3 = this.add.image(1210, 520, 'spritesPlanesEliminated', this.imageDestroyedPlane(context.playerSession.planes[2].planeType));
			}

		}

		if (myPlaneFour != null) {
			consolePlane4 = this.add.image(1290, 520, 'spritesPlanes', myPlaneFour.getImage(UNSELECT, false));
			plane4ArmorText = this.add.text(1275, 540, '', { fontSize: '15px', color: '#FFFFFF', backgroundColor: '#108C05' });
		}
		else {
			if (context.playerSession.planes != undefined) {
				consolePlane4 = this.add.image(1290, 520, 'spritesPlanesEliminated', this.imageDestroyedPlane(context.playerSession.planes[3].planeType));
			}

		}


		myPlaneSelectedText = this.add.text(1010, 301, '', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		fuelText = this.add.text(1010, 316, '', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		bombText = this.add.text(1010, 331, '', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		highFlyPlaneText = this.add.text(1010, 346, '', { fontSize: '15px', color: '#000000', backgroundColor: '#F8FF00' });
		infoGameText = this.add.text(1010, 361, myPlaneSelected == null ? 'Presione (1) (2) (3) (4) para seleccionar avión' : '', { fontSize: '12px', color: '#fff', backgroundColor: '#F60303' });



		myBaseText = this.add.text(1010, 400, 'Base Aliada', { fontSize: '13px', color: '#FFFFFF', backgroundColor: '#108C05' });
		artilleryText = this.add.text(1010, 415, '', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		towerText = this.add.text(1010, 430, 'Torre', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		hangarText = this.add.text(1010, 445, 'Hangar', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		fuelsText = this.add.text(1010, 460, 'Tanque', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });

		enemyBaseText = this.add.text(1190, 400, 'Base Enemiga', { fontSize: '13px', color: '#FFFFFF', backgroundColor: '#F60303' });
		artilleryEnemyText = this.add.text(1190, 415, '', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		towerEnemyText = this.add.text(1190, 430, 'Torre', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		hangarEnemyText = this.add.text(1190, 445, 'Hangar', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		fuelsEnemyText = this.add.text(1190, 460, 'Tanque', { fontSize: '15px', color: '#fff', backgroundColor: '#000000' });
		this.resizeConsolePlanes();
		if (myPlaneSelected != null) {
			myPlaneSelectedText.setText('Avión #' + myPlaneSelected.planeIndex + " - " + myPlaneSelected.getType());
			fuelText.setText('Combustible: ' + myPlaneSelected.fuel);
			this.checkBomb();
		}

	}

	resizeConsolePlanes() {
		let height = 60;
		consolePlane1.displayWidth = height;
		consolePlane1.displayHeight = consolePlane1.displayWidth * (consolePlane1.height / consolePlane1.width);

		consolePlane2.displayWidth = height;
		consolePlane2.displayHeight = consolePlane2.displayWidth * (consolePlane2.height / consolePlane2.width);

		consolePlane3.displayWidth = height;
		consolePlane3.displayHeight = consolePlane3.displayWidth * (consolePlane3.height / consolePlane3.width);

		consolePlane4.displayWidth = height;
		consolePlane4.displayHeight = consolePlane4.displayWidth * (consolePlane4.height / consolePlane4.width);
	}

	checkBomb() {
		bombText.setText('Bomba ');
		ledRedBomb.setVisible(!myPlaneSelected.withBomb);
		ledGreenBomb.setVisible(myPlaneSelected.withBomb);
	}

	checkStructures() {

		//Tanque de combustible
		ledRedFuel.setVisible(myFuel == null);
		ledGreenFuel.setVisible(myFuel != null);
		ledRedFuelEnemy.setVisible(enemyFuel == null);
		ledGreenFuelEnemy.setVisible(enemyFuel != null);

		//Torre
		ledRedTower.setVisible(myTower == null);
		ledGreenTower.setVisible(myTower != null);
		ledRedTowerEnemy.setVisible(enemyTower == null);
		ledGreenTowerEnemy.setVisible(enemyTower != null);

		//Hangar
		ledRedHangar.setVisible(myHangar == null);
		ledGreenHangar.setVisible(myHangar != null);
		ledRedHangarEnemy.setVisible(enemyHangar == null);
		ledGreenHangarEnemy.setVisible(enemyHangar != null);
	}
	checkArtillery() {
		artilleryText.setText('Artillería: ' + artilleryCount + '/4');
		artilleryEnemyText.setText('Artillería : ' + artilleryEnemyCount + '/4')
	}

	checkPlanesArmor() {
		if (myPlaneOne != null) {
			if (myPlaneOne.armor <= 0) {
				consolePlane1.setTexture('spritesPlanesEliminated', myPlaneOne.getImage(ELIMINATED, false));
				plane1ArmorText.setText('');
			} else {
				plane1ArmorText.setText(myPlaneOne.armor);
			}
		}

		if (myPlaneTwo != null) {
			if (myPlaneTwo.armor <= 0) {
				consolePlane2.setTexture('spritesPlanesEliminated', myPlaneTwo.getImage(ELIMINATED, false));
				plane2ArmorText.setText('');
			} else {
				plane2ArmorText.setText(myPlaneTwo.armor);
			}
		}

		if (myPlaneThree != null) {
			if (myPlaneThree.armor <= 0) {
				consolePlane3.setTexture('spritesPlanesEliminated', myPlaneThree.getImage(ELIMINATED, false));
				plane3ArmorText.setText('');
			} else {
				plane3ArmorText.setText(myPlaneThree.armor);
			}
		}
		if (myPlaneFour != null) {
			if (myPlaneFour.armor <= 0) {
				consolePlane4.setTexture('spritesPlanesEliminated', myPlaneFour.getImage(ELIMINATED, false));
				plane4ArmorText.setText('');
			} else {
				plane4ArmorText.setText(myPlaneFour.armor);
			}
		}

		this.resizeConsolePlanes();

	}

	loadConsole() {
		infoGameText.setText("Presione (D) para despegar avión");
		fuelText.setText('Combustible: ' + myPlaneSelected.fuel);
		this.checkBomb();
	}

	fuelControl() {
		fuelText.setText('Combustible: ' + parseFloat(myPlaneSelected.fuel).toFixed(2));
		if (myPlaneSelected.fuel < 30) {
			infoGameText.setText('Se está agotando el combustible. \nRetorne a la base');
		}
	}
	//#endregion

	//#region Aciones
	clean() {
		scene = null;
		isBlue = null;
		clearMap = false;
		enemyDraw = false;
		myStructuresCount = null, myPlanesCount = null;
		enemyStructuresCount = null, enemyPlanesCount = null;
		gameOver = false;
		keyA = null, keyOne = null, keyTwo = null, keyThree = null, keyFour = null, keyD = null, keyS = null;
		cursors = null;
		fuelText = null;
		bombText = null;
		infoGameText = null;
		myPlaneSelectedText = null;
		highFlyPlaneText = null;
		plane1ArmorText = null;
		plane2ArmorText = null;
		plane3ArmorText = null;
		plane4ArmorText = null;
		towerText = null;
		hangarText = null;
		fuelsText = null;
		consolePlane1 = null;
		consolePlane2 = null;
		consolePlane3 = null;
		consolePlane4 = null;
		artilleryCount = 0;
		artilleryEnemyCount = 0;
		artilleryText = null;
		artilleryEnemyText = null;
		towerEnemyText = null;
		hangarEnemyText = null;
		fuelsEnemyText = null;
		ledRedBomb = null;
		myBaseText = null;
		enemyBaseText = null;
		ledGreenBomb = null;
		ledRedHangar = null;
		ledGreenHangar = null;
		ledGreenFuel = null;
		ledRedFuel = null;
		ledGreenTower = null;
		ledRedTower = null;
		ledGreenBombEnemy = null;
		ledRedHangarEnemy = null;
		ledGreenHangarEnemy = null;
		ledGreenFuelEnemy = null;
		ledRedFuelEnemy = null;
		ledGreenTowerEnemy = null;
		ledRedTowerEnemy = null;
		myBullets = null;
		myBulletsArtillery = null;
		myPlanes = null;
		myFuels = null;
		myTowers = null;
		myHangars = null;
		myBombs = null;
		myArtilleries = null;
		borders = null;
		blacks = null;
		grays = null;
		enemyPlanes = null;
		enemyFuels = null;
		enemyHangars = null;
		enemyTowers = null;
		enemyArtilleries = null;
		enemyBullets = null;
		enemyBombs = null;
		enemyBulletsArtillery = null;
		myFuel, myFuelView = null;
		myTower, myTowerView = null;
		myHangar, myHangarView = null;
		myPlaneSelected = null, myPlaneOne = null, myPlaneOneView = null, myPlaneTwo = null, myPlaneTwoView = null, myPlaneThree, myPlaneThreeView, myPlaneFour = null, myPlaneFourView = null;
		myArtilleryOne = null, myArtilleryOneView = null, myArtilleryTwo = null, myArtilleryTwoView = null, myArtilleryThree = null, myArtilleryThreeView = null, myArtilleryFour = null, myArtilleryFourView = null;
		enemyFuel = null, enemyFuelView = null;
		enemyTower = null, enemyTowerView = null;
		enemyHangar = null, enemyHangarView = null;
		enemyPlaneSelected = null, enemyPlaneOne = null, enemyPlaneOneView = null, enemyPlaneTwo = null, enemyPlaneTwoView = null, enemyPlaneThree = null, enemyPlaneThreeView = null, enemyPlaneFour = null, enemyPlaneFourView = null;
		enemyArtilleryOne = null, enemyArtilleryOneView = null, enemyArtilleryTwo = null, enemyArtilleryTwoView = null, enemyArtilleryThree = null, enemyArtilleryThreeView = null, enemyArtilleryFour = null, enemyArtilleryFourView = null;
	}

	checkEnemyAction(time) {
		if (!enemyDraw) {
			enemyDraw = true;
			this.placeEnemyElements();
			this.checkArtillery();
			this.checkStructures();
		}

		if (context.enemySession.isMoving) {
			context.enemySession.isMoving = false;
			this.moveEnemyPlanes();
		}

		if (context.enemySession.isPlaneView) {
			context.enemySession.isPlaneView = false;
			let planeView = this.checkPlaneView(true, enemyPlaneSelected.planeIndex);
			if (planeView != null) {
				if (parseInt(enemyPlaneSelected.planeAngle) < 180) {
					if (!isBlue) {
						planeView.setTexture("PlaneRightBlueView")
					}
					else {
						planeView.setTexture("PlaneRightRedView")
					}
				}
				else {
					if (!isBlue) {
						planeView.setTexture("PlaneLeftBlueView")
					}
					else {
						planeView.setTexture("PlaneLeftRedView")
					}
				}
				planeView.x = parseInt(context.enemySession.planeViewCoord);
				context.enemySession.planeViewCoord = -1;
			}
		}

		if (context.enemySession.isShooting) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeShooting);
			context.enemySession.isShooting = false;
			context.enemySession.planeShooting = -1;
			if (p != null) {
				p.fire(time, enemyBullets, scene);
				this.checkPlanesArmor();
			}
		}

		if (context.enemySession.isBombing) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeBombing);
			context.enemySession.isBombing = false;
			context.enemySession.planeBombing = -1;
			if (p != null) {
				p.fireBomb(enemyBombs);
			}
		}

		if (context.enemySession.isEmptyTank) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeEmptyTank);
			context.enemySession.isEmptyTank = false;
			context.enemySession.planeEmptyTank = -1;
			if (p != null) {
				p.emptyTank(false);
				enemyPlanesCount -= 1;
				gameOver = enemyPlanesCount == 0;
				this.destroyPlaneView(true, p.planeIndex);
			}
		}

		if (context.enemySession.isTakeOff) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeTakeOff);
			let takeOff = context.enemySession.takeOff;
			context.enemySession.isTakeOff = false;
			context.enemySession.planeTakeOff = -1;
			if (p != null) {
				p.setDepth(1);
				enemyPlaneSelected = p;
				enemyPlaneSelected.flying = takeOff == "true";
				if (clearMap) {
					let planeView = this.checkPlaneView(true, enemyPlaneSelected.planeIndex);
					if (planeView != null) {
						let position = takeOff == 'true' ? isBlue ? RED_PLANE_LOW_VIEW_Y : BLUE_PLANE_LOW_VIEW_Y : isBlue ? RED_PLANE_LAND_VIEW_Y : BLUE_PLANE_LAND_VIEW_Y;
						this.changeHighFlyPlaneView(planeView.y, position, planeView);
					}
				}

			}
		}

		if (context.enemySession.isHighFlying) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeHighFly);
			context.enemySession.isHighFlying = false;
			context.enemySession.planeHighFly = -1;
			if (p != null) {
				enemyPlaneSelected = p;
				enemyPlaneSelected.highFlyPlane(false);
				let planeView = this.checkPlaneView(true, enemyPlaneSelected.planeIndex);
				if (planeView) {
					this.changeHighFlyPlaneView(planeView.y, enemyPlaneSelected.highFly ? isBlue ? RED_PLANE_HIGH_VIEW_Y : BLUE_PLANE_HIGH_VIEW_Y : isBlue ? RED_PLANE_LOW_VIEW_Y : BLUE_PLANE_LOW_VIEW_Y, planeView);
				}
			}
		}


		// if (context.enemySession.isDamaging) {
		// 	let p = this.checkMyPlaneAction(context.enemySession.planeDamaging);
		// 	if (p != null) {
		// 		p.receiveDamage(context.enemySession.damage);
		// 		this.checkPlanesArmor();
		// 	}
		// 	context.enemySession.isDamaging = false;
		// 	context.enemySession.planeDamaging = -1;
		// 	context.enemySession.damage = -1;
		// }
		this.checkAllArtilleryFire(time);
		this.checkMyTowersFire(time);
		this.checkEnemyTowerFire(time);
	}

	moveEnemyPlanes() {


		let coord = context.enemySession.planeCoord;
		let index = parseInt(context.enemySession.planeMoving)
		let delta = parseInt(context.enemySession.delta);
		switch (index) {
			case 1:
				enemyPlaneSelected = enemyPlaneOne;
				break;
			case 2:
				enemyPlaneSelected = enemyPlaneTwo;
				break;
			case 3:
				enemyPlaneSelected = enemyPlaneThree;
				break;
			case 4:
				enemyPlaneSelected = enemyPlaneFour;
				break;
		}
		enemyPlaneSelected.y = parseFloat(coord[1]);
		enemyPlaneSelected.x = parseFloat(coord[0]);
		enemyPlaneSelected.planeAngle = coord[2];
		enemyPlaneSelected.angle = coord[2];
		if (clearMap) {
			this.changeFlyYPlaneView(enemyPlaneSelected, true);
		}
	}

	existsEnemySession() {
		return context.enemySession.id != undefined;
	}

	existsPlayerSession() {
		return context.playerSession.id != undefined;
	}

	createExplosion(isStructure, x, y) {
		let volume = isStructure ? 0.8 : 1;
		let sound = isStructure ? "structure" : "plane";
		this.sound.play(sound, {
			volume: volume
		});

		let explosion = null;
		explosion = this.physics.add.sprite(x, y, 'explosion');
		this.anims.create({
			key: 'explosion',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 16 }),
			frameRate: 10,
			repeat: -1
		});
		explosion.setScale(isStructure ? 0.6 : 0.25);
		explosion.anims.play('explosion', true);

		this.time.addEvent({
			delay: 2000,
			callback: () => {
				if (explosion != null) {
					explosion.destroy();
				}
			},
			loop: false
		})
	}

	checkEnemyPlaneAction(index) {
		let p = null;
		switch (parseInt(index)) {
			case 1:
				p = enemyPlaneOne;
				break;
			case 2:
				p = enemyPlaneTwo;
				break;
			case 3:
				p = enemyPlaneThree;
				break;
			case 4:
				p = enemyPlaneFour;
				break;

		}
		return p;
	}

	checkMyPlaneAction(index) {
		let p = null;
		switch (parseInt(index)) {
			case 1:
				p = myPlaneOne;
				break;
			case 2:
				p = myPlaneTwo;
				break;
			case 3:
				p = myPlaneThree;
				break;
			case 4:
				p = myPlaneFour;
				break;

		}
		return p;
	}



	captureKeys() {
		//capturar tecla control
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
		keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	}

	selectPlane(p) {
		if (p.armor > 0) {
			if (myPlaneSelected != p) {
				if (!this.checkOtherPlaneFlying(p)) {
					let angle = isBlue ? ANGLE_90 : ANGLE_270;
					if (myPlaneOne != null) {
						if (myPlaneOne.scene) { this.unselectPlane(myPlaneOne); };
					}
					if (myPlaneTwo != null) {
						if (myPlaneTwo.scene) { this.unselectPlane(myPlaneTwo); };
					}
					if (myPlaneThree != null) {
						if (myPlaneThree.scene) { this.unselectPlane(myPlaneThree); };
					}
					if (myPlaneFour != null) {
						if (myPlaneFour.scene) { this.unselectPlane(myPlaneFour); };
					}
					myPlaneSelected = p;
					myPlaneSelected.angle = angle;
					myPlaneSelected.planeAngle = angle;
					myPlaneSelected.flying = false;
					myPlaneSelected.setTexture('spritesPlanes', myPlaneSelected.getImage(LANDED, false));
					if (myPlaneSelectedText != null) {
						myPlaneSelectedText.setText('Avión #' + myPlaneSelected.planeIndex + " - " + myPlaneSelected.getType());
						//Info en Consola
						this.loadConsole();
					}
				}
				else {
					infoGameText.setText("Otro avión esta en el aire");
				}

			}
		}
	}

	unselectPlane(p) {
		p.setTexture('spritesPlanes', p.getImage(UNSELECT, false));
		p.flying = false;
	}

	checkOtherPlaneFlying(p) {
		let oneFlying = false, twoFlying = false, threeFlying = false, fourFlying = false
		if (p != myPlaneOne && myPlaneOne != null) {
			oneFlying = myPlaneOne.flying;
		}
		if (p != myPlaneTwo && myPlaneTwo != null) {
			twoFlying = myPlaneTwo.flying;
		}
		if (p != myPlaneThree && myPlaneThree != null) {
			threeFlying = myPlaneThree.flying;
		}
		if (p != myPlaneFour && myPlaneFour != null) {
			fourFlying = myPlaneFour.flying;
		}
		return oneFlying || twoFlying || threeFlying || fourFlying;
	}

	checkAllArtilleryFire(time) {
		if (myPlaneSelected != null && myPlaneSelected.armor > 0) {
			if (enemyArtilleryOne != null) {
				this.checkArtilleryFire(time, enemyArtilleryOne, myPlaneSelected, enemyBulletsArtillery);

			}
			if (enemyArtilleryTwo != null) {
				this.checkArtilleryFire(time, enemyArtilleryTwo, myPlaneSelected, enemyBulletsArtillery);

			}
			if (enemyArtilleryThree != null) {
				this.checkArtilleryFire(time, enemyArtilleryThree, myPlaneSelected, enemyBulletsArtillery);

			}
			if (enemyArtilleryFour != null) {
				this.checkArtilleryFire(time, enemyArtilleryFour, myPlaneSelected, enemyBulletsArtillery);

			}
		}


		if (enemyPlaneSelected != null && enemyPlaneSelected.armor > 0) {
			if (myArtilleryOne != null) {
				this.checkArtilleryFire(time, myArtilleryOne, enemyPlaneSelected, myBulletsArtillery);

			}
			if (myArtilleryTwo != null) {
				this.checkArtilleryFire(time, myArtilleryTwo, enemyPlaneSelected, myBulletsArtillery);

			}
			if (myArtilleryThree != null) {
				this.checkArtilleryFire(time, myArtilleryThree, enemyPlaneSelected, myBulletsArtillery);

			}
			if (myArtilleryFourView != null) {
				this.checkArtilleryFire(time, myArtilleryFour, enemyPlaneSelected, myBulletsArtillery);

			}
		}
		this.checkPlanesArmor();
	}

	checkArtilleryFire(time, artillery, plane, bullets) {
		let angle;
		if (time > artillery.nextTic && artillery.armor > 0) {
			if (Phaser.Math.Distance.Between(artillery.x, artillery.y, plane.x, plane.y) < artillery.reach) {
				angle = Phaser.Math.Angle.Between(artillery.x, artillery.y, plane.x, plane.y);
				if (!plane.highFly) {
					artillery.fire(scene, time, angle, bullets);
					this.checkPlanesArmor();
				}
			}
		}
	}

	checkMyTowersFire(time) {
		let angle;
		if (enemyPlaneSelected != null && enemyPlaneSelected.armor > 0) {
			if (myTower != null) {
				if (time > myTower.nextTic && !myTower.destroyed) {
					if (Phaser.Math.Distance.Between(myTower.x, myTower.y, enemyPlaneSelected.x, enemyPlaneSelected.y) < 300) {
						angle = Phaser.Math.Angle.Between(myTower.x, myTower.y, enemyPlaneSelected.x, enemyPlaneSelected.y);
						if (!enemyPlaneSelected.highFly) {
							myTower.fire(scene, time, angle, myBulletsArtillery);
							this.checkPlanesArmor();
						}
					}
				}
			}

		}
	}
	checkEnemyTowerFire(time) {
		let angle;
		if (myPlaneSelected != null && myPlaneSelected.armor > 0) {
			if (enemyTower != null) {
				if (time > enemyTower.nextTic && !enemyTower.destroyed) {
					if (Phaser.Math.Distance.Between(enemyTower.x, enemyTower.y, myPlaneSelected.x, myPlaneSelected.y) < 300) {
						angle = Phaser.Math.Angle.Between(enemyTower.x, enemyTower.y, myPlaneSelected.x, myPlaneSelected.y);
						if (!myPlaneSelected.highFly) {
							enemyTower.fire(scene, time, angle, enemyBulletsArtillery);
							this.checkPlanesArmor();
						}
					}
				}
			}
		}
	}
	//#endregion

	//#region Colisiones de objetos
	exploreBlackMap(plane, black) {
		if (plane.active === true && black.active === true) {
			black.destroy();
		}
	}
	exploreGrayMap(plane, gray) {
		if (plane.active === true && gray.active === true) {
			gray.plane = plane;
			plane.gray = gray;
			gray.setVisible(false);
		}
	}
	hiddenEnemies(plane, gray) {
		if (plane.active === true && gray.active === true && gray.visible) {
			plane.setVisible(false);
		} else if (plane.active === true && gray.active === true && !gray.visible) {
			plane.setVisible(true);
		}
	}

	damageMyPlane(bullet, plane) {
		if (plane.active === true && bullet.active === true) {
			if ((bullet.frame.texture.key == 'bullet' && plane.flying) || (bullet.frame.texture.key == "bulletArtillery" && !plane.highFly)) {
				let message;
				let color;
				if (plane.receiveDamage(bullet.damage)) {
					message = plane.getType() + " aliado destruido";
					scene.createExplosion(false, plane.x, plane.y);
					color = COLOR_DANGER;
					scene.destroyPlaneView(false, plane.planeIndex);
					myPlanesCount -= 1;
				}
				else {
					message = plane.getType() + " aliado dañado";
					color = COLOR_WARNING;
				}
				bullet.destroy();
				scene.createMessage(message, color);
				if (myPlanesCount == 0) {
					gameOver = true;
				}
			}
		}
	}

	damageEnemyPlane(bullet, plane) {

		if (plane.active === true && bullet.active === true) {
			if ((bullet.frame.texture.key == 'bullet' && plane.flying) || (bullet.frame.texture.key == "bulletArtillery" && !plane.highFly)) {

				if (plane.receiveDamage(bullet.damage)) {
					scene.createExplosion(false, plane.x, plane.y);
					scene.createMessage(plane.getType() + " enemigo destruido", COLOR_SUCCESS);
					scene.destroyPlaneView(true, plane.planeIndex);
					enemyPlanesCount -= 1;
				}
				bullet.destroy();
				if (enemyPlanesCount == 0) {
					gameOver = true;
				}
			}

			// let json = JSON.stringify({
			// 	action: {
			// 		name: 'syncPlaneDamage',
			// 		parameters: {
			// 			gameId: context.gameId,
			// 			damagePlane: plane.planeIndex,
			// 			damage: bullet.damage
			// 		}
			// 	}
			// })
			// context.functions.sendMessage(json);
		}
	}

	damageMyStructure(bomb, structure) {
		if (structure.active === true && bomb.active === true) {
			let message;
			if (structure.frame.texture.key.includes('tower')) {
				ledGreenTower.setVisible(false);
				ledRedTower.setVisible(true);
				message = "Torre aliada destruida";
				if (myTowerView != null) { myTowerView.destroy(); }
			} else if (structure.frame.texture.key.includes('fuel')) {
				ledGreenFuel.setVisible(false);
				ledRedFuel.setVisible(true);
				message = "Tanque aliado destruido";
				if (myFuelView != null) { myFuelView.destroy(); }
			} else {
				ledGreenHangar.setVisible(false);
				ledRedHangar.setVisible(true);
				message = "Hangar aliado destruido";
				if (myHangarView != null) { myHangarView.destroy(); }
			}
			myStructuresCount -= 1;
			bomb.destroy();
			structure.destroy();
			scene.createExplosion(true, structure.x, structure.y);
			structure.destroyed = true;
			structure = false;
			scene.createMessage(message, COLOR_DANGER);
			if (myStructuresCount == 0) {
				gameOver = true;
			}
		}
	}

	damageEnemyStructure(bomb, structure) {
		if (structure.active === true && bomb.active === true) {
			let message;
			if (structure.frame.texture.key.includes('tower')) {
				ledGreenTowerEnemy.setVisible(false);
				ledRedTowerEnemy.setVisible(true);
				message = "Torre enemiga destruida";
				if (enemyTowerView != null) { enemyTowerView.destroy(); }
			} else if (structure.frame.texture.key.includes('fuel')) {
				ledGreenFuelEnemy.setVisible(false);
				ledRedFuelEnemy.setVisible(true);
				message = "Tanque enemigo destruido";
				if (enemyFuelView != null) { enemyFuelView.destroy(); }
			} else {
				ledGreenHangarEnemy.setVisible(false);
				ledRedHangarEnemy.setVisible(true);
				message = "Hangar enemigo destruido";
				if (enemyHangarView != null) { enemyHangarView.destroy(); }
			}
			bomb.destroy();
			structure.destroy();
			structure.destroyed = true;
			scene.createExplosion(true, structure.x, structure.y);
			structure = false;
			enemyStructuresCount -= 1;
			scene.createMessage(message, COLOR_SUCCESS);
			if (enemyStructuresCount == 0) {
				gameOver = true;
			}
		}
	}

	borderPlane(plane, borders) {
		if (plane.active === true && borders.active === true) {
			if (!borders.internal) {
				plane.x = 950;
			}
			else if (borders.enemy && plane.highFly) {
				plane.highFlyPlane(true);
			}

		}
	}
	borderBullet(bullet, borders) {
		if (bullet.active === true && borders.active === true && !borders.internal) {
			bullet.destroy();
		}
	}
	borderBomb(bomb, borders) {
		if (bomb.active === true && borders.active === true && !borders.internal) {
			bomb.destroy();
		}
	}

	damageArtillery(bullet, artillery) {
		if (artillery.active === true && bullet.active === true) {
			if (!bullet.highFlyPlane) {
				let message;
				let color;
				let index = artillery.artilleryIndex;
				if (artillery.receiveDamage(bullet.damage)) {
					scene.createExplosion(false, artillery.x, artillery.y);
					if (artillery.isEnemy) {
						message = "Artillería enemiga destruida";
						color = COLOR_SUCCESS;
						artilleryEnemyCount = artilleryEnemyCount - 1;
						artilleryText.setText('Artillería: ' + artilleryEnemyCount + '/4');
					}
					else {
						message = "Artillería aliada destruida"
						color = COLOR_DANGER;
						artilleryCount = artilleryCount - 1;
						artilleryEnemyText.setText('Artillería : ' + artilleryCount + '/4')
					}
					switch (index) {
						case 1:
							if (artillery.isEnemy) { enemyArtilleryOneView.destroy(); } else { myArtilleryOneView.destroy(); }
							break;
						case 2:
							if (artillery.isEnemy) { enemyArtilleryTwoView.destroy(); } else { myArtilleryTwoView.destroy(); }
							break;
						case 3:
							if (artillery.isEnemy) { enemyArtilleryThreeView.destroy(); } else { myArtilleryThreeView.destroy(); }
							break;
						case 4:
							if (artillery.isEnemy) { enemyArtilleryFourView.destroy(); } else { myArtilleryFourView.destroy(); }
							break;
					}
					scene.createMessage(message, color);
				}
				bullet.destroy();
			}
		}
	}

	//#endregion

	//#region Representar elementos
	createMessage(message, indicator) {
		let toast = this.rexUI.add.toast({
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
				hold: 1200,
				out: 200,
			},
		});
		toast.setDepth(4);
		toast.show(message);
	}

	createSaveConfirm() {
		var dialog = this.rexUI.add.dialog({
			x: 600,
			y: 300,

			background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

			title: this.rexUI.add.label({
				background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
				text: this.add.text(0, 0, 'Guardar partida', {
					fontSize: '24px'
				}),
				space: {
					left: 15,
					right: 15,
					top: 10,
					bottom: 10
				}
			}),

			content: this.add.text(0, 0, '¿Desea confirmar?', {
				fontSize: '24px'
			}),

			actions: [
				createLabel(this, 'Si'),
				createLabel(this, 'No')
			],

			space: {
				title: 25,
				content: 25,
				action: 15,

				left: 20,
				right: 20,
				top: 20,
				bottom: 20,
			},

			align: {
				actions: 'center', // 'center'|'left'|'right'
			},

			expand: {
				content: false, // Content is a pure text object
			}
		})
			.layout()
			.popUp(1000);

		this.print = this.add.text(0, 0, '');
		dialog.setDepth(5);
		dialog
			.on('button.click', function (button, groupName, index) {

				this.updateContext();
				let message = context.messagesFormat.saveGame(context.playerSession, context.enemySession.name, button.text);
				context.functions.sendMessage(message);
				dialog.scaleDownDestroy(100);
				dialog = undefined;
			}, this)
			.on('button.over', function (button, groupName, index) {
				button.getElement('background').setStrokeStyle(1, 0xffffff);
			})
	}

	placeEnemyElements() {
		let yFuel = 0, yTower = 0, yHangar = 0;
		let xFuel = 0, xTower = 0, xHangar = 0;

		if (context.enemySession.activeFuel) {
			yFuel = context.enemySession.positionYFuel;
			xFuel = context.enemySession.positionXFuel;

			enemyFuel = enemyFuels.get();
			enemyFuel.place(yFuel, isBlue ? xFuel - 175 : xFuel - 1030);
			enemyStructuresCount += 1;
			enemyFuelView = this.add.image(isBlue ? RED_BASE_X_VIEW + 10 : BLUE_BASE_X_VIEW + 8, 270, isBlue ? 'fuelRedView' : 'fuelBlueView').setScale(0.25);
		}

		if (context.enemySession.activeTower) {
			yTower = context.enemySession.positionYTower;
			xTower = context.enemySession.positionXTower;

			enemyTower = enemyTowers.get();
			enemyTower.place(yTower, isBlue ? xTower - 175 : xTower - 1030);
			enemyStructuresCount += 1;
			enemyTowerView = this.add.image(isBlue ? RED_BASE_X_VIEW + 18 : BLUE_BASE_X_VIEW, 268, isBlue ? 'towerRedView' : 'towerBlueView').setScale(0.4);
		}

		if (context.enemySession.activeHangar) {
			yHangar = context.enemySession.positionYHangar;
			xHangar = context.enemySession.positionXHangar;

			enemyHangar = enemyHangars.get();
			enemyHangar.place(yHangar, isBlue ? xHangar - 175 : xHangar - 1030, true);
			enemyStructuresCount += 1;
			enemyHangarView = this.add.image(isBlue ? RED_BASE_X_VIEW : BLUE_BASE_X_VIEW + 18, 275, isBlue ? 'hangarRedView' : 'hangarBlueView').setScale(0.3);
		}

		this.placeEnemyPlanes();
		this.placeEnemyArtilleries();


		this.physics.add.overlap(myBombs, enemyHangars, this.damageEnemyStructure);
		this.physics.add.overlap(myBombs, enemyTowers, this.damageEnemyStructure);
		this.physics.add.overlap(myBombs, enemyFuels, this.damageEnemyStructure);
		this.physics.add.overlap(myBulletsArtillery, enemyPlanes, this.damageEnemyPlane);
		this.physics.add.overlap(myBullets, enemyArtilleries, this.damageArtillery);
	}

	placeEnemyArtilleries() {
		if (context.enemySession.artilleries != undefined) {
			let artilleryServer = context.enemySession.artilleries;
			if (artilleryServer[0].armor > 0) {
				enemyArtilleryOne = this.placeEnemyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower, artilleryServer[0].artilleryCode, artilleryServer[0].artilleryType);
				enemyArtilleryOneView = this.add.image(isBlue ? enemyArtilleryOne.x + 425 : enemyArtilleryOne.x + 925, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[1].armor > 0) {
				enemyArtilleryTwo = this.placeEnemyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[1].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower, artilleryServer[1].artilleryCode, artilleryServer[1].artilleryType);
				enemyArtilleryTwoView = this.add.image(isBlue ? enemyArtilleryTwo.x + 423 : enemyArtilleryTwo.x + 927, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[2].armor > 0) {
				enemyArtilleryThree = this.placeEnemyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[2].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower, artilleryServer[2].artilleryCode, artilleryServer[2].artilleryType);
				enemyArtilleryThreeView = this.add.image(isBlue ? enemyArtilleryThree.x + 421 : enemyArtilleryThree.x + 929, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[3].armor > 0) {
				enemyArtilleryFour = this.placeEnemyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[3].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower, artilleryServer[3].artilleryCode, artilleryServer[3].artilleryType);
				enemyArtilleryFourView = this.add.image(isBlue ? enemyArtilleryFour.x + 419 : enemyArtilleryFour.x + 931, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
		}
	}

	placeMyElements() {

		let yFuel = -1, yTower = -1, yHangar = -1;
		let xFuel = -1, xTower = -1, xHangar = -1;
		if (context.playerSession.activeFuel) {
			yFuel = context.playerSession.positionYFuel;
			xFuel = context.playerSession.positionXFuel;
			myFuel = myFuels.get();
			myFuel.place(yFuel, isBlue ? xFuel - 1030 : xFuel - 175);
			myStructuresCount += 1;
			myFuelView = this.add.image(isBlue ? BLUE_BASE_X_VIEW + 8 : RED_BASE_X_VIEW + 10, 270, isBlue ? 'fuelBlueView' : 'fuelRedView').setScale(0.25);

		}

		if (context.playerSession.activeTower) {

			myTower = myTowers.get();
			yTower = context.playerSession.positionYTower;
			xTower = context.playerSession.positionXTower;
			myTower.place(yTower, isBlue ? xTower - 1030 : xTower - 175);
			myStructuresCount += 1;
			myTowerView = this.add.image(isBlue ? BLUE_BASE_X_VIEW : RED_BASE_X_VIEW + 18, 268, isBlue ? 'towerBlueView' : 'towerRedView').setScale(0.4);

		}

		if (context.playerSession.activeHangar) {
			myHangar = myHangars.get();
			xHangar = context.playerSession.positionXHangar;
			yHangar = context.playerSession.positionYHangar;
			myHangar.place(yHangar, isBlue ? xHangar - 1030 : xHangar - 175, false);
			myStructuresCount += 1;
			myHangarView = this.add.image(isBlue ? BLUE_BASE_X_VIEW + 18 : RED_BASE_X_VIEW, 275, isBlue ? 'hangarBlueView' : 'hangarRedView').setScale(0.3);

		}

		if (yFuel >= yHangar && yFuel >= yTower) {
			if (myFuelView != null) {
				myFuelView.setDepth(3);
			}
			if (yHangar >= yTower) {
				if (myHangarView != null) {
					myHangarView.setDepth(2);
				}
				if (myTowerView != null) {
					myTowerView.setDepth(1);
				}
			}
			else {
				if (myHangarView != null) {
					myHangarView.setDepth(1);
				}
				if (myTowerView != null) {
					myTowerView.setDepth(2);
				}
			}
		}
		else if (yFuel >= yHangar) {
			if (myFuelView != null) {
				myFuelView.setDepth(2);
			}
			if (myHangarView != null) {
				myHangarView.setDepth(1);
			}
			if (myTowerView != null) {
				myTowerView.setDepth(3);
			}
		}
		else if (yFuel >= yTower) {
			if (myFuelView != null) {
				myFuelView.setDepth(2);
			}
			if (myHangarView != null) {
				myHangarView.setDepth(3);
			}
			if (myTowerView != null) {
				myTowerView.setDepth(1);
			}
		}
		else if (yTower >= yHangar) {
			if (myFuelView != null) {
				myFuelView.setDepth(1);
			}
			if (myHangarView != null) {
				myHangarView.setDepth(2);
			}
			if (myTowerView != null) {
				myTowerView.setDepth(3);
			}
		}
		else {
			if (myFuelView != null) {
				myFuelView.setDepth(1);
			}
			if (myHangarView != null) {
				myHangarView.setDepth(3);
			}
			if (myTowerView != null) {
				myTowerView.setDepth(2);
			}
		}

		this.placeMyPlanes();
		this.placeMyArtilleries();

		this.physics.add.overlap(enemyBombs, myHangars, this.damageMyStructure);
		this.physics.add.overlap(enemyBombs, myTowers, this.damageMyStructure);
		this.physics.add.overlap(enemyBombs, myFuels, this.damageMyStructure);
	}

	takeOffPlaneRecover(p) {
		this.selectPlane(p);
		let planeView = this.checkPlaneView(false, myPlaneSelected.planeIndex);
		if (planeView != null) {
			this.changeHighFlyPlaneView(planeView.y, isBlue ? BLUE_PLANE_LOW_VIEW_Y : RED_PLANE_LOW_VIEW_Y, planeView);
		}
		myPlaneSelected.takeOff();
		this.syncTakeOff(true);
	}

	checkXPlaneRecover(p, isEnemy) {
		let recoverX;
		let oldX = p.x;
		if (!isEnemy) {
			if (isBlue) {
				if (oldX <= 150) {
					recoverX = 1079 - ((150 - oldX) / 3.5);
				}
				else {
					recoverX = 150 + 929 + ((oldX - 150) / 3.5);
				}
			}
			else {
				if (oldX <= 850) {
					recoverX = 1271 - ((850 - oldX) / 3.5);
				}
				else {
					recoverX = 850 + 421 + ((oldX - 850) / 3.5);
				}
			}
		}
		return recoverX;
	}
	placeMyPlanes() {


		if (context.playerSession.planes != undefined) {
			let planesServer = context.playerSession.planes;
			if (planesServer[0].armor > 0) {
				myPlaneOne = this.placeMyPlane(planesServer[0].positionY, planesServer[0].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[0].fuel, planesServer[0].armor, planesServer[0].speed, planesServer[0].hasBomb, planesServer[0].firePower, 1, planesServer[0].planeType);
				myPlanesCount += 1;


				if (planesServer[0].flying) {

					let recoverX = this.checkXPlaneRecover(myPlaneOne, false);
					myPlaneOneView = this.add.image(recoverX, 280, isBlue ? myPlaneOne.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneOne.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView');
					this.takeOffPlaneRecover(myPlaneOne);
				}
				else {
					myPlaneOneView = this.add.image(isBlue ? myPlaneOne.x + 929 : myPlaneOne.x + 421, 280, isBlue ? myPlaneOne.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneOne.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView');
				}
				this.resizePlaneView(myPlaneOneView, 40);
			}
			if (planesServer[1].armor > 0) {
				myPlaneTwo = this.placeMyPlane(planesServer[1].positionY, planesServer[1].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[1].fuel, planesServer[1].armor, planesServer[1].speed, planesServer[1].hasBomb, planesServer[1].firePower, 2, planesServer[1].planeType);
				myPlanesCount += 1;

				if (planesServer[1].flying) {

					let recoverX = this.checkXPlaneRecover(myPlaneTwo, false);
					myPlaneTwoView = this.add.image(recoverX, 280, isBlue ? myPlaneTwo.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneTwo.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView');
					this.takeOffPlaneRecover(myPlaneTwo);
				}
				else {
					myPlaneTwoView = this.add.image(isBlue ? myPlaneTwo.x + 931 : myPlaneTwo.x + 419, 280, isBlue ? myPlaneTwo.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneTwo.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
				}
				this.resizePlaneView(myPlaneTwoView, 40);
			}
			if (planesServer[2].armor > 0) {
				myPlaneThree = this.placeMyPlane(planesServer[2].positionY, planesServer[2].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[2].fuel, planesServer[2].armor, planesServer[2].speed, planesServer[2].hasBomb, planesServer[2].firePower, 3, planesServer[2].planeType);
				myPlanesCount += 1;

				if (planesServer[2].flying) {

					let recoverX = this.checkXPlaneRecover(myPlaneThree, false);
					myPlaneThreeView = this.add.image(recoverX, 280, isBlue ? myPlaneThree.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneThree.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView');
					this.takeOffPlaneRecover(myPlaneThree);
				}
				else {
					myPlaneThreeView = this.add.image(isBlue ? myPlaneThree.x + 933 : myPlaneThree.x + 417, 280, isBlue ? myPlaneThree.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneThree.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
				}
				this.resizePlaneView(myPlaneThreeView, 40);
			}
			if (planesServer[3].armor > 0) {
				myPlaneFour = this.placeMyPlane(planesServer[3].positionY, planesServer[3].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[3].fuel, planesServer[3].armor, planesServer[3].speed, planesServer[3].hasBomb, planesServer[3].firePower, 4, planesServer[3].planeType);
				myPlanesCount += 1;
				if (planesServer[3].flying) {

					let recoverX = this.checkXPlaneRecover(myPlaneFour, false);
					myPlaneFourView = this.add.image(recoverX, 280, isBlue ? myPlaneFour.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneFour.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView');
					this.takeOffPlaneRecover(myPlaneFour);
				}
				else {
					myPlaneFourView = this.add.image(isBlue ? myPlaneFour.x + 935 : myPlaneFour.x + 415, 280, isBlue ? myPlaneFour.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneFour.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
				}
				this.resizePlaneView(myPlaneFourView, 40);
			}
			this.physics.add.collider(myPlanes, borders, this.borderPlane);
			this.physics.add.overlap(myPlanes, blacks, this.exploreBlackMap);
			this.physics.add.overlap(enemyBullets, myPlanes, this.damageMyPlane);
		}
	}

	placeMyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type, false);
		}
	}

	placeEnemyPlanes() {
		if (context.enemySession.planes != undefined) {
			let planeEnemyServer = context.enemySession.planes;
			if (planeEnemyServer[0].armor > 0) {
				enemyPlaneOne = this.placeEnemyPlane(planeEnemyServer[0].positionY, planeEnemyServer[0].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[0].fuel, planeEnemyServer[0].armor, planeEnemyServer[0].speed, planeEnemyServer[0].hasBomb, planeEnemyServer[0].firePower, 1, planeEnemyServer[0].planeType);
				enemyPlanesCount += 1;
				enemyPlaneOneView = this.add.image(isBlue ? enemyPlaneOne.x + 421 : enemyPlaneOne.x + 929, 280, isBlue ? enemyPlaneOne.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView' : enemyPlaneOne.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView').setScale(0.08);
			}
			if (planeEnemyServer[1].armor > 0) {
				enemyPlaneTwo = this.placeEnemyPlane(planeEnemyServer[1].positionY, planeEnemyServer[1].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[1].fuel, planeEnemyServer[1].armor, planeEnemyServer[1].speed, planeEnemyServer[1].hasBomb, planeEnemyServer[1].firePower, 2, planeEnemyServer[1].planeType);
				enemyPlanesCount += 1;
				enemyPlaneTwoView = this.add.image(isBlue ? enemyPlaneTwo.x + 419 : enemyPlaneTwo.x + 931, 280, isBlue ? enemyPlaneTwo.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView' : enemyPlaneTwo.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView').setScale(0.08);
			}
			if (planeEnemyServer[2].armor > 0) {
				enemyPlaneThree = this.placeEnemyPlane(planeEnemyServer[2].positionY, planeEnemyServer[2].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[2].fuel, planeEnemyServer[2].armor, planeEnemyServer[2].speed, planeEnemyServer[2].hasBomb, planeEnemyServer[2].firePower, 3, planeEnemyServer[2].planeType);
				enemyPlanesCount += 1;
				enemyPlaneThreeView = this.add.image(isBlue ? enemyPlaneThree.x + 417 : enemyPlaneThree.x + 933, 280, isBlue ? enemyPlaneThree.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView' : enemyPlaneThree.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView').setScale(0.08);
			}
			if (planeEnemyServer[3].armor > 0) {
				enemyPlaneFour = this.placeEnemyPlane(planeEnemyServer[3].positionY, planeEnemyServer[3].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[3].fuel, planeEnemyServer[3].armor, planeEnemyServer[3].speed, planeEnemyServer[3].hasBomb, planeEnemyServer[3].firePower, 4, planeEnemyServer[3].planeType);
				enemyPlanesCount += 1;
				enemyPlaneFourView = this.add.image(isBlue ? enemyPlaneFour.x + 415 : enemyPlaneFour.x + 935, 280, isBlue ? enemyPlaneFour.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView' : enemyPlaneFour.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView').setScale(0.08);
			}
			this.physics.add.overlap(myBullets, enemyPlanes, this.damageEnemyPlane);
			//this.physics.add.overlap(enemyPlanes, grays, this.hiddenEnemies);
		}
	}

	placeEnemyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type) {
		let plane = enemyPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type, true);
		}
	}
	placeMyArtilleries() {
		if (context.playerSession.artilleries != undefined) {
			let artilleryServer = context.playerSession.artilleries;
			if (artilleryServer[0].armor > 0) {
				myArtilleryOne = this.placeMyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower, artilleryServer[0].artilleryCode, artilleryServer[0].artilleryType);
				myArtilleryOneView = this.add.image(isBlue ? myArtilleryOne.x + 925 : myArtilleryOne.x + 425, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[1].armor > 0) {
				myArtilleryTwo = this.placeMyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[0].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower, artilleryServer[1].artilleryCode, artilleryServer[1].artilleryType);
				myArtilleryTwoView = this.add.image(isBlue ? myArtilleryTwo.x + 927 : myArtilleryTwo.x + 423, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[2].armor > 0) {
				myArtilleryThree = this.placeMyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[0].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower, artilleryServer[2].artilleryCode, artilleryServer[2].artilleryType);
				myArtilleryThreeView = this.add.image(isBlue ? myArtilleryThree.x + 929 : myArtilleryThree.x + 421, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[3].armor > 0) {
				myArtilleryFour = this.placeMyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[0].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower, artilleryServer[3].artilleryCode, artilleryServer[3].artilleryType);
				myArtilleryFourView = this.add.image(isBlue ? myArtilleryFour.x + 931 : myArtilleryFour.x + 419, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			this.physics.add.overlap(enemyBulletsArtillery, myPlanes, this.damageMyPlane);
			this.physics.add.overlap(enemyBullets, myArtilleries, this.damageArtillery);
		}
	}

	placeMyArtillery(i, j, cadency, reach, armor, firePower, artilleryIndex, type) {
		let artillery = myArtilleries.get();
		if (artillery) {
			artilleryCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, false, artilleryIndex, type);
		}
	}

	placeEnemyArtillery(i, j, cadency, reach, armor, firePower, artilleryIndex, type) {
		let artillery = enemyArtilleries.get();
		if (artillery) {
			artilleryEnemyCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, true, artilleryIndex, type);
		}
	}

	placeBlacks() {
		let black;
		let x = isBlue ? 225 : 25, y = 0;
		for (let i = 0; i < 16; i++) {
			y = 25;
			for (let j = 0; j < 12; j++) {
				black = blacks.get();
				black.displayHeight = 50;
				black.displayWidth = 50;
				black.place(y, x);
				y += 50;
			}
			x += 50;
		}
	}

	placeGrays() {
		let gray;
		let x = 225, y = 0;
		for (let i = 0; i < 16; i++) {
			y = 25;
			for (let j = 0; j < 12; j++) {
				gray = grays.get();
				gray.displayHeight = 50;
				gray.displayWidth = 50;
				gray.place(y, x);
				y += 50;
			}
			x += 50;
		}
	}
	//#endregion

	//#region WebSocket

	updateContext() {
		this.updatePlanes();
		this.updateArtilleries();
		this.updateStructures();
	}
	updatePlanes() {

		if (myPlaneOne != null) {
			context.playerSession.planes[0].fuel = myPlaneOne.fuel.toFixed(3);
			context.playerSession.planes[0].armor = myPlaneOne.armor;
			context.playerSession.planes[0].hasBomb = myPlaneOne.withBomb;
			context.playerSession.planes[0].positionX = Math.round(myPlaneOne.x);
			context.playerSession.planes[0].positionY = Math.round(myPlaneOne.y);
			context.playerSession.planes[0].angle = myPlaneOne.planeAngle;
			context.playerSession.planes[0].flying = myPlaneOne.flying;
		}

		if (myPlaneTwo != null) {
			context.playerSession.planes[1].fuel = myPlaneTwo.fuel.toFixed(3);
			context.playerSession.planes[1].armor = myPlaneTwo.armor;
			context.playerSession.planes[1].hasBomb = myPlaneTwo.withBomb;
			context.playerSession.planes[1].positionX = Math.round(myPlaneTwo.x);
			context.playerSession.planes[1].positionY = Math.round(myPlaneTwo.y);
			context.playerSession.planes[1].angle = myPlaneTwo.planeAngle;
			context.playerSession.planes[1].flying = myPlaneTwo.flying;
		}

		if (myPlaneThree != null) {
			context.playerSession.planes[2].fuel = myPlaneThree.fuel.toFixed(3);
			context.playerSession.planes[2].armor = myPlaneThree.armor;
			context.playerSession.planes[2].hasBomb = myPlaneThree.withBomb;
			context.playerSession.planes[2].positionX = Math.round(myPlaneThree.x);
			context.playerSession.planes[2].positionY = Math.round(myPlaneThree.y);
			context.playerSession.planes[2].angle = myPlaneThree.planeAngle;
			context.playerSession.planes[2].flying = myPlaneThree.flying;
		}

		if (myPlaneFour != null) {
			context.playerSession.planes[3].fuel = myPlaneFour.fuel.toFixed(3);
			context.playerSession.planes[3].armor = myPlaneFour.armor;
			context.playerSession.planes[3].hasBomb = myPlaneFour.withBomb;
			context.playerSession.planes[3].positionX = Math.round(myPlaneFour.x);
			context.playerSession.planes[3].positionY = Math.round(myPlaneFour.y);
			context.playerSession.planes[3].angle = myPlaneFour.planeAngle;
			context.playerSession.planes[3].flying = myPlaneFour.flying;

		}

		if (enemyPlaneOne != null) {
			//context.enemySession.planes[0].fuel = enemyPlaneOne.fuel.toFixed(3);
			context.enemySession.planes[0].armor = enemyPlaneOne.armor;
			context.enemySession.planes[0].hasBomb = enemyPlaneOne.withBomb;
			context.enemySession.planes[0].positionX = Math.round(enemyPlaneOne.x);
			context.enemySession.planes[0].positionY = Math.round(enemyPlaneOne.y);
			context.enemySession.planes[0].angle = enemyPlaneOne.planeAngle;
			context.enemySession.planes[0].flying = enemyPlaneOne.flying;
		}

		if (enemyPlaneTwo != null) {
			//context.enemySession.planes[1].fuel = enemyPlaneTwo.fuel.toFixed(3);
			context.enemySession.planes[1].armor = enemyPlaneTwo.armor;
			context.enemySession.planes[1].hasBomb = enemyPlaneTwo.withBomb;
			context.enemySession.planes[1].positionX = Math.round(enemyPlaneTwo.x);
			context.enemySession.planes[1].positionY = Math.round(enemyPlaneTwo.y);
			context.enemySession.planes[1].angle = enemyPlaneTwo.planeAngle;
			context.enemySession.planes[2].flying = enemyPlaneTwo.flying;
		}

		if (enemyPlaneThree != null) {
			//context.enemySession.planes[2].fuel = enemyPlaneThree.fuel.toFixed(3);
			context.enemySession.planes[2].armor = enemyPlaneThree.armor;
			context.enemySession.planes[2].hasBomb = enemyPlaneThree.withBomb;
			context.enemySession.planes[2].positionX = Math.round(enemyPlaneThree.x);
			context.enemySession.planes[2].positionY = Math.round(enemyPlaneThree.y);
			context.enemySession.planes[2].angle = enemyPlaneThree.planeAngle;
			context.enemySession.planes[2].flying = enemyPlaneThree.flying;
		}

		if (enemyPlaneFour != null) {
			//context.enemySession.planes[3].fuel = enemyPlaneFour.fuel.toFixed(3);
			context.enemySession.planes[3].armor = enemyPlaneFour.armor;
			context.enemySession.planes[3].hasBomb = enemyPlaneFour.withBomb;
			context.enemySession.planes[3].positionX = Math.round(enemyPlaneFour.x);
			context.enemySession.planes[3].positionY = Math.round(enemyPlaneFour.y);
			context.enemySession.planes[3].angle = enemyPlaneFour.planeAngle;
			context.enemySession.planes[3].flying = enemyPlaneFour.flying;
		}

		if (enemyPlaneSelected != null) {
			context.enemySession.planes[enemyPlaneSelected.planeIndex - 1].flying = enemyPlaneSelected.flying;
		}

	}

	updateArtilleries() {

		if (myArtilleryOne != null) {
			context.playerSession.artilleries[0].armor = myArtilleryOne.armor;
			context.playerSession.artilleries[0].angle = myArtilleryOne.artilleryAngle;
			context.playerSession.artilleries[0].positionX = myArtilleryOne.x;
			context.playerSession.artilleries[0].positionY = myArtilleryOne.y;
		}

		if (myArtilleryTwo != null) {
			context.playerSession.artilleries[1].armor = myArtilleryTwo.armor;
			context.playerSession.artilleries[1].angle = myArtilleryTwo.artilleryAngle;
			context.playerSession.artilleries[1].positionX = myArtilleryTwo.x;
			context.playerSession.artilleries[1].positionY = myArtilleryTwo.y;
		}

		if (myArtilleryThree != null) {
			context.playerSession.artilleries[2].armor = myArtilleryThree.armor;
			context.playerSession.artilleries[2].angle = myArtilleryThree.artilleryAngle;
			context.playerSession.artilleries[2].positionX = myArtilleryThree.x;
			context.playerSession.artilleries[2].positionY = myArtilleryThree.y;
		}

		if (myArtilleryFour != null) {
			context.playerSession.artilleries[3].armor = myArtilleryFour.armor;
			context.playerSession.artilleries[3].angle = myArtilleryFour.artilleryAngle;
			context.playerSession.artilleries[3].positionX = myArtilleryFour.x;
			context.playerSession.artilleries[3].positionY = myArtilleryFour.y;
		}

		if (enemyArtilleryOne != null) {
			context.enemySession.artilleries[0].armor = enemyArtilleryOne.armor;
			context.enemySession.artilleries[0].angle = enemyArtilleryOne.artilleryAngle;
			context.enemySession.artilleries[0].positionX = enemyArtilleryOne.x;
			context.enemySession.artilleries[0].positionY = enemyArtilleryOne.y;
		}

		if (enemyArtilleryTwo != null) {
			context.enemySession.artilleries[1].armor = enemyArtilleryTwo.armor;
			context.enemySession.artilleries[1].angle = enemyArtilleryTwo.artilleryAngle;
			context.enemySession.artilleries[1].positionX = enemyArtilleryTwo.x;
			context.enemySession.artilleries[1].positionY = enemyArtilleryTwo.y;
		}

		if (enemyArtilleryThree != null) {
			context.enemySession.artilleries[2].armor = enemyArtilleryThree.armor;
			context.enemySession.artilleries[2].angle = enemyArtilleryThree.artilleryAngle;
			context.enemySession.artilleries[2].positionX = enemyArtilleryThree.x;
			context.enemySession.artilleries[2].positionY = enemyArtilleryThree.y;
		}

		if (enemyArtilleryFour != null) {
			context.enemySession.artilleries[3].armor = enemyArtilleryFour.armor;
			context.enemySession.artilleries[3].angle = enemyArtilleryFour.artilleryAngle;
			context.enemySession.artilleries[3].positionX = enemyArtilleryFour.x;
			context.enemySession.artilleries[3].positionY = enemyArtilleryFour.y;
		}

	}

	updateStructures() {
		if (myFuel != null) {
			context.playerSession.activeFuel = !myFuel.destroyed;
		}
		if (myHangar != null) {
			context.playerSession.activeHangar = !myHangar.destroyed;
		}
		if (myTower != null) {
			context.playerSession.activeTower = !myTower.destroyed;
		}

		if (enemyFuel != null) {
			context.enemySession.activeFuel = !enemyFuel.destroyed;
		}
		if (enemyHangar != null) {
			context.enemySession.activeHangar = !enemyHangar.destroyed;
		}
		if (enemyTower != null) {
			context.enemySession.activeTower = !enemyTower.destroyed;
		}

	}

	syncMove(planeViewX) {
		let planePosition = [myPlaneSelected.x, myPlaneSelected.y, myPlaneSelected.planeAngle];
		let message = context.messagesFormat.syncMove(myPlaneSelected.planeIndex, planePosition, planeViewX);
		context.functions.sendMessage(message);
	}

	syncShoot() {
		let message = context.messagesFormat.syncShoot(myPlaneSelected.planeIndex);
		context.functions.sendMessage(message);
	}

	syncBomb() {
		let message = context.messagesFormat.syncBomb(myPlaneSelected.planeIndex);
		context.functions.sendMessage(message);
	}

	syncTakeOff(takeOff) {

		let message = context.messagesFormat.syncTakeOff(myPlaneSelected.planeIndex, takeOff);
		context.functions.sendMessage(message);


	}

	syncPlaneViewX(index, x) {
		if (clearMap) {
			let message = context.messagesFormat.syncPlaneViewX(index, x);
			context.functions.sendMessage(message);
		}

	}
	//#endregion

	//#region Vista lateral

	resizePlaneView(p, width) {
		p.displayHeight = p.displayHeight * width / p.displayWidth;
		p.displayWidth = width;
	}

	checkPlaneView(enemy, planeIndex) {
		let planeView = null;
		switch (planeIndex) {
			case 1:
				planeView = enemy ? enemyPlaneOneView : myPlaneOneView
				break;
			case 2:
				planeView = enemy ? enemyPlaneTwoView : myPlaneTwoView
				break;
			case 3:
				planeView = enemy ? enemyPlaneThreeView : myPlaneThreeView
				break;
			case 4:
				planeView = enemy ? enemyPlaneFourView : myPlaneFourView
				break;
		}
		return planeView;
	}

	changeHighFlyPlaneView(from, to, plane) {
		let i = from < to ? from : to;
		let j = from < to ? to : from;
		for (i; i <= to; i++) {
			plane.y = i;
		}

	}
	changeFlyYPlaneView(plane, isEnemy) {
		let planeView = this.checkPlaneView(isEnemy, plane.planeIndex);
		if (planeView != null) {
			if (plane.y > 200 && plane.y < 400 && planeView.displayWidth != 40) {
				this.resizePlaneView(planeView, 40);
			}
			else if (plane.y < 200 && planeView.displayWidth >= 40) {
				this.resizePlaneView(planeView, 25);
			}
			else if (plane.y > 400 && planeView.displayWidth <= 40) {
				this.resizePlaneView(planeView, 55);
			}
		}
	}
	changeFlyXPlaneView(enemy, isRight, plane, delta) {

		if (plane != null) {
			let planeView = this.checkPlaneView(enemy, plane.planeIndex);
			if (planeView != null && plane.x > 0) {
				//let speedK = plane.speed == 100 ? 3.2 : plane.speed < 100 ? 4.3 : 2.6;

				if (isRight && planeView.x < 1305) {
					planeView.x += (plane.speed * delta) / 3;
					if (isBlue) {
						planeView.setTexture("PlaneRightBlueView")
					}
					else {
						planeView.setTexture("PlaneRightRedView")
					}
				}
				else if (!isRight && planeView.x > 1035) {
					planeView.x -= (plane.speed * delta) / 3;
					if (isBlue) {
						planeView.setTexture("PlaneLeftBlueView")
					}
					else {
						planeView.setTexture("PlaneLeftRedView")
					}
				}
				this.syncPlaneViewX(plane.planeIndex, Math.round(planeView.x));
			}
		}
	}

	destroyPlaneView(isEnemy, planeIndex) {
		let planeView = scene.checkPlaneView(isEnemy, planeIndex);
		if (planeView != null) {
			planeView.destroy();
		}
	}
	//#endregion
}
