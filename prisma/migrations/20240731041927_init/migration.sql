-- CreateTable
CREATE TABLE "UserRead" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "kanji" TEXT NOT NULL,
    "read" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRead_pkey" PRIMARY KEY ("id")
);
