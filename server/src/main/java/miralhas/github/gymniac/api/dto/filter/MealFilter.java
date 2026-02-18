package miralhas.github.gymniac.api.dto.filter;

import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;

import static miralhas.github.gymniac.infrastructure.MealSpec.*;

public record MealFilter(
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
		OffsetDateTime from
) {
	public Specification<Meal> toSpecification(String email) {
		return fromDate(from).and(withEmail(email));
	}
}
