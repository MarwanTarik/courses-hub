import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../../enums/role.enum';
import { Gender } from '../../enums/gender.enum';
import { Role as PrismaRole, Gender as PrismaGender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsEnum(Gender)
  gender: PrismaGender;

  @ApiProperty({ enum: Role, example: Role.student })
  @IsEnum(Role)
  role: PrismaRole;
}
