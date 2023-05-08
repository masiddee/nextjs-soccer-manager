/*
  Warnings:

  - Made the column `pointsFor` on table `Team` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pointsAgainst` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "pointsFor" SET NOT NULL,
ALTER COLUMN "pointsFor" SET DEFAULT 0,
ALTER COLUMN "pointsAgainst" SET NOT NULL,
ALTER COLUMN "pointsAgainst" SET DEFAULT 0;
