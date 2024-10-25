-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verifyToken" DROP NOT NULL,
ALTER COLUMN "verifyTokenExpire" DROP NOT NULL;
