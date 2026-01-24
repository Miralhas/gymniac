package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.WeightDTO;
import miralhas.github.gymniac.api.dto.input.WeightInput;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import miralhas.github.gymniac.domain.service.UserInfoService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/infos")
public class UserInfoController {


	private final UserInfoService userInfoService;

	@GetMapping("/weights")
	@PreAuthorize("hasRole('USER')")
	public List<WeightDTO> getAllWeights() {
		return userInfoService.getAllWeights();
	}

	@PostMapping("/weights")
	public WeightDTO saveWeight(@RequestBody @Valid WeightInput weightInput) {
		return userInfoService.saveWeight(weightInput);
	}

	@DeleteMapping("/weights/{id}")
	public void deleteWeight(@PathVariable Long id) {
		userInfoService.deleteWeight(id);
	}
}
