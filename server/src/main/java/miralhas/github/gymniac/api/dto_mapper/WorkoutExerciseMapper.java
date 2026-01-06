package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.WorkoutExerciseDTO;
import miralhas.github.gymniac.api.dto.input.UpdateWorkoutExerciseInput;
import miralhas.github.gymniac.api.dto.input.WorkoutExerciseInput;
import miralhas.github.gymniac.domain.model.workout.WorkoutExercise;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {ExerciseMapper.class, ExerciseSetMapper.class}
)
public interface WorkoutExerciseMapper {

//	@Mapping(target = "sets", ignore = true)
	WorkoutExercise fromInput(WorkoutExerciseInput input);

	WorkoutExerciseDTO toResponse(WorkoutExercise workoutExercise);

	List<WorkoutExerciseDTO> toCollectionResponse(List<WorkoutExercise> workoutExercises);

	void update(UpdateWorkoutExerciseInput input, @MappingTarget WorkoutExercise workoutExercise);
}
