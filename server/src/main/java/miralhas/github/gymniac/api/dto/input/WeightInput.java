package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record WeightInput(
		@Min(1)
		@NotNull
		Double kg
) {
}
