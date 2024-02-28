/*
  Warnings:

  - You are about to drop the `TimeSpansLocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeZonesLocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TimeSpansLocks` DROP FOREIGN KEY `TimeSpansLocks_id_TimeSpans_fkey`;

-- DropForeignKey
ALTER TABLE `TimeSpansLocks` DROP FOREIGN KEY `TimeSpansLocks_id_locks_fkey`;

-- DropForeignKey
ALTER TABLE `TimeZonesLocks` DROP FOREIGN KEY `TimeZonesLocks_id_TimeZones_fkey`;

-- DropForeignKey
ALTER TABLE `TimeZonesLocks` DROP FOREIGN KEY `TimeZonesLocks_id_locks_fkey`;

-- DropTable
DROP TABLE `TimeSpansLocks`;

-- DropTable
DROP TABLE `TimeZonesLocks`;

-- CreateTable
CREATE TABLE `users_groups` (
    `id` VARCHAR(191) NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_users` VARCHAR(191) NOT NULL,
    `id_groups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_zones_locks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeZones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_spans_locks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeSpans` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_locks` ADD CONSTRAINT `time_zones_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_locks` ADD CONSTRAINT `time_zones_locks_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_locks` ADD CONSTRAINT `time_spans_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_locks` ADD CONSTRAINT `time_spans_locks_id_TimeSpans_fkey` FOREIGN KEY (`id_TimeSpans`) REFERENCES `time_spans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
