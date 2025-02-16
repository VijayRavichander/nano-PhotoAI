/*
  Warnings:

  - Added the required column `zipUrl` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "zipUrl" TEXT NOT NULL;
