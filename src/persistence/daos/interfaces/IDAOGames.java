package persistence.daos.interfaces;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;

public interface IDAOGames {
	
	boolean existe(int idGame, IDBConnection icon) throws PersistenceException;
	
	//void insertar(Game game, IDBConnection icon) throws PersistenceException;
	public int getNewGameId( IDBConnection icon) throws PersistenceException;
	
	Game buscar(int idGame, IDBConnection icon) throws PersistenceException;
	
	void eliminar(int idGame, IDBConnection icon) throws PersistenceException;
	
	int maximoId(IDBConnection icon) throws PersistenceException;
}
