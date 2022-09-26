-- MySQL Script generated by MySQL Workbench
-- Mon Sep 26 18:55:27 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8 ;
USE `testdb` ;

-- -----------------------------------------------------
-- Table `testdb`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Book` (
  `GoogleBooksID` CHAR(12) NOT NULL,
  PRIMARY KEY (`GoogleBooksID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`User` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `bio` VARCHAR(300) NULL,
  `profilePicture` VARCHAR(45) NULL,
  `favAuthor` VARCHAR(70) NULL,
  `favGenre` VARCHAR(30) NULL,
  `isAuthor` TINYINT NULL,
  `favBook` CHAR(12) NULL,
  PRIMARY KEY (`id`),
  INDEX `Fk_BookId_idx` (`favBook` ASC),
  UNIQUE INDEX `Name_UNIQUE` (`name` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `Fk_BookId_UserProfile`
    FOREIGN KEY (`favBook`)
    REFERENCES `testdb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `comment` VARCHAR(300) NOT NULL,
  `rating` TINYINT NOT NULL,
  `creationDate` DATETIME NOT NULL,
  `upvotes` INT NULL,
  `isEdited` VARCHAR(45) NULL,
  `bookId` CHAR(12) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_BookId_idx` (`bookId` ASC),
  INDEX `FK_UserId_Review_idx` (`userId` ASC),
  CONSTRAINT `FK_UserId_Review`
    FOREIGN KEY (`userId`)
    REFERENCES `testdb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BookId_Review`
    FOREIGN KEY (`bookId`)
    REFERENCES `testdb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`Bookshelf`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Bookshelf` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `isDeletable` TINYINT NOT NULL,
  `creationDate` DATETIME NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_UserId_Bookshelf_idx` (`userId` ASC),
  CONSTRAINT `FK_UserId_Bookshelf`
    FOREIGN KEY (`userId`)
    REFERENCES `testdb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Collection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `creationDate` DATETIME NOT NULL,
  `isPublic` TINYINT NOT NULL DEFAULT 0,
  `upvotes` INT NULL,
  `bookId` CHAR(12) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_BookId_idx` (`bookId` ASC),
  INDEX `FK_UserId_Collection_idx` (`userId` ASC),
  CONSTRAINT `FK_BookId_Collection`
    FOREIGN KEY (`bookId`)
    REFERENCES `testdb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_UserId_Collection`
    FOREIGN KEY (`userId`)
    REFERENCES `testdb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`Note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Note` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `content` VARCHAR(300) NOT NULL,
  `creationDate` DATETIME NOT NULL,
  `collectionId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `CollectionId_idx` (`collectionId` ASC),
  CONSTRAINT `FK_collectionId_Note`
    FOREIGN KEY (`collectionId`)
    REFERENCES `testdb`.`Collection` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`BooksInBookshelf`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`BooksInBookshelf` (
  `bookId` CHAR(12) NOT NULL,
  `bookshelfId` INT NOT NULL,
  `dateAdded` DATETIME NOT NULL,
  PRIMARY KEY (`bookId`, `bookshelfId`),
  INDEX `FK_BookshelfId_idx` (`bookshelfId` ASC),
  CONSTRAINT `FK_BookId_BooksInBookshelf`
    FOREIGN KEY (`bookId`)
    REFERENCES `testdb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BookshelfId_BooksInBookShelf`
    FOREIGN KEY (`bookshelfId`)
    REFERENCES `testdb`.`Bookshelf` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`Refresh_Token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`Refresh_Token` (
  `id` INT NOT NULL,
  `refresh_token` VARCHAR(512) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `refresh_token_UNIQUE` (`refresh_token` ASC),
  INDEX `FK_userId_refreshToken_idx` (`userId` ASC),
  CONSTRAINT `FK_userId_refreshToken`
    FOREIGN KEY (`userId`)
    REFERENCES `testdb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
