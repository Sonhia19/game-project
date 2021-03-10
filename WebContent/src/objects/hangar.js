export let Hangar = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Hangar(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'hangar');
            this.destroyed = false;
        },
    place: function (i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.2);
        this.setDepth(0);
    },
    update: function (time, delta) {

    }
});