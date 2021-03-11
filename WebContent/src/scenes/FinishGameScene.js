
import { context } from '../../src/main.js';

export class FinishGameScene extends Phaser.Scene {  
    constructor() {
        super('FINISHGAME');
    } 

    init() {
        
    }

    preload() {
        console.log('FROM FINISHGAME');
        this.load.image('background_load', 'assets/background-load.jpg');
        this.load.image('gotoMenu_button', 'assets/go-menu-button.png');
        this.load.image('finishGameLose_font', 'assets/finishgame-lose-font.png');
        this.load.image('finishGameWin_font', 'assets/finishgame-win-font.png');
    }

    create() {

        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, 'finishGameWin_font').setOrigin(0);

        var gotoMenuButton = this.add.image(context.game.renderer.width * 0.85, context.game.renderer.height * 0.90, "gotoMenu_button").setDepth(0);
        gotoMenuButton.setInteractive();

        gotoMenuButton.on('pointerdown', function () {

            //context.game.scene.remove(last);
            //this.scene.start("MENU", "hello from FINISH scene");
            this.scene.restart();
            context.functions.changeScene("FINISHGAME", "MENU");
    
        }, this);
        
    }
}