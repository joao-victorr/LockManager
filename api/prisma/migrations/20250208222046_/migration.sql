/*
  Warnings:

  - You are about to alter the column `sun` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `mon` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `tue` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `wed` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `thu` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `fri` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `sat` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `hol1` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `hol2` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `hol3` on the `timeSpans` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - A unique constraint covering the columns `[idGroups,idDevices]` on the table `groupsDevices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idTimeSpans,idDevices]` on the table `timeSpansDevices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idTimeZones,idDevices]` on the table `timeZonesDevices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsers,idGroups]` on the table `usersGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `timeSpans` MODIFY `sun` BOOLEAN NOT NULL,
    MODIFY `mon` BOOLEAN NOT NULL,
    MODIFY `tue` BOOLEAN NOT NULL,
    MODIFY `wed` BOOLEAN NOT NULL,
    MODIFY `thu` BOOLEAN NOT NULL,
    MODIFY `fri` BOOLEAN NOT NULL,
    MODIFY `sat` BOOLEAN NOT NULL,
    MODIFY `hol1` BOOLEAN NOT NULL,
    MODIFY `hol2` BOOLEAN NOT NULL,
    MODIFY `hol3` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `groupsDevices_idGroups_idDevices_key` ON `groupsDevices`(`idGroups`, `idDevices`);

-- CreateIndex
CREATE UNIQUE INDEX `timeSpansDevices_idTimeSpans_idDevices_key` ON `timeSpansDevices`(`idTimeSpans`, `idDevices`);

-- CreateIndex
CREATE UNIQUE INDEX `timeZonesDevices_idTimeZones_idDevices_key` ON `timeZonesDevices`(`idTimeZones`, `idDevices`);

-- CreateIndex
CREATE UNIQUE INDEX `usersGroups_idUsers_idGroups_key` ON `usersGroups`(`idUsers`, `idGroups`);
