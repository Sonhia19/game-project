package logic.models;

//Esta clase refleja una sesion de jugador activo en una partida
public class Plane {

	private int id;

	private double fuel;

	private double armor;

	private boolean hasBomb;

	private boolean highFly;

	private double positionX;

	private double positionY;

	private int angle;

	private double speed;

	private double firePower;

	// planeConfig
	private int planeType;

	// Por ahora se precargan los aviones con este constructor
	public Plane(int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.fuel = 100;
		this.armor = 100;
		this.speed = 100;
		this.planeType = 1;
		this.firePower = 10;
		this.hasBomb = true;
		this.highFly = false;
		this.positionX = positionX;
		this.positionY = positionY;
		this.angle = angle;

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

	public int getAngle() {
		return angle;
	}

	public double getSpeed() {
		return speed;
	}

	public double getFirePower() {
		return firePower;
	}

	public int getPlaneType() {
		return planeType;
	}

	public void setAngle(int a) {
		angle = a;
	}

	public double getPositionY() {
		return positionY;
	}

	public void setPositionX(double x) {
		positionX = x;
	}

	public void setPositionY(double y) {
		positionY = y;
	}
}
