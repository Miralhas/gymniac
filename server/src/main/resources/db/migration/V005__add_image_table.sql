CREATE TABLE IF NOT EXISTS image (
    id               UUID         NOT NULL,
    file_name        VARCHAR(255) NOT NULL,
    content_type     VARCHAR(255) NOT NULL,
    size             BIGINT       NOT NULL,
    relative_folder  VARCHAR(255) NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE,
    updated_at       TIMESTAMP WITHOUT TIME ZONE,
    storage_provider VARCHAR(255) NOT NULL,
    CONSTRAINT pk_image PRIMARY KEY (id)
);

-- ALTER TABLE image ADD COLUMN user_id BIGINT;
--
-- ALTER TABLE image ADD CONSTRAINT FK_IMAGE_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE users ADD image_id UUID;

ALTER TABLE users ADD CONSTRAINT FK_USERS_ON_IMAGE FOREIGN KEY (image_id) REFERENCES image (id);