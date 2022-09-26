-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `identifier_token` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NULL,
    `name` VARCHAR(70) NOT NULL,
    `bio` VARCHAR(300) NOT NULL,
    `profilePic` VARCHAR(45) NOT NULL,
    `favAuthor` VARCHAR(70) NOT NULL,
    `favGenre` VARCHAR(30) NOT NULL,
    `isAuthor` BOOLEAN NOT NULL,
    `favBook` CHAR(12) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_identifier_token_key`(`identifier_token`),
    UNIQUE INDEX `user_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refresh_token` VARCHAR(512) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `refresh_token_id_key`(`id`),
    UNIQUE INDEX `refresh_token_refresh_token_key`(`refresh_token`),
    INDEX `refresh_token_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `googleBooksId` CHAR(12) NOT NULL,

    UNIQUE INDEX `Book_googleBooksId_key`(`googleBooksId`),
    PRIMARY KEY (`googleBooksId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `upvotes` INTEGER NOT NULL,
    `bookId` CHAR(12) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `collection_id_key`(`id`),
    INDEX `collection_userId_bookId_idx`(`userId`, `bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `content` VARCHAR(100) NOT NULL,
    `collectionId` INTEGER NOT NULL,
    `pageNum` INTEGER NOT NULL,

    UNIQUE INDEX `note_id_key`(`id`),
    INDEX `note_collectionId_idx`(`collectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookshelf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `isDeletable` BOOLEAN NOT NULL,
    `creationDate` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `bookshelf_id_key`(`id`),
    INDEX `bookshelf_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `comment` VARCHAR(300) NOT NULL,
    `rating` TINYINT NOT NULL,
    `creationDate` DATETIME(3) NOT NULL,
    `upvotes` INTEGER NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `review_id_key`(`id`),
    INDEX `review_userId_bookId_idx`(`userId`, `bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToBookshelf` (
    `A` CHAR(12) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToBookshelf_AB_unique`(`A`, `B`),
    INDEX `_BookToBookshelf_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection` ADD CONSTRAINT `collection_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection` ADD CONSTRAINT `collection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookshelf` ADD CONSTRAINT `bookshelf_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToBookshelf` ADD CONSTRAINT `_BookToBookshelf_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`googleBooksId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToBookshelf` ADD CONSTRAINT `_BookToBookshelf_B_fkey` FOREIGN KEY (`B`) REFERENCES `bookshelf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
