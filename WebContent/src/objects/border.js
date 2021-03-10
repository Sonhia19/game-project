export let Border = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Border(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'border');
            this.internal = false;
            this.enemy = false;
        },
    update: function (time, delta) {
    },
    place: function (i, j, internal, enemy) {
        this.x = j;
        this.y = i;
        this.internal = internal;
        this.enemy = enemy;
        this.setActive(true);
        this.setVisible(true);
        this.displayHeight = 1100;
    }

});
