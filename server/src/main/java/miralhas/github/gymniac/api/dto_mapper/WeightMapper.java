package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.WeightDTO;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import org.mapstruct.Mapper;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public interface WeightMapper {
	WeightDTO toResponse(Weight weight);
}
