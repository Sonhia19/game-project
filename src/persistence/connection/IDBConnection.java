package persistence.connection;

import java.sql.Connection;

public interface IDBConnection {

	Connection getConnection();
	
	boolean asignada();
	
	void asignar();
	
	void desasignar();
}
