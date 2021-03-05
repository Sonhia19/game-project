
import { context } from '../../src/main.js';

export class LoadScene extends Phaser.Scene {  
    constructor() {
        super('LOAD');
    } 

    init() {
        
    }

    preload() {

        console.log('FROM LOAD');
        context.webSocket.connect();
        //this.load.image('background_load', 'assets/background-load.jpg');
        this.load.image('logo', 'assets/logo.jpeg');
        this.load.audio("landing_sound", "assets/load-sound.mp3");

        // var progressBar = this.add.graphics({
        //     fillStyle: {
        //         color: 0xFFFFFF
        //     }
        // })

        // this.load.on("progress", (percent)=> {
        //     progressBar.fillRect(0, context.game.renderer.height / 2,
        //         context.game.renderer.width * percent, 50);
        // })

       
        
    }

    create() {

        this.sound.play("landing_sound", {
            loop: true
        });
        this.add.image(context.game.renderer.width * 0.15, 0, 'logo').setOrigin(0);

        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.scene.start("MENU", "hello from LOAD scene");        
            },
            loop: false
        })

        
    }
}