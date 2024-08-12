-- AlterTable
ALTER TABLE `StudentCourses` MODIFY `grade` ENUM('A_PLUS', 'A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D_PLUS', 'D', 'F') NULL,
    MODIFY `score` INTEGER NULL;
