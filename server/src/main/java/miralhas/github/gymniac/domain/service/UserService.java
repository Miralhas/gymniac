package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto.input.ProfilePictureInput;
import miralhas.github.gymniac.api.dto.input.UpdateUserInput;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.domain.exception.ImageNotFoundException;
import miralhas.github.gymniac.domain.exception.UserAlreadyExistsException;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.repository.UserRepository;
import miralhas.github.gymniac.domain.utils.AuthUtils;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	private final UserRepository userRepository;
	private final ErrorMessages errorMessages;
	private final PasswordEncoder passwordEncoder;
	private final UserMapper userMapper;
	private final RoleService roleService;
	private final AuthUtils authUtils;

	public User findUserByIdOrException(Long id) {
		return userRepository.findById(id).orElseThrow(() -> {
			var message = errorMessages.get("user.id.notFound", id);
			return new UsernameNotFoundException(message);
		});
	}

	public User findUserByEmailOrException(String email) {
		return userRepository.findUserByEmail(email).orElseThrow(() -> {
			var message = errorMessages.get("user.email.notFound", email);
			return new UsernameNotFoundException(message);
		});
	}

	public String getUserProfilePicture(Long id) {
		var user = findUserByIdOrException(id);
		if (!user.hasImage()) throw new ImageNotFoundException(
				errorMessages.get("user.profilePicture.notFound", user.getEmail())
		);
		return user.getProfilePicture();
	}

	@Transactional
	public User create(User user) {
		checkIfUsernameOrEmailAreAvailiable(user);
		var userRole = roleService.getUserRole();
		user.setRoles(Set.of(userRole));
		if (Objects.nonNull(user.getPassword())) user.setPassword(passwordEncoder.encode(user.getPassword()));
		user = userRepository.save(user);
		return user;
	}

	@Transactional
	public User update(UpdateUserInput updateUserInput, User user) {
		checkIfCanUpdateUsername(updateUserInput.username(), user);
		userMapper.update(updateUserInput, user);
		if (Objects.nonNull(updateUserInput.password())) user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Transactional
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	private void checkIfCanUpdateUsername(String username, User user) {
		userRepository.findUserByUsername(username).ifPresent(u -> {
			if (!u.getUsername().equals(user.getUsername())) {
				throw new UserAlreadyExistsException(errorMessages.get("user.alreadyExists.username", username));
			}
		});
	}

	private void checkIfUsernameOrEmailAreAvailiable(User user) {
		Map<String, String> errors = new HashMap<>();

		userRepository.findUserByEmail(user.getEmail())
				.ifPresent(u -> errors.put(
						"email", errorMessages.get("user.alreadyExists.email", u.getEmail())
				));
		userRepository.findUserByUsername(user.getUsername())
				.ifPresent(u -> errors.put(
						"username", errorMessages.get("user.alreadyExists.username", u.getUsername())
				));

		if (!errors.isEmpty()) {
			var message = errorMessages.get("user.alreadyExists");
			throw new UserAlreadyExistsException(message, errors);
		}
	}

	@Transactional
	public UserDTO changeProfilePicture(ProfilePictureInput input) {
		var user = authUtils.getCurrentUser();
		user.setProfilePicture(input.profilePicture());
		return userMapper.toResponse(userRepository.save(user));
	}
}
