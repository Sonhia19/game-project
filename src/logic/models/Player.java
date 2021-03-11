package logic.models;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.Session;

//Esta clase refleja una sesion de jugador activo en una partida
public class Player {

	private int id;

	private String name;

	private int gameId;
	
	private int teamSide;
	
	private List<Plane> planes;
	
	private List<Artillery> artilleries;
	
	private Session session;
	
	private boolean activeTower;
	private double positionXTower;
	private double positionYTower;
	
	private boolean activeHangar;
	private double positionXHangar;
	private double positionYHangar;
	
	private boolean activeFuel;
	private double positionXFuel;
	private double positionYFuel;
	
	public Player() {

	}

	public Player(final String name, final int gameId, final int teamSide, final Session session) {
		this.name = name;
		this.gameId = gameId;
		this.teamSide = teamSide;
		this.session = session;
		this.activeFuel = true;
		this.activeHangar = true;
		this.activeTower = true;
	}
	
	public Player(final String name, final int gameId, final int teamSide) {
		this.name = name;
		this.gameId = gameId;
		this.teamSide = teamSide;
	}

	public Player(final String name, final int gameId, final int teamSide, final List<Plane> planes, final List<Artillery> artilleries) {
		this.name = name;
		this.gameId = gameId;
		this.teamSide = teamSide;
		this.artilleries = artilleries;
		this.planes = planes;

		this.activeFuel = true;
		this.positionXFuel = 0.0;
		this.positionYFuel = 0.0;

		this.activeHangar = true;
		this.positionXHangar = 0.0;
		this.positionYHangar = 0.0;
		this.activeTower = true;
		this.positionXTower = 0.0;
		this.positionYTower = 0.0;
	}
	
	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getGameId() {
		return gameId;
	}
	
	public int getTeamSide() {
		return teamSide;
	}
	
	
	public void setSession(Session session) {
		this.session = session;
	}
	
	public Session getSession() {
		return session;
	}
	
	public boolean getActiveTower() {
		return activeTower;
	}
	
	public boolean getActiveHangar() {
		return activeHangar;
	}
	
	public boolean getActiveFuel() {
		return activeFuel;
	}
	
	public List<Plane> getPlanes() {
		return this.planes;
	}
	
	public void setPlanes(final List<Plane> planes) {
		this.planes = planes;
	}

	public List<Artillery> getArtilleries() {
		return this.artilleries;
	}

	public void setArtilleries(final List<Artillery> artilleries) {
		this.artilleries = artilleries;
	}
	
	public Player preparePlayerToSend() {
		
		return new Player(this.name, this.gameId, this.teamSide, this.planes, this.artilleries);
	}
	
	public Player preparePlayerToSendMove(final Player player, final int[][] coordinates) {
		
		Player returnPlayer = new Player(player.name, player.gameId, player.teamSide);
		returnPlayer.planes = player.planes;
		
		Plane p = returnPlayer.planes.get(0);
		p.setPositionX(coordinates[0][0]);
		p.setPositionY(coordinates[0][1]);
		p.setAngle(coordinates[0][2]);
		returnPlayer.planes.set(0, p);
		
		p = returnPlayer.planes.get(1);
		p.setPositionX(coordinates[1][0]);
		p.setPositionY(coordinates[1][1]);
		p.setAngle(coordinates[1][2]);
		returnPlayer.planes.set(1, p);
		
		p = returnPlayer.planes.get(2);
		p.setPositionX(coordinates[2][0]);
		p.setPositionY(coordinates[2][1]);
		p.setAngle(coordinates[2][2]);
		returnPlayer.planes.set(2, p);
		
		p = returnPlayer.planes.get(3);
		p.setPositionX(coordinates[3][0]);
		p.setPositionY(coordinates[3][1]);
		p.setAngle(coordinates[3][2]);
		returnPlayer.planes.set(3, p);
		
		return returnPlayer;
	}


}
