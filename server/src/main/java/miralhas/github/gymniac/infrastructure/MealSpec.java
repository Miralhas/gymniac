package miralhas.github.gymniac.infrastructure;

import lombok.experimental.UtilityClass;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import org.springframework.data.jpa.domain.Specification;

import java.time.OffsetDateTime;
import java.util.Objects;

import static org.springframework.util.StringUtils.hasText;

@UtilityClass
public class MealSpec {

	public static Specification<Meal> fromDate(OffsetDateTime date) {
		return (root, query, builder) -> {
			if (Objects.isNull(date)) return null;
			return builder.greaterThanOrEqualTo(root.get("createdAt"), date);
		};
	}

	public static Specification<Meal> toDate(OffsetDateTime date) {
		return (root, query, builder) -> {
			if (Objects.isNull(date)) return null;
			return builder.lessThanOrEqualTo(root.get("createdAt"), date);
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
