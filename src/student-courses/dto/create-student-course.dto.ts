import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { Grade } from '../../enums/grade.enum';
import { Grade as PrismaGrade } from '@prisma/client';

export class CreateStudentCoursesDto {
  @IsString()
  studentId: string;

  @IsArray()
  @IsString({ each: true })
  coursesIds: string[];

  @IsArray()
  @IsEnum(Grade)
  grades: PrismaGrade[] = [];

  @IsNumber()
  scores: number[] = [];
}
