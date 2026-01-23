package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record WeightDTO(
		Long id,
		OffsetDateTime createdAt,
		Double kg
) {
}
