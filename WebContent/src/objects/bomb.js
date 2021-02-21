var Bomb = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Bomb(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bomb');

            this.reach = 0;
            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;
            this.bombAngle = ANGLE_90;
            this.speed = Phaser.Math.GetSpeed(150, 1);
        },

    fire: function (x, y, angle, reach) {
        switch (angle) {
            case ANGLE_90:
                this.setPosition(x + 20, y);
                break;
            case ANGLE_270:
                this.setPosition(x - 20, y);
                break;
            case ANGLE_180:
                this.setPosition(x, y + 20);
                break;
            case ANGLE_0:
                this.setPosition(x, y - 20);
                break;
        }
        this.angle = angle;
        this.bombAngle = angle;
        this.reach = reach;
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        switch (this.bombAngle) {
            case ANGLE_90:
                this.x += this.speed * delta;
                if (this.x > this.reach) {
                    this.destroy();
                }
                break;
            case ANGLE_270:
                this.x -= this.speed * delta;
                if (this.x < this.reach) {
                    this.destroy();
                }
                break;
            case ANGLE_180:
                this.y += this.speed * delta;
                if (this.y > this.reach) {
                    this.destroy();
                }
                break;
            case ANGLE_0:
                this.y -= this.speed * delta;
                if (this.y < this.reach) {
                    this.destroy();
                }
                break;
        }
    },

});

function explosionHangar(hangar, bomb) {
    if (hangar.active === true && bomb.active === true) {
        hangar.destroy();
        bomb.destroy();
    }
}

function explosionFuel(fuel, bomb) {
    if (fuel.active === true && bomb.active === true) {
        fuel.destroy();
        bomb.destroy();
    }
}

function explosionTower(tower, bomb) {
    if (tower.active === true && bomb.active === true) {
        tower.destroy();
        bomb.destroy();
    }
}