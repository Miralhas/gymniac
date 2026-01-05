package miralhas.github.gymniac.api.dto;

import java.util.List;

public record RoutineSummaryDTO(
		Long id,
		String name,
		String desirableDayOfWeek
//		List<RoutineExerciseSummaryDTO> exercises
) {
}
