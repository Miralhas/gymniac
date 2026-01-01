package miralhas.github.gymniac.api.dto;

public record AuthenticationDTO(
		String accessToken,
		String refreshToken,
		Long accessTokenExpiresIn,
		Long refreshTokenExpiresIn
) {
}
