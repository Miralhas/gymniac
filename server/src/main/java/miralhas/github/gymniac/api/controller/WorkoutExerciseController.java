package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.input.AddExercisesInput;
import miralhas.github.gymniac.api.dto.input.ExerciseSetInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseSetListInput;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutExerciseInput;
import miralhas.github.gymniac.domain.service.WorkoutExerciseService;
import miralhas.github.gymniac.domain.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workouts/{workoutId}/exercises")
public class WorkoutExerciseController {

	private final WorkoutExerciseService workoutExerciseService;
	private final WorkoutService workoutService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void addExercises(@PathVariable Long workoutId, @RequestBody @Valid AddExercisesInput input) {
		workoutExerciseService.saveBulk(input.exercises(), workoutService.findByIdOrException(workoutId));
	}

	@PatchMapping("/{exerciseId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(
			@PathVariable Long workoutId,
			@PathVariable Long exerciseId,
			@RequestBody @Valid UpdateWorkoutExerciseInput input
	) {
		workoutExerciseService.update(input, workoutExerciseService.findByIdOrException(exerciseId));
	}

	@DeleteMapping("/{exerciseId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long exerciseId) {
		workoutExerciseService.delete(exerciseId);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping("/{exerciseId}/sets")
	public void updateSetsBulk(
			@PathVariable Long exerciseId,
			@RequestBody @Valid UpdateExerciseSetListInput input
	) {
		workoutExerciseService.updateSetsBulk(input, workoutExerciseService.findByIdOrException(exerciseId));
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PutMapping("/{exerciseId}/sets/{setId}")
	public void updateSets(
			@PathVariable Long setId,
			@PathVariable Long exerciseId,
			@RequestBody @Valid ExerciseSetInput input
	) {
		workoutExerciseService.updateSet(input, workoutExerciseService.findExerciseSetByIdOrException(setId));
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/{exerciseId}/sets/{setId}")
	public void deleteSet(@PathVariable Long setId) {
		workoutExerciseService.deleteSet(setId);
	}

}
