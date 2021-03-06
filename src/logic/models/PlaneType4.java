package logic.models;

public class PlaneType4 extends Plane {

	public PlaneType4(int id, double positionX, double positionY, int angle, int type) {

		super(id, positionX, positionY, angle);
		this.fuel = 100;
		this.armor = 100;
		this.speed = 100;
		this.planeType = 1;
		this.firePower = 10;
		this.hasBomb = true;
		this.highFly = false;
		this.planeType = type;
	}
	
}
