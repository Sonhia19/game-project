package logic.models;

//Esta clase refleja una sesion de jugador activo en una partida
public class Plane {

	private int id;
	
	private double fuel;
	
	private double armor;
	
	private Boolean hasBomb;
	
	private Boolean highFly;
	
	private double positionX;
	
	private double positionY;
	

	//private int planeConfig;
	
	
	//Por ahora se precargan los aviones con este constructor
	public Plane(int id, double positionX, double positionY) {
	
		this.id = id;
		this.fuel = 10.5;
		this.armor = 10.5;
		this.hasBomb = true;
		this.highFly = false;
		this.positionX = positionX;
		this.positionY = positionY;
		
	}

	public int getId() {
		return id;
	}
	
	public double getFuel() {
		return fuel;
	}
	
	public double getArmor() {
		return armor;
	}
	
	public Boolean getHasBomb() {
		return hasBomb;
	}
	
	public Boolean getHighFly() {
		return highFly;
	}

	public double getPositionX() {
		return positionX;
	}
	
	public double getPositionY() {
		return positionY;
	}
}
