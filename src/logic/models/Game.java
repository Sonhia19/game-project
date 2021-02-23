package logic.models;

import org.json.JSONObject;

public class Game {

	private int id;
	private String userId;
//
//	/**
//	 * Cantidad de combustible disponible de las patrullas.
//	 */
//	private int stockCombustiblePatrullas;
//
//	/**
//	 * Cantidad de combustible disponible de los pesqueros.
//	 */
//	private int stockCombustiblePesqueros;
//
//	/**
//	 * Cantidad disponible de peces.
//	 */
//	private int stockPeces;
//
//	/**
//	 * Estado de la partida.
//	 */
//	private int estado;
//
//	/**
//	 * Cantidad de jugadores totales.
//	 */
//	private int cantidadJugadoresTotales;
//
//	/**
//	 * Cantidad de jugadores conectados actualmente.
//	 */
	private int usersCount;

	public Game(final int gameId, final String userId, final int usersCount) {
		
		this.id = gameId;
		this.userId = userId;
		this.usersCount = usersCount;
	}

	public Game(final int gameId, final String userId) {
		
		this.id = gameId;
		this.userId = userId;
	}

	public Game(final int gameId) {
		
		this.id = gameId;
	}

	public int getId() {
		return id;
	}
	
	
	public String getUserId() {
		return userId;
	}
	
	public int getUsersCount() {
		return usersCount;
	}
	
	public JSONObject toJson() {
		JSONObject game = new JSONObject();
		
		game.put("gameId", id);
		game.put("userId", userId);
		game.put("usersCount", usersCount);
		return game;
	}

}
