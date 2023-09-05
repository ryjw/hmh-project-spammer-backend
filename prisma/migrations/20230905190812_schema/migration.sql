/*
  Warnings:

  - Added the required column `parentId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "children" STRING[];
ALTER TABLE "Message" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Message" ADD COLUMN     "likes" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "Message" ADD COLUMN     "parentId" STRING NOT NULL;
ALTER TABLE "Message" ADD COLUMN     "text" STRING NOT NULL;
