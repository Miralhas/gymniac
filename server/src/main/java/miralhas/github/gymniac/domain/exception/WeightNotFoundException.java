package miralhas.github.gymniac.domain.exception;

public class WeightNotFoundException extends ResourceNotFoundException {

  public WeightNotFoundException(String message) {
    super(message);
  }

  public WeightNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

}

