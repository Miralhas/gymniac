package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.*;
import miralhas.github.gymniac.api.dto.input.WeightInput;
import miralhas.github.gymniac.api.dto_mapper.ImageMapper;
import miralhas.github.gymniac.api.dto_mapper.WeightMapper;
import miralhas.github.gymniac.domain.exception.WeightNotFoundException;
import miralhas.github.gymniac.domain.model.image.Image;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import miralhas.github.gymniac.domain.repository.UserRepository;
import miralhas.github.gymniac.domain.repository.WeightRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserInfoService {

	private final AuthUtils authUtils;
	private final WeightRepository weightRepository;
	private final WeightMapper weightMapper;
	private final UserRepository userRepository;
	private final ErrorMessages errorMessages;
	private final ImageMapper imageMapper;
	private final ImageService imageService;

	public PageDTO<WeightDTO> getAllWeights(Pageable pageable) {
		var user = authUtils.getCurrentUser();
		Page<Weight> allUserWeights = weightRepository.findAllUserWeights(user.getEmail(), pageable);
		List<WeightDTO> weightDTOS = weightMapper.toCollectionResponse(allUserWeights.getContent());
		var pageImpl = new PageImpl<>(weightDTOS, pageable, allUserWeights.getTotalElements());
		return new PageDTO<>(pageImpl);
	}

	public Weight getWeightByIdOrException(Long id) {
		return weightRepository.findById(id).orElseThrow(() -> new WeightNotFoundException(
				errorMessages.get("weight.notFound.id", id)
		));
	}


	public Weight findWeightByIdOrException(Long id) {
		return weightRepository.findById(id).orElseThrow(() -> new WeightNotFoundException(
				errorMessages.get("weight.notFound.id", id)
		));
	}

	public UserInfoDTO getUserInfoOrException(Long id) {
		var infoOptional = userRepository.findUserInfoById(id).orElseThrow(() -> {
			var message = errorMessages.get("user.info.notFound", id);
			return new UsernameNotFoundException(message);
		});
		var imageOptional = userRepository.findImageByUserId(id);
		return infoOptional.getUserInfoDTO(imageOptional.map(imageMapper::toSummaryResponse).orElse(null));
	}

	@Transactional
	public WeightDTO saveWeight(WeightInput input) {
		var user = authUtils.getCurrentUser();

		var weight = new Weight();
		weight.setKg(input.kg());
		weight.setUser(user);

		return weightMapper.toResponse(weightRepository.save(weight));
	}

	@Transactional
	public List<Image> addWeightImages(Weight weight, List<NewImage> newImages) {
		var images = imageService.saveAll(newImages);
		weight.addImages(images);
		weightRepository.save(weight);
		return images;
	}

	@Transactional
	public WeightDTO updateWeight(WeightInput input, Weight weight) {
		authUtils.validate(weight.getUser());
		weight.setKg(input.kg());
		return weightMapper.toResponse(weightRepository.save(weight));
	}

	@Transactional
	public void deleteWeight(Long id) {
		weightRepository.deleteById(id);
	}
}
