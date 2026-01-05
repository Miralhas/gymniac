package miralhas.github.gymniac.api.dto;

import java.util.List;

public record RoutineDTO(
		Long id,
		String name,
		String desirableDayOfWeek,
		String note,
		List<RoutineExerciseDTO> exercises
) {
}
