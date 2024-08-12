/*
  Warnings:

  - Added the required column `grade` to the `StudentCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `StudentCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudentCourses` ADD COLUMN `grade` ENUM('A_PLUS', 'A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL;
