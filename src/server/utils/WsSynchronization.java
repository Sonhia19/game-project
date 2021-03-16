package server.utils;

import java.io.IOException;
import java.util.HashMap;

import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONObject;

import logic.facade.Facade;
import logic.models.Player;

public class WsSynchronization {

	//Sincroniza todas las sesiones conectadas
	public static void syncGame(final Facade facadeInstance, final int gameId, WsResponse response) throws IOException {
		
		final HashMap<String, Player> gamePlayers = facadeInstance.getGamePlayers(gameId);
		
		if (gamePlayers != null) {
			
			for(final Player player : gamePlayers.values()) {
				
				final Session session = player.getSession();
				if (session != null) {
					session.getBasicRemote().sendText(response.toParsedString());
				}
			}
				
		}
	}

	//Sincroniza unicamente las sesiones enemigas
	public static void syncWithEnemy(final Facade facadeInstance, final int gameId, final String playerName, WsResponse response, String action) throws IOException {
		
		response.setAction((new JSONObject()).put("name", action));
		final HashMap<String, Player> gamePlayers = facadeInstance.getGamePlayers(gameId);
		
		if (gamePlayers != null) {
			
			for(final Player player : gamePlayers.values()) {
				
				if (!player.getName().equals(playerName)) {
					final Session session = player.getSession();
					if (session != null) {
						session.getBasicRemote().sendText(response.toParsedString());
					}
				}
				
			}
		}
	}
	
	//Sincroniza abandono de partida
	public static void syncWithEnemy(final Facade facadeInstance, final int gameId, final WsResponse response, String action) throws IOException {

		response.setAction((new JSONObject()).put("name", action));
		
		final HashMap<String, Player> gamePlayers = facadeInstance.getGamePlayers(gameId);
		
		if (gamePlayers != null) {
			
			for(final Player player : gamePlayers.values()) {

				//Aviso a las sesiones que quedaron conectadas
				final Session session = player.getSession();
				if (session != null) {
					session.getBasicRemote().sendText(response.toParsedString());
				}
			}
		}
	}
}