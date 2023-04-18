-- CreateEnum
CREATE TYPE "UserSkillOptions" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('INVITED', 'JOINED', 'DECLINED', 'CAPTAIN');

-- CreateEnum
CREATE TYPE "UserGenderOptions" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "PreferredPositionOptions" AS ENUM ('GOALIE', 'DEFENDER', 'MIDFIELDER', 'STRIKER', 'WINGER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "modifiedBy" INTEGER NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "gender" "UserGenderOptions" NOT NULL,
    "preferredPosition" "PreferredPositionOptions" NOT NULL,
    "skillLevel" "UserSkillOptions" NOT NULL,
    "status" "UserAccountStatus" NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "captainInterest" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
