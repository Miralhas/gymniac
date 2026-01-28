package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record UserInfoDTO(
		Long id,
		OffsetDateTime createdAt,
		String email,
		String username,
		String mode,
		String profilePicture,
		Double weightGoal,
		Double currentWeight,
		Integer totalWorkouts,
		OffsetDateTime lastActivity
) {
}
