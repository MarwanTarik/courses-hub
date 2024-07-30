import { IsInt } from 'class-validator';

export class CreateLevelDto {
  @IsInt()
  level: number;
}
