package miralhas.github.gymniac.api.dto.filter;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZoneId;

public record MacrosFilter(
		@NotNull
		@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
		LocalDate from,

		@NotNull
		ZoneId zoneId
) {
}
