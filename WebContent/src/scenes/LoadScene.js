
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
        this.load.image('logo', 'assets/logo_blanco.png');
        //this.load.audio("landing_sound", "assets/load-sound.mp3");
    }

    create() {

        // this.sound.play("landing_sound", {
        //     loop: true
        // });
        this.add.image(context.game.renderer.width * 0.5, context.game.renderer.height * 0.5, 'logo').setScale(0.75);

        this.time.addEvent({
            delay: 2500,
            callback: ()=>{
                this.scene.start("MENU", "hello from LOAD scene");        
            },
            loop: false
        })

        
    }
}