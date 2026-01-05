package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoutineExerciseInput(
		@NotBlank
		String slug,

		@Min(1)
		@NotNull
		Long desirableSets,

		@Min(1)
		@NotNull
		Long desirableReps
) {
}
