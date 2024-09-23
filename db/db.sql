DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name varchar (100) NOT NULL UNIQUE,
	image VARCHAR (255) NULL,  
	route VARCHAR (255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY, 
	email VARCHAR(255) NOT NULL UNIQUE, 
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL, 
	password VARCHAR(255) NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL, 
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol)  REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (id_user, id_rol)

);


/* Insercion*/
insert into users(
	email,
	name,
	lastname,
	phone, 
	password,
	created_at,
	updated_at
)
VALUES (
		'roberto.eche95@gmail.com',
		'Jose',
		'Garcia',
		'7531-0238',
		'12345678',
		'2024-09-02',
		'2024-09-02'
)

/*INSERTANDO ROLES*/
INSERT INTO roles(
	name, 
	route,
	image,
	created_at,
	updated_at
)VALUES(
	'CLIENTE',
	'client/home',
	'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
	'2024-09-20',
	'2024-09-21'
);

INSERT INTO roles(
	name, 
	route,
	image,
	created_at,
	updated_at
)VALUES(
	'RESTAURANTE',
	'restaurant/home',
	'https://cdn-icons-png.flaticon.com/512/433/433087.png',
	'2024-09-20',
	'2024-09-21'
);

INSERT INTO roles(
	name, 
	route,
	image,
	created_at,
	updated_at
)VALUES(
	'REPARTIDOR',
	'delivery/home',
	'https://cdn-icons-png.flaticon.com/512/2830/2830312.png',
	'2024-09-20',
	'2024-09-21'
);