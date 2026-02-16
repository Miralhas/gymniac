package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.MealDTO;
import miralhas.github.gymniac.api.dto.input.MealInput;
import miralhas.github.gymniac.api.dto_mapper.MealMapper;
import miralhas.github.gymniac.domain.exception.MealNotFoundException;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import miralhas.github.gymniac.domain.repository.MacronutrientRepository;
import miralhas.github.gymniac.domain.repository.MealRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MealService {

	private final MealRepository mealRepository;
	private final MealMapper mealMapper;
	private final ErrorMessages errorMessages;
	private final MacronutrientRepository macronutrientRepository;

	public Meal findMealByIdOrException(Long id) {
		return mealRepository.findById(id).orElseThrow(
				() -> new MealNotFoundException(errorMessages.get("meal.notFound.id", id))
		);
	}

	@Transactional
	public MealDTO create(MealInput input) {
		final var meal = mealMapper.fromInput(input);
		meal.setMacros(meal.getMacros().stream().peek(m -> m.setMeal(meal)).toList());
		var mealSaved = mealRepository.save(meal);
		return mealMapper.toResponse(mealSaved);
	}

	@Transactional
	public MealDTO update(final Meal meal, MealInput input) {
		mealRepository.deleteAllMacros(meal.getId());
		mealRepository.flush();

		mealMapper.update(input, meal);

		var mealSaved = mealRepository.save(meal);

		var macros = meal.getMacros().stream().peek(m -> m.setMeal(meal)).toList();
		macronutrientRepository.saveAll(macros);

		return mealMapper.toResponse(mealSaved);
	}

	@Transactional
	public void delete(Long id) {
		mealRepository.deleteById(id);
	}
}
