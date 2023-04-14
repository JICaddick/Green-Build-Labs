/* Users table*/
CREATE TABLE green_build_labs.`user` (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	role ENUM('individual', 'contractor') NOT NULL,
	CONSTRAINT user_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

/*system_permissions*/
CREATE TABLE `system_permissions` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permissions` enum('read','read_write') NOT NULL DEFAULT 'read',
  KEY `project_team_members_FK` (`project_id`),
  KEY `project_team_members_FK_1` (`user_id`),
  CONSTRAINT `project_team_members_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `project_team_members_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/* project*/
CREATE TABLE green_build_labs.`project` (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	CONSTRAINT Build_Project_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

/*materials*/
CREATE TABLE `materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` enum('timber','cement','glass') NOT NULL,
  `unit` enum('kgs','l') NOT NULL,
  `carbon_emissions_per_unit` varchar(50) NOT NULL DEFAULT 'CO2e',
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/*project_materials*/
CREATE TABLE `project_materials` (
  `project_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` varchar(50) NOT NULL,
  KEY `project_materials_FK` (`project_id`),
  KEY `project_materials_FK_1` (`material_id`),
  CONSTRAINT `project_materials_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `project_materials_FK_1` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/*project_carbon_emissions*/
CREATE TABLE `project_carbon_emissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `total_carbon_emissions` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_carbon_emissions_FK` (`project_id`),
  CONSTRAINT `project_carbon_emissions_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;