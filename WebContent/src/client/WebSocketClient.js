export class WebSocketClient {
	
	constructor() {
	}

	connect() {
		try {
			this.webSocket = new WebSocket("ws://localhost:8080/game-project/websocketendpoint");
			// contexto.funciones.inicializarWebSocket(this.webSocket);
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