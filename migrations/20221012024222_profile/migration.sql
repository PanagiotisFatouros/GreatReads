/*
  Warnings:

  - You are about to drop the column `profilePic` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `profilePic`,
    ADD COLUMN `profilePicExt` ENUM('PNG', 'JPEG', 'JPG') NULL;
