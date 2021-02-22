package exceptions;

public class PersistenceException extends Exception {

	private String message;

	/**
	 *
	 * @param message
	 */
	public PersistenceException(final String message) {
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
