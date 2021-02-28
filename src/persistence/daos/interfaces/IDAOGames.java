package persistence.daos.interfaces;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;

public interface IDAOGames {
	
	boolean existe(int idGame, IConexion icon) throws PersistenceException;
	
	void insertar(Game game, IConexion icon) throws PersistenceException;
	
	Game buscar(int idGame, IConexion icon) throws PersistenceException;
	
	void eliminar(int idGame, IConexion icon) throws PersistenceException;
	
	int maximoId(IConexion icon) throws PersistenceException;
}
