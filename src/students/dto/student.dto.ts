import { IsDecimal, IsNumber, IsObject, IsString } from "class-validator";
import { UserDto } from "src/users/dto/user.dto";

export class StudentDto {
  @IsNumber()
  userId: number;

  @IsString()
  studentId: string;

  @IsDecimal()
  gpa: number;
  
  @IsNumber()
  level: number;

  @IsNumber()
  levelId: number;

  @IsString()
  department: string;

  @IsNumber()
  departmentId: number;

  @IsObject()
  user: UserDto;
}