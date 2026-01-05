package miralhas.github.gymniac.api.dto;

import java.io.Serial;
import java.io.Serializable;

public record UserSummaryDTO(
		Long id,
		String username,
		String email
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
