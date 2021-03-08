package persistence.daos.interfaces;

import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.IDBConnection;

public interface IDAOArtillery {
	int saveArtillery(int idJugador,Artillery artillery,IDBConnection icon)throws PersistenceException;
}
