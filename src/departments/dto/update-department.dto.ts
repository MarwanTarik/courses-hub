import { PartialType } from '@nestjs/swagger';
import { DepartmentDto } from './department.dto';

export class UpdateDepartmentDto extends PartialType(DepartmentDto) {}
