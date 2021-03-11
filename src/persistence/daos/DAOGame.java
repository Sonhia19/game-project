package persistence.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import exceptions.*;
import persistence.connection.*;
import logic.models.*;

import persistence.daos.interfaces.*;

public class DAOGame implements IDAOGame {

	public DAOGame() {
		
	}
	
	/**
	 * Verifica si una partida existe.
	 * 
	 * @param idPartida
	 * @param icon
	 * @return boolean
	 */
	@Override
	public boolean exists(int idPartida, IDBConnection icon) throws PersistenceException {
		boolean existe = false;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("Consultas.obtenerPartida()");
			pstmt.setInt(1, idPartida);
			ResultSet rs = pstmt.executeQuery();
			existe = rs.next();
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return existe;
	}

	/**
	 * Inserta una partida en la BD.
	 * 
	 * @param partida
	 * @param icon
	 */
	@Override
	public int getNewGameId( IDBConnection icon) throws PersistenceException {
		Connection con = icon.getConnection();
		int nuevoId = -1;
		
		try {
			PreparedStatement pstmt = con.prepareStatement("insert into partidas (estado,id_ganador,fecha,fecha_modificacion) values(0,0,now(),now())",Statement.RETURN_GENERATED_KEYS);
			pstmt.executeUpdate();
			ResultSet rs = pstmt.getGeneratedKeys();
		    rs.next();
		    nuevoId = rs.getInt(1);
				
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return nuevoId;
	}
	public Game restoreGame(final int idPartida,IDBConnection icon) throws PersistenceException{
		Game restoredGame = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,estado,id_ganador,fecha,fecha_modificacion from partidas where id = ?");
			pstmt.setInt(1, idPartida);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				restoredGame = new Game(rs.getInt("id"),rs.getInt("estado"),rs.getInt("id_ganador"),rs.getDate("fecha"),rs.getDate("fecha_modificacion"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		return restoredGame;
		
	}
	public void saveGame(Game game,IDBConnection icon) throws PersistenceException{
		Connection con = icon.getConnection();
		
		try {
			//este deberia ser un update de la partida existente al crear partida
			//PreparedStatement pstmt = con.prepareStatement("insert into partidas (estado,id_ganador,fecha,fecha_modificacion) values(?,?,curdate(),curdate())",Statement.RETURN_GENERATED_KEYS);
			PreparedStatement pstmt = con.prepareStatement("update partidas set estado = ? , id_ganador = ? , fecha_modificacion = now() where id = ?",Statement.RETURN_GENERATED_KEYS);
//agregue state y winnerid al model el constructor y el get
			pstmt.setInt(1, game.getState());
			pstmt.setInt(2,game.getWinnerId());
			pstmt.setInt(3,game.getId());
			

			pstmt.executeUpdate();
			
			ResultSet rs = pstmt.getGeneratedKeys();
			if (rs.next()){
			  int risultato=rs.getInt(1);
			}
			pstmt.close();
			
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}
	/**
	 * Busca una partida en la BD.
	 * 
	 * @param idPartida
	 * @param icon
	 */
	@Override
	public Game find(int idPartida, IDBConnection icon) throws PersistenceException {
		Game game = null;
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("select id,fecha from partidas where id = ?");
			pstmt.setInt(1, idPartida);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				game = new Game(rs.getInt("id"),"pepe el pollo ",rs.getDate("fecha"));
			}
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return game;
	}
	
	/**
	 * Elimina una partida.
	 */
	/*@Override
	public void delete(int idPartida, IDBConnection icon) throws PersistenceException {
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("eliminarPartida()");
			pstmt.setInt(1, idPartida);
			pstmt.executeUpdate();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}*/

	
}
