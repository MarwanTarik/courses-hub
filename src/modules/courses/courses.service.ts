import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseDto } from './dto/courses.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}
  create(createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesRepository.create(createCourseDto);
  }

  findAll(): Promise<CourseDto[]> {
    return this.coursesRepository.findAll();
  }

  findOne(id: number): Promise<CourseDto> {
    return this.coursesRepository.findOne(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    return this.coursesRepository.update(id, updateCourseDto);
  }

  remove(id: number): Promise<CourseDto> {
    return this.coursesRepository.delete(id);
  }
}
