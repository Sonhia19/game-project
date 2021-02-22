package logic.models;

public class Player {

	private int id;

	private String name;

	private int gameId;

	public Player(final int id, final String name, final int gameId) {
		this.id = id;
		this.name = name;
		this.gameId = gameId;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getGameId() {
		return gameId;
	}

}
