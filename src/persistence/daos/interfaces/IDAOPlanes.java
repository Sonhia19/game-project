package persistence.daos.interfaces;

import java.util.ArrayList;

import exceptions.PersistenceException;
import persistence.connection.*;
import logic.models.*;

public interface IDAOPlanes {
	
	boolean existe(int idBarco, IConexion icon) throws PersistenceException;
	
	void insertar(int idPartida, Plane barco, IConexion icon) throws PersistenceException;
	
	Plane buscar(int idBarco, IConexion icon) throws PersistenceException;
	
	ArrayList<Plane> listarAvionesPorPartida(int idPartida, IConexion icon) throws PersistenceException;
	
	void eliminar(int idBarco, IConexion icon) throws PersistenceException;
}
