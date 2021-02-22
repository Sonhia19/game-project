/** @type {import("../typings/phaser")}  */

import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
// import { WebSocketClient } from './client/WebSocketClient.js';


var config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 500,
        height: 500,
    },
    scene: [
        LoadScene, MenuScene, GameScene
    ]
    
};

var game = new Phaser.Game(config);
// game.config.webSocket = new WebSocketClient();