package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
}