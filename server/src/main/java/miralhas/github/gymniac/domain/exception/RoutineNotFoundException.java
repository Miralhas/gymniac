package miralhas.github.gymniac.domain.exception;

public class RoutineNotFoundException extends ResourceNotFoundException {

  public RoutineNotFoundException(String message) {
    super(message);
  }

  public RoutineNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

