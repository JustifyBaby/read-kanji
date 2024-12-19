/*
  Warnings:

  - You are about to drop the column `highRater` on the `UserRead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRead" DROP COLUMN "highRater",
ADD COLUMN     "good" TEXT[];
