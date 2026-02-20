package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.DailyMacrosDTO;
import miralhas.github.gymniac.api.dto.MealDTO;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.filter.MealFilter;
import miralhas.github.gymniac.api.dto.input.MealInput;
import miralhas.github.gymniac.api.dto_mapper.MealMapper;
import miralhas.github.gymniac.domain.exception.MealNotFoundException;
import miralhas.github.gymniac.domain.model.meal_tracker.Macronutrient;
import miralhas.github.gymniac.domain.model.meal_tracker.Meal;
import miralhas.github.gymniac.domain.model.meal_tracker.enums.NutrientType;
import miralhas.github.gymniac.domain.repository.MacronutrientRepository;
import miralhas.github.gymniac.domain.repository.MealRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

	public DailyMacrosDTO findUserDailyMacros(LocalDate from, ZoneId zoneId) {
		var user = authUtils.getCurrentUser();

		ZonedDateTime startOfDay = from.atStartOfDay(zoneId);
		ZonedDateTime nextDayStart = startOfDay.plusDays(1);
		var startOffset = startOfDay.toOffsetDateTime();
		var endOffset = nextDayStart.toOffsetDateTime();

		var macros = macronutrientRepository.getMacros(user.getEmail(), startOffset, endOffset);

		var kcalTotal = macros.stream().map(m -> m.getMeal().getKcal()).reduce((double) 0, Double::sum);
		var mealsTotal = macros.stream().map(Macronutrient::getMeal).collect(Collectors.toSet()).size();

		var proteinTotal = macros.stream().filter(m -> m.getNutrient() == NutrientType.PROTEIN)
				.map(Macronutrient::getGrams).reduce((double) 0, Double::sum);

		var fatTotal = macros.stream().filter(m -> m.getNutrient() == NutrientType.FAT)
				.map(Macronutrient::getGrams).reduce((double) 0, Double::sum);

		var carbTotal = macros.stream().filter(m -> m.getNutrient() == NutrientType.CARBOHYDRATE)
				.map(Macronutrient::getGrams).reduce((double) 0, Double::sum);

		return new DailyMacrosDTO(mealsTotal, kcalTotal, proteinTotal, fatTotal, carbTotal);
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
