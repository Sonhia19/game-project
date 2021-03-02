import { Plane } from '../objects/plane.js';
import { Artillery } from '../objects/artillery.js';
import { Bullet } from '../objects/bullet.js';
import { Enemy } from '../objects/enemy.js';
import { Tower } from '../objects/tower.js';
import { Fuel } from '../objects/fuel.js';
import { Border } from '../objects/border.js';
import { Hangar } from '../objects/hangar.js';
import { Bomb } from '../objects/bomb.js';
import { Black } from '../objects/shadow.js';
import { Gray } from '../objects/shadow.js';
import { context } from '../../src/main.js';
import { ENEMY_SPEED, BULLET_DAMAGE } from '../constants/GameConstants.js';
import { MINUS_X, MINUS_Y, MORE_X, MORE_Y } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { BLUE_SAFE_ZONE_X, BLUE_PLANE_X, BLUE_BASE_X, BLUE_ARTILLERY_X } from '../constants/GameConstants.js';
import { RED_SAFE_ZONE_X, RED_PLANE_X, RED_BASE_X, RED_ARTILLERY_X } from '../constants/GameConstants.js';

//Bandera para saber el bando del jugador
let isBlue;
let enemyDraw = false;

//Teclas a capturar
let keyCtrl, keyOne, keyTwo, keyThree, keyFour, keyF, keyShift;

let cursors;


//Colecciones de elementos del propio bando
let myBullets;
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
let artilleryCount;
let artilleryEnemyCount = 0;
let artilleryText;
let artilleryEnemyText;  
let towerEnemyText;
let hangarEnemyText;
let fuelsEnemyText;
let ledBomb;
let myBaseText;
let enemyBaseText;
let ledGreenBomb;



//Colecciones de elementos del bando enemigo
let enemyPlanes;
let enemyFuels;
let enemyHangars;
let enemyTowers;
let enemyArtilleries;
let enemyBullets;
let enemyBombs;

//Elementos del propio bando
let myFuel;
let myTower;
let myHangar;
let myPlaneSelected, myPlaneOne, myPlaneTwo, myPlaneThree, myPlaneFour;

//Elementos del bando enemigo
let enemyFuel = null;
let enemyTower = null;
let enemyHangar = null;
let enemyPlaneOne, enemyPlaneTwo, enemyPlaneThree, enemyPlaneFour;



export class GameScene extends Phaser.Scene {



	constructor() {
		super('GAME');
	}

	init() {

	}

	preload() {

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
		this.load.image("led", "./assets/led.png");
		this.load.image("ledGreen", "./assets/led_green.png");



		// this.time.addEvent({
		// 	delay: 500,
		// 	callback: () => {
		// 		let message = context.messagesFormat.syncGame();
		// 		context.functions.sendMessage(message);
		// 	},
		// 	loop: false
		// })


	}

	moveEnemyPlanes() {
		let planeEnemyServer = context.enemySession.planes;
		enemyPlaneOne.y = planeEnemyServer[0].positionY;
		enemyPlaneOne.x = planeEnemyServer[0].positionX;
		enemyPlaneOne.planeAngle = planeEnemyServer[0].angle;
		enemyPlaneOne.angle = planeEnemyServer[0].angle;

		enemyPlaneTwo.y = planeEnemyServer[1].positionY;
		enemyPlaneTwo.x = planeEnemyServer[1].positionX;
		enemyPlaneTwo.planeAngle = planeEnemyServer[1].angle;
		enemyPlaneTwo.angle = planeEnemyServer[1].angle;

		enemyPlaneThree.y = planeEnemyServer[2].positionY;
		enemyPlaneThree.x = planeEnemyServer[2].positionX;
		enemyPlaneThree.planeAngle = planeEnemyServer[2].angle;
		enemyPlaneThree.angle = planeEnemyServer[2].angle;

		enemyPlaneFour.y = planeEnemyServer[3].positionY;
		enemyPlaneFour.x = planeEnemyServer[3].positionX;
		enemyPlaneFour.planeAngle = planeEnemyServer[3].angle;
		enemyPlaneFour.angle = planeEnemyServer[3].angle;
	}

