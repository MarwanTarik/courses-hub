import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../../enums/gender.enum';
import { Gender as PrismaGender } from '@prisma/client';
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
  phonenumber?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsEnum(Gender)
  @IsOptional()
  gender?: PrismaGender;
}
