
import { context } from '../main.js';

let isJoined = false;

export class JoinGameScene extends Phaser.Scene {  
    constructor() {
        super('JOINGAME');
    } 

    init() {
        
    }

    preload() {

        console.log('FROM JOINGAME');
        this.load.image("background_menu", "assets/background-menu.jpg");
        this.load.html('joinForm', 'assets/html/joinform.html');
    }

    create() {

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

                if (inputUsername.value != undefined && inputUsername.value != ''
                    && gameToken.value != undefined && gameToken.value != '') {
                
                    //envio msj al servidor con nombre de usuario
                    var message = context.messagesFormat.joinGame(inputUsername.value, gameToken.value);
                    context.functions.sendMessage(message);
                }
            }
            
        })
    }

    update () {
        if (isJoined && context.gameId == -1) {
            console.log("DATOS INVALIDOS");
            isJoined = false;
        }
    }

}