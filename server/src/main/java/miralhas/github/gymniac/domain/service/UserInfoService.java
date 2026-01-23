package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.WeightDTO;
import miralhas.github.gymniac.api.dto.input.WeightInput;
import miralhas.github.gymniac.api.dto_mapper.WeightMapper;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import miralhas.github.gymniac.domain.repository.WeightRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
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

	public List<WeightDTO> getAllWeights() {
		var user = authUtils.getCurrentUser();
		return weightRepository.findAllUserWeights(user.getEmail()).stream().map(weightMapper::toResponse).toList();
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
