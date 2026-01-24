package miralhas.github.gymniac.api.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record UserDTO(
		Long id,
		String username,
		String email,
		String profilePicture,
		List<String> roles
) implements Serializable {
	@Serial
	private static final long serialVersionUID = 1L;
}
