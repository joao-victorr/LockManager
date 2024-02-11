/*
  Warnings:

  - Added the required column `code` to the `department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `code` INTEGER NOT NULL;
