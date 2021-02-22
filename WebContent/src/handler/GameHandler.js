
export class GameHandler {

    constructor() {
           
    }

    changeScene (last, next) {
        game.scene.remove(last);
        game.scene.start(next);
    }

    sendMessage (message)  {
        console.log('FROM HANDLER');
        webSocket.sendMessage(message);
    }

    broadcastWebSocket(webSocket) {
        webSocket.sendMessage = (event) => {
            response = JSON.parse(event.data);

            console.log("nuevo mensaje del servidor");
            console.log(response);
        }
    }
}