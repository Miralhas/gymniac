package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.SetDTO;
import miralhas.github.gymniac.api.dto.input.ExerciseSetInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseSet;
import miralhas.github.gymniac.domain.model.workout.ExerciseSet;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public interface ExerciseSetMapper {

	ExerciseSet fromInput(ExerciseSetInput input);

	SetDTO toResponse(ExerciseSet exerciseSet);

	List<SetDTO> toCollectionResponse(List<ExerciseSet> exerciseSets);

	void updateWithSetId(UpdateExerciseSet input, @MappingTarget ExerciseSet exerciseSet);
	void update(ExerciseSetInput input, @MappingTarget ExerciseSet exerciseSet);
}
