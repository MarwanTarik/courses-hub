import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoursesRepository } from './entities/course.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService, CoursesRepository],
})
export class CoursesModule {}
