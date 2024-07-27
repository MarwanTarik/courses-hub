import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '../../enums/gender.enum';
import { Role } from '../../enums/role.enum';

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
  @IsEnum(Role)
  role?: Role;
}
