-- AlterTable
ALTER TABLE `devices` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `timeSpans` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `timeZones` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `usersWeb` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isDelete` BOOLEAN NOT NULL DEFAULT true;
