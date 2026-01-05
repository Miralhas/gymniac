package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout_plan.Routine;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {

	@EntityGraph(attributePaths = {
			"routineExercises",
			"routineExercises.exercise",
			"routineExercises.exercise.muscleGroup",
			"routineExercises.exercise.submitter",
			"workoutPlan"
	})
	@Query("FROM Routine r WHERE r.workoutPlan.slug = :slug")
	List<Routine> findRoutinesByWorkoutPlanSlug(String slug);
}