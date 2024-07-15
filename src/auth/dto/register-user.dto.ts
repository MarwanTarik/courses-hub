import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phonenumber: string;

  @IsString()
  address: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  studentId?: number;

  @IsOptional()
  roleId?: number;
}
