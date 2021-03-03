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
	
	public Player(final String name, final int gameId, final int teamSide, final Session session) {
		this.name = name;
		this.gameId = gameId;
		this.teamSide = teamSide;
		this.session = session;
		this.planes = preloadPlanes();
		this.artilleries = preloadArtilleries();
		this.activeFuel = true;
		this.activeHangar = true;
		this.activeTower = true;
		//Crear arreglo de 4 aviones con valores cargados por defecto, y asignarlos al array del jugador
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
	
	
	private List<Plane> preloadPlanes () {
		
		List<Plane> planes = new ArrayList();
		
		planes.add(new Plane(1, this.teamSide == 1? 150 : 850, 200, this.teamSide == 1? 90:270));
		planes.add(new Plane(2, this.teamSide == 1? 150 : 850, 300, this.teamSide == 1? 90:270));
		planes.add(new Plane(3, this.teamSide == 1? 150 : 850, 400, this.teamSide == 1? 90:270));
		planes.add(new Plane(4, this.teamSide == 1? 150 : 850, 500, this.teamSide == 1? 90:270));
		
		return planes;
	}
	
	private List<Artillery> preloadArtilleries()
	{
		List<Artillery> artilleries = new ArrayList();
		artilleries.add(new Artillery(1, this.teamSide == 1? 175 : 825, 75, 0));
		artilleries.add(new Artillery(2, this.teamSide == 1? 175 : 825, 250, 0));
		artilleries.add(new Artillery(3, this.teamSide == 1? 175 : 825, 350, 0));
		artilleries.add(new Artillery(4, this.teamSide == 1? 175 : 825, 550, 0));
		return artilleries;
	}
	
	public Player preparePlayerToSend() {
		
		return new Player(this.name, this.gameId, this.teamSide, null);
	}
	public Player preparePlayerToSendMove(final Player player, final int[][] coordinates) {
		
		Player returnPlayer = new Player(player.name, player.gameId, player.teamSide, null);
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
