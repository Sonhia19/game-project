
import { context } from '../main.js';
import {COLOR_DANGER, COLOR_SUCCESS, COLOR_WARNING} from '../constants/GameConstants.js'

//para validar si el usuario pudo crear la partida
let isCreated = false;

let scene;

export class NewGameScene extends Phaser.Scene {  
    constructor() {
        super('NEWGAME');
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
        this.load.html('loginForm', 'assets/html/loginform.html');
        this.load.image('gotoMenu_button', 'assets/go-menu-button.png');
    }

    create() {
        scene = this;
        isCreated = true;
        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        //cargo formulario de login al dom
        var loginForm = this.add.dom(context.game.renderer.width / 2, context.game.renderer.height * 0.50).createFromCache('loginForm');
        loginForm.setPerspective(800);
        loginForm.addListener('click');

        loginForm.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');

                if (inputUsername.value != undefined && inputUsername.value != '') {
                    //envio msj al servidor con nombre de usuario
                    var message = context.messagesFormat.newGame(inputUsername.value);
                    context.functions.sendMessage(message);
                }
                else if(inputUsername.value != undefined && inputUsername.value == '')
                {
                        scene.createMessage("Ingrese nombre de usuario", COLOR_DANGER);
                }
            }
            
        })

        var gotoMenuButton = this.add.image(context.game.renderer.width * 0.50, context.game.renderer.height * 0.90, "gotoMenu_button").setDepth(0);
        gotoMenuButton.setInteractive();

        gotoMenuButton.on('pointerdown', function () {
            context.functions.navigateScene("NEWGAME", "MENU");
        }, this);
    }

    update () {
        if (isCreated && context.gameId == -1) {
            this.createMessage("Ha ocurrido un error, vuelva a intentarlo", COLOR_DANGER);
            isCreated = false;
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