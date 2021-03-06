package persistence.daos.interfaces;

import java.util.ArrayList;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlayers {
	void savePlayer(int idPartida,Player player,IDBConnection icon)throws PersistenceException;
}
