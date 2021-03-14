package persistence.daos.interfaces;

import java.util.ArrayList;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlayer {
	int savePlayer(int idPartida,Player player,IDBConnection icon)throws PersistenceException;
	
	boolean exists(final int idPartida,final String playerName,IDBConnection icon) throws PersistenceException;
	Player find(int idPartida, String playerName,IDBConnection icon) throws PersistenceException ;
	int getPlayerId(int idPartida, String playerName,IDBConnection icon) throws PersistenceException;
	Player recoverPlayer(int gameId, int teamSide,IDBConnection icon ) throws PersistenceException;
}
