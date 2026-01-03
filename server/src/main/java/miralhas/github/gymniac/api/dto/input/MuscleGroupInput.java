package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MuscleGroupInput(
		@NotBlank
		@Size(max = 254)
		String name
) {
}
