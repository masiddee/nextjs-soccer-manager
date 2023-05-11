/*
  Warnings:

  - Changed the type of `startDate` on the `League` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `League` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "League" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "loginsCount" INTEGER;
