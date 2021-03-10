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

	public Artillery getArtilleryByType(int artilleryTypeId, IDBConnection icon) throws PersistenceException {
		
		Artillery artillery = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,nombre,cadencia,blindaje,alcance,poder_fuego from ARTILLERIA_CONFIG where id = ?");
			pstmt.setInt(1, artilleryTypeId);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				artillery = new Artillery(rs.getString("nombre"),rs.getDouble("cadencia"),rs.getDouble("blindaje"),rs.getDouble("alcance"),rs.getDouble("poder_fuego"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return artillery;
	}
}
