import { Departments } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Department as DepartmentEnum } from '../../enums/department.enum';
export class CourseDto {
  @IsString()
  name: string;

  @IsNumber()
  creditHours: number;

  @IsString()
  code: string;

  @IsNumber()
  id: number;

  @IsEnum(DepartmentEnum)
  department: Departments;
}
