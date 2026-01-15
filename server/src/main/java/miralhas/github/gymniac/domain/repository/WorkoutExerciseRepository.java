package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {

	@Modifying
	@Query("DELETE ExerciseSet es where es.workoutExercise.id = :workoutExerciseId")
	void deleteAllSets(Long workoutExerciseId);
}