/*
  Warnings:

  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordTokenExpire` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpire` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_verifyToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordToken",
DROP COLUMN "resetPasswordTokenExpire",
DROP COLUMN "sessionId",
DROP COLUMN "verified",
DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpire";
