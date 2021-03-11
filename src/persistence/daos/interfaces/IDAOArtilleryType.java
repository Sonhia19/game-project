package persistence.daos.interfaces;

import exceptions.PersistenceException;
import persistence.connection.IDBConnection;
import logic.models.Artillery;

public interface IDAOArtilleryType {
	
	Artillery getArtilleryByType(int artilleryNumber, int artilleryType, int teamSide, IDBConnection icon) throws PersistenceException;
}
