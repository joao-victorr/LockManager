/*
  Warnings:

  - You are about to drop the column `code` on the `accessRules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idDevices,idGroups,idTimeZones]` on the table `accessRules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `accessRules` DROP COLUMN `code`;

-- CreateIndex
CREATE UNIQUE INDEX `accessRules_idDevices_idGroups_idTimeZones_key` ON `accessRules`(`idDevices`, `idGroups`, `idTimeZones`);
