-- MySQL Script generated by MySQL Workbench
-- Wed Sep  7 12:51:12 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Book` (
  `GoogleBooksID` CHAR(11) NOT NULL,
  PRIMARY KEY (`GoogleBooksID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(70) NOT NULL,
  `Bio` VARCHAR(300) NULL,
  `Profile_Picture` VARCHAR(45) NULL,
  `FavAuthor` VARCHAR(70) NULL,
  `FavGenre` VARCHAR(30) NULL,
  `IsAuthor` TINYINT NULL,
  `FavBook` CHAR(11) NULL,
  PRIMARY KEY (`ID`),
  INDEX `Fk_BookId_idx` (`FavBook` ASC) VISIBLE,
  CONSTRAINT `Fk_BookId`
    FOREIGN KEY (`FavBook`)
    REFERENCES `mydb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Review` (
  `ID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Comment` VARCHAR(300) NOT NULL,
  `Rating` TINYINT NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `Upvotes` INT NULL,
  `BookId` CHAR(11) NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_UserId_idx` (`UserId` ASC) VISIBLE,
  INDEX `FK_BookId_idx` (`BookId` ASC) VISIBLE,
  CONSTRAINT `FK_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BookId`
    FOREIGN KEY (`BookId`)
    REFERENCES `mydb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Bookshelf`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Bookshelf` (
  `ID` INT NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `IsDeletable` TINYINT NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_UserId_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `FK_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Collection` (
  `ID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `IsPublic` TINYINT NOT NULL DEFAULT 0,
  `Upvotes` INT NULL,
  `BookId` CHAR(11) NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_BookId_idx` (`BookId` ASC) VISIBLE,
  INDEX `FK_UserId_idx` (`UserId` ASC) VISIBLE,
  CONSTRAINT `FK_BookId`
    FOREIGN KEY (`BookId`)
    REFERENCES `mydb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Note` (
  `ID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Content` VARCHAR(300) NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `CollectionId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `CollectionId_idx` (`CollectionId` ASC) VISIBLE,
  CONSTRAINT `CollectionId`
    FOREIGN KEY (`CollectionId`)
    REFERENCES `mydb`.`Collection` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BooksInBookshelf`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BooksInBookshelf` (
  `BookId` CHAR(11) NOT NULL,
  `BookshelfId` INT NOT NULL,
  `DateAdded` DATETIME NOT NULL,
  PRIMARY KEY (`BookId`, `BookshelfId`),
  INDEX `FK_BookshelfId_idx` (`BookshelfId` ASC) INVISIBLE,
  CONSTRAINT `FK_BookId`
    FOREIGN KEY (`BookId`)
    REFERENCES `mydb`.`Book` (`GoogleBooksID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BookshelfId`
    FOREIGN KEY (`BookshelfId`)
    REFERENCES `mydb`.`Bookshelf` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
