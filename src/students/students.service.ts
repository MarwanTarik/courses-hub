import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './entities/student.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  create(createStudentDto: Prisma.StudentsCreateInput) {
    return this.studentsRepository.create(createStudentDto);
  }

  findAll() {
    return this.studentsRepository.findAll();
  }

  findOne(id: number) {
    return this.studentsRepository.findOne(id);
  }

  update(id: number, updateStudentDto: Prisma.StudentsUpdateInput) {
    return this.studentsRepository.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentsRepository.delete(id);
  }
}
