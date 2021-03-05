package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;
import persistence.daos.interfaces.*;

public class DAOPlanes implements IDAOPlanes {

	@Override
	public boolean existe(int idBarco, IDBConnection icon) throws PersistenceException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void insertar(int idPartida, Plane barco, IDBConnection icon) throws PersistenceException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Plane buscar(int idBarco, IDBConnection icon) throws PersistenceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<Plane> listarAvionesPorPartida(int idPartida, IDBConnection icon) throws PersistenceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void eliminar(int idBarco, IDBConnection icon) throws PersistenceException {
		// TODO Auto-generated method stub
		
	}
}
	