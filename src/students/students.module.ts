import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './entities/student.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository, PrismaService],
})
export class StudentsModule {}
