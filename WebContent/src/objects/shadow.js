export let Black = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Black(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'black');
            this.setDepth(3);
        },



    update: function (time, delta) {
        // if (erraseBullets) {
        //     this.destroy();
        // }

    },
    place(i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
    }

});

export let Gray = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Gray(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'black');
            this.setDepth(2);
            this.setAlpha(0.5);
            this.plane = null;
        },



    update: function (time, delta) {
        if (this.plane != null) {
            if (this.plane.Gray == null || (this.plane.gray.x != this.x || this.plane.gray.y != this.y)) {

                this.setVisible(true);
                this.plane = null;

            }
        }

    },
    place(i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
    }

});