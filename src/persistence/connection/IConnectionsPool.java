package persistence.connection;

import exceptions.PersistenceException;

public interface IConnectionsPool {

	IDBConnection obtenerConexion() throws PersistenceException;
//
	void liberarConexion(IDBConnection conexion, boolean ok) throws PersistenceException;
}
