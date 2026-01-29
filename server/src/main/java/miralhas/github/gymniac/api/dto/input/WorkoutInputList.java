package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record WorkoutInputList(
		@Valid
		@NotNull
		@Size(min = 1)
		List<WorkoutInput> workouts
) {
}
