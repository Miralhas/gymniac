package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateExerciseSet(
		@Min(1)
		@NotNull
		Long reps,

		@Min(1)
		@NotNull
		Double kg
) {
}
