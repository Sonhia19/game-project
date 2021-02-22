package server.ws;

import org.json.JSONArray;
import org.json.JSONObject;

public class WsResponse {


	private JSONObject action;
	
	private JSONObject result;
	
	private JSONArray responses;
	
	public WsResponse() {
		this.responses = new JSONArray();
		this.setResult(true, "");
	}
	
	public void setAction(final JSONObject action) {
		this.action = action;
	}

	public void setResult(final boolean state, final String message) {
		this.result = new JSONObject();
		this.result.put("estado", state);
		this.result.put("mensaje", message);
	}
	
	public void generateResponse(final String name, final String value, final String type) {
		JSONObject response = new JSONObject();
		response.put("nombre", name);
		response.put("valor", value);
		response.put("tipo", type);
		
		this.responses.put(response);
	}
	
	public void deleteResponse(final String name) {
		for (int i = 0; i < this.responses.length(); i++) {
			if (((JSONObject) this.responses.get(i)).getString("name")
					.equalsIgnoreCase(name)) {
				
				this.responses.remove(i);
				break;
			}
		}
	}
	
	public String toParsedString() {
		JSONObject response = new JSONObject();
		response.put("operacion", this.action);
		response.put("exito", this.result);
		response.put("respuestas", this.responses);
		
		return response.toString();
	}
}
