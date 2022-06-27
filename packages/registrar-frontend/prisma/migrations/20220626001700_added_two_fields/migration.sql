/*
  Warnings:

  - Added the required column `City` to the `Contributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CodePostale` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contributor` ADD COLUMN `City` VARCHAR(20) NOT NULL,
    ADD COLUMN `CodePostale` VARCHAR(10) NOT NULL;
