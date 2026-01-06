package miralhas.github.gymniac.api.dto;

import java.util.List;

public record WorkoutExerciseDTO(
		Long id,
		ExerciseSummaryDTO exercise,
		List<SetDTO> sets
) {
}
