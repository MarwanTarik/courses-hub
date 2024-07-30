/*
  Warnings:

  - You are about to drop the column `cose` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code_id]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[department_id]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code_id` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credit_hours` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Courses_cose_key` ON `Courses`;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `cose`,
    DROP COLUMN `hours`,
    ADD COLUMN `code_id` INTEGER NOT NULL,
    ADD COLUMN `credit_hours` INTEGER NOT NULL,
    ADD COLUMN `department_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CoursesCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CoursesCode_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_code_id_key` ON `Courses`(`code_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Courses_department_id_key` ON `Courses`(`department_id`);

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_code_id_fkey` FOREIGN KEY (`code_id`) REFERENCES `CoursesCode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
