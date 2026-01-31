package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto.input.ProfilePictureInput;
import miralhas.github.gymniac.api.dto.input.UpdateUserInput;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.repository.UserRepository;
import miralhas.github.gymniac.domain.service.UserService;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController  {

	private final UserService userService;
	private final UserMapper userMapper;
	private final AuthUtils authUtils;
	private final UserRepository userRepository;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserDTO> findAllUsers() {
		return userRepository.findAll().stream().map(userMapper::toResponse).toList();
	}


	@PatchMapping
	@ResponseStatus(HttpStatus.OK)
	public void updateUser(@RequestBody @Valid UpdateUserInput input) {
		var user = authUtils.getCurrentUser();
		userService.update(input, user);
	}

	@GetMapping("/validate")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('USER')")
	public UserDTO verifyUserAccessToken(JwtAuthenticationToken authToken) {
		User user = userService.findUserByEmailOrException(authToken.getName());
		return userMapper.toResponse(user);
	}

	@PutMapping("/pfp")
	@ResponseStatus(HttpStatus.OK)
	public UserDTO changeProfilePicture(@RequestBody @Valid ProfilePictureInput input) {
		return userService.changeProfilePicture(input);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteUser(@PathVariable Long id) {
		var user = userService.findUserByIdOrException(id);
		userService.deleteUser(user);
	}

	@DeleteMapping("/{id}/workouts")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteUserWorkouts(@PathVariable Long id) {
		var user = userService.findUserByIdOrException(id);
		userService.deleteUserWorkouts(user);
	}

	@GetMapping("/{id}/pfp")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Void> getUserProfilePicture(@PathVariable Long id) {
		String pfp = userService.getUserProfilePicture(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(URI.create(pfp));
		return new ResponseEntity<>(headers, HttpStatus.FOUND);
	}
}
