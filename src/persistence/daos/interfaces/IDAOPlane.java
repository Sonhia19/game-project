package persistence.daos.interfaces;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlane {
	boolean exists(int playerId, int planeCode,IDBConnection icon) throws PersistenceException ;
	void savePlanes (int id_jugador, Plane plane, IDBConnection icon,int planeCode) throws PersistenceException;
	Plane restorePlane(final int planeId,IDBConnection icon) throws PersistenceException;
	List<Plane> recoverPlanesByPlayerId(final int playerId,final int teamSide,IDBConnection icon) throws PersistenceException;
	
}
