package miralhas.github.gymniac.api.controller;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController  {

	private final UserService userService;
	private final UserMapper userMapper;

	@GetMapping("/validate")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('USER')")
	public UserDTO verifyUserAccessToken(JwtAuthenticationToken authToken) {
		User user = userService.findUserByEmailOrException(authToken.getName());
		return userMapper.toResponse(user);
	}

}
