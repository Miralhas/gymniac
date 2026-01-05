package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout_plan.WorkoutPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {

	@EntityGraph(attributePaths = {
			"routines",
			"user",
	})
	Page<WorkoutPlan> findAll(Pageable pageable);

	@EntityGraph(attributePaths = {
			"routines",
			"user",
	})
	@Query("FROM WorkoutPlan wp WHERE wp.slug = :slug")
	Optional<WorkoutPlan> findBySlug(String slug);

	@Query("SELECT CASE WHEN COUNT(wp) > 0 THEN true ELSE false END FROM WorkoutPlan wp WHERE wp.slug = :slug")
	boolean checkIfSlugAlreadyExists(String slug);
}