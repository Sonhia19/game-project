export let Tower = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Tower(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spritesBase', 'tower');
            this.nextTic = 0;
            this.destroyed = false;
        },
    place: function (i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.3);
    },
    fire: function (time, angle, bullets) {
        var bullet = bullets.get();
        bullet.fire(this.x, this.y, angle, 15, 300);
        this.nextTic = time + 1000;
    },
    update: function (time, delta) {
    }
});