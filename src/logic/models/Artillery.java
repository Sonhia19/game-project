package logic.models;

public abstract class Artillery {

	int id;

	double armor;

	double positionX;

	double positionY;

	double cadency;

	double firePower;

	double reach;

	int artilleryType;

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
