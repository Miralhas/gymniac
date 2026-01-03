package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record UpdateExerciseInput(
		@Size(max = 254)
		String muscleGroup,

		@Size(max = 254)
		String name,

		@Size(max = 254)
		String description,

		@URL
		String videoHowTo
) {
}
