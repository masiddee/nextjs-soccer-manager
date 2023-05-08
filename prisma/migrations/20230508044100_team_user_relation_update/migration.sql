/*
  Warnings:

  - Changed the type of `captainId` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "captainId",
ADD COLUMN     "captainId" INTEGER NOT NULL;
