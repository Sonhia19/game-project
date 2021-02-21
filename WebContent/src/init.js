var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1000,
    height: 600,

    physics: {
        default: "arcade",
        arcade: {
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var ENEMY_SPEED = 1 / 10000;

var BULLET_DAMAGE = 25;

function preload() {
    this.load.image('field', 'assets/field.jpg');
    this.load.image('black', 'assets/black.png');
    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.atlas('spritesBase', 'assets/base.png', 'assets/base.json');
    this.load.image('bullet', 'assets/Bullet3.png');
    this.load.image("plane", "./assets/avion_1.png");
    this.load.image("bulletTorret", "./assets/bullet.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.image("explosionPlane", "./assets/explosion2.png");
}

function create() {

    this.add.image(500, 300, 'field');


    //capturar tecla control
    keyCtrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    var graphics = this.add.graphics();
    path = this.add.path(200, 0);
    path.lineTo(200, 600);


    graphics.lineStyle(3, 0xffffff, 1);
    path.draw(graphics);

    var graphics = this.add.graphics();

    path = this.add.path(800, 0);
    path.lineTo(800, 600);


    graphics.lineStyle(3, 0xffffff, 1);
    path.draw(graphics);

    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });

    turrets = this.add.group({ classType: Turret, runChildUpdate: true });

    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    bulletsTurret = this.physics.add.group({ classType: BulletTorret, runChildUpdate: true });

    bombs = this.physics.add.group({ classType: Bomb, runChildUpdate: true });


    var towers = this.physics.add.group({ classType: Tower, runChildUpdate: true });
    tower = towers.get();
    tower.place(50, 930);

    var fuels = this.physics.add.group({ classType: Fuel, runChildUpdate: true });
    fuel = fuels.get();
    fuel.place(250, 930);

    var hangars = this.physics.add.group({ classType: Hangar, runChildUpdate: true });
    hangar = hangars.get();
    hangar.place(450, 930);

    planes = this.physics.add.group({ classType: Plane, runChildUpdate: true });
    this.nextEnemy = 0;

    this.physics.add.overlap(enemies, bullets, damageEnemy);

    this.physics.add.overlap(bombs, hangars, explosionHangar);
    this.physics.add.overlap(bombs, fuels, explosionFuel);
    this.physics.add.overlap(bombs, towers, explosionTower);

    cursors = this.input.keyboard.createCursorKeys();
    placeTurret(75, 850);
    placeTurret(300, 850);
    placeTurret(450, 850);

    blacks = this.physics.add.group({ classType: Black, runChildUpdate: true });
    //placeBlacks();

    placePlane(300, 50, 1, this, ANGLE_90);
    placePlane(200, 50, 2, this, ANGLE_90);
    placePlane(100, 50, 3, this, ANGLE_90);
    placePlane(400, 50, 4, this, ANGLE_90);


}

function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for (var i = 0; i < 8; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(640, i * 64);
    }
    for (var j = 0; j < 10; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
}

function update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(keyOne)) {
        if (planeOne.scene) {
            selectPlane(planeOne);
        }

    }
    else if (Phaser.Input.Keyboard.JustDown(keyTwo)) {
        if (planeTwo.scene) {
            selectPlane(planeTwo);
        }
    }
    else if (Phaser.Input.Keyboard.JustDown(keyThree)) {
        if (planeThree.scene) {
            selectPlane(planeThree);
        }
    }
    else if (Phaser.Input.Keyboard.JustDown(keyFour)) {
        if (planeFour.scene) {
            selectPlane(planeFour);
        }
    }

    if (plane != null) {
        if (plane.scene) {
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                if(plane.flying){
                    plane.land();
                }
                else
                {
                    plane.takeOff();
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyShift)) {
                plane.highFly = !plane.highFly;
                highFlyPlane(plane);
            }

            //Si el avion se encuentra dentro de su zona, limpia todo el mapa
            if (plane.x < SAFE_ZONE_X) {
                plane.black = null;
            }
            if (cursors.left.isDown) {
                plane.fly(true, ANGLE_270, MINUS_X, false, delta);
            }
            else if (cursors.right.isDown) {
                plane.fly(true, ANGLE_90, MORE_X, false, delta);
            }
            if (cursors.up.isDown) {
                plane.fly(true, ANGLE_0, MINUS_Y, false, delta);
            }
            else if (cursors.down.isDown) {
                plane.fly(true, ANGLE_180, MORE_Y, false, delta);
            }
            if (cursors.left.isDown && cursors.up.isDown) {
                plane.fly(false, ANGLE_315, null, true, null);
            }
            if (cursors.left.isDown && cursors.down.isDown) {
                plane.fly(false, ANGLE_225, null, true, null);
            }
            if (cursors.right.isDown && cursors.down.isDown) {
                plane.fly(false, ANGLE_135, null, true, null);
            }
            if (cursors.right.isDown && cursors.up.isDown) {
                plane.fly(false, ANGLE_45, null, true, null);
            }
            if (cursors.space.isDown && time > plane.cadency && plane.scene) {
                if (plane.flying) {
                    switch (plane.planeAngle) {
                        case 0:
                        case 90:
                        case 180:
                        case 270:
                            plane.fire(time);
                            break;
                    }
                }
                else {
                    console.log("tiene que despegar");
                }


            }
            if (Phaser.Input.Keyboard.JustDown(keyCtrl)) {
                if (plane.flying) {
                        if (plane.withBomb) {
                            plane.fireBomb();
                        }
                        else{
                            console.log("no tiene bomba");
                        }
                    
                }
                else {
                    console.log("tiene que despegar");
                }

            }
        }
    }


    if (time > this.nextEnemy) {
        var enemy = enemies.get();
        if (enemy) {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        }
    }
}