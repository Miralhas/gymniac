package miralhas.github.gymniac.domain.exception;

public class RoutineExerciseNotFoundException extends ResourceNotFoundException {

  public RoutineExerciseNotFoundException(String message) {
    super(message);
  }

  public RoutineExerciseNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

