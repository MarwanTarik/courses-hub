import { Grade as PrismaGrade } from '@prisma/client';
import { Grade } from '../../enums/grade.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class StudentCourseDto {
  @IsString()
  studentId: string;

  @IsString()
  courseId: string;

  @IsEnum(Grade)
  grade: PrismaGrade;

  @IsNumber()
  score: number;
}
