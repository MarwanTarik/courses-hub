/*
  Warnings:

  - A unique constraint covering the columns `[registred_courses_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[level_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[department_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_rank` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_id` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registred_courses_id` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Students` ADD COLUMN `class_rank` INTEGER NOT NULL,
    ADD COLUMN `department_id` INTEGER NOT NULL,
    ADD COLUMN `level_id` INTEGER NOT NULL,
    ADD COLUMN `registred_courses_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hours` INTEGER NOT NULL,
    `cose` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Courses_name_key`(`name`),
    UNIQUE INDEX `Courses_cose_key`(`cose`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,

    UNIQUE INDEX `Levels_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Departments_department_key`(`department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Students_registred_courses_id_key` ON `Students`(`registred_courses_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_level_id_key` ON `Students`(`level_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_department_id_key` ON `Students`(`department_id`);

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_registred_courses_id_fkey` FOREIGN KEY (`registred_courses_id`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_level_id_fkey` FOREIGN KEY (`level_id`) REFERENCES `Levels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
