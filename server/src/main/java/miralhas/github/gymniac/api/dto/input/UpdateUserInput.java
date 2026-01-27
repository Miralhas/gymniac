package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.With;
import miralhas.github.gymniac.config.validation.EnumPattern;
import miralhas.github.gymniac.domain.model.auth.enums.Mode;

@With
public record UpdateUserInput(
		@Size(min = 3, max = 20)
		@Pattern(regexp = "^[a-zA-Z0-9_]*$")
		String username,

		@Size(min = 3)
		String password,

		@EnumPattern(enumClass = Mode.class)
		String mode,

		@Min(1)
		Double weightGoal
) {
}