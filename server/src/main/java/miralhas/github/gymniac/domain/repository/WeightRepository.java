package miralhas.github.gymniac.domain.repository;

import miralhas.github.gymniac.domain.model.user_info.Weight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Long> {

	@Query("From Weight w where w.user.email = :email")
	Page<Weight> findAllUserWeights(String email, Pageable pageable);
}