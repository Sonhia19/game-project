var Bullet = new Phaser.Class({

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
            case ANGLE_90:
                this.setPosition(x + 20, y);
                this.angle = angle;
                break;
            case ANGLE_270:
                this.setPosition(x - 20, y);
                this.angle = angle;
                break;
            case ANGLE_180:
                this.setPosition(x, y + 20);
                break;
            case ANGLE_0:
                this.setPosition(x, y - 20);
                break;
        }
        this.bulletAngle = angle;
        this.reach = reach;
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        if (erraseBullets) {
            this.destroy();
        }
        switch (this.bulletAngle) {
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
    }

});

var BulletTorret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bulletTorret');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(100, 1);
        },

    fireTorret: function (x, y, angle) {
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        //  we don't need to rotate the bullets as they are round
        //    this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
    },

    update: function (time, delta) {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
    }

});

function addBullet(x, y) {
    var bullet = bullets.get();
    if (bullet) {
        bullet.fire(x, y);
    }
}

function addBulletTorret(x, y, angle) {

    var bullet = bulletsTurret.get();

    if (bullet) {
        bullet.fireTorret(x, y, angle);
    }
}

function torretPlane(plane, bullet) {

    if (plane.active === true && bullet.active === true) {
        bullet.destroy();
        plane.receiveDamage(BULLET_DAMAGE);
    }
}