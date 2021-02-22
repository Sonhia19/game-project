package persistence.connection;

import java.sql.Connection;

public interface IConexion {

	Connection getConnection();
	
	boolean estaAsignada();
	
	void asignar();
	
	void desasignar();
}
