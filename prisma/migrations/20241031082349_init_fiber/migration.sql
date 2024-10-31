-- CreateEnum
CREATE TYPE "Part" AS ENUM ('MG', 'HLV', 'SP', 'TP', 'FULL_KIT', 'HELMET');

-- CreateTable
CREATE TABLE "Fiber" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mrp" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "image" TEXT,
    "part" "Part" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fiber_pkey" PRIMARY KEY ("id")
);
