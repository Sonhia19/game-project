package logic;

import exceptions.PersistenceException;
import logic.models.Game;
import logic.models.Player;
import persistence.connection.IDBConnection;
import persistence.daos.DAOGame;
import persistence.daos.DAOPlayer;
import persistence.daos.interfaces.IDAOGame;
import persistence.daos.interfaces.IDAOPlayer;

public class main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.print("hola");
		Game suca = new Game(1) ;

		IDAOGame daogames= new DAOGame();
		IDAOPlayer daoplayers= new DAOPlayer();
		
		IDBConnection icon 	= null;
		try
		{
		// Obtenemos una nueva conexi�n del pool.
		icon = persistence.connection.ConnectionsPool.getInstancia().obtenerConexion();
		suca = daogames.find(1, icon);
		
		System.out.print("\n");
		//System.out.print(String.valueOf(suca.getId()) +""+ suca.getUserId()+suca.getFecha());
		
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
