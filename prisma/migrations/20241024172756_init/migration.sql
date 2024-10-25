-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "kindeID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_kindeID_key" ON "user"("kindeID");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
