package logic.models;

//Esta clase refleja una sesion de jugador activo en una partida
public abstract class Plane {

	int id;

	double fuel;

	double armor;

	boolean hasBomb;

	boolean highFly;

	double positionX;

	double positionY;

	int angle;

	double speed;

	double firePower;

	// planeConfig
	int planeType;

	public Plane(int id, double positionX, double positionY, int angle) {

		this.id = id;
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

	public double getPositionY() {
		return positionY;
	}
	
	public void setAngle(int a) {
		angle = a;
	}

	public void setPositionX(double x) {
		positionX = x;
	}

	public void setPositionY(double y) {
		positionY = y;
	}
}
