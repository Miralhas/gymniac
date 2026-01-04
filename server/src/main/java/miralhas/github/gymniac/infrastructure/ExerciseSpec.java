package miralhas.github.gymniac.infrastructure;

import lombok.experimental.UtilityClass;
import miralhas.github.gymniac.domain.model.Exercise;
import org.springframework.data.jpa.domain.Specification;

import static org.springframework.util.StringUtils.hasText;

@UtilityClass
public class ExerciseSpec {

	public static Specification<Exercise> nameContains(String q) {
		return (root, query, builder) -> {
			if (!hasText(q)) return null;
			return builder.or(
					builder.like(builder.lower(root.get("name")), "%" + q.toLowerCase() + "%")
			);
		};
	}

	public static Specification<Exercise> muscleGroupIs(String muscleGroup) {
		return (root, query, builder) -> {
			if (!hasText(muscleGroup)) return null;
			var muscleGroupJoin = root.join("muscleGroup");
			var predicate = muscleGroupJoin.get("slug");
			return builder.equal(predicate, muscleGroup);
		};
	}

}
