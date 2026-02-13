
ALTER TABLE workout ADD IF NOT EXISTS uuid_key UUID NULL DEFAULT gen_random_uuid();