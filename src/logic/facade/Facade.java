package logic.facade;

import com.google.gson.Gson;
import controller.ArtilleryController;
import controller.GameController;
import controller.PlaneController;
import controller.PlayerController;
import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.GameStatus;
import logic.models.Artillery;
import logic.models.Game;
import logic.models.Plane;
import logic.models.Player;
import org.json.JSONArray;
import org.json.JSONObject;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import server.utils.WsResponse;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.HashMap;

public class Facade implements IFacade {

    /**
     * { GameId, {PlayerName, PlayerSession} }
     */
    private static HashMap<Integer, HashMap<String, Player>> gamePlayersMap;
    private static int TEAM_SIDE_BLUE = 1;
    private static int TEAM_SIDE_RED = 2;
    
    private static Facade instance;
	private GameController gameController;
	private PlayerController playerController;
    private PlaneController planeController;
    private ArtilleryController artilleryController;

    public static Facade getInstance() throws LogicException {

        if (!(instance instanceof Facade)) {
        	System.out.println("New facade");
            instance = new Facade();
            
        }

        return instance;
    }

    private Facade() throws LogicException {
    	gamePlayersMap = new HashMap<Integer, HashMap<String, Player>>();
		gameController = GameController.getInstance();
		playerController = PlayerController.getInstance();
    	planeController = PlaneController.getInstance();
    	artilleryController = ArtilleryController.getInstance();
    }

    public WsResponse saveGame(final int gameId, final JSONObject jsonPlayerSession, final JSONObject jsonEnemySession) throws LogicException {
    	
    	//hacer que venga una partida entera desde el cliente con gameid, estado y si hay ganador quien
    	final WsResponse response = new WsResponse();
    	final Gson gson = new Gson();
    	//cargamos datos que vienen desde servidor a objetos player
        final Player playerSession = gson.fromJson(jsonPlayerSession.toString(), Player.class);
        final Player enemySession = gson.fromJson(jsonEnemySession.toString(), Player.class);
        
    	try {
	    	gameController.saveGame(gameId);//ojo aca tal vez se puede hacer mejor.
	    	int playerSessionId = playerController.savePlayer(gameId, playerSession);
	    	int enemySessionId = playerController.savePlayer(gameId, enemySession);
	    	
	    	//se guardan aviones de player y enemy session
	    	for (Plane plane : playerSession.getPlanes()) {
	    		planeController.savePlane(playerSessionId, plane);
	    	}
	    	
	    	for (Plane plane : enemySession.getPlanes()) {
				planeController.savePlane(enemySessionId, plane);
	    	}
	    	
	    	//se guardan artillerias de player y enemy session
	    	
	    	for (Artillery artillery : playerSession.getArtilleries()) {
	    		artilleryController.saveArtillery(playerSessionId, artillery);
	    	}
	    	
	    	for (Artillery artillery : enemySession.getArtilleries()) {
	    		artilleryController.saveArtillery(enemySessionId, artillery);
	    	}
	    	
    	}
    	catch (LogicException ex)
    	{
    		throw new LogicException(ex.getMessage());
    	}

    	return response;
    }
    
   /* public WsResponse recoverGame(final int gameId) throws LogicException {
    	
    	//hacer que venga una partida entera desde el cliente con gameid, estado y si hay ganador quien
    	final WsResponse response = new WsResponse();
    	final Gson gson = new Gson();
        
    	try {
	    	Game game = gameController.recoverGame(gameId);//ojo aca tal vez se puede hacer mejor.
	    	Player playerSession = playerController.recoverPlayer(gameId, TEAM_SIDE_BLUE);
	    	Player enemySession = playerController.recoverPlayer(gameId, TEAM_SIDE_RED);
    	}
    	catch (LogicException ex)
    	{
    		throw new LogicException(ex.getMessage());
    	}

    	return response;
    }*/

