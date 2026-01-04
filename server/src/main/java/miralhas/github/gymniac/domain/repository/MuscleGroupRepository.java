package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MuscleGroupRepository extends JpaRepository<MuscleGroup, Long> {

	@Query("SELECT mg from MuscleGroup mg where mg.slug = :slug")
	Optional<MuscleGroup> findBySlug(String slug);

	@Query("SELECT CASE WHEN COUNT(mg) > 0 THEN true ELSE false END FROM MuscleGroup mg WHERE mg.slug = :slug")
	boolean checkIfSlugAlreadyExists(String slug);
}