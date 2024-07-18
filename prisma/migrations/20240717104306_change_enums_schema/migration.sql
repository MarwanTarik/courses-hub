/*
  Warnings:

  - The values [STUDENT,ADMIN,GUEST] on the enum `Roles_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE] on the enum `Users_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Roles` MODIFY `role` ENUM('student', 'admin', 'guest') NOT NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `gender` ENUM('male', 'female') NOT NULL;
