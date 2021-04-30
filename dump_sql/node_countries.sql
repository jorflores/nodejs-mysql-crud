DROP TABLE IF EXISTS `videojuegos`;

CREATE TABLE `videojuegos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `año` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `clasificacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comentarios` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `calificacion` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `videojuegos` (`id`, `nombre`, `año`, `clasificacion`, `comentarios`, `calificacion`)
VALUES
	(NULL,'Legend of Zelda','','','',100),
	(NULL,'Resident Evil 2','','','',95),
	(NULL,'Destiny 2','','','',90),
  (NULL,'WarZone','','','',100);