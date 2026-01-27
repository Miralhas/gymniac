package miralhas.github.gymniac.api.dto.input;

import org.hibernate.validator.constraints.URL;

public record ProfilePictureInput(
		@URL
		String profilePicture
) {
}
