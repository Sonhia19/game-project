package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;
import persistence.daos.interfaces.*;

public class DAOPlanes implements IDAOPlanes {

	@Override
	public void savePlanes (int idJugador,Plane plane,IDBConnection icon)throws PersistenceException{
		Connection con = icon.getConnection();
		
		try {
			
			PreparedStatement pstmt = con.prepareStatement("insert into aviones (ID_JUGADOR,ID_AVION,COMBUSTIBLE,BLINDAJE,TIENE_BOMBA,VUELO_ALTO,POSICION_X, POSIXION_Y) values(?,?,?,?,?,?,?, ?)",Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, idJugador);
			pstmt.setInt(2, plane.getPlaneType());
			pstmt.setDouble(3, plane.getFuel());
			pstmt.setDouble(4, plane.getArmor());
			pstmt.setBoolean(5, plane.getHasBomb());
			pstmt.setBoolean(6,plane.getHighFly());
			pstmt.setDouble(7,plane.getPositionX());
			pstmt.setDouble(8,plane.getPositionY());
			pstmt.executeUpdate();
			
				
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}
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
	