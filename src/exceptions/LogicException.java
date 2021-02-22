package exceptions;

public class LogicException extends Exception {

	private String message;

	/**
	 *
	 * @param message
	 */
	public LogicException(final String message) {
		this.message = message;
	}
	
	/**
	 * 
	 * @return String
	 */
	public String getMessage() {
		return this.message;
	}
}
