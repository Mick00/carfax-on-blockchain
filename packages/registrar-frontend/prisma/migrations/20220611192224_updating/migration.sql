/*
  Warnings:

  - Added the required column `companyName` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contributor` ADD COLUMN `companyName` VARCHAR(40) NOT NULL;
