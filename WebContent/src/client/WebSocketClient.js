import { context } from '../../src/main.js';

export class WebSocketClient {
	
	constructor() {
	}

	connect() {
		try {
			this.webSocket = new WebSocket("ws://localhost:8080/game-project/websocketendpoint");
			context.functions.broadcastWebSocket(this.webSocket);
		} catch (excepcion) {			
			console.log(excepcion);
		}
	}
	
	sendMessage(message) {
		console.log('ws sending');
		console.log(this.webSocket.readyState);
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