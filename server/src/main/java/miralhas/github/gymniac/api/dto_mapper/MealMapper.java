package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.MealDTO;
import miralhas.github.gymniac.api.dto.input.MealInput;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
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
		uses = {NutrientMapper.class}
)
public interface MealMapper {

	Meal fromInput(MealInput input);

	MealDTO toResponse(Meal meal);

	List<MealDTO> toCollectionResponse(List<Meal> meals);

//	@Mapping(target = "macros", ignore = true)
	void update(MealInput input, @MappingTarget Meal meal);

}
