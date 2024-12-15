/*
  Warnings:

  - You are about to drop the column `users` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - Added the required column `user` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` DROP COLUMN `users`,
    ADD COLUMN `user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `image`,
    ADD COLUMN `beginTime` BIGINT NULL,
    ADD COLUMN `endTime` BIGINT NULL;
