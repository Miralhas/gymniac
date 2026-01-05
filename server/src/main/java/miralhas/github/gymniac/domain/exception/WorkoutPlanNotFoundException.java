package miralhas.github.gymniac.domain.exception;

public class WorkoutPlanNotFoundException extends ResourceNotFoundException {

  public WorkoutPlanNotFoundException(String message) {
    super(message);
  }

  public WorkoutPlanNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

