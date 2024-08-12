-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
