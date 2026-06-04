package miralhas.github.gymniac.config.properties;

import miralhas.github.gymniac.domain.model.image.enums.StorageProvider;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.unit.DataSize;

import java.nio.file.Path;

@ConfigurationProperties(prefix = "storage")
public record StorageProperties(
		StorageProvider currentProvider,
		DataSize multipartMaxFileSize,
		LocalStorage local,
		R2Storage r2
) {
	public record LocalStorage(Path directory) {}
	public record R2Storage(String endpoint, String accessKey, String secretKey, String bucket) {}

	public Path getLocalDirectory() {
		return this.local.directory;
	}
}

