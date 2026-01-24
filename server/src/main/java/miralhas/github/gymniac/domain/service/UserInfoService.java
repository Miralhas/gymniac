package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WeightDTO;
import miralhas.github.gymniac.api.dto.input.WeightInput;
import miralhas.github.gymniac.api.dto_mapper.WeightMapper;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import miralhas.github.gymniac.domain.repository.WeightRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

	public PageDTO<WeightDTO> getAllWeights(Pageable pageable) {
		var user = authUtils.getCurrentUser();
		Page<Weight> allUserWeights = weightRepository.findAllUserWeights(user.getEmail(), pageable);
		List<WeightDTO> weightDTOS = weightMapper.toCollectionResponse(allUserWeights.getContent());
		var pageImpl = new PageImpl<>(weightDTOS, pageable, allUserWeights.getTotalElements());
		return new PageDTO<>(pageImpl);
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
	public void deleteWeight(Long id) {
		weightRepository.deleteById(id);
	}
}
