package persistence.daos.interfaces;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;

public interface IDAOGame {
	
	int getNewGameId( IDBConnection icon) throws PersistenceException;
	
	Game recoverGame(final int idPartida,IDBConnection icon) throws PersistenceException;
	
	void saveGame(Game game,IDBConnection icon) throws PersistenceException;
	
	boolean exists(int idGame, IDBConnection icon) throws PersistenceException;
	
	Game find(int idGame, IDBConnection icon) throws PersistenceException;
	
}
