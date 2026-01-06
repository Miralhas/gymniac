package miralhas.github.gymniac.domain.exception;

public class WorkoutNotFoundException extends ResourceNotFoundException {

  public WorkoutNotFoundException(String message) {
    super(message);
  }

  public WorkoutNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

