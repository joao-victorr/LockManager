/*
  Warnings:

  - Added the required column `password` to the `lock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `lock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lock` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `department` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
