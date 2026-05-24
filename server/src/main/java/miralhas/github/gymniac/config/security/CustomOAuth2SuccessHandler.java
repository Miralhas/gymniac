package miralhas.github.gymniac.config.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.service.AuthenticationService;
import miralhas.github.gymniac.domain.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

	@Value("${spring.profiles.active:default}")
	private String activeProfiles;

	@Value("${client.oauth2RedirectAfter}")
	private String oauth2RedirectAfter;

	@Value("${client.domain}")
	private String domain;

	private final UserService userService;
	private final AuthenticationService authenticationService;

	@Override
	@SneakyThrows
	public void onAuthenticationSuccess(
			HttpServletRequest request, HttpServletResponse response, Authentication authentication
	) throws IOException {
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		OAuth2User oauthPrincipal = oauthToken.getPrincipal();
		String email = oauthPrincipal.getAttribute("email");
		String username = oauthPrincipal.getAttribute("name");

		var isDev = Objects.equals(activeProfiles, "dev");

		var user = User.builder()
				.email(email)
				.username(username)
				.build();

		user = userService.findOrCreateNewUser(user);
		var authResponse = authenticationService.generateTokens(user);

		Cookie cookie = new Cookie("refreshToken", authResponse.refreshToken());
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setAttribute("SameSite", "Lax");
		cookie.setMaxAge(60); // 1 Min

		if (!isDev) {
			cookie.setDomain(domain);
			cookie.setAttribute("SameSite", "None");
		}

		response.addCookie(cookie);

		response.setStatus(HttpServletResponse.SC_FOUND);
		response.sendRedirect(oauth2RedirectAfter);
	}
}
