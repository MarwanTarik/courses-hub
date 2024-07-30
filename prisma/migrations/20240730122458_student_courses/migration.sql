/*
  Warnings:

  - You are about to drop the column `registred_courses_id` on the `Students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_registred_courses_id_fkey`;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `registred_courses_id`;

-- CreateTable
CREATE TABLE `StudentCourses` (
    `student_id` INTEGER NOT NULL,
    `courses_id` INTEGER NOT NULL,

    UNIQUE INDEX `StudentCourses_student_id_key`(`student_id`),
    UNIQUE INDEX `StudentCourses_courses_id_key`(`courses_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_courses_id_fkey` FOREIGN KEY (`courses_id`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
