/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Fiber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fiber_code_key" ON "Fiber"("code");
