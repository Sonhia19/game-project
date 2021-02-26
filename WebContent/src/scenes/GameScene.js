import { Plane } from '../objects/plane.js';
import { Turret } from '../objects/turret.js';
import { Bullet } from '../objects/bullet.js';
import { Enemy } from '../objects/enemy.js';
import { Tower } from '../objects/tower.js';
import { Fuel } from '../objects/fuel.js';
import { Hangar } from '../objects/hangar.js';
import { Bomb } from '../objects/bomb.js';
import { Black } from '../objects/black.js';
import { context } from '../../src/main.js';
import { Objects } from '../auxiliar.js'
import { Collections } from '../auxiliar.js'
import { ENEMY_SPEED, BULLET_DAMAGE } from '../constants/GameConstants.js';

let MINUS_Y = 0, MINUS_X = 1, MORE_Y = 2, MORE_X = 3,
	ANGLE_0 = 0, ANGLE_45 = 45, ANGLE_90 = 90, ANGLE_135 = 135, ANGLE_180 = 180, ANGLE_225 = 225, ANGLE_270 = 270, ANGLE_315 = 315,
	SAFE_ZONE_X = 200

let keyCtrl, keyOne, keyTwo, keyThree, keyFour, keyF, keyShift;

let myPlaneSelected, myPlaneOne, myPlaneTwo, myPlaneThree, myPlaneFour;
let enemyPlaneSelected, enemyPlaneOne, enemyPlaneTwo, enemyPlaneThree, enemyPlaneFour;
let cursors;


export class GameScene extends Phaser.Scene {



	constructor() {
		super('GAME');
	}

	init() {

	}

	// ENEMY_SPEED = 1 / 10000;
	// BULLET_DAMAGE = 25;
	

	preload() {

		console.log('Constant ' + ENEMY_SPEED);
		this.load.image('field', 'assets/field.jpg');
		this.load.image('black', 'assets/black.png');
		this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
		this.load.atlas('spritesBase', 'assets/base.png', 'assets/base.json');
		this.load.image('bullet', 'assets/Bullet3.png');
		this.load.image("plane", "./assets/avion_1.png");
		this.load.image("bulletTorret", "./assets/bullet.png");
		this.load.image("bomb", "./assets/bomb.png");
		this.load.image("explosionPlane", "./assets/explosion2.png");
		console.log('FROM GAME');

		this.time.addEvent({
			delay: 500,
			callback: () => {
				let message = context.messagesFormat.syncGame();
				context.functions.sendMessage(message);
			},
			loop: false
		})


	}


