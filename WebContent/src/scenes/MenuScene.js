
import { context } from '../../src/main.js';

export class MenuScene extends Phaser.Scene {  
    constructor() {
        super('MENU');
    } 

    init() {
        
    }

    preload() {

        console.log('FROM MENU');
        this.load.image("background_menu", "assets/background-menu.jpg");
        this.load.image("play_font", "assets/play-font.png");
        this.load.image("newgame_font", "assets/newgame-font.png");
        this.load.image("joingame_font", "assets/joingame-font.png");
    }

    create() {

        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        //se incorporan botones
        var newGameButton = this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.45, "newgame_font").setDepth(0);
        newGameButton.setInteractive();
        var joinGameButton = this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.60, "joingame_font").setDepth(0);
        joinGameButton.setInteractive();

        newGameButton.on('pointerdown', function () {

            this.scene.start("NEWGAME", "hello from MENU scene");
            // this.time.addEvent({
            //     delay: 500,
            //     callback: ()=>{
            //         this.scene.start("NEWGAME", "hello from MENU scene");
            //     },
            //     loop: false
            // })
    
        }, this);

        joinGameButton.on('pointerdown', function () {

            // var gameId = 1; //este dato deberia venir de un input que ponga el usuario
            // context.gameId = gameId;
            // var message = context.messagesFormat.connectToGame("player", gameId);
            // context.functions.sendMessage(message);
            // console.log('join game ' + context.gameId);
            this.scene.start("JOINGAME", "hello from MENU scene");
            // this.time.addEvent({
            //     delay: 500,
            //     callback: ()=>{
            //         this.scene.start("GAME", "hello from MENU scene");
            //     },
            //     loop: false
            // })
    
        }, this);
    }

}