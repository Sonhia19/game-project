package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import exceptions.PersistenceException;
import logic.models.Artillery;
import logic.models.Plane;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOArtillery;

public class DAOArtillery implements IDAOArtillery {
	
	@Override
	public boolean exists(int playerId,IDBConnection icon,final int artilleryCode) throws PersistenceException {
		boolean exist = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from artillerias where id_jugador = ? and artilleria_codigo = ?");
			pstmt.setInt(1, playerId);
			pstmt.setInt(2, artilleryCode);
			
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
	public int saveArtillery(int playerId, Artillery artillery, IDBConnection icon) throws PersistenceException {
		
		int idArtillery = -1;
		Connection con = icon.getConnection();
		PreparedStatement pstmt;
		try {
			if(this.exists(playerId, icon, artillery.getArtilleryCode())) {
				pstmt = con.prepareStatement("update artillerias set id_jugador=?, artilleria_tipo=?, blindaje=?, cadencia=?, alcance=?, poder_fuego=?, posicion_x=?, posicion_y=?, artilleria_codigo=? where artilleria_codigo= ? and id_jugador=?",Statement.RETURN_GENERATED_KEYS);
				pstmt.setInt(1,playerId );
				pstmt.setInt(2,artillery.getArtilleryType());
				pstmt.setDouble(3,artillery.getArmor());
				pstmt.setDouble(4,artillery.getCadency());
				pstmt.setDouble(5,artillery.getReach());
				pstmt.setDouble(6,artillery.getFirePower());
				pstmt.setDouble(7,artillery.getPositionX());
				pstmt.setDouble(8,artillery.getPositionY());
				pstmt.setInt(9, artillery.getArtilleryCode());
			}
			else
			{
				pstmt = con.prepareStatement("insert into artillerias (id_jugador, artilleria_tipo, blindaje, cadencia, alcance, poder_fuego, posicion_x, posicion_y, artilleria_codigo) values(?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				pstmt.setInt(1,playerId );
				pstmt.setInt(2,artillery.getArtilleryType());
				pstmt.setDouble(3,artillery.getArmor());
				pstmt.setDouble(4,artillery.getCadency());
				pstmt.setDouble(5,artillery.getReach());
				pstmt.setDouble(6,artillery.getFirePower());
				pstmt.setDouble(7,artillery.getPositionX());
				pstmt.setDouble(8,artillery.getPositionY());
				pstmt.setInt(9, artillery.getArtilleryCode());
			}
			pstmt.executeUpdate();
			
				
			pstmt.close();
		}
		catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}
		return idArtillery;
		
	}
	
	@Override
	public List<Artillery> recoverArtilleriesByPlayerId(final int playerId, IDBConnection icon) throws PersistenceException {
		
		Artillery artillery = null;
		List<Artillery> artilleries = new ArrayList<Artillery>();
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id_jugador, artilleria_tipo, blindaje, alcance, poder_fuego, cadencia, posicion_x, posicion_y, artilleria_codigo from artillerias where id_jugador = ?");
			pstmt.setInt(1, playerId);
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
//				public Artillery(int artilleryCode, double positionX, double positionY, int angle,  int armor, int cadency, int reach, int firePower, String name, int artilleryType) {
				artillery = new Artillery(rs.getInt("artilleria_codigo"),rs.getDouble("posicion_x"),rs.getDouble("posicion_y"),rs.getInt("blindaje"),rs.getInt("cadencia"),rs.getInt("alcance"),rs.getInt("poder_fuego"), rs.getInt("artilleria_tipo"));
				artilleries.add(artillery);
			}			
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return artilleries;
		
	}
}
