import { context } from '../../src/main.js';

export class WebSocketClient {
	
	constructor() {
	}

	connect() {
		try {
			this.webSocket = new WebSocket("ws://192.168.0.133:8080/game-project/websocketendpoint");
			context.functions.broadcastWebSocket(this.webSocket);
		} catch (excepcion) {			
			console.log(excepcion);
		}
	}
	
	sendMessage(message) {
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