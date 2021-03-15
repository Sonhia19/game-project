package controller;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Game;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOGame;
import persistence.daos.interfaces.IDAOGame;

public class GameController {

	private static GameController instance;
    private IDAOGame daoGame;
    
	 public static GameController getInstance() throws LogicException {

        if (!(instance instanceof GameController)) {
        	System.out.println("New GameController");
            instance = new GameController();
        }

        return instance;
    }

    private GameController() throws LogicException {
    	
    	this.daoGame = new DAOGame();
    }
    
    public void saveGame(final int gameId) throws LogicException {

    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
            Game game = daoGame.find(gameId, icon);
			daoGame.saveGame(game, icon);
		} catch (PersistenceException ex) {
            throw new LogicException(ex.getMessage());
		}
    }

    public int getNewGameId() throws LogicException {

        IDBConnection icon = null;
        int gameId = -1;
        try {
            icon = ConnectionsPool.getInstancia().obtenerConexion();
            gameId = daoGame.getNewGameId(icon);
        } catch (PersistenceException ex) {
            throw new LogicException(ex.getMessage());
        }
        return gameId;
    }
    public Game recoverGame(final int gameId) throws LogicException {

        IDBConnection icon = null;
        Game game = null;
        try {
            icon = ConnectionsPool.getInstancia().obtenerConexion();
            game = daoGame.recoverGame(gameId,icon);
        } catch (PersistenceException ex) {
            throw new LogicException(ex.getMessage());
        }
        return game;
    }

}
