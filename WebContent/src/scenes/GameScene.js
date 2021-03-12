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
import { BLUE_BASE_X_VIEW, MINUS_X, MINUS_Y, MORE_X, MORE_Y, RED_BASE_X_VIEW, RED_SAFE_ZONE_X, RED_BASE_X, BLUE_PLANE_HIGH_VIEW_Y, BLUE_PLANE_LOW_VIEW_Y, RED_PLANE_HIGH_VIEW_Y, RED_PLANE_LOW_VIEW_Y, BLUE_PLANE_LAND_VIEW_Y, RED_PLANE_LAND_VIEW_Y, LANDED, UNSELECT } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { BLUE_SAFE_ZONE_X, BLUE_PLANE_X, BLUE_BASE_X, BLUE_ARTILLERY_X_VIEW } from '../constants/GameConstants.js';



//#region Variables
let scene;
//Bandera para saber el bando del jugador
let isBlue;
//Bandera para saber si se dibujaron los elementos del enemigo
let enemyDraw = false;

//Variables para determinar fin de juego
let myStructuresCount, myPlanesCount;
let enemyStructuresCount, enemyPlanesCount;
let gameOver = false;

//Teclas a capturar
let keyA, keyOne, keyTwo, keyThree, keyFour, keyD, keyS;
let cursors;

