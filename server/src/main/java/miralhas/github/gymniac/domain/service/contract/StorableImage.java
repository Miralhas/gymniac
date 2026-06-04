package miralhas.github.gymniac.domain.service.contract;

import java.io.InputStream;
import java.nio.file.Path;

public interface StorableImage {
	InputStream inputStream();
	Path filePath();
	String contentType();
	Long size();
}
