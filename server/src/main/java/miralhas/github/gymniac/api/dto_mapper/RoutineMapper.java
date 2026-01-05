package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.RoutineDTO;
import miralhas.github.gymniac.api.dto.RoutineSummaryDTO;
import miralhas.github.gymniac.api.dto.input.RoutineInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineInput;
import miralhas.github.gymniac.domain.model.workout_plan.Routine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {RoutineExerciseMapper.class}
)
public interface RoutineMapper {
	Routine fromInput(RoutineInput input);

	@Mapping(target = "exercises", source = "routineExercises")
	RoutineDTO toResponse(Routine routine);

//	@Mapping(target = "exercises", source = "routineExercises")
	RoutineSummaryDTO toSummaryResponse(Routine routine);

	void update(UpdateRoutineInput input, @MappingTarget Routine routine);
}
