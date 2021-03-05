package logic.facade;

import javax.websocket.Session;

import logic.models.Player;
import server.utils.WsResponse;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;

public interface IFacade {

	WsResponse newGame(final String playerName, final Session session);
	
	WsResponse joinGame(final int gameId, final String playerName, final Session session);

	WsResponse connectGameSession(final int gameId, final String playerName, final int teamSide, final ArrayList<Integer> planesType, final Session session);

    int disconnectGameSession(final Session session);
    
    WsResponse getJsonGameSession(final int gameId, final String userId);

    HashMap<String, Player> getGamePlayers(final int gameId);

    int getGameId(final Player player);


}
