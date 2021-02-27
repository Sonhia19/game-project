package logic.models;

import java.util.ArrayList;
import java.util.List;

//Esta clase refleja una sesion de jugador activo en una partida
public class Player {

	private int id;

	private String name;

	private int gameId;
	
	private int teamSide;
	
	private List<Plane> planes;
	
	//torreActiva
	//tanqueActivo
	//hangarActivo
	
	public Player(final String name, final int gameId, final int teamSide) {
		this.name = name;
		this.gameId = gameId;
		this.teamSide = teamSide;
		this.planes = preloadPlanes();
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
	
	private List preloadPlanes () {
		
		List<Plane> planes = new ArrayList();
		
		planes.add(new Plane(1, 100, 50));
		planes.add(new Plane(2, 200, 50));
		planes.add(new Plane(3, 300, 50));
		planes.add(new Plane(4, 400, 50));
		
		return planes;
	}

}
