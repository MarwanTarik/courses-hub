import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDto } from '../dto/courses.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto): Promise<CourseDto> {
    const { code, departmentId, creditHours, name } = data;

    const res = this.prisma.courses.create({
      data: {
        code,
        name,
        departmentId,
        creditHours,
      },
      select: {
        id: true,
        name: true,
        code: true,
        creditHours: true,
        department: {
          select: {
            id: true,
            department: true,
          },
        },
      },
    });

    return res;
  }

  async findAll(): Promise<CourseDto[]> {
    return this.prisma.courses.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        creditHours: true,
        department: true,
      },
    });
  }

  async findOne(id: number): Promise<CourseDto> {
    return this.prisma.courses.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        code: true,
        creditHours: true,
        department: true,
      },
    });
  }

  async update(id: number, data: UpdateCourseDto): Promise<CourseDto> {
    return this.prisma.courses.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        code: true,
        creditHours: true,
        department: true,
      },
    });
  }

  async delete(id: number): Promise<CourseDto> {
    return this.prisma.courses.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        code: true,
        creditHours: true,
        department: true,
      },
    });
  }
}
