-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BRACELET', 'EARRING', 'NECKLACE', 'SPECIAL', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'OTHER';
