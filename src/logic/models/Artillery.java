package logic.models;

public class Artillery {

	private int id;

	private double armor;

	private double positionX;

	private double positionY;

	private double cadency;

	private double firePower;

	private double reach;

	private String name;

	private int artilleryType;

	public Artillery() {

	}
	public Artillery(int id, double positionX, double positionY, int angle) {

		this.id = id;
		this.armor = 100;
		this.cadency = 1500;
		this.reach = 200;
		this.artilleryType = 1;
		this.firePower = 10;
		this.positionX = positionX;
		this.positionY = positionY;
	}
	
	public Artillery(int id, double positionX, double positionY, int angle,  int armor, int cadency, int reach, int firePower, String name, int artilleryType) {

		this.id = id;
		this.armor = armor;
		this.cadency = cadency;
		this.reach = reach;
		this.firePower = firePower;
		this.positionX = positionX;
		this.positionY = positionY;
		this.name = name;
		this.artilleryType = artilleryType;

	}
	
	public Artillery(String name,double cadency,double armor,double reach,double firePower) {

		this.name = name;
		this.cadency = cadency;
		this.armor = armor;
		this.reach = reach;
		this.firePower = firePower;

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

	public int getArtilleryType() {
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
