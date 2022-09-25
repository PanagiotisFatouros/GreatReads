/*
  Warnings:

  - You are about to drop the `prismabook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_prismabooktoprismabookshelf` DROP FOREIGN KEY `_PrismaBookToPrismaBookshelf_A_fkey`;

-- DropForeignKey
ALTER TABLE `collection` DROP FOREIGN KEY `collection_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_bookId_fkey`;

-- DropTable
DROP TABLE `prismabook`;

-- CreateTable
CREATE TABLE `book` (
    `googleBooksId` CHAR(12) NOT NULL,

    UNIQUE INDEX `book_googleBooksId_key`(`googleBooksId`),
    PRIMARY KEY (`googleBooksId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `collection` ADD CONSTRAINT `collection_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrismaBookToPrismaBookshelf` ADD CONSTRAINT `_PrismaBookToPrismaBookshelf_A_fkey` FOREIGN KEY (`A`) REFERENCES `book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;
