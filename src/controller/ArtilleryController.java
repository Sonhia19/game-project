package controller;

import java.util.ArrayList;

import exceptions.LogicException;
import exceptions.PersistenceException;
import logic.models.Artillery;
import logic.models.Plane;
import persistence.connection.ConnectionsPool;
import persistence.connection.IDBConnection;
import persistence.daos.DAOArtillery;
import persistence.daos.DAOArtilleryType;
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
    	this.daoArtilleryType = new DAOArtilleryType();
    }
    
    
    public ArrayList<Artillery> generateArtilleriesList (final ArrayList<Integer> artilleriesType, int teamSide) throws LogicException {
    	
    	//se cargan artillerias de jugador por tipo
    	final ArrayList<Artillery> artilleries = new ArrayList<Artillery>();
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			int i = 1;
			for (int artilleryType : artilleriesType) {
				final Artillery artillery = daoArtilleryType.getArtilleryByType(i, artilleryType, teamSide, icon);
    			artilleries.add(artillery);
    			i++;
	    	}
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
		
    	return artilleries;
    }
    
    
    
    public void saveArtillery (final int playerId, final Artillery artillery,final int artilleryCode) throws LogicException {
    	
    	IDBConnection icon = null;
		try {
			icon = ConnectionsPool.getInstancia().obtenerConexion();
			daoArtillery.saveArtillery(playerId, artillery, icon,artilleryCode);
		} catch (PersistenceException ex) {
			throw new LogicException(ex.getMessage());
		}
    }
}
