package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import exceptions.PersistenceException;
import logic.models.Game;
import logic.models.Player;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOPlayer;

public class DAOPlayer implements IDAOPlayer {
	
	public Player find(int idPartida, String playerName,IDBConnection icon) throws PersistenceException {
		Player player = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,nombre,id_partida,bando,torre_activa,tanque_activo,hangar_activo from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, idPartida);
			pstmt.setString(2, playerName);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				player = new Player(rs.getInt("id"),rs.getString("nombre"),rs.getInt("id_partida"),rs.getInt("bando"),rs.getBoolean("torre_activa"),rs.getBoolean("tanque_activo"),rs.getBoolean("hangar_activo"));
			}
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return player;
	}
	@Override
	public Player recoverPlayer(int gameId, int teamSide,IDBConnection icon ) throws PersistenceException{
		Player player = null;

		Connection con = icon.getConnection();
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,nombre,id_partida,bando,torre_activa,tanque_activo,hangar_activo from jugadores where id_partida = ? and bando = ?");
			pstmt.setInt(1, gameId);
			pstmt.setInt(2, teamSide);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				player = new Player(rs.getInt("id"),rs.getString("nombre"),rs.getInt("id_partida"),rs.getInt("bando"),rs.getBoolean("torre_activa"),rs.getBoolean("tanque_activo"),rs.getBoolean("hangar_activo"));
			}
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return player;
	}
	
	@Override
	public int getPlayerId(int idPartida, String playerName,IDBConnection icon) throws PersistenceException {
		int playerId = -1;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, idPartida);
			pstmt.setString(2, playerName);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				playerId = rs.getInt("id");
			}
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return playerId;
	}

	public boolean exists(int idPartida, String playerName,IDBConnection icon) throws PersistenceException {
		boolean existe = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, idPartida);
			pstmt.setString(2, playerName);
			
			ResultSet rs = pstmt.executeQuery();
			existe = rs.next();
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return existe;
	}
	public int savePlayer(int idPartida,Player player,IDBConnection icon)throws PersistenceException{
	Connection con = icon.getConnection();
	int resultado = 0;
	PreparedStatement pstmt;
	int playerId = -1;
		try {
			if (this.exists(idPartida, player.getName(), icon)) {
				playerId = this.getPlayerId(idPartida,player.getName(),icon);
				
				pstmt = con.prepareStatement("update jugadores set torre_activa = ?, tanque_activo = ?, hangar_activo = ? where nombre = ? and id_partida = ?",Statement.RETURN_GENERATED_KEYS);	
			
				pstmt.setBoolean(1, player.getActiveTower());
				pstmt.setBoolean(2,player.getActiveFuel());
				pstmt.setBoolean(3, player.getActiveHangar());
				pstmt.setString(4, player.getName());
				pstmt.setInt(5,idPartida);
				//teamside
			}
			else
			{
				pstmt = con.prepareStatement("insert into jugadores (NOMBRE,ID_PARTIDA,BANDO,TORRE_ACTIVA,TANQUE_ACTIVO,HANGAR_ACTIVO) values(?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				pstmt.setString(1, player.getName());
				pstmt.setInt(2,idPartida);
				pstmt.setDouble(3, player.getTeamSide());
				pstmt.setBoolean(4, player.getActiveTower());
				pstmt.setBoolean(5,player.getActiveFuel());
				pstmt.setBoolean(6, player.getActiveHangar());
			}
			
			

			pstmt.executeUpdate();
			
			ResultSet rs = pstmt.getGeneratedKeys();
			if (rs.next()){
			  resultado=rs.getInt(1);
			}else//si se hace el update no hay rs.next pero aun debo devolver el playerId
			{
				resultado = playerId;
			}
			pstmt.close();
			
			return resultado;
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}

}
