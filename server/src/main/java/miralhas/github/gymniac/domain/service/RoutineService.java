package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.RoutineDTO;
import miralhas.github.gymniac.api.dto.input.RoutineInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineInput;
import miralhas.github.gymniac.api.dto_mapper.RoutineExerciseMapper;
import miralhas.github.gymniac.api.dto_mapper.RoutineMapper;
import miralhas.github.gymniac.domain.exception.RoutineExerciseNotFoundException;
import miralhas.github.gymniac.domain.exception.RoutineNotFoundException;
import miralhas.github.gymniac.domain.model.workout_plan.Routine;
import miralhas.github.gymniac.domain.model.workout_plan.RoutineExercise;
import miralhas.github.gymniac.domain.model.workout_plan.WorkoutPlan;
import miralhas.github.gymniac.domain.repository.RoutineExerciseRepository;
import miralhas.github.gymniac.domain.repository.RoutineRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.domain.utils.ValidateAuthorization;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoutineService {

	private final RoutineMapper routineMapper;
	private final ExerciseService exerciseService;
	private final RoutineRepository routineRepository;
	private final RoutineExerciseMapper routineExerciseMapper;
	private final RoutineExerciseRepository routineExerciseRepository;
	private final ErrorMessages errorMessages;
	private final ValidateAuthorization validateAuthorization;

	public Routine findByIdOrException(Long id) {
		return routineRepository.findById(id).orElseThrow(
				() -> new RoutineNotFoundException(errorMessages.get("routine.notFound.id", id))
		);
	}

	public List<RoutineDTO> findRoutinesByWorkoutSlug(String slug) {
		return routineRepository.findRoutinesByWorkoutPlanSlug(slug).stream().map(routineMapper::toResponse).toList();
	}

	public RoutineExercise findRoutineExerciseByIdOrException(Long id) {
		return routineExerciseRepository.findById(id).orElseThrow(() ->
				new RoutineExerciseNotFoundException(errorMessages.get("routineExercise.notFound.id", id))
		);
	}

	@Transactional
	public List<Routine> saveBulk(WorkoutPlan workoutPlan, List<RoutineInput> routinesInput) {
		return routinesInput.stream().map(routineInput -> {
			var routine = routineMapper.fromInput(routineInput);
			routine.setWorkoutPlan(workoutPlan);
			routine = routineRepository.save(routine);

			final Routine finalRoutine = routine;
			var routineExercises = routineInput.exercises().stream().map(rExInput -> {
				var routineExercise = routineExerciseMapper.fromInput(rExInput);
				var exercise = exerciseService.findBySlugOrException(rExInput.slug());
				routineExercise.setExercise(exercise);
				routineExercise.setRoutine(finalRoutine);
				return routineExerciseRepository.save(routineExercise);
			}).toList();

			routine.setRoutineExercises(routineExercises);
			return routine;
		}).toList();
	}

	@Transactional
	public Routine update(Routine routine, UpdateRoutineInput input) {
		validateAuthorization.validate(routine.getWorkoutPlan().getUser());

		routineMapper.update(input, routine);
		return routineRepository.save(routine);
	}

	@Transactional
	public void delete(Long id) {
		var routine = findByIdOrException(id);
		validateAuthorization.validate(routine.getWorkoutPlan().getUser());

		routineRepository.deleteById(id);
	}

	@Transactional
	public void updateRoutineExercise(UpdateRoutineExerciseInput input, RoutineExercise routineExercise) {
		var workoutPlan = routineExercise.getRoutine().getWorkoutPlan();
		validateAuthorization.validate(workoutPlan.getUser());

		routineExerciseMapper.update(input, routineExercise);

		if (StringUtils.hasText(input.slug())) {
			var exercise = exerciseService.findBySlugOrException(input.slug());
			routineExercise.setExercise(exercise);
		}

		routineExerciseRepository.save(routineExercise);
	}

	@Transactional
	public void deleteRoutineExercise(Long id) {
		var routineExercise = findRoutineExerciseByIdOrException(id);
		var workoutPlan = routineExercise.getRoutine().getWorkoutPlan();
		validateAuthorization.validate(workoutPlan.getUser());

		routineExerciseRepository.deleteById(id);
	}
}
