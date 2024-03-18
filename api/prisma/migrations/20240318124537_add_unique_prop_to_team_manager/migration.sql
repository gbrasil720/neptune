/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `TeamManager` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeamManager_id_key" ON "TeamManager"("id");
