package miralhas.github.gymniac.api.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.UUID;

public record RefreshTokenInput(
		@UUID
		@NotBlank
		String refreshToken
) {
}
