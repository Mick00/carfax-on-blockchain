/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Contributor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectorOfActivity` VARCHAR(30) NOT NULL,
    `dateOfRegistration` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `Address` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `website` VARCHAR(130) NOT NULL,
    `PhoneNumber` VARCHAR(130) NOT NULL,
    `walletAdress` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
