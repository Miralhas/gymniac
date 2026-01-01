package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("from User u LEFT JOIN FETCH u.roles where u.email = :email")
	Optional<User> findUserByEmail(String email);

	@Query("from User u LEFT JOIN FETCH u.roles where u.username = :username")
	Optional<User> findUserByUsername(String username);

	@Query("from User u LEFT JOIN FETCH u.roles")
	List<User> findAll();

}