	existsEnemySession() {
		return context.enemySession.id != undefined;
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


	update(time, delta) {

		if (this.existsEnemySession()) {			
			if (!enemyDraw) {
				enemyDraw = true;
				this.placeEnemyElements();
				this.checkArtillery();
				this.checkFuels();
				this.checkHangar();
				this.checkTower();
			}

			this.moveEnemyPlanes();
			if (context.enemySession.isShooting) {
				let p = this.checkEnemyPlaneAction(context.enemySession.planeShooting);
				context.enemySession.isShooting = false;
				context.enemySession.planeShooting = -1;
				if (p != null) {
					p.fire(time, enemyBullets);
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
		}

		//Selección de avión
		if (Phaser.Input.Keyboard.JustDown(keyOne)) {
			if (myPlaneOne.scene) {
				this.selectPlane(myPlaneOne);
				myPlaneSelectedText.setText('Avión 1');
			}

		}
		else if (Phaser.Input.Keyboard.JustDown(keyTwo)) {
			if (myPlaneTwo.scene) {
				this.selectPlane(myPlaneTwo);
				myPlaneSelectedText.setText('Avión 2');
			}
		}
		else if (Phaser.Input.Keyboard.JustDown(keyThree)) {
			if (myPlaneThree.scene) {
				this.selectPlane(myPlaneThree);
				myPlaneSelectedText.setText('Avión 3');
			}
		}
		else if (Phaser.Input.Keyboard.JustDown(keyFour)) {
			if (myPlaneFour.scene) {
				this.selectPlane(myPlaneFour);
				myPlaneSelectedText.setText('Avión 4');
			}
		}

		this.checkPlanesArmor();

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
				myPlaneSelected.highFlyPlane();
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
						console.log("tiene que despegar");
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
							console.log("no tiene bomba");
							infoGameText.setText("Retorne a la base para recargar bomba");
						}

					}
					else {
						console.log("tiene que despegar");
						infoGameText.setText("Avión en tierra. No puede disparar bomba");
					}
				}
			}
		}
	}

	create() {

		console.log(context.playerSession);
		this.add.image(500, 300, 'field');
	 	ledBomb = this.add.image(1062,338,'led');
		ledBomb.setScale(0.05);
		ledBomb.setVisible(false);
		ledGreenBomb = this.add.image(1062,338,'ledGreen');
		ledGreenBomb.setScale(0.025);
		ledGreenBomb.setVisible(false);


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

		isBlue = context.playerSession.teamSide == 1

		//capturar tecla control
		keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
		keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);




		//Creación de elementos propios
		myBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		myBombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
		myPlanes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
		myFuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
		myHangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
		myTowers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
		myArtilleries = this.physics.add.group({ classType: Artillery, runChildUpdate: true });
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

		let border = borders.get();

		border.place(50, 800, true);
		border = borders.get();
		border.place(50, 200, true);

		myFuel = myFuels.get();
		myFuel.place(150, isBlue ? BLUE_BASE_X : RED_BASE_X);

		myHangar = myHangars.get();
		myHangar.place(500, isBlue ? BLUE_BASE_X : RED_BASE_X);

		myTower = myTowers.get();
		myTower.place(325, isBlue ? BLUE_BASE_X : RED_BASE_X);

		artilleryCount = 0;
		this.placeMyArtillery(75, isBlue ? BLUE_ARTILLERY_X : RED_ARTILLERY_X);
		this.placeMyArtillery(250, isBlue ? BLUE_ARTILLERY_X : RED_ARTILLERY_X);
		this.placeMyArtillery(350, isBlue ? BLUE_ARTILLERY_X : RED_ARTILLERY_X);
		this.placeMyArtillery(550, isBlue ? BLUE_ARTILLERY_X : RED_ARTILLERY_X);

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

		this.placeMyPlanes();

		//this.placeEnemyElements();

		this.physics.add.collider(myPlanes, borders, this.borderPlane);
		this.physics.add.overlap(myBullets, borders, this.borderBullet);
		this.physics.add.overlap(myBombs, borders, this.borderBullet);
		this.physics.add.overlap(myPlanes, blacks, this.exploreBlackMap);

		myPlaneSelectedText = this.add.text(1010, 301, '', { fontSize: '11px', fill: '#FFFFFF', });
		fuelText = this.add.text(1010, 316, '', { fontSize: '11px', fill: '#FFFFFF' });
		bombText = this.add.text(1010, 331, '', { fontSize: '11px', fill: '#FFFFFF' });
		highFlyPlaneText = this.add.text(1010, 346, '', { fontSize: '11px', fill: '#FFFF00' });
		infoGameText = this.add.text(1010, 361, 'Presione (1) (2) (3) (4) para seleccionar avión', { fontSize: '11px', fill: '#FF0000' });
		
		myBaseText = this.add.text(1010, 400, 'Mi Base', { fontSize: '13px', fill: '#009025' }); 
		artilleryText = this.add.text(1010, 415, '', { fontSize: '11px', fill: '#FFFFFF' }); 
		towerText = this.add.text(1010, 430, '', { fontSize: '11px', fill: '#FFFFFF' });
		hangarText = this.add.text(1010, 445, '', { fontSize: '11px', fill: '#FFFFFF' });
		fuelsText = this.add.text(1010, 460, '', { fontSize: '11px', fill: '#FFFFFF' });

		enemyBaseText = this.add.text(1190, 400, 'Base Enemiga', { fontSize: '13px', fill: '#009025' }); 
		artilleryEnemyText = this.add.text(1190, 415, '', { fontSize: '11px', fill: '#FFFFFF' }); 
		towerEnemyText = this.add.text(1190, 430, '', { fontSize: '11px', fill: '#FFFFFF' });
		hangarEnemyText = this.add.text(1190, 445, '', { fontSize: '11px', fill: '#FFFFFF' });
		fuelsEnemyText = this.add.text(1190, 460, '', { fontSize: '11px', fill: '#FFFFFF' });

		this.checkFuels();
		this.checkHangar();
		this.checkTower();
		this.checkArtillery();

		//this.physics.add.overlap(myPlanes, grays, this.exploreGrayMap);

		//this.physics.add.overlap(enemyPlanes, grays, this.hiddenEnemies);
		//this.physics.add.overlap(myBombs, myHangars, this.borderPlane);
		//  Collections.bulletsTurret = this.physics.add.group({ classType: BulletTorret, runChildUpdate: true });

		//  Collections.

		// this.physics.add.overlap(enemies, bullets, damageEnemy);

		// this.physics.add.overlap(bombs, hangars, Bomb.explosionHangar());
		// this.physics.add.overlap(bombs, fuels, Bomb.explosionFuel());
		// this.physics.add.overlap(bombs, towers, Bomb.explosionTower());

		// 


		// 
		// //
		

	}

	placeEnemyElements() {
		enemyFuel = enemyFuels.get();
		enemyFuel.place(150, isBlue ? RED_BASE_X : BLUE_BASE_X);

		enemyHangar = enemyHangars.get();
		enemyHangar.place(500, isBlue ? RED_BASE_X : BLUE_BASE_X);

		enemyTower = enemyTowers.get();
		enemyTower.place(325, isBlue ? RED_BASE_X : BLUE_BASE_X);

		this.placeEnemyArtillery(75, isBlue ? RED_ARTILLERY_X : BLUE_ARTILLERY_X);
		this.placeEnemyArtillery(250, isBlue ? RED_ARTILLERY_X : BLUE_ARTILLERY_X);
		this.placeEnemyArtillery(350, isBlue ? RED_ARTILLERY_X : BLUE_ARTILLERY_X);
		this.placeEnemyArtillery(550, isBlue ? RED_ARTILLERY_X : BLUE_ARTILLERY_X);

		this.placeEnemyPlanes();
		this.physics.add.overlap(myBombs, enemyHangars, this.myBombEnemyHangars);
	}
	placeMyPlanes() {

		let planesServer = context.playerSession.planes;
		myPlaneOne = this.placeMyPlane(planesServer[0].positionY, planesServer[0].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[0].fuel, planesServer[0].armor, 100, planesServer[0].hasBomb, 100, 1);
		myPlaneTwo = this.placeMyPlane(planesServer[1].positionY, planesServer[1].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[1].fuel, planesServer[1].armor, 100, planesServer[1].hasBomb, 100, 2);
		myPlaneThree = this.placeMyPlane(planesServer[2].positionY, planesServer[2].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[2].fuel, planesServer[2].armor, 100, planesServer[2].hasBomb, 100, 3);
		myPlaneFour = this.placeMyPlane(planesServer[3].positionY, planesServer[3].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[3].fuel, planesServer[3].armor, 100, planesServer[3].hasBomb, 100, 4);
	}

	placeMyPlane(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex);
		}
	}

	placeEnemyPlanes() {
		let planeEnemyServer = context.enemySession.planes;
		enemyPlaneOne = this.placeEnemyPlane(planeEnemyServer[0].positionY, planeEnemyServer[0].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[0].fuel, planeEnemyServer[0].armor, 100, planeEnemyServer[0].hasBomb, 100, 1);
		enemyPlaneTwo = this.placeEnemyPlane(planeEnemyServer[1].positionY, planeEnemyServer[1].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[1].fuel, planeEnemyServer[1].armor, 100, planeEnemyServer[1].hasBomb, 100, 2);
		enemyPlaneThree = this.placeEnemyPlane(planeEnemyServer[2].positionY, planeEnemyServer[2].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[2].fuel, planeEnemyServer[2].armor, 100, planeEnemyServer[2].hasBomb, 100, 3);
		enemyPlaneFour = this.placeEnemyPlane(planeEnemyServer[3].positionY, planeEnemyServer[3].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[3].fuel, planeEnemyServer[3].armor, 100, planeEnemyServer[3].hasBomb, 100, 4);
	}

	placeEnemyPlane(i, j, angle, fuel, armor, speed, bomb, firePower) {
		let plane = enemyPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower);
		}
	}

	placeMyArtillery(i, j) {
		let artillery = myArtilleries.get();
		if (artillery) {
			artillery.place(i, j);
			artilleryCount++;
		}
	}

	placeEnemyArtillery(i, j) {
		let artillery = enemyArtilleries.get();
		if (artillery) {
			artillery.place(i, j);
			artilleryEnemyCount++;
		}
	}

	selectPlane(p) {
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
				myPlaneSelected.setTexture('sprites', 'plane_landed');
				//Info en Consola
				this.loadConsole();
			}
			else {
				console.log("No puede volar");
			}

		}
	}

	fuelControl() {
		fuelText.setText('Combustible: ' + myPlaneSelected.fuel);
		if (myPlaneSelected.fuel < 30) {
			infoGameText.setText('Se está agotando el combustible. \nRetorne a la base');
		}
	}

	unselectPlane(p) {
		p.setTexture('sprites', 'plane');
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

	myBombEnemyHangars(bomb, hangar) {
		if (bomb.active === true && hangar.active === true) {
			bomb.destroy();
			hangar.destroy();
		}
	}
	syncMove() {

		let json = JSON.stringify({
			action: {
				name: 'syncMove',
				parameters: {
					gameId: context.gameId,
					planeOne: [Math.round(myPlaneOne.x), Math.round(myPlaneOne.y), myPlaneOne.planeAngle],
					planeTwo: [Math.round(myPlaneTwo.x), Math.round(myPlaneTwo.y), myPlaneTwo.planeAngle],
					planeThree: [Math.round(myPlaneThree.x), Math.round(myPlaneThree.y), myPlaneThree.planeAngle],
					planeFour: [Math.round(myPlaneFour.x), Math.round(myPlaneFour.y), myPlaneFour.planeAngle]
				}
			}
		})
		context.functions.sendMessage(json);
	}

	syncShoot() {
		let json = JSON.stringify({
			action: {
				name: 'syncShoot',
				parameters: {
					gameId: context.gameId,
					shootingPlane: myPlaneSelected.planeIndex
				}
			}
		})
		context.functions.sendMessage(json);
	}

	syncBomb() {
		let json = JSON.stringify({
			action: {
				name: 'syncBomb',
				parameters: {
					gameId: context.gameId,
					bombingPlane: myPlaneSelected.planeIndex
				}
			}
		})
		context.functions.sendMessage(json);
	}

	checkBomb(){
		if (myPlaneSelected.withBomb) {
			bombText.setText('Bomba: '); 
			ledBomb.setVisible(false);
			ledGreenBomb.setVisible(true);

		}
		else {
			bombText.setText('Bomba: ');
			ledBomb.setVisible(true);
			ledGreenBomb.setVisible(false);

		}
	}

	checkTower()
	{
		if(myTower == null)
		{
			towerText.setText("Torre Inactiva");
		}else{
			towerText.setText("Torre Activa");
		}
		if(enemyTower == null)
		{
			towerEnemyText.setText("Torre Inactiva");
		}else{
			towerEnemyText.setText("Torre Activa");
		}
	}
	checkHangar()
	{
		if(myHangar == null)
		{
			hangarText.setText("Hangar Inactivo");
		}else{
			hangarText.setText("Hangar Activo");
		}
		if(enemyHangar == null)
		{
			hangarEnemyText.setText("Hangar Inactivo");
		}else{
			hangarEnemyText.setText("Hangar Activo");

		}
	}

	checkFuels()
	{
		if(myFuel == null)
		{
			fuelsText.setText("Tanque Inactivo");
		}else{
			fuelsText.setText("Tanque Activo");
		}
		if(enemyFuel == null)
		{
			fuelsEnemyText.setText("Tanque Inactivo");
		}else{
			fuelsEnemyText.setText("Tanque Activo");
		}
	}
	checkArtillery()
	{
		artilleryText.setText('Artillería: ' + artilleryCount + '/4');
		artilleryEnemyText.setText('Artillería : ' + artilleryEnemyCount + '/4')
	}

	checkPlanesArmor()
	{
		if(myPlaneOne.armor <= 0)
		{
			consolePlane1.setVisible(false);
			plane1ArmorText.setText('');
		}else{
			plane1ArmorText.setText(myPlaneOne.armor);
		}
		if(myPlaneTwo.armor <= 0)
		{
			consolePlane2.setVisible(false);
			plane2ArmorText.setText('');
		}else{
			plane2ArmorText.setText(myPlaneOne.armor);
		}
		if(myPlaneThree.armor <= 0)
		{
			consolePlane3.setVisible(false);
			plane3ArmorText.setText('');
		}else{
			plane3ArmorText.setText(myPlaneOne.armor);
		}
		if(myPlaneFour.armor <= 0)
		{
			consolePlane4.setVisible(false);
			plane4ArmorText.setText('');
		}else{
			plane4ArmorText.setText(myPlaneOne.armor);
		}

	}

	loadConsole()
	{
		if(myPlaneSelected == myPlaneOne)
		{
			consolePlane1.setTexture('sprites','plane_landed');
		}else{
			consolePlane1.setTexture('sprites','plane');
		}
		if(myPlaneSelected == myPlaneTwo)
		{
			consolePlane2.setTexture('sprites','plane_landed');
		}else{
			consolePlane2.setTexture('sprites','plane');
		}
		if(myPlaneSelected == myPlaneThree)
		{
			consolePlane3.setTexture('sprites','plane_landed');
		}else{
			consolePlane3.setTexture('sprites','plane');
		}
		if(myPlaneSelected == myPlaneFour)
		{
			consolePlane4.setTexture('sprites','plane_landed');
		}else{
			consolePlane4.setTexture('sprites','plane');
		}
			infoGameText.setText("Presione (F) para despegar avión");
			fuelText.setText('Combustible: ' + myPlaneSelected.fuel);
			this.checkBomb();		
	}


}
