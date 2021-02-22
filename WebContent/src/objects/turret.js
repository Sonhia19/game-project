export class Turret extends Phaser.GameObjects.Image {

    constructor(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
            this.nextTic = 0;
        }
    place (i2, j2) {
        this.y = i2;
        this.x = j2;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.5);
    }
    fire () {
        if (plane != null) {
            if (plane.scene) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, plane.x, plane.y);
                if (Phaser.Math.Distance.Between(this.x, this.y, plane.x, plane.y) < 200) {
                    //addBulletTorret(this.x, this.y, angle);
                }

                this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }
    }
    update(time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1500;
        }
    }


    canPlaceTurret(i, j) {
        //return map[i][j] === 0;
        return true;
    }

    placeTurret(i, j) {
        if (canPlaceTurret(i, j)) {
            var turret = turrets.get();
            if (turret) {
                turret.place(i, j);
            }
        }
    }
}