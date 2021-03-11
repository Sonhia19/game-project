package persistence.daos.interfaces;

import exceptions.PersistenceException;
import logic.models.Plane;
import persistence.connection.IDBConnection;

public interface IDAOPlaneType {
	
	Plane getPlaneByType(int planeNumber, int planeType, int teamSide, IDBConnection icon) throws PersistenceException;
}
