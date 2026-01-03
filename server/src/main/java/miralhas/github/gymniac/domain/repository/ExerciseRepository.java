package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

	@Query("SELECT e from Exercise e " +
			"LEFT JOIN FETCH e.muscleGroup mg " +
			"LEFT JOIN FETCH e.submitter s " +
			"LEFT JOIN FETCH s.roles"
	)
	List<Exercise> findAll();

	@Query("SELECT e from Exercise e where e.slug = :slug")
	Optional<Exercise> findBySlug(String slug);

	@Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Exercise e WHERE e.slug = :slug")
	boolean checkIfSlugAlreadyExists(String slug);
}