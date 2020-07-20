CREATE SCHEMA `delilah` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;

CREATE TABLE `delilah`.`user` (
  `id` INT NOT NULL,
  `usename` VARCHAR(20) NOT NULL,
  `full_name` VARCHAR(150) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(15) NULL,
  `address` VARCHAR(200) NULL,
  `password` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usename_UNIQUE` (`usename` ASC) VISIBLE);