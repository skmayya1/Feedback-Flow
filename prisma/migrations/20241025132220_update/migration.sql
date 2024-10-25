-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avg_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,
    "avg_rating" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "CustomerID" TEXT NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Header" TEXT NOT NULL,
    "Review" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "DownVotes" INTEGER NOT NULL,
    "DateofExperience" TIMESTAMP(3) NOT NULL,
    "DateofFeedback" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
