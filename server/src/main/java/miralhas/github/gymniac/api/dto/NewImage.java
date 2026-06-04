package miralhas.github.gymniac.api.dto;

import miralhas.github.gymniac.domain.model.image.enums.StorageProvider;
import miralhas.github.gymniac.domain.service.contract.StorableImage;

import java.io.InputStream;
import java.nio.file.Path;

public record NewImage(
		InputStream inputStream,
		String contentType,
		Long size,
		Path relativeFolder,
		String fileName,
		StorageProvider storageProvider
) implements StorableImage {
	@Override
	public Path filePath() {
		return relativeFolder.resolve(fileName);
	}
}
