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
		boolean exist = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from aviones where id_jugador = ? and avion_codigo = ?");
			pstmt.setInt(1, playerId);
			pstmt.setInt(2, planeCode);
			
			ResultSet rs = pstmt.executeQuery();
			exist = rs.next();
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return exist;
	}
	
	@Override
	public void savePlanes (int playerId, Plane plane, IDBConnection icon) throws PersistenceException {

		Connection con = icon.getConnection();
		PreparedStatement pstmt ;
		try {
			if (this.exists(playerId, plane.getPlaneCode(), icon)){
				pstmt = con.prepareStatement("update aviones set combustible = ?, blindaje=?, tiene_bomba=?, vuelo_alto=?, posicion_x=?, posicion_y=?, poder_fuego=?, velocidad=?, angulo=?, volando=? where id_jugador= ? and avion_codigo=?",Statement.RETURN_GENERATED_KEYS);
			
				pstmt.setDouble(1, plane.getFuel());
				pstmt.setDouble(2, plane.getArmor());
				pstmt.setBoolean(3, plane.getHasBomb());
				pstmt.setBoolean(4,plane.getHighFly());
				pstmt.setDouble(5,plane.getPositionX());
				pstmt.setDouble(6,plane.getPositionY());
				pstmt.setDouble(7,plane.getFirePower());
				pstmt.setDouble(8,plane.getSpeed());
				pstmt.setInt(9,plane.getAngle());
				pstmt.setInt(10, playerId);
				pstmt.setInt(11, plane.getPlaneCode());
				pstmt.setBoolean(12, plane.getFlying());
			}
			else
			{
			pstmt = con.prepareStatement("insert into aviones (id_jugador, avion_tipo, combustible, blindaje, tiene_bomba, vuelo_alto, posicion_x, posicion_y, poder_fuego, velocidad, angulo, avion_codigo, volando) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, playerId);
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
			pstmt.setInt(12, plane.getPlaneCode());
			pstmt.setBoolean(13, plane.getFlying());
			}
			
			pstmt.executeUpdate();
			
				
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}

	@Override
	public List<Plane> recoverPlanesByPlayerId(final int playerId, IDBConnection icon) throws PersistenceException {
		
		Plane plane = null;
		List<Plane> planes = new ArrayList<Plane>();
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id, id_jugador, avion_tipo, combustible, blindaje, tiene_bomba, vuelo_alto, posicion_x, posicion_y, angulo, poder_fuego, velocidad, avion_codigo, volando from aviones where id_jugador = ?");
			pstmt.setInt(1, playerId);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				plane = new Plane(rs.getInt("avion_codigo"),rs.getDouble("posicion_x"),rs.getDouble("posicion_y"),rs.getInt("angulo"),rs.getInt("combustible"),rs.getInt("blindaje"),rs.getInt("poder_fuego"),rs.getBoolean("tiene_bomba"),rs.getBoolean("vuelo_alto"),rs.getInt("velocidad"),rs.getInt("avion_tipo"), rs.getBoolean("volando"));
				planes.add(plane);
			}			
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return planes;
		
	}

}
	