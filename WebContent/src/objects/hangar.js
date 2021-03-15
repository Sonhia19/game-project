import { context } from '../../src/main.js';
export let Hangar = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Hangar(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'hangar_red');
            this.destroyed = false;
        },
    place: function (i, j, isEnemy) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.2);
        this.setDepth(0);
        this.setTexture(context.playerSession.teamSide == 1 ? isEnemy ? 'hangar_red' : 'hangar_blue' : isEnemy ? 'hangar_blue' : 'hangar_red');
    },
    update: function (time, delta) {

    }
});