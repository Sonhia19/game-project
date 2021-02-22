export class BulletTorret extends Phaser.GameObjects.Image {

    constructor(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bulletTorret');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(100, 1);
        }

    fireTorret (x, y, angle) {
        this.setActive(true);
        this.setVisible(true);
        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        //  we don't need to rotate the bullets as they are round
        //    this.setRotation(angle);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 1000;
    }

    update (time, delta) {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
    }
    addBulletTorret(x, y, angle) {

        var bullet = bulletsTurret.get();
    
        if (bullet) {
            bullet.fireTorret(x, y, angle);
        }
    }

}
