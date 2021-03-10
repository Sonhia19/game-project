package server.utils;

import org.json.JSONArray;
import org.json.JSONObject;

public class WsResponse {


	private JSONObject action;
	
	private JSONObject result;
	
	private JSONArray responses;
	
	public WsResponse() {
		responses = new JSONArray();
	}
	
	public void setAction(final JSONObject action) {
		this.action = action;
	}

	public void setResult(final boolean state, final String message) {
		this.result = new JSONObject();
		this.result.put("state", state);
		this.result.put("message", message);
	}
	
	public void generateResponse(final String name, final String value, final String type) {
		JSONObject response = new JSONObject();
		response.put("name", name);
		response.put("value", value);
		response.put("type", type);
		
		responses.put(response);
	}
	
	public Object getValue(final int index) {
		
		JSONObject json = null;
		Object value = null;
		if (!responses.isNull(index)) {
			json = (JSONObject) responses.get(index);
			value = json.get("value");
		}
		return value;
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
		response.put("action", this.action);
		response.put("result", this.result);
		response.put("responses", this.responses);
		
		return response.toString();
	}
}
