package miralhas.github.gymniac.api.dto;

public record RoutineExerciseSummaryDTO(
		String exercise,
		Long desirableSets,
		Long desirableReps
) {
}
