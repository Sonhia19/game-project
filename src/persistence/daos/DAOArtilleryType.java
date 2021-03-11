package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOArtilleryType;

public class DAOArtilleryType implements IDAOArtilleryType {

	public Artillery getArtilleryByType(int artilleryNumber, int artilleryType, int teamSide, IDBConnection icon) throws PersistenceException {
		
		Artillery artillery = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select ta.nombre,ta.cadencia,ta.blindaje,ta.alcance,ta.poder_fuego,avc.posicion_x,avc.posicion_y, avc.angulo "
					+ "from artilleria_config avc join ARTILLERIA_TIPO ta "
					+ "where avc.nro_artilleria = ? and avc.bando = ? and ta.id = ?");
			
			pstmt.setInt(1, artilleryNumber);
			pstmt.setInt(2, teamSide);
			pstmt.setInt(3, artilleryType);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				artillery = new Artillery(artilleryNumber, rs.getDouble("posicion_x"), rs.getDouble("posicion_y"), 
						rs.getInt("angulo"), rs.getInt("blindaje"), rs.getInt("cadencia"), rs.getInt("alcance"), rs.getInt("poder_fuego"), 
						rs.getString("nombre"), artilleryType);
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return artillery;
	}
}
