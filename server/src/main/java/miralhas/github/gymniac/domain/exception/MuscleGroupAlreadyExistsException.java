package miralhas.github.gymniac.domain.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class MuscleGroupAlreadyExistsException extends BusinessException {

	private Map<String, String> errors;

	public MuscleGroupAlreadyExistsException(String message, Map<String, String> errors) {
		super(message);
		this.errors = errors;
	}

	public MuscleGroupAlreadyExistsException(String message) {
		super(message);
	}

	public MuscleGroupAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public MuscleGroupAlreadyExistsException(String message, Map<String, String> errors, Throwable cause) {
		super(message, cause);
		this.errors = errors;
	}

}