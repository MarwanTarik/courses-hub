import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../enums/role.enum';
import { Gender } from '../../enums/gender.enum';
import { Role as PrismaRole, Gender as PrismaGender } from '@prisma/client';

export class CreateUserDto {
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
  gender: PrismaGender;

  @IsOptional()
  @IsEnum(Role)
  role?: PrismaRole;
}
