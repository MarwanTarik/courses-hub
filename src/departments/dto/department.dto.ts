import { IsString } from 'class-validator';

export class DepartmentDto {
  @IsString()
  department: string;
}
