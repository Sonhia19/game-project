export let Artillery = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Artillery(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'artillery');
            this.nextTic = 0;
            this.cadency = 0;
            this.reach = 0;
            this.armor = 0;
            this.firePower = 0;
            this.isEnemy = false;
            this.artilleryIndex = 0;
        },
    place: function (i, j, cadency, reach, armor, firePower, isEnemy, artilleryIndex) {
        this.y = i;
        this.x = j;
        this.cadency = cadency;
        this.reach = reach;
        this.armor = armor;
        this.firePower = firePower;
        this.isEnemy = isEnemy;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.5);
        this.artilleryIndex = artilleryIndex;

        return this;
    },
    fire: function (time, angle, bullets) {
        var bullet = bullets.get();
        this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
        bullet.fire(this.x, this.y, angle, this.firePower, this.reach);
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
    }
});