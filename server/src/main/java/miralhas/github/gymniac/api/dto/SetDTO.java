package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record SetDTO(
		Long id,
		Double kg,
		Long reps,
		OffsetDateTime createdAt
) {
}
