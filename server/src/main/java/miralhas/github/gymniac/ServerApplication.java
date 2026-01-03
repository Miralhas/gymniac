package miralhas.github.gymniac;

import com.github.slugify.Slugify;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import java.util.Locale;
import java.util.TimeZone;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ServerApplication {

	public static final Slugify SLG = Slugify.builder().
			lowerCase(true)
			.customReplacement("'", "")
			.locale(Locale.ENGLISH).build();

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(ServerApplication.class, args);
	}

}
