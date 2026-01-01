package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.With;

@With
public record UpdateUserInput(
		@Size(min = 3, max = 20)
		@Pattern(regexp = "^[a-zA-Z0-9_]*$")
		String username,

		@Size(min = 3)
		String password
) {
}