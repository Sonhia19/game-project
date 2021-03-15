package persistence.daos.interfaces;

import exceptions.PersistenceException;
import logic.models.Plane;
import persistence.connection.IDBConnection;

import java.util.List;

public interface IDAOPlane {
	
	boolean exists(int playerId, int planeCode,IDBConnection icon) throws PersistenceException ;
	void savePlanes (int playerId, Plane plane, IDBConnection icon) throws PersistenceException;
	List<Plane> recoverPlanesByPlayerId(final int playerId, IDBConnection icon) throws PersistenceException;
	
}
