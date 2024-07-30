/*
  Warnings:

  - You are about to drop the column `code_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `credit_hours` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `courses_id` on the `StudentCourses` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `StudentCourses` table. All the data in the column will be lost.
  - You are about to drop the column `class_rank` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `level_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codeId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `StudentCourses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coursesId]` on the table `StudentCourses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departmentId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeId` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditHours` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursesId` to the `StudentCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classRank` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_code_id_fkey`;

-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `StudentCourses` DROP FOREIGN KEY `StudentCourses_courses_id_fkey`;

-- DropForeignKey
ALTER TABLE `StudentCourses` DROP FOREIGN KEY `StudentCourses_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_level_id_fkey`;

-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_user_id_fkey`;

-- DropIndex
DROP INDEX `Students_student_id_key` ON `Students`;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `code_id`,
    DROP COLUMN `credit_hours`,
    DROP COLUMN `department_id`,
    ADD COLUMN `codeId` INTEGER NOT NULL,
    ADD COLUMN `creditHours` INTEGER NOT NULL,
    ADD COLUMN `departmentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `StudentCourses` DROP COLUMN `courses_id`,
    DROP COLUMN `student_id`,
    ADD COLUMN `coursesId` INTEGER NOT NULL,
    ADD COLUMN `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `class_rank`,
    DROP COLUMN `department_id`,
    DROP COLUMN `level_id`,
    DROP COLUMN `student_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `classRank` INTEGER NOT NULL,
    ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `levelId` INTEGER NOT NULL,
    ADD COLUMN `studentId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_codeId_key` ON `Courses`(`codeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Courses_departmentId_key` ON `Courses`(`departmentId`);

-- CreateIndex
CREATE UNIQUE INDEX `StudentCourses_studentId_key` ON `StudentCourses`(`studentId`);

-- CreateIndex
CREATE UNIQUE INDEX `StudentCourses_coursesId_key` ON `StudentCourses`(`coursesId`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_userId_key` ON `Students`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_studentId_key` ON `Students`(`studentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_levelId_key` ON `Students`(`levelId`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_departmentId_key` ON `Students`(`departmentId`);

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Levels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_codeId_fkey` FOREIGN KEY (`codeId`) REFERENCES `CoursesCode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_coursesId_fkey` FOREIGN KEY (`coursesId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
