import { BLUE_SAFE_ZONE_X, MINUS_X, MINUS_Y, MORE_X, MORE_Y, RED_SAFE_ZONE_X } from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90 } from '../constants/GameConstants.js';
import { context } from '../../src/main.js';
import { LANDED, FLYING, UNSELECT, ELIMINATED } from '../constants/GameConstants.js';
import { BOMBARDERO, CAZA, PATRULLA, RECONOCIMIENTO } from '../constants/GameConstants.js';

export let Plane = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Plane(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'plane');
            this.planeIndex = 0;
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
            this.type = null;

        },


    emptyTank(sync) {
        this.armor = 0;
        this.flying = false;
        this.startCrash();
        this.destroy()
        if (sync) {
            let json = JSON.stringify({
                action: {
                    name: 'syncEmptyTank',
                    parameters: {
                        gameId: context.gameId,
                        playerName: context.playerSession.name,
                        plane: this.planeIndex
                    }
                }
            })
            context.functions.sendMessage(json);
        }

    },
    startCrash() {
        this.displayWidth = this.displayWidth * 0.95;
        this.displayHeight = this.displayHeight * 0.95;
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
            bullet.fire(this.x, this.y, this.planeAngle, reach, this.firePower, this.highFly);

            this.cadency = time + 150;
        }
    },
    receiveDamage: function (damage) {
        let destroy = false;
        this.armor -= damage;
        if (this.armor <= 0) {
            this.flying = false;
            //this.setTexture('explosion');     
            this.destroy();
            destroy = true;
        }
        return destroy;
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
    place: function (i, j, angle, fuel, armor, speed, bomb, firePower, planeIndex, type) {
        this.planeIndex = planeIndex;
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
        this.planeAngle = angle;
        this.type = type;
        this.setTexture(this.getImage(UNSELECT));

        // world.physics.add.overlap(bulletsTurret, this, torretPlane);

        return this;
    },
    update: function (time, delta) {

    },
    consumeFuel: function () {
        if (this.fuel > 0) {
            //this.fuel -= this.highFly ? 0.2 : 0.1;
        }
        if (this.fuel < 0 && this.fuel > -1) {
            this.emptyTank(true);
        }
    },
    crash() {
        this.black = false;
        this.destroy();
    },
    takeOff() {
        this.flying = true;
        this.setDepth(1);
        this.setTexture(this.getImage(FLYING));
    },
    land() {
        var isBlue = context.playerSession.teamSide == 1;
        var landed = false;
        if (isBlue) {
            if (this.x < BLUE_SAFE_ZONE_X) {
                landed = true;
            }
        } else {
            if (this.x > RED_SAFE_ZONE_X) {
                landed = true;
            }
        }
        if (landed) {
            this.setDepth(0);
            this.highFly = false;
            this.flying = false;
            this.fuel = 100;
            this.withBomb = true;
            let height = 50;
            this.displayWidth = height;
            this.displayHeight = this.displayWidth * (this.height / this.width);
            this.setTexture(this.getImage(LANDED));
        } else {
            console.log("vuelva a la base para aterrizar");
        }
    },
    highFlyPlane(sync) {

        this.highFly = !this.highFly;
        this.setDepth(this.highFly ? 2 : 1);
        //Tamaño
        let height = 50;
        this.displayWidth = this.highFly ? height * 1.2 : height;
        this.displayHeight = this.displayWidth * (this.height / this.width);

        //Velocidad
        this.speed = this.highFly ? this.speed / 2 : this.speed * 2;
        if (sync) {
            let json = JSON.stringify({
                action: {
                    name: 'syncHighFly',
                    parameters: {
                        gameId: context.gameId,
                        playerName: context.playerSession.name,
                        plane: this.planeIndex

                    }
                }
            })
            context.functions.sendMessage(json);
        }


    },
    fly(move, angle, orientation, delta) {

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

    },
    getImage(status) {
        let plane;
        let side = context.playerSession.teamSide;
        let color = side == 1 ? "azul" : "rojo";
        let situation;
        switch (status) {
            case UNSELECT:
                sitation = "default";
                break;
            case FLYING:
                situation = "volando";
                break;
            case LANDED:
                situation = "aterrizado";
                break;
            case ELIMINATED:
                situation = "eliminado";
                break;
        }
        switch (this.type) {
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
        return plane + "_" + color + "_" + situation;
    }

});