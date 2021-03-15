package persistence.daos.interfaces;

import java.util.List;

import exceptions.PersistenceException;
import logic.models.Artillery;
import logic.models.Plane;
import persistence.connection.IDBConnection;

public interface IDAOArtillery {
	
	int saveArtillery(int playerId, Artillery artillery, IDBConnection icon) throws PersistenceException;
	boolean exists(int playerId, IDBConnection icon, final int artilleryCode) throws PersistenceException;
	List<Artillery> recoverArtilleriesByPlayerId(final int playerId, IDBConnection icon) throws PersistenceException;
}
