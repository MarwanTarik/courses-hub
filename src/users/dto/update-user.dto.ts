import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { Role } from '../../enums/role.enum';
import { Role as PrismaRole, Gender as PrismaGender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsEnum(Gender)
  @IsOptional()
  gender?: PrismaGender;

  @ApiProperty({ enum: Role, example: Role.student })
  @IsOptional()
  @IsEnum(Role)
  role?: PrismaRole;
}
