
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { LobbyGameScene } from '../src/scenes/LobbyGameScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { NewGameScene } from '../src/scenes/NewGameScene.js';
import { JoinGameScene } from '../src/scenes/JoinGameScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';
import { MESSAGES_FORMAT } from '../src/constants/MessagesFormatConstants.js';

//import Phaser from '/phaser';

var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        //scaleMode: Phaser.ScaleManager.SHOW_ALL,

    },
    parent: 'main',
    type: Phaser.AUTO,
    width: 1350,
    height: 650,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    dom: {
        createContainer: true
    },
    scene: [
        LoadScene, MenuScene, NewGameScene, JoinGameScene, LobbyGameScene, GameScene
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
        webSocket.onopen = (event) => {
            //console.log("conexion establecida");
            //console.log(event);
        }
        webSocket.onmessage = (event) => {
            var response = JSON.parse(event.data);

            if (response.action.name == 'newGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                console.log('playerSession');
                console.log(context.playerSession);
            }

            if (response.action.name == 'joinGame') {

                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                context.playersConnected = parseInt(response.responses[2].value);
                
                console.log("JOIN GAME");
                console.log('playerSession');
                console.log(context.playerSession);
                console.log(context.playersConnected);
            }

            if (response.action.name == 'updatePlayersCount') {
                context.playersConnected = JSON.parse(response.responses[2].value);
                console.log("UPDATE PLAYERS COUNT");
                console.log(context.playersConnected);
            }

            if (response.action.name == 'connectToGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                context.enemySession = JSON.parse(response.responses[2].value);

                console.log('playerSession');
                console.log(context.playerSession);
            }

            if (response.action.name == 'syncGame') {
                context.gameId = JSON.parse(response.responses[0].value);
            }

            if (response.action.name == 'syncWithEnemy') {
                context.enemySession = JSON.parse(response.responses[1].value);
                console.log('enemySession');
                console.log(context.enemySession);
            }
            if (response.action.name == "syncShootEnemy") {
                context.enemySession.isShooting = true;
                context.enemySession.planeShooting = JSON.parse(response.responses[1].value);
            }

            if (response.action.name == "syncBombEnemy") {
                context.enemySession.isBombing = true;
                context.enemySession.planeBombing = JSON.parse(response.responses[1].value);
            }
            if (response.action.name == "syncMoveEnemy") {

                context.enemySession.isMoving = true;
                context.enemySession.planeMoving = JSON.parse(response.responses[1].value);
                context.enemySession.planeCoord = JSON.parse(response.responses[2].value);
                // context.enemySession.planeBombing = JSON.parse(response.responses[1].value);
            }
        }
    },
};


export const context = {
    game: new Phaser.Game(config),
    webSocket: new WebSocketClient(),
    functions: functions,
    messagesFormat: MESSAGES_FORMAT,
    gameId: null,
    playersConnected: 0,
    playerSession: {},
    enemySession: {},
    currentScene: 'LOAD'
};
