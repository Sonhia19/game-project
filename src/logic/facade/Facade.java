package logic.facade;

import javax.websocket.Session;

import logic.models.Game;
import logic.models.Player;
import server.ws.WsResponse;

import java.util.HashMap;

public class Facade implements IFacade {

    /**
     * { GameId, {Username, Session} }
     */
    private static HashMap<Integer, HashMap<String, Session>> gameSessionsMap;

    private static Facade instance;

    public static Facade getInstance() {

        if (!(instance instanceof Facade)) {
        	System.out.println("New facade");
            instance = new Facade();
            gameSessionsMap.put(1, new HashMap());
        }
        	

        return instance;
    }

    private Facade() {
        gameSessionsMap = new HashMap<Integer, HashMap<String, Session>>();
    }


    public WsResponse newGame(final String playerName, final Session session) {

    	WsResponse response = new WsResponse();
    	
    	//Se crea partida
    	final int gameId = 1; //obtener prox id desde la bd
    	final Game game = new Game(gameId);
        response.generateResponse("gameId", String.valueOf(game.getId()), "int");

    	//Se crea primer instancia de jugador, con nombre jugador, id partida y el bando
        final Player player = new Player(playerName, gameId, 1);
        response.generateResponse("gameSession", String.valueOf(player), "Player");
        
    	//Se agrega sesion a la partida
        final HashMap<String, Session> gameSession = gameSessionsMap.get(gameId);
        gameSession.put(playerName, session);
        
		return response;
		
    }
    
    public WsResponse connectGameSession(final int gameId, final Session session) {

    	final WsResponse response = new WsResponse();
        final HashMap<String, Session> gameSession = gameSessionsMap.get(gameId);
        gameSession.put(session.getId(), session);
    	response.generateResponse("gameId", String.valueOf(gameId), "int");
    	
		return response;
    }

    public int disconnectGameSession(final Session session) {

        final int gameId = getGameId(session);
        final HashMap sessions = gameSessionsMap.get(gameId);
        sessions.remove(session);
        return 1;
    }
    
	public WsResponse getJsonGameSession(final int gameId, final String userId) {
		WsResponse response = new WsResponse();
		
		// Verificamos si existe la partida.
		/*if (!partidas.existe(idPartida)) {
			r.setExito(false, "No existe la partida");
			return r;
		}
		
		// Obtenemos la partida.
		Partida partida = partidas.obtener(idPartida);*/
		final HashMap<String, Session> gameSession = gameSessionsMap.get(gameId);
		final Game game = new Game(1, userId, gameSession.size());
		response.generateResponse("usersCount", String.valueOf(gameSession.size()), "int");
		// Agregamos la partida en formato string de json al resultado.
		response.generateResponse("game", game.toJson().toString(), "json");
		
		return response;
	}

    public HashMap<String, Session> getGameSessions(final int gameId) {
        return gameSessionsMap.get(gameId);
    }
    
    public int getGameId(final Session session) {

        for (final HashMap sessionsMap : gameSessionsMap.values() ) {
            if (sessionsMap.containsKey(session.getId())) {
                gameSessionsMap.get(sessionsMap);
                //validar que obj devuelve para obtener id de partida
            }
        }
        return 1;
    }
}
