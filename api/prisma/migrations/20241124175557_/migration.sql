/*
  Warnings:

  - You are about to drop the `acccess_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups_devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_spans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_spans_devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_zones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_zones_devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_web` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `acccess_rules` DROP FOREIGN KEY `acccess_rules_id_TimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `acccess_rules` DROP FOREIGN KEY `acccess_rules_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `acccess_rules` DROP FOREIGN KEY `acccess_rules_id_groups_fkey`;

-- DropForeignKey
ALTER TABLE `groups_devices` DROP FOREIGN KEY `groups_devices_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `groups_devices` DROP FOREIGN KEY `groups_devices_id_groups_fkey`;

-- DropForeignKey
ALTER TABLE `time_spans` DROP FOREIGN KEY `time_spans_time_zones_id_fkey`;

-- DropForeignKey
ALTER TABLE `time_spans_devices` DROP FOREIGN KEY `time_spans_devices_id_TimeSpans_fkey`;

-- DropForeignKey
ALTER TABLE `time_spans_devices` DROP FOREIGN KEY `time_spans_devices_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `time_zones_devices` DROP FOREIGN KEY `time_zones_devices_id_TimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `time_zones_devices` DROP FOREIGN KEY `time_zones_devices_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `users_devices` DROP FOREIGN KEY `users_devices_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `users_devices` DROP FOREIGN KEY `users_devices_id_users_fkey`;

-- DropForeignKey
ALTER TABLE `users_groups` DROP FOREIGN KEY `users_groups_id_devices_fkey`;

-- DropForeignKey
ALTER TABLE `users_groups` DROP FOREIGN KEY `users_groups_id_groups_fkey`;

-- DropForeignKey
ALTER TABLE `users_groups` DROP FOREIGN KEY `users_groups_id_users_fkey`;

-- DropTable
DROP TABLE `acccess_rules`;

-- DropTable
DROP TABLE `groups_devices`;

-- DropTable
DROP TABLE `time_spans`;

-- DropTable
DROP TABLE `time_spans_devices`;

-- DropTable
DROP TABLE `time_zones`;

-- DropTable
DROP TABLE `time_zones_devices`;

-- DropTable
DROP TABLE `users_devices`;

-- DropTable
DROP TABLE `users_groups`;

-- DropTable
DROP TABLE `users_web`;

-- CreateTable
CREATE TABLE `usersWeb` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usersWeb_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersGroups` (
    `id` VARCHAR(191) NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idUsers` VARCHAR(191) NOT NULL,
    `idGroups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersDevices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idUsers` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groupsDevices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idGroups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeZones` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeZonesDevices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idTimeZones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeSpans` (
    `id` VARCHAR(191) NOT NULL,
    `start` INTEGER NOT NULL,
    `end` INTEGER NOT NULL,
    `sun` INTEGER NOT NULL,
    `mon` INTEGER NOT NULL,
    `tue` INTEGER NOT NULL,
    `wed` INTEGER NOT NULL,
    `thu` INTEGER NOT NULL,
    `fri` INTEGER NOT NULL,
    `sat` INTEGER NOT NULL,
    `hol1` INTEGER NOT NULL,
    `hol2` INTEGER NOT NULL,
    `hol3` INTEGER NOT NULL,
    `timeZonesId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeSpansDevices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idTimeSpans` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acccessRules` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `idDevices` VARCHAR(191) NOT NULL,
    `idTimeZones` VARCHAR(191) NOT NULL,
    `idGroups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usersGroups` ADD CONSTRAINT `usersGroups_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersGroups` ADD CONSTRAINT `usersGroups_idUsers_fkey` FOREIGN KEY (`idUsers`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersGroups` ADD CONSTRAINT `usersGroups_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersDevices` ADD CONSTRAINT `usersDevices_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersDevices` ADD CONSTRAINT `usersDevices_idUsers_fkey` FOREIGN KEY (`idUsers`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsDevices` ADD CONSTRAINT `groupsDevices_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsDevices` ADD CONSTRAINT `groupsDevices_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeZonesDevices` ADD CONSTRAINT `timeZonesDevices_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeZonesDevices` ADD CONSTRAINT `timeZonesDevices_idTimeZones_fkey` FOREIGN KEY (`idTimeZones`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeSpans` ADD CONSTRAINT `timeSpans_timeZonesId_fkey` FOREIGN KEY (`timeZonesId`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeSpansDevices` ADD CONSTRAINT `timeSpansDevices_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeSpansDevices` ADD CONSTRAINT `timeSpansDevices_idTimeSpans_fkey` FOREIGN KEY (`idTimeSpans`) REFERENCES `timeSpans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccessRules` ADD CONSTRAINT `acccessRules_idDevices_fkey` FOREIGN KEY (`idDevices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccessRules` ADD CONSTRAINT `acccessRules_idTimeZones_fkey` FOREIGN KEY (`idTimeZones`) REFERENCES `timeZones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccessRules` ADD CONSTRAINT `acccessRules_idGroups_fkey` FOREIGN KEY (`idGroups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
