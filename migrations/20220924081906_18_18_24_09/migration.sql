/*
  Warnings:

  - Added the required column `isEdited` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `isEdited` BOOLEAN NOT NULL;
