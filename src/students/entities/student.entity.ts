import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentDto } from '../dto/student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

const studentSelect = {
  studentId: true,
  gpa: true,
  level: true,
  department: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      phonenumber: true,
      address: true,
      gender: true,
      role: true,
    },
  },
};

@Injectable()
export class StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStudentDto): Promise<StudentDto> {
    const { user, ...studentData } = data;

    const res = this.prisma.students.create({
      data: {
        studentId: studentData.studentId,
        gpa: studentData.gpa,
        level: {
          connect: {
            level: studentData.level,
          },
        },
        department: {
          connect: {
            department: studentData.department,
          },
        },
        user: {
          create: {
            name: user.name,
            email: user.email,
            password: user.password,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: {
              connect: {
                role: Role.student,
              },
            },
          },
        },
      },
      select: studentSelect,
    });

    return res;
  }

  async findAll(): Promise<StudentDto[] | null> {
    return await this.prisma.students.findMany({
      select: studentSelect,
    });
  }

  async findOne(id: number): Promise<StudentDto | null> {
    return await this.prisma.students.findUnique({
      where: {
        userId: id,
      },
      select: studentSelect,
    });
  }

  async update(id: number, data: UpdateStudentDto): Promise<StudentDto | null> {
    const updateData: Partial<Prisma.StudentsUpdateInput> = {};

    if (data.gpa) {
      updateData.gpa = data.gpa;
    }
    if (data.level) {
      updateData.level = {
        connect: {
          level: data.level,
        },
      };
    }
    if (data.department) {
      updateData.department = {
        connect: {
          department: data.department,
        },
      };
    }

    return await this.prisma.students.update({
      where: {
        userId: id,
      },
      data: updateData,
      select: studentSelect,
    });
  }

  async delete(id: number): Promise<StudentDto | null> {
    return await this.prisma.students.delete({
      where: {
        userId: id,
      },
      select: studentSelect,
    });
  }
}
