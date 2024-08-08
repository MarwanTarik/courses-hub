import { IsDecimal, IsObject, IsString } from 'class-validator';
import {
  Prisma,
  Departments as PrismaDepartments,
  Levels as PrismaLevels,
} from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';

export class StudentDto {
  @IsString()
  studentId: string;

  @IsDecimal()
  gpa: Prisma.Decimal;

  @IsObject()
  level: PrismaLevels;

  @IsObject()
  department: PrismaDepartments;

  @IsObject()
  user: UserDto;
}
