package logic.models;

//Esta clase refleja una sesion de jugador activo en una partida
public class Plane {

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

	int planeType;
	
	int planeCode;
	
	boolean flying;

	public Plane() {
		
	}
	
	public Plane(int planeCode, double positionX, double positionY, int angle) {

		this.planeCode = planeCode;
		this.positionX = positionX;
		this.positionY = positionY;
		this.angle = angle;
	}

	public Plane(double speed,double armor, double firePower) {

		this.speed = speed;
		this.armor = armor;
		this.firePower = firePower;
		
	}
	
	public Plane(int planeCode, double positionX, double positionY, int angle, int fuel, int armor, int firePower, Boolean hasBomb, Boolean highFly, int speed, int planeType, boolean flying) {

		this.planeCode = planeCode;
		this.positionX = positionX;
		this.positionY = positionY;
		this.angle = angle;
		this.fuel = fuel;
		this.armor = armor;
		this.speed = speed;
		this.firePower = firePower;
		this.hasBomb = hasBomb;
		this.highFly = highFly;
		this.planeType = planeType;
		this.flying = flying;
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

	public int getPlaneCode() {
		return planeCode;
	}
	
	public boolean getFlying() {
		return flying;
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
