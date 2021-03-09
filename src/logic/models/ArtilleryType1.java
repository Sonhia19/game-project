package logic.models;

public class ArtilleryType1 extends Artillery {

	public ArtilleryType1 (int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.armor = 100;
		this.cadency = 1500;
		this.reach = 200;
		this.artilleryType = 1;
		this.firePower = 10;
		this.positionX = positionX;
		this.positionY = positionY;

	}
	
}
