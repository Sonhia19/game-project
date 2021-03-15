
import { context } from '../main.js';
import { COLOR_DANGER, COLOR_SUCCESS, COLOR_WARNING } from '../constants/GameConstants.js'

let isJoined = false;

let scene;

export class JoinGameScene extends Phaser.Scene {
    constructor() {
        super('JOINGAME');
    }

    init() {

    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'src/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.image("background_menu", "assets/background-menu.jpg");
        this.load.html('joinForm', 'assets/html/joinform.html');
    }

    create() {
        scene = this;
        isJoined = true;
        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        //cargo formulario de login al dom
        var joinForm = this.add.dom(context.game.renderer.width / 2, context.game.renderer.height * 0.50).createFromCache('joinForm');
        joinForm.setPerspective(800);
        joinForm.addListener('click');

        joinForm.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var gameToken = this.getChildByName('gametoken');

                if (inputUsername.value != undefined && gameToken.value != undefined) {

                    if (inputUsername.value == '') {
                        scene.createMessage('Ingrese nombre de usuario', COLOR_DANGER);
                    }
                    else if (gameToken.value == '') {
                        scene.createMessage('Ingrese token de partida', COLOR_DANGER);
                    }
                    else if (isNaN(gameToken.value)) {
                        scene.createMessage('El token debe ser numérico', COLOR_DANGER);
                    }
                    else {
                        //envio msj al servidor con nombre de usuario
                        var message = context.messagesFormat.joinGame(inputUsername.value, gameToken.value);
                        context.functions.sendMessage(message);
                    }



                }
            }

        })
    }

    update() {
        if (isJoined && context.gameId == -1) {
            this.createMessage("Datos invalidos, verifíque y vuelva a intentarlo", COLOR_DANGER);
            isJoined = false;
        }
    }

    createMessage(message, indicator) {
        var toast = this.rexUI.add.toast({
            x: context.game.renderer.width / 2,
            y: 550,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, indicator),
            text: this.add.text(0, 0, '', {
                fontSize: '24px'
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
            duration: {
                in: 200,
                hold: 2000,
                out: 200,
            },
        });
        toast.show(message);
    }

}