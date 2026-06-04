ALTER TABLE image
    DROP CONSTRAINT fk_image_on_user;
ALTER TABLE image
    DROP COLUMN user_id;