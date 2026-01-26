package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.input.ExerciseSetInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseSetListInput;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutExerciseInput;
import miralhas.github.gymniac.api.dto.input.WorkoutExerciseInput;
import miralhas.github.gymniac.api.dto_mapper.ExerciseSetMapper;
import miralhas.github.gymniac.api.dto_mapper.WorkoutExerciseMapper;
import miralhas.github.gymniac.domain.exception.ExerciseSetNotFoundException;
import miralhas.github.gymniac.domain.exception.WorkoutExerciseNotFoundException;
import miralhas.github.gymniac.domain.model.workout.ExerciseSet;
import miralhas.github.gymniac.domain.model.workout.Workout;
import miralhas.github.gymniac.domain.model.workout.WorkoutExercise;
import miralhas.github.gymniac.domain.repository.ExerciseSetRepository;
import miralhas.github.gymniac.domain.repository.WorkoutExerciseRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkoutExerciseService {

	private final ExerciseService exerciseService;
	private final WorkoutExerciseMapper workoutExerciseMapper;
	private final WorkoutExerciseRepository workoutExerciseRepository;
	private final ExerciseSetMapper exerciseSetMapper;
	private final ErrorMessages errorMessages;
	private final ExerciseSetRepository exerciseSetRepository;
	private final AuthUtils authUtils;

	public WorkoutExercise findByIdOrException(Long id) {
		return workoutExerciseRepository.findById(id).orElseThrow(
				() -> new WorkoutExerciseNotFoundException(errorMessages.get("workoutExercise.notFound.id", id))
		);
	}

	public ExerciseSet findExerciseSetByIdOrException(Long id) {
		return exerciseSetRepository.findById(id).orElseThrow(
				() -> new ExerciseSetNotFoundException(errorMessages.get("exerciseSet.notFound.id", id))
		);
	}

	@Transactional
	public List<WorkoutExercise> saveBulk(List<WorkoutExerciseInput> inputs, Workout workout) {
		var workouts = inputs.stream().map(input -> {
			var workoutExercise = workoutExerciseMapper.fromInput(input);
			var exercise = exerciseService.findBySlugOrException(input.slug());
			workoutExercise.setExercise(exercise);
			workoutExercise.setWorkout(workout);

			workoutExercise.setSets(input.sets().stream().map(s ->
					exerciseSetMapper.fromInput(s).withWorkoutExercise(workoutExercise)
			).toList());

			return workoutExercise;
		}).toList();
		return workoutExerciseRepository.saveAll(workouts);
	}

	@Transactional
	public void update(UpdateWorkoutExerciseInput input, WorkoutExercise workoutExercise) {
		var owner = workoutExercise.getWorkout().getUser();
		authUtils.validate(owner);

		workoutExerciseRepository.deleteAllSets(workoutExercise.getId());
		workoutExerciseRepository.flush();

		input.sets().forEach(setInput -> {
			ExerciseSet set = new ExerciseSet();
			set.setKg(setInput.kg());
			set.setReps(setInput.reps());
			set.setWorkoutExercise(workoutExercise);
			exerciseSetRepository.save(set);
		});

		var exercise = exerciseService.findBySlugOrException(input.slug());
		workoutExercise.setExercise(exercise);
		workoutExerciseRepository.save(workoutExercise);
	}

	@Transactional
	public void delete(Long exerciseId) {
		workoutExerciseRepository.deleteById(exerciseId);
	}

	@Transactional
	public void updateSet(ExerciseSetInput input, ExerciseSet exerciseSet) {
		exerciseSetMapper.update(input, exerciseSet);
		exerciseSetRepository.save(exerciseSet);
	}

	@Transactional
	public void deleteSet(Long id) {
		exerciseSetRepository.deleteById(id);
	}

}
