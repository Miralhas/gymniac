package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.api.dto_mapper.UserMapper;
import miralhas.github.gymniac.config.properties.TokenProperties;
import miralhas.github.gymniac.domain.model.auth.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TokenService {

	private final TokenProperties tokenProperties;
	private final JwtEncoder jwtEncoder;
	private final UserMapper userMapper;

	public Jwt generateToken(User user) {
		Instant now = Instant.now();
		var mappedUser = userMapper.toResponse(user);
		var scopes = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("gymniac-server")
				.subject(user.getEmail())
				.issuedAt(now)
				.expiresAt(now.plusSeconds(tokenProperties.accessToken().expirationTime()))
				.claim("user", mappedUser)
				.claim("scope", scopes)
				.build();
		var header = JwsHeader.with(SignatureAlgorithm.RS256).type("JWT").build();
		return jwtEncoder.encode(JwtEncoderParameters.from(header, claims));
	}
}