import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseDto } from '../dto/course.dto';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto): Promise<CourseDto> {
    const course = await this.prisma.courses.create({
      data: {
        name: data.name,
        creditHours: data.creditHours,
        department: {
          connect: {
            department: data.department,
          },
        },
        code: {
          connect: {
            code: data.code,
          },
        },
      },
      select: {
        name: true,
        creditHours: true,
        department: {
          select: {
            department: true,
          },
        },
        code: {
          select: {
            code: true,
          },
        },
      },
    });

    return {
      ...course,
      code: course.code.code,
      department: course.department.department,
    };
  }

  async findAll(): Promise<CourseDto[]> {
    const courses = await this.prisma.courses.findMany({
      select: {
        name: true,
        creditHours: true,
        department: {
          select: {
            department: true,
          },
        },
        code: {
          select: {
            code: true,
          },
        },
      },
    });

    return courses.map((course) => {
      return {
        ...course,
        code: course.code.code,
        department: course.department.department,
      };
    });
  }

  async findOne(id: number): Promise<CourseDto> {
    const course = await this.prisma.courses.findUnique({
      select: {
        name: true,
        creditHours: true,
        department: {
          select: {
            department: true,
          },
        },
        code: {
          select: {
            code: true,
          },
        },
      },
      where: { id },
    });

    return {
      ...course,
      code: course.code.code,
      department: course.department.department,
    };
  }

  async update(id: number, data: UpdateCourseDto): Promise<CourseDto> {
    const course = await this.prisma.courses.update({
      select: {
        name: true,
        creditHours: true,
        department: {
          select: {
            department: true,
          },
        },
        code: {
          select: {
            code: true,
          },
        },
      },
      data: {
        name: data?.name,
        creditHours: data?.creditHours,
        department: {
          connect: {
            department: data?.department,
          },
        },
        ...(data?.code && {
          code: {
            connect: {
              code: data?.code,
            },
          },
        }),
      },
      where: { id },
    });

    return {
      ...course,
      code: course.code.code,
      department: course.department.department,
    };
  }

  async delete(id: number): Promise<CourseDto> {
    const course = await this.prisma.courses.delete({
      select: {
        name: true,
        creditHours: true,
        department: {
          select: {
            department: true,
          },
        },
        code: {
          select: {
            code: true,
          },
        },
      },
      where: {
        id,
      },
    });

    return {
      ...course,
      code: course.code.code,
      department: course.department.department,
    };
  }
}
