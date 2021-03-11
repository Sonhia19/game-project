
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
        this.load.image('finishGameWin1_font', 'assets/finishgame-win1-font.png');
        this.load.image('finishGameWin2_font', 'assets/finishgame-win2-font.png');
    }

    create() {

        this.add.image(0, 0, 'background_menu').setOrigin(0);

        if (context.gameStatus == "ENEMIGO_ABANDONO") {
            this.add.image(context.game.renderer.width * 0.40, context.game.renderer.height * 0.30, 'finishGameWin2_font').setOrigin(0);
        } else if (context.teamSideWin != 0) {

            console.log(context.teamSideWin);
            console.log(context.playerSession.teamSide);
            if ( (context.teamSideWin == 1 && context.playerSession.teamSide == 1) ||
                (context.teamSideWin == 2 && context.playerSession.teamSide == 2)) {
                this.add.image(context.game.renderer.width * 0.40, context.game.renderer.height * 0.30, 'finishGameWin1_font').setOrigin(0);
            } else {
                this.add.image(context.game.renderer.width * 0.40, context.game.renderer.height * 0.30, 'finishGameLose_font').setOrigin(0);
            }
        }
        
        var gotoMenuButton = this.add.image(context.game.renderer.width * 0.85, context.game.renderer.height * 0.90, "gotoMenu_button").setDepth(0);
        gotoMenuButton.setInteractive();

        gotoMenuButton.on('pointerdown', function () {
            context.functions.navigateScene("FINISHGAME", "MENU");
    
        }, this);
        
    }
}