//Constantes de colores para mensajes
const COLOR_SUCCESS = 0x008025;
const COLOR_DANGER = 0xFF0000;
const COLOR_WARNING = 0xE2D510;

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
			url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
			sceneKey: 'rexUI'
		});

		//Carga de imagenes
		this.load.image('field', 'assets/field.jpg');
		this.load.image('black', 'assets/black.png');
		this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
		this.load.atlas('spritesBase', 'assets/base.png', 'assets/base.json');
		this.load.image('bullet', './assets/Bullet3.png');
		this.load.image("fuel", "./assets/fuel.png");
		this.load.image("hangar", "./assets/hangar.png");
		this.load.image("tower", "./assets/tower.png");
		this.load.image("artillery", "./assets/artillery.png");
		this.load.image("bulletArtillery", "./assets/bullet.png");
		this.load.image("bomb", "./assets/bomb.png");
		this.load.image("border", "./assets/border.png");
		this.load.image("borderView", "./assets/border2.png");
		this.load.image("ledRed", "./assets/led.png");
		this.load.image("ledGreen", "./assets/led_green.png");
		this.load.image("view", "./assets/view.png");
		this.load.image("dashboard", "./assets/dashboard.png");

		this.load.image("bombardero_azul_aterrizado", "./assets/planes/bombardero_azul_aterrizado.png");
		this.load.image("bombardero_azul_default", "./assets/planes/bombardero_azul_default.png");
		this.load.image("bombardero_azul_eliminado", "./assets/planes/bombardero_azul_eliminado.png");
		this.load.image("bombardero_azul_volando", "./assets/planes/bombardero_azul_volando.png");
		this.load.image("bombardero_rojo_aterrizado", "./assets/planes/bombardero_rojo_aterrizado.png");
		this.load.image("bombardero_rojo_eliminado", "./assets/planes/bombardero_rojo_eliminado.png");
		this.load.image("bombardero_rojol_default", "./assets/planes/bombardero_rojol_default.png");
		this.load.image("bombardero_rojol_volando", "./assets/planes/bombardero_rojol_volando.png");
		this.load.image("caza_azul_aterrizado", "./assets/planes/caza_azul_aterrizado.png");
		this.load.image("caza_azul_default", "./assets/planes/caza_azul_default.png");
		this.load.image("caza_azul_eliminado", "./assets/planes/caza_azul_eliminado.png");
		this.load.image("caza_azul_volando", "./assets/planes/caza_azul_volando.png");
		this.load.image("caza_rojo_aterrizado", "./assets/planes/caza_rojo_aterrizado.png");
		this.load.image("caza_rojo_default", "./assets/planes/caza_rojo_default.png");
		this.load.image("caza_rojo_eliminado", "./assets/planes/caza_rojo_eliminado.png");
		this.load.image("caza_rojo_volando", "./assets/planes/caza_rojo_volando.png");
		this.load.image("patrulla_azul_default", "./assets/planes/patrulla_azul_default.png");
		this.load.image("patrulla_azul_eliminado", "./assets/planes/patrulla_azul_eliminado.png");
		this.load.image("patrulla_rojo_default", "./assets/planes/patrulla_rojo_default.png");
		this.load.image("patrulla_rojo_eliminado", "./assets/planes/patrulla_rojo_eliminado.png");
		this.load.image("patrullero_azul_aterrizado", "./assets/planes/patrullero_azul_aterrizado.png");
		this.load.image("patrullero_azul_volando", "./assets/planes/patrullero_azul_volando.png");
		this.load.image("patrullero_rojo_aterrizado", "./assets/planes/patrullero_rojo_aterrizado.png");
		this.load.image("patrullero_rojo_volando", "./assets/planes/patrullero_rojo_volando.png");
		this.load.image("reconocimiento_azul_aterrizado", "./assets/planes/reconocimiento_azul_aterrizado.png");
		this.load.image("reconocimiento_azul_default", "./assets/planes/reconocimiento_azul_default.png");
		this.load.image("reconocimiento_azul_eliminado", "./assets/planes/reconocimiento_azul_eliminado.png");
		this.load.image("reconocimiento_azul_volando", "./assets/planes/reconocimiento_azul_volando.png");
		this.load.image("reconocimiento_rojo_aterrizado", "./assets/planes/reconocimiento_rojo_aterrizado.png");
		this.load.image("reconocimiento_rojo_default", "./assets/planes/reconocimiento_rojo_default.png");
		this.load.image("reconocimiento_rojo_eliminado", "./assets/planes/reconocimiento_rojo_eliminado.png");
		this.load.image("reconocimiento_rojo_volando", "./assets/planes/reconocimiento_rojo_volando.png");





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

		this.load.image("savegame_button", "assets/save-game-button.png");
	}

	create() {
		scene = this;
		enemyPlanesCount = 0; enemyStructuresCount = 0;
		myPlanesCount = 0; myStructuresCount = 0;
		this.add.image(1180, 140, 'fieldView').setScale(0.4);
		this.add.image(1178, 460, 'dashboard').setScale(0.27);
		this.add.image(500, 300, 'field');

		isBlue = context.playerSession.teamSide == 1

		this.captureKeys();

		var saveGameButton = this.add.image(context.game.renderer.width * 0.85, context.game.renderer.height * 0.94, "savegame_button").setDepth(0);
		saveGameButton.setInteractive();

		saveGameButton.on('pointerdown', function () {

			console.log("SAVING");
			var message = context.messagesFormat.saveGame(context.playerSession, context.enemySession);
			context.functions.sendMessage(message);

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
		border.place(50, 800, true, isBlue);
		border = borders.get();
		border.place(50, 200, true, !isBlue);

		cursors = this.input.keyboard.createCursorKeys();

		//this.placeGrays();
		//this.placeBlacks();


		let graphics = this.add.graphics();
		let path;

		graphics = this.add.graphics();
		path = this.add.path(1000, 300);
		path.lineTo(1400, 300);
		graphics.lineStyle(3, 0xffffff, 1);
		path.draw(graphics);


		//Frontera externa
		border = borders.get();
		border.place(50, 1005, false);

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
			context.teamSideWin = 1; //cambiar segun quien gano
			context.gameStatus = "FINALIZADA";
			context.functions.navigateScene("GAME", "FINISHGAME");
		} else {
			if (this.existsEnemySession()) {
				this.checkEnemyAction(time);
			}

			//Selección de avión
			if (Phaser.Input.Keyboard.JustDown(keyOne)) {
				if (myPlaneOne.scene) {
					this.selectPlane(myPlaneOne);
				}
			}
			else if (Phaser.Input.Keyboard.JustDown(keyTwo)) {
				if (myPlaneTwo.scene) {
					this.selectPlane(myPlaneTwo);
				}
			}
			else if (Phaser.Input.Keyboard.JustDown(keyThree)) {
				if (myPlaneThree.scene) {
					this.selectPlane(myPlaneThree);
				}
			}
			else if (Phaser.Input.Keyboard.JustDown(keyFour)) {
				if (myPlaneFour.scene) {
					this.selectPlane(myPlaneFour);
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
									this.changeFlyYPlaneView(planeView.y, isBlue ? BLUE_PLANE_LAND_VIEW_Y : RED_PLANE_LAND_VIEW_Y, planeView);
									this.syncTakeOff(false);
								}
							}
							if (isBlue) {
								if (myPlaneSelected.x < BLUE_SAFE_ZONE_X) {
									this.fuelControl();
									this.checkBomb();
									highFlyPlaneText.setText('');
									infoGameText.setText("Presione (F) para despegar avión");
								} else {
									infoGameText.setText("Vuelva a la base para aterrizar");
								}
							} else {
								if (myPlaneSelected.x > RED_SAFE_ZONE_X) {
									this.fuelControl();
									this.checkBomb();
									highFlyPlaneText.setText('');
									infoGameText.setText("Presione (F) para despegar avión");
								} else {
									infoGameText.setText("Vuelva a la base para aterrizar");
								}
							}
						} else {
							let planeView = this.checkPlaneView(false, myPlaneSelected.planeIndex);
							if (planeView != null) {
								this.changeFlyYPlaneView(planeView.y, isBlue ? BLUE_PLANE_LOW_VIEW_Y : RED_PLANE_LOW_VIEW_Y, planeView);
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
									this.changeFlyYPlaneView(planeView.y, myPlaneSelected.highFly ? isBlue ? BLUE_PLANE_HIGH_VIEW_Y : RED_PLANE_HIGH_VIEW_Y : isBlue ? BLUE_PLANE_LOW_VIEW_Y : RED_PLANE_LOW_VIEW_Y, planeView);
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
					if (myPlaneSelected.x < isBlue ? BLUE_SAFE_ZONE_X : RED_SAFE_ZONE_X) {
						myPlaneSelected.gray = null;
					}
					//Movimiento de avión
					if (cursors.left.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(true, ANGLE_270, MINUS_X, delta);
							this.changeFlyXPlaneView(false, false, myPlaneSelected, delta);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					} else if (cursors.right.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(true, ANGLE_90, MORE_X, delta);
							this.changeFlyXPlaneView(false, true, myPlaneSelected, delta);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}
					}
					if (cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, delta);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					} else if (cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(true, ANGLE_180, MORE_Y, delta);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.left.isDown && cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(false, ANGLE_315, null, null);
							this.changeFlyXPlaneView(false, false, null, null);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.left.isDown && cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(false, ANGLE_225, null, null);
							this.changeFlyXPlaneView(false, false, null, null);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}

					}
					if (cursors.right.isDown && cursors.down.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(false, ANGLE_135, null, null);
							this.changeFlyXPlaneView(false, true, null, null);
							this.syncMove();
						}
						else {
							infoGameText.setText("Tiene que despegar (D)");
						}
					}
					if (cursors.right.isDown && cursors.up.isDown) {
						if (myPlaneSelected.flying) {
							this.fuelControl();
							myPlaneSelected.fly(false, ANGLE_45, null, null);
							this.changeFlyXPlaneView(false, true, null, null);
							this.syncMove();
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
									myPlaneSelected.fire(time, myBullets);
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
	createText() {
		//Led indicadores Bomba
		ledRedBomb = this.add.image(1062, 338, 'ledRed');
		ledRedBomb.setScale(0.05);
		ledRedBomb.setVisible(false);
		ledGreenBomb = this.add.image(1062, 338, 'ledGreen');
		ledGreenBomb.setScale(0.025);
		ledGreenBomb.setVisible(false);

		//Led indicador Hangar
		ledRedHangar = this.add.image(1062, 452, 'ledRed');
		ledRedHangar.setScale(0.05);
		ledRedHangar.setVisible(true);
		ledGreenHangar = this.add.image(1062, 452, 'ledGreen');
		ledGreenHangar.setScale(0.025);
		ledGreenHangar.setVisible(false);


		//Led indicador Tanque Combustible
		ledRedFuel = this.add.image(1062, 467, 'ledRed');
		ledRedFuel.setScale(0.05);
		ledRedFuel.setVisible(true);
		ledGreenFuel = this.add.image(1062, 467, 'ledGreen');
		ledGreenFuel.setScale(0.025);
		ledGreenFuel.setVisible(false);

		//Led indicador Torre
		ledRedTower = this.add.image(1062, 437, 'ledRed');
		ledRedTower.setScale(0.05);
		ledRedTower.setVisible(true);
		ledGreenTower = this.add.image(1062, 437, 'ledGreen');
		ledGreenTower.setScale(0.025);
		ledGreenTower.setVisible(false);

		//Led indicador Hangar Enemigo
		ledRedHangarEnemy = this.add.image(1242, 452, 'ledRed');
		ledRedHangarEnemy.setScale(0.05);
		ledRedHangarEnemy.setVisible(true);
		ledGreenHangarEnemy = this.add.image(1242, 452, 'ledGreen');
		ledGreenHangarEnemy.setScale(0.025);
		ledGreenHangarEnemy.setVisible(false);


		//Led indicador Tanque Combustible Enemigo
		ledRedFuelEnemy = this.add.image(1242, 467, 'ledRed');
		ledRedFuelEnemy.setScale(0.05);
		ledRedFuelEnemy.setVisible(true);
		ledGreenFuelEnemy = this.add.image(1242, 467, 'ledGreen');
		ledGreenFuelEnemy.setScale(0.025);
		ledGreenFuelEnemy.setVisible(false);

		//Led indicador Torre Enemigo
		ledRedTowerEnemy = this.add.image(1242, 437, 'ledRed');
		ledRedTowerEnemy.setScale(0.05);
		ledRedTowerEnemy.setVisible(true);
		ledGreenTowerEnemy = this.add.image(1242, 437, 'ledGreen');
		ledGreenTowerEnemy.setScale(0.025);
		ledGreenTowerEnemy.setVisible(false);


		//Aviones Consola
		consolePlane1 = this.add.image(1040, 520, 'plane');
		consolePlane1.setScale(0.3);
		plane1ArmorText = this.add.text(1025, 535, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane2 = this.add.image(1120, 520, 'plane');
		consolePlane2.setScale(0.3);
		plane2ArmorText = this.add.text(1105, 535, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane3 = this.add.image(1200, 520, 'plane');
		consolePlane3.setScale(0.3);
		plane3ArmorText = this.add.text(1185, 535, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane4 = this.add.image(1280, 520, 'plane');
		consolePlane4.setScale(0.3);
		plane4ArmorText = this.add.text(1265, 535, '', { fontSize: '15px', fill: '#FFFFFF' });

		myPlaneSelectedText = this.add.text(1010, 301, '', { fontSize: '11px', fill: '#FFFFFF', });
		fuelText = this.add.text(1010, 316, '', { fontSize: '11px', fill: '#FFFFFF' });
		bombText = this.add.text(1010, 331, '', { fontSize: '11px', fill: '#FFFFFF' });
		highFlyPlaneText = this.add.text(1010, 346, '', { fontSize: '11px', fill: '#FFFF00' });
		infoGameText = this.add.text(1010, 361, 'Presione (1) (2) (3) (4) para seleccionar avión', { fontSize: '11px', fill: '#FF0000' });

		myBaseText = this.add.text(1010, 400, 'Base Aliada', { fontSize: '13px', fill: '#009025' });
		artilleryText = this.add.text(1010, 415, '', { fontSize: '11px', fill: '#FFFFFF' });
		towerText = this.add.text(1010, 430, 'Torre', { fontSize: '11px', fill: '#FFFFFF' });
		hangarText = this.add.text(1010, 445, 'Hangar', { fontSize: '11px', fill: '#FFFFFF' });
		fuelsText = this.add.text(1010, 460, 'Tanque', { fontSize: '11px', fill: '#FFFFFF' });

		enemyBaseText = this.add.text(1190, 400, 'Base Enemiga', { fontSize: '13px', fill: '#009025' });
		artilleryEnemyText = this.add.text(1190, 415, '', { fontSize: '11px', fill: '#FFFFFF' });
		towerEnemyText = this.add.text(1190, 430, 'Torre', { fontSize: '11px', fill: '#FFFFFF' });
		hangarEnemyText = this.add.text(1190, 445, 'Hangar', { fontSize: '11px', fill: '#FFFFFF' });
		fuelsEnemyText = this.add.text(1190, 460, 'Tanque', { fontSize: '11px', fill: '#FFFFFF' });
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
		if (myPlaneOne.armor <= 0) {
			consolePlane1.setVisible(false);
			plane1ArmorText.setText('');
		} else {
			plane1ArmorText.setText(myPlaneOne.armor);
		}
		if (myPlaneTwo.armor <= 0) {
			consolePlane2.setVisible(false);
			plane2ArmorText.setText('');
		} else {
			plane2ArmorText.setText(myPlaneTwo.armor);
		}
		if (myPlaneThree.armor <= 0) {
			consolePlane3.setVisible(false);
			plane3ArmorText.setText('');
		} else {
			plane3ArmorText.setText(myPlaneThree.armor);
		}
		if (myPlaneFour.armor <= 0) {
			consolePlane4.setVisible(false);
			plane4ArmorText.setText('');
		} else {
			plane4ArmorText.setText(myPlaneFour.armor);
		}

	}

	loadConsole() {
		if (myPlaneSelected == myPlaneOne) {
			consolePlane1.setTexture(myPlaneOne.getImage(LANDED));
		} else {
			consolePlane1.setTexture(myPlaneOne.getImage(UNSELECT));
		}
		if (myPlaneSelected == myPlaneTwo) {
			consolePlane2.setTexture(myPlaneTwo.getImage(LANDED));
		} else {
			consolePlane2.setTexture(myPlaneTwo.getImage(UNSELECT));
		}
		if (myPlaneSelected == myPlaneThree) {
			consolePlane3.setTexture(myPlaneThree.getImage(LANDED));
		} else {
			consolePlane3.setTexture(myPlaneThree.getImage(UNSELECT));
		}
		if (myPlaneSelected == myPlaneFour) {
			consolePlane4.setTexture(myPlaneFour.getImage(LANDED));
		} else {
			consolePlane4.setTexture(myPlaneFour.getImage(UNSELECT));
		}
		infoGameText.setText("Presione (F) para despegar avión");
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
				p.fire(time, enemyBullets);
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
			}
		}

		if (context.enemySession.isTakeOff) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeTakeOff);
			let takeOff = context.enemySession.takeOff;
			context.enemySession.isTakeOff = false;
			context.enemySession.planeTakeOff = -1;
			if (p != null) {
				enemyPlaneSelected = p;
				let planeView = this.checkPlaneView(true, enemyPlaneSelected.planeIndex);
				if (planeView != null) {
					let position = takeOff == 'true' ? isBlue ? RED_PLANE_LOW_VIEW_Y : BLUE_PLANE_LOW_VIEW_Y : isBlue ? RED_PLANE_LAND_VIEW_Y : BLUE_PLANE_LAND_VIEW_Y;
					this.changeFlyYPlaneView(planeView.y, position, planeView);
				}
			}
		}

		if (context.enemySession.isHighFlying) {
			let p = this.checkEnemyPlaneAction(context.enemySession.planeHighFly);
			context.enemySession.isHighFlying = false;
			context.enemySession.planeHighFly = -1;
			if (p != null) {
				p.highFlyPlane(false);
				enemyPlaneSelected = p;
				let planeView = this.checkPlaneView(true, enemyPlaneSelected.planeIndex);
				if (planeView) {
					this.changeFlyYPlaneView(planeView.y, enemyPlaneSelected.highFly ? isBlue ? RED_PLANE_HIGH_VIEW_Y : BLUE_PLANE_HIGH_VIEW_Y : isBlue ? RED_PLANE_LOW_VIEW_Y : BLUE_PLANE_LOW_VIEW_Y, planeView);
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

		enemyPlaneSelected.y = coord[1];
		enemyPlaneSelected.x = coord[0];
		enemyPlaneSelected.planeAngle = coord[2];
		enemyPlaneSelected.angle = coord[2];
	}

	existsEnemySession() {
		return context.enemySession.id != undefined;
	}

	existsPlayerSession() {
		return context.playerSession.id != undefined;
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
					if (myPlaneOne.scene) { this.unselectPlane(myPlaneOne); };
					if (myPlaneTwo.scene) { this.unselectPlane(myPlaneTwo); };
					if (myPlaneThree.scene) { this.unselectPlane(myPlaneThree); };
					if (myPlaneFour.scene) { this.unselectPlane(myPlaneFour); };
					myPlaneSelected = p;
					myPlaneSelected.angle = angle;
					myPlaneSelected.planeAngle = angle;
					myPlaneSelected.flying = false;
					myPlaneSelected.setTexture(myPlaneSelected.getImage(LANDED));
					myPlaneSelectedText.setText('Avión #' + p.planeIndex);
					//Info en Consola
					this.loadConsole();
				}
				else {
					console.log("No puede volar");
				}

			}
		}
	}

	unselectPlane(p) {
		p.setTexture(p.getImage(UNSELECT));
		p.flying = false;
	}

	checkOtherPlaneFlying(p) {
		let oneFlying = false, twoFlying = false, threeFlying = false, fourFlying = false
		if (p != myPlaneOne) {
			oneFlying = myPlaneOne.flying;
		}
		if (p != myPlaneTwo) {
			twoFlying = myPlaneTwo.flying;
		}
		if (p != myPlaneThree) {
			threeFlying = myPlaneThree.flying;
		}
		if (p != myPlaneFour) {
			fourFlying = myPlaneFour.flying;
		}
		return oneFlying || twoFlying || threeFlying || fourFlying;
	}

	checkAllArtilleryFire(time) {
		if (myPlaneSelected != null && myPlaneSelected.armor > 0) {
			this.checkArtilleryFire(time, enemyArtilleryOne, myPlaneSelected, enemyBulletsArtillery);
			this.checkArtilleryFire(time, enemyArtilleryTwo, myPlaneSelected, enemyBulletsArtillery);
			this.checkArtilleryFire(time, enemyArtilleryThree, myPlaneSelected, enemyBulletsArtillery);
			this.checkArtilleryFire(time, enemyArtilleryFour, myPlaneSelected, enemyBulletsArtillery);
		}


		if (enemyPlaneSelected != null && enemyPlaneSelected.armor > 0) {
			this.checkArtilleryFire(time, myArtilleryOne, enemyPlaneSelected, myBulletsArtillery);
			this.checkArtilleryFire(time, myArtilleryTwo, enemyPlaneSelected, myBulletsArtillery);
			this.checkArtilleryFire(time, myArtilleryThree, enemyPlaneSelected, myBulletsArtillery);
			this.checkArtilleryFire(time, myArtilleryFour, enemyPlaneSelected, myBulletsArtillery);
		}
		this.checkPlanesArmor();
	}

	checkArtilleryFire(time, artillery, plane, bullets) {
		let angle;
		if (time > artillery.nextTic && artillery.armor > 0) {
			if (Phaser.Math.Distance.Between(artillery.x, artillery.y, plane.x, plane.y) < artillery.reach) {
				angle = Phaser.Math.Angle.Between(artillery.x, artillery.y, plane.x, plane.y);
				if (!plane.highFly) {
					artillery.fire(time, angle, bullets);
					this.checkPlanesArmor();
				}
			}
		}
	}

	checkMyTowersFire(time) {
		let angle;
		if (enemyPlaneSelected != null && enemyPlaneSelected.armor > 0) {
			if (time > myTower.nextTic && !myTower.destroyed) {
				if (Phaser.Math.Distance.Between(myTower.x, myTower.y, enemyPlaneSelected.x, enemyPlaneSelected.y) < 300) {
					angle = Phaser.Math.Angle.Between(myTower.x, myTower.y, enemyPlaneSelected.x, enemyPlaneSelected.y);
					if (!enemyPlaneSelected.highFly) {
						myTower.fire(time, angle, myBulletsArtillery);
						this.checkPlanesArmor();
					}
				}
			}
		}
	}
	checkEnemyTowerFire(time) {
		let angle;
		if (myPlaneSelected != null && myPlaneSelected.armor > 0) {
			if (time > enemyTower.nextTic && !enemyTower.destroyed) {
				if (Phaser.Math.Distance.Between(enemyTower.x, enemyTower.y, myPlaneSelected.x, myPlaneSelected.y) < 300) {
					angle = Phaser.Math.Angle.Between(enemyTower.x, enemyTower.y, myPlaneSelected.x, myPlaneSelected.y);
					if (!myPlaneSelected.highFly) {
						enemyTower.fire(time, angle, enemyBulletsArtillery);
						this.checkPlanesArmor();
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
		}
	}


	damageMyPlane(bullet, plane) {
		if (plane.active === true && bullet.active === true) {
			if ((bullet.frame.texture.key == 'bullet' && plane.flying) || (bullet.frame.texture.key == "bulletArtillery" && !plane.highFly)) {
				let message;
				let color;
				if (plane.receiveDamage(bullet.damage)) {
					message = "Avión aliado destruido";
					color = COLOR_DANGER;
					let planeView = scene.checkPlaneView(false, plane.planeIndex);
					if (planeView != null) {
						planeView.destroy();
					}
					myPlanesCount -= 1;
				}
				else {
					message = "Avión aliado dañado";
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
					scene.createMessage("Avión enemigo destruido", COLOR_SUCCESS);
					let planeView = scene.checkPlaneView(true, plane.planeIndex);
					if (planeView != null) {
						planeView.destroy();
					}
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
			if (structure.frame.name == 'tower') {
				ledGreenTower.setVisible(false);
				ledRedTower.setVisible(true);
				message = "Torre aliada destruida";
				myTowerView.destroy();
			} else if (structure.frame.texture.key == 'fuel') {
				ledGreenFuel.setVisible(false);
				ledRedFuel.setVisible(true);
				message = "Tanque aliado destruido";
				myFuelView.destroy();
			} else if (structure.frame.texture.key == 'hangar') {
				ledGreenHangar.setVisible(false);
				ledRedHangar.setVisible(true);
				message = "Hangar aliado destruido";
				myHangarView.destroy();
			}
			myStructuresCount -= 1;
			bomb.destroy();
			structure.destroy();
			structure.destroyed = true;
			structure = false;
			scene.createMessage(message, COLOR_DANGER);
			if (myStructuresCount == 0) {
				scene.gameOver = true;
			}
		}
	}

	damageEnemyStructure(bomb, structure) {
		if (structure.active === true && bomb.active === true) {
			let message;
			if (structure.frame.name == 'tower') {
				ledGreenTowerEnemy.setVisible(false);
				ledRedTowerEnemy.setVisible(true);
				message = "Torre enemiga destruida";
				enemyTowerView.destroy();
			} else if (structure.frame.texture.key == 'fuel') {
				ledGreenFuelEnemy.setVisible(false);
				ledRedFuelEnemy.setVisible(true);
				message = "Tanque enemigo destruido";
				enemyFuelView.destroy();
			} else if (structure.frame.texture.key == 'hangar') {
				ledGreenHangarEnemy.setVisible(false);
				ledRedHangarEnemy.setVisible(true);
				message = "Hangar enemigo destruido";
				enemyHangarView.destroy();
			}
			bomb.destroy();
			structure.destroy();
			structure.destroyed = true;
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
				plane.x = 965;
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
				hold: 1200,
				out: 200,
			},
		});
		toast.show(message);
	}
	placeEnemyElements() {
		let yFuel = 0, yTower = 0, yHangar = 0;
		let xFuel = 0, xTower = 0, xHangar = 0;

		if (context.enemySession.activeFuel) {
			yFuel = context.enemySession.positionYFuel;
			xFuel = context.enemySession.positionXFuel;

			enemyFuel = enemyFuels.get();
			enemyFuel.place(yFuel, isBlue ? xFuel - 190 : xFuel - 1030);
			enemyStructuresCount += 1;
			enemyFuelView = this.add.image(isBlue ? RED_BASE_X_VIEW + 10 : BLUE_BASE_X_VIEW + 8, 270, isBlue ? 'fuelRedView' : 'fuelBlueView').setScale(0.25);
		}

		if (context.enemySession.activeTower) {
			yTower = context.enemySession.positionYTower;
			xTower = context.enemySession.positionXTower;

			enemyTower = enemyTowers.get();
			enemyTower.place(yTower, isBlue ? xTower - 190 : xTower - 1030);
			enemyStructuresCount += 1;
			enemyTowerView = this.add.image(isBlue ? RED_BASE_X_VIEW + 18 : BLUE_BASE_X_VIEW, 268, isBlue ? 'towerRedView' : 'towerBlueView').setScale(0.4);
		}

		if (context.enemySession.activeHangar) {
			yHangar = context.enemySession.positionYHangar;
			xHangar = context.enemySession.positionXHangar;

			enemyHangar = enemyHangars.get();
			enemyHangar.place(yHangar, isBlue ? xHangar - 190 : xHangar - 1030);
			enemyStructuresCount += 1;
			enemyHangarView = this.add.image(isBlue ? RED_BASE_X_VIEW : BLUE_BASE_X_VIEW + 18, 275, isBlue ? 'hangarRedView' : 'hangarBlueView').setScale(0.3);
		}

		this.placeEnemyArtilleries();
		this.placeEnemyPlanes();

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
				enemyArtilleryOne = this.placeEnemyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower, 1);
				enemyArtilleryOneView = this.add.image(isBlue ? enemyArtilleryOne.x + 425 : enemyArtilleryOne.x + 925, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[1].armor > 0) {
				enemyArtilleryTwo = this.placeEnemyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[1].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower, 2);
				enemyArtilleryTwoView = this.add.image(isBlue ? enemyArtilleryTwo.x + 423 : enemyArtilleryTwo.x + 927, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[2].armor > 0) {
				enemyArtilleryThree = this.placeEnemyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[2].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower, 3);
				enemyArtilleryThreeView = this.add.image(isBlue ? enemyArtilleryThree.x + 421 : enemyArtilleryThree.x + 929, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
			if (artilleryServer[3].armor > 0) {
				enemyArtilleryFour = this.placeEnemyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[3].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower, 4);
				enemyArtilleryFourView = this.add.image(isBlue ? enemyArtilleryFour.x + 419 : enemyArtilleryFour.x + 931, 280, isBlue ? 'artilleryRedView' : 'artilleryBlueView').setScale(0.15);
			}
		}
	}

	placeMyElements() {

		let yFuel = 0, yTower = 0, yHangar = 0;
		let xFuel = 0, xTower = 0, xHangar = 0;
		if (context.playerSession.activeFuel) {
			yFuel = context.playerSession.positionYFuel;
			xFuel = context.playerSession.positionXFuel;
			myFuel = myFuels.get();
			myFuel.place(yFuel, isBlue ? xFuel - 1030 : xFuel - 190);
			myStructuresCount += 1;
			myFuelView = this.add.image(isBlue ? BLUE_BASE_X_VIEW + 8 : RED_BASE_X_VIEW + 10, 270, isBlue ? 'fuelBlueView' : 'fuelRedView').setScale(0.25);

		}

		if (context.playerSession.activeTower) {
			myTower = myTowers.get();
			yTower = context.playerSession.positionYTower;
			xTower = context.playerSession.positionXTower;
			myTower.place(yTower, isBlue ? xTower - 1030 : xTower - 190);
			myStructuresCount += 1;
			myTowerView = this.add.image(isBlue ? BLUE_BASE_X_VIEW : RED_BASE_X_VIEW + 18, 268, isBlue ? 'towerBlueView' : 'towerRedView').setScale(0.4);

		}

		if (context.playerSession.activeHangar) {
			myHangar = myHangars.get();
			xHangar = context.playerSession.positionXHangar;
			yHangar = context.playerSession.positionYHangar;
			myHangar.place(yHangar, isBlue ? xHangar - 1030 : xHangar - 190);
			myStructuresCount += 1;
			myHangarView = this.add.image(isBlue ? BLUE_BASE_X_VIEW + 18 : RED_BASE_X_VIEW, 275, isBlue ? 'hangarBlueView' : 'hangarRedView').setScale(0.3);

		}

		this.placeMyPlanes();
		this.placeMyArtilleries();

		this.physics.add.overlap(enemyBombs, myHangars, this.damageMyStructure);
		this.physics.add.overlap(enemyBombs, myTowers, this.damageMyStructure);
		this.physics.add.overlap(enemyBombs, myFuels, this.damageMyStructure);
	}
	placeMyPlanes() {
		if (context.playerSession.planes != undefined) {
			let planesServer = context.playerSession.planes;
			if (planesServer[0].armor > 0) {
				myPlaneOne = this.placeMyPlane(planesServer[0].positionY, planesServer[0].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[0].fuel, planesServer[0].armor, planesServer[0].speed, planesServer[0].hasBomb, planesServer[0].firePower, 1, planesServer[0].planeType);
				myPlanesCount += 1;
				myPlaneOneView = this.add.image(isBlue ? myPlaneOne.x + 929 : myPlaneOne.x + 421, 280, isBlue ? myPlaneOne.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneOne.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
			}
			if (planesServer[1].armor > 0) {
				myPlaneTwo = this.placeMyPlane(planesServer[1].positionY, planesServer[1].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[1].fuel, planesServer[1].armor, planesServer[1].speed, planesServer[1].hasBomb, planesServer[1].firePower, 2, planesServer[1].planeType);
				myPlanesCount += 1;
				myPlaneTwoView = this.add.image(isBlue ? myPlaneTwo.x + 931 : myPlaneTwo.x + 419, 280, isBlue ? myPlaneTwo.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneTwo.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
			}
			if (planesServer[2].armor > 0) {
				myPlaneThree = this.placeMyPlane(planesServer[2].positionY, planesServer[2].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[2].fuel, planesServer[2].armor, planesServer[2].speed, planesServer[2].hasBomb, planesServer[2].firePower, 3, planesServer[2].planeType);
				myPlanesCount += 1;
				myPlaneThreeView = this.add.image(isBlue ? myPlaneThree.x + 933 : myPlaneThree.x + 417, 280, isBlue ? myPlaneThree.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneThree.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
			}
			if (planesServer[3].armor > 0) {
				myPlaneFour = this.placeMyPlane(planesServer[3].positionY, planesServer[3].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[3].fuel, planesServer[3].armor, planesServer[3].speed, planesServer[3].hasBomb, planesServer[3].firePower, 4, planesServer[3].planeType);
				myPlanesCount += 1;
				myPlaneFourView = this.add.image(isBlue ? myPlaneFour.x + 935 : myPlaneFour.x + 415, 280, isBlue ? myPlaneFour.angle > 180 ? 'PlaneLeftBlueView' : 'PlaneRightBlueView' : myPlaneFour.angle > 180 ? 'PlaneLeftRedView' : 'PlaneLeftRedView').setScale(0.08);
			}

			this.physics.add.collider(myPlanes, borders, this.borderPlane);
			this.physics.add.overlap(myPlanes, blacks, this.exploreBlackMap);
			this.physics.add.overlap(enemyBullets, myPlanes, this.damageMyPlane);
		}
	}

	placeMyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type);
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
		}
	}

	placeEnemyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type) {
		let plane = enemyPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type);
		}
	}
	placeMyArtilleries() {
		if (context.playerSession.artilleries != undefined) {
			let artilleryServer = context.playerSession.artilleries;
			if (artilleryServer[0].armor > 0) {
				myArtilleryOne = this.placeMyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower, 1);
				myArtilleryOneView = this.add.image(isBlue ? myArtilleryOne.x + 925 : myArtilleryOne.x + 425, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[1].armor > 0) {
				myArtilleryTwo = this.placeMyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[0].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower, 2);
				myArtilleryTwoView = this.add.image(isBlue ? myArtilleryTwo.x + 927 : myArtilleryTwo.x + 423, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[2].armor > 0) {
				myArtilleryThree = this.placeMyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[0].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower, 3);
				myArtilleryThreeView = this.add.image(isBlue ? myArtilleryThree.x + 929 : myArtilleryThree.x + 421, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			if (artilleryServer[3].armor > 0) {
				myArtilleryFour = this.placeMyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[0].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower, 4);
				myArtilleryFourView = this.add.image(isBlue ? myArtilleryFour.x + 931 : myArtilleryFour.x + 419, 280, isBlue ? 'artilleryBlueView' : 'artilleryRedView').setScale(0.15);
			}
			this.physics.add.overlap(enemyBulletsArtillery, myPlanes, this.damageMyPlane);
			this.physics.add.overlap(enemyBullets, myArtilleries, this.damageArtillery);
		}
	}

	placeMyArtillery(i, j, cadency, reach, armor, firePower, artilleryIndex) {
		let artillery = myArtilleries.get();
		if (artillery) {
			artilleryCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, false, artilleryIndex);
		}
	}

	placeEnemyArtillery(i, j, cadency, reach, armor, firePower, artilleryIndex) {
		let artillery = enemyArtilleries.get();
		if (artillery) {
			artilleryEnemyCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, true, artilleryIndex);
		}
	}

	placeBlacks() {
		let black;
		let x = 225, y = 0;
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
		let x = 250, y = 50;
		for (let i = 0; i < 8; i++) {
			y = 50;
			for (let j = 0; j < 6; j++) {
				gray = grays.get();
				gray.displayHeight = 102;
				gray.displayWidth = 102;
				gray.place(y, x);
				y += 100;
			}
			x += 100;
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
		context.playerSession.planes[0].fuel = myPlaneOne.fuel;
		context.playerSession.planes[0].armor = myPlaneOne.armor;
		context.playerSession.planes[0].hasBomb = myPlaneOne.withBomb;
		context.playerSession.planes[0].positionX = Math.round(myPlaneOne.x);
		context.playerSession.planes[0].positionY = Math.round(myPlaneOne.y);
		context.playerSession.planes[0].angle = myPlaneOne.planeAngle;

		context.playerSession.planes[1].fuel = myPlaneTwo.fuel;
		context.playerSession.planes[1].armor = myPlaneTwo.armor;
		context.playerSession.planes[1].hasBomb = myPlaneTwo.withBomb;
		context.playerSession.planes[1].positionX = Math.round(myPlaneTwo.x);
		context.playerSession.planes[1].positionY = Math.round(myPlaneTwo.y);
		context.playerSession.planes[1].angle = myPlaneTwo.planeAngle;

		context.playerSession.planes[2].fuel = myPlaneThree.fuel;
		context.playerSession.planes[2].armor = myPlaneThree.armor;
		context.playerSession.planes[2].hasBomb = myPlaneThree.withBomb;
		context.playerSession.planes[2].positionX = Math.round(myPlaneThree.x);
		context.playerSession.planes[2].positionY = Math.round(myPlaneThree.y);
		context.playerSession.planes[2].angle = myPlaneThree.planeAngle;

		context.playerSession.planes[3].fuel = myPlaneFour.fuel;
		context.playerSession.planes[3].armor = myPlaneFour.armor;
		context.playerSession.planes[3].hasBomb = myPlaneFour.withBomb;
		context.playerSession.planes[3].positionX = Math.round(myPlaneFour.x);
		context.playerSession.planes[3].positionY = Math.round(myPlaneFour.y);
		context.playerSession.planes[3].angle = myPlaneFour.planeAngle;

		context.playerSession.planes[0].fuel = enemyPlaneOne.fuel;
		context.playerSession.planes[0].armor = enemyPlaneOne.armor;
		context.playerSession.planes[0].hasBomb = enemyPlaneOne.withBomb;
		context.playerSession.planes[0].positionX = Math.round(enemyPlaneOne.x);
		context.playerSession.planes[0].positionY = Math.round(enemyPlaneOne.y);
		context.playerSession.planes[0].angle = enemyPlaneOne.planeAngle;

		context.enemySession.planes[1].fuel = enemyPlaneTwo.fuel;
		context.enemySession.planes[1].armor = enemyPlaneTwo.armor;
		context.enemySession.planes[1].hasBomb = enemyPlaneTwo.withBomb;
		context.enemySession.planes[1].positionX = Math.round(enemyPlaneTwo.x);
		context.enemySession.planes[1].positionY = Math.round(enemyPlaneTwo.y);
		context.enemySession.planes[1].angle = enemyPlaneTwo.planeAngle;

		context.enemySession.planes[2].fuel = enemyPlaneThree.fuel;
		context.enemySession.planes[2].armor = enemyPlaneThree.armor;
		context.enemySession.planes[2].hasBomb = enemyPlaneThree.withBomb;
		context.enemySession.planes[2].positionX = Math.round(enemyPlaneThree.x);
		context.enemySession.planes[2].positionY = Math.round(enemyPlaneThree.y);
		context.enemySession.planes[2].angle = enemyPlaneThree.planeAngle;

		context.enemySession.planes[3].fuel = enemyPlaneFour.fuel;
		context.enemySession.planes[3].armor = enemyPlaneFour.armor;
		context.enemySession.planes[3].hasBomb = enemyPlaneFour.withBomb;
		context.enemySession.planes[3].positionX = Math.round(enemyPlaneFour.x);
		context.enemySession.planes[3].positionY = Math.round(enemyPlaneFour.y);
		context.enemySession.planes[3].angle = enemyPlaneFour.planeAngle;
	}

	updateArtilleries() {
		context.playerSession.artilleries[0].armor = myArtilleryOne.armor;
		context.playerSession.artilleries[1].armor = myArtilleryTwo.armor;
		context.playerSession.artilleries[2].armor = myArtilleryThree.armor;
		context.playerSession.artilleries[3].armor = myArtilleryFour.armor;
	}

	updateStructures() {
		context.playerSession.activeFuel = !myFuel.destroyed;
		context.playerSession.activeHangar = !myHangar.destroyed;
		context.playerSession.activeTower = !myTower.destroyed;

		context.enemySession.activeFuel = !enemyFuel.destroyed;
		context.enemySession.activeHangar = !enemyHangar.destroyed;
		context.enemySession.activeTower = !enemyTower.destroyed;
	}

	syncMove(planeViewX) {
		var planePosition = [Math.round(myPlaneSelected.x), Math.round(myPlaneSelected.y), myPlaneSelected.planeAngle];
		var message = context.messagesFormat.syncMove(myPlaneSelected.planeIndex, planePosition, planeViewX);
		context.functions.sendMessage(message);
	}

	syncShoot() {
		var message = context.messagesFormat.syncShoot(myPlaneSelected.planeIndex);
		context.functions.sendMessage(message);
	}

	syncBomb() {
		var message = context.messagesFormat.syncBomb(myPlaneSelected.planeIndex);
		context.functions.sendMessage(message);
	}

	syncTakeOff(takeOff) {
		var message = context.messagesFormat.syncTakeOff(myPlaneSelected.planeIndex, takeOff);
		context.functions.sendMessage(message);
	}

	syncPlaneViewX(index, x) {
		var message = context.messagesFormat.syncPlaneViewX(index, x);
		context.functions.sendMessage(message);
	}
	//#endregion

	//#region Vista lateral
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

	changeFlyYPlaneView(from, to, plane) {
		let i = from < to ? from : to;
		let j = from < to ? to : from;
		for (i; i <= to; i++) {
			plane.y = i;
		}
	}
	changeFlyXPlaneView(enemy, isRight, plane, delta) {

		if (plane != null) {
			let planeView = this.checkPlaneView(enemy, plane.planeIndex);
			if (planeView != null && plane.x > 0) {
				if (isRight && planeView.x < 1305) {
					planeView.x += (plane.speed * delta) / 3.50;
					if (isBlue) {
						planeView.setTexture("PlaneRightBlueView")
					}
					else {
						planeView.setTexture("PlaneRightRedView")
					}
				}
				else if (!isRight && planeView.x > 1035) {
					planeView.x -= (plane.speed * delta) / 3.50;
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
	//#endregion
}
