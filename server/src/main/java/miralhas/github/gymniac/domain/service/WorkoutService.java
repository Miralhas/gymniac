package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WorkoutDTO;
import miralhas.github.gymniac.api.dto.WorkoutSummaryDTO;
import miralhas.github.gymniac.api.dto.filter.ExerciseFilter;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInput;
import miralhas.github.gymniac.api.dto_mapper.WorkoutMapper;
import miralhas.github.gymniac.domain.exception.WorkoutNotFoundException;
import miralhas.github.gymniac.domain.model.workout.ExerciseSet;
import miralhas.github.gymniac.domain.model.workout.Workout;
import miralhas.github.gymniac.domain.model.workout.WorkoutExercise;
import miralhas.github.gymniac.domain.repository.WorkoutRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkoutService {

	private final WorkoutMapper workoutMapper;
	private final AuthUtils authUtils;
	private final WorkoutRepository workoutRepository;
	private final WorkoutExerciseService workoutExerciseService;
	private final ErrorMessages errorMessages;

	public PageDTO<WorkoutSummaryDTO> findAllUserWorkouts(Pageable pageable) {
		var user = authUtils.getCurrentUser();
		Page<Workout> workoutPage = workoutRepository.findAllByUserByEmail(user.getEmail(), pageable);
		List<WorkoutSummaryDTO> workoutDTOS = workoutMapper.toSummaryCollectionResponse(workoutPage.getContent());
		var pageImpl = new PageImpl<>(workoutDTOS, pageable, workoutPage.getTotalElements());
		return new PageDTO<>(pageImpl);
	}

	public Workout findByIdOrException(Long id) {
		return workoutRepository.findById(id).orElseThrow(() ->
				new WorkoutNotFoundException(errorMessages.get("workout.notFound.id", id))
		);
	}

	public WorkoutDTO findByIdSorted(Long id) {
		var workout = findByIdOrException(id);
		workout.getExercises().forEach(ex ->
				ex.getSets().sort(Comparator.comparing(ExerciseSet::getCreatedAt)));
		workout.getExercises().sort(Comparator.comparing(WorkoutExercise::getId));
		return workoutMapper.toResponse(workout);
	}

	@Transactional
	public WorkoutDTO save(WorkoutInput input) {
		var user = authUtils.getCurrentUser();
		var workout = workoutMapper.fromInput(input);
		var exercisesInput = input.exercises();

		workout.setUser(user);
		workout = workoutRepository.save(workout);

		var workoutExercises = workoutExerciseService.saveBulk(exercisesInput, workout);
		workout.setExercises(workoutExercises);


		return workoutMapper.toResponse(workout);
	}

	@Transactional
	public void update(UpdateWorkoutInput input, Workout workout) {
		var owner = workout.getUser();
		authUtils.validate(owner);

		workoutMapper.update(input, workout);
		workoutRepository.save(workout);
	}

	@Transactional
	public void delete(Long id) {
		var workout = findByIdOrException(id);
		var owner = workout.getUser();
		authUtils.validate(owner);

		workoutRepository.deleteById(id);
	}
}
