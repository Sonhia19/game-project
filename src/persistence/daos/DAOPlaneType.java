package persistence.daos;

import logic.models.Plane;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOPlaneType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import exceptions.*;
public class DAOPlaneType implements IDAOPlaneType {
	
	public Plane getPlaneByType(int planetypeId, IDBConnection icon) throws PersistenceException {
		Plane plane = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,nombre,velocidad,consumo_combustible,blindaje,poder_fuego from AVIONES_CONFIG where id = ?");
			pstmt.setInt(1, planetypeId);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				plane = new Plane(rs.getDouble("velocidad"),rs.getDouble("blindaje"),rs.getDouble("poder_fuego"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return plane;
	}
	

}
