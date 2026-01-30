SET session_replication_role = 'replica';

delete from user_roles;
delete from refresh_token;
delete from role;
delete from exercise_set;
delete from routine_exercise;
delete from routine;
delete from workout;
delete from workout_exercise;
delete from workout_plan;
delete from exercise;
delete from weight;
delete from muscle_group;
delete from users;

SET session_replication_role = 'origin';

ALTER TABLE role ALTER COLUMN id RESTART WITH 1;
ALTER TABLE exercise_set ALTER COLUMN id RESTART WITH 1;
ALTER TABLE routine_exercise ALTER COLUMN id RESTART WITH 1;
ALTER TABLE routine ALTER COLUMN id RESTART WITH 1;
ALTER TABLE workout ALTER COLUMN id RESTART WITH 1;
ALTER TABLE workout_exercise ALTER COLUMN id RESTART WITH 1;
ALTER TABLE workout_plan ALTER COLUMN id RESTART WITH 1;
ALTER TABLE exercise ALTER COLUMN id RESTART WITH 1;
ALTER TABLE weight ALTER COLUMN id RESTART WITH 1;
ALTER TABLE muscle_group ALTER COLUMN id RESTART WITH 1;
ALTER TABLE users ALTER COLUMN id RESTART WITH 1;

INSERT INTO role (name) values('ADMIN'), ('USER');

INSERT INTO users(email, username, created_at, password) VALUES ('admin@admin.com', 'admin', NOW() AT TIME ZONE 'UTC', '$2a$10$CNr3GCdNp8wLUGP/XbUqHOjkSA2josmmAHu38jQgP11g/P/Xulgoa');

INSERT INTO users(email, username, created_at, password) VALUES ('user@user.com', 'user', NOW() AT TIME ZONE 'UTC', '$2a$10$CNr3GCdNp8wLUGP/XbUqHOjkSA2josmmAHu38jQgP11g/P/Xulgoa');

INSERT INTO user_roles(role_id, user_id) VALUES (1,1);
INSERT INTO user_roles(role_id, user_id) VALUES (2,1);

INSERT INTO user_roles(role_id, user_id) VALUES (2,2);

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

