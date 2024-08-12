import { Grade as PrismaGrade } from '@prisma/client';
import { Grade } from '../../../enums/grade.enum';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class StudentCoursesDto {
  @IsString()
  studentId: string;

  @IsArray()
  @IsString({ each: true })
  coursesIds: string[];

  @IsArray()
  @IsEnum(Grade)
  grades: PrismaGrade[] = [];

  @IsArray()
  @IsNumber()
  scores: number[] = [];
}
