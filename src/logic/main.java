package logic;

import java.sql.Connection;

import exceptions.PersistenceException;
import logic.models.Game;
import persistence.connection.IDBConnection;
import persistence.daos.DAOGames;
import persistence.daos.interfaces.IDAOGames;
import logic.facade.IFacade;
public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.print("hola");
		Game suca = new Game(1) ;

		IDAOGames daogames= new DAOGames();
		
		IDBConnection icon 	= null;
		try
		{
		// Obtenemos una nueva conexi�n del pool.
		icon = persistence.connection.ConnectionsPool.getInstancia().obtenerConexion();
		suca = daogames.buscar(1, icon);
		persistence.connection.ConnectionsPool.getInstancia().liberarConexion(icon, true);
		System.out.print("\n");
		System.out.print(String.valueOf(suca.getId()) +""+ suca.getUserId()+suca.getFecha());
		
		}
		catch (PersistenceException ex)
		{
			System.out.print(ex.getMessage());
		}
		
	}

}
