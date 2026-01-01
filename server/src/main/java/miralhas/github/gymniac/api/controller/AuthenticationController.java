package miralhas.github.gymniac.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.AuthenticationDTO;
import miralhas.github.gymniac.api.dto.RefreshTokenInput;
import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto.input.CreateUserInput;
import miralhas.github.gymniac.api.dto.input.SigninInput;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.config.properties.TokenProperties;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.service.AuthenticationService;
import miralhas.github.gymniac.domain.service.RefreshTokenService;
import miralhas.github.gymniac.domain.service.TokenService;
import miralhas.github.gymniac.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

	private final TokenProperties tokenProperties;

	private final UserMapper userMapper;
	private final UserService userService;
	private final AuthenticationService authenticationService;
	private final RefreshTokenService refreshTokenService;
	private final TokenService tokenService;
//	private final PasswordResetService passwordResetService;

	@PostMapping("/signup")
	@ResponseStatus(HttpStatus.CREATED)
	public UserDTO signUp(@RequestBody @Valid CreateUserInput createUserInput) {
		User user = userMapper.fromInput(createUserInput);
		user = userService.create(user);
		return userMapper.toResponse(user);
	}

	@PostMapping("/signin")
	@ResponseStatus(HttpStatus.OK)
	public AuthenticationDTO signIn(@RequestBody @Valid SigninInput signinInput) {
		return authenticationService.authenticate(signinInput);
	}

//	@PutMapping("/forgot-password")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void createPasswordResetToken(@RequestBody @Valid ForgotPasswordInput forgotPasswordInput) {
//		passwordResetService.createOrUpdateToken(forgotPasswordInput.email());
//	}


//	@PutMapping("/reset-password/{token}")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void resetPassword(
//			@PathVariable String token,
//			@RequestBody @Valid ChangePasswordInput changePasswordInput
//	) {
//		passwordResetService.resetPassword(token, changePasswordInput);
//	}

	@PostMapping("/refresh-token")
	@ResponseStatus(HttpStatus.OK)
	public AuthenticationDTO refreshToken(@RequestBody @Valid RefreshTokenInput refreshTokenInput) {
		var refreshToken = refreshTokenService.validateRefreshToken(refreshTokenInput.refreshToken());
		var user = userService.findUserByEmailOrException(refreshToken.getUser().getEmail());
		var newAccessToken = tokenService.generateToken(user);
		var newRefreshToken = refreshTokenService.update(refreshToken, user);
		return new AuthenticationDTO(
				newAccessToken.getTokenValue(),
				newRefreshToken.getId().toString(),
				tokenProperties.accessToken().expirationTime(),
				tokenProperties.refreshToken().expirationTime()
		);
	}

}