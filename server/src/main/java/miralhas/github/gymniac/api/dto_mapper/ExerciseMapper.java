package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.ExerciseDTO;
import miralhas.github.gymniac.api.dto.input.ExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseInput;
import miralhas.github.gymniac.domain.model.workout_plan.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {MuscleGroupMapper.class, UserMapper.class}
)
public interface ExerciseMapper {

	@Mapping(target = "muscleGroup", ignore = true)
	Exercise fromInput(ExerciseInput input);

	ExerciseDTO toResponse(Exercise exercise);

	List<ExerciseDTO> toCollectionResponse(List<Exercise> exercises);

	@Mapping(target = "muscleGroup", ignore = true)
	void update(UpdateExerciseInput input, @MappingTarget Exercise exercise);
}
