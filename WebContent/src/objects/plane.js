// class Plane extends Phaser.GameObjects.Image {  
//     constructor(config) {
//         super(config.scene, config.x, config.y, "plane");
//         config.scene.add.existing(this);
//         this.scene.physics.add;
//     } 
// }

export class Plane extends Phaser.GameObjects.Image {

    constructor(scene, x, y, angle) {
        super(scene, x, y, 'plane');
        //Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'plane');
        scene.add.existing(this);
        this.fuel = 100;
        this.hp = 100;
        this.withBomb = true;
        this.black = null;
        this.highFly = false;
        this.flying = false;
        this.planeAngle = angle;
        this.speed = Phaser.Math.GetSpeed(100, 1);
        this.cadency = 0;

        var largo = 50;
        var ancho = largo * this.height / this.width;
        //this.displayWidth = largo;
        //this.displayHeight = ancho;
        //this.angle = angle;
        // switch (item) {
        //     case 1:
        //         planeOne = this;
        //         break;
        //     case 2:
        //         planeTwo = this;
        //         break;
        //     case 3:
        //         planeThree = this;
        //         break;
        //     case 4:
        //         planeFour = this;
        //         break;
        // }
        console.log(this);
    }
    emptyTank() {
        var i = 1;
        this.startCrash(i);
    }
    startCrash(i) {
        setTimeout(function () {
            i++;
            if (i < 25) {
                plane.displayWidth = plane.displayWidth * 0.95;
                plane.displayHeight = plane.displayHeight * 0.95;
                plane.startCrash(i);
            }
            setTimeout("plane.crash();", 250)
        }, 2000)
    }
    fire(time) {
        var bullet = bullets.get();
        var reach;
        if (bullet) {
            switch (this.planeAngle) {
                case ANGLE_90:
                    reach = (plane.x + plane.height)
                    break;
                case ANGLE_270:
                    reach = (plane.x - plane.height)
                    break;
                case ANGLE_180:
                    reach = (plane.y + plane.height)
                    break;
                case ANGLE_0:
                    reach = (plane.y - plane.height)
                    break;
            }
            bullet.fire(plane.x, plane.y, this.planeAngle, reach);

            this.cadency = time + 150;
        }
    }
    receiveDamage(damage) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.crash();
        }
    }
    fireBomb() {
        var bomb = bombs.get();
        bomb.setScale(0.1);
        var reach;
        if (bomb) {
            switch (this.planeAngle) {
                case ANGLE_90:
                    reach = (plane.x + plane.height)
                    break;
                case ANGLE_270:
                    reach = (plane.x - plane.height)
                    break;
                case ANGLE_180:
                    reach = (plane.y + plane.height)
                    break;
                case ANGLE_0:
                    reach = (plane.y - plane.height)
                    break;
            }
            bomb.fire(plane.x, plane.y, this.planeAngle, reach);
            plane.withBomb = false;
        }
    }
    place(i, j, item, world, angle) {
        // this.y = i;
        // this.x = j;
        var largo = 50;
        var ancho = largo * this.height / this.width;
        this.displayWidth = largo;
        this.displayHeight = ancho;
        this.angle = angle;
        switch (item) {
            case 1:
                planeOne = this;
                break;
            case 2:
                planeTwo = this;
                break;
            case 3:
                planeThree = this;
                break;
            case 4:
                planeFour = this;
                break;
        }

        // this.setActive(true);
        // this.setVisible(true);
        //world.physics.add.overlap(bulletsTurret, this, torretPlane);
        //world.physics.add.overlap(this, blacks, exploreMap);
    }
    update(time, delta) {

    }
    consumeFuel() {
        if (this.fuel > 0) {
            //this.fuel -= this.highFly ? 0.2 : 0.1;
        }
        if (this.fuel < 0 && this.fuel > -1) {
            this.emptyTank();
        }
    }
    crash() {
        this.black = false;
        plane.destroy();
    }
    takeOff() {
        this.flying = true;
        this.setTexture('sprites', 'plane_flying');
    }
    land() {
        if (this.x < SAFE_ZONE_X) {
            this.flying = false;
            this.fuel = 100;
            this.withBomb = true;
            this.setTexture('sprites', 'plane_landed');
        }
        else {
            console.log("vuelva a la base para aterrizar");
        }


    }
    fly(move, angle, orientation, errase, delta) {
        if (this.flying) {
            if (move) {
                switch (orientation) {
                    case MINUS_X:
                        this.x -= this.speed * delta;
                        break;
                    case MINUS_Y:
                        plane.y -= this.speed * delta;
                        break;
                    case MORE_X:
                        plane.x += this.speed * delta;
                        break;
                    case MORE_Y:
                        plane.y += this.speed * delta;
                        break;
                }
            }
            this.angle = angle;
            this.planeAngle = angle;
            this.consumeFuel();
            erraseBullets = errase;
        }
        else {
            console.log("tiene que despegar");
        }

    }


    placePlane(i, j, item, world, angle) {
        var plane = planes.get();
        if (plane) {
            plane.place(i, j, item, world, angle);
        }
    }

    selectPlane(p) {
        if (plane != p) {
            if (!checkOtherPlaneFlying(p)) {
                angle = ANGLE_90;
                if (planeOne.scene) { unselectPlane(planeOne); };
                if (planeTwo.scene) { unselectPlane(planeTwo); };
                if (planeThree.scene) { unselectPlane(planeThree); };
                if (planeFour.scene) { unselectPlane(planeFour); };
                plane = p;
                plane.angle = angle;
                plane.planeAngle = angle;
                p.flying = false;
                p.setTexture('sprites', 'plane_landed');

            }
            else {
                console.log("No puede volar");
            }

        }
    }
    unselectPlane(p) {
        p.setTexture('sprites', 'plane');
        p.flying = false;
    }

    checkOtherPlaneFlying(p) {
        var oneFlying = false, twoFlying = false, threeFlying = false, fourFlying = false
        if (p != planeOne) {
            oneFlying = planeOne.flying;
        }
        if (p != planeTwo) {
            twoFlying = planeTwo.flying;
        }
        if (p != planeThree) {
            threeFlying = planeThree.flying;
        }
        if (p != planeFour) {
            fourFlying = planeFour.flying;
        }
        return oneFlying || twoFlying || threeFlying || fourFlying;
    }

    // explosion aviones solucionar problema de torretas(siguen disparando luego que la imagen desaparece)
    collisionPlane() {
        if (plane.active === true && plane2.active === true) {
            plane.destroy();
            plane2.destroy();
            collision.setVisible(true);
            setTimeout("collision.setVisible(false)", 150)
            //collision.setVisible(false);

        }

        //alert("Choque aviones");
    }

    highFlyPlane(plane) {

        //Tamaño
        var height = 50;
        plane.displayWidth = plane.highFly ? height * 1.2 : height;
        plane.displayHeight = plane.displayWidth * (plane.height / plane.width);

        //Velocidad
        plane.speed = plane.highFly ? plane.speed / 2 : plane.speed * 2;

    }
}