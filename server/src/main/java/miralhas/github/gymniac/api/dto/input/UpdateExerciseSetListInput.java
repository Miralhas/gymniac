package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UpdateExerciseSetListInput(
		@Valid
		@NotNull
		List<UpdateExerciseSet> sets
) {
}
