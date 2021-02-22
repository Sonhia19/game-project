package persistence.connection;

public class Connection implements IConexion {

	/**
	 * Conexi�n.
	 */
	private java.sql.Connection conexion;
	
	/**
	 * Identifica si la conexi�n ya est� asignada.
	 */
	private boolean asignada;
	
	/**
	 * Constructor de la clase.
	 * 
	 * @param conexion
	 * @return void
	 */
	public Connection(java.sql.Connection conexion) {
		this.conexion = conexion;
	}
	
	/**
	 * Devuelve la conexi�n.
	 * 
	 * @return Connection
	 */
	public java.sql.Connection getConnection() {
		return this.conexion;
	}

	/**
	 * Devuelve un booleano indicando si la variable
	 * ya est� en uso.
	 * 
	 * @return boolean
	 */
	public boolean estaAsignada() {
		return this.asignada;
	}

	/**
	 * Marca la conexi�n como asignada.
	 * 
	 * @return void
	 */
	public void asignar() {
		this.asignada = true;
	}

	/**
	 * Marca la conexi�n como no asignada.
	 * 
	 * @return void
	 */
	public void desasignar() {
		this.asignada = false;
	}
}
