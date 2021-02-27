package server.ws;

import java.io.IOException;
import java.util.HashMap;

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
				System.out.println("New game " + session.getId());
				response = facade.newGame(parameters.get("playerName").toString(), session);
				//facade.connectGameSession(1, session);
				
				// Seteamos la operación al resultado y enviamos el mensaje
				// al cliente.
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());
			}
			// Conectar el jugador a la partida.
			if (action.getString("name").equalsIgnoreCase("connectToGame")) {
				System.out.println("Connect to game");
				response = facade.connectGameSession(parameters.getInt("gameId"), session);
				
				// Seteamos la operación al resultado y enviamos el mensaje
				// al cliente.
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());
				
				syncGame(parameters.getInt("gameId"), session.getId());
			}
			
			// Sincroniza la partida con el cliente. Obtiene el objeto Partida en
			// formato JSON y se lo manda al jugador.
			if (action.getString("name").equalsIgnoreCase("syncGame")) {
				System.out.println("Sync game");
				/*response = facade.getJsonGameSession(parameters.getInt("gameId"), session.getId());
				
				// Seteamos la operación al resultado y enviamos el mensaje
				// al cliente.
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());*/
				
				syncGame(parameters.getInt("gameId"), session.getId());
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void syncGame(final int gameId, final String userId) throws IOException {
		// Obtenemos la partida como JSON y agregamos el nombre de la operación.
		final WsResponse response = facade.getJsonGameSession(gameId, userId);
		response.setAction((new JSONObject()).put("name", "syncGame"));
		
		final HashMap<String, Session> sessiones = facade.getGameSessions(gameId);
		if (sessiones != null) {
			for(final Session session : sessiones.values()) {
				session.getBasicRemote().sendText(response.toParsedString());
			}
				
		}
	}

}
