
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { GameHandler } from '../src/handler/GameHandler.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';

var contexto;
window.onload = () => {
	// Contexto
	contexto = {
        idBarco: 2,
    }
}

var config = {
    scale: {
        width: 900,
        height: 600,
    },
    scene: [
        GameScene
    ]
};
var game = new Phaser.Game(config);
game.config.webSocket = new WebSocketClient();
//game.config.handler = new GameHandler();

var functions = {
    changeScene: (last, next) => {
        game.scene.remove(last);
        game.scene.start(next);
    },

    sendMessage: (message) => {
        console.log('FROM MAIN');
        console.log(message);
        console.log(game.config.webSocket);
        game.config.webSocket.sendMessage(message);
    },

    broadcastWebSocket: (webSocket) => {
        webSocket.onmessage = (event) => {
            response = JSON.parse(event.data);

            console.log("nuevo mensaje del servidor");
            console.log(response);
        }
    },
};

var messagesFormat = {
    newGame: (cant) => {
        return JSON.stringify({
            action: {
                name: 'newGame',
                parameters: {
                    cantidadPatrullas: cant,
                    cantidadPesqueros: cant,
                }
            }
        })
    },
    
    guardarPartida: () => {
        return JSON.stringify({
            action: {
                name: 'saveGame',
                parameters: {
                    gameId: 1
                }
            }
        })
    },
    chat: (message) => {
        return JSON.stringify({
            action: {
                name: 'chat',
                parameters: {
                    userMessage: message
                }
            }
        })
    }
};
    


game.config.functions = functions;
//game.config.handler = new GameHandler();
game.config.messagesFormat = messagesFormat;
