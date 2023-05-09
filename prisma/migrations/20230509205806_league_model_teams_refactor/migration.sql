/*
  Warnings:

  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `preferredPosition` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skillLevel` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('HOME_WIN', 'AWAY_WIN', 'TIE');

-- CreateEnum
CREATE TYPE "FieldNumbers" AS ENUM ('FIELD_1', 'FIELD_2', 'FIELD_3');

-- CreateEnum
CREATE TYPE "LeagueType" AS ENUM ('OPEN', 'COED', 'OVER_30', 'OVER_40', 'WOMEN_AND_NON_BINARY');

-- CreateEnum
CREATE TYPE "LeagueStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PLAYER', 'CAPTAIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserSkill" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('INVITED', 'JOINED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "PreferredPosition" AS ENUM ('GOALIE', 'DEFENDER', 'MIDFIELDER', 'STRIKER', 'WINGER');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "leagueId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType",
DROP COLUMN "gender",
ADD COLUMN     "gender" "UserGender",
DROP COLUMN "preferredPosition",
ADD COLUMN     "preferredPosition" "PreferredPosition",
DROP COLUMN "skillLevel",
ADD COLUMN     "skillLevel" "UserSkill",
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus";

-- DropEnum
DROP TYPE "PreferredPositionOptions";

-- DropEnum
DROP TYPE "UserAccountStatus";

-- DropEnum
DROP TYPE "UserGenderOptions";

-- DropEnum
DROP TYPE "UserSkillOptions";

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "season" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "teamsMax" INTEGER NOT NULL DEFAULT 24,
    "location" TEXT NOT NULL,
    "leagueType" "LeagueType"[],
    "status" "LeagueStatus" NOT NULL,
    "signupDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "homeTeamScore" INTEGER NOT NULL DEFAULT 0,
    "awayTeamScore" INTEGER NOT NULL DEFAULT 0,
    "field" "FieldNumbers",
    "leagueId" INTEGER NOT NULL,
    "gameDateTime" TIMESTAMP(3) NOT NULL,
    "gameResult" "GameResult",
    "isForfeit" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;
