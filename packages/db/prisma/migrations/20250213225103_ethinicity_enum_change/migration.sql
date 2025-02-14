/*
  Warnings:

  - The values [SouthAsian,AsianAmerican,SouthEastAsian,MiddleEastern,EastAsian] on the enum `ModelEthinicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelEthinicityEnum_new" AS ENUM ('Black', 'White', 'South_Asian', 'Asian_American', 'South_East_Asian', 'Hispanic', 'Middle_Eastern', 'Pacific', 'East_Asian');
ALTER TABLE "Model" ALTER COLUMN "ethinicity" TYPE "ModelEthinicityEnum_new" USING ("ethinicity"::text::"ModelEthinicityEnum_new");
ALTER TYPE "ModelEthinicityEnum" RENAME TO "ModelEthinicityEnum_old";
ALTER TYPE "ModelEthinicityEnum_new" RENAME TO "ModelEthinicityEnum";
DROP TYPE "ModelEthinicityEnum_old";
COMMIT;
