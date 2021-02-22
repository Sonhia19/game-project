
export class LoadScene extends Phaser.Scene {  
    constructor() {
        super('LOAD');
    } 

    init() {
        
    }

    preload() {

        this.sys.game.config.webSocket.connect();

        this.load.image('background_load', 'img/background-load.jpg');

        // this.load.image("background_load", "img/background-load.jpg");
        // this.add.image(900, 600, 'background_load');
        // this.load.image("background_menu", "/assets/background-menu.jpg");
        // this.load.audio("landing_sound", "/assets/load-sound.mp3");

        // let progressBar = this.add.graphics({
        //     fillStyle: {
        //         color: 0xFFFFFF
        //     }
        // })

        // this.load.on("progress", (percent)=> {

        //     progressBar.fillRect(0, this.game.renderer.height / 2,
        //         this.game.renderer.width * percent, 50);
        //     console.log(percent);
        // })

        // this.load.on("complete", (percent)=> {
        //     console.log("done");
        // })
        
    }

    create() {
        this.scene.start("MENU", "hello from LOAD scene");
    }
}