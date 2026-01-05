package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WorkoutPlanDTO;
import miralhas.github.gymniac.api.dto.WorkoutPlanSummaryDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutPlanInput;
import miralhas.github.gymniac.api.dto.input.WorkoutPlanInput;
import miralhas.github.gymniac.api.dto_mapper.WorkoutPlanMapper;
import miralhas.github.gymniac.domain.service.WorkoutPlanService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workout-plans")
public class WorkoutPlanController {

	private final WorkoutPlanService workoutPlanService;
	private final WorkoutPlanMapper workoutPlanMapper;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public PageDTO<WorkoutPlanSummaryDTO> findAllWorkoutPlans(
			@PageableDefault(size = 10, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable
	) {
		return workoutPlanService.findAll(pageable);
	}

	@GetMapping("/{slug}")
	@ResponseStatus(HttpStatus.OK)
	public WorkoutPlanDTO findWorkoutPlanBySlug(@PathVariable String slug) {
		return workoutPlanService.sortedByDayOfWeek(slug);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public WorkoutPlanDTO createWorkoutPlan(@RequestBody @Valid WorkoutPlanInput input) {
		var workoutPlan = workoutPlanService.save(input);
		return workoutPlanMapper.toResponse(workoutPlan);
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public WorkoutPlanDTO updateWorkoutPlan(@PathVariable Long id, @RequestBody @Valid UpdateWorkoutPlanInput input) {
		var workoutPlan = workoutPlanService.findByIdOrException(id);
		return workoutPlanMapper.toResponse(workoutPlanService.update(input, workoutPlan));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteWorkoutPlan(@PathVariable Long id) {
		workoutPlanService.delete(id);
	}
}
