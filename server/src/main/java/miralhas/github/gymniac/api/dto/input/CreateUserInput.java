package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserInput (
		@Email
		@NotBlank
		String email,

		@NotBlank
		@Size(min = 3, max = 20)
		@Pattern(regexp = "^[a-zA-Z0-9_]*$")
		String username,

		@NotBlank
		@Size(min = 3)
		String password
) {}
