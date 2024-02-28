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
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_locks_fkey` FOREIGN KEY (`id_locks`) REFERENCES `locks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_TimeZones_fkey` FOREIGN KEY (`id_TimeZones`) REFERENCES `time_zones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acccess_rules` ADD CONSTRAINT `acccess_rules_id_groups_fkey` FOREIGN KEY (`id_groups`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
