
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { LobbyGameScene } from '../src/scenes/LobbyGameScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { NewGameScene } from '../src/scenes/NewGameScene.js';
import { JoinGameScene } from '../src/scenes/JoinGameScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';
import { MESSAGES_FORMAT } from '../src/constants/MessagesFormatConstants.js';

var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
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
        }
        webSocket.onmessage = (event) => {
            var response = JSON.parse(event.data);

            if (response.action.name == 'newGame') {
                context.gameId = parseInt(response.responses[0].value);

                if (context.gameId != -1) {
                    context.playerSession = JSON.parse(response.responses[1].value);
                    console.log('playerSession');
                    console.log(context.playerSession);

                    context.functions.changeScene("NEWGAME", "LOBBYGAME");
                }
            }

            if (response.action.name == 'joinGame') {

                context.gameId = parseInt(response.responses[0].value);

                if (context.gameId != -1) {
                    context.playerSession = JSON.parse(response.responses[1].value);
                    context.playersConnected = parseInt(response.responses[2].value);

                    console.log("JOIN GAME");
                    console.log('playerSession');
                    console.log(context.playerSession);
                    console.log(context.playersConnected);
                    context.functions.changeScene("JOINGAME", "LOBBYGAME");
                }
            }

            if (response.action.name == 'updatePlayersCount') {
                context.playersConnected = JSON.parse(response.responses[2].value);
            }

            if (response.action.name == 'connectToGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);

                console.log("CONNECT player session");
                console.log(context.playerSession);
            }

            if (response.action.name == 'syncGame') {
                context.gameId = JSON.parse(response.responses[0].value);
            }

            if (response.action.name == 'syncWithEnemy') {
                context.enemySession = JSON.parse(response.responses[1].value);

                console.log("CONNECT enemy session");
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
            if (response.action.name == "syncEmptyTankEnemy") {

                context.enemySession.isEmptyTank = true;
                context.enemySession.planeEmptyTank = JSON.parse(response.responses[1].value);
            }
            if (response.action.name == "syncHighFlyEnemy") {

                context.enemySession.isHighFlying = true;
                context.enemySession.planeHighFly = JSON.parse(response.responses[1].value);
            }



            // if (response.action.name == "syncDamagePlaneEnemy") {
            //     context.enemySession.isDamaging = true;
            //     context.enemySession.planeDamaging = JSON.parse(response.responses[1].value);
            //     context.enemySession.damage = JSON.parse(response.responses[2].value);
            // }
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
