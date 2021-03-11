package controller;


import java.util.ArrayList;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Plane;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOPlane;
import persistence.daos.DAOPlaneType;
import persistence.daos.interfaces.IDAOPlane;
import persistence.daos.interfaces.IDAOPlaneType;

public class PlaneController {

	private static PlaneController instance;
    private IDAOPlane daoPlanes;
    private IDAOPlaneType daoPlaneType;
    
	 public static PlaneController getInstance() throws LogicException {

        if (!(instance instanceof PlaneController)) {
        	System.out.println("New PlaneController");
            instance = new PlaneController();
        }

        return instance;
    }

    private PlaneController() throws LogicException {
    	
    	this.daoPlanes = new DAOPlane();
    	this.daoPlaneType = new DAOPlaneType();
    }
    
    
    public ArrayList<Plane> generatePlanesList (final ArrayList<Integer> planesType, int teamSide) throws LogicException {
    	
    	//se cargan aviones de jugador por tipo
    	final ArrayList<Plane> planes = new ArrayList<Plane>();
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			int i = 1;
			for (int planeType : planesType) {

	    		final Plane plane = daoPlaneType.getPlaneByType(i, planeType, teamSide, icon);
	    		planes.add(plane);
	    		i++;
	    	}
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
		
    	return planes;
    }
    
    public void savePlane (final int playerId, final Plane plane) throws LogicException {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			daoPlanes.savePlanes(playerId, plane, icon);
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
    }

}
