-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` CHAR(100) NOT NULL,
    `email_confirm` BOOLEAN NOT NULL DEFAULT false,
    `user_name` CHAR(30) NOT NULL,
    `first_name` CHAR(30) NOT NULL,
    `last_name` CHAR(30) NOT NULL,
    `password` CHAR(255) NOT NULL,
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'no_avatar.jpg',
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_user_name_key`(`user_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'category.jpg',
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `des` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(300) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `Price` FLOAT NULL,
    `calories` FLOAT NULL,

    INDEX `products_category_id_fkey`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
