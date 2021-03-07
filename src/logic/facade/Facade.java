package logic.facade;

import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Artillery;
import logic.models.Game;
import logic.models.Player;
import logic.models.Plane;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOGames;
import persistence.daos.DAOPlanes;
import persistence.daos.DAOPlayers;
import persistence.daos.interfaces.IDAOGames;
import persistence.daos.interfaces.IDAOPlanes;
import persistence.daos.interfaces.IDAOPlayers;
import server.utils.WsResponse;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;

public class Facade implements IFacade {

    /**
     * { GameId, {PlayerName, PlayerSession} }
     */
    private static HashMap<Integer, HashMap<String, Player>> gamePlayersMap;
    private static int TEAM_SIDE_RED = 2;
    private static int TEAM_SIDE_BLUE = 1;
    
    private static Facade instance;
    private IDAOGames daoGames;
    private IDAOPlanes daoPlanes;
    private IDAOPlayers daoPlayers;

    public static Facade getInstance() throws LogicException {

        if (!(instance instanceof Facade)) {
        	System.out.println("New facade");
            instance = new Facade();
            
        }

        return instance;
    }

    private Facade() throws LogicException {
    	gamePlayersMap = new HashMap<Integer, HashMap<String, Player>>();
    	daoGames = new DAOGames();
    	daoPlayers = new DAOPlayers();
    	daoPlanes = new DAOPlanes();
    }

    public WsResponse saveGame(final int gameId, final JSONObject jsonPlayerSession, final JSONObject jsonEnemySession) throws LogicException {
    	
    	//hacer que venga una partida entera desde el cliente con gameid, estado y si hay ganador quien
    	final WsResponse response = new WsResponse();
    	final Gson gson = new Gson();
    	//cargamos datos que vienen desde servidor a objetos player
        final Player playerSession = gson.fromJson(jsonPlayerSession.toString(), Player.class);
        final Player enemySession = gson.fromJson(jsonEnemySession.toString(), Player.class);
        
    	try {
	    	IDBConnection icon 	= null;
	    	icon = ConnectionsPool.getInstancia().obtenerConexion();
	    	
	    	daoGames.saveGame(daoGames.buscar(gameId, icon), icon);//ojo aca tal vez se puede hacer mejor.
	    	daoPlayers.savePlayer(gameId, playerSession, icon);
	    	daoPlayers.savePlayer(gameId, enemySession, icon);
	    	
	    	//se guardan aviones de player y enemy session
	    	for (Plane plane : playerSession.getPlanes()) {
	    		daoPlanes.savePlanes(gameId, plane, icon);
	    	}
	    	
	    	for (Plane plane : enemySession.getPlanes()) {
	    		daoPlanes.savePlanes(gameId, plane, icon);
	    	}
	    	
	    	//se guardan artillerias de player y enemy session
	    	/*
	    	for (Artillery artillery : playerSession.getArtilleries()) {
	    		daoArtillery.saveArtillery(gameId, artillery, icon);
	    	}
	    	
	    	for (Artillery artillery : enemySession.getArtilleries()) {
	    		daoArtillery.saveArtillery(gameId, artillery, icon);
	    	}
	    	*/
	    	persistence.connection.ConnectionsPool.getInstancia().liberarConexion(icon, true);
	    	
    	}
    	catch (PersistenceException ex)
    	{
    		throw new LogicException(ex.getMessage());
    	}
    	
        
    	return response;
    }

    public WsResponse newGame(final String playerName, final Session session) throws LogicException {
    	
    	final WsResponse response = new WsResponse();
    	int gameId = 1; //obtener prox id desde la bd
    	/*try {
	    	IDBConnection icon 	= null;
	    	icon = ConnectionsPool.getInstancia().obtenerConexion();
	    	gameId = daoGames.getNewGameId(icon);
	    	persistence.connection.ConnectionsPool.getInstancia().liberarConexion(icon, true);
    	}
    	catch (PersistenceException ex)
    	{
    		throw new LogicException(ex.getMessage());
    	}*/
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
        response.generateResponse("gameId", String.valueOf(gameId), "int");

    	//Se joinea el segundo jugador, con bando rojo
        final Player player = new Player(playerName, gameId, TEAM_SIDE_RED, session);
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());
        gamePlayers.put(playerName, player);
        
        response.generateResponse("playerSession", result, "String");
        response.generateResponse("playersConnected", String.valueOf(gamePlayers.size()), "int");
        
    	//Se agrega sesion a la partida
        
        
		return response;
		
    }
    
    public WsResponse connectGameSession(final int gameId, final String playerName, final int teamSide, final ArrayList<Integer> planesType, final Session session) {

    	final WsResponse response = new WsResponse();
    	
    	//Despues de haber elegido los tipos de aviones en el lobby, los jugadores se conectan a la partida
    	
    	final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
    	final Player player = gamePlayers.get(playerName);
    	player.preloadPlanes(planesType);
    	player.preloadArtilleries();
    			
    	Player enemyPlayer = null;
    	
    	for (final Player enemy : gamePlayers.values()) {
    		enemyPlayer = enemy;
    	}
    	
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());
        final String resultEnemy = gson.toJson(enemyPlayer.preparePlayerToSend());

        response.generateResponse("gameId", String.valueOf(gameId), "int");
        response.generateResponse("playerSession", result, "String");
        //response.generateResponse("enemySession", resultEnemy, "String");
        
        
		return response;
    }


    public int disconnectGameSession(final Session session) {

       /* final int gameId = getGameId(session);
        final HashMap sessions = gamePlayersMap.get(gameId);
        sessions.remove(session);*/
        return 1;
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
    
    public int getGameId(final Player player) {

        for (final HashMap playersMap : gamePlayersMap.values() ) {
            if (playersMap.containsKey(player.getId())) {
            	gamePlayersMap.get(playersMap);
                //validar que obj devuelve para obtener id de partida
            }
        }
        return 1;
    }
}
