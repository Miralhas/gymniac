package miralhas.github.gymniac.api.dto.filter;

import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;

import static miralhas.github.gymniac.infrastructure.MealSpec.fromDate;
import static miralhas.github.gymniac.infrastructure.MealSpec.withEmail;

public record MealFilter(
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
		LocalDate from,

		ZoneId zoneId
) {
	public Specification<Meal> toSpecification(String email) {
		return fromDate(from, zoneId).and(withEmail(email));
	}
}
