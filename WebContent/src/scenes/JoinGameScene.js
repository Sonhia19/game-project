
import { context } from '../main.js';

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
                
                //envio msj al servidor con nombre de usuario
                var message = context.messagesFormat.connectToGame(inputUsername.value, gameToken.value);
                console.log(message);
                context.functions.sendMessage(message);
                this.destroy();

                var delayInMilliseconds = 1000; //1 second
                setTimeout(function() {
                    context.game.scene.start("GAME", "hello from NEWGAME scene");
                }, delayInMilliseconds);
            }
            
        })
    }

}