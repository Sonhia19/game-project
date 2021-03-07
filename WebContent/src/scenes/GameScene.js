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
import { MINUS_X, MINUS_Y, MORE_X, MORE_Y } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { BLUE_SAFE_ZONE_X, BLUE_PLANE_X, BLUE_BASE_X, BLUE_ARTILLERY_X } from '../constants/GameConstants.js';
import { RED_SAFE_ZONE_X, RED_PLANE_X, RED_BASE_X, RED_ARTILLERY_X } from '../constants/GameConstants.js';


//#region Variables
let scene;
//Bandera para saber el bando del jugador
let isBlue;
let enemyDraw = false;

//Teclas a capturar
let keyCtrl, keyOne, keyTwo, keyThree, keyFour, keyF, keyShift;

let cursors;

const COLOR_SUCCESS = 0x008025;
const COLOR_DANGER = 0xFF0000;
const COLOR_WARNING = 0xE2D510;


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
let myFuel;
let myTower;
let myHangar;
let myPlaneSelected, myPlaneOne, myPlaneTwo, myPlaneThree, myPlaneFour;
let myArtilleryOne, myArtilleryTwo, myArtilleryThree, myArtilleryFour;

//Elementos del bando enemigo
let enemyFuel = null;
let enemyTower = null;
let enemyHangar = null;
let enemyPlaneSelected = null, enemyPlaneOne = null, enemyPlaneTwo = null, enemyPlaneThree = null, enemyPlaneFour = null;
let enemyArtilleryOne, enemyArtilleryTwo, enemyArtilleryThree, enemyArtilleryFour;
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
		this.load.image("plane", "./assets/plane.png");
		this.load.image("plane_flying", "./assets/plane_flying.png");
		this.load.image("plane_landed", "./assets/plane_landed.png");
		this.load.image("fuel", "./assets/fuel.png");
		this.load.image("hangar", "./assets/hangar.png");
		this.load.image("tower", "./assets/tower.png");
		this.load.image("artillery", "./assets/artillery.png");
		this.load.image("bulletTorret", "./assets/bullet.png");
		this.load.image("bomb", "./assets/bomb.png");
		this.load.image("border", "./assets/border.png");
		this.load.image("ledRed", "./assets/led.png");
		this.load.image("ledGreen", "./assets/led_green.png");

		this.load.image("savegame_font", "assets/savegame-font.png");
	}

	create() {
		scene = this;
		this.add.image(500, 300, 'field');
		isBlue = context.playerSession.teamSide == 1

		this.captureKeys();

		var saveGameButton = this.add.image(context.game.renderer.width * 0.85, context.game.renderer.height * 0.94, "savegame_font").setDepth(0);
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

		let border = borders.get();

		border.place(50, 800, true);
		border = borders.get();
		border.place(50, 200, true);

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

		if (this.existsEnemySession()) {
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

			if (context.enemySession.isHighFlying) {
				let p = this.checkEnemyPlaneAction(context.enemySession.planeHighFly);
				context.enemySession.isHighFlying = false;
				context.enemySession.planeHighFly = -1;
				if (p != null) {
					p.highFlyPlane(false);
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
				if (Phaser.Input.Keyboard.JustDown(keyF)) {
					if (myPlaneSelected.flying) {
						myPlaneSelected.land(isBlue ? BLUE_SAFE_ZONE_X : RED_SAFE_ZONE_X);
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
						myPlaneSelected.takeOff();
						infoGameText.setText('');
						highFlyPlaneText.setText('Vuelo Bajo');
					}
				}

				// Vuelto alto / vuelo bajo
				if (Phaser.Input.Keyboard.JustDown(keyShift)) {
					myPlaneSelected.highFlyPlane(true);
					if (myPlaneSelected.highFly) {
						highFlyPlaneText.setText('Vuelo Alto');
					} else {
						highFlyPlaneText.setText('Vuelo Bajo');
					}
				}

				//Si el avion se encuentra dentro de su zona, limpia todo el mapa
				if (myPlaneSelected.x < isBlue ? BLUE_SAFE_ZONE_X : RED_SAFE_ZONE_X) {
					myPlaneSelected.gray = null;
				}
				//Movimiento de avión
				if (cursors.left.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(true, ANGLE_270, MINUS_X, delta);
					this.syncMove();
				} else if (cursors.right.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(true, ANGLE_90, MORE_X, delta);
					this.syncMove();
				}
				if (cursors.up.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, delta);
					this.syncMove();

				} else if (cursors.down.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(true, ANGLE_180, MORE_Y, delta);
					this.syncMove();

				}
				if (cursors.left.isDown && cursors.up.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(false, ANGLE_315, null, null);
					this.syncMove();

				}
				if (cursors.left.isDown && cursors.down.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(false, ANGLE_225, null, null);
					this.syncMove();

				}
				if (cursors.right.isDown && cursors.down.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(false, ANGLE_135, null, null);
					this.syncMove();
				}
				if (cursors.right.isDown && cursors.up.isDown) {
					this.fuelControl();
					myPlaneSelected.fly(false, ANGLE_45, null, null);
					this.syncMove();
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
				if (Phaser.Input.Keyboard.JustDown(keyCtrl)) {
					if (myPlaneSelected.flying) {
						if (myPlaneSelected.withBomb) {
							myPlaneSelected.fireBomb(myBombs);
							this.syncBomb();
							this.checkBomb();
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
		consolePlane1 = this.add.image(1040, 530, 'plane');
		consolePlane1.setScale(0.3);
		plane1ArmorText = this.add.text(1025, 545, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane2 = this.add.image(1120, 530, 'plane');
		consolePlane2.setScale(0.3);
		plane2ArmorText = this.add.text(1105, 545, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane3 = this.add.image(1200, 530, 'plane');
		consolePlane3.setScale(0.3);
		plane3ArmorText = this.add.text(1185, 545, '', { fontSize: '15px', fill: '#FFFFFF' });

		consolePlane4 = this.add.image(1280, 530, 'plane');
		consolePlane4.setScale(0.3);
		plane4ArmorText = this.add.text(1265, 545, '', { fontSize: '15px', fill: '#FFFFFF' });

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
			consolePlane1.setTexture('sprites', 'plane_landed');
		} else {
			consolePlane1.setTexture('sprites', 'plane');
		}
		if (myPlaneSelected == myPlaneTwo) {
			consolePlane2.setTexture('sprites', 'plane_landed');
		} else {
			consolePlane2.setTexture('sprites', 'plane');
		}
		if (myPlaneSelected == myPlaneThree) {
			consolePlane3.setTexture('sprites', 'plane_landed');
		} else {
			consolePlane3.setTexture('sprites', 'plane');
		}
		if (myPlaneSelected == myPlaneFour) {
			consolePlane4.setTexture('sprites', 'plane_landed');
		} else {
			consolePlane4.setTexture('sprites', 'plane');
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
	moveEnemyPlanes() {


		let coord = context.enemySession.planeCoord;
		let index = parseInt(context.enemySession.planeMoving)
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
		keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
		keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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
					myPlaneSelected.setTexture('plane_landed');
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
		p.setTexture('plane');
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
			let message;
			let color;
			if (plane.receiveDamage(bullet.damage)) {
				message = "Avión aliado destruido";
				color = COLOR_DANGER;
			}
			else {
				message = "Avión aliado dañado";
				color = COLOR_WARNING;
			}
			bullet.destroy();
			scene.createMessage(message, color);
		}
	}

	damageEnemyPlane(bullet, plane) {
		if (plane.active === true && bullet.active === true) {
			if (plane.receiveDamage(bullet.damage)) {
				scene.createMessage("Avión enemigo destruido", COLOR_SUCCESS);
			}
			bullet.destroy();
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
			} else if (structure.frame.texture.key == 'fuel') {
				ledGreenFuel.setVisible(false);
				ledRedFuel.setVisible(true);
				message = "Tanque aliado destruido";
			} else if (structure.frame.texture.key == 'hangar') {
				ledGreenHangar.setVisible(false);
				ledRedHangar.setVisible(true);
				message = "Hangar aliado destruido";
			}
			bomb.destroy();
			structure.destroy();
			structure = false;
			scene.createMessage(message, COLOR_DANGER);
		}
	}

	damageEnemyStructure(bomb, structure) {
		if (structure.active === true && bomb.active === true) {
			let message;
			if (structure.frame.name == 'tower') {
				ledGreenTowerEnemy.setVisible(false);
				ledRedTowerEnemy.setVisible(true);
				message = "Torre enemiga destruida";
			} else if (structure.frame.texture.key == 'fuel') {
				ledGreenFuelEnemy.setVisible(false);
				ledRedFuelEnemy.setVisible(true);
				message = "Tanque enemigo destruido";
			} else if (structure.frame.texture.key == 'hangar') {
				ledGreenHangarEnemy.setVisible(false);
				ledRedHangarEnemy.setVisible(true);
				message = "Hangar enemigo destruido";
			}
			bomb.destroy();
			structure.destroy();
			structure = false;
			scene.createMessage(message, COLOR_SUCCESS);
		}
	}

	borderPlane(plane, borders) {
		if (plane.active === true && borders.active === true && !borders.internal) {
			plane.x = 965;
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
			let message;
			let color;
			if (artillery.receiveDamage(bullet.damage)) {
				if (artillery.isEnemy) {
					message = "Artillería enemiga destruida";
					color = COLOR_SUCCESS;
					console.log(artilleryEnemyCount);
					artilleryEnemyCount = artilleryEnemyCount - 1;
					artilleryText.setText('Artillería: ' + artilleryEnemyCount + '/4');
				}
				else {
					message = "Artillería aliada destruida"
					color = COLOR_DANGER;
					console.log(artilleryCount);
					artilleryCount = artilleryCount - 1;
					artilleryEnemyText.setText('Artillería : ' + artilleryCount + '/4')
				}
				scene.createMessage(message, color);
			}
			bullet.destroy();
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
		if (context.enemySession.activeFuel) {
			enemyFuel = enemyFuels.get();
			enemyFuel.place(150, isBlue ? RED_BASE_X : BLUE_BASE_X);
		}

		if (context.enemySession.activeHangar) {
			enemyHangar = enemyHangars.get();
			enemyHangar.place(500, isBlue ? RED_BASE_X : BLUE_BASE_X);
		}

		if (context.enemySession.activeTower) {
			enemyTower = enemyTowers.get();
			enemyTower.place(325, isBlue ? RED_BASE_X : BLUE_BASE_X);
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
			if (artilleryServer[0].armor > 0) { enemyArtilleryOne = this.placeEnemyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower); }
			if (artilleryServer[1].armor > 0) { enemyArtilleryTwo = this.placeEnemyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[1].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower); }
			if (artilleryServer[2].armor > 0) { enemyArtilleryThree = this.placeEnemyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[2].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower); }
			if (artilleryServer[3].armor > 0) { enemyArtilleryFour = this.placeEnemyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[3].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower); }
		}
	}

	placeMyElements() {
		if (context.playerSession.activeFuel) {
			myFuel = myFuels.get();
			myFuel.place(150, isBlue ? BLUE_BASE_X : RED_BASE_X);
		}

		if (context.playerSession.activeHangar) {
			myHangar = myHangars.get();
			myHangar.place(500, isBlue ? BLUE_BASE_X : RED_BASE_X);
		}

		if (context.playerSession.activeTower) {
			myTower = myTowers.get();
			myTower.place(325, isBlue ? BLUE_BASE_X : RED_BASE_X);
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
			if (planesServer[0].armor > 0) { myPlaneOne = this.placeMyPlane(planesServer[0].positionY, planesServer[0].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[0].fuel, planesServer[0].armor, planesServer[0].speed, planesServer[0].hasBomb, planesServer[0].firePower, 1); }
			if (planesServer[1].armor > 0) { myPlaneTwo = this.placeMyPlane(planesServer[1].positionY, planesServer[1].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[1].fuel, planesServer[1].armor, planesServer[1].speed, planesServer[1].hasBomb, planesServer[1].firePower, 2); }
			if (planesServer[2].armor > 0) { myPlaneThree = this.placeMyPlane(planesServer[2].positionY, planesServer[2].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[2].fuel, planesServer[2].armor, planesServer[2].speed, planesServer[2].hasBomb, planesServer[2].firePower, 3); }
			if (planesServer[3].armor > 0) { myPlaneFour = this.placeMyPlane(planesServer[3].positionY, planesServer[3].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[3].fuel, planesServer[3].armor, planesServer[3].speed, planesServer[3].hasBomb, planesServer[3].firePower, 4); }

			this.physics.add.collider(myPlanes, borders, this.borderPlane);
			this.physics.add.overlap(myPlanes, blacks, this.exploreBlackMap);
			this.physics.add.overlap(enemyBullets, myPlanes, this.damageMyPlane);
		}
	}

	placeMyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex);
		}
	}

	placeEnemyPlanes() {
		if (context.enemySession.planes != undefined) {
			let planeEnemyServer = context.enemySession.planes;
			if (planeEnemyServer[0].armor > 0) { enemyPlaneOne = this.placeEnemyPlane(planeEnemyServer[0].positionY, planeEnemyServer[0].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[0].fuel, planeEnemyServer[0].armor, planeEnemyServer[0].speed, planeEnemyServer[0].hasBomb, planeEnemyServer[0].firePower, 1); }
			if (planeEnemyServer[1].armor > 0) { enemyPlaneTwo = this.placeEnemyPlane(planeEnemyServer[1].positionY, planeEnemyServer[1].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[1].fuel, planeEnemyServer[1].armor, planeEnemyServer[1].speed, planeEnemyServer[1].hasBomb, planeEnemyServer[1].firePower, 2); }
			if (planeEnemyServer[2].armor > 0) { enemyPlaneThree = this.placeEnemyPlane(planeEnemyServer[2].positionY, planeEnemyServer[2].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[2].fuel, planeEnemyServer[2].armor, planeEnemyServer[2].speed, planeEnemyServer[2].hasBomb, planeEnemyServer[2].firePower, 3); }
			if (planeEnemyServer[3].armor > 0) { enemyPlaneFour = this.placeEnemyPlane(planeEnemyServer[3].positionY, planeEnemyServer[3].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[3].fuel, planeEnemyServer[3].armor, planeEnemyServer[3].speed, planeEnemyServer[3].hasBomb, planeEnemyServer[3].firePower, 4); }

			this.physics.add.overlap(myBullets, enemyPlanes, this.damageEnemyPlane);
		}
	}

	placeEnemyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex) {
		let plane = enemyPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex);
		}
	}
	placeMyArtilleries() {
		if (context.playerSession.artilleries != undefined) {
			let artilleryServer = context.playerSession.artilleries;
			if (artilleryServer[0].armor > 0) { myArtilleryOne = this.placeMyArtillery(artilleryServer[0].positionY, artilleryServer[0].positionX, artilleryServer[0].cadency, artilleryServer[0].reach, artilleryServer[0].armor, artilleryServer[0].firePower); }
			if (artilleryServer[1].armor > 0) { myArtilleryTwo = this.placeMyArtillery(artilleryServer[1].positionY, artilleryServer[1].positionX, artilleryServer[0].cadency, artilleryServer[1].reach, artilleryServer[1].armor, artilleryServer[1].firePower); }
			if (artilleryServer[2].armor > 0) { myArtilleryThree = this.placeMyArtillery(artilleryServer[2].positionY, artilleryServer[2].positionX, artilleryServer[0].cadency, artilleryServer[2].reach, artilleryServer[2].armor, artilleryServer[2].firePower); }
			if (artilleryServer[3].armor > 0) { myArtilleryFour = this.placeMyArtillery(artilleryServer[3].positionY, artilleryServer[3].positionX, artilleryServer[0].cadency, artilleryServer[3].reach, artilleryServer[3].armor, artilleryServer[3].firePower); }

			this.physics.add.overlap(enemyBulletsArtillery, myPlanes, this.damageMyPlane);
			this.physics.add.overlap(enemyBullets, myArtilleries, this.damageArtillery);
		}
	}

	placeMyArtillery(i, j, cadency, reach, armor, firePower) {
		let artillery = myArtilleries.get();
		if (artillery) {
			artilleryCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, false);
		}
	}

	placeEnemyArtillery(i, j, cadency, reach, armor, firePower) {
		let artillery = enemyArtilleries.get();
		if (artillery) {
			artilleryEnemyCount++;
			return artillery.place(i, j, cadency, reach, armor, firePower, true);
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
	syncMove() {
		var planePosition = [Math.round(myPlaneSelected.x), Math.round(myPlaneSelected.y), myPlaneSelected.planeAngle];
		var message = context.messagesFormat.syncMove(myPlaneSelected.planeIndex, planePosition);
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
	//#endregion
}
