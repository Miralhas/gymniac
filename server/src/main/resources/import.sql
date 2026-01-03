INSERT INTO role (name) values('ADMIN'), ('USER');

INSERT INTO users(email, username, created_at, password) VALUES ('admin@admin.com', 'admin', NOW() AT TIME ZONE 'UTC', '$2a$10$CNr3GCdNp8wLUGP/XbUqHOjkSA2josmmAHu38jQgP11g/P/Xulgoa');

INSERT INTO user_roles(role_id, user_id) VALUES (1,1);
INSERT INTO user_roles(role_id, user_id) VALUES (2,1);

INSERT INTO muscle_group(name, slug) VALUES ('Chest', 'chest');
INSERT INTO muscle_group(name, slug) VALUES ('Back', 'back');
INSERT INTO muscle_group(name, slug) VALUES ('Shoulders', 'shoulders');
INSERT INTO muscle_group(name, slug) VALUES ('Biceps', 'biceps');
INSERT INTO muscle_group(name, slug) VALUES ('Triceps', 'triceps');
INSERT INTO muscle_group(name, slug) VALUES ('Forearms', 'forearms');
INSERT INTO muscle_group(name, slug) VALUES ('Abdominals', 'abdominals');
INSERT INTO muscle_group(name, slug) VALUES ('Obliques', 'obliques');
INSERT INTO muscle_group(name, slug) VALUES ('Lower Back', 'lower-back');
INSERT INTO muscle_group(name, slug) VALUES ('Glutes', 'glutes');
INSERT INTO muscle_group(name, slug) VALUES ('Quadriceps', 'quadriceps');
INSERT INTO muscle_group(name, slug) VALUES ('Hamstrings', 'hamstrings');
INSERT INTO muscle_group(name, slug) VALUES ('Calves', 'calves');

INSERT INTO exercise (muscle_group_id, submitter_id, description, name, slug, video_how_to) VALUES (1, 1, 'Using barbell', 'Incline Bench Press', 'incline-bench-press', 'https://www.youtube.com/watch?v=TKM4cM-dkI4');
INSERT INTO exercise (muscle_group_id, submitter_id, description, name, slug, video_how_to) VALUES (1, 1, 'Using barbell', 'Flat Bench Press', 'flat-bench-press', 'https://www.youtube.com/shorts/hWbUlkb5Ms4');
