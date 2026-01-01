insert into role (name) values('ADMIN'), ('USER');

insert into users(email, username, created_at, password) VALUES ('admin@admin.com', 'admin', NOW() AT TIME ZONE 'UTC', '$2a$10$CNr3GCdNp8wLUGP/XbUqHOjkSA2josmmAHu38jQgP11g/P/Xulgoa');

insert into user_roles(role_id, user_id) VALUES (1,1);
insert into user_roles(role_id, user_id) VALUES (2,1);