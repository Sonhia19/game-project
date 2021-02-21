var Black = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Black(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'black');
        },



    update: function (time, delta) {
        if (plane != null) {
            if (plane.black == null || (plane.black.x != this.x || plane.black.y != this.y)) {

                this.setVisible(true);

            }
        }


    }
    ,
    place: function (i, j) {
        this.y = i;
        this.x = j;
        this.setActive(true);
        this.setVisible(true);
    }

});

function placeBlack(black, i, j) {
    if (black) {
        black.place(i, j);
    }

}
function exploreMap(plane, black) {

    if (plane.active === true && black.active === true) {
        black.setVisible(false);
        plane.black = black;
    }
}

function placeBlacks()
{
    var black;
    console.log(black);
    var x = 250, y = 50;
    for (i = 0; i < 8; i++) {
        y = 50;
        for (j = 0; j < 6; j++) {
            black = blacks.get();
            black.displayHeight = 102;
            black.displayWidth = 102;
            placeBlack(black, y, x);
            y += 100;
        }
        x += 100;
    }
}