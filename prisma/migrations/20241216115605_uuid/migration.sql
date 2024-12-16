/*
  Warnings:

  - The primary key for the `UserRead` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserRead" DROP CONSTRAINT "UserRead_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserRead_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserRead_id_seq";
