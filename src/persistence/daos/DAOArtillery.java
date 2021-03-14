package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOArtillery;

public class DAOArtillery implements IDAOArtillery {
	@Override
	public boolean exists(int playerId,IDBConnection icon,final int artilleryCode) throws PersistenceException {
		boolean existe = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from artillerias where id_jugador = ? and codigo_artilleria = ?");
			pstmt.setInt(1, playerId);
			pstmt.setInt(2, artilleryCode);
			
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
	public int saveArtillery(int playerId,Artillery artillery,IDBConnection icon,int artilleryCode) throws PersistenceException {
		
		int idArtillery = -1;
		Connection con = icon.getConnection();
		PreparedStatement pstmt;
		try {
			if(this.exists(playerId, icon, artilleryCode)) {
				pstmt = con.prepareStatement("update artillerias set blindaje = ? ,posicion_x= ?,posicion_y = ? where codigo_artilleria= ? and id_jugador=?",Statement.RETURN_GENERATED_KEYS);
				pstmt.setDouble(1,artillery.getArmor());
				pstmt.setDouble(2,artillery.getPositionX());
				pstmt.setDouble(3,artillery.getPositionY());
				pstmt.setInt(4, artilleryCode);
				pstmt.setInt(5, playerId);
			}
			else
			{
				pstmt = con.prepareStatement("insert into artillerias (id_jugador,artilleria_tipo,blindaje,posicion_x,posicion_y,codigo_artilleria) values(?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				pstmt.setInt(1,playerId );
				pstmt.setInt(2,artillery.getArtilleryType());
				pstmt.setDouble(3,artillery.getArmor());
				pstmt.setDouble(4,artillery.getPositionX());
				pstmt.setDouble(5,artillery.getPositionY());
				pstmt.setInt(6, artilleryCode);
			}
			pstmt.executeUpdate();
			
				
			pstmt.close();
		}
		catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}
		return idArtillery;
		
	}
}
