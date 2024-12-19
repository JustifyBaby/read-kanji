/*
  Warnings:

  - You are about to drop the column `good` on the `UserRead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRead" DROP COLUMN "good",
ADD COLUMN     "highRater" TEXT[];
