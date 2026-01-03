package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long>, JpaSpecificationExecutor<Exercise> {

	@EntityGraph(attributePaths = {"muscleGroup", "submitter"})
	Page<Exercise> findAll(Specification<Exercise> spec, Pageable pageable);

	@Query("SELECT e from Exercise e where e.slug = :slug")
	Optional<Exercise> findBySlug(String slug);

	@Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Exercise e WHERE e.slug = :slug")
	boolean checkIfSlugAlreadyExists(String slug);
}