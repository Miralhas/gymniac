package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record WorkoutPlanInput(
		@NotBlank
		String name,

		@NotBlank
		String description,

		@Valid
		@Size(min = 1)
		List<RoutineInput> routines
) {
}
