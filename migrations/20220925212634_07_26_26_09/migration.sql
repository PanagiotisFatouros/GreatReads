/*
  Warnings:

  - Added the required column `creationDate` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `note` ADD COLUMN `creationDate` DATETIME(3) NOT NULL;
