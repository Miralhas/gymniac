package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Long> {
}