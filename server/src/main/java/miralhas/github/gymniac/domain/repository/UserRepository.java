package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.api.dto.UserInfoProjection;
import miralhas.github.gymniac.domain.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("from User u LEFT JOIN FETCH u.roles where u.email = :email")
	Optional<User> findUserByEmail(String email);

	@Query("from User u LEFT JOIN FETCH u.roles where u.username = :username")
	Optional<User> findUserByUsername(String username);

	@Query("from User u LEFT JOIN FETCH u.roles")
	List<User> findAll();

	@Query(nativeQuery = true, value = """
			SELECT u.id, u.created_at, u.email, u.username, u.mode, u.profile_picture, u.weight_goal,
			(SELECT w.kg FROM weight w WHERE w.user_id = :id ORDER BY w.created_at DESC LIMIT 1) as currentWeight,
			(SELECT COUNT(*) FROM workout w WHERE w.user_id = :id) as totalWorkouts,
			(SELECT MAX(w.created_at) from workout w WHERE w.user_id = :id) as lastActivity
			from users u where u.id = :id
			"""
	)
	Optional<UserInfoProjection> findUserInfoById(Long id);

}