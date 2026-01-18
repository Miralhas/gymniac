package miralhas.github.gymniac.domain.exception;

import lombok.Getter;

import java.util.Map;

@Getter
public class MappedBusinessException extends BusinessException {

	private Map<String, String> errors;

	public MappedBusinessException(String message, Map<String, String> errors) {
		super(message);
		this.errors = errors;
	}

	public MappedBusinessException(String message) {
		super(message);
	}

	public MappedBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public MappedBusinessException(String message, Map<String, String> errors, Throwable cause) {
		super(message, cause);
		this.errors = errors;
	}

}