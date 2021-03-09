package controller;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Game;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;

public class GameController {

	private static GameController instance;
    //private IDAOGame daoGame;
    
	 public static GameController getInstance() throws LogicException {

        if (!(instance instanceof GameController)) {
        	System.out.println("New GameController");
            instance = new GameController();
        }

        return instance;
    }

    private GameController() throws LogicException {
    	
    	//this.daoGame = new DAOGame();
    }
    
    
    public void saveGame(final int gameId, final Game game) {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			//daoGame.saveGame(gameId, game, icon);
		} catch (PersistenceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
