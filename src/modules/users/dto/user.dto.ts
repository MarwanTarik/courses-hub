import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../../../enums/gender.enum';
import { Roles, Gender as PrismaGender } from '@prisma/client';
import { Role } from '../../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phonenumber: string;

  @IsString()
  address: string;

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsOptional()
  gender: PrismaGender;

  @ApiProperty({ enum: Role, example: Role.student })
  @IsEnum(Role)
  role: Roles;

  @IsString()
  @IsOptional()
  password?: string;
}
