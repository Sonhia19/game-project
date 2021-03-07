package persistence.daos.interfaces;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;

public interface IDAOGames {
	
	int getNewGameId( IDBConnection icon) throws PersistenceException;
	
	Game restoreGame(IDBConnection icon) throws PersistenceException;
	
	void saveGame(Game game,IDBConnection icon) throws PersistenceException;
	
	boolean existe(int idGame, IDBConnection icon) throws PersistenceException;
	
	Game buscar(int idGame, IDBConnection icon) throws PersistenceException;
	
	void eliminar(int idGame, IDBConnection icon) throws PersistenceException;
	
	int maximoId(IDBConnection icon) throws PersistenceException;
}
