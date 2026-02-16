package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.MacronutrientDTO;
import miralhas.github.gymniac.api.dto.input.MacronutrientInput;
import miralhas.github.gymniac.domain.model.meal_tracker.Macronutrient;
import org.mapstruct.Mapper;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public interface NutrientMapper {

	Macronutrient fromInput(MacronutrientInput input);

	MacronutrientDTO toResponse(Macronutrient macronutrient);

}
