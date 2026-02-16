package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record MealDTO(
		Long id,
		String name,
		Double kcal,
		List<MacronutrientDTO> macros,
		OffsetDateTime createdAt
) {
}
