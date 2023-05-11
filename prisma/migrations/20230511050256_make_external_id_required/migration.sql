/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loginsCount` on the `User` table. All the data in the column will be lost.
  - Made the column `externalUserId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
DROP COLUMN "loginsCount",
ALTER COLUMN "externalUserId" SET NOT NULL;
