package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WorkoutDTO;
import miralhas.github.gymniac.api.dto.WorkoutSummaryDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInputList;
import miralhas.github.gymniac.domain.service.WorkoutService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workouts")
public class WorkoutController {

	private final WorkoutService workoutService;

	@GetMapping
	@PreAuthorize("hasRole('USER')")
	public PageDTO<WorkoutSummaryDTO> getAllByUser(
			@PageableDefault(size = 35, sort = {"createdAt", "id"}, direction = Sort.Direction.DESC) Pageable pageable
	) {
		return workoutService.findAllUserWorkouts(pageable);
	}

	@GetMapping("/unpaginated")
	public List<WorkoutDTO> findAllUserWorkoutsUnpaginated() {
		return workoutService.findAllUnpaginated();
	}

	@GetMapping("/{id}")
	public WorkoutDTO findById(@PathVariable Long id) {
		return workoutService.findByIdSorted(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public WorkoutDTO createWorkout(@RequestBody @Valid WorkoutInput input) {
		return workoutService.save(input);
	}

	@PostMapping("/bulk")
	public void createWorkoutsBulk(@RequestBody @Valid WorkoutInputList inputs) {
		workoutService.saveBulk(inputs);
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
