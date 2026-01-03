package miralhas.github.gymniac.domain.exception;

public class MuscleGroupNotFoundException extends ResourceNotFoundException {

  public MuscleGroupNotFoundException(String message) {
    super(message);
  }

  public MuscleGroupNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

