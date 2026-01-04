package miralhas.github.gymniac.api.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.ExerciseDTO;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.filter.ExerciseFilter;
import miralhas.github.gymniac.api.dto.input.ExerciseInput;
import miralhas.github.gymniac.api.dto.input.UpdateExerciseInput;
import miralhas.github.gymniac.api.dto_mapper.ExerciseMapper;
import miralhas.github.gymniac.domain.service.ExerciseService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercises")
public class ExerciseController {

	private final ExerciseMapper exerciseMapper;
	private final ExerciseService exerciseService;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public PageDTO<ExerciseDTO> getAllExercises(
			@PageableDefault(size = 10, sort = {"createdAt", "id"}, direction = Sort.Direction.DESC) Pageable pageable,
			ExerciseFilter filter
	) {
		return exerciseService.findAll(pageable, filter);
	}

	@GetMapping("/{slug}")
	@ResponseStatus(HttpStatus.OK)
	public ExerciseDTO getExercise(@PathVariable String slug) {
		return exerciseMapper.toResponse(exerciseService.findBySlugOrException(slug));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ExerciseDTO createExercise(@RequestBody @Valid ExerciseInput input) {
		return exerciseMapper.toResponse(exerciseService.save(input));
	}

	@PatchMapping("/{id}")
	public ExerciseDTO updateExercise(@RequestBody @Valid UpdateExerciseInput input, @PathVariable Long id) {
		var exercise = exerciseService.findByIdOrException(id);
		return exerciseMapper.toResponse(exerciseService.update(exercise, input));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteExercise(@PathVariable Long id) {
		exerciseService.delete(id);
	}
}
