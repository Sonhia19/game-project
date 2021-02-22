
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';

var config = {
    scale: {
        width: 900,
        height: 600,
    },
    scene: [
        LoadScene, GameScene
    ],
    webSocket: {},
    functions: {},
    messagesFormat: {}
};

var functions = {
    changeScene: (last, next) => {
        context.game.scene.remove(last);
        context.game.scene.start(next);
    },

    sendMessage: (message) => {
        console.log('FROM MAIN');
        console.log(message);
        context.webSocket.sendMessage(message);
    },

    broadcastWebSocket: (webSocket) => {
        console.log('On broadcast');
        webSocket.onopen = (event) => {
            console.log("conexion establecida");
            console.log(event);
        }
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

export const context = {
    game: new Phaser.Game(config),
    webSocket: new WebSocketClient(),
    functions: functions,
    messagesFormat: messagesFormat
};
