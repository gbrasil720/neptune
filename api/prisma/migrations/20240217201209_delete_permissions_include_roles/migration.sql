/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'MODERATOR', 'SUBSCRIBER', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "RoleEnum" NOT NULL DEFAULT 'MEMBER';

-- DropTable
DROP TABLE "Permission";
