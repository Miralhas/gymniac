package miralhas.github.gymniac.infrastructure.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.config.properties.StorageProperties;
import miralhas.github.gymniac.domain.model.image.enums.StorageProvider;
import miralhas.github.gymniac.domain.service.contract.ImageStorageService;
import miralhas.github.gymniac.domain.service.contract.StorableImage;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.infrastructure.exception.StorageException;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class ImageLocalStorageService implements ImageStorageService {

	private final ErrorMessages messageResolver;
	private final StorageProperties storageProperties;

	@Override
	public InputStream retrieve(Path filePath) {
		try {
			return Files.newInputStream(resolvePath(filePath));
		} catch (IOException e) {
			throw new StorageException(messageResolver.get("imageStorage.retrieve", filePath), e);
		}
	}

	@Override
	public void save(StorableImage image) {
		try {
			var path = resolvePath(image.filePath());
			FileCopyUtils.copy(image.inputStream(), Files.newOutputStream(path));
		} catch (IOException e) {
			throw new StorageException(messageResolver.get("imageStorage.store", image.filePath()), e);
		}
	}

	@Override
	public void remove(Path filePath) {
		try {
			Files.deleteIfExists(resolvePath(filePath));
		} catch (IOException e) {
			throw new StorageException(messageResolver.get("imageStorage.delete", filePath), e);
		}
	}

	@Override
	public StorageProvider getProvider() {
		return StorageProvider.LOCAL;
	}

	private Path resolvePath(Path filePath) throws IOException {
		Path resolved = storageProperties.getLocalDirectory().resolve(filePath);
		Files.createDirectories(resolved.getParent());
		return resolved;
	}
}
