// var webSocket = new WebSocket("ws://localhost:8080/WebSocketServerExample/websocketendpoint");
// 		var echoText = document.getElementById("echoText");
// 		echoText.value = "";
// 		var message = document.getElementById("message");
// 		webSocket.onopen = function(message){ wsOpen(message);};
// 		webSocket.onmessage = function(message){ wsGetMessage(message);};
// 		webSocket.onclose = function(message){ wsClose(message);};
// 		webSocket.onerror = function(message){ wsError(message);};
		

class WebSocketClient {

	
	constructor() {
		
	}
	
	/**
	 * Establece la conexión con el servidor.
	 */
	// conectar() {
	// 	try {
	// 		this.webSocket = new WebSocket("ws://localhost:8080/WebSocketServerExample/websocketendpoint");
	// 		contexto.funciones.inicializarWebSocket(this.webSocket);
	// 	} catch (excepcion) {		
	// 		alert('No se pudo establecer una conexión con el servidor.\nRevisa la consola del navegador para conocer el error.');
	// 		console.log(excepcion);
	// 	}
	// }
	wsOpen(message){
		echoText.value += "Connected ... \n";
	}
	wsSendMessage(){
		webSocket.send(message.value);
		echoText.value += "Message sended to the server : " + message.value + "\n";
		message.value = "";
	}
	wsCloseConnection(){
		webSocket.close();
	}
	wsGetMessage(message){
		echoText.value += "Message received from to the server : " + message.data + "\n";
	}
	wsClose(message){
		echoText.value += "Disconnect ... \n";
	}

	wserror(message){
		echoText.value += "Error ... \n";
	}
}