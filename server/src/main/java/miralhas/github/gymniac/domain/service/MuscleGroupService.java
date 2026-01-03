package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.domain.exception.MuscleGroupNotFoundException;
import miralhas.github.gymniac.domain.model.MuscleGroup;
import miralhas.github.gymniac.domain.repository.MuscleGroupRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MuscleGroupService {

	private final MuscleGroupRepository muscleGroupRepository;
	private final ErrorMessages errorMessages;

	public List<MuscleGroup> findAll() {
		return muscleGroupRepository.findAll();
	}

	public MuscleGroup findById(Long id) {
		return muscleGroupRepository.findById(id).orElseThrow(() ->
				new MuscleGroupNotFoundException(errorMessages.get("muscleGroup.notFound.id", id))
		);
	}

	public MuscleGroup findBySlug(String slug) {
		return muscleGroupRepository.findBySlug(slug).orElseThrow(() ->
				new MuscleGroupNotFoundException(errorMessages.get("muscleGroup.notFound.slug", slug))
		);
	}

}
