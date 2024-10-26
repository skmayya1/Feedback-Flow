/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_url_key" ON "organization"("url");
