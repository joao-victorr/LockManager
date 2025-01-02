/*
  Warnings:

  - You are about to drop the column `code` on the `groupsDevices` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `timeZonesDevices` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `usersDevices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `groupsDevices` DROP COLUMN `code`;

-- AlterTable
ALTER TABLE `timeZonesDevices` DROP COLUMN `code`;

-- AlterTable
ALTER TABLE `usersDevices` DROP COLUMN `code`;
