package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.meal_tracker.Macronutrient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MacronutrientRepository extends JpaRepository<Macronutrient, Long> {
}