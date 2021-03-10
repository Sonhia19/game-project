package controller;

import java.util.ArrayList;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Artillery;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOArtillery;
import persistence.daos.interfaces.IDAOArtillery;
import persistence.daos.interfaces.IDAOArtilleryType;

public class ArtilleryController {

	private static ArtilleryController instance;
    private IDAOArtillery daoArtillery;
    private IDAOArtilleryType daoArtilleryType;
    
	 public static ArtilleryController getInstance() throws LogicException {

        if (!(instance instanceof ArtilleryController)) {
        	System.out.println("New ArtilleryController");
            instance = new ArtilleryController();
        }

        return instance;
    }

    private ArtilleryController() throws LogicException {
    	
    	this.daoArtillery = new DAOArtillery();
    }
    
    
    public ArrayList<Artillery> generateArtilleriesList (final ArrayList<Integer> artilleriesType) throws LogicException {
    	
    	//se cargan artillerias de jugador por tipo
    	final ArrayList<Artillery> artilleries = new ArrayList<Artillery>();
    	IDBConnection icon = null;
    	for (int artilleryType : artilleriesType) {
    		//agregar codigo de artillery type
    		try {
    		final Artillery artillery = daoArtilleryType.getArtilleryByType(artilleryType,icon);
    		}
    		catch (PersistenceException ex)
    		{
    			throw new LogicException(ex.getMessage());
    		}
    		//artilleries.add(artillery);
    	}
    	return artilleries;
    }
    
    public void saveArtillery (final int gameId, final Artillery artillery) throws LogicException {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			daoArtillery.saveArtillery(gameId, artillery, icon);
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
    }
}
