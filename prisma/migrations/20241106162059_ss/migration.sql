/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryID` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_ProductID_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryID_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_organizationID_fkey";

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "categoryID" TEXT NOT NULL;

-- DropTable
DROP TABLE "product";

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
