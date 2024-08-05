import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsNumber()
  departmentId: number;

  @IsString()
  code: string;

  @IsNumber()
  creditHours: number;
}
