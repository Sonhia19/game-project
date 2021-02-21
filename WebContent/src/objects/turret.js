var Turret = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Turret(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
            this.nextTic = 0;
        },
    place: function (i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.5);
    },
    fire: function () {
        if (plane != null) {
            if (plane.scene) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, plane.x, plane.y);
                if (Phaser.Math.Distance.Between(this.x, this.y, plane.x, plane.y) < 200) {
                    //addBulletTorret(this.x, this.y, angle);
                }

                this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }
    },
    update: function (time, delta) {
        if (time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1500;
        }
    }
});

function canPlaceTurret(i, j) {
    //return map[i][j] === 0;
    return true;
}

function placeTurret(i, j) {
    if (canPlaceTurret(i, j)) {
        var turret = turrets.get();
        if (turret) {
            turret.place(i, j);
        }
    }
}