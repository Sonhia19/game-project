package persistence.connection;

import exceptions.LogicException;
import exceptions.PersistenceException;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;



public class ConnectionsPool implements IConnectionsPool {


	private String driver;
	private String url;
	private String usuario;
	private String contrasenia;
	private ArrayList<IDBConnection> connections;
	
	/**
	 * Instancia.
	 */
	private static ConnectionsPool instancia;
	
	private ConnectionsPool() throws PersistenceException {
		Properties p = new Properties();
		
		try {
			p.load(this.getClass().getResourceAsStream("./config/sql.properties"));
		} catch(Exception e) {
			throw new PersistenceException("Error: " + e.getMessage());
		}

		driver = p.getProperty("driver");
		url = p.getProperty("url");
		usuario = p.getProperty("usuario");
		contrasenia = p.getProperty("contrasenia");
		connections = new ArrayList<IDBConnection>();

		/*try {
		 * 
		 
			Class.forName(driver);
		} catch (ClassNotFoundException e) {

			throw new PersistenceException("Error: " + e.getMessage());
		}*/
	}

//	/**
//	 * Devuelve la instancia del pool.
//	 *
//	 * @return PoolConexiones
//	 */
	public static ConnectionsPool getInstancia() throws PersistenceException {
		if (!(instancia instanceof ConnectionsPool))
		instancia = new ConnectionsPool();

	return instancia;
	}
//
//	/**
//	 * Obtiene una nueva conexi�n del pool. En caso de que no exista ninguna,
//	 * la crea.
//	 *
//	 * @param modifica
//	 * @return IConexion
//	 */
	@Override
	public synchronized IDBConnection obtenerConexion() throws PersistenceException {
		for(IDBConnection c : connections) {
			if (!c.asignada()) {
				c.asignar();
				return c;
			}
		}
		
		IDBConnection c = null;
		try {
			c = new DBconnection(DriverManager.getConnection(url, usuario, contrasenia));
			c.getConnection().setAutoCommit(true);
		} catch (SQLException e) {
			throw new PersistenceException("Error: " + e.getMessage());
		}
		
		connections.add(c);		
		return c;	
		}

	/**
	 * Devuelve una conexi�n al pool.
	 *
	 * @param conexion
	 * @param ok
	 * @return void
	 */
	@Override
	public synchronized void liberarConexion(IDBConnection conexion, boolean ok) throws PersistenceException {
		try {
			if (ok)
				conexion.getConnection().commit();
			else
				conexion.getConnection().rollback();
		} catch (Exception e) {
			throw new PersistenceException("Error: " + e.getMessage());
		}
	}

}
