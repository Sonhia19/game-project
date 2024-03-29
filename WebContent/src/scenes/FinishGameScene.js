
import { context } from '../../src/main.js';

export class FinishGameScene extends Phaser.Scene {
    constructor() {
        super('FINISHGAME');
    }

    init() {

    }

    preload() {
        this.load.image('background_load', 'assets/background-load.jpg');
        this.load.image('gotoMenu_button', 'assets/go-menu-button.png');

        this.load.image('victory_blue', 'assets/victory_blue.png');
        this.load.image('victory_red', 'assets/victory_red.png');

        this.load.image('defeat_blue', 'assets/defeat_blue.png');
        this.load.image('defeat_red', 'assets/defeat_red.png');

        this.load.audio("winner", "assets/sounds/winner.mp3");
        this.load.audio("defeat", "assets/sounds/defeat.mp3");
    }

    create() {

        this.game.sound.stopAll();
        this.add.image(0, 0, 'background_menu').setOrigin(0);




        if (context.gameStatus == "ENEMY_FINISHED") {
            this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.45, context.playerSession.teamSide == 1 ? 'victory_blue' : 'victory_red').setScale(0.4);
        } else if (context.teamSideWin != 0) {

            if (context.teamSideWin == context.playerSession.teamSide) {
                this.sound.play("winner");
                this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.45, context.playerSession.teamSide == 1 ? 'victory_blue' : 'victory_red').setScale(0.4);
            }
            else {
                this.sound.play("defeat");
                this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.45, context.playerSession.teamSide == 1 ? 'defeat_blue' : 'defeat_red').setScale(0.4);
            }
        }

        context.gameId = null;
        context.gameStatus = null; // STARTED; FINISHED; ENEMY_FINISHED
        context.playersConnected = 0;
        context.playersReadyToPlay = 0,
        context.playerSession = {};
        context.enemySession = {};
        context.teamSideWin = 0;
        context.requestSaveGame = false;
        context.responseSaveGame = true;

        var gotoMenuButton = this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.90, "gotoMenu_button").setDepth(0);
        gotoMenuButton.setInteractive();

        gotoMenuButton.on('pointerdown', function () {
            context.functions.navigateScene("FINISHGAME", "MENU");
        }, this);

    }
}