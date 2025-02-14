/*
  Warnings:

  - The values [Brow] on the enum `ModelEyeColorEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelEyeColorEnum_new" AS ENUM ('Brown', 'Blue', 'Hazel', 'Grey');
ALTER TABLE "Model" ALTER COLUMN "eyeColor" TYPE "ModelEyeColorEnum_new" USING ("eyeColor"::text::"ModelEyeColorEnum_new");
ALTER TYPE "ModelEyeColorEnum" RENAME TO "ModelEyeColorEnum_old";
ALTER TYPE "ModelEyeColorEnum_new" RENAME TO "ModelEyeColorEnum";
DROP TYPE "ModelEyeColorEnum_old";
COMMIT;
