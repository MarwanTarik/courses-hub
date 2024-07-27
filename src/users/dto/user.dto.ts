import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { Role as PrismaRole, Gender as PrismaGender } from '@prisma/client';
import { Role } from '../../enums/role.enum';

export class UserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

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
