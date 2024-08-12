import {
  Level as PrismaLevel,
  Department as PrismaDepartment,
} from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Level } from '../../../enums/level.enum';
import { Department } from '../../../enums/department.enum';

export class UpdateStudentDto {
  @IsNumber()
  @IsOptional()
  gpa?: number;

  @IsEnum(Level)
  @IsOptional()
  level?: PrismaLevel;

  @IsEnum(Department)
  @IsOptional()
  department?: PrismaDepartment;
}
