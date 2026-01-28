package miralhas.github.gymniac.api.dto;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.TimeZone;

public interface UserInfoProjection {
	Long getId();
	LocalDateTime getCreatedAt();
	String getEmail();
	String getUsername();
	String getMode();
	String getProfilePicture();
	Double getWeightGoal();
	Double getCurrentWeight();
	Integer getTotalWorkouts();
	LocalDateTime getLastActivity();

	default UserInfoDTO getUserInfoDTO() {
		var lastActivity = Objects.isNull(getLastActivity()) ? null :
				getLastActivity().atZone(TimeZone.getDefault().toZoneId()).toOffsetDateTime();

		var createdAt = Objects.isNull(getCreatedAt()) ? null :
				getCreatedAt().atZone(TimeZone.getDefault().toZoneId()).toOffsetDateTime();

		return new UserInfoDTO(
				this.getId(),
				createdAt,
				this.getEmail(),
				this.getUsername(),
				this.getMode(),
				this.getProfilePicture(),
				this.getWeightGoal(),
				this.getCurrentWeight(),
				this.getTotalWorkouts(),
				lastActivity
		);
	}
}

