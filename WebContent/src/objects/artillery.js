import { CANON_CAMPANA, MORTERO, ARTILLERIA_COHETE } from '../constants/GameConstants.js';
import { context } from '../../src/main.js';
export let Artillery = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Artillery(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spritesArtilleries', 'mortero_blue');
            this.nextTic = 0;
            this.cadency = 0;
            this.reach = 0;
            this.armor = 0;
            this.firePower = 0;
            this.isEnemy = false;
            this.artilleryIndex = 0;
            this.type = null;
        },
    place: function (i, j, cadency, reach, armor, firePower, isEnemy, artilleryIndex, type) {
        this.y = i;
        this.x = j;
        this.cadency = cadency;
        this.reach = reach;
        this.armor = armor;
        this.firePower = firePower;
        this.isEnemy = isEnemy;
        this.setActive(true);
        this.setVisible(true);
        this.artilleryIndex = artilleryIndex;
        this.type = type;
        this.setTexture('spritesArtilleries', this.getImage(isEnemy));
        let height = 60;
        let width = height * this.height / this.width;
        this.displayWidth = height;
        this.displayHeight = width;

        return this;
    },
    fire: function (scene, time, angle, bullets) {
        var bullet = bullets.get();
        //this.angle = angle;//(angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        bullet.fire(this.x, this.y, angle, this.firePower, this.reach);
        scene.sound.play("canon");
        this.nextTic = time + this.cadency;
    },
    receiveDamage: function (damage) {
        let destroy = false;
        this.armor -= damage;
        if (this.armor <= 0) {
            //this.setTexture('explosion');     
            this.destroy();
            destroy = true;
        }
        return destroy;
    },
    update: function (time, delta) {
    },

    getImage(isEnemy) {
        let artillery;
        let side = context.playerSession.teamSide;
        let color = parseInt(side) == 1 ? isEnemy ? "red" : "blue" : isEnemy ? "blue" : "red";
        switch (this.type) {
            case CANON_CAMPANA:
                artillery = "campana";
                break;
            case MORTERO:
                artillery = "mortero";
                break;
            case ARTILLERIA_COHETE:
                artillery = "cohete";
                break;
        }
        return artillery + "_" + color;
    }

});