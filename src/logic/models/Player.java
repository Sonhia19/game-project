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
	
	private boolean activeHangar;
	
	private boolean activeFuel;
	
	//torreActiva
	//tanqueActivo
	//hangarActivo
	
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
		this.activeFuel = true;
		this.activeHangar = true;
		this.activeTower = true;
		this.artilleries = artilleries;
		this.planes = planes;
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
	
	public List<Artillery> getArtilleries() {
		return this.artilleries;
	}
	
	public void setPlanes(List<Plane> planes) {
		this.planes = planes;
	}
	
	public void preloadPlanes (final List<Integer> planesType) {
		
		List<Plane> planes = new ArrayList();
		int planeId = 1;
		int positionY = 200;
		for (Integer type : planesType) {
			if (type.equals(1) ) {
				planes.add(new PlaneType1(planeId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(2) ) {
				planes.add(new PlaneType2(planeId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(3) ) {
				planes.add(new PlaneType3(planeId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(4) ) {
				planes.add(new PlaneType4(planeId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			planeId = planeId + 1;
			// los 4 aviones se colocarian en posicionY = 200, 300, 400, 500
			positionY += 100;
		}
		
		this.planes = planes;
	}
	
	public void preloadArtilleries(final List<Integer> artilleriesType) {
		
		List<Artillery> artilleries = new ArrayList();
		int artilleryId = 1;
		int positionY = 200;
		for (Integer type : artilleriesType) {
			if (type.equals(1) ) {
				artilleries.add(new ArtilleryType1(artilleryId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(2) ) {
				artilleries.add(new ArtilleryType2(artilleryId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(3) ) {
				artilleries.add(new ArtilleryType3(artilleryId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			else if (type.equals(4) ) {
				artilleries.add(new ArtilleryType4(artilleryId, this.teamSide == 1? 150 : 850, positionY, this.teamSide == 1? 90:270));
			}
			artilleryId = artilleryId + 1;
			// las 4 artillerias se colocarian en posicionY = 200, 300, 400, 500
			positionY += 100;
		}
		
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
