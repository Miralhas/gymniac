package miralhas.github.gymniac.api.dto.input;

import miralhas.github.gymniac.config.validation.EnumPattern;
import miralhas.github.gymniac.domain.model.workout_plan.enums.DaysOfTheWeek;

public record UpdateRoutineInput(
		String name,

		@EnumPattern(enumClass = DaysOfTheWeek.class)
		String desirableDayOfWeek,

		String note
) {
}
