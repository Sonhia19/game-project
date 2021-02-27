package logic.facade;

import javax.websocket.Session;

import server.ws.WsResponse;

import java.util.HashMap;

public interface IFacade {

	WsResponse newGame(final String playerName, final Session session);

	WsResponse connectGameSession(final int gameId, final Session session);

    int disconnectGameSession(final Session session);
    
    WsResponse getJsonGameSession(final int gameId, final String userId);

    HashMap<String, Session> getGameSessions(final int gameId);

    int getGameId(final Session session);


}
