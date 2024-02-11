-- CreateTable
CREATE TABLE `access_lock` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_lock` VARCHAR(191) NOT NULL,
    `id_access` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `access_lock_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `access_lock` ADD CONSTRAINT `access_lock_id_lock_fkey` FOREIGN KEY (`id_lock`) REFERENCES `lock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `access_lock` ADD CONSTRAINT `access_lock_id_access_fkey` FOREIGN KEY (`id_access`) REFERENCES `access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
