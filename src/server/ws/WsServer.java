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
import logic.models.Player;
import server.utils.WsResponse;
import server.utils.WsSynchronization;

@ServerEndpoint("/websocketendpoint")
public class WsServer {

	private Facade facade;

	@OnOpen
	public void onOpen() {
		System.out.println("Open Connection ...");
		facade = Facade.getInstance();
	}

	@OnClose
	public void onClose() {
		System.out.println("Close Connection ...");
	}

	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println(message);

		final JSONObject action = (new JSONObject(message)).getJSONObject("action");
		final JSONObject parameters = action.has("parameters") ? action.getJSONObject("parameters") : null;
		runAction(action, parameters, session);
	}

	@OnError
	public void onError(Throwable e) {
		e.printStackTrace();
	}

	private void runAction(final JSONObject action, final JSONObject parameters, final Session session) {

		WsResponse response = null;

		try {
			if (action.getString("name").equalsIgnoreCase("newGame")) {

				System.out.println("New game " + session.getId());
				final String playerName = parameters.get("playerName").toString().concat(session.getId());
				response = facade.newGame(playerName, session);
				response.setAction(action);
				// envia msj al servidor que lo invoco
				session.getBasicRemote().sendText(response.toParsedString());
			}
			// Conectar jugador a una partida existente.
			if (action.getString("name").equalsIgnoreCase("connectToGame")) {

				System.out.println("Connect to game");
				final String playerName = parameters.get("playerName").toString().concat(session.getId());
				response = facade.connectGameSession(parameters.getInt("gameId"), playerName, session);
				response.setAction(action);

				// envia msj al servidor que lo invoco
				session.getBasicRemote().sendText(response.toParsedString());

				response = facade.getJsonGameSession(parameters.getInt("gameId"), playerName);
				// sincroniza sesiones enemigas para actualiza conexion de nuevo jugador
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), playerName, response,
						"syncWithEnemy");
			}

			if (action.getString("name").equalsIgnoreCase("syncGame")) {

				System.out.println("Sync game");
				response = facade.getJsonGameSession(parameters.getInt("gameId"), session.getId());
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());
				response = facade.getJsonGameSession(parameters.getInt("gameId"), "player".concat(session.getId()));
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncGame(facade, parameters.getInt("gameId"), "player".concat(session.getId()),
						response);
			}
			if (action.getString("name").equalsIgnoreCase("syncMove")) {

				System.out.println("Sync move");
				response = facade.getJsonMoveEnemy(parameters.getInt("gameId"), "player".concat(session.getId()),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), "player".concat(session.getId()),
						response, "syncWithEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncShoot")) {

				response = facade.getJsonShootEnemy(parameters.getInt("gameId"), "player".concat(session.getId()),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), "player".concat(session.getId()),
						response, "syncShootEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncBomb")) {

				response = facade.getJsonBombEnemy(parameters.getInt("gameId"), "player".concat(session.getId()),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), "player".concat(session.getId()),
						response, "syncBombEnemy");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
