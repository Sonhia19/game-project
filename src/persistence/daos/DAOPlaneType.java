package persistence.daos;

import exceptions.PersistenceException;
import logic.models.Plane;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOPlaneType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
public class DAOPlaneType implements IDAOPlaneType {
	
	public Plane getPlaneByType(int planeNumber, int planeType, int teamSide, IDBConnection icon) throws PersistenceException {
		Plane plane = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select AVT.NOMBRE,AVT.VELOCIDAD,AVT.COMBUSTIBLE,AVT.BLINDAJE,AVT.PODER_FUEGO, AVC.VUELO_ALTO,AVC.TIENE_BOMBA, AVC.POSICION_X,AVC.POSICION_Y,AVC.ANGULO, AVC.VOLANDO "
					+ "from aviones_config avc join aviones_Tipo avt "
					+ "where avc.bando = ? and avc.NRO_AVION = ? and AVT.ID = ?");
			
			pstmt.setInt(1, teamSide);
			pstmt.setInt(2, planeNumber);
			pstmt.setInt(3, planeType);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				plane = new Plane(planeNumber, rs.getDouble("posicion_x"), rs.getDouble("posicion_y"), rs.getInt("angulo"), 
						rs.getInt("combustible"), rs.getInt("blindaje"), rs.getInt("poder_fuego"), rs.getBoolean("tiene_bomba"), 
						rs.getBoolean("vuelo_alto"), rs.getInt("velocidad"), planeType, rs.getBoolean("volando"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return plane;
	}
	

}
