package miralhas.github.gymniac.api.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record WorkoutDTO(
		Long id,
		String uuidKey,
		OffsetDateTime createdAt,
		OffsetDateTime updatedAt,
		List<WorkoutExerciseDTO> exercises,
		String note
) {
}
