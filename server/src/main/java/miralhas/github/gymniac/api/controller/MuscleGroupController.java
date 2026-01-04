package miralhas.github.gymniac.api.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.MuscleGroupDTO;
import miralhas.github.gymniac.api.dto.input.MuscleGroupInput;
import miralhas.github.gymniac.api.dto_mapper.MuscleGroupMapper;
import miralhas.github.gymniac.domain.service.MuscleGroupService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/muscle-groups")
public class MuscleGroupController {

	private final MuscleGroupService muscleGroupService;
	private final MuscleGroupMapper muscleGroupMapper;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<MuscleGroupDTO> findAllMuscleGroups() {
		return muscleGroupMapper.toCollectionResponse(muscleGroupService.findAll());
	}

	@GetMapping("/{slug}")
	@ResponseStatus(HttpStatus.OK)
	public MuscleGroupDTO findMuscleGroupBySlug(@PathVariable String slug) {
		return muscleGroupMapper.toResponse(muscleGroupService.findBySlug(slug));
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public MuscleGroupDTO createMuscleGroup(@RequestBody @Valid MuscleGroupInput input) {
		return muscleGroupMapper.toResponse(muscleGroupService.save(input));
	}

	@PatchMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public MuscleGroupDTO updateMuscleGroup(@RequestBody @Valid MuscleGroupInput input, @PathVariable Long id) {
		var muscleGroup = muscleGroupService.findById(id);
		return muscleGroupMapper.toResponse(muscleGroupService.update(input, muscleGroup));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteMuscleGroup(@PathVariable Long id) {
		muscleGroupService.delete(id);
	}



}
