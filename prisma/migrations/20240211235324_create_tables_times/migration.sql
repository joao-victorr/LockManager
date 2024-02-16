-- DropIndex
DROP INDEX `locks_name_key` ON `locks`;

-- CreateTable
CREATE TABLE `time_zones` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeZonesLocks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeZones` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_spans` (
    `id` VARCHAR(191) NOT NULL,
    `time_zones_id` VARCHAR(191) NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeSpansLocks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeSpans` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimeZonesLocks` ADD CONSTRAINT `TimeZonesLocks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeZonesLocks` ADD CONSTRAINT `TimeZonesLocks_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans` ADD CONSTRAINT `time_spans_time_zones_id_fkey` FOREIGN KEY (`time_zones_id`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeSpansLocks` ADD CONSTRAINT `TimeSpansLocks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeSpansLocks` ADD CONSTRAINT `TimeSpansLocks_id_TimeSpans_fkey` FOREIGN KEY (`id_TimeSpans`) REFERENCES `time_spans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
