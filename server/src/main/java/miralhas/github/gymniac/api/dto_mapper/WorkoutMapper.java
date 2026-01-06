package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.WorkoutDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInput;
import miralhas.github.gymniac.domain.model.workout.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;


@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {UserMapper.class, WorkoutExerciseMapper.class}
)
public interface WorkoutMapper {

	@Mapping(target = "exercises", ignore = true)
	Workout fromInput(WorkoutInput input);

	WorkoutDTO toResponse(Workout workout);

	void update(UpdateWorkoutInput input, @MappingTarget Workout workout);

}
