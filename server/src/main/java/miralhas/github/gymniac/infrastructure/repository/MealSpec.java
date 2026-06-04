package miralhas.github.gymniac.infrastructure.repository;

import lombok.experimental.UtilityClass;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.springframework.util.StringUtils.hasText;

@UtilityClass
public class MealSpec {

	public static Specification<Meal> fromDate(LocalDate date, ZoneId userZone) {
		return (root, query, builder) -> {
			if (date == null || userZone == null) return null;

			ZonedDateTime startOfDay = date.atStartOfDay(userZone);
			ZonedDateTime nextDayStart = startOfDay.plusDays(1);

			return builder.and(
					builder.greaterThanOrEqualTo(
							root.get("createdAt"),
							startOfDay.toOffsetDateTime()
					),
					builder.lessThan(
							root.get("createdAt"),
							nextDayStart.toOffsetDateTime()
					)
			);
		};
	}

	public static Specification<Meal> withEmail(String email) {
		return (root, query, builder) -> {
			if (!hasText(email)) return null;
			var userJoin = root.join("user");
			var predicate = builder.lower(userJoin.get("email"));
			return builder.equal(predicate, email.toLowerCase());
		};
	}

}
