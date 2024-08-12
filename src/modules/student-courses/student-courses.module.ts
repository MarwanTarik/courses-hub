import { Module } from '@nestjs/common';
import { StudentCoursesService } from './student-courses.service';
import { StudentCoursesController } from './student-courses.controller';
import { StudentCourseRepository } from './entities/student-course.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StudentCoursesController],
  providers: [StudentCoursesService, StudentCourseRepository, PrismaService],
})
export class StudentCoursesModule {}
