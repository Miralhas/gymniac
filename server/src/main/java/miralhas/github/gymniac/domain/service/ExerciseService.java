package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.input.ExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseInput;
import miralhas.github.gymniac.api.dto_mapper.ExerciseMapper;
import miralhas.github.gymniac.domain.exception.ExerciseAlreadyExistsException;
import miralhas.github.gymniac.domain.exception.ExerciseNotFoundException;
import miralhas.github.gymniac.domain.model.Exercise;
import miralhas.github.gymniac.domain.repository.ExerciseRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.domain.utils.ValidateAuthorization;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseService {

	private final ExerciseRepository exerciseRepository;
	private final ErrorMessages errorMessages;
	private final ExerciseMapper exerciseMapper;
	private final MuscleGroupService muscleGroupService;
	private final ValidateAuthorization validateAuthorization;

	public List<Exercise> findAll() {
		return exerciseRepository.findAll();
	}

	public Exercise findByIdOrException(Long id) {
		return exerciseRepository.findById(id).orElseThrow(() ->
				new ExerciseNotFoundException(errorMessages.get("exercise.notFound.id", id))
		);
	}

	public Exercise findBySlugOrException(String slug) {
		return exerciseRepository.findBySlug(slug).orElseThrow(() ->
				new ExerciseNotFoundException(errorMessages.get("exercise.notFound.id", slug))
		);
	}

	@Transactional
	public Exercise save(ExerciseInput input) {
		var muscleGroup = muscleGroupService.findBySlug(input.muscleGroup());
		var user = validateAuthorization.getCurrentUser();
		var exercise = exerciseMapper.fromInput(input);

		exercise.setSubmitter(user);
		exercise.setMuscleGroup(muscleGroup);
		exercise.generateSlug();
		validateSlug(exercise.getSlug());

		return exerciseRepository.save(exercise);
	}

	@Transactional
	public Exercise update(Exercise exercise, UpdateExerciseInput input) {
		var currentName = exercise.getName();
		exerciseMapper.update(input, exercise);
		validateMuscleGroupChange(exercise, input.muscleGroup());
		validateSlugChange(exercise, currentName);
		return exerciseRepository.save(exercise);
	}

	@Transactional
	public void delete(Long id) {
		exerciseRepository.deleteById(id);
	}

	// Check if user wants to change the muscle group. If so, then fetch it and set on the exercise object.
	private void validateMuscleGroupChange(Exercise exercise, String muscleGroupSlug) {
		if (StringUtils.hasText(muscleGroupSlug)) {
			var muscleGroup = muscleGroupService.findBySlug(muscleGroupSlug);
			exercise.setMuscleGroup(muscleGroup);
		}
	}

	// Only validate slug if it's different.
	private void validateSlugChange(Exercise exercise, String currentName) {
		if (!currentName.equalsIgnoreCase(exercise.getName())) {
			exercise.generateSlug();
			validateSlug(exercise.getSlug());
		}
	}

	private void validateSlug(String slug) {
		var exists = exerciseRepository.checkIfSlugAlreadyExists(slug);
		if (exists) throw new ExerciseAlreadyExistsException(
				errorMessages.get("exercise.alreadyExists.slug", slug)
		);
	}
}
