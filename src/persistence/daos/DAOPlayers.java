package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import exceptions.PersistenceException;
import logic.models.Player;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOPlayers;

public class DAOPlayers implements IDAOPlayers {
	public int savePlayer(int idPartida,Player player,IDBConnection icon)throws PersistenceException{
	Connection con = icon.getConnection();
	int resultado = 0;
		try {
			
			PreparedStatement pstmt = con.prepareStatement("insert into jugadores (NOMBRE,ID_PARTIDA,BANDO,TORRE_ACTIVA,TANQUE_ACTIVO,HANGAR_ACTIVO) values(?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);

			pstmt.setString(1, player.getName());
			pstmt.setInt(2,idPartida);
			pstmt.setDouble(3, player.getTeamSide());
			pstmt.setBoolean(4, player.getActiveTower());
			pstmt.setBoolean(5,player.getActiveFuel());
			pstmt.setBoolean(6, player.getActiveHangar());
			

			pstmt.executeUpdate();
			
			ResultSet rs = pstmt.getGeneratedKeys();
			if (rs.next()){
			  resultado=rs.getInt(1);
			}
			pstmt.close();
			
			return resultado;
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}

}
