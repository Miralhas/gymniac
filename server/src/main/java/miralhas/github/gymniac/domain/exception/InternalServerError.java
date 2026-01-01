package miralhas.github.gymniac.domain.exception;

public class InternalServerError extends RuntimeException {
	public InternalServerError(String message) {
		super(message);
	}

	public InternalServerError() {
	}
}
