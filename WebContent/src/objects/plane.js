import { Bullet } from '../objects/bullet.js';

export class Plane extends Phaser.GameObjects.Image {

    constructor(scene, x, y, angle) {
        super(scene, x, y, 'plane');
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
        let largo = 50;
        let ancho = largo * this.height / this.width;
        this.displayWidth = largo;
        this.displayHeight = ancho;
        
       this.angle = angle;
    }
    emptyTank() {
        let i = 1;
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
    fire(time, bullets) {
        console.log(bullets);
        let bullet = bullets.get();
        let reach;
        if (bullet) {
            switch (this.planeAngle) {
                case 90:
                    reach = (this.x + this.height)
                    break;
                case 270:
                    reach = (this.x - this.height)
                    break;
                case 180:
                    reach = (this.y + this.height)
                    break;
                case 0:
                    reach = (this.y - this.height)
                    break;
            }
            bullet.fire(this.x, this.y, this.planeAngle, reach);

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
        let bomb = bombs.get();
        bomb.setScale(0.1);
        let reach;
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
    place(i, j, item, scene, angle) {
        let largo = 50;
        let ancho = largo * this.height / this.width;
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
        //scene.physics.add.overlap(bulletsTurret, this, torretPlane);
        //scene.physics.add.overlap(this, blacks, exploreMap);
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
    land(safe_zone) {
        if (this.x < safe_zone) {
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
                	//MINUS_X
                    case 1:
                        this.x -= this.speed * delta;
                        break;
                    //MINUS_Y
                    case 0:
                        this.y -= this.speed * delta;
                        break;
                    //MORE_X
                    case 3:
                        this.x += this.speed * delta;
                        break;
                    //MORE_Y
                    case 2:
                        this.y += this.speed * delta;
                        break;
                }
            }
            this.angle = angle;
            this.planeAngle = angle;
            this.consumeFuel();
            //erraseBullets = errase;
        }
        else {
            console.log("tiene que despegar");
        }

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

    highFlyPlane() {

        this.highFly = !this.highFly;
        //Tamaño
        let height = 50;
        this.displayWidth = this.highFly ? height * 1.2 : height;
        this.displayHeight = this.displayWidth * (this.height / this.width);

        //Velocidad
        this.speed = this.highFly ? this.speed / 2 : this.speed * 2;

    }
}