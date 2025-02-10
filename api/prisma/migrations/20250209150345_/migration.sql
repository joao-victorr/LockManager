/*
  Warnings:

  - You are about to drop the column `end` on the `timeSpans` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `timeSpans` table. All the data in the column will be lost.
  - Added the required column `endHors` to the `timeSpans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHors` to the `timeSpans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timeSpans` DROP COLUMN `end`,
    DROP COLUMN `start`,
    ADD COLUMN `endHors` INTEGER NOT NULL,
    ADD COLUMN `startHors` INTEGER NOT NULL;
