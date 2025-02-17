/*
  Warnings:

  - Made the column `open` on table `Model` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "open" SET NOT NULL;
