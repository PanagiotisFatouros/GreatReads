/*
  Warnings:

  - You are about to drop the column `profilePicExt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `profilePicExt`,
    ADD COLUMN `profilePic` VARCHAR(191) NULL;
