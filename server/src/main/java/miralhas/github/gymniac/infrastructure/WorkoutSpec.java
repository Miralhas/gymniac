package miralhas.github.gymniac.infrastructure;

import lombok.experimental.UtilityClass;
import miralhas.github.gymniac.domain.model.workout.Workout;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.time.OffsetDateTime;
import java.util.Objects;

import static org.springframework.util.StringUtils.*;

@UtilityClass
public class WorkoutSpec {

	public static Specification<Workout> fromDate(OffsetDateTime date) {
		return (root, query, builder) -> {
			if (Objects.isNull(date)) return null;
			return builder.greaterThanOrEqualTo(root.get("createdAt"), date);
		};
	}

	public static Specification<Workout> toDate(OffsetDateTime date) {
		return (root, query, builder) -> {
			if (Objects.isNull(date)) return null;
			return builder.lessThanOrEqualTo(root.get("createdAt"), date);
		};
	}

	public static Specification<Workout> withEmail(String email) {
		return (root, query, builder) -> {
			if (!hasText(email)) return null;
			var userJoin = root.join("user");
			var predicate = builder.lower(userJoin.get("email"));
			return builder.equal(predicate, email.toLowerCase());
		};
	}
}
