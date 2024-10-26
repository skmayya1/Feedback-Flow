-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "avg_rating" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "family_name" DROP NOT NULL,
ALTER COLUMN "given_name" DROP NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL;
