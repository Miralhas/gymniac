package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.WorkoutDTO;
import miralhas.github.gymniac.api.dto.WorkoutSummaryDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutInput;
import miralhas.github.gymniac.api.dto.input.WorkoutInput;
import miralhas.github.gymniac.domain.model.workout.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

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
	@Mapping(source = "createdAt", target = "createdAt", defaultExpression = "java(java.time.OffsetDateTime.now())")
	Workout fromInput(WorkoutInput input);

	WorkoutDTO toResponse(Workout workout);

	List<WorkoutSummaryDTO> toSummaryCollectionResponse(List<Workout> workouts);

	void update(UpdateWorkoutInput input, @MappingTarget Workout workout);
}
