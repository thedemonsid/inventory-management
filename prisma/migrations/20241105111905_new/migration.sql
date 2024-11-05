/*
  Warnings:

  - You are about to drop the `Fiber` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ACCESSORIES', 'SPARE_PARTS', 'FIBER');

-- DropTable
DROP TABLE "Fiber";

-- DropEnum
DROP TYPE "Part";

-- CreateTable
CREATE TABLE "buyers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "email" TEXT,
    "address" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "purchasePrice" DECIMAL(8,2) NOT NULL,
    "mrp" DECIMAL(8,2) NOT NULL,
    "sellingPrice" DECIMAL(8,2) NOT NULL,
    "category" "Category" NOT NULL,
    "rackNumber" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vectorEmbed" DOUBLE PRECISION[],

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(8,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buyers_email_key" ON "buyers"("email");

-- CreateIndex
CREATE INDEX "buyers_name_idx" ON "buyers"("name");

-- CreateIndex
CREATE INDEX "buyers_id_idx" ON "buyers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "parts_code_key" ON "parts"("code");

-- CreateIndex
CREATE INDEX "parts_code_idx" ON "parts"("code");

-- CreateIndex
CREATE INDEX "parts_category_idx" ON "parts"("category");

-- CreateIndex
CREATE INDEX "parts_rackNumber_idx" ON "parts"("rackNumber");

-- CreateIndex
CREATE INDEX "purchases_buyerId_idx" ON "purchases"("buyerId");

-- CreateIndex
CREATE INDEX "purchases_partId_idx" ON "purchases"("partId");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_partId_fkey" FOREIGN KEY ("partId") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
