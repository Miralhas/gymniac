package miralhas.github.gymniac.infrastructure.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.config.properties.StorageProperties;
import miralhas.github.gymniac.domain.model.image.enums.StorageProvider;
import miralhas.github.gymniac.domain.service.contract.ImageStorageService;
import miralhas.github.gymniac.domain.service.contract.StorableImage;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.infrastructure.exception.StorageException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Path;

@Primary
@Service
@RequiredArgsConstructor
public class ImageR2StorageService implements ImageStorageService {

	private final S3Client s3Client;
	private final StorageProperties storageProperties;
	private final ErrorMessages messageResolver;

	@Override
	public InputStream retrieve(Path filePath) {
		try {
			GetObjectRequest request = GetObjectRequest.builder()
					.bucket(storageProperties.r2().bucket())
					.key(resolvePath(filePath))
					.build();
			return s3Client.getObject(request);
		} catch (Exception e) {
			throw new StorageException(messageResolver.get("imageStorage.retrieve", filePath), e);
		}
	}

	@Override
	public void save(StorableImage image) {
		try {
			PutObjectRequest request = PutObjectRequest.builder()
					.bucket(storageProperties.r2().bucket())
					.key(resolvePath(image.filePath()))
					.contentType(image.contentType())
					.contentLength(image.size())
					.build();
			s3Client.putObject(request, RequestBody.fromInputStream(image.inputStream(), image.size()));
		} catch (Exception e) {
			throw new StorageException(messageResolver.get("imageStorage.store", image.filePath()));
		}
	}

	@Override
	public void remove(Path filePath) {
		try {
			DeleteObjectRequest request = DeleteObjectRequest.builder()
					.bucket(storageProperties.r2().bucket())
					.key(resolvePath(filePath))
					.build();
			s3Client.deleteObject(request);
		} catch (Exception e) {
			throw new StorageException(messageResolver.get("imageStorage.delete", filePath), e);
		}
	}

	@Override
	public StorageProvider getProvider() {
		return StorageProvider.R2;
	}

	// R2 / S3 doesn't recognize Windows' folder separator structure (\) as a folder.
	private String resolvePath(Path filePath) {
		return filePath.toString().replace(File.separator, "/");
	}

}
