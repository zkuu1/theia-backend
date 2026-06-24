/*
  Warnings:

  - You are about to drop the column `is_ban` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_ban",
DROP COLUMN "public_id",
ADD COLUMN     "isBan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publicId" TEXT;
