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

	public int saveArtillery(int idJugador,Artillery artillery,IDBConnection icon)throws PersistenceException{
		int idArtillery = -1;
		Connection con = icon.getConnection();
		try {
			PreparedStatement pstmt = con.prepareStatement("insert into artilleria (id_jugador,id_artilleria,blindaje,posicion_x,posicion_y) values(?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1,idJugador );
			pstmt.setInt(2,artillery.getArtilleryType());
			pstmt.setDouble(3,artillery.getArmor());
			pstmt.setDouble(4,artillery.getPositionX());
			pstmt.setDouble(5,artillery.getPositionY());
			
			pstmt.executeUpdate();
			ResultSet rs = pstmt.getGeneratedKeys();
		    rs.next();
		    idArtillery = rs.getInt(1);
				
			pstmt.close();
		}
		catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}
		return idArtillery;
		
	}
}
