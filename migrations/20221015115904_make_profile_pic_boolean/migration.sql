/*
  Warnings:

  - You are about to alter the column `profilePic` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `profilePic` BOOLEAN NOT NULL DEFAULT false;
