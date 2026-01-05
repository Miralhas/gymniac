package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;

public record UpdateRoutineExerciseInput(
		String slug,

		@Min(1)
		Long desirableSets,

		@Min(1)
		Long desirableReps
) {
}
