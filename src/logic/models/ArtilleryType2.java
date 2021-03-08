package logic.models;

public class ArtilleryType2 extends Artillery {

	public ArtilleryType2 (int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.armor = 100;
		this.cadency = 1500;
		this.reach = 200;
		this.artilleryType = 2;
		this.firePower = 10;
		this.positionX = positionX;
		this.positionY = positionY;

	}
	
}
