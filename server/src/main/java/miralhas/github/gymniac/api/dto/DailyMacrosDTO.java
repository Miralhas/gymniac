package miralhas.github.gymniac.api.dto;

public record DailyMacrosDTO(
		int meals,
		Double kcal,
		Double protein,
		Double carbohydrate,
		Double fat
) {
}
