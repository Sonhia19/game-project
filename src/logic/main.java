package logic;

import java.sql.Connection;

import exceptions.PersistenceException;
import logic.models.Game;
import logic.models.Player;
import persistence.connection.IDBConnection;
import persistence.daos.DAOGames;
import persistence.daos.DAOPlayers;
import persistence.daos.interfaces.IDAOGames;
import persistence.daos.interfaces.IDAOPlayers;
import logic.facade.IFacade;
public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.print("hola");
		Game suca = new Game(1) ;

		IDAOGames daogames= new DAOGames();
		IDAOPlayers daoplayers= new DAOPlayers();
		
		IDBConnection icon 	= null;
		try
		{
		// Obtenemos una nueva conexión del pool.
		icon = persistence.connection.ConnectionsPool.getInstancia().obtenerConexion();
		suca = daogames.buscar(1, icon);
		
		System.out.print("\n");
		System.out.print(String.valueOf(suca.getId()) +""+ suca.getUserId()+suca.getFecha());
		
		//// prueba de guardar player
		Player player = new Player("nombre32",1,1);
			
		daoplayers.savePlayer(1, player, icon);
		
		persistence.connection.ConnectionsPool.getInstancia().liberarConexion(icon, true);
		}
		catch (PersistenceException ex)
		{
			System.out.print(ex.getMessage());
		}
		
	}

}
