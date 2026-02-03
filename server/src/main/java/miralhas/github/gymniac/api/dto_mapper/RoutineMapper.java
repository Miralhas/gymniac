package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.RoutineDTO;
import miralhas.github.gymniac.api.dto.RoutineSummaryDTO;
import miralhas.github.gymniac.api.dto.input.RoutineInput;
import miralhas.github.gymniac.api.dto.input.UpdateRoutineInput;
import miralhas.github.gymniac.domain.model.workout_plan.Routine;
import miralhas.github.gymniac.domain.model.workout_plan.enums.DaysOfTheWeek;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS,
		uses = {RoutineExerciseMapper.class}
)
public interface RoutineMapper {

	@Mapping(source = "desirableDayOfWeek", target = "desirableDayOfWeek", qualifiedByName = "toDayOfTheWeek")
	Routine fromInput(RoutineInput input);

	@Mapping(target = "exercises", source = "routineExercises")
	RoutineDTO toResponse(Routine routine);

//	@Mapping(target = "exercises", source = "routineExercises")
	RoutineSummaryDTO toSummaryResponse(Routine routine);

	@Mapping(target = "routineExercises", ignore = true)
	void update(RoutineInput input, @MappingTarget Routine routine);


	@Named("toDayOfTheWeek")
	static DaysOfTheWeek stringToDayOfTheWeek(String day) {
		return DaysOfTheWeek.valueOf(day);
	}
}
