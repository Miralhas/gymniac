package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record WorkoutSummaryDTO(
		Long id,
		String uuidKey,
		OffsetDateTime createdAt,
		OffsetDateTime updatedAt,
		String note,
		UserSummaryDTO user
) {
}
