import { Plane } from '../objects/plane.js';
import { Artillery } from '../objects/artillery.js';
import { Bullet } from '../objects/bullet.js';
import { Enemy } from '../objects/enemy.js';
import { Tower } from '../objects/tower.js';
import { Fuel } from '../objects/fuel.js';
import { Border } from '../objects/border.js';
import { Hangar } from '../objects/hangar.js';
import { Bomb } from '../objects/bomb.js';
import { Black } from '../objects/black.js';
import { context } from '../../src/main.js';
import { ENEMY_SPEED, BULLET_DAMAGE } from '../constants/GameConstants.js';
import { MINUS_X, MINUS_Y, MORE_X, MORE_Y } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { BLUE_SAFE_ZONE_X, BLUE_PLANE_X, BLUE_BASE_X, BLUE_ARTILLERY_X } from '../constants/GameConstants.js';

//Bandera para saber el bando del jugador
let isBlue;

//Teclas a capturar
let keyCtrl, keyOne, keyTwo, keyThree, keyFour, keyF, keyShift;


let enemyPlaneSelected, enemyPlaneOne, enemyPlaneTwo, enemyPlaneThree, enemyPlaneFour;
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

//Elementos del propio bando
let myFuel;
let myTower;
let myHangar;
let myPlaneSelected, myPlaneOne, myPlaneTwo, myPlaneThree, myPlaneFour;


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


	update(time, delta) {

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
						myPlaneSelected.land(isBlue ? BLUE_SAFE_ZONE_X : 0);
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
				if (myPlaneSelected.x < isBlue ? BLUE_SAFE_ZONE_X : 0) {
					myPlaneSelected.black = null;
				}

				//Movimiento de avión
				if (cursors.left.isDown) {
					myPlaneSelected.fly(true, ANGLE_270, MINUS_X, delta);
				}
				else if (cursors.right.isDown) {
					myPlaneSelected.fly(true, ANGLE_90, MORE_X, delta);
				}
				if (cursors.up.isDown) {
					myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, delta);
				}
				else if (cursors.down.isDown) {
					myPlaneSelected.fly(true, ANGLE_180, MORE_Y, delta);
				}
				if (cursors.left.isDown && cursors.up.isDown) {
					myPlaneSelected.fly(false, ANGLE_315, null, null);
				}
				if (cursors.left.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_225, null, null);
				}
				if (cursors.right.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_135, null, null);
				}
				if (cursors.right.isDown && cursors.up.isDown) {
					myPlaneSelected.fly(false, ANGLE_45, null, null);
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

		this.add.image(500, 300, 'field');

		isBlue = true;

		//capturar tecla control
		keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
		keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

		let graphics = this.add.graphics();
		let path;
		path = this.add.path(200, 0);
		path.lineTo(200, 600);
		graphics.lineStyle(3, 0xffffff, 1);
		path.draw(graphics);
		graphics = this.add.graphics();
		path = this.add.path(800, 0);
		path.lineTo(800, 600);
		graphics.lineStyle(3, 0xffffff, 1);
		path.draw(graphics);

		graphics = this.add.graphics();
		path = this.add.path(1000, 300);
		path.lineTo(1400, 300);
		graphics.lineStyle(3, 0xffffff, 1);
		path.draw(graphics);


		myBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
		myBombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
		myPlanes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
		myFuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
		myHangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
		myTowers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
		myArtilleries = this.physics.add.group({ classType: Artillery, runChildUpdate: true });
		borders = this.physics.add.group({ classType: Border, runChildUpdate: true });

		let border = borders.get();
		border.place(50, 1000, true);

		myFuel = myFuels.get();
		myFuel.place(150, isBlue ? BLUE_BASE_X : 0);

		myHangar = myHangars.get();
		myHangar.place(500, isBlue ? BLUE_BASE_X : 0);

		myTower = myTowers.get();
		myTower.place(325, isBlue ? BLUE_BASE_X : 0);

		this.placeMyArtillery(75, BLUE_ARTILLERY_X);
		this.placeMyArtillery(250, BLUE_ARTILLERY_X);
		this.placeMyArtillery(350, BLUE_ARTILLERY_X);
		this.placeMyArtillery(550, BLUE_ARTILLERY_X);

		cursors = this.input.keyboard.createCursorKeys();

		myPlaneOne = this.placeMyPlane(200, isBlue ? BLUE_PLANE_X : 0, this, ANGLE_90);
		myPlaneTwo = this.placeMyPlane(300, isBlue ? BLUE_PLANE_X : 0, this, ANGLE_90);
		myPlaneThree = this.placeMyPlane(400, isBlue ? BLUE_PLANE_X : 0, this, ANGLE_90);
		myPlaneFour = this.placeMyPlane(500, isBlue ? BLUE_PLANE_X : 0, this, ANGLE_90);

		this.physics.add.overlap(myPlanes, borders, this.borderPlane);
		//this.physics.add.overlap(myBombs, myHangars, this.borderPlane);
		//  Collections.bulletsTurret = this.physics.add.group({ classType: BulletTorret, runChildUpdate: true });

		//  Collections.

		// this.physics.add.overlap(enemies, bullets, damageEnemy);

		// this.physics.add.overlap(bombs, hangars, Bomb.explosionHangar());
		// this.physics.add.overlap(bombs, fuels, Bomb.explosionFuel());
		// this.physics.add.overlap(bombs, towers, Bomb.explosionTower());

		// 


		// blacks = this.physics.add.group({ classType: Black, runChildUpdate: true });
		// //placeBlacks();

	}

	placeMyPlane(i, j, world, angle) {
		let plane = myPlanes.get();
		if (plane) {
			return plane.place(i, j, world, angle);
		}
	}

	placeMyArtillery(i, j) {
		let artillery = myArtilleries.get();
		if (artillery) {
			artillery.place(i, j);
		}
	}

	selectPlane(p) {
		if (myPlaneSelected != p) {
			if (!this.checkOtherPlaneFlying(p)) {
				let angle = ANGLE_90;
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
		if (plane.active === true && borders.active === true) {
			plane.x = 965;
		}
	}
}
