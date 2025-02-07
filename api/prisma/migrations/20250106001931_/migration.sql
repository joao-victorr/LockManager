/*
  Warnings:

  - A unique constraint covering the columns `[idUsers,idDevices]` on the table `usersDevices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `usersDevices_idUsers_idDevices_key` ON `usersDevices`(`idUsers`, `idDevices`);
