/*
  Warnings:

  - Added the required column `status` to the `locks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `locks` ADD COLUMN `status` BOOLEAN NOT NULL;
