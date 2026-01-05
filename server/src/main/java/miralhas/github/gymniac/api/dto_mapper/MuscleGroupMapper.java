package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.MuscleGroupDTO;
import miralhas.github.gymniac.api.dto.input.MuscleGroupInput;
import miralhas.github.gymniac.domain.model.workout_plan.MuscleGroup;
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
public interface MuscleGroupMapper {
	MuscleGroup fromInput(MuscleGroupInput input);
	MuscleGroupDTO toResponse(MuscleGroup muscleGroup);
	List<MuscleGroupDTO> toCollectionResponse(List<MuscleGroup> muscleGroups);
	void update(MuscleGroupInput input, @MappingTarget MuscleGroup muscleGroup);

}