	update(time, delta) {

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

		if (Phaser.Input.Keyboard.JustDown(keyF)) {
			if (myPlaneSelected.flying) {
				myPlaneSelected.land(SAFE_ZONE_X);
			}
			else {
				myPlaneSelected.takeOff();
			}
		}
		if (myPlaneSelected != null) {
			if (myPlaneSelected.scene) {

				if (Phaser.Input.Keyboard.JustDown(keyShift)) {
					myPlaneSelected.highFly = !plane.highFly;
					highFlyPlane(plane);
				}
		
				//Si el avion se encuentra dentro de su zona, limpia todo el mapa
				if (myPlaneSelected.x < SAFE_ZONE_X) {
					myPlaneSelected.black = null;
				}

				if (cursors.left.isDown) {
					myPlaneSelected.fly(true, ANGLE_270, MINUS_X, false, delta);
				}
				else if (cursors.right.isDown) {
					myPlaneSelected.fly(true, ANGLE_90, MORE_X, false, delta);
				}
				if (cursors.up.isDown) {
					myPlaneSelected.fly(true, ANGLE_0, MINUS_Y, false, delta);
				}
				else if (cursors.down.isDown) {
					myPlaneSelected.fly(true, ANGLE_180, MORE_Y, false, delta);
				}
				if (cursors.left.isDown && cursors.up.isDown) {
					myPlaneSelected.fly(false, ANGLE_315, null, true, null);
				}
				if (cursors.left.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_225, null, true, null);
				}
				if (cursors.right.isDown && cursors.down.isDown) {
					myPlaneSelected.fly(false, ANGLE_135, null, true, null);
				}
				if (cursors.right.isDown && cursors.up.isDown) {
					myPlaneSelected.fly(false, ANGLE_45, null, true, null);
				}
			}

		}
	}
	create() {

		this.add.image(500, 300, 'field');


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



		cursors = this.input.keyboard.createCursorKeys();
		this.placeMyPlanes();

		//plane.place(300,300,null,this,Enums.ANGLE_90);

		//  Collections.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });

		//  Collections.turrets = this.add.group({ classType: Turret, runChildUpdate: true });

		//  Collections.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

		//  Collections.bulletsTurret = this.physics.add.group({ classType: BulletTorret, runChildUpdate: true });

		//  Collections.bombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });


		// let towers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
		// tower = towers.get();
		// tower.place(50, 930);

		// let fuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
		// fuel = fuels.get();
		// fuel.place(250, 930);

		// let hangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
		// hangar = hangars.get();
		// hangar.place(450, 930);

		// Collections.planes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
		// this.nextEnemy = 0;

		// this.physics.add.overlap(enemies, bullets, damageEnemy);

		// this.physics.add.overlap(bombs, hangars, Bomb.explosionHangar());
		// this.physics.add.overlap(bombs, fuels, Bomb.explosionFuel());
		// this.physics.add.overlap(bombs, towers, Bomb.explosionTower());

		// 
		// placeTurret(75, 850);
		// placeTurret(300, 850);
		// placeTurret(450, 850);

		// blacks = this.physics.add.group({ classType: Black, runChildUpdate: true });
		// //placeBlacks();

		// placePlane(300, 50, 1, this, ANGLE_90);
		// placePlane(200, 50, 2, this, ANGLE_90);
		// placePlane(100, 50, 3, this, ANGLE_90);
		// placePlane(400, 50, 4, this, ANGLE_90);


	}

	placeMyPlanes() {
		myPlaneOne = new Plane(this, 100, 100, ANGLE_90);
		myPlaneTwo = new Plane(this, 100, 200, ANGLE_90);
		myPlaneThree = new Plane(this, 100, 300, ANGLE_90);
		myPlaneFour = new Plane(this, 100, 400, ANGLE_90);
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

	// update(time, delta) {
	//     if (Phaser.Input.Keyboard.JustDown(keyOne)) {
	//         if (planeOne.scene) {
	//             selectPlane(planeOne);
	//         }

	//     }
	//     else if (Phaser.Input.Keyboard.JustDown(keyTwo)) {
	//         if (planeTwo.scene) {
	//             selectPlane(planeTwo);
	//         }
	//     }
	//     else if (Phaser.Input.Keyboard.JustDown(keyThree)) {
	//         if (planeThree.scene) {
	//             selectPlane(planeThree);
	//         }
	//     }
	//     else if (Phaser.Input.Keyboard.JustDown(keyFour)) {
	//         if (planeFour.scene) {
	//             selectPlane(planeFour);
	//         }
	//     }

	//     if (plane != null) {
	//         if (plane.scene) {
	//             if (Phaser.Input.Keyboard.JustDown(keyF)) {
	//                 if(plane.flying){
	//                     plane.land();
	//                 }
	//                 else
	//                 {
	//                     plane.takeOff();
	//                 }
	//             }
	//             if (Phaser.Input.Keyboard.JustDown(keyShift)) {
	//                 plane.highFly = !plane.highFly;
	//                 highFlyPlane(plane);
	//             }

	//             //Si el avion se encuentra dentro de su zona, limpia todo el mapa
	//             if (plane.x < SAFE_ZONE_X) {
	//                 plane.black = null;
	//             }
	//             if (cursors.left.isDown) {
	//                 plane.fly(true, ANGLE_270, MINUS_X, false, delta);
	//             }
	//             else if (cursors.right.isDown) {
	//                 plane.fly(true, ANGLE_90, MORE_X, false, delta);
	//             }
	//             if (cursors.up.isDown) {
	//                 plane.fly(true, ANGLE_0, MINUS_Y, false, delta);
	//             }
	//             else if (cursors.down.isDown) {
	//                 plane.fly(true, ANGLE_180, MORE_Y, false, delta);
	//             }
	//             if (cursors.left.isDown && cursors.up.isDown) {
	//                 plane.fly(false, ANGLE_315, null, true, null);
	//             }
	//             if (cursors.left.isDown && cursors.down.isDown) {
	//                 plane.fly(false, ANGLE_225, null, true, null);
	//             }
	//             if (cursors.right.isDown && cursors.down.isDown) {
	//                 plane.fly(false, ANGLE_135, null, true, null);
	//             }
	//             if (cursors.right.isDown && cursors.up.isDown) {
	//                 plane.fly(false, ANGLE_45, null, true, null);
	//             }
	//             if (cursors.space.isDown && time > plane.cadency && plane.scene) {
	//                 if (plane.flying) {
	//                     switch (plane.planeAngle) {
	//                         case 0:
	//                         case 90:
	//                         case 180:
	//                         case 270:
	//                             plane.fire(time);
	//                             break;
	//                     }
	//                 }
	//                 else {
	//                     console.log("tiene que despegar");
	//                 }


	//             }
	//             if (Phaser.Input.Keyboard.JustDown(keyCtrl)) {
	//                 if (plane.flying) {
	//                         if (plane.withBomb) {
	//                             plane.fireBomb();
	//                         }
	//                         else{
	//                             console.log("no tiene bomba");
	//                         }

	//                 }
	//                 else {
	//                     console.log("tiene que despegar");
	//                 }

	//             }
	//         }
	//     }


	//     if (time > this.nextEnemy) {
	//         let enemy = enemies.get();
	//         if (enemy) {
	//             enemy.setActive(true);
	//             enemy.setVisible(true);
	//             enemy.startOnPath();

	//             this.nextEnemy = time + 2000;
	//         }
	//     }
	//  }
}
