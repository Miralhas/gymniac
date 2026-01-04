package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record ExerciseInput(
		@NotBlank
		@Size(max = 254)
		String muscleGroup,

		@NotBlank
		@Size(max = 254)
		String name,

		@NotBlank
		@Size(max = 254)
		String description,

		@URL
		String videoHowTo
) {
}
