/*
  Warnings:

  - The primary key for the `groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `groups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `groupsDevices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `groupsDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idGroups` on the `groupsDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `timeSpans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `timeZonesId` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `timeSpansDevices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `timeSpansDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idTimeSpans` on the `timeSpansDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `timeZones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `timeZones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `timeZonesDevices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `timeZonesDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idTimeZones` on the `timeZonesDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `beginTime` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `endTime` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `usersDevices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usersDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idUsers` on the `usersDevices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `usersGroups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usersGroups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idUsers` on the `usersGroups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idGroups` on the `usersGroups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `acccessRules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `acccessRules` DROP FOREIGN KEY `acccessRules_idDevices_fkey`;

-- DropForeignKey
ALTER TABLE `acccessRules` DROP FOREIGN KEY `acccessRules_idGroups_fkey`;

-- DropForeignKey
ALTER TABLE `acccessRules` DROP FOREIGN KEY `acccessRules_idTimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `groupsDevices` DROP FOREIGN KEY `groupsDevices_idGroups_fkey`;

-- DropForeignKey
ALTER TABLE `timeSpans` DROP FOREIGN KEY `timeSpans_timeZonesId_fkey`;

-- DropForeignKey
ALTER TABLE `timeSpansDevices` DROP FOREIGN KEY `timeSpansDevices_idTimeSpans_fkey`;

-- DropForeignKey
ALTER TABLE `timeZonesDevices` DROP FOREIGN KEY `timeZonesDevices_idTimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `usersDevices` DROP FOREIGN KEY `usersDevices_idUsers_fkey`;

-- DropForeignKey
ALTER TABLE `usersGroups` DROP FOREIGN KEY `usersGroups_idGroups_fkey`;

-- DropForeignKey
ALTER TABLE `usersGroups` DROP FOREIGN KEY `usersGroups_idUsers_fkey`;

-- AlterTable
ALTER TABLE `groups` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `groupsDevices` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `idGroups` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timeSpans` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `timeZonesId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timeSpansDevices` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `idTimeSpans` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timeZones` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timeZonesDevices` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `idTimeZones` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `beginTime` INTEGER NULL,
    MODIFY `endTime` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usersDevices` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `idUsers` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usersGroups` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `idUsers` INTEGER NOT NULL,
    MODIFY `idGroups` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `acccessRules`;

-- CreateTable
CREATE TABLE `accessRules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idTimeZones` INTEGER NOT NULL,
    `idGroups` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usersGroups` ADD CONSTRAINT `usersGroups_idUsers_fkey` FOREIGN KEY (`idUsers`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersGroups` ADD CONSTRAINT `usersGroups_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersDevices` ADD CONSTRAINT `usersDevices_idUsers_fkey` FOREIGN KEY (`idUsers`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsDevices` ADD CONSTRAINT `groupsDevices_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeZonesDevices` ADD CONSTRAINT `timeZonesDevices_idTimeZones_fkey` FOREIGN KEY (`idTimeZones`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeSpans` ADD CONSTRAINT `timeSpans_timeZonesId_fkey` FOREIGN KEY (`timeZonesId`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeSpansDevices` ADD CONSTRAINT `timeSpansDevices_idTimeSpans_fkey` FOREIGN KEY (`idTimeSpans`) REFERENCES `timeSpans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessRules` ADD CONSTRAINT `accessRules_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessRules` ADD CONSTRAINT `accessRules_idTimeZones_fkey` FOREIGN KEY (`idTimeZones`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessRules` ADD CONSTRAINT `accessRules_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
