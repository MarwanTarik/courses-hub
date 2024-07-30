import { IsString, IsInt } from 'class-validator';

export class CourseDto {
  @IsString()
  name: string;

  @IsInt()
  creditHours: number;

  @IsString()
  department: string;

  @IsString()
  code: string;
}
