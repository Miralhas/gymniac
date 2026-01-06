package miralhas.github.gymniac.domain.exception;

public class WorkoutExerciseNotFoundException extends ResourceNotFoundException {

  public WorkoutExerciseNotFoundException(String message) {
    super(message);
  }

  public WorkoutExerciseNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

