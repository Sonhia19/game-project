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

public class DAOGames implements IDAOGames {

	public DAOGames() {
		
	}
	
	/**
	 * Verifica si una partida existe.
	 * 
	 * @param idPartida
	 * @param icon
	 * @return boolean
	 */
	@Override
	public boolean existe(int idPartida, IDBConnection icon) throws PersistenceException {
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
			PreparedStatement pstmt = con.prepareStatement("insert into partidas (estado,id_ganador,fecha,fecha_modificacion) values(0,0,curdate(),curdate())",Statement.RETURN_GENERATED_KEYS);
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
	public Game restoreGame(IDBConnection icon) throws PersistenceException{
		Game restoredGame = null;
		
		return restoredGame;
		
	}
	public void saveGame(IDBConnection icon) throws PersistenceException{
	
	}
	/**
	 * Busca una partida en la BD.
	 * 
	 * @param idPartida
	 * @param icon
	 */
	@Override
	public Game buscar(int idPartida, IDBConnection icon) throws PersistenceException {
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
	@Override
	public void eliminar(int idPartida, IDBConnection icon) throws PersistenceException {
		Connection con = icon.getConnection();
		
		try {
			PreparedStatement pstmt = con.prepareStatement("eliminarPartida()");
			pstmt.setInt(1, idPartida);
			pstmt.executeUpdate();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
	}

	/**
	 * Devuelve el máximo id que existe.
	 * 
	 * @return int
	 */
	@Override
	public int maximoId(IDBConnection icon) throws PersistenceException {
		Connection con = icon.getConnection();
		int max = 0;
		
		try {
			PreparedStatement pstmt = con.prepareStatement("Consultas.maximoIdPartida()");
			ResultSet rs = pstmt.executeQuery();		
			if (rs.next())
				max = rs.getInt("maximoId");
			rs.close();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}
		
		return max;
	}
}
