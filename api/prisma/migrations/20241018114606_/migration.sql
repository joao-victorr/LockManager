-- CreateTable
CREATE TABLE `users_web` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_web_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locks` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `users` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `locks_ip_key`(`ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_groups` (
    `id` VARCHAR(191) NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_users` VARCHAR(191) NOT NULL,
    `id_groups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_locks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_users` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups_locks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_groups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_zones` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

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
CREATE TABLE `time_spans_locks` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeSpans` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acccess_rules` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_locks` VARCHAR(191) NOT NULL,
    `id_TimeZones` VARCHAR(191) NOT NULL,
    `id_groups` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_locks` ADD CONSTRAINT `users_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_locks` ADD CONSTRAINT `users_locks_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_locks` ADD CONSTRAINT `groups_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_locks` ADD CONSTRAINT `groups_locks_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_locks` ADD CONSTRAINT `time_zones_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_zones_locks` ADD CONSTRAINT `time_zones_locks_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans` ADD CONSTRAINT `time_spans_time_zones_id_fkey` FOREIGN KEY (`time_zones_id`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_locks` ADD CONSTRAINT `time_spans_locks_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_spans_locks` ADD CONSTRAINT `time_spans_locks_id_TimeSpans_fkey` FOREIGN KEY (`id_TimeSpans`) REFERENCES `time_spans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
