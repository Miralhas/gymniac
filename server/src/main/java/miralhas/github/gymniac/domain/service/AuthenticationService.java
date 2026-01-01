package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto.AuthenticationDTO;
import miralhas.github.gymniac.api.dto.input.SigninInput;
import miralhas.github.gymniac.config.properties.TokenProperties;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.security.SecurityUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthenticationService {

	private final TokenProperties tokenProperties;
	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;
	private final RefreshTokenService refreshTokenService;

	@Transactional
	public AuthenticationDTO authenticate(SigninInput signinInput) {
		var authenticationToken = new UsernamePasswordAuthenticationToken(signinInput.email(), signinInput.password());
		var authenticationResult = authenticationManager.authenticate(authenticationToken);
		var user = ((SecurityUser) authenticationResult.getPrincipal()).getUser();
		SecurityContextHolder.getContext().setAuthentication(authenticationResult);
		return generateTokens(user);
	}

	@Transactional
	public AuthenticationDTO generateTokens(User user) {
		var jwt = tokenService.generateToken(user);
		var refreshToken = refreshTokenService.save(user);
		return new AuthenticationDTO(
				jwt.getTokenValue(),
				refreshToken.getId().toString(),
				tokenProperties.accessToken().expirationTime(),
				tokenProperties.refreshToken().expirationTime()
		);
	}

}
