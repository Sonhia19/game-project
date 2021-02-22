export class Bullet extends Phaser.GameObjects.Image {

    constructor(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.reach = 0;
            this.incX = 0;
            this.incY = 0;
            this.speed = Phaser.Math.GetSpeed(400, 1);
            this.bulletAngle = ANGLE_90;
        }

    fire (x, y, angle, reach) {
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
    }

    update (time, delta) {
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

    addBullet(x, y) {
        var bullet = bullets.get();
        if (bullet) {
            bullet.fire(x, y);
        }
    }



    torretPlane(plane, bullet) {

        if (plane.active === true && bullet.active === true) {
            bullet.destroy();
            plane.receiveDamage(BULLET_DAMAGE);
        }
    }
}