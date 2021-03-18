package logic.facade;

import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONObject;

import exceptions.LogicException;
import logic.models.Player;
import server.utils.WsResponse;

import java.awt.List;
import java.util.ArrayList;
import java.util.HashMap;

public interface IFacade {
	
	WsResponse saveGame(final int gameId, final JSONObject playerSession, final String enemyName) throws LogicException;
	
	WsResponse newGame(final String playerName, final Session session) throws LogicException;
	
	WsResponse joinGame(final int gameId, final String playerName, final Session session);
	
	WsResponse requestSaveGame(final int gameId, final JSONObject jsonPlayerSession);
	
	WsResponse recoverGame(final int gameId, final String playerName, final Session session) throws LogicException;
	
	WsResponse getPlayersConnected(final int gameId);

	WsResponse connectGameSession(final int gameId, final String playerName, final int teamSide, final ArrayList<Integer> planesType,
										 final ArrayList<Integer> artilleriesType, JSONArray structurePositionsJsonArray, final Session session);

	WsResponse disconnectGameSession(final Session session);
	
	void finishGame(final int gameId);
    
    WsResponse getJsonGameSession(final int gameId, final String userId);
    
    WsResponse getJsonShootEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonBombEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonEmptyTankEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonTakeOffEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonPlaneViewEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonHighFlyEnemy(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonDamagePlane(final int gameId, final String playerName, final JSONObject parameters);
    
    WsResponse getJsonMoveEnemy(final int gameId, final String playerName, final JSONObject parameters);

    HashMap<String, Player> getGamePlayers(final int gameId);

    int removeSession(final Session session);


}
