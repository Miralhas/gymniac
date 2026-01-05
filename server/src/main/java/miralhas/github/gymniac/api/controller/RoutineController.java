package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.RoutineDTO;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineInput;
import miralhas.github.gymniac.api.dto_mapper.RoutineMapper;
import miralhas.github.gymniac.domain.service.RoutineService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workout-plans/{slug}/routines")
public class RoutineController {

	private final RoutineService routineService;
	private final RoutineMapper routineMapper;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<RoutineDTO> getRoutinesByWorkoutPlanSlug(@PathVariable String slug) {
		return routineService.findRoutinesByWorkoutSlug(slug);
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public RoutineDTO updateRoutine(
			@PathVariable Long id,
			@PathVariable String slug,
			@RequestBody @Valid UpdateRoutineInput input
	) {
		var routine = routineService.findByIdOrException(id);
		return routineMapper.toResponse(routineService.update(routine, input));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteRoutine(
			@PathVariable Long id,
			@PathVariable String slug
	) {
		routineService.delete(id);
	}


	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PatchMapping("/{routineId}/exercises/{exerciseId}")
	public void updateRoutineExercise(
			@PathVariable Long exerciseId,
			@RequestBody @Valid UpdateRoutineExerciseInput input
	) {
		var routineExercise = routineService.findRoutineExerciseByIdOrException(exerciseId);
		routineService.updateRoutineExercise(input, routineExercise);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/{routineId}/exercises/{exerciseId}")
	public void deleteRoutineExercise(@PathVariable Long exerciseId) {
		routineService.deleteRoutineExercise(exerciseId);
	}

}
