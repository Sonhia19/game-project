package persistence.daos;

import exceptions.PersistenceException;
import logic.models.Player;
import persistence.connection.IDBConnection;
import persistence.daos.interfaces.IDAOPlayer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DAOPlayer implements IDAOPlayer {
	
	/*public Player find(int idPartida, String playerName, IDBConnection icon) throws PersistenceException {
		Player player = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,nombre,id_partida,bando,torre_activa,tanque_activo,hangar_activo from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, idPartida);
			pstmt.setString(2, playerName);
			
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				player = new Player(rs.getInt("id"),rs.getString("nombre"),rs.getInt("id_partida"),rs.getInt("bando"),rs.getBoolean("torre_activa"), rs.getDouble("torre_posicion_x"), rs.getDouble("torre_posicion_y"), rs.getBoolean("tanque_activo"), rs.getDouble("tanque_posicion_x"), rs.getDouble("tanque_posicion_y"), rs.getBoolean("hangar_activo"), rs.getDouble("hangar_posicion_x"), rs.getDouble("hangar_posicion_y"));
			}
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return player;
	}*/
	
	@Override
	public List<Player> recoverPlayers(int gameId, IDBConnection icon ) throws PersistenceException{
		
		List<Player> players = new ArrayList<Player>();
		Player player = null;

		Connection con = icon.getConnection();
		try {
			PreparedStatement pstmt = con.prepareStatement("select id, nombre, id_partida, bando, torre_activa, torre_posicion_x, torre_posicion_y, tanque_activo, tanque_posicion_x, tanque_posicion_y, hangar_activo, hangar_posicion_x, hangar_posicion_y from jugadores where id_partida = ?");
			pstmt.setInt(1, gameId);
			
			ResultSet rs = pstmt.executeQuery();
			while (rs.next()) {
				player = new Player(rs.getInt("id"),rs.getString("nombre"),rs.getInt("id_partida"),rs.getInt("bando"),rs.getBoolean("torre_activa"), rs.getDouble("torre_posicion_x"), rs.getDouble("torre_posicion_y"), rs.getBoolean("tanque_activo"), rs.getDouble("tanque_posicion_x"), rs.getDouble("tanque_posicion_y"), rs.getBoolean("hangar_activo"), rs.getDouble("hangar_posicion_x"), rs.getDouble("hangar_posicion_y"));
				players.add(player);
			}
			rs.close();
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return players;
	}
	
	@Override
	public int getPlayerId(int gameId, String playerName,IDBConnection icon) throws PersistenceException {
		int playerId = -1;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, gameId);
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

	public boolean exists(int gameId, String playerName,IDBConnection icon) throws PersistenceException {
		boolean existe = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id from jugadores where id_partida = ? and nombre = ?");
			pstmt.setInt(1, gameId);
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
	public int savePlayer(int gameId, Player player,IDBConnection icon) throws PersistenceException {

		Connection con = icon.getConnection();
		int result = 0;
		PreparedStatement pstmt;
		int playerId = -1;
		try {
			if (this.exists(gameId, player.getName(), icon)) {
				playerId = this.getPlayerId(gameId, player.getName(),icon);
				
				pstmt = con.prepareStatement("update jugadores set torre_activa = ?,  torre_posicion_x = ?, torre_posicion_y = ?, tanque_activo = ?, tanque_posicion_x = ?, tanque_posicion_y = ?," +
						" hangar_activo = ?, hangar_posicion_x = ?, hangar_posicion_y = ? where nombre = ? and id_partida = ?",Statement.RETURN_GENERATED_KEYS);
			
				pstmt.setBoolean(1, player.getActiveTower());
				pstmt.setDouble(2, player.getPositionXTower());
				pstmt.setDouble(3, player.getPositionYTower());
				pstmt.setBoolean(4, player.getActiveFuel());
				pstmt.setDouble(5, player.getPositionXFuel());
				pstmt.setDouble(6, player.getPositionYFuel());
				pstmt.setBoolean(7, player.getActiveHangar());
				pstmt.setDouble(8, player.getPositionXHangar());
				pstmt.setDouble(9, player.getPositionYHangar());
				pstmt.setString(10, player.getName());
				pstmt.setInt(11, gameId);
				//teamside
			}
			else
			{
				pstmt = con.prepareStatement("insert into jugadores (torre_activa, torre_posicion_x, torre_posicion_y, tanque_activo, tanque_posicion_x, " +
						"tanque_posicion_y, hangar_activo, hangar_posicion_x, hangar_posicion_y, nombre, id_partida, bando) values(?,?,?,?,?,?,?,?,?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
				pstmt.setBoolean(1, player.getActiveTower());
				pstmt.setDouble(2, player.getPositionXTower());
				pstmt.setDouble(3, player.getPositionYTower());
				pstmt.setBoolean(4, player.getActiveFuel());
				pstmt.setDouble(5, player.getPositionXFuel());
				pstmt.setDouble(6, player.getPositionYFuel());
				pstmt.setBoolean(7, player.getActiveHangar());
				pstmt.setDouble(8, player.getPositionXHangar());
				pstmt.setDouble(9, player.getPositionYHangar());
				pstmt.setString(10, player.getName());
				pstmt.setInt(11, gameId);
				pstmt.setInt(12, player.getTeamSide());
			}

			pstmt.executeUpdate();
			
			ResultSet rs = pstmt.getGeneratedKeys();
			if (rs.next()){
				result = rs.getInt(1);
			}else//si se hace el update no hay rs.next pero aun debo devolver el playerId
			{
				result = playerId;
			}
			pstmt.close();
			
			return result;
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}

}
