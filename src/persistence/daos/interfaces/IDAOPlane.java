package persistence.daos.interfaces;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlane {
	
	void savePlanes (int id_jugador, Plane plane, IDBConnection icon) throws PersistenceException;
	Plane restorePlane(final int planeId,IDBConnection icon) throws PersistenceException;
	
}
