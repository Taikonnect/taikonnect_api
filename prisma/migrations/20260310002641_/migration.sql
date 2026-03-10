/*
  Warnings:

  - You are about to drop the column `emergency_contacts` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emergency_contacts" ADD COLUMN     "relationship" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emergency_contacts";
