
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { WaitingGameScene } from '../src/scenes/WaitingGameScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';

//import Phaser from '/phaser';

var config = {
    scale: {
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        //scaleMode: Phaser.ScaleManager.SHOW_ALL,

    },
    parent: 'content',
    type: Phaser.AUTO,
    width: 1350,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
        }
    },
    scene: [
        LoadScene, MenuScene, WaitingGameScene, GameScene
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
            console.log("Respuesta del servidor");

            if (response.action.name == 'newGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                console.log('playerSession');
                console.log(context.playerSession);
            }

            if (response.action.name == 'connectToGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                context.enemySession = JSON.parse(response.responses[2].value);
            }

            if (response.action.name == 'syncGame') {
                context.gameId = JSON.parse(response.responses[0].value);
            }

            if (response.action.name == 'syncWithEnemy') {
                context.enemySession = JSON.parse(response.responses[1].value);

            }
        }
    },


};

var messagesFormat = {
    newGame: (playerName) => {
        return JSON.stringify({
            action: {
                name: 'newGame',
                parameters: {
                    playerName: playerName
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
    connectToGame: (playerName, gameId) => {
        return JSON.stringify({
            action: {
                name: 'connectToGame',
                parameters: {
                    gameId: gameId,
                    playerName: playerName
                }
            }
        })
    },

    syncWithEnemy: () => {
        return JSON.stringify({
            action: {
                name: 'syncWithEnemy',
                parameters: {
                    gameId: context.gameId,
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
    playerSession: {},
    enemySession: {},
    currentScene: 'LOAD'
};
