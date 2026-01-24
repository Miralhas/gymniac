package miralhas.github.gymniac.domain.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import miralhas.github.gymniac.domain.model.user_info.Weight;
import miralhas.github.gymniac.domain.model.workout_plan.Exercise;
import miralhas.github.gymniac.domain.model.workout_plan.WorkoutPlan;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serial;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@With
@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false, unique = true)
	private String email;

	private String password;

	@CreationTimestamp
	private OffsetDateTime createdAt;

	@ManyToMany(
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}
	)
	@JoinTable(
			name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	private Set<Role> roles;

	@OneToMany(
			mappedBy = "submitter",
			fetch = FetchType.LAZY
	)
	private List<Exercise> exercises = new ArrayList<>();

	@OneToMany(
			mappedBy = "user",
			cascade = CascadeType.ALL,
			orphanRemoval = true,
			fetch = FetchType.LAZY
	)
	private List<WorkoutPlan> workoutPlans = new ArrayList<>();

	@OneToMany(
			mappedBy = "user",
			cascade = CascadeType.ALL,
			orphanRemoval = true,
			fetch = FetchType.LAZY
	)
	private List<Weight> weights;

//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	private Image image;

//	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "user")
//	private PasswordResetToken passwordResetToken;

	public List<? extends GrantedAuthority> getAuthorities() {
		return roles.stream().map(r -> r.getName().getAuthority()).toList();
	}

	@JsonIgnore
	public boolean isAdmin() {
		return roles.stream().anyMatch(r -> r.getName().equals(Role.Value.ADMIN));
	}

//	@JsonIgnore
//	public boolean hasImage() {
//		return this.image != null;
//	}

//	public String getImageFileName() {
//		if (hasImage()) return this.image.getFileName();
//		return null;
//	}

	@Override
	public final boolean equals(Object o) {
		if (this == o) return true;
		if (o == null) return false;
		Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
		Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
		if (thisEffectiveClass != oEffectiveClass) return false;
		User user = (User) o;
		return getId() != null && Objects.equals(getId(), user.getId());
	}

	@Override
	public final int hashCode() {
		return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
	}

}