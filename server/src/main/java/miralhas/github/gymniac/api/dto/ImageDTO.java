package miralhas.github.gymniac.api.dto;


import miralhas.github.gymniac.domain.model.image.enums.StorageProvider;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ImageDTO(
		UUID id,
		Long size,
		String fileName,
		String relativeFolder,
		String contentType,
		OffsetDateTime createdAt,
		OffsetDateTime updatedAt,
		StorageProvider storageProvider
) {}
