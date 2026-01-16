package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record WorkoutSummaryDTO(
		Long id,
		OffsetDateTime createdAt,
		OffsetDateTime updatedAt,
		String note,
		UserSummaryDTO user
) {
}