-- Chest
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (1, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Incline Bench Press', 'incline-bench-press', 'https://www.youtube.com/watch?v=TKM4cM-dkI4');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (1, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Flat Bench Press', 'flat-bench-press', 'https://www.youtube.com/shorts/hWbUlkb5Ms4');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (1, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'On the Machine', 'Peck Deck', 'peck-deck', 'https://www.youtube.com/shorts/hWbUlkb5Ms4');

-- Back
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (2, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Machine cable row', 'Cable Row', 'cable-row', 'https://www.youtube.com/watch?v=vT2GjY_Umpw');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (2, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Goes hard', 'Chest Supported Row Machine', 'chest-supported-row-machine', 'https://www.youtube.com/watch?v=eGo4IYlbE5g');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (2, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'i dont really like this one, but is a good exercise', 'Lat Pulldown', 'lat-pulldown', 'https://www.youtube.com/watch?v=eGo4IYlbE5g');

-- Shoulders
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (3, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using dumbbells', 'Dumbbell Shoulder Press', 'dumbbell-shoulder-press', 'https://www.youtube.com/watch?v=qEwKCR5JCog');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (3, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using dumbbells', 'Lateral Raise', 'lateral-raise', 'https://www.youtube.com/watch?v=kDqklk1ZESo');

-- Biceps
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (4, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Barbell Curl', 'barbell-curl', 'https://www.youtube.com/watch?v=kwG2ipFRgfo');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (4, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using dumbbells', 'Hammer Curl', 'hammer-curl', 'https://www.youtube.com/watch?v=zC3nLlEvin4');

-- Triceps
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (5, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using cables', 'Triceps Pushdown', 'triceps-pushdown', 'https://www.youtube.com/watch?v=2-LAMcpzODU');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (5, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using bodyweight', 'Bench Dips', 'bench-dips', 'https://www.youtube.com/watch?v=0326dy_-CzM');

-- Forearms
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (6, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Wrist Curl', 'wrist-curl', 'https://www.youtube.com/watch?v=3VLTzIrnb5g');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (6, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Reverse Wrist Curl', 'reverse-wrist-curl', 'https://www.youtube.com/watch?v=CLccU8pIYjU');

-- Abdominals
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (7, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Bodyweight exercise', 'Crunch', 'crunch', 'https://www.youtube.com/watch?v=Xyd_fa5zoEU');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (7, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using bodyweight', 'Hanging Leg Raise', 'hanging-leg-raise', 'https://www.youtube.com/watch?v=Pr1ieGZ5atk');

-- Obliques
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (8, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using bodyweight', 'Russian Twist', 'russian-twist', 'https://www.youtube.com/watch?v=wkD8rjkodUI');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (8, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using cables', 'Cable Woodchopper', 'cable-woodchopper', 'https://www.youtube.com/watch?v=H1jJ1Z2h5nI');

-- Lower Back
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (9, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Deadlift', 'deadlift', 'https://www.youtube.com/watch?v=op9kVnSso6Q');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (9, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Bodyweight exercise', 'Back Extension', 'back-extension', 'https://www.youtube.com/watch?v=ph3pddpKzzw');

-- Glutes
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (10, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Hip Thrust', 'hip-thrust', 'https://www.youtube.com/watch?v=LM8XHLYJoYs');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (10, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using bodyweight', 'Glute Bridge', 'glute-bridge', 'https://www.youtube.com/watch?v=m2Zx-57cSok');

-- Quadriceps
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (11, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Back Squat', 'back-squat', 'https://www.youtube.com/watch?v=Dy28eq2PjcM');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (11, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using machine', 'Leg Press', 'leg-press', 'https://www.youtube.com/watch?v=IZxyjW7MPJQ');

-- Hamstrings
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (12, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using barbell', 'Romanian Deadlift', 'romanian-deadlift', 'https://www.youtube.com/watch?v=2SHsk9AzdjA');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (12, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using machine', 'Leg Curl', 'leg-curl', 'https://www.youtube.com/watch?v=1Tq3QdYUuHs');

-- Calves
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (13, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using machine', 'Standing Calf Raise', 'standing-calf-raise', 'https://www.youtube.com/watch?v=YMmgqO8Jo-k');
INSERT INTO exercise (muscle_group_id, submitter_id, created_at, updated_at, description, name, slug, video_how_to) VALUES (13, 1, NOW() AT TIME ZONE 'UTC', NOW() AT TIME ZONE 'UTC', 'Using bodyweight', 'Seated Calf Raise', 'seated-calf-raise', 'https://www.youtube.com/watch?v=JbyjNymZOt0');

-- Workout 1
INSERT INTO workout (note, created_at, updated_at, user_id, uuid_key) VALUES ('25KG INCLINE BENCH PRESS PERSONAL RECORD. LET''S GOOOOO', '2026-01-15 15:36:23.639604 +00:00', '2026-01-30 11:34:21.702501 +00:00', 1, gen_random_uuid());
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 1);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 2);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 11);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 8);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 8, '2026-01-30 11:34:21.640681 +00:00', '2026-01-30 11:34:21.640681 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (25, 7, '2026-01-30 11:34:21.644670 +00:00', '2026-01-30 11:34:21.644670 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 12, '2026-01-30 11:34:21.646305 +00:00', '2026-01-30 11:34:21.646305 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 11, '2026-01-30 11:34:21.648306 +00:00', '2026-01-30 11:34:21.648306 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 8, '2026-01-30 11:34:21.649304 +00:00', '2026-01-30 11:34:21.649304 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (15, 16, '2026-01-30 11:34:21.651302 +00:00', '2026-01-30 11:34:21.651302 +00:00', 1);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 12, '2026-01-30 11:34:21.655308 +00:00', '2026-01-30 11:34:21.655308 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 12, '2026-01-30 11:34:21.656242 +00:00', '2026-01-30 11:34:21.656242 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 11, '2026-01-30 11:34:21.657794 +00:00', '2026-01-30 11:34:21.657794 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 11, '2026-01-30 11:34:21.658795 +00:00', '2026-01-30 11:34:21.658795 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 9, '2026-01-30 11:34:21.660795 +00:00', '2026-01-30 11:34:21.660795 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (20, 8, '2026-01-30 11:34:21.661801 +00:00', '2026-01-30 11:34:21.661801 +00:00', 2);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (25, 20, '2026-01-30 11:34:21.664795 +00:00', '2026-01-30 11:34:21.664795 +00:00', 3);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (30, 13, '2026-01-30 11:34:21.665796 +00:00', '2026-01-30 11:34:21.665796 +00:00', 3);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (35, 8, '2026-01-30 11:34:21.667863 +00:00', '2026-01-30 11:34:21.667863 +00:00', 3);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (30, 9, '2026-01-30 11:34:21.669402 +00:00', '2026-01-30 11:34:21.669402 +00:00', 3);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (10, 17, '2026-01-30 11:34:21.671403 +00:00', '2026-01-30 11:34:21.671403 +00:00', 4);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (12, 13, '2026-01-30 11:34:21.673400 +00:00', '2026-01-30 11:34:21.673400 +00:00', 4);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (12, 10, '2026-01-30 11:34:21.674405 +00:00', '2026-01-30 11:34:21.674405 +00:00', 4);
INSERT INTO exercise_set (kg, reps, created_at, updated_at, workout_exercise_id) VALUES (12, 11, '2026-01-30 11:34:21.675403 +00:00', '2026-01-30 11:34:21.675403 +00:00', 4);

