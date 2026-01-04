package miralhas.github.gymniac.api.dto.filter;

import miralhas.github.gymniac.domain.model.Exercise;
import org.springframework.data.jpa.domain.Specification;

import static miralhas.github.gymniac.infrastructure.ExerciseSpec.muscleGroupIs;
import static miralhas.github.gymniac.infrastructure.ExerciseSpec.nameContains;

public record ExerciseFilter(String muscleGroup, String q) {

	public Specification<Exercise> toSpecification() {
		return nameContains(q).and(muscleGroupIs(muscleGroup));
	}
}
