package persistence.connection;
import java.sql.Connection;

public class DBconnection implements IDBConnection {

	/**
	 * Conexi�n.
	 */
	private Connection con;
	
	/**
	 * Est� asignada?
	 */
	private boolean asignada;
	
	/**
	 * Constructor
	 * 
	 * @param c
	 */
	public DBconnection(Connection c) {
		this.con = c;
		this.asignada = false;
	}
	
	/**
	 * Devuelve la conexi�n.
	 * 
	 * @return Connection
	 */
	@Override
	public Connection getConnection() {
		return con;
	}

	/**
	 * @return the asignada
	 */
	@Override
	public boolean asignada() {
		return asignada;
	}

	/**
	 * Asigna una conexi�n.
	 */
	@Override
	public void asignar() {
		asignada = true;
	}
	
	/**
	 * Desasigna una conexi�n.
	 */
	@Override
	public void desasignar() {
		asignada = false;
	}
}
