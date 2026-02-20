package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.meal_tracker.Macronutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.OffsetDateTime;
import java.util.List;

public interface MacronutrientRepository extends JpaRepository<Macronutrient, Long> {

	@Query("SELECT mc FROM Macronutrient mc "
			+ "JOIN FETCH mc.meal m "
			+ "JOIN FETCH m.user u "
			+ "WHERE u.email = :email "
			+ "AND m.createdAt >= :start "
			+ "AND m.createdAt < :end")
	List<Macronutrient> getMacros(String email, OffsetDateTime start, OffsetDateTime end);
}