package server.ws;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONObject;

import logic.facade.Facade;

@ServerEndpoint("/websocketendpoint")
public class WsServer {
	
	private Facade facade;
	
	@OnOpen
	public void onOpen(){
		System.out.println("Open Connection ...");
		facade = Facade.getInstance();
	}
	
	@OnClose
	public void onClose(){
		System.out.println("Close Connection ...");
	}
	
	@OnMessage
	public void onMessage(String message, Session session){
		System.out.println(message);
		
		JSONObject action = (new JSONObject(message)).getJSONObject("action");
		JSONObject parameters = action.has("parameters") ? action.getJSONObject("parameters") : null;
		runAction(action, parameters, session);
	}

	@OnError
	public void onError(Throwable e){
		e.printStackTrace();
	}
	
	private void runAction (final JSONObject action, final JSONObject parameters, final Session session) {
		
		WsResponse response = null;
		
		try {
		// Nueva partida
			if (action.getString("name").equalsIgnoreCase("newGame")) {
				response = facade.newGame();
				
				// Seteamos la operación al resultado y enviamos el mensaje
				// al cliente.
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
