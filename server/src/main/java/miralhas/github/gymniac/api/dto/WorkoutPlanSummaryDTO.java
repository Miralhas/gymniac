package miralhas.github.gymniac.api.dto;

import java.util.List;

public record WorkoutPlanSummaryDTO(
		Long id,
		String name,
		String slug,
		String description,
		List<RoutineSummaryDTO> routines,
		UserSummaryDTO user
) {
}
