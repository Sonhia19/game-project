package controller;


import java.util.ArrayList;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Plane;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOPlanes;
import persistence.daos.interfaces.IDAOPlanes;

public class PlayerController {

	private static PlayerController instance;
    private IDAOPlanes daoPlanes;
    //private IDAOPlanesType daoPlanesType;
    
	 public static PlayerController getInstance() throws LogicException {

        if (!(instance instanceof PlayerController)) {
        	System.out.println("New PlaneController");
            instance = new PlayerController();
        }

        return instance;
    }

    private PlayerController() throws LogicException {
    	
    	this.daoPlanes = new DAOPlanes();
    }
    
    
    public ArrayList<Plane> generatePlanesList (final ArrayList<Integer> planesType) {
    	
    	//se cargan aviones de jugador por tipo
    	final ArrayList<Plane> planes = new ArrayList<Plane>();
    	
    	for (int planeType : planesType) {
    		//final Plane plane = daoPlanesType.getPlaneByType(planeType);
    		//planes.add(plane);
    	}
    	return planes;
    }
    
    public void savePlane (final int gameId, final Plane plane) {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			daoPlanes.savePlanes(gameId, plane, icon);
		} catch (PersistenceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

	    
}
