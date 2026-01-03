package miralhas.github.gymniac.domain.exception;

public class ExerciseNotFoundException extends ResourceNotFoundException {

  public ExerciseNotFoundException(String message) {
    super(message);
  }

  public ExerciseNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

