/*
  Warnings:

  - The values [PNG,JPEG,JPG] on the enum `user_profilePicExt` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `profilePicExt` ENUM('png', 'jpeg', 'jpg') NULL;
