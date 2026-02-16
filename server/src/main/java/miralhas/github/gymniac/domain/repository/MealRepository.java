package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MealRepository extends JpaRepository<Meal, Long> {
	@Modifying
	@Query("DELETE Macronutrient m where m.meal.id = :mealId")
	void deleteAllMacros(Long mealId);
}