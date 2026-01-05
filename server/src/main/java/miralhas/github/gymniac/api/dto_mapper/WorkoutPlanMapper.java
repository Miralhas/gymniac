package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.WorkoutPlanDTO;
import miralhas.github.gymniac.api.dto.WorkoutPlanSummaryDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutPlanInput;
import miralhas.github.gymniac.api.dto.input.WorkoutPlanInput;
import miralhas.github.gymniac.domain.model.workout_plan.WorkoutPlan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {RoutineMapper.class, UserMapper.class}
)
public interface WorkoutPlanMapper {

	@Mapping(target = "routines", ignore = true)
	WorkoutPlan fromInput(WorkoutPlanInput input);

	WorkoutPlanDTO toResponse(WorkoutPlan workoutPlan);

	WorkoutPlanSummaryDTO toSummaryResponse(WorkoutPlan workoutPlan);


	void update(UpdateWorkoutPlanInput input, @MappingTarget WorkoutPlan workoutPlan);
}
