
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
        this.load.image("newgame_button", "assets/new-game-button.png");
        this.load.image("joingame_button", "assets/join-game-button.png");
        this.load.image("recovergame_button", "assets/recover-game-button.png");
    }

    create() {
        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        //se incorporan botones
        var newGameButton = this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.45, "newgame_button").setDepth(0);
        newGameButton.setInteractive();
        var joinGameButton = this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.60, "joingame_button").setDepth(0);
        joinGameButton.setInteractive();
        var recoverGameButton = this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.75, "recovergame_button").setDepth(0);
        recoverGameButton.setInteractive();

        newGameButton.on('pointerdown', function () {
            
            console.log("ON CLIC NEW");
            context.functions.changeScene("MENU", "NEWGAME");
            //this.scene.start("NEWGAME", "hello from MENU scene");
    
        }, this);

        joinGameButton.on('pointerdown', function () {

            context.functions.changeScene("MENU", "JOINGAME");
            //this.scene.start("JOINGAME", "hello from MENU scene");
    
        }, this);

        recoverGameButton.on('pointerdown', function () {

            context.functions.changeScene("MENU", "JOINGAME");
            //this.scene.start("JOINGAME", "hello from MENU scene");
    
        }, this);
    }

}