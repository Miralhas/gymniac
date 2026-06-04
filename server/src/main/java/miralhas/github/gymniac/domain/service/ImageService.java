package miralhas.github.gymniac.domain.service;


import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.NewImage;
import miralhas.github.gymniac.api.dto_mapper.ImageMapper;
import miralhas.github.gymniac.domain.exception.ImageNotFoundException;
import miralhas.github.gymniac.domain.model.image.Image;
import miralhas.github.gymniac.domain.repository.ImageRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.infrastructure.factory.ImageStorageFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {
	private final ImageStorageFactory imageStorageFactory;
	private final ImageMapper imageMapper;
	private final ImageRepository imageRepository;
	private final ErrorMessages messageResolver;

	public Image findByIdOrException(UUID id) {
		return imageRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(
				messageResolver.get("image.id.notFound", id)
		));
	}

	public Image findByNameOrException(String fileName) {
		return imageRepository.findByName(fileName).orElseThrow(() -> new ImageNotFoundException(
				messageResolver.get("image.fileName.notFound", fileName)
		));
	}

	public InputStreamResource getImage(Image image) {
		var imageService = imageStorageFactory.getStorage(image.getStorageProvider());

		var imageStream = imageService.retrieve(image.getFilePath());
		return new InputStreamResource(imageStream);
	}

	@Transactional
	public List<Image> saveAll(List<NewImage> newImages) {
		var images = imageMapper.fromNewImages(newImages);
		var imageService = imageStorageFactory.getStorage(images.getFirst().getStorageProvider());

		imageService.saveAll(newImages);
		return imageRepository.saveAll(images);
	}

	@Transactional
	public Image save(NewImage newImage) {
		var image = imageMapper.fromNewImage(newImage);
		var imageService = imageStorageFactory.getStorage(image.getStorageProvider());

		imageService.save(newImage);
		return imageRepository.save(image);
	}

	@Transactional
	public Image update(Image image, NewImage newImage) {
		var imageService = imageStorageFactory.getStorage(image.getStorageProvider());

		imageService.replace(newImage, image.getFilePath());
		imageMapper.update(newImage, image);
		return imageRepository.saveAndFlush(image);
	}

	@Transactional
	public void delete(UUID id) {
		var image = findByIdOrException(id);
		var imageService = imageStorageFactory.getStorage(image.getStorageProvider());

		imageRepository.deleteById(id);
		imageService.remove(image.getFilePath());
	}

}
