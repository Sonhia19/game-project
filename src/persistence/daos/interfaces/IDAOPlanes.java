package persistence.daos.interfaces;

import java.util.ArrayList;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlanes {
	
	boolean existe(int idBarco, IDBConnection icon) throws PersistenceException;
	
	void insertar(int idPartida, Plane barco, IDBConnection icon) throws PersistenceException;
	
	Plane buscar(int idBarco, IDBConnection icon) throws PersistenceException;
	
	ArrayList<Plane> listarAvionesPorPartida(int idPartida, IDBConnection icon) throws PersistenceException;
	
	void eliminar(int idBarco, IDBConnection icon) throws PersistenceException;
}
