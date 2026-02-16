package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import miralhas.github.gymniac.config.validation.EnumPattern;
import miralhas.github.gymniac.domain.model.meal_tracker.enums.NutrientType;

public record MacronutrientInput(
		@NotBlank
		@EnumPattern(enumClass = NutrientType.class)
		String nutrient,

		@Min(1)
		@NotNull
		Double grams
) {
}
