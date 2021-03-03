
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
        this.load.html('nameform', 'assets/html/loginform.html');


    }

    create() {

        this.add.image(0, 0, 'background_menu').setOrigin(0);
        this.add.image(context.game.renderer.width / 2, context.game.renderer.height * 0.20, "play_font").setDepth(0);

        var element = this.add.dom(300, 300).createFromCache('nameform');
        element.setPerspective(800);
        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');
                console.log(inputUsername.value);
                console.log(inputPassword.value);

                var message = context.messagesFormat.newGame(inputUsername.value);
                console.log(message);
                // context.functions.sendMessage(message);
            }
        })

      
    }

}