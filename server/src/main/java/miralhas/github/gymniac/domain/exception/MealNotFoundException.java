package miralhas.github.gymniac.domain.exception;

public class MealNotFoundException extends ResourceNotFoundException {

  public MealNotFoundException(String message) {
    super(message);
  }

  public MealNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

