-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_CustomerID_fkey";

-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "DateofExperience" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "user"("kindeID") ON DELETE RESTRICT ON UPDATE CASCADE;
