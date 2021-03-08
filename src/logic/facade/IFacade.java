package logic.facade;

import javax.websocket.Session;

import org.json.JSONObject;

import exceptions.LogicException;
import logic.models.Player;
import server.utils.WsResponse;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;

public interface IFacade {
	
	WsResponse saveGame(final int gameId, final JSONObject playerSession, final JSONObject enemySession) throws LogicException;
	
	WsResponse newGame(final String playerName, final Session session) throws LogicException;
	
	WsResponse joinGame(final int gameId, final String playerName, final Session session);

	WsResponse connectGameSession(final int gameId, final String playerName, final int teamSide, final ArrayList<Integer> planesType, final Session session);

    WsResponse disconnectGameSession(final Session session, int gameId);
    
    WsResponse getJsonGameSession(final int gameId, final String userId);

    HashMap<String, Player> getGamePlayers(final int gameId);

    int removeSession(final Session session);


}
