package logic.models;

public class PlaneType2 extends Plane {

	public PlaneType2(int id, double positionX, double positionY, int angle) {

		super(id, positionX, positionY, angle);
		this.fuel = 100;
		this.armor = 100;
		this.speed = 100;
		this.planeType = 1;
		this.firePower = 10;
		this.hasBomb = true;
		this.highFly = false;
	}
	
}