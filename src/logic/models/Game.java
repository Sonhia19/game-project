package logic.models;

import java.sql.Date;
import java.util.List;

import org.json.JSONObject;

public class Game {

	private int id;
	private String userId;
	private Date fecha;
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
	private int state;
	private int winnerId;
	private Date date;
	private Date updateDate;
	private List<Player> players;
	

	public Game(final int gameId, final String userId, final int usersCount) {
		
		this.id = gameId;
		this.userId = userId;
		this.usersCount = usersCount;
	}
	
	public Game(final int gameId, final int state, final int winnerId,final Date date,final Date updateDate) {
		
		this.id = gameId;
		this.state = state;
		this.winnerId = winnerId;
		this.date = date;
		this.updateDate = updateDate;
		
	}

	public Game(final int gameId, final String userId) {
		
		this.id = gameId;
		this.userId = userId;
	}
	public Game(final int gameId, final String userId,final Date fecha) {
		
		this.id = gameId;
		this.userId = userId;
		this.fecha = fecha;
	}
	public Game(final int gameId, final String userId,final Date fecha,final int state,final int winnerId) {
		
		this.id = gameId;
		this.userId = userId;
		this.fecha = fecha;
		this.state = state;
		this.winnerId = winnerId;
	}
	public Game(final int gameId) {
		
		this.id = gameId;
	}

	public int getId() {
		return id;
	}
	
	public int getState() {
		return this.state;
	}
	public int getWinnerId() {
		return this.winnerId;
	}
	public String getUserId() {
		return userId;
	}
	
	public int getUsersCount() {
		return usersCount;
	}
	public Date getDate() {
		return this.date;
	}
	public Date getUpdateDate() {
		return this.updateDate;
	}
	
	public List<Player> getPlayers() {
		return this.players;
	}
	
	public JSONObject toJson() {
		JSONObject game = new JSONObject();
		
		game.put("gameId", id);
		game.put("userId", userId);
		game.put("usersCount", usersCount);
		return game;
	}

}
