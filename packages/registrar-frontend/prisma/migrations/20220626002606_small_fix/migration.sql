/*
  Warnings:

  - You are about to drop the column `CodePostale` on the `Contributor` table. All the data in the column will be lost.
  - Added the required column `CodePostal` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contributor` DROP COLUMN `CodePostale`,
    ADD COLUMN `CodePostal` VARCHAR(10) NOT NULL;
