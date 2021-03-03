package persistence.connection;
import java.sql.Connection;

public class DBconnection implements IDBConnection {

	/**
	 * Conexión.
	 */
	private Connection con;
	
	/**
	 * Está asignada?
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
	 * Devuelve la conexión.
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
	 * Asigna una conexión.
	 */
	@Override
	public void asignar() {
		asignada = true;
	}
	
	/**
	 * Desasigna una conexión.
	 */
	@Override
	public void desasignar() {
		asignada = false;
	}
}
