package exceptions;

public class ServerException extends Exception {
	private String message;

	/**
	 *
	 * @param message
	 */
	public ServerException(final String message) {
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
