package server.ws;

import java.awt.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

import exceptions.LogicException;
import logic.facade.Facade;
import logic.models.Player;
import server.utils.WsResponse;
import server.utils.WsSynchronization;

@ServerEndpoint("/websocketendpoint")
public class WsServer {

	private Facade facade;

	@OnOpen
	public void onOpen() throws LogicException {
		System.out.println("Open Connection ...");
		facade = Facade.getInstance();
	}

	@OnClose
	public void onClose() {
		System.out.println("Close Connection ...");
	}

	@OnMessage
	public void onMessage(String message, Session session) {//throws LogicException {
		System.out.println(message);

		final JSONObject action = (new JSONObject(message)).getJSONObject("action");
		final JSONObject parameters = action.has("parameters") ? action.getJSONObject("parameters") : null;
		runAction(action, parameters, session);
	}

	@OnError
	public void onError(Throwable e) {
		e.printStackTrace();
	}

	private void runAction(final JSONObject action, final JSONObject parameters, final Session session) {//throws LogicException {

		WsResponse response = null;

		try {
			if (action.getString("name").equalsIgnoreCase("newGame")) {

				System.out.println("New game ");
				final String playerName = parameters.getString("playerName");
				try {
					response = facade.newGame(playerName, session);
				} catch (LogicException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				response.setAction(action);
				// envia msj al servidor que lo invoco
				session.getBasicRemote().sendText(response.toParsedString());
			}
			if (action.getString("name").equalsIgnoreCase("joinGame")) {

				System.out.println("Join game ");
				final int gameId = parameters.getInt("gameId");
				final String playerName = parameters.getString("playerName");
				response = facade.joinGame(gameId, playerName, session);
				response.setAction(action);
				// envia msj al servidor que lo invoco
				session.getBasicRemote().sendText(response.toParsedString());
				// sincroniza sesiones enemigas para actualiza conexion de nuevo jugador
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), playerName, response,
						"syncWithEnemy");
			}
			// Conectar jugador a una partida existente.
			if (action.getString("name").equalsIgnoreCase("connectToGame")) {

				System.out.println("Connect to game");
				final String playerName = parameters.getString("playerName");
				final int teamSide = parameters.getInt("teamSide");
				final JSONArray jsonArray = parameters.getJSONArray("planesType");
				final ArrayList<Integer> planesType = new ArrayList<Integer>();
				
				if (jsonArray != null) { 
				   int size = jsonArray.length();
				   for (int i = 0; i < size; i++){ 
					   planesType.add(Integer.valueOf(jsonArray.get(i).toString()));
				   }
				}
				
				response = facade.connectGameSession(parameters.getInt("gameId"), playerName, teamSide, planesType, session);
				response.setAction(action);

				System.out.println(response);
				// envia msj al servidor que lo invoco
				session.getBasicRemote().sendText(response.toParsedString());

				response = facade.getJsonGameSession(parameters.getInt("gameId"), playerName);
				// sincroniza sesiones enemigas para actualiza conexion de nuevo jugador
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), playerName, response,
						"syncWithEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncGame")) {

				System.out.println("Sync game");
				response = facade.getJsonGameSession(parameters.getInt("gameId"), parameters.getString("playerName"));
				response.setAction(action);
				session.getBasicRemote().sendText(response.toParsedString());
				response = facade.getJsonGameSession(parameters.getInt("gameId"), parameters.getString("playerName"));
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncGame(facade, parameters.getInt("gameId"), parameters.getString("playerName"),
						response);
			}
			if (action.getString("name").equalsIgnoreCase("syncMove")) {

				System.out.println("Sync move");
				response = facade.getJsonMoveEnemy(parameters.getInt("gameId"), parameters.getString("playerName"),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), parameters.getString("playerName"),
						response, "syncWithEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncShoot")) {

				response = facade.getJsonShootEnemy(parameters.getInt("gameId"), parameters.getString("playerName"),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), parameters.getString("playerName"),
						response, "syncShootEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncBomb")) {

				response = facade.getJsonBombEnemy(parameters.getInt("gameId"), parameters.getString("playerName"),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), parameters.getString("playerName"),
						response, "syncBombEnemy");
			}
			if (action.getString("name").equalsIgnoreCase("syncPlaneDamage")) {

				response = facade.getJsonDamagePlane(parameters.getInt("gameId"), parameters.getString("playerName"),
						parameters);
				// sincroniza todas las sesiones conectadas
				WsSynchronization.syncWithEnemy(facade, parameters.getInt("gameId"), parameters.getString("playerName"),
						response, "syncDamagePlaneEnemy");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
