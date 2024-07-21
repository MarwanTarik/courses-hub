import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Role } from 'src/enums/role.enum';

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
  gender?: Gender;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
