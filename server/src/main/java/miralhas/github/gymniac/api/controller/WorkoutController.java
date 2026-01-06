package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.WorkoutDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInput;
import miralhas.github.gymniac.domain.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workouts")
public class WorkoutController {

	private final WorkoutService workoutService;

	@GetMapping("/{id}")
	public WorkoutDTO findById(@PathVariable Long id) {
		return workoutService.findByIdSorted(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public WorkoutDTO createWorkout(@RequestBody @Valid WorkoutInput input) {
		return workoutService.save(input);
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateWorkout(@RequestBody @Valid UpdateWorkoutInput input, @PathVariable Long id) {
		workoutService.update(input, workoutService.findByIdOrException(id));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteWorkout(@PathVariable Long id) {
		workoutService.delete(id);
	}
}
