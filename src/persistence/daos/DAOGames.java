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
	public void insertar(Game partida, IDBConnection icon) throws PersistenceException {
		Connection con = icon.getConnection();
		/*
		try {
			PreparedStatement pstmt = con.prepareStatement("Consultas.insertarPartida()");
			pstmt.setInt(1, partida.getId());
			pstmt.setDouble(2, partida.getStockCombustiblePatrullas());
			pstmt.setDouble(3, partida.getStockCombustiblePesqueros());
			pstmt.setDouble(4, partida.getStockPeces());
			pstmt.setInt(5, partida.getEstado());
			pstmt.setInt(6, partida.getCantidadPatrullas());
			pstmt.setInt(7, partida.getCantidadPesqueros());
			pstmt.setInt(8, partida.getCantidadPesquerosEliminados());
			pstmt.setString(9, partida.getEquipoGanador());
			pstmt.executeUpdate();
			pstmt.close();
		} catch (SQLException e) {
			throw new PersistenceException("Error SQL: " + e.getMessage());
		}*/
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
			PreparedStatement pstmt = con.prepareStatement("select id from partidas where id = ?");
			pstmt.setInt(1, idPartida);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				game = new Game(rs.getInt("id"),"pepe el pollo");
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
