import {
  Level as PrismaLevel,
  Department as PrismaDepartment,
  Department,
} from '@prisma/client';
import { IsDecimal, IsEnum, IsObject, IsString } from 'class-validator';
import { Level } from '../../enums/level.enum';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateStudentDto {
  @IsString()
  studentId: string;

  @IsDecimal()
  gpa: number;

  @IsEnum(Level)
  level: PrismaLevel;

  @IsEnum(Department)
  department: PrismaDepartment;

  @IsObject()
  user: CreateUserDto;
}
