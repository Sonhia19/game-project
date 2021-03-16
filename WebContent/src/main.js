
import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { LobbyGameScene } from '../src/scenes/LobbyGameScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { NewGameScene } from '../src/scenes/NewGameScene.js';
import { JoinGameScene } from '../src/scenes/JoinGameScene.js';
import { FinishGameScene } from '../src/scenes/FinishGameScene.js';
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
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    dom: {
        createContainer: true
    },
    scene: [
        LoadScene, MenuScene, NewGameScene, JoinGameScene, LobbyGameScene, GameScene, FinishGameScene
    ]
};

var functions = {

    sendMessage: (message) => {
        context.webSocket.sendMessage(message);
    },

    navigateScene: (last, next) => {
        

        //  if (last == "GAME" || last == "LOBBYGAME") {
        //  	 console.log("FROM " + last);
        //       var theOtherScene = this.scene.get('theOtherSceneBeingRestarted');

        //     this.registry.destroy();
        //     this.events.off();
        //     this.scene.restart();
        //      context.game.scene.restart(last);
        //  } else {
        context.game.scene.stop(last);
        // context.game.scene.add(next);
        context.game.scene.start(next);
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

                    context.functions.navigateScene("NEWGAME", "LOBBYGAME");
                }
            }

            if (response.action.name == 'joinGame') {

                context.gameId = parseInt(response.responses[0].value);

                if (context.gameId != -1) {
                    context.playerSession = JSON.parse(response.responses[1].value);
                    context.playersConnected = parseInt(response.responses[2].value);
                    context.functions.navigateScene("JOINGAME", "LOBBYGAME");
                } else {
                    context.functions.navigateScene("JOINGAME", "JOINGAME");
                }
            }

            if (response.action.name == 'updatePlayersCount') {
                context.playersConnected = JSON.parse(response.responses[2].value);
            }

            if (response.action.name == 'connectToGame') {

                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                context.gameStatus = response.responses[2].value;

                console.log("CONNECT player session");
                console.log(context.playerSession);
                console.log(context.enemySession);

                context.functions.navigateScene("LOBBYGAME", "GAME");
            }
            if (response.action.name == 'recoverGame') {
                context.gameId = parseInt(response.responses[0].value);
                context.playerSession = JSON.parse(response.responses[1].value);
                context.enemySession = JSON.parse(response.responses[3].value);

                context.functions.navigateScene("JOINGAME", "GAME");
            }
            if (response.action.name == 'disconnectSession') {
                context.gameStatus = response.responses[0].value;
                
                if (context.gameStatus == "ENEMY_FINISHED") {
                    context.enemySession.id = null;
                    context.functions.navigateScene("GAME", "FINISHGAME");
                }
            }
            if (response.action.name == 'finishGame') {

                context.gameStatus = response.responses[0].value;
                
                if (context.gameStatus == "FINISHED") {
                    context.functions.navigateScene("GAME", "FINISHGAME");
                }
            }
            if (response.action.name == 'requestSaveGame') {
                context.requestSaveGame = response.responses[0].value;
            } 
            if (response.action.name == 'saveGame') {

                var confirmSave = response.responses[0].value;

                if (confirmSave == 'Si') {
                    context.functions.navigateScene("GAME", "MENU");
                } else {
                    context.responseSaveGame = false;
                }
                
            }
            if (response.action.name == 'syncWithEnemy') {
                context.enemySession = JSON.parse(response.responses[1].value);
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
            }
            if (response.action.name == "syncEmptyTankEnemy") {
                context.enemySession.isEmptyTank = true;
                context.enemySession.planeEmptyTank = JSON.parse(response.responses[1].value);
            }
            if (response.action.name == "syncHighFlyEnemy") {

                context.enemySession.isHighFlying = true;
                context.enemySession.planeHighFly = JSON.parse(response.responses[1].value);
            }
            if (response.action.name == "syncTakeOffEnemy") {
                context.enemySession.isTakeOff = true;
                context.enemySession.planeTakeOff = JSON.parse(response.responses[1].value);
                context.enemySession.takeOff = JSON.parse(response.responses[2].value);
            }
            if (response.action.name == "syncPlaneViewXEnemy") {
                context.enemySession.isPlaneView = true;
                context.enemySession.planeViewPlane = JSON.parse(response.responses[1].value);
                context.enemySession.planeViewCoord = JSON.parse(response.responses[2].value);
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
    gameStatus: null, // STARTED, FINISHED, ENEMY_FINISHED
    playersConnected: 0,
    playerSession: {},
    enemySession: {},
    teamSideWin: 0,
    requestSaveGame: false,
    responseSaveGame: true,
    fromScene: "MENU"
};
