package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.MealDTO;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.filter.MealFilter;
import miralhas.github.gymniac.api.dto.input.MealInput;
import miralhas.github.gymniac.domain.service.MealService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meals")
public class MealController {

	private final MealService mealService;

	@GetMapping
	@PreAuthorize("hasRole('USER')")
	public PageDTO<MealDTO> findAllMeals(
			@PageableDefault(size = 10, sort = {"createdAt", "id"}, direction = Sort.Direction.DESC) Pageable pageable,
			@Valid MealFilter filter
	) {
		return mealService.findAll(pageable, filter);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public MealDTO createMeal(@RequestBody @Valid MealInput mealInput) {
		return mealService.create(mealInput);
	}

	@PutMapping("/{id}")
	public MealDTO updateMeal(@RequestBody @Valid MealInput mealInput, @PathVariable Long id) {
		var meal = mealService.findMealByIdOrException(id);
		return mealService.update(meal, mealInput);
	}

	@DeleteMapping("/{id}")
	public void deleteMeal(@PathVariable Long id) {
		mealService.delete(id);
	}
}
