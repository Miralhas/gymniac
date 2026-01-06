package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.workout.Workout;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

	@Override
	Optional<Workout> findById(Long id);
}