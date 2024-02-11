/*
  Warnings:

  - You are about to drop the column `code` on the `department` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `access_lock_code_key` ON `access_lock`;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `code`;

-- CreateTable
CREATE TABLE `department_lock` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `id_lock` VARCHAR(191) NOT NULL,
    `id_department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `department_lock` ADD CONSTRAINT `department_lock_id_lock_fkey` FOREIGN KEY (`id_lock`) REFERENCES `lock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department_lock` ADD CONSTRAINT `department_lock_id_department_fkey` FOREIGN KEY (`id_department`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
