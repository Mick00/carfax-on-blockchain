-- CreateTable
CREATE TABLE `Contributor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CompanyName` VARCHAR(40) NOT NULL,
    `SectorOfActivity` VARCHAR(30) NOT NULL,
    `DateOfRegistration` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `CodePostal` VARCHAR(10) NOT NULL,
    `City` VARCHAR(20) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Website` VARCHAR(130) NOT NULL,
    `PhoneNumber` VARCHAR(130) NOT NULL,
    `WalletAddress` VARCHAR(64) NOT NULL,
    `StateOfRegistration` VARCHAR(2) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
