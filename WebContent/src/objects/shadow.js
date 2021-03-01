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

// export class Black extends Phaser.GameObjects.Image{

//     constructor(scene) {
//             Phaser.GameObjects.Image.call(this, scene, 0, 0, 'black');
//         }


//     update (time, delta) {
//         if (plane != null) {
//             if (plane.black == null || (plane.black.x != this.x || plane.black.y != this.y)) {

//                 this.setVisible(true);

//             }
//         }
//     }

//     place (i, j) {
//         this.y = i;
//         this.x = j;
//         this.setActive(true);
//         this.setVisible(true);
//     }


//     placeBlack(black, i, j) {
//         if (black) {
//             black.place(i, j);
//         }

//     }
//     exploreMap(plane, black) {

//         if (plane.active === true && black.active === true) {
//             black.setVisible(false);
//             plane.black = black;
//         }
//     }

//     placeBlacks()
//     {
//         var black;
//         console.log(black);
//         var x = 250, y = 50;
//         for (i = 0; i < 8; i++) {
//             y = 50;
//             for (j = 0; j < 6; j++) {
//                 black = blacks.get();
//                 black.displayHeight = 102;
//                 black.displayWidth = 102;
//                 placeBlack(black, y, x);
//                 y += 100;
//             }
//             x += 100;
//         }
//     }
// }