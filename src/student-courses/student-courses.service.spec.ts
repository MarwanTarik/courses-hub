import { Test, TestingModule } from '@nestjs/testing';
import { StudentCoursesService } from './student-courses.service';
import { StudentCourseRepository } from './entities/student-course.entity';
import { CreateStudentCoursesDto } from './dto/create-student-course.dto';
import { StudentCoursesDto } from './dto/student-courses.dto';
import { UpdateStudentCoursesDto } from './dto/update-student-course.dto';
import { StudentCourseDto } from './dto/student-course.dto';

describe('StudentCoursesService', () => {
  let service: StudentCoursesService;
  let repository: StudentCourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentCoursesService,
        {
          provide: StudentCourseRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentCoursesService>(StudentCoursesService);
    repository = module.get<StudentCourseRepository>(StudentCourseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create student courses', async () => {
    const studentCourses = {} as CreateStudentCoursesDto;
    const result = {} as StudentCoursesDto;

    jest.spyOn(repository, 'create').mockResolvedValue(result);

    expect(await service.create(studentCourses)).toBe(result);
  });

  it('should return all registred courses for a student', async () => {
    const result: StudentCoursesDto = {} as StudentCoursesDto;
    const studentId = '2021';

    jest.spyOn(repository, 'findOne').mockResolvedValue(result);

    expect(await service.findOne(studentId)).toBe(result);
  });

  it('should return all students with all registred courses', async () => {
    const result: StudentCoursesDto[] = [];
    jest.spyOn(repository, 'findAll').mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should update student courses', async () => {
    const studentCourses = {} as UpdateStudentCoursesDto;
    const result = {} as StudentCourseDto;
    const studentId = '2024';
    const courseCode = 'CS12';

    jest.spyOn(repository, 'update').mockResolvedValue(result);

    expect(await service.update(studentId, courseCode, studentCourses)).toBe(
      result,
    );
  });

  it('should delete student courses', async () => {
    const studentId = '2021';
    const courseCode = 'CS12';
    const result = {} as StudentCourseDto;

    jest.spyOn(repository, 'delete').mockResolvedValue(result);

    expect(await service.remove(studentId, courseCode)).toBe(result);
  });
});
