package miralhas.github.gymniac.domain.service;

import lombok.RequiredArgsConstructor;
import miralhas.github.gymniac.domain.exception.RoleNotFoundException;
import miralhas.github.gymniac.domain.model.auth.Role;
import miralhas.github.gymniac.domain.repository.RoleRepository;
import miralhas.github.gymniac.domain.utils.ErrorMessages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoleService {

	private final RoleRepository roleRepository;
	private final ErrorMessages errorMessages;

	public Role getUserRole() {
		return roleRepository.findRoleByName(Role.Value.USER).orElseThrow(() -> new RoleNotFoundException(
				errorMessages.get("role.notFound", "USER")
		));
	}

	public Role getAdminRole() {
		return roleRepository.findRoleByName(Role.Value.ADMIN).orElseThrow(() -> new RoleNotFoundException(
				errorMessages.get("role.notFound", "ADMIN")
		));
	}
}
