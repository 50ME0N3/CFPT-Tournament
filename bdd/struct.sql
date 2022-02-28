-- MySQL Script generated by MySQL Workbench
-- Wed Oct 27 17:45:26 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cfpt_tournament
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cfpt_tournament` ;

-- -----------------------------------------------------
-- Schema cfpt_tournament
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cfpt_tournament` DEFAULT CHARACTER SET utf8mb4 ;
USE `cfpt_tournament` ;

-- -----------------------------------------------------
-- Table `cfpt_tournament`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cfpt_tournament`.`team` ;

CREATE TABLE IF NOT EXISTS `cfpt_tournament`.`team` (
  `idTeam` INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `discordId` VARCHAR(18) NOT NULL,
  PRIMARY KEY (`idTeam`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `discordRoleId_UNIQUE` (`discordId` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cfpt_tournament`.`player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cfpt_tournament`.`player` ;

CREATE TABLE IF NOT EXISTS `cfpt_tournament`.`player` (
  `idPlayer` INT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(40) NOT NULL,
  `discordId` VARCHAR(18) NOT NULL,
  `dateRegistration` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When the player has registered for the tournament',
  `idTeam` INT(3) UNSIGNED NOT NULL,
  PRIMARY KEY (`idPlayer`),
  INDEX `fk_player_team1_idx` (`idTeam` ASC),
  UNIQUE INDEX `discordId_UNIQUE` (`discordId` ASC),
  CONSTRAINT `fk_player_team1`
    FOREIGN KEY (`idTeam`)
    REFERENCES `cfpt_tournament`.`team` (`idTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user_admin;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user_admin' IDENTIFIED BY '1234';

GRANT ALL ON `cfpt_tournament`.* TO 'user_admin';
GRANT SELECT ON TABLE `cfpt_tournament`.* TO 'user_admin';
GRANT SELECT, INSERT, TRIGGER ON TABLE `cfpt_tournament`.* TO 'user_admin';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `cfpt_tournament`.* TO 'user_admin';
SET SQL_MODE = '';
DROP USER IF EXISTS user_appR;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user_appR' IDENTIFIED BY '1234';

GRANT SELECT ON TABLE `cfpt_tournament`.* TO 'user_appR';
SET SQL_MODE = '';
DROP USER IF EXISTS user_appRW;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user_appRW' IDENTIFIED BY '1234';

GRANT SELECT ON TABLE `cfpt_tournament`.* TO 'user_appRW';
GRANT SELECT, INSERT, TRIGGER ON TABLE `cfpt_tournament`.* TO 'user_appRW';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `cfpt_tournament`.* TO 'user_appRW';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
