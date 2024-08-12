import { Injectable } from '@nestjs/common';
import { CreateStudentCoursesDto } from './dto/create-student-course.dto';
import { UpdateStudentCoursesDto } from './dto/update-student-course.dto';
import { StudentCourseRepository } from './entities/student-course.entity';
import { StudentCoursesDto } from './dto/student-courses.dto';
import { StudentCourseDto } from './dto/student-course.dto';

@Injectable()
export class StudentCoursesService {
  constructor(
    private readonly StudentCourseRepository: StudentCourseRepository,
  ) {}

  async create(
    CreateStudentCoursesDto: CreateStudentCoursesDto,
  ): Promise<StudentCoursesDto> {
    return await this.StudentCourseRepository.create(CreateStudentCoursesDto);
  }

  async findAll(): Promise<StudentCoursesDto[]> {
    return await this.StudentCourseRepository.findAll();
  }

  async findOne(id: string): Promise<StudentCoursesDto> {
    return await this.StudentCourseRepository.findOne(id);
  }

  async update(
    id: string,
    courseCode: string,
    UpdateStudentCoursesDto: UpdateStudentCoursesDto,
  ): Promise<StudentCourseDto> {
    return await this.StudentCourseRepository.update(
      id,
      courseCode,
      UpdateStudentCoursesDto,
    );
  }

  async remove(id: string, courseCode: string): Promise<StudentCourseDto> {
    return await this.StudentCourseRepository.delete(id, courseCode);
  }
}
