insert into role (name) values('ADMIN'), ('USER');

insert into users(email, username, created_at, password) VALUES ('admin@admin.com', 'admin', NOW() AT TIME ZONE 'UTC', '$2a$10$CNr3GCdNp8wLUGP/XbUqHOjkSA2josmmAHu38jQgP11g/P/Xulgoa');

insert into user_roles(role_id, user_id) VALUES (1,1);
insert into user_roles(role_id, user_id) VALUES (2,1);

INSERT INTO muscle_groups(name, slug) VALUES ('Chest', 'chest');
INSERT INTO muscle_groups(name, slug) VALUES ('Back', 'back');
INSERT INTO muscle_groups(name, slug) VALUES ('Shoulders', 'shoulders');
INSERT INTO muscle_groups(name, slug) VALUES ('Biceps', 'biceps');
INSERT INTO muscle_groups(name, slug) VALUES ('Triceps', 'triceps');
INSERT INTO muscle_groups(name, slug) VALUES ('Forearms', 'forearms');
INSERT INTO muscle_groups(name, slug) VALUES ('Abdominals', 'abdominals');
INSERT INTO muscle_groups(name, slug) VALUES ('Obliques', 'obliques');
INSERT INTO muscle_groups(name, slug) VALUES ('Lower Back', 'lower-back');
INSERT INTO muscle_groups(name, slug) VALUES ('Glutes', 'glutes');
INSERT INTO muscle_groups(name, slug) VALUES ('Quadriceps', 'quadriceps');
INSERT INTO muscle_groups(name, slug) VALUES ('Hamstrings', 'hamstrings');
INSERT INTO muscle_groups(name, slug) VALUES ('Calves', 'calves');
