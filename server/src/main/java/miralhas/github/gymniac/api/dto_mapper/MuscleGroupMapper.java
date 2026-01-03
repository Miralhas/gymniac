package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.MuscleGroupDTO;
import miralhas.github.gymniac.domain.model.MuscleGroup;
import org.mapstruct.Mapper;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public interface MuscleGroupMapper {
	MuscleGroupDTO toResponse(MuscleGroup muscleGroup);
}
