package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.model.workout.Workout;
import miralhas.github.gymniac.domain.model.workout_plan.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, Long>, JpaSpecificationExecutor<Workout> {

	@Override
	Optional<Workout> findById(Long id);

	@Query("FROM Workout w where w.uuidKey = :uuid")
	Optional<Workout> findByUuid(UUID uuid);

	@Query("FROM Workout w WHERE w.user.email = :email")
	List<Workout> findAllByUserByEmail(String email);

	@Modifying
	@Query("DELETE FROM Workout w WHERE w.user.email = :email")
	void deleteUserWorkouts(String email);
}