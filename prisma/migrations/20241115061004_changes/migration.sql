/*
  Warnings:

  - Added the required column `CompanyID` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "CompanyID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_CompanyID_fkey" FOREIGN KEY ("CompanyID") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
