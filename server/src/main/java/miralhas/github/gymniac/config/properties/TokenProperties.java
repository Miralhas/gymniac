package miralhas.github.gymniac.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@ConfigurationProperties(prefix = "authentication.token")
public record TokenProperties (
		AuthenticationToken accessToken,
		AuthenticationToken refreshToken,
		JwtProperty jwt
) {
	public record JwtProperty (Resource privateKey, Resource publicKey) {}
	public record AuthenticationToken (Long expirationTime) {}

	public RSAPublicKey toPublicKey() {
		try {
			String sanitized = jwt.publicKey.getContentAsString(StandardCharsets.UTF_8)
					.replace("-----BEGIN PUBLIC KEY-----", "")
					.replace("-----END PUBLIC KEY-----", "")
					.replaceAll("\\s", "");

			byte[] decoded = Base64.getDecoder().decode(sanitized);
			X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);

			return (RSAPublicKey) KeyFactory
					.getInstance("RSA")
					.generatePublic(spec);

		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid RSA public key", e);
		}
	}

	public RSAPrivateKey toPrivateKey() {
		try {
			String sanitized = jwt.privateKey.getContentAsString(StandardCharsets.UTF_8)
					.replace("-----BEGIN PRIVATE KEY-----", "")
					.replace("-----END PRIVATE KEY-----", "")
					.replaceAll("\\s", "");

			byte[] decoded = Base64.getDecoder().decode(sanitized);
			PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);

			return (RSAPrivateKey) KeyFactory
					.getInstance("RSA")
					.generatePrivate(spec);

		} catch (Exception e) {
			throw new IllegalArgumentException("Invalid RSA private key", e);
		}
	}
}
