package miralhas.github.gymniac.domain.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class WorkoutPlanAlreadyExistsException extends MappedBusinessException {

	private Map<String, String> errors;

	public WorkoutPlanAlreadyExistsException(String message, Map<String, String> errors) {
		super(message);
		this.errors = errors;
	}

	public WorkoutPlanAlreadyExistsException(String message) {
		super(message);
	}

	public WorkoutPlanAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

	public WorkoutPlanAlreadyExistsException(String message, Map<String, String> errors, Throwable cause) {
		super(message, cause);
		this.errors = errors;
	}

}