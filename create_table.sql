/* Users table*/
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `role` enum('individual','contractor','contractor_team') DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB AUTO_INCREMENT=37 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/*system_permissions*/
REATE TABLE `system_permissions` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `has_read_access` tinyint(1) DEFAULT 1,
  `can_create_contractor_team_users` tinyint(1) DEFAULT 1,
  `can_delete_contractor_team_user` tinyint(1) DEFAULT 1,
  `can_create_project` tinyint(1) DEFAULT 1,
  `can_edit_project` tinyint(1) DEFAULT 1,
  `can_delete_project` tinyint(1) DEFAULT 1,
  `can_create_multiple_projects` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `project_team_members_FK` (`project_id`),
  KEY `project_team_members_FK_1` (`user_id`),
  CONSTRAINT `project_team_members_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `project_team_members_FK_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/* project*/
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_FK` (`user_id`),
  CONSTRAINT `project_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `end_date_later_than_start` CHECK (`end_date` > `start_date`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

/*materials*/
CREATE TABLE `materials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` enum('timber','cement','glass') NOT NULL,
  `unit` enum('kgs','l') NOT NULL,
  `carbon_emissions_per_unit` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_material_name` (`name`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;

/*project_materials*/
CREATE TABLE `project_materials` (
  `project_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` enum('timber','cement','glass') DEFAULT NULL,
  `unit` enum('kgs','l') DEFAULT NULL,
  `carbon_emissions_per_unit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
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
  `total_carbon_emissions` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_carbon_emissions_FK` (`project_id`),
  CONSTRAINT `project_carbon_emissions_FK` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) 
ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_general_ci;