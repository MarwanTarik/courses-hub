import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { Role } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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

  @ApiProperty({ required: false })
  @IsOptional()
  studentId?: number;

  @IsEnum(Role)
  role: Role;
}
