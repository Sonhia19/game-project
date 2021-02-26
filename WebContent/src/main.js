
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { NewGameScene } from '../src/scenes/NewGameScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';

//import Phaser from '/phaser';

var config = {
    scale: {
        //mode: Phaser.Scale.FIT,
		//autoCenter: Phaser.Scale.CENTER_BOTH,
        //scaleMode: Phaser.ScaleManager.SHOW_ALL,
        width: 1500,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
        }
    },
    scene: [
        LoadScene, MenuScene, NewGameScene, GameScene
    ]
};

var functions = {
    changeScene: (last, next) => {
        context.game.scene.remove(last);
        context.game.scene.start(next);
    },

    sendMessage: (message) => {
        context.webSocket.sendMessage(message);
    },

    broadcastWebSocket: (webSocket) => {
        console.log('On broadcast');
        webSocket.onopen = (event) => {
            console.log("conexion establecida");
            console.log(event);
        }
        webSocket.onmessage = (event) => {
            var response = JSON.parse(event.data);
            console.log("nuevo mensaje del servidor");
            console.log(response);

            if (response.action.name == 'newGame') {
                context.gameId = parseInt(response.responses[0].value);
                //este send message seria para obtener informacion luego de iniciada la partida
                //context.functions.sendMessage(context.messagesFormat.newGame());
                context.functions.changeScene('NEWGAME','GAME');
            }

            if (response.action.name == 'connectToGame') {
                context.gameId = parseInt(response.responses[0].value);
               //context.functions.sendMessage(context.messagesFormat.syncGame());
                context.functions.changeScene('LOAD','GAME');
            }
            
            if (response.action.name == 'syncGame') {
                context.gameSession = JSON.parse(response.responses[0].value);
            }
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
    // chat: (message) => {
    //     return JSON.stringify({
    //         action: {
    //             name: 'chat',
    //             parameters: {
    //                 userMessage: message
    //             }
    //         }
    //     })
    // },
    connectToGame: () => {
        return JSON.stringify({
            action: {
                name: 'connectToGame',
                parameters: {
                    gameId: context.gameId
                }
            }
        })
    },
    
    syncGame: () => {
        return JSON.stringify({
            action: {
                name: 'syncGame',
                parameters: {
                    gameId: context.gameId,
                }
            }
        })
    },
};

export const context = {
    game: new Phaser.Game(config),
    webSocket: new WebSocketClient(),
    functions: functions,
    messagesFormat: messagesFormat,
    gameId: null,
    gameSession: {},
    currentScene: 'LOAD'
};
