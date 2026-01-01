package miralhas.github.gymniac.api.dto_mapper;

import miralhas.github.gymniac.api.dto.UserDTO;
import miralhas.github.gymniac.api.dto.input.CreateUserInput;
import miralhas.github.gymniac.api.dto.input.UpdateUserInput;
import miralhas.github.gymniac.domain.model.auth.Role;
import miralhas.github.gymniac.domain.model.auth.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(
		componentModel = "spring",
		nullValuePropertyMappingStrategy = IGNORE,
		nullValueCheckStrategy = ALWAYS
)
public interface UserMapper {

	User fromInput(CreateUserInput createUserInput);

	@Mapping(target = "roles", qualifiedByName = "mapRoles")
	UserDTO toResponse(User user);

	List<UserDTO> toCollectionResponse(List<User> users);

	void update(UpdateUserInput userRequest, @MappingTarget User userEntity);

	@Named("mapRoles")
	default List<String> mapRoles(Set<Role> roles) {
		return roles.stream().map(r -> r.getName().name()).toList();
	}
}
