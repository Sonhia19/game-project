package persistence.daos.interfaces;

import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.IDBConnection;

public interface IDAOArtillery {
	int saveArtillery(int playerId,Artillery artillery,IDBConnection icon,final int artilleryCode)throws PersistenceException;
	boolean exists(int playerId,IDBConnection icon,final int artilleryCode)throws PersistenceException;
}
