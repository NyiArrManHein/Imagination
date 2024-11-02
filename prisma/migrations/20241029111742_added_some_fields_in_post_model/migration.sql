/*
  Warnings:

  - You are about to drop the column `tag` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tag",
ADD COLUMN     "hashtags" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
