package miralhas.github.gymniac.api.dto;

public record ExerciseDTO(
		Long id,
		String name,
		String slug,
		String description,
		String videoHowTo,
		MuscleGroupDTO muscleGroup,
		UserDTO submitter
) {
}
