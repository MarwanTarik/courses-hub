import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentCoursesService } from './student-courses.service';
import { CreateStudentCoursesDto } from './dto/create-student-course.dto';
import { UpdateStudentCoursesDto } from './dto/update-student-course.dto';

@Controller({
  path: 'student-courses',
  version: '1',
})
export class StudentCoursesController {
  constructor(private readonly studentCoursesService: StudentCoursesService) {}

  @Post()
  create(@Body() CreateStudentCoursesDto: CreateStudentCoursesDto) {
    return this.studentCoursesService.create(CreateStudentCoursesDto);
  }

  @Get()
  findAll() {
    return this.studentCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCoursesService.findOne(id);
  }

  @Patch(':id/:courseCode')
  update(
    @Param('id') id: string,
    @Param('courseCode') courseCode: string,
    @Body() UpdateStudentCoursesDto: UpdateStudentCoursesDto,
  ) {
    return this.studentCoursesService.update(
      id,
      courseCode,
      UpdateStudentCoursesDto,
    );
  }

  @Delete(':id/:courseCode')
  remove(@Param('id') id: string, @Param('courseCode') courseCode: string) {
    return this.studentCoursesService.remove(id, courseCode);
  }
}
