
import { context } from '../main.js';

export class NewGameScene extends Phaser.Scene {  
    constructor() {
        super('NEWGAME');
    } 

    init() {
        
    }

    preload() {

        console.log('FROM NEWGAME');
        this.load.image("background_menu", "assets/background-menu.jpg");
        this.load.html('loginForm', 'assets/html/loginform.html');


    }

    create() {

        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        //cargo formulario de login al dom
        var loginForm = this.add.dom(context.game.renderer.width / 2, context.game.renderer.height * 0.50).createFromCache('loginForm');
        loginForm.setPerspective(800);
        loginForm.addListener('click');

        loginForm.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                //envio msj al servidor con nombre de usuario
                var message = context.messagesFormat.newGame(inputUsername.value);
                context.functions.sendMessage(message);
                
                this.destroy();
                
                var delayInMilliseconds = 5000; //2.5 second
                setTimeout(function() {
                        context.game.scene.start("LOBBYGAME", "hello from NEWGAME scene");
                }, delayInMilliseconds);
                
            }
            
        })

        
    }

}