import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepository.findAll();
  }

  findOne(id: number) {
    return this.departmentRepository.findOne(id);
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
