package miralhas.github.gymniac.api.dto;

import java.util.List;

public record WorkoutPlanDTO(
		Long id,
		String name,
		String slug,
		String description,
		List<RoutineDTO> routines,
		UserSummaryDTO user
) {
}
