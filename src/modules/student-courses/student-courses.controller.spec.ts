import { Test, TestingModule } from '@nestjs/testing';
import { StudentCoursesController } from './student-courses.controller';
import { StudentCoursesService } from './student-courses.service';
import { CreateStudentCoursesDto } from './dto/create-student-course.dto';
import { StudentCoursesDto } from './dto/student-courses.dto';
import { UpdateStudentCoursesDto } from './dto/update-student-course.dto';
import { StudentCourseDto } from './dto/student-course.dto';

describe('StudentCoursesController', () => {
  let controller: StudentCoursesController;
  let service: StudentCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCoursesController],
      providers: [
        StudentCoursesService,
        {
          provide: StudentCoursesService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentCoursesController>(StudentCoursesController);
    service = module.get<StudentCoursesService>(StudentCoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create student courses', async () => {
    const studentCourses = {} as CreateStudentCoursesDto;
    const result = {} as StudentCoursesDto;

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(studentCourses)).toBe(result);
  });

  it('should return all registred courses for a student', async () => {
    const result: StudentCoursesDto = {} as StudentCoursesDto;
    const studentId = '2021';

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(studentId)).toBe(result);
  });

  it('should return all students with all registred courses', async () => {
    const result: StudentCoursesDto[] = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should update student courses', async () => {
    const studentCourses = {} as UpdateStudentCoursesDto;
    const result = {} as StudentCourseDto;
    const studentId = '2021';
    const courseCode = 'CS12';

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update(studentId, courseCode, studentCourses)).toBe(
      result,
    );
  });

  it('should delete student courses', async () => {
    const studentId = '2021';
    const courseCode = 'CS12';
    const result = {} as StudentCourseDto;

    jest.spyOn(service, 'remove').mockResolvedValue(result);

    expect(await controller.remove(studentId, courseCode)).toBe(result);
  });
});