    public WsResponse newGame(final String playerName, final Session session) throws LogicException {
    	
    	final WsResponse response = new WsResponse();
    	int gameId = -1; //obtener prox id desde la bd
    	try {
	    	gameId = gameController.getNewGameId();
    	}
    	catch (LogicException ex)
    	{
    		throw new LogicException(ex.getMessage());
    	}
    	gamePlayersMap.put(gameId, new HashMap<>());
    	//Se crea primer instancia de jugador, con nombre jugador, id partida y bando azul
        final Player player = new Player(playerName, gameId, TEAM_SIDE_BLUE, session);

    	//Se agrega sesion a la partida
        final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
        gamePlayers.put(playerName, player);
        
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());

        //se arma respuesta
        response.generateResponse("gameId", String.valueOf(gameId), "int");
        response.generateResponse("playerSession", result, "String");

		return response;
		
    }
    
    public WsResponse joinGame(final int gameId, final String playerName, final Session session) {

    	final WsResponse response = new WsResponse();
    	final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);

    	//se valida si existe la partida y si ya existe jugador en la partida con mismo nombre
    	if (gamePlayers == null  || gamePlayers.containsKey(playerName)) {
    		response.generateResponse("gameId", "-1", "int");
    	} else {
        	//Se joinea el segundo jugador, con bando rojo
            final Player player = new Player(playerName, gameId, TEAM_SIDE_RED, session);
            final Gson gson = new Gson();
            final String result = gson.toJson(player.preparePlayerToSend());
            gamePlayers.put(playerName, player);

            response.generateResponse("gameId", String.valueOf(gameId), "int");
            response.generateResponse("playerSession", result, "String");
            response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

    	}

		return response;
    }
    
    public WsResponse connectGameSession(final int gameId, final String playerName, final int teamSide, final ArrayList<Integer> planesType,
    		final ArrayList<Integer> artilleriesType, JSONArray structurePositionsJsonArray, final Session session) {

    	final WsResponse response = new WsResponse();
    	
    	//Despues de haber elegido los tipos de aviones en el lobby, los jugadores se conectan a la partida
    	
    	final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
    	final Player player = gamePlayers.get(playerName);
    	player.setPositionXFuel(Integer.valueOf(structurePositionsJsonArray.get(0).toString()));
    	player.setPositionYFuel(Integer.valueOf(structurePositionsJsonArray.get(1).toString()));
    	
    	player.setPositionXTower(Integer.valueOf(structurePositionsJsonArray.get(2).toString()));
    	player.setPositionYTower(Integer.valueOf(structurePositionsJsonArray.get(3).toString()));
    	
    	player.setPositionXHangar(Integer.valueOf(structurePositionsJsonArray.get(4).toString()));
    	player.setPositionYHangar(Integer.valueOf(structurePositionsJsonArray.get(5).toString()));

    	try {
			player.setPlanes(planeController.generatePlanesList(planesType, teamSide));
			player.setArtilleries(artilleryController.generateArtilleriesList(artilleriesType, teamSide));
		} catch (LogicException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	Player enemyPlayer = null;
    	
    	for (final Player enemy : gamePlayers.values()) {
    		enemyPlayer = enemy;
    	}
    	
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());
        final String resultEnemy = gson.toJson(enemyPlayer.preparePlayerToSend());

        response.generateResponse("gameId", String.valueOf(gameId), "int");
        response.generateResponse("playerSession", result, "String");
        response.generateResponse("gameStatus", String.valueOf(GameStatus.INICIADA), "String");
        
		return response;
    }


    public WsResponse disconnectGameSession(final Session session) {

        int gameId = removeSession(session);
        final WsResponse response = new WsResponse();

        if (gameId != -1) {

        	//final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
        	response.generateResponse("gameStatus", String.valueOf(GameStatus.ABANDONADA), "String");
        	response.generateResponse("gameId", String.valueOf(gameId), "int");
        } else {
        	response.generateResponse("gameStatus", String.valueOf(GameStatus.INICIADA), "String");
        }

        return response;

    }
    
	public WsResponse getJsonGameSession(final int gameId, final String playerName) {
		
		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());
		
		final Player player = gamePlayers.get(playerName);
		final Gson gson = new Gson();
		final String resultEnemy = gson.toJson(player.preparePlayerToSend());
        
		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemySession", resultEnemy, "String");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");
		
		return response;
	}

	public WsResponse getJsonShootEnemy(final int gameId, final String playerName, final JSONObject parameters) {

			final WsResponse response = new WsResponse();
			final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
			final Game game = new Game(gameId, playerName, gamePlayers.size());

			int indexPlane =(int)parameters.get("shootingPlane");
			final Gson gson = new Gson();

			response.generateResponse("gameId", String.valueOf(game.getId()), "int");
			response.generateResponse("enemyShoot",gson.toJson(String.valueOf(indexPlane)), "int");
			response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

			return response;
		}

	public WsResponse getJsonBombEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("bombingPlane");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemyBomb",gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonEmptyTankEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("plane");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonTakeOffEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("TakeOffPlane");
		boolean takeOff = (boolean)parameters.get("takeOff");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemyTakeOff",gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("takeOff",gson.toJson(String.valueOf(takeOff)), "boolean");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonPlaneViewEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("viewPlane");
		int coord = (int)parameters.get("coord");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemyTakeOff",gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("takeOff",gson.toJson(String.valueOf(coord)), "int");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonHighFlyEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("plane");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemyHighFly",gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonDamagePlane(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());

		int indexPlane = (int) parameters.get("damagePlane");
		int damage = (int)parameters.get("damage");
		final Gson gson = new Gson();

		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("damagePlane",gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("damage",gson.toJson(String.valueOf(damage)), "double");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");

		return response;
	}

	public WsResponse getJsonMoveEnemy(final int gameId, final String playerName, final JSONObject parameters) {

		final WsResponse response = new WsResponse();
		final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
		final Game game = new Game(gameId, playerName, gamePlayers.size());
		
		int indexPlane = (int) parameters.get("planeId");
		JSONArray planeObject =(JSONArray)parameters.get("planePosition");
		final Gson gson = new Gson();
	    
		response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("planeId", gson.toJson(String.valueOf(indexPlane)), "int");
		response.generateResponse("planePosition", planeObject.toString(), "JSONArray");
		
		/*final int[][] coordinates = new int [4][3];
		JSONArray planeObject =(JSONArray)parameters.get("planeOne");
		int x = (int)planeObject.get(0);
		int y = (int)planeObject.get(1);
		int angle = (int)planeObject.get(2);
		coordinates[0][0] = x;
		coordinates[0][1] = y;
		coordinates[0][2] = angle;
		
		planeObject = (JSONArray)parameters.get("planeTwo");
		x =(int)planeObject.get(0);
		y = (int)planeObject.get(1);
		angle = (int)planeObject.get(2);
		coordinates[1][0] = x;
		coordinates[1][1] = y;
		coordinates[1][2] = angle;
		
		planeObject = (JSONArray)parameters.get("planeThree");
		x =(int)planeObject.get(0);
		y = (int)planeObject.get(1);
		angle = (int)planeObject.get(2);
		coordinates[2][0] = x;
		coordinates[2][1] = y;
		coordinates[2][2] = angle;
		
		planeObject = (JSONArray)parameters.get("planeFour");
		x =(int)planeObject.get(0);
		y = (int)planeObject.get(1);
		angle = (int)planeObject.get(2);
		coordinates[3][0] = x;
		coordinates[3][1] = y;
		coordinates[3][2] = angle;
		
		
		final Player player = gamePlayers.get(playerName);
		final Gson gson = new Gson();
		
		
		final String resultEnemy = gson.toJson(player.preparePlayerToSendMove(player, coordinates));*/
		
		
        
		/*response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		response.generateResponse("enemySession", resultEnemy, "String");
		response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");*/
		
		return response;
	}

    public HashMap<String, Player> getGamePlayers(final int gameId) {
        return gamePlayersMap.get(gameId);
    }
    
    public int removeSession(final Session session) {

    	int resultGameId = -1;
        for (final int gameId : gamePlayersMap.keySet() ) {

        	final HashMap<String, Player> playerSessions = gamePlayersMap.get(gameId);

        	for (final Player playerSession : playerSessions.values()) {

        		if (playerSession.getSession().equals(session)) {
        			gamePlayersMap.get(gameId).remove(playerSession.getName());
        			resultGameId = gameId;
        			break;
        		}
        	}
        }
        return resultGameId;
    }
}
