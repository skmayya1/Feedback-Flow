/*
  Warnings:

  - You are about to drop the column `DownVotes` on the `feedback` table. All the data in the column will be lost.
  - The `upVotes` column on the `feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "DownVotes",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wasInvited" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "upVotes",
ADD COLUMN     "upVotes" TEXT[] DEFAULT ARRAY[]::TEXT[];
