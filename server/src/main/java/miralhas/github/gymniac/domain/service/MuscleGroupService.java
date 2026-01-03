package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.input.MuscleGroupInput;
import miralhas.github.gymniac.api.dto_mapper.MuscleGroupMapper;
import miralhas.github.gymniac.domain.exception.ExerciseAlreadyExistsException;
import miralhas.github.gymniac.domain.exception.MuscleGroupNotFoundException;
import miralhas.github.gymniac.domain.model.Exercise;
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
	private final MuscleGroupMapper muscleGroupMapper;

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

	@Transactional
	public MuscleGroup save(MuscleGroupInput input) {
		var muscleGroup = muscleGroupMapper.fromInput(input);
		muscleGroup.generateSlug();
		validateSlug(muscleGroup.getSlug());
		return muscleGroupRepository.save(muscleGroup);
	}

	@Transactional
	public MuscleGroup update(MuscleGroupInput input, MuscleGroup muscleGroup) {
		var currentName = muscleGroup.getName();
		muscleGroupMapper.update(input, muscleGroup);
		validateSlugChange(muscleGroup, currentName);
		return muscleGroupRepository.save(muscleGroup);
	}

	@Transactional
	public void delete(Long id) {
		muscleGroupRepository.deleteById(id);
	}

	// Only validate slug if it's different.
	private void validateSlugChange(MuscleGroup muscleGroup, String currentName) {
		if (!currentName.equalsIgnoreCase(muscleGroup.getName())) {
			muscleGroup.generateSlug();
			validateSlug(muscleGroup.getSlug());
		}
	}

	private void validateSlug(String slug) {
		var exists = muscleGroupRepository.checkIfSlugAlreadyExists(slug);
		if (exists) throw new ExerciseAlreadyExistsException(
				errorMessages.get("exercise.alreadyExists.slug", slug)
		);
	}

}
