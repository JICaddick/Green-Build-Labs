CREATE TABLE demo_users.`user` (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	role varchar(100) NOT NULL,
	CONSTRAINT user_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
