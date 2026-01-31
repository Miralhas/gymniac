package miralhas.github.gymniac.api.dto.filter;

import miralhas.github.gymniac.domain.model.workout.Workout;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;

import static miralhas.github.gymniac.infrastructure.WorkoutSpec.*;

public record WorkoutFilter(
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
		OffsetDateTime from,

		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
		OffsetDateTime to
) {
	public Specification<Workout> toSpecification(String email) {
		return fromDate(from).and(toDate(to)).and(withEmail(email));
	}
}
