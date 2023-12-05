INSERT INTO public.usuarios(
	id, eliminado, fecha_creacion, fecha_modificacion, password, usuario)
	VALUES
	(1, false, '2023-10-30 12:34:52.77007', null, '$2a$10$rA/sEKjXCr9S/K2KWsO8p.Cf/cfF0PPTZcW0NxsHusWbAZ7UbS67O', 'admin@crisalis.com'),
	(2, false, '2023-10-30 12:34:52.77007', null, '$2a$10$rA/sEKjXCr9S/K2KWsO8p.Cf/cfF0PPTZcW0NxsHusWbAZ7UbS67O', 'usuario@crisalis.com'),
	(3, false, '2023-10-30 12:34:52.77007', null, '$2a$10$rA/sEKjXCr9S/K2KWsO8p.Cf/cfF0PPTZcW0NxsHusWbAZ7UbS67O', 'tecnico@crisalis.com');

INSERT INTO public.roles(
	id, role)
	VALUES (1, 'ROLE_ADMIN'),(2, 'ROLE_USER'),(3, 'ROLE_TECNICO');

INSERT INTO public.usuarios_roles(
	usuario_id, role_id)
	VALUES (1, 1),(1, 2),(2, 2),(3, 3);