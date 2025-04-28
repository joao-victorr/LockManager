-- AlterTable
ALTER TABLE `devices` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `groups` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `timeSpans` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `timeZones` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usersWeb` MODIFY `isDelete` BOOLEAN NOT NULL DEFAULT false;
