package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;

public record ExerciseDTO(
		Long id,
		String name,
		String slug,
		String description,
		String videoHowTo,
		OffsetDateTime createdAt,
		OffsetDateTime updatedAt,
		MuscleGroupDTO muscleGroup,
		UserSummaryDTO submitter
) {
}
