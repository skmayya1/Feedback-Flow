/*
  Warnings:

  - You are about to drop the column `created_at` on the `feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "created_at",
ALTER COLUMN "upVotes" SET DEFAULT 0,
ALTER COLUMN "DownVotes" SET DEFAULT 0,
ALTER COLUMN "DateofFeedback" SET DEFAULT CURRENT_TIMESTAMP;
