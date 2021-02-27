import {MINUS_X, MINUS_Y, MORE_X, MORE_Y} from '../constants/GameConstants.js'
import { ANGLE_0, ANGLE_135, ANGLE_180, ANGLE_225, ANGLE_270, ANGLE_315, ANGLE_45, ANGLE_90} from '../constants/GameConstants.js';

export let Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.reach = 0;
            this.incX = 0;
            this.incY = 0;
            this.speed = Phaser.Math.GetSpeed(400, 1);
            this.bulletAngle = ANGLE_90;
        },

    fire: function (x, y, angle, reach) {
        switch (angle) {
            case 90:
                this.setPosition(x + 20, y);
                this.angle = angle;
                break;
            case 270:
                this.setPosition(x - 20, y);
                this.angle = angle;
                break;
            case 180:
                this.setPosition(x, y + 20);
                break;
            case 0:
                this.setPosition(x, y - 20);
                break;
        }
        this.bulletAngle = angle;
        this.reach = reach;
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        // if (erraseBullets) {
        //     this.destroy();
        // }
        switch (this.bulletAngle) {
            case 90:
                this.x += this.speed * delta;
                if (this.x > this.reach) {
                    this.destroy();
                }
                break;
            case 270:
                this.x -= this.speed * delta;
                if (this.x < this.reach) {
                    this.destroy();
                }
                break;
            case 180:
                this.y += this.speed * delta;
                if (this.y > this.reach) {
                    this.destroy();
                }
                break;
            case 0:
                this.y -= this.speed * delta;
                if (this.y < this.reach) {
                    this.destroy();
                }
                break;
        }
    }

});