/*
  Warnings:

  - You are about to drop the column `id_locks` on the `acccess_rules` table. All the data in the column will be lost.
  - You are about to drop the column `id_locks` on the `users_groups` table. All the data in the column will be lost.
  - You are about to drop the `groups_locks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_spans_locks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_zones_locks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_locks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_devices` to the `acccess_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_devices` to the `users_groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acccess_rules` DROP FOREIGN KEY `acccess_rules_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `groups_locks` DROP FOREIGN KEY `groups_locks_id_groups_fkey`;

-- DropForeignKey
ALTER TABLE `groups_locks` DROP FOREIGN KEY `groups_locks_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `time_spans_locks` DROP FOREIGN KEY `time_spans_locks_id_TimeSpans_fkey`;

-- DropForeignKey
ALTER TABLE `time_spans_locks` DROP FOREIGN KEY `time_spans_locks_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `time_zones_locks` DROP FOREIGN KEY `time_zones_locks_id_TimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `time_zones_locks` DROP FOREIGN KEY `time_zones_locks_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `users_groups` DROP FOREIGN KEY `users_groups_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `users_locks` DROP FOREIGN KEY `users_locks_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `users_locks` DROP FOREIGN KEY `users_locks_id_users_fkey`;

-- AlterTable
ALTER TABLE `acccess_rules` DROP COLUMN `id_locks`,
    ADD COLUMN `id_devices` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users_groups` DROP COLUMN `id_locks`,
    ADD COLUMN `id_devices` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `groups_locks`;

-- DropTable
DROP TABLE `locks`;

-- DropTable
DROP TABLE `time_spans_locks`;

-- DropTable
DROP TABLE `time_zones_locks`;

-- DropTable
DROP TABLE `users_locks`;

-- CreateTable
CREATE TABLE `devices` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `users` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `devices_ip_key`(`ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_devices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_devices` VARCHAR(191) NOT NULL,
    `id_users` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups_devices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_devices` VARCHAR(191) NOT NULL,
    `id_groups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_zones_devices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_devices` VARCHAR(191) NOT NULL,
    `id_TimeZones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_spans_devices` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_devices` VARCHAR(191) NOT NULL,
    `id_TimeSpans` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_devices` ADD CONSTRAINT `users_devices_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_devices` ADD CONSTRAINT `users_devices_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_devices` ADD CONSTRAINT `groups_devices_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_devices` ADD CONSTRAINT `groups_devices_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_devices` ADD CONSTRAINT `time_zones_devices_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_devices` ADD CONSTRAINT `time_zones_devices_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_devices` ADD CONSTRAINT `time_spans_devices_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_devices` ADD CONSTRAINT `time_spans_devices_id_TimeSpans_fkey` FOREIGN KEY (`id_TimeSpans`) REFERENCES `time_spans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_devices_fkey` FOREIGN KEY (`id_devices`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
