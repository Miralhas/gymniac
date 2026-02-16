package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record MealInput(
		@NotBlank
		String name,

		@Min(1)
		@NotNull
		Double kcal,

		@Valid
		@NotNull
		@Size(min = 1)
		List<MacronutrientInput> macros
) {
}
