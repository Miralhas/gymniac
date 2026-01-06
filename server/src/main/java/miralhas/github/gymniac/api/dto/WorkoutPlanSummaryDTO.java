package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record WorkoutPlanSummaryDTO(
		Long id,
		String name,
		OffsetDateTime createdAt,
		String slug,
		String description,
		List<RoutineSummaryDTO> routines,
		UserSummaryDTO user
) {
}
