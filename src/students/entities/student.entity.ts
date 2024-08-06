import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Students, Prisma } from '@prisma/client';

@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.StudentsCreateInput): Promise<Students> {
    return this.prisma.students.create({ data });
  }

  async findAll(): Promise<Students[]> {
    return this.prisma.students.findMany();
  }

  async findOne(id: number): Promise<Students | null> {
    return this.prisma.students.findUnique({ where: { userId: id } });
  }

  async update(
    id: number,
    data: Prisma.StudentsUpdateInput,
  ): Promise<Students> {
    return this.prisma.students.update({ where: { userId: id }, data });
  }

  async delete(id: number): Promise<Students> {
    return this.prisma.students.delete({ where: { userId: id } });
  }
}
