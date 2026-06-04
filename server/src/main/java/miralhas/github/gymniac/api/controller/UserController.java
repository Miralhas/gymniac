package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.ImageDTO;
import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto.input.ImageInput;
import miralhas.github.gymniac.api.dto.input.ProfilePictureInput;
import miralhas.github.gymniac.api.dto.input.UpdateUserInput;
import miralhas.github.gymniac.api.dto_mapper.ImageMapper;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.repository.UserRepository;
import miralhas.github.gymniac.domain.service.UserService;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController  {

	private final UserService userService;
	private final UserMapper userMapper;
	private final AuthUtils authUtils;
	private final UserRepository userRepository;
	private final ImageMapper imageMapper;

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserDTO> findAllUsers() {
		return userRepository.findAll().stream().map(userMapper::toResponse).toList();
	}

	@GetMapping("/{id}/images")
	@ResponseStatus(HttpStatus.OK)
	public List<ImageDTO> findAllImages(@PathVariable Long id) {
		var user = userService.findUserByIdOrException(id);
		return imageMapper.toResponseCollection(userService.findAllImages(user));
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

	@ResponseStatus(HttpStatus.OK)
	@PutMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ImageDTO saveImage(@PathVariable Long id, @Valid ImageInput imageInput) throws IOException {
		var user = userService.findUserByIdOrException(id);
		var image = imageMapper.fromInput(imageInput, user.getImageRelativePath()).getFirst();
		return imageMapper.toResponse(userService.saveImage(user, image));
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

}
