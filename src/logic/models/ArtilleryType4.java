package logic.models;

public class ArtilleryType4 extends Artillery {

	public ArtilleryType4 (int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.armor = 100;
		this.cadency = 1500;
		this.reach = 200;
		this.artilleryType = 4;
		this.firePower = 10;
		this.positionX = positionX;
		this.positionY = positionY;

	}
	
}
