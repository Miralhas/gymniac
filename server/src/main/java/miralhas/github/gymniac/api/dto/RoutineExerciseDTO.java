package miralhas.github.gymniac.api.dto;

public record RoutineExerciseDTO(
		Long id,
		ExerciseDTO exercise,
		Long desirableSets,
		Long desirableReps
) {
}
