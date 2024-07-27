import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { Role } from '../../enums/role.enum';
import { Role as PrismaRole, Gender as PrismaGender } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phonenumber?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: PrismaGender;

  @IsOptional()
  @IsEnum(Role)
  role?: PrismaRole;
}
