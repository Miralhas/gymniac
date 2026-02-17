package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.MealDTO;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.filter.MealFilter;
import miralhas.github.gymniac.api.dto.input.MealInput;
import miralhas.github.gymniac.api.dto_mapper.MealMapper;
import miralhas.github.gymniac.domain.exception.MealNotFoundException;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import miralhas.github.gymniac.domain.repository.MacronutrientRepository;
import miralhas.github.gymniac.domain.repository.MealRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MealService {

	private final MealRepository mealRepository;
	private final MealMapper mealMapper;
	private final ErrorMessages errorMessages;
	private final MacronutrientRepository macronutrientRepository;
	private final AuthUtils authUtils;

	public Meal findMealByIdOrException(Long id) {
		return mealRepository.findById(id).orElseThrow(
				() -> new MealNotFoundException(errorMessages.get("meal.notFound.id", id))
		);
	}

	public PageDTO<MealDTO> findAll(Pageable pageable, MealFilter filter) {
		var user = authUtils.getCurrentUser();
		var mealsPage = mealRepository.findAll(filter.toSpecification(user.getEmail()), pageable);
		List<MealDTO> mealDTOS = mealMapper.toCollectionResponse(mealsPage.getContent());
		var pageImpl = new PageImpl<>(mealDTOS, pageable, mealsPage.getTotalElements());
		return new PageDTO<>(pageImpl);
	}

	@Transactional
	public MealDTO create(MealInput input) {
		var user = authUtils.getCurrentUser();
		final var meal = mealMapper.fromInput(input);

		meal.setUser(user);
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
