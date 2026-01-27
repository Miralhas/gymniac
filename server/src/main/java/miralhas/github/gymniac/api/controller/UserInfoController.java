package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.PageDTO;
import miralhas.github.gymniac.api.dto.WeightDTO;
import miralhas.github.gymniac.api.dto.input.WeightInput;
import miralhas.github.gymniac.domain.service.UserInfoService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/infos")
public class UserInfoController {

	private final UserInfoService userInfoService;

	@GetMapping
	@PreAuthorize("hasRole('USER')")
	public void getInfo() {
		userInfoService.getUserInfo();
	}

	@GetMapping("/weights")
	@PreAuthorize("hasRole('USER')")
	public PageDTO<WeightDTO> getAllWeights(
			@PageableDefault(size = 10, sort = {"createdAt", "id"}, direction = Sort.Direction.DESC) Pageable pageable
	) {
		return userInfoService.getAllWeights(pageable);
	}

	@PostMapping("/weights")
	public WeightDTO saveWeight(@RequestBody @Valid WeightInput weightInput) {
		return userInfoService.saveWeight(weightInput);
	}

	@PutMapping("/weights/{id}")
	public WeightDTO updateWeight(@RequestBody @Valid WeightInput weightInput, @PathVariable Long id) {
		return userInfoService.updateWeight(weightInput, userInfoService.findWeightByIdOrException(id));
	}

	@DeleteMapping("/weights/{id}")
	public void deleteWeight(@PathVariable Long id) {
		userInfoService.deleteWeight(id);
	}
}
