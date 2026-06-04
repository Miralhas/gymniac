package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.ImageDTO;
import miralhas.github.gymniac.api.dto.ImageSummaryDTO;
import miralhas.github.gymniac.api.dto.NewImage;
import miralhas.github.gymniac.api.dto.input.ImageInput;
import miralhas.github.gymniac.config.properties.StorageProperties;
import miralhas.github.gymniac.domain.model.image.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public abstract class ImageMapper {

	@Autowired
	private StorageProperties storageProperties;

	@Mapping(target = "relativeFolder", source = "relativeFolder", qualifiedByName = "getRelativeFolder")
	public abstract Image fromNewImage(NewImage newImage);

	public abstract List<Image> fromNewImages(List<NewImage> newImages);

	public abstract ImageDTO toResponse(Image image);

	public abstract List<ImageSummaryDTO> toSummaryCollectionResponse(List<Image> images);

	public abstract ImageSummaryDTO toSummaryResponse(Image image);

	public abstract List<ImageDTO> toResponseCollection(List<Image> image);

	@Mapping(target = "relativeFolder", source = "relativeFolder", qualifiedByName = "getRelativeFolder")
	public abstract void update(NewImage newImage, @MappingTarget Image image);

	@Named("getRelativeFolder")
	String getRelativeFolder(Path relativeFolder) {
		return relativeFolder.toString();
	}

	public List<NewImage> fromInput(ImageInput input, Path relativeFolder) throws IOException {
		List<NewImage> newImages = new ArrayList<>();
		for (MultipartFile file : input.getFiles()) {
			var newName = generateFileName(file.getOriginalFilename());
			var newImage = new NewImage(
					file.getInputStream(),
					file.getContentType(),
					file.getSize(),
					relativeFolder,
					newName,
					storageProperties.currentProvider()

			);
			newImages.add(newImage);
		}
		return newImages;
	}

	private String generateFileName(String originalName) {
		return UUID.randomUUID() + "_" + originalName;
	}
}
