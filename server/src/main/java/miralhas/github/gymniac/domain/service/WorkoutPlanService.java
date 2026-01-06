package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WorkoutPlanDTO;
import miralhas.github.gymniac.api.dto.WorkoutPlanSummaryDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutPlanInput;
import miralhas.github.gymniac.api.dto.input.WorkoutPlanInput;
import miralhas.github.gymniac.api.dto_mapper.WorkoutPlanMapper;
import miralhas.github.gymniac.domain.exception.MuscleGroupAlreadyExistsException;
import miralhas.github.gymniac.domain.exception.WorkoutPlanNotFoundException;
import miralhas.github.gymniac.domain.model.workout_plan.WorkoutPlan;
import miralhas.github.gymniac.domain.repository.WorkoutPlanRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import miralhas.github.gymniac.domain.utils.AuthUtils;
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
public class WorkoutPlanService {

	private final WorkoutPlanMapper workoutPlanMapper;
	private final WorkoutPlanRepository workoutPlanRepository;
	private final ErrorMessages errorMessages;
	private final RoutineService routineService;
	private final AuthUtils authUtils;

	public PageDTO<WorkoutPlanSummaryDTO> findAll(Pageable pageable) {
		Page<WorkoutPlan> workoutPlansPage = workoutPlanRepository.findAll(pageable);
		List<WorkoutPlanSummaryDTO> workoutPlanSummaryDTOS = workoutPlansPage.getContent()
				.stream().map(workoutPlanMapper::toSummaryResponse).toList();
		var pageImpl = new PageImpl<>(workoutPlanSummaryDTOS, pageable, workoutPlansPage.getTotalElements());
		return new PageDTO<>(pageImpl);
	}

	public WorkoutPlan findBySlugOrException(String slug) {
		return workoutPlanRepository.findBySlug(slug).orElseThrow(() ->
				new WorkoutPlanNotFoundException(errorMessages.get("workoutPlan.notFound.slug", slug))
		);
	}

	public WorkoutPlan findByIdOrException(Long id) {
		return workoutPlanRepository.findById(id).orElseThrow(() ->
				new WorkoutPlanNotFoundException(errorMessages.get("workoutPlan.notFound.id", id))
		);
	}

	public WorkoutPlanDTO sortedByDayOfWeek(String slug) {
		var workoutPlan = findBySlugOrException(slug);
		workoutPlan.getRoutines().sort(Comparator.comparingInt(r -> r.getDesirableDayOfWeek().getOrder()));
		return workoutPlanMapper.toResponse(workoutPlan);
	}

	@Transactional
	public WorkoutPlan save(WorkoutPlanInput input) {
		var user = authUtils.getCurrentUser();
		var workoutPlan = workoutPlanMapper.fromInput(input);
		workoutPlan.setUser(user);
		workoutPlan.generateSlug();
		validateSlug(workoutPlan.getSlug());

		workoutPlan = workoutPlanRepository.save(workoutPlan);
		var routines = routineService.saveBulk(workoutPlan, input.routines());

		workoutPlan.setRoutines(routines);
		return workoutPlan;
	}

	@Transactional
	public WorkoutPlan update(UpdateWorkoutPlanInput input, WorkoutPlan workoutPlan) {
		var owner = workoutPlan.getUser();
		authUtils.validate(owner);

		var currentName = workoutPlan.getName();
		workoutPlanMapper.update(input, workoutPlan);
		validateSlugChange(workoutPlan, currentName);

		workoutPlan = workoutPlanRepository.save(workoutPlan);

		return workoutPlan;
	}

	@Transactional
	public void delete(Long id) {
		var workoutPlan = findByIdOrException(id);

		var owner = workoutPlan.getUser();
		authUtils.validate(owner);

		workoutPlanRepository.deleteById(id);
	}

	private void validateSlugChange(WorkoutPlan workoutPlan, String currentName) {
		if (!currentName.equalsIgnoreCase(workoutPlan.getName())) {
			workoutPlan.generateSlug();
			validateSlug(workoutPlan.getSlug());
		}
	}

	private void validateSlug(String slug) {
		var exists = workoutPlanRepository.checkIfSlugAlreadyExists(slug);
		if (exists) throw new MuscleGroupAlreadyExistsException(
				errorMessages.get("workoutPlan.alreadyExists.slug", slug)
		);
	}

}
