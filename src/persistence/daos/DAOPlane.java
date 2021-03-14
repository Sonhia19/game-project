package persistence.daos;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import exceptions.*;
import persistence.connection.*;
import logic.models.*;
import persistence.daos.interfaces.*;

public class DAOPlane implements IDAOPlane {

	@Override
	public boolean exists(int playerId, int planeCode,IDBConnection icon) throws PersistenceException {
		boolean existe = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from aviones where id_jugador = ? and avion_codigo = ?");
			pstmt.setInt(1, playerId);
			pstmt.setInt(2, planeCode);
			
			ResultSet rs = pstmt.executeQuery();
			existe = rs.next();
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return existe;
	}
	@Override
	public void savePlanes (int idJugador,Plane plane,IDBConnection icon,int planeCode)throws PersistenceException{
		Connection con = icon.getConnection();
		PreparedStatement pstmt ;
		try {
			if (this.exists(idJugador, planeCode, icon)){
				pstmt = con.prepareStatement("update aviones set combustible = ?, blindaje=?, tiene_bomba=?,vuelo_alto=?,posicion_x=?,posicion_y=?,poder_fuego=?,velocidad=?,angulo=? where id_jugador= ? and avion_codigo=?",Statement.RETURN_GENERATED_KEYS);
			
				pstmt.setDouble(1, plane.getFuel());
				pstmt.setDouble(2, plane.getArmor());
				pstmt.setBoolean(3, plane.getHasBomb());
				pstmt.setBoolean(4,plane.getHighFly());
				pstmt.setDouble(5,plane.getPositionX());
				pstmt.setDouble(6,plane.getPositionY());
				pstmt.setDouble(7,plane.getFirePower());
				pstmt.setDouble(8,plane.getSpeed());
				pstmt.setInt(9,plane.getAngle());
				pstmt.setInt(10, idJugador);
				pstmt.setInt(11, planeCode);
			}
			else
			{
			pstmt = con.prepareStatement("insert into aviones (ID_JUGADOR,AVION_TIPO,COMBUSTIBLE,BLINDAJE,TIENE_BOMBA,VUELO_ALTO,POSICION_X, POSICION_Y,PODER_FUEGO,VELOCIDAD,ANGULO,AVION_CODIGO) values(?,?,?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, idJugador);
			pstmt.setInt(2, plane.getPlaneType());
			pstmt.setDouble(3, plane.getFuel());
			pstmt.setDouble(4, plane.getArmor());
			pstmt.setBoolean(5, plane.getHasBomb());
			pstmt.setBoolean(6,plane.getHighFly());
			pstmt.setDouble(7,plane.getPositionX());
			pstmt.setDouble(8,plane.getPositionY());
			pstmt.setDouble(9,plane.getFirePower());
			pstmt.setDouble(10,plane.getSpeed());
			pstmt.setInt(11,plane.getAngle());
			pstmt.setInt(12, planeCode);
			}
			
			pstmt.executeUpdate();
			
				
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}
	public Plane restorePlane(final int planeId,IDBConnection icon) throws PersistenceException{
		Plane restoredPlane = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,id_jugador,avion_tipo,combustible,blindaje,tiene_bomba,vuelo_alto,posicion_x,posicion_y,angulo,poder_fuego,velocidad from aviones where id = ?");
			pstmt.setInt(1, planeId);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				restoredPlane = new Plane(rs.getInt("id"),rs.getDouble("posicion_x"),rs.getDouble("posicion_y"),rs.getInt("angulo"),rs.getInt("combustible"),rs.getInt("blindaje"),rs.getInt("poder_fuego"),rs.getBoolean("tiene_bomba"),rs.getBoolean("vuelo_alto"),rs.getInt("velocidad"),rs.getInt("avion_tipo"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return restoredPlane;
		
	}
	public List<Plane> recoverPlanesByPlayerId(final int playerId,final int teamSide,IDBConnection icon) throws PersistenceException{
		Plane restoredPlane = null;
		List<Plane> planes = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,id_jugador,avion_tipo,combustible,blindaje,tiene_bomba,vuelo_alto,posicion_x,posicion_y,angulo,poder_fuego,velocidad from aviones where id_jugador = ?");
			pstmt.setInt(1, playerId);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				restoredPlane = new Plane(rs.getInt("id"),rs.getDouble("posicion_x"),rs.getDouble("posicion_y"),rs.getInt("angulo"),rs.getInt("combustible"),rs.getInt("blindaje"),rs.getInt("poder_fuego"),rs.getBoolean("tiene_bomba"),rs.getBoolean("vuelo_alto"),rs.getInt("velocidad"),rs.getInt("avion_tipo"));
			}
			planes.add(restoredPlane);
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return planes;
		
	}

}
	