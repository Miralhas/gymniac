package miralhas.github.gymniac.api.dto.input;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import miralhas.github.gymniac.config.validation.EnumPattern;
import miralhas.github.gymniac.domain.model.workout_plan.enums.DaysOfTheWeek;

import java.util.List;

public record RoutineInput(
		@NotBlank
		String name,

		@NotBlank
		@EnumPattern(enumClass = DaysOfTheWeek.class)
		String desirableDayOfWeek,

		@Valid
		@Size(min = 1)
		List<RoutineExerciseInput> exercises,

		String note
) {
}
