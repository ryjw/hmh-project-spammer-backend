/*
  Warnings:

  - You are about to drop the column `children` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "children";
ALTER TABLE "Message" ALTER COLUMN "parentId" DROP NOT NULL;
