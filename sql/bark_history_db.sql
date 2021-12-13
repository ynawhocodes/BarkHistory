-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema barkhistory
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema barkhistory
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `barkhistory` DEFAULT CHARACTER SET utf8 ;
USE `barkhistory` ;

-- -----------------------------------------------------
-- Table `barkhistory`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `user_pw` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`eraser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`eraser` (
  `eraser_id` INT NOT NULL AUTO_INCREMENT,
  `eraser_title` VARCHAR(250) NOT NULL,
  `eraser_date` TIMESTAMP NOT NULL,
  `eraser_detail` LONGTEXT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_eraser_user_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`eraser_id`),
  CONSTRAINT `fk_eraser_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `barkhistory`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`emotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`emotion` (
  `emotion_id` INT NOT NULL AUTO_INCREMENT,
  `emotion_name` VARCHAR(45) NOT NULL,
  `emotion_image` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`emotion_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `post_title` VARCHAR(250) NOT NULL,
  `post_date` TIMESTAMP NOT NULL,
  `post_detail` LONGTEXT NOT NULL,
  `post_emotion_number` INT NOT NULL,
  `post_scrap_number` INT NOT NULL,
  `category_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`post_id`, `category_id`),
  INDEX `fk_post_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `barkhistory`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `barkhistory`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment_detail` LONGTEXT NOT NULL,
  `comment_date` TIMESTAMP NOT NULL,
  `user_id` INT NOT NULL,
  `emotion_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`, `emotion_id`, `post_id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_emotion1_idx` (`emotion_id` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`post_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `barkhistory`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_emotion1`
    FOREIGN KEY (`emotion_id`)
    REFERENCES `barkhistory`.`emotion` (`emotion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `barkhistory`.`post` (`post_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `barkhistory`.`scrap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `barkhistory`.`scrap` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `scrap_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`, `category_id`),
  INDEX `fk_user_has_post_post1_idx` (`post_id` ASC, `category_id` ASC) VISIBLE,
  INDEX `fk_user_has_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `barkhistory`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_post_post1`
    FOREIGN KEY (`post_id` , `category_id`)
    REFERENCES `barkhistory`.`post` (`post_id` , `category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;