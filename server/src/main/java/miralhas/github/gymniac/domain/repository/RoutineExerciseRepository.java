package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout_plan.RoutineExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoutineExerciseRepository extends JpaRepository<RoutineExercise, Long> {
}