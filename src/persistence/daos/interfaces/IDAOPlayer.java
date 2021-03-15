package persistence.daos.interfaces;

import java.util.List;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlayer {

	int savePlayer(int gameId,Player player,IDBConnection icon) throws PersistenceException;

	boolean exists(final int gameId,final String playerName,IDBConnection icon) throws PersistenceException;

	int getPlayerId(int gameId, String playerName,IDBConnection icon) throws PersistenceException;

	List<Player> recoverPlayers(int gameId, IDBConnection icon ) throws PersistenceException;
}
