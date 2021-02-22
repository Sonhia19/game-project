package valueObjects;

public class VOPlayer {

	private int id;

	private String name;

	private int gameId;

	public VOPlayer(final int id, final String nombre, final int gameId) {
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
