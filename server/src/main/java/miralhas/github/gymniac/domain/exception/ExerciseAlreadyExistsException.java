package miralhas.github.gymniac.domain.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class ExerciseAlreadyExistsException extends MappedBusinessException {

	private Map<String, String> errors;

	public ExerciseAlreadyExistsException(String message, Map<String, String> errors) {
		super(message);
		this.errors = errors;
	}

	public ExerciseAlreadyExistsException(String message) {
		super(message);
	}

	public ExerciseAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public ExerciseAlreadyExistsException(String message, Map<String, String> errors, Throwable cause) {
		super(message, cause);
		this.errors = errors;
	}

}