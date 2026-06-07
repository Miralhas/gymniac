package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record WeightDTO(
		Long id,
		OffsetDateTime createdAt,
		Double kg,
		List<ImageSummaryDTO> images
) {
}
