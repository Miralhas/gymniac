package miralhas.github.gymniac.config.security;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class CustomAccessDeniedHandlerImpl implements AccessDeniedHandler {

	private final ErrorMessages errorMessages;

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException ex) throws IOException {
		var detail = errorMessages.get("AbstractAccessDecisionManager.accessDenied");
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, detail);
		problem.setTitle("Forbidden");
		problem.setInstance(URI.create(request.getRequestURI()));
		problem.setType(URI.create("http://localhost:8080/forbidden-access"));
		ObjectMapper mapper = JsonMapper.builder()
				.changeDefaultPropertyInclusion(incl -> incl.withValueInclusion(JsonInclude.Include.NON_NULL))
				.build();
		String problemDetailAsString = mapper.writeValueAsString(problem);

		response.setStatus(problem.getStatus());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding(StandardCharsets.UTF_8.name());
		response.getWriter().write(problemDetailAsString);
	}
}
