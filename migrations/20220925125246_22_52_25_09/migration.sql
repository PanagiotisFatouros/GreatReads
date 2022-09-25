/*
  Warnings:

  - You are about to drop the `_booktobookshelf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktobookshelf` DROP FOREIGN KEY `_BookToBookshelf_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktobookshelf` DROP FOREIGN KEY `_BookToBookshelf_B_fkey`;

-- DropForeignKey
ALTER TABLE `collection` DROP FOREIGN KEY `collection_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_bookId_fkey`;

-- DropTable
DROP TABLE `_booktobookshelf`;

-- DropTable
DROP TABLE `book`;

-- CreateTable
CREATE TABLE `PrismaBook` (
    `googleBooksId` CHAR(12) NOT NULL,

    UNIQUE INDEX `PrismaBook_googleBooksId_key`(`googleBooksId`),
    PRIMARY KEY (`googleBooksId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PrismaBookToPrismaBookshelf` (
    `A` CHAR(12) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PrismaBookToPrismaBookshelf_AB_unique`(`A`, `B`),
    INDEX `_PrismaBookToPrismaBookshelf_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `collection` ADD CONSTRAINT `collection_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `PrismaBook`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `PrismaBook`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrismaBookToPrismaBookshelf` ADD CONSTRAINT `_PrismaBookToPrismaBookshelf_A_fkey` FOREIGN KEY (`A`) REFERENCES `PrismaBook`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrismaBookToPrismaBookshelf` ADD CONSTRAINT `_PrismaBookToPrismaBookshelf_B_fkey` FOREIGN KEY (`B`) REFERENCES `bookshelf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
