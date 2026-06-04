package miralhas.github.gymniac.api.dto;

import java.util.UUID;

public record ImageSummaryDTO(
		UUID id,
		String contentType,
		String fileName
) {}
