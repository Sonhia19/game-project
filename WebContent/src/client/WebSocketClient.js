export class WebSocketClient {
	
	constructor() {
	}

	connect() {
		try {
			this.webSocket = new WebSocket("ws://localhost:8080/game-project/websocketendpoint");
			console.log(this);
			this.game.config.functions.broadcastWebSocket(this.webSocket);
		} catch (excepcion) {			
			console.log(excepcion);
		}
	}
	
	sendMessage(message) {
		console.log('ws sending');
		console.log('otro');
		console.log(this.webSocket.readyState);
		console.log(contexto);
		if (this.webSocket.readyState == WebSocket.OPEN) {
			this.webSocket.send(message);
		}
	}
	
	
	dissconect() {
		if (this.webSocket.readyState == WebSocket.OPEN) {
			this.webSocket.close();
		}
	}
}