package persistence.connection;

import exceptions.LogicException;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;


public class PoolConexiones implements IPoolConexiones {

	/**
	 * Instancia de la clase.
	 */
	private static PoolConexiones instancia;
	
//	/**
//	 * La lista de conexiones.
//	 */
//	private ArrayList<Conexion> conexiones = new ArrayList<Conexion>();
//
//	/**
//	 * Url de conexi�n.
//	 */
//	private String url;
//
//	/**
//	 * Usuario.
//	 */
//	private String usuario;
//
//	/**
//	 * Contrase�a.
//	 */
//	private String contrasenia;
//
//	/**
//	 * Constructor de la clase.
//	 *
//	 * @throws ClassNotFoundException
//	 */
//	private PoolConexiones() throws LogicException {
//		// Obtenemos los par�metros desde el archivo de configuraci�n.
//		Properties parametros = new Properties();
//
//		/*
//		 * TODO: Implementar.
//		try {
//			parametros.load(new FileInputStream("sql.properties"));
//		} catch (IOException e) {
//			throw new PersistenciaException("Error al crear el pool de conexiones: " + e.getMessage());
//		}
//		*/
//
//		this.url = "jdbc:mysql://localhost:3307/fishing_conflicts?serverTimezone=America/Montevideo"; // parametros.getProperty("url") + '/' + parametros.getProperty("baseDeDatos");
//		this.usuario = "root"; // parametros.getProperty("usuario");
//		this.contrasenia = "root"; // parametros.getProperty("contrase�a");
//
//		try {
//			Class.forName("com.mysql.cj.jdbc.Driver");
//		} catch (ClassNotFoundException e) {
//			throw new LogicException("Error al crear el pool de conexiones: " + e.getMessage());
//		}
//
//		this.conexiones = new ArrayList<Conexion>();
//	}
//
//	/**
//	 * Devuelve la instancia del pool.
//	 *
//	 * @return PoolConexiones
//	 */
//	public static PoolConexiones getInstancia() throws LogicException {
//		if (!(instancia instanceof PoolConexiones))
//			instancia = new PoolConexiones();
//
//		return instancia;
//	}
//
//	/**
//	 * Obtiene una nueva conexi�n del pool. En caso de que no exista ninguna,
//	 * la crea.
//	 *
//	 * @param modifica
//	 * @return IConexion
//	 */
//	@Override
//	public IConexion obtenerConexion() throws fishingconflicts.excepciones.LogicException {
//		Conexion conexion = null;
//
//		// Recorremos las conexiones y verificamos si hay alguna libre para asignar.
//		for(Conexion c : conexiones) {
//			if (!c.estaAsignada()) {
//				conexion = c;
//			}
//		}
//
//		// En caso de no haber ninguna, creamos una nueva y la insertamos en el pool.
//		if (conexion == null) {
//			try {
//				conexion = new Conexion(DriverManager.getConnection(this.url, this.usuario, this.contrasenia));
//			} catch (SQLException e) {
//				throw new fishingconflicts.excepciones.LogicException("Error al crear una conexi�n: " + e.getMessage());
//			}
//			conexiones.add(conexion);
//		}
//
//		conexion.asignar();
//
//		try {
//			conexion.getConnection().setAutoCommit(false);
//			conexion.getConnection().setTransactionIsolation(8);
//		} catch (SQLException e) {
//			throw new fishingconflicts.excepciones.LogicException("Error al obtener una conexi�n: " + e.getMessage());
//		}
//
//		return conexion;
//	}
//
//	/**
//	 * Devuelve una conexi�n al pool.
//	 *
//	 * @param conexion
//	 * @param ok
//	 * @return void
//	 */
//	@Override
//	public void liberarConexion(IConexion conexion, boolean ok) throws fishingconflicts.excepciones.LogicException {
//		try {
//			if (ok)
//				conexion.getConnection().commit();
//			else
//				conexion.getConnection().rollback();
//		} catch (SQLException e) {
//			throw new fishingconflicts.excepciones.LogicException("Error al liberar una conexi�n: " + e.getMessage());
//		}
//
//		conexion.desasignar();
//	}

}
