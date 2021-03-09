package controller;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Player;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOPlayer;
import persistence.daos.interfaces.IDAOPlayer;

public class PlayerController {

	private static PlayerController instance;
    private IDAOPlayer daoPlayer;
    
	 public static PlayerController getInstance() throws LogicException {

        if (!(instance instanceof PlayerController)) {
        	System.out.println("New PlayerController");
            instance = new PlayerController();
        }

        return instance;
    }

    private PlayerController() throws LogicException {
    	
    	this.daoPlayer = new DAOPlayer();
    }
    
    public int savePlayer (final int gameId, final Player player) throws LogicException {

	 	int playerId = -1;
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			playerId = daoPlayer.savePlayer(gameId, player, icon);
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
		return playerId;
    }

}
