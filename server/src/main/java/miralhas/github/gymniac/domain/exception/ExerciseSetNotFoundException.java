package miralhas.github.gymniac.domain.exception;

public class ExerciseSetNotFoundException extends ResourceNotFoundException {

  public ExerciseSetNotFoundException(String message) {
    super(message);
  }

  public ExerciseSetNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

