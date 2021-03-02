import { BLUE_SAFE_ZONE_X, MINUS_X, MINUS_Y, MORE_X, MORE_Y, RED_SAFE_ZONE_X } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { context } from '../../src/main.js';

export let Plane = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Plane(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'plane');
            this.fuel = 0;
            this.firePower = 0;
            this.armor = 0;
            this.withBomb = false;
            this.gray = null;
            this.highFly = false;
            this.flying = false;
            this.planeAngle = ANGLE_90;
            this.speed = 0;//Phaser.Math.GetSpeed(100, 1);
            this.cadency = 0;

        },
       

    emptyTank() {
        let i = 1;
        this.startCrash(i);
    },
    startCrash(i) {
        //setTimeout(function () {
            i++;
            if (i < 25) {
                this.displayWidth = this.displayWidth * 0.95;
                this.displayHeight = this.displayHeight * 0.95;
                this.startCrash(i);
            }
            //setTimeout("this.crash();", 2500)
            this.crash();
        //}, 2000)
    },
    fire: function (time, bullets) {
        let bullet = bullets.get();
        let reach;
        if (bullet) {
            switch (this.planeAngle) {
                case ANGLE_90:
                    reach = (this.x + this.height)
                    break;
                case ANGLE_270:
                    reach = (this.x - this.height)
                    break;
                case ANGLE_180:
                    reach = (this.y + this.height)
                    break;
                case ANGLE_0:
                    reach = (this.y - this.height)
                    break;
            }
            bullet.fire(this.x, this.y, this.planeAngle, reach);

            this.cadency = time + 150;
        }
    },
    receiveDamage: function (damage) {
        this.armor -= damage;
        if (this.armor <= 0) {
            this.crash();
        }
    },
    fireBomb: function (bombs) {
        let bomb = bombs.get();
        bomb.setScale(0.1);
        let reach;
        if (bomb) {
            switch (this.planeAngle) {
                case ANGLE_90:
                    reach = (this.x + this.height)
                    break;
                case ANGLE_270:
                    reach = (this.x - this.height)
                    break;
                case ANGLE_180:
                    reach = (this.y + this.height)
                    break;
                case ANGLE_0:
                    reach = (this.y - this.height)
                    break;
            }
            bomb.fire(this.x, this.y, this.planeAngle, reach);
            this.withBomb = false;
        }
    },
    place: function (i, j, angle, fuel, armor, speed, bomb, firePower) {
        this.armor = armor;
        this.fuel = fuel;
        this.withBomb = bomb;
        this.speed = Phaser.Math.GetSpeed(speed, 1);
        this.firePower = firePower;
        this.y = i;
        this.x = j;
        let height = 50;
        let width = height * this.height / this.width;
        this.displayWidth = height;
        this.displayHeight = width;
        this.angle = angle;
        this.body.collideWorldBounds = true;

        // world.physics.add.overlap(bulletsTurret, this, torretPlane);

        return this;
    },
    update: function (time, delta) {

    },
    consumeFuel: function () {
        if (this.fuel > 0) {
            this.fuel -= this.highFly ? 0.2 : 0.1;
        }
        if (this.fuel < 0 && this.fuel > -1) {
            this.emptyTank();
        }
    },
    crash() {
        this.black = false;
        this.destroy();
    },
    takeOff() {
        this.flying = true;
        this.setTexture('sprites', 'plane_flying');
    },
    land() {
        var isBlue = context.playerSession.teamSide == 1;
        var landed = false;
        if (isBlue)
        {
            if (this.x < BLUE_SAFE_ZONE_X ) {
                landed = true;                
            }
        }else
        {
            if (this.x > RED_SAFE_ZONE_X ) {
                landed = true;
            }
        }
        if(landed)
        {
            this.flying = false;
            this.fuel = 100;
            this.withBomb = true;
            this.setTexture('sprites', 'plane_landed');
        }else{
            console.log("vuelva a la base para aterrizar");
        }
    },
    highFlyPlane() {

        this.highFly = !this.highFly;
        //Tamaño
        let height = 50;
        this.displayWidth = this.highFly ? height * 1.2 : height;
        this.displayHeight = this.displayWidth * (this.height / this.width);

        //Velocidad
        this.speed = this.highFly ? this.speed / 2 : this.speed * 2;

    },
    fly(move, angle, orientation, delta) {
        if (this.flying) {
            if (move) {
                switch (orientation) {
                    case MINUS_X:
                        this.x -= this.speed * delta;
                        break;
                    case MINUS_Y:
                        this.y -= this.speed * delta;
                        break;
                    case MORE_X:
                        this.x += this.speed * delta;
                        break;
                    case MORE_Y:
                        this.y += this.speed * delta;
                        break;
                }
            }
            this.angle = angle;
            this.planeAngle = angle;
            this.consumeFuel();
        }
        else {
            console.log("tiene que despegar");
        }

    }

});

// // explosion aviones solucionar problema de torretas(siguen disparando luego que la imagen desaparece)
// function collisionPlane() {
//     if (plane.active === true && plane2.active === true) {
//         plane.destroy();
//         plane2.destroy();
//         collision.setVisible(true);
//         setTimeout("collision.setVisible(false)", 150)
//         //collision.setVisible(false);

//     }

//     //alert("Choque aviones");
// }

// function highFlyPlane(plane) {

//     //Tamaño
//     let height = 50;
//     plane.displayWidth = plane.highFly ? height * 1.2 : height;
//     plane.displayHeight = plane.displayWidth * (plane.height / plane.width);

//     //Velocidad
//     plane.speed = plane.highFly ? plane.speed / 2 : plane.speed * 2;

// }