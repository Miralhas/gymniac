package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.RoutineExerciseDTO;
import miralhas.github.gymniac.api.dto.RoutineExerciseSummaryDTO;
import miralhas.github.gymniac.api.dto.input.RoutineExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineExerciseInput;
import miralhas.github.gymniac.domain.model.workout_plan.RoutineExercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {ExerciseMapper.class}
)
public interface RoutineExerciseMapper {

	@Mapping(target = "exercise", ignore = true)
	RoutineExercise fromInput(RoutineExerciseInput input);


	@Mapping(target = "exercise", source = "exercise.name")
	RoutineExerciseSummaryDTO toSummaryResponse(RoutineExercise routineExercise);

	RoutineExerciseDTO toResponse(RoutineExercise routineExercise);

	void update(UpdateRoutineExerciseInput input, @MappingTarget RoutineExercise routineExercise);
}
