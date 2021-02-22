/** @type {import("../typings/phaser")}  */

import { LoadScene } from '../src/scenes/LoadScene.js';
import { GameScene } from '../src/scenes/GameScene.js';
import { WebSocketClient } from '../src/client/WebSocketClient.js';


var config = {
    scale: {
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: [
        LoadScene, GameScene
    ]
    
};

var game = new Phaser.Game(config);
game.config.webSocket = new WebSocketClient();

console.log(game)