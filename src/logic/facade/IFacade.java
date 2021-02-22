package logic.facade;

import javax.websocket.Session;

import server.ws.WsResponse;

import java.util.HashMap;

public interface IFacade {

	WsResponse newGame();

    void connectGameSession(final int gameId, final Session session);

    int disconnectGameSession(final Session session);

    HashMap<String, Session> getGameSessions(final int gameId);

    int getGameId(final Session session);


}
