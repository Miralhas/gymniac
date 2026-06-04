package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import miralhas.github.gymniac.config.validation.FileContentType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ImageInput {
		@NotEmpty
		@FileContentType
		private List<MultipartFile> files;
}