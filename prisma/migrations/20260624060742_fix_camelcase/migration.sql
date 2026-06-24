/*
  Warnings:

  - You are about to drop the column `is_favourite` on the `Favourite` table. All the data in the column will be lost.
  - You are about to drop the column `completed_list` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `is_liked` on the `Like` table. All the data in the column will be lost.
  - Added the required column `completedList` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "is_favourite",
ADD COLUMN     "isFavourite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "completed_list",
ADD COLUMN     "completedList" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "is_liked",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;
