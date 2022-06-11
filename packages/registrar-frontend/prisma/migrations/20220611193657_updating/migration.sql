/*
  Warnings:

  - You are about to drop the column `companyName` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfRegistration` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `sectorOfActivity` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `walletAdress` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Contributor` table. All the data in the column will be lost.
  - Added the required column `CompanyName` to the `Contributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SectorOfActivity` to the `Contributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WalletAddress` to the `Contributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Website` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contributor` DROP COLUMN `companyName`,
    DROP COLUMN `dateOfRegistration`,
    DROP COLUMN `sectorOfActivity`,
    DROP COLUMN `walletAdress`,
    DROP COLUMN `website`,
    ADD COLUMN `CompanyName` VARCHAR(40) NOT NULL,
    ADD COLUMN `DateOfRegistration` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `SectorOfActivity` VARCHAR(30) NOT NULL,
    ADD COLUMN `WalletAddress` VARCHAR(64) NOT NULL,
    ADD COLUMN `Website` VARCHAR(130) NOT NULL;
