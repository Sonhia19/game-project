package controller;

import java.util.ArrayList;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;

public class ArtilleryController {

	private static ArtilleryController instance;
    //private IDAOArtillery daoArtillery;
    //private IDAOPlanesType daoPlanesType;
    
	 public static ArtilleryController getInstance() throws LogicException {

        if (!(instance instanceof ArtilleryController)) {
        	System.out.println("New ArtilleryController");
            instance = new ArtilleryController();
        }

        return instance;
    }

    private ArtilleryController() throws LogicException {
    	
    	//this.daoArtillery = new DAOArtillery();
    }
    
    
    public ArrayList<Artillery> generateArtilleriesList (final ArrayList<Integer> artilleriesType) {
    	
    	//se cargan aviones de jugador por tipo
    	final ArrayList<Artillery> artilleries = new ArrayList<Artillery>();
    	
    	for (int artilleryType : artilleriesType) {
    		//final Artillery artillery = daoPlanesType.getArtilleryByType(artilleryType);
    		//artilleries.add(artillery);
    	}
    	return artilleries;
    }
    
    public void saveArtillery (final int gameId, final Artillery artillery) {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			//daoPlanes.savePlanes(gameId, plane, icon);
		} catch (PersistenceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
