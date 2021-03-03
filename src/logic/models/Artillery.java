package logic.models;

public class Artillery {

	private int id;

	private double armor;

	private double positionX;

	private double positionY;

	private double cadency;

	private double firePower;

	private double reach;

	// artilleryConfig
	private int artilleryType;

	public Artillery(int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.armor = 100;
		this.cadency = 100;
		this.reach = 200;
		this.artilleryType = 1;
		this.firePower = 10;
		this.positionX = positionX;
		this.positionY = positionY;

	}

	public int getId() {
		return id;
	}

	public double getArmor() {
		return armor;
	}

	public double getPositionX() {
		return positionX;
	}

	public double getSpeed() {
		return cadency;
	}

	public double getFirePower() {
		return firePower;
	}

	public double getReach() {
		return reach;
	}

	public int getArtilType() {
		return artilleryType;
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
