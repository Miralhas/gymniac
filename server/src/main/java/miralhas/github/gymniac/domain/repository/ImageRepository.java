package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
	@Query("SELECT DISTINCT i from Image i where i.fileName = :name")
	Optional<Image> findByName(String name);
}