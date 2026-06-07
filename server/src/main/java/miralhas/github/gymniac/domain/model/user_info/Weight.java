package miralhas.github.gymniac.domain.model.user_info;

import jakarta.persistence.*;
import lombok.*;
import miralhas.github.gymniac.domain.model.auth.User;
import miralhas.github.gymniac.domain.model.image.Image;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serial;
import java.io.Serializable;
import java.nio.file.Path;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Weight implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Double kg;

	@CreationTimestamp
	@Column(nullable = true)
	private OffsetDateTime createdAt;

	@ManyToOne
	private User user;

	@JoinColumn(name = "weight_id")
	@OneToMany(cascade = CascadeType.ALL)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Image> images = new ArrayList<>();

	public Path getImageRelativePath() {
		return Path.of(this.getClass().getSimpleName(), user.getUsername(), "weight_id-%d".formatted(id));
	}

	public void addImages(List<Image> images) {
		this.images.addAll(images);
	}


	@Override
	public final boolean equals(Object o) {
		if (this == o) return true;
		if (o == null) return false;
		Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
		Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
		if (thisEffectiveClass != oEffectiveClass) return false;
		Weight weight = (Weight) o;
		return getId() != null && Objects.equals(getId(), weight.getId());
	}

	@Override
	public final int hashCode() {
		return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
	}
}
