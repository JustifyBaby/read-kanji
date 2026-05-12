-- CreateTable
CREATE TABLE "UserRead" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "kanji" TEXT NOT NULL,
    "read" TEXT NOT NULL,
    "good" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserRead_authorId_idx" ON "UserRead"("authorId");
