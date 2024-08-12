import { CreateStudentCoursesDto } from '../dto/create-student-course.dto';
import { UpdateStudentCoursesDto } from '../dto/update-student-course.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { StudentCoursesDto } from '../dto/student-courses.dto';
import { Injectable } from '@nestjs/common';
import { StudentCourseDto } from '../dto/student-course.dto';

@Injectable()
export class StudentCourseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateStudentCoursesDto): Promise<StudentCoursesDto> {
    const { studentId, coursesIds, grades, scores } = data;

    const records = coursesIds.map((courseId, index) => ({
      studentId,
      courseId,
      grade: grades.length > 0 ? grades[index] : null,
      score: scores.length > 0 ? scores[index] : null,
    }));

    await this.prismaService.studentCourses.createMany({
      data: records,
    });

    return data;
  }

  async findAll(): Promise<StudentCoursesDto[]> {
    const records = await this.prismaService.studentCourses.findMany({
      select: { studentId: true, courseId: true, grade: true, score: true },
    });

    const res = records.reduce((acc, record) => {
      if (!acc[record.studentId]) {
        acc[record.studentId] = {
          studentId: record.studentId,
          coursesIds: [record.courseId],
          grades: [record.grade],
          scores: [record.score],
        };
      } else {
        acc[record.studentId].coursesIds.push(record.courseId);
        acc[record.studentId].grades.push(record.grade);
        acc[record.studentId].scores.push(record.score);
      }
      return acc;
    }, {});

    return Object.values(res);
  }

  async findOne(id: string): Promise<StudentCoursesDto> {
    const records = await this.prismaService.studentCourses.findMany({
      where: { studentId: id },
      select: { studentId: true, courseId: true, grade: true, score: true },
    });

    const res: StudentCoursesDto = {
      studentId: records[0].studentId,
      coursesIds: records.map((record) => record.courseId),
      grades: records.map((record) => record.grade),
      scores: records.map((record) => record.score),
    };

    return res;
  }

  async update(
    id: string,
    code: string,
    data: UpdateStudentCoursesDto,
  ): Promise<StudentCourseDto> {
    return await this.prismaService.studentCourses.update({
      where: { studentId: id, courseId: code },
      data,
      select: { studentId: true, courseId: true, grade: true, score: true },
    });
  }

  async delete(id: string, code: string): Promise<StudentCourseDto> {
    return await this.prismaService.studentCourses.delete({
      where: { studentId: id, courseId: code },
      select: { studentId: true, courseId: true, grade: true, score: true },
    });
  }
}
