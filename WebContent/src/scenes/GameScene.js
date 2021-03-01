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

//Colecciones de elementos del bando enemigo
let enemyPlanes;
let enemyFuels;
let enemyHangars;
let enemyTowers;
let enemyArtilleries;

//Elementos del propio bando
let myFuel;
let myTower;
let myHangar;
let myPlaneSelected, myPlaneOne, myPlaneTwo, myPlaneThree, myPlaneFour;

//Elementos del bando enemigo
let enemyFuel;
let enemyTower;
let enemyHangar;
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


	update(time, delta) {

		if (context.enemySession.id != undefined && !enemyDraw) {
			enemyDraw = true;
			this.placeEnemyElements();
		}

		if (context.enemySession.id != undefined) {
			this.moveEnemyPlanes()
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
					}
					else {
						myPlaneSelected.takeOff();
					}
				}

				// Vuelto alto / vuelo bajo
				if (Phaser.Input.Keyboard.JustDown(keyShift)) {
					myPlaneSelected.highFlyPlane();
				}
				//Si el avion se encuentra dentro de su zona, limpia todo el mapa
				if (myPlaneSelected.x < isBlue ? BLUE_SAFE_ZONE_X : RED_SAFE_ZONE_X) {
					myPlaneSelected.gray = null;
				}

				//Movimiento de avión
				if (cursors.left.isDown) {
					myPlaneSelected.fly(true, ANGLE_270, MINUS_X, delta);
					this.syncMove();
				}
				else if (cursors.right.isDown) {
					myPlaneSelected.fly(true, ANGLE_90, MORE_X, delta);
					this.syncMove();
				}
				if (cursors.up.isDown) {
					myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, delta);
					this.syncMove();
				}
				else if (cursors.down.isDown) {
					myPlaneSelected.fly(true, ANGLE_180, MORE_Y, delta);
					this.syncMove();
				}
				if (cursors.left.isDown && cursors.up.isDown) {
					myPlaneSelected.fly(false, ANGLE_315, null, null);
					this.syncMove();
				}
				if (cursors.left.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_225, null, null);
					this.syncMove();
				}
				if (cursors.right.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_135, null, null);
					this.syncMove();
				}
				if (cursors.right.isDown && cursors.up.isDown) {
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
								break;
						}
					}
					else {
						console.log("tiene que despegar");
					}


				}

				//Disparo de bomba
				if (Phaser.Input.Keyboard.JustDown(keyCtrl)) {
					if (myPlaneSelected.flying) {
						if (myPlaneSelected.withBomb) {
							myPlaneSelected.fireBomb(myBombs);
						}
						else {
							console.log("no tiene bomba");
						}

					}
					else {
						console.log("tiene que despegar");
					}

				}
			}
		}
	}

	create() {

		console.log(context.playerSession);
		this.add.image(500, 300, 'field');

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
		myPlaneOne = this.placeMyPlane(planesServer[0].positionY, planesServer[0].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[0].fuel, planesServer[0].armor, 100, planesServer[0].hasBomb, 100);
		myPlaneTwo = this.placeMyPlane(planesServer[1].positionY, planesServer[1].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[1].fuel, planesServer[1].armor, 100, planesServer[1].hasBomb, 100);
		myPlaneThree = this.placeMyPlane(planesServer[2].positionY, planesServer[2].positionX, isBlue ? ANGLE_90 : ANGLE_270, planesServer[2].fuel, planesServer[2].armor, 100, planesServer[2].hasBomb, 100);
		myPlaneFour = this.placeMyPlane(planesServer[3].positionY, planesServer[3].positionX, isBlue ? ANGLE_90 : ANGLE_270), planesServer[3].fuel, planesServer[3].armor, 100, planesServer[3].hasBomb, 100;
	}

	placeMyPlane(i, j, angle, fuel, armor, speed, bomb, firePower) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, angle, fuel, armor, speed, bomb, firePower);
		}
	}

	placeEnemyPlanes() {
		let planeEnemyServer = context.enemySession.planes;
		enemyPlaneOne = this.placeEnemyPlane(planeEnemyServer[0].positionY, planeEnemyServer[0].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[0].fuel, planeEnemyServer[0].armor, 100, planeEnemyServer[0].hasBomb, 100);
		enemyPlaneTwo = this.placeEnemyPlane(planeEnemyServer[1].positionY, planeEnemyServer[1].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[1].fuel, planeEnemyServer[1].armor, 100, planeEnemyServer[1].hasBomb, 100);
		enemyPlaneThree = this.placeEnemyPlane(planeEnemyServer[2].positionY, planeEnemyServer[2].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[2].fuel, planeEnemyServer[2].armor, 100, planeEnemyServer[2].hasBomb, 100);
		enemyPlaneFour = this.placeEnemyPlane(planeEnemyServer[3].positionY, planeEnemyServer[3].positionX, isBlue ? ANGLE_270 : ANGLE_90, planeEnemyServer[3].fuel, planeEnemyServer[3].armor, 100, planeEnemyServer[3].hasBomb, 100);
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
		}
	}

	placeEnemyArtillery(i, j) {
		let artillery = enemyArtilleries.get();
		if (artillery) {
			artillery.place(i, j);
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

			}
			else {
				console.log("No puede volar");
			}

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
					//playerId: context.playerSession.
					planeOne: [Math.round(myPlaneOne.x), Math.round(myPlaneOne.y), myPlaneOne.planeAngle],
					planeTwo: [Math.round(myPlaneTwo.x), Math.round(myPlaneTwo.y), myPlaneTwo.planeAngle],
					planeThree: [Math.round(myPlaneThree.x), Math.round(myPlaneThree.y), myPlaneThree.planeAngle],
					planeFour: [Math.round(myPlaneFour.x), Math.round(myPlaneFour.y), myPlaneFour.planeAngle]
				}
			}
		})
		context.functions.sendMessage(json);
	}


}
