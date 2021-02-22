package logic.facade;

import javax.websocket.Session;

import logic.models.Game;
import server.ws.WsResponse;

import java.util.HashMap;

public class Facade implements IFacade {

    /**
     * { GameId, {Username, Session} }
     */
    private static HashMap<Integer, HashMap<String, Session>> gameSessionsMap;

    private static Facade instance;

    public static Facade getInstance() {

        if (!(instance instanceof Facade))
            instance = new Facade();

        return instance;
    }

    private Facade() {
        gameSessionsMap = new HashMap<Integer, HashMap<String, Session>>();
    }


    public WsResponse newGame() {

    	final WsResponse response = new WsResponse();
    	final Game game = new Game(1);
        //gameSessionsMap.put(1, new HashMap());
        
        response.generateResponse("gameId", String.valueOf(game.getId()), "int");
		return response;
		
    }

    public void connectGameSession(final int gameId, final Session session) {

        final HashMap<String, Session> gameSession = gameSessionsMap.get(gameId);
        gameSession.put(session.getId(), session);
    }

    public int disconnectGameSession(final Session session) {

        final int gameId = getGameId(session);
        final HashMap sessions = gameSessionsMap.get(gameId);
        sessions.remove(session);
        return 1;
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
