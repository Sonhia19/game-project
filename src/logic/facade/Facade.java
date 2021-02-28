package logic.facade;

import javax.websocket.Session;

import com.google.gson.Gson;

import logic.models.Game;
import logic.models.Player;
import server.utils.WsResponse;

import java.util.HashMap;

public class Facade implements IFacade {

    /**
     * { GameId, {PlayerName, PlayerSession} }
     */
    private static HashMap<Integer, HashMap<String, Player>> gamePlayersMap;
    private static int TEAM_SIDE_RED = 1;
    private static int TEAM_SIDE_BLUE = 2;
    
    private static Facade instance;

    public static Facade getInstance() {

        if (!(instance instanceof Facade)) {
        	System.out.println("New facade");
            instance = new Facade();
            gamePlayersMap.put(1, new HashMap());
        }
        	

        return instance;
    }

    private Facade() {
    	gamePlayersMap = new HashMap<Integer, HashMap<String, Player>>();
    }


    public WsResponse newGame(final String playerName, final Session session) {

    	final WsResponse response = new WsResponse();
    	final int gameId = 1; //obtener prox id desde la bd
    	final Game game = new Game(gameId);
        response.generateResponse("gameId", String.valueOf(game.getId()), "int");

    	//Se crea primer instancia de jugador, con nombre jugador, id partida y el bando
        final Player player = new Player(playerName, gameId, TEAM_SIDE_RED, session);
        
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());
        response.generateResponse("playerSession", result, "String");
       
    	//Se agrega sesion a la partida
        final HashMap<String, Player> gamePlayer = gamePlayersMap.get(gameId);
        gamePlayer.put(playerName, player);
        
		return response;
		
    }
    
    public WsResponse connectGameSession(final int gameId, final String playerName, final Session session) {

    	final WsResponse response = new WsResponse();
    	
    	//El nro2 indica el team side, al conectarse se lo marca como segundo jugador por ahora
    	final Player player = new Player(playerName, gameId, TEAM_SIDE_BLUE, session);
    	final HashMap<String, Player> gamePlayers = gamePlayersMap.get(gameId);
        
    	Player enemyPlayer = null;
    	
    	for (final Player enemy : gamePlayers.values()) {
    		enemyPlayer = enemy;
    	}
    	gamePlayers.put(playerName, player);
        
        final Gson gson = new Gson();
        final String result = gson.toJson(player.preparePlayerToSend());
        final String resultEnemy = gson.toJson(enemyPlayer.preparePlayerToSend());

        response.generateResponse("gameId", String.valueOf(gameId), "int");
        response.generateResponse("playerSession", result, "String");
        response.generateResponse("enemySession", resultEnemy, "String");
        
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
