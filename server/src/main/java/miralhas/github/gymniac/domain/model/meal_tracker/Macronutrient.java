package miralhas.github.gymniac.domain.model.meal_tracker;

import jakarta.persistence.*;
import lombok.*;
import miralhas.github.gymniac.domain.model.meal_tracker.enums.NutrientType;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.type.SqlTypes;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Macronutrient implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JdbcTypeCode(SqlTypes.NAMED_ENUM)
	@Column(nullable = false, columnDefinition = "nutrient_type")
	private NutrientType nutrient;

	@Column(nullable = false)
	private Double grams;

	@ManyToOne
	private Meal meal;

	@Override
	public final boolean equals(Object o) {
		if (this == o) return true;
		if (o == null) return false;
		Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
		Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
		if (thisEffectiveClass != oEffectiveClass) return false;
		Macronutrient that = (Macronutrient) o;
		return getId() != null && Objects.equals(getId(), that.getId());
	}

	@Override
	public final int hashCode() {
		return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
	}
